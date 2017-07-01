using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace SmartBreach.Mvc.Util
{
    public static class AssetLoader
    {
        /*** Web Config Entries
         * 
         * assetloader:minify           - toggles the minified version of bundled files.  ignored in debug mode. [default: false]
         * assetloader:debug            - toggles debug mode, which loads the individual scripts from the bundle from the web server instead of the CDN. [default: false]
         * assetloader:cdnBaseUrl       - base url for the remote CDN location [default: /<static>/build]
         * assetloader:localCdnBaseUrl  - base url for the local CDN (build) location [default: /<static>/build]
         * assetloader:realtimeManifest - read the asset manifest off disk every time it is requested, instead of once per app pool lifecycle (deployment)
         * 
         * ***/

        #region Private Members

        private static bool _minify = false;
        private static bool _debug = false;
        private static bool _realtimeManifest = false;
        private static string _cdnBase = string.Empty;
        private static string _localCdnBase = string.Empty;
        private static string _staticBase = string.Empty;
        private static string _manifestFilename = string.Empty;
        private static Dictionary<string, List<string>> _manifest = null;

        private static readonly string _bundleToken = ".bundle";
        private static readonly string _defaultManifestName = "asset_manifest.json";

        #endregion

        static AssetLoader()
        {
            _staticBase = VirtualPathUtility.ToAbsolute(WebConstants.StaticContent_Root_FromMVC);

            _debug = Convert.ToBoolean(ConfigurationManager.AppSettings["assetloader:debug"]);
            _realtimeManifest = Convert.ToBoolean(ConfigurationManager.AppSettings["assetloader:realtimeManifest"]);
            _cdnBase = ConfigurationManager.AppSettings["assetloader:cdnBaseURL"] ?? Path.Combine(_staticBase, WebConstants.StaticContent_CdnBuild_Root);
            _localCdnBase = ConfigurationManager.AppSettings["assetloader:localCdnBaseUrl"] ?? Path.Combine(_staticBase, WebConstants.StaticContent_CdnBuild_Root);
            _manifestFilename = ConfigurationManager.AppSettings["assetloader:manifestFilename"] ?? _defaultManifestName;
        }

        public static void MinifyOverride() {
            bool minifyOverride;

            if (Boolean.TryParse(HttpContext.Current.Request.QueryString["minify"], out minifyOverride))
            {
                _minify = minifyOverride;
            }
            else
            {
                _minify = Convert.ToBoolean(ConfigurationManager.AppSettings["assetloader:minify"]);
            }
        }

        public static Dictionary<string, List<string>> GetManifest()
        {
            if (_realtimeManifest || _manifest == null)
            {
                try
                {
                    string filePath = System.Web.HttpContext.Current.Server.MapPath(Path.Combine(_localCdnBase, _manifestFilename));
                    var configuration = File.ReadAllText(filePath);

                    _manifest = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(configuration);
                }
                catch (Exception)
                {
                    _manifest = null;
                }
            }

            return _manifest;
        }

        public static MvcHtmlString Script(string input, string folder = null, bool preventUnbundle = false, string fallbackCheck = null)
        {
            var manifest = GetManifest();
            var tags = ProcessManifestEntry(manifest, input, folder, preventUnbundle, fallbackCheck);
            return MvcHtmlString.Create(tags);
        }

        public static MvcHtmlString Stylesheet(string input, string folder = null, bool preventUnbundle = false)
        {
            var manifest = GetManifest();
            var tags = ProcessManifestEntry(manifest, input, folder, preventUnbundle);
            return MvcHtmlString.Create(tags);
        }

        public static MvcHtmlString StylesheetFallback()
        {
            // Detecting CSS fallback situations is a real pain.  If we detect that a CDN script failed, we are going to assume that the CSS files are going to fail, too.
            // This goes through and adds each script to the head of the document.
            var builder = new TagBuilder("script");
            builder.MergeAttribute("type", "text/javascript");
            builder.InnerHtml = "window.fallback&&window.fallback.stylesheets&&window.fallback.cdnFailed&&$.each(window.fallback.stylesheets,function(e,l){$(\"head\").append($('<link rel=\"stylesheet\" href=\"'+l+'\" />'))});";
            return MvcHtmlString.Create(builder.ToString(TagRenderMode.Normal));
        }

        public static MvcHtmlString ExternalCdnScript(string input, string fallbackLocation = null, string fallbackCheck = null)
        {
            var tagListBuilder = new StringBuilder();

            var builder = new TagBuilder("script");
            builder.MergeAttribute("type", "text/javascript");
            builder.MergeAttribute("src", input);
            tagListBuilder.AppendLine(builder.ToString(TagRenderMode.Normal));

            if (fallbackLocation != null && fallbackCheck != null)
            {
                tagListBuilder.AppendLine(CreateScriptFallback(fallbackLocation, string.Empty, fallbackCheck, fallbackLocation));
            }

            return MvcHtmlString.Create(tagListBuilder.ToString());
        }

        public static MvcHtmlString ExternalCdnStylesheet(string input, string fallbackLocation = null)
        {
            var tagListBuilder = new StringBuilder();

            var builder = new TagBuilder("link");
            builder.MergeAttribute("rel", "stylesheet");
            builder.MergeAttribute("href", input);
            tagListBuilder.AppendLine(builder.ToString(TagRenderMode.SelfClosing));

            if (fallbackLocation != null)
            {
                tagListBuilder.AppendLine(CreateCssFallback(fallbackLocation, string.Empty, fallbackLocation));
            }

            return MvcHtmlString.Create(tagListBuilder.ToString());
        }

        private static string ProcessManifestEntry(Dictionary<string, List<string>> manifest, string input, string folder, bool preventUnbundle, string fallbackCheck = null)
        {
            var tags = string.Empty;
            var scriptKey = GetScriptKey(input, _debug && !preventUnbundle);

            try
            {
                if (manifest == null) throw new Exception("No asset manifest was found.");
                if (!manifest.ContainsKey(scriptKey)) throw new Exception("The asset manifest does not contain key '" + scriptKey + '"');

                var sources = manifest[scriptKey];
                var basePath = _debug ?
                    (preventUnbundle ? _localCdnBase : _staticBase) :
                    _cdnBase;
                var tagListBuilder = new StringBuilder();

                sources.ForEach(source =>
                {
                    var extension = Path.GetExtension(source);
                    if (extension.Contains(".css"))
                    {
                        var builder = new TagBuilder("link");
                        builder.MergeAttribute("rel", "stylesheet");
                        builder.MergeAttribute("href", GetScriptPath(source, basePath, _debug && !preventUnbundle, folder));
                        tagListBuilder.AppendLine(builder.ToString(TagRenderMode.SelfClosing));

                        if (!_debug)
                        {
                            tagListBuilder.AppendLine(CreateCssFallback(source, folder));
                        }
                    }
                    else if (extension.Contains(".js"))
                    {
                        var builder = new TagBuilder("script");
                        builder.MergeAttribute("type", "text/javascript");
                        builder.MergeAttribute("src", GetScriptPath(source, basePath, _debug && !preventUnbundle, folder));
                        tagListBuilder.AppendLine(builder.ToString(TagRenderMode.Normal));

                        if (!_debug && fallbackCheck != null)
                        {
                            tagListBuilder.AppendLine(CreateScriptFallback(source, folder, fallbackCheck));
                        }
                    }
                });

                tags = tagListBuilder.ToString();
            }
            catch (Exception e)
            {
                return IncludeError(e.Message);
            }

            return tags;
        }

        private static string GetScriptKey(string input, bool unbundle)
        {
            return string.Format("{0}{1}",
                input,
                !unbundle ? _bundleToken : string.Empty);
        }

        private static string GetScriptPath(string input, string basePath, bool unbundle, string folder)
        {
            var scriptPath = input;
            var extension = Path.GetExtension(input);

            scriptPath = Path.Combine(
                basePath,
                unbundle ? string.Empty : folder,
                scriptPath);

            if (!unbundle && _minify && !extension.Contains(".min"))
            {
                scriptPath = Path.ChangeExtension(scriptPath, ".min" + extension);
            }

            scriptPath = scriptPath.Replace("\\", "/");

            return scriptPath;
        }

        private static string CreateScriptFallback(string source, string folder, string fallbackCheck, string scriptPath = null)
        {
            var builder = new TagBuilder("script");
            builder.MergeAttribute("type", "text/javascript");
            builder.InnerHtml = (string.Format("if({0}){{document.write(\"<script src='{1}'>\\x3C/script>\");window.fallback=window.fallback||{{}};window.fallback.cdnFailed=true;}}",
                fallbackCheck,
                scriptPath ?? GetScriptPath(source, _localCdnBase, false, folder)));
            return builder.ToString(TagRenderMode.Normal);
        }

        private static string CreateCssFallback(string source, string folder, string scriptPath = null)
        {
            var builder = new TagBuilder("script");
            builder.MergeAttribute("type", "text/javascript");
            builder.InnerHtml = (string.Format("window.fallback=window.fallback||{{}};window.fallback.stylesheets=window.fallback.stylesheets||[];window.fallback.stylesheets.push('{0}');",
                scriptPath ?? GetScriptPath(source, _localCdnBase, false, folder)));
            return builder.ToString(TagRenderMode.Normal);
        }

        private static string IncludeError(string error)
        {
            return string.Format("<!-- ASSETLOADER ERROR: {0} -->", error);
        }
    }
}