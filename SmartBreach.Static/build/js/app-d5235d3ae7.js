(function ($window) {
    'use strict';

    $window.jsLoaded = true; //  for CDN fallback

    angular.module('smartbreachapp', [
             'ui.router',
             'ngHamburger',
             'ui.bootstrap',
             'ngResource',
             'ngAnimate',
             'ngSanitize',
             'smartbreachapp.dashboard',
             'smartbreachapp.pages',
             'smartbreachapp.templates',
             'smartbreachapp.controls'
    ]);

    //'ui.bootstrap' - injected when issue with modal popup

    angular.module('smartbreachapp.dashboard', []);
    angular.module('smartbreachapp.pages', ['checklist-model', 'angularjs-dropdown-multiselect']);
    angular.module("smartbreachapp.templates", ['template/scope/isolatedscope.html', "template/scope/sideNav.html"]);
    angular.module('smartbreachapp.controls', []);

    // For RequestContext
    angular
    .module('smartbreachapp')
    .constant('RequestContext', BoostrapRequestContext()) //bootstrap data from function written directly in page

    .factory('appPathFactory', ['RequestContext', function appPathServiceFactory(RequestContext) {
            return {
                localPath: function () {
                       return RequestContext.PathSPA;
                   }
            };
        }])

})(window);

(function () {
    'use strict';

    angular.module('smartbreachapp').config(config);

    config.$inject = ['$locationProvider', '$urlRouterProvider'];

    function config($locationProvider, $urlRouterProvider) {

        // Remove '!' from URL path
        $locationProvider.hashPrefix('');

        $urlRouterProvider.otherwise('/Dashboard');

    };

})();

(function () {
    'use strict';

    angular.module('smartbreachapp').component('appLoader', {
            templateUrl: '/static/app/app-loader.html',
            transclude: true,
            controller: ['$scope', '$timeout', controller]
        });

    function controller($scope, $timeout) {

        var $ctrl = this;

        $ctrl.status = "Loading";

        $timeout(function () {
            $ctrl.status = "Loaded";
        }, 1500);

    }

})();
(function () {
    'use strict';

    angular
        .module('smartbreachapp.controls')
        .component('aonEbInputSelector', {
            templateUrl: '/static/app/common/controls/input-selector.component.html',
            bindings: {
                ngModelValue: '=ngModel',
                required: '<',
                disabled: '<',
                selector: '<',
                keyField: '<',
                filter:'<',
                change: '&',
            },
            require: {
                ngModel: 'ngModel'
            },
            controller: ['$scope', controller]
        });

    function controller($scope) {
        var $ctrl = this;

        $ctrl.displayName = "...";
        $ctrl.clear = clear;
        $ctrl.openSelector = openSelector;

        $ctrl.$onInit = function () {
            $ctrl.ngModel.$formatters.push(function (value) {
                //aonEbSelectorModal.getDisplayName($ctrl.selector, value, $ctrl.keyField).then(function (data) {
                //    $ctrl.displayName = data;
                //    $ctrl.ngModel.$setViewValue(value);
                //    if (value !== undefined && value !== null) {
                //        $ctrl.change(event);
                //    }
                //});
            });
        }

        function clear() {
            $ctrl.ngModelValue = null;
        };

        function openSelector() {
            alert("Search Clicked");
            //aonEbSelectorModal.openSelector($ctrl.selector, $ctrl.ngModel.$modelValue, $ctrl.keyField, $ctrl.filter)
            //    .then(function (selection) {
            //        $ctrl.ngModelValue = selection;
            //    })
            //    .catch(function (reason) {
            //        if (reason !== "cancel") {
            //            console.log("aonEbInputSelector.openSelector() : " + reason);
            //        }
            //    });
        };
    }

})();

angular.module('smartbreachapp')
    .directive('uiIconpicker', function () {
    return {
        replace: true,
        restrict: "E",
        scope: {
            name: "@",
            model: "=?ngModel"
        },
        template: '<span class=\"btn-group ui-iconpicker\" ng-class=\"{ disabled: disabled }\">\n	<button type=\"button\" ng-click="toggle();" class=\"btn btn-default dropdown-toggle\"><i class=\"{{ iconClass }}\"></i><span class=\"caret\"></span>\n	</button>\n	<ul class=\"dropdown-menu\" role=\"menu\">\n		<li ng-repeat=\"class in availableIconClasses\">\n			<button class=\"btn btn-default icon-buttons\" type=\"button\" ng-click=\"$parent.iconClass = class\"><span class=\"{{ class }}\"></span></button>\n		</li>\n	</ul>\n	<input name=\"{{ name }}\" type=\"hidden\" value=\"{{ iconClass }}\" ng-if=\"name\" />\n</span>',
        controller:['$scope', controller],
        link: function ($scope, $element, attrs) {
            var _ref;
            var groupIdLiteral, groupIds;
            var classes, group, iconClass, id, _i, _len, _ref, _ref1;
            classes = [];

            this.iconGroupsMap = {
                "bootstrap": {
                    prefix: "glyphicon glyphicon-",
                    classes: ["asterisk", "plus", "euro", "minus", "cloud", "envelope", "pencil", "glass", "music", "search", "heart", "star", "star-empty", "user", "film", "th-large", "th", "th-list", "ok", "remove", "zoom-in", "zoom-out", "off", "signal", "cog", "trash", "home", "file", "time", "road", "download-alt", "download", "upload", "inbox", "play-circle", "repeat", "refresh", "list-alt", "lock", "flag", "headphones", "volume-off", "volume-down", "volume-up", "qrcode", "barcode", "tag", "tags", "book", "bookmark", "print", "camera", "font", "bold", "italic", "text-height", "text-width", "align-left", "align-center", "align-right", "align-justify", "list", "indent-left", "indent-right", "facetime-video", "picture", "map-marker", "adjust", "tint", "edit", "share", "check", "move", "step-backward", "fast-backward", "backward", "play", "pause", "stop", "forward", "fast-forward", "step-forward", "eject", "chevron-left", "chevron-right", "plus-sign", "minus-sign", "remove-sign", "ok-sign", "question-sign", "info-sign", "screenshot", "remove-circle", "ok-circle", "ban-circle", "arrow-left", "arrow-right", "arrow-up", "arrow-down", "share-alt", "resize-full", "resize-small", "exclamation-sign", "gift", "leaf", "fire", "eye-open", "eye-close", "warning-sign", "plane", "calendar", "random", "comment", "magnet", "chevron-up", "chevron-down", "retweet", "shopping-cart", "folder-close", "folder-open", "resize-vertical", "resize-horizontal", "hdd", "bullhorn", "bell", "certificate", "thumbs-up", "thumbs-down", "hand-right", "hand-left", "hand-up", "hand-down", "circle-arrow-right", "circle-arrow-left", "circle-arrow-up", "circle-arrow-down", "globe", "wrench", "tasks", "filter", "briefcase", "fullscreen", "dashboard", "paperclip", "heart-empty", "link", "phone", "pushpin", "usd", "gbp", "sort", "sort-by-alphabet", "sort-by-alphabet-alt", "sort-by-order", "sort-by-order-alt", "sort-by-attributes", "sort-by-attributes-alt", "unchecked", "expand", "collapse-down", "collapse-up", "log-in", "flash", "log-out", "new-window", "record", "save", "open", "saved", "import", "export", "send", "floppy-disk", "floppy-saved", "floppy-remove", "floppy-save", "floppy-open", "credit-card", "transfer", "cutlery", "header", "compressed", "earphone", "phone-alt", "tower", "stats", "sd-video", "hd-video", "subtitles", "sound-stereo", "sound-dolby", "sound-5-1", "sound-6-1", "sound-7-1", "copyright-mark", "registration-mark", "cloud-download", "cloud-upload", "tree-conifer", "tree-deciduous"]
                },
                "font-awesome": {
                    prefix: "fa fa-lg fa-",
                    classes: ["glass", "music", "search", "envelope-o", "heart", "star", "star-o", "user", "film", "th-large", "th", "th-list", "check", "times", "search-plus", "search-minus", "power-off", "signal", "gear", "cog", "trash-o", "home", "file-o", "clock-o", "road", "download", "arrow-circle-o-down", "arrow-circle-o-up", "inbox", "play-circle-o", "rotate-right", "repeat", "refresh", "list-alt", "lock", "flag", "headphones", "volume-off", "volume-down", "volume-up", "qrcode", "barcode", "tag", "tags", "book", "bookmark", "print", "camera", "font", "bold", "italic", "text-height", "text-width", "align-left", "align-center", "align-right", "align-justify", "list", "dedent", "outdent", "indent", "video-camera", "picture-o", "pencil", "map-marker", "adjust", "tint", "edit", "pencil-square-o", "share-square-o", "check-square-o", "arrows", "step-backward", "fast-backward", "backward", "play", "pause", "stop", "forward", "fast-forward", "step-forward", "eject", "chevron-left", "chevron-right", "plus-circle", "minus-circle", "times-circle", "check-circle", "question-circle", "info-circle", "crosshairs", "times-circle-o", "check-circle-o", "ban", "arrow-left", "arrow-right", "arrow-up", "arrow-down", "mail-forward", "share", "expand", "compress", "plus", "minus", "asterisk", "exclamation-circle", "gift", "leaf", "fire", "eye", "eye-slash", "warning", "exclamation-triangle", "plane", "calendar", "random", "comment", "magnet", "chevron-up", "chevron-down", "retweet", "shopping-cart", "folder", "folder-open", "arrows-v", "arrows-h", "bar-chart-o", "twitter-square", "facebook-square", "camera-retro", "key", "gears", "cogs", "comments", "thumbs-o-up", "thumbs-o-down", "star-half", "heart-o", "sign-out", "linkedin-square", "thumb-tack", "external-link", "sign-in", "trophy", "github-square", "upload", "lemon-o", "phone", "square-o", "bookmark-o", "phone-square", "twitter", "facebook", "github", "unlock", "credit-card", "rss", "hdd-o", "bullhorn", "bell", "certificate", "hand-o-right", "hand-o-left", "hand-o-up", "hand-o-down", "arrow-circle-left", "arrow-circle-right", "arrow-circle-up", "arrow-circle-down", "globe", "wrench", "tasks", "filter", "briefcase", "arrows-alt", "group", "users", "chain", "link", "cloud", "flask", "cut", "scissors", "copy", "files-o", "paperclip", "save", "floppy-o", "square", "bars", "list-ul", "list-ol", "strikethrough", "underline", "table", "magic", "truck", "pinterest", "pinterest-square", "google-plus-square", "google-plus", "money", "caret-down", "caret-up", "caret-left", "caret-right", "columns", "unsorted", "sort", "sort-down", "sort-asc", "sort-up", "sort-desc", "envelope", "linkedin", "rotate-left", "undo", "legal", "gavel", "dashboard", "tachometer", "comment-o", "comments-o", "flash", "bolt", "sitemap", "umbrella", "paste", "clipboard", "lightbulb-o", "exchange", "cloud-download", "cloud-upload", "user-md", "stethoscope", "suitcase", "bell-o", "coffee", "cutlery", "file-text-o", "building-o", "hospital-o", "ambulance", "medkit", "fighter-jet", "beer", "h-square", "plus-square", "angle-double-left", "angle-double-right", "angle-double-up", "angle-double-down", "angle-left", "angle-right", "angle-up", "angle-down", "desktop", "laptop", "tablet", "mobile-phone", "mobile", "circle-o", "quote-left", "quote-right", "spinner", "circle", "mail-reply", "reply", "github-alt", "folder-o", "folder-open-o", "smile-o", "frown-o", "meh-o", "gamepad", "keyboard-o", "flag-o", "flag-checkered", "terminal", "code", "reply-all", "mail-reply-all", "star-half-empty", "star-half-full", "star-half-o", "location-arrow", "crop", "code-fork", "unlink", "chain-broken", "question", "info", "exclamation", "superscript", "subscript", "eraser", "puzzle-piece", "microphone", "microphone-slash", "shield", "calendar-o", "fire-extinguisher", "rocket", "maxcdn", "chevron-circle-left", "chevron-circle-right", "chevron-circle-up", "chevron-circle-down", "html5", "css3", "anchor", "unlock-alt", "bullseye", "ellipsis-h", "ellipsis-v", "rss-square", "play-circle", "ticket", "minus-square", "minus-square-o", "level-up", "level-down", "check-square", "pencil-square", "external-link-square", "share-square", "compass", "toggle-down", "caret-square-o-down", "toggle-up", "caret-square-o-up", "toggle-right", "caret-square-o-right", "euro", "eur", "gbp", "dollar", "usd", "rupee", "inr", "cny", "rmb", "yen", "jpy", "ruble", "rouble", "rub", "won", "krw", "bitcoin", "btc", "file", "file-text", "sort-alpha-asc", "sort-alpha-desc", "sort-amount-asc", "sort-amount-desc", "sort-numeric-asc", "sort-numeric-desc", "thumbs-up", "thumbs-down", "youtube-square", "youtube", "xing", "xing-square", "youtube-play", "dropbox", "stack-overflow", "instagram", "flickr", "adn", "bitbucket", "bitbucket-square", "tumblr", "tumblr-square", "long-arrow-down", "long-arrow-up", "long-arrow-left", "long-arrow-right", "apple", "windows", "android", "linux", "dribbble", "skype", "foursquare", "trello", "female", "male", "gittip", "sun-o", "moon-o", "archive", "bug", "vk", "weibo", "renren", "pagelines", "stack-exchange", "arrow-circle-o-right", "arrow-circle-o-left", "toggle-left", "caret-square-o-left", "dot-circle-o", "wheelchair", "vimeo-square", "turkish-lira", "try", "plus-square-o"]
                },
                "ionicons": {
                    prefix: "ion ion-",
                    classes: ["alert", "alert-circled", "android-add", "android-add-circle", "android-alarm-clock", "android-alert", "android-apps", "android-archive", "android-arrow-back", "android-arrow-down", "android-arrow-dropdown", "android-arrow-dropdown-circle", "android-arrow-dropleft", "android-arrow-dropleft-circle", "android-arrow-dropright", "android-arrow-dropright-circle", "android-arrow-dropup", "android-arrow-dropup-circle", "android-arrow-forward", "android-arrow-up", "android-attach", "android-bar", "android-bicycle", "android-boat", "android-bookmark", "android-bulb", "android-bus", "android-calendar", "android-call", "android-camera", "android-cancel", "android-car", "android-cart", "android-chat", "android-checkbox", "android-checkbox-blank", "android-checkbox-outline", "android-checkbox-outline-blank", "android-checkmark-circle", "android-clipboard", "android-close", "android-cloud", "android-cloud-circle", "android-cloud-done", "android-cloud-outline", "android-color-palette", "android-compass", "android-contact", "android-contacts", "android-contract", "android-create", "android-delete", "android-desktop", "android-document", "android-done", "android-done-all", "android-download", "android-drafts", "android-exit", "android-expand", "android-favorite", "android-favorite-outline", "android-film", "android-folder", "android-folder-open", "android-funnel", "android-globe", "android-hand", "android-hangout", "android-happy", "android-home", "android-image", "android-laptop", "android-list", "android-locate", "android-lock", "android-mail", "android-map", "android-menu", "android-microphone", "android-microphone-off", "android-more-horizontal", "android-more-vertical", "android-navigate", "android-notifications", "android-notifications-none", "android-notifications-off", "android-open", "android-options", "android-people", "android-person", "android-person-add", "android-phone-landscape", "android-phone-portrait", "android-pin", "android-plane", "android-playstore", "android-print", "android-radio-button-off", "android-radio-button-on", "android-refresh", "android-remove", "android-remove-circle", "android-restaurant", "android-sad", "android-search", "android-send", "android-settings", "android-share", "android-share-alt", "android-star", "android-star-half", "android-star-outline", "android-stopwatch", "android-subway", "android-sunny", "android-sync", "android-textsms", "android-time", "android-train", "android-unlock", "android-upload", "android-volume-down", "android-volume-mute", "android-volume-off", "android-volume-up", "android-walk", "android-warning", "android-watch", "android-wifi", "aperture", "archive", "arrow-down-a", "arrow-down-b", "arrow-down-c", "arrow-expand", "arrow-graph-down-left", "arrow-graph-down-right", "arrow-graph-up-left", "arrow-graph-up-right", "arrow-left-a", "arrow-left-b", "arrow-left-c", "arrow-move", "arrow-resize", "arrow-return-left", "arrow-return-right", "arrow-right-a", "arrow-right-b", "arrow-right-c", "arrow-shrink", "arrow-swap", "arrow-up-a", "arrow-up-b", "arrow-up-c", "asterisk", "at", "backspace", "backspace-outline", "bag", "battery-charging", "battery-empty", "battery-full", "battery-half", "battery-low", "beaker", "beer", "bluetooth", "bonfire", "bookmark", "bowtie", "briefcase", "bug", "calculator", "calendar", "camera", "card", "cash", "chatbox", "chatbox-working", "chatboxes", "chatbubble", "chatbubble-working", "chatbubbles", "checkmark", "checkmark-circled", "checkmark-round", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "clipboard", "clock", "close", "close-circled", "close-round", "closed-captioning", "cloud", "code", "code-download", "code-working", "coffee", "compass", "compose", "connection-bars", "contrast", "crop", "cube", "disc", "document", "document-text", "drag", "earth", "easel", "edit", "egg", "eject", "email", "email-unread", "erlenmeyer-flask", "erlenmeyer-flask-bubbles", "eye", "eye-disabled", "female", "filing", "film-marker", "fireball", "flag", "flame", "flash", "flash-off", "folder", "fork", "fork-repo", "forward", "funnel", "gear-a", "gear-b", "grid", "hammer", "happy", "happy-outline", "headphone", "heart", "heart-broken", "help", "help-buoy", "help-circled", "home", "icecream", "image", "images", "information", "information-circled", "ionic", "ios-alarm", "ios-alarm-outline", "ios-albums", "ios-albums-outline", "ios-americanfootball", "ios-americanfootball-outline", "ios-analytics", "ios-analytics-outline", "ios-arrow-back", "ios-arrow-down", "ios-arrow-forward", "ios-arrow-left", "ios-arrow-right", "ios-arrow-thin-down", "ios-arrow-thin-left", "ios-arrow-thin-right", "ios-arrow-thin-up", "ios-arrow-up", "ios-at", "ios-at-outline", "ios-barcode", "ios-barcode-outline", "ios-baseball", "ios-baseball-outline", "ios-basketball", "ios-basketball-outline", "ios-bell", "ios-bell-outline", "ios-body", "ios-body-outline", "ios-bolt", "ios-bolt-outline", "ios-book", "ios-book-outline", "ios-bookmarks", "ios-bookmarks-outline", "ios-box", "ios-box-outline", "ios-briefcase", "ios-briefcase-outline", "ios-browsers", "ios-browsers-outline", "ios-calculator", "ios-calculator-outline", "ios-calendar", "ios-calendar-outline", "ios-camera", "ios-camera-outline", "ios-cart", "ios-cart-outline", "ios-chatboxes", "ios-chatboxes-outline", "ios-chatbubble", "ios-chatbubble-outline", "ios-checkmark", "ios-checkmark-empty", "ios-checkmark-outline", "ios-circle-filled", "ios-circle-outline", "ios-clock", "ios-clock-outline", "ios-close", "ios-close-empty", "ios-close-outline", "ios-cloud", "ios-cloud-download", "ios-cloud-download-outline", "ios-cloud-outline", "ios-cloud-upload", "ios-cloud-upload-outline", "ios-cloudy", "ios-cloudy-night", "ios-cloudy-night-outline", "ios-cloudy-outline", "ios-cog", "ios-cog-outline", "ios-color-filter", "ios-color-filter-outline", "ios-color-wand", "ios-color-wand-outline", "ios-compose", "ios-compose-outline", "ios-contact", "ios-contact-outline", "ios-copy", "ios-copy-outline", "ios-crop", "ios-crop-strong", "ios-download", "ios-download-outline", "ios-drag", "ios-email", "ios-email-outline", "ios-eye", "ios-eye-outline", "ios-fastforward", "ios-fastforward-outline", "ios-filing", "ios-filing-outline", "ios-film", "ios-film-outline", "ios-flag", "ios-flag-outline", "ios-flame", "ios-flame-outline", "ios-flask", "ios-flask-outline", "ios-flower", "ios-flower-outline", "ios-folder", "ios-folder-outline", "ios-football", "ios-football-outline", "ios-game-controller-a", "ios-game-controller-a-outline", "ios-game-controller-b", "ios-game-controller-b-outline", "ios-gear", "ios-gear-outline", "ios-glasses", "ios-glasses-outline", "ios-grid-view", "ios-grid-view-outline", "ios-heart", "ios-heart-outline", "ios-help", "ios-help-empty", "ios-help-outline", "ios-home", "ios-home-outline", "ios-infinite", "ios-infinite-outline", "ios-information", "ios-information-empty", "ios-information-outline", "ios-ionic-outline", "ios-keypad", "ios-keypad-outline", "ios-lightbulb", "ios-lightbulb-outline", "ios-list", "ios-list-outline", "ios-location", "ios-location-outline", "ios-locked", "ios-locked-outline", "ios-loop", "ios-loop-strong", "ios-medical", "ios-medical-outline", "ios-medkit", "ios-medkit-outline", "ios-mic", "ios-mic-off", "ios-mic-outline", "ios-minus", "ios-minus-empty", "ios-minus-outline", "ios-monitor", "ios-monitor-outline", "ios-moon", "ios-moon-outline", "ios-more", "ios-more-outline", "ios-musical-note", "ios-musical-notes", "ios-navigate", "ios-navigate-outline", "ios-nutrition", "ios-nutrition-outline", "ios-paper", "ios-paper-outline", "ios-paperplane", "ios-paperplane-outline", "ios-partlysunny", "ios-partlysunny-outline", "ios-pause", "ios-pause-outline", "ios-paw", "ios-paw-outline", "ios-people", "ios-people-outline", "ios-person", "ios-person-outline", "ios-personadd", "ios-personadd-outline", "ios-photos", "ios-photos-outline", "ios-pie", "ios-pie-outline", "ios-pint", "ios-pint-outline", "ios-play", "ios-play-outline", "ios-plus", "ios-plus-empty", "ios-plus-outline", "ios-pricetag", "ios-pricetag-outline", "ios-pricetags", "ios-pricetags-outline", "ios-printer", "ios-printer-outline", "ios-pulse", "ios-pulse-strong", "ios-rainy", "ios-rainy-outline", "ios-recording", "ios-recording-outline", "ios-redo", "ios-redo-outline", "ios-refresh", "ios-refresh-empty", "ios-refresh-outline", "ios-reload", "ios-reverse-camera", "ios-reverse-camera-outline", "ios-rewind", "ios-rewind-outline", "ios-rose", "ios-rose-outline", "ios-search", "ios-search-strong", "ios-settings", "ios-settings-strong", "ios-shuffle", "ios-shuffle-strong", "ios-skipbackward", "ios-skipbackward-outline", "ios-skipforward", "ios-skipforward-outline", "ios-snowy", "ios-speedometer", "ios-speedometer-outline", "ios-star", "ios-star-half", "ios-star-outline", "ios-stopwatch", "ios-stopwatch-outline", "ios-sunny", "ios-sunny-outline", "ios-telephone", "ios-telephone-outline", "ios-tennisball", "ios-tennisball-outline", "ios-thunderstorm", "ios-thunderstorm-outline", "ios-time", "ios-time-outline", "ios-timer", "ios-timer-outline", "ios-toggle", "ios-toggle-outline", "ios-trash", "ios-trash-outline", "ios-undo", "ios-undo-outline", "ios-unlocked", "ios-unlocked-outline", "ios-upload", "ios-upload-outline", "ios-videocam", "ios-videocam-outline", "ios-volume-high", "ios-volume-low", "ios-wineglass", "ios-wineglass-outline", "ios-world", "ios-world-outline", "ipad", "iphone", "ipod", "jet", "key", "knife", "laptop", "leaf", "levels", "lightbulb", "link", "load-a", "load-b", "load-c", "load-d", "location", "lock-combination", "locked", "log-in", "log-out", "loop", "magnet", "male", "man", "map", "medkit", "merge", "mic-a", "mic-b", "mic-c", "minus", "minus-circled", "minus-round", "model-s", "monitor", "more", "mouse", "music-note", "navicon", "navicon-round", "navigate", "network", "no-smoking", "nuclear", "outlet", "paintbrush", "paintbucket", "paper-airplane", "paperclip", "pause", "person", "person-add", "person-stalker", "pie-graph", "pin", "pinpoint", "pizza", "plane", "planet", "play", "playstation", "plus", "plus-circled", "plus-round", "podium", "pound", "power", "pricetag", "pricetags", "printer", "pull-request", "qr-scanner", "quote", "radio-waves", "record", "refresh", "reply", "reply-all", "ribbon-a", "ribbon-b", "sad", "sad-outline", "scissors", "search", "settings", "share", "shuffle", "skip-backward", "skip-forward", "social-android", "social-android-outline", "social-angular", "social-angular-outline", "social-apple", "social-apple-outline", "social-bitcoin", "social-bitcoin-outline", "social-buffer", "social-buffer-outline", "social-chrome", "social-chrome-outline", "social-codepen", "social-codepen-outline", "social-css3", "social-css3-outline", "social-designernews", "social-designernews-outline", "social-dribbble", "social-dribbble-outline", "social-dropbox", "social-dropbox-outline", "social-euro", "social-euro-outline", "social-facebook", "social-facebook-outline", "social-foursquare", "social-foursquare-outline", "social-freebsd-devil", "social-github", "social-github-outline", "social-google", "social-google-outline", "social-googleplus", "social-googleplus-outline", "social-hackernews", "social-hackernews-outline", "social-html5", "social-html5-outline", "social-instagram", "social-instagram-outline", "social-javascript", "social-javascript-outline", "social-linkedin", "social-linkedin-outline", "social-markdown", "social-nodejs", "social-octocat", "social-pinterest", "social-pinterest-outline", "social-python", "social-reddit", "social-reddit-outline", "social-rss", "social-rss-outline", "social-sass", "social-skype", "social-skype-outline", "social-snapchat", "social-snapchat-outline", "social-tumblr", "social-tumblr-outline", "social-tux", "social-twitch", "social-twitch-outline", "social-twitter", "social-twitter-outline", "social-usd", "social-usd-outline", "social-vimeo", "social-vimeo-outline", "social-whatsapp", "social-whatsapp-outline", "social-windows", "social-windows-outline", "social-wordpress", "social-wordpress-outline", "social-yahoo", "social-yahoo-outline", "social-yen", "social-yen-outline", "social-youtube", "social-youtube-outline", "soup-can", "soup-can-outline", "speakerphone", "speedometer", "spoon", "star", "stats-bars", "steam", "stop", "thermometer", "thumbsdown", "thumbsup", "toggle", "toggle-filled", "transgender", "trash-a", "trash-b", "trophy", "tshirt", "tshirt-outline", "umbrella", "university", "unlocked", "upload", "usb", "videocamera", "volume-high", "volume-low", "volume-medium", "volume-mute", "wand", "waterdrop", "wifi", "wineglass", "woman", "wrench", "xbox"]
                }
            }

            //$scope.availableIconClasses = (new IconGroupCollection(attrs.groups)).getClassArray();
            if (attrs.groups == undefined) {
                groupIdLiteral = "all";
            }
            else {
                groupIdLiteral = attrs.groups;
            }
            groupIds = groupIdLiteral.split(" ");
            //groupIds= _.uniq(groupIds);     
            _ref = this.iconGroupsMap;
            groupIds.forEach(function (element) {
                for (id in _ref) {
                    if (id === element || element === "all") {
                        group = _ref[id];
                        _ref1 = group.classes;
                        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                            iconClass = _ref1[_i];
                            classes.push(group.prefix + iconClass);
                        }
                    }
                }
            }, this);

            $scope.availableIconClasses = classes;

            $scope.iconClass = (_ref = attrs.value) != null ? _ref : $scope.availableIconClasses[0];
            if (attrs.model) {
                $scope.model = $scope[attrs.model];
                $scope.$watch("iconClass", function () {
                    return $scope.model = $scope.iconClass;
                });
                $scope.$watch("model", function () {
                    return $scope.iconClass = $scope.model;
                });
            }
            $scope.$dropdownButton = $element.find("button").eq(0);
            return $scope.disabled = attrs.disabled != null;

        }

    };

    function controller($scope) {
        $scope.toggle = function () {
            angular.element(".ui-iconpicker ul").addClass('open-picker');
        }
        $scope.$watch("iconClass", function () {
            angular.element(".ui-iconpicker ul").removeClass('open-picker');
            angular.element(".icon-name").text($scope.iconClass);
        });
    }
});
// Heavily based on ngResource with customistations for Flex API
(function () {
    'use strict';

    angular.module('smartbreachapp')
        .factory('apiResource', apiResource);

    apiResource.$inject = ['$http', '$log', '$q', 'RequestContext', 'giConstant'];

    // Helper functions and regex to lookup a dotted path on an object
    // stopping at undefined/null.  The path must be composed of ASCII
    // identifiers (just like $parse)
    var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;

    function isValidDottedPath(path) {
        return (path != null && path !== '' && path !== 'hasOwnProperty' &&
            MEMBER_NAME_REGEX.test('.' + path));
    }

    function lookupDottedPath(obj, path) {
        if (!isValidDottedPath(path)) {
            throw $resourceMinErr('badmember', 'Dotted member path "@{0}" is invalid.', path);
        }
        var keys = path.split('.');
        for (var i = 0, ii = keys.length; i < ii && angular.isDefined(obj) ; i++) {
            var key = keys[i];
            obj = (obj !== null) ? obj[key] : undefined;
        }
        return obj;
    }

    var PROTOCOL_AND_DOMAIN_REGEX = /^https?:\/\/[^\/]*/;

    var commonDefaults = {
        // Strip slashes by default
        stripTrailingSlashes: true,

        // Default actions configuration
        actions: {
            'get': { method: 'GET' },
            'update': { method: 'PUT' },
            'create': { method: 'POST' },
            'query': { method: 'GET', isArray: true },
            'remove': { method: 'DELETE' },
            'delete': { method: 'DELETE' }
        }
    };

    function apiResource($http, $log, $q, RequestContext, giConstant) {

        var forEach = angular.forEach,
          extend = angular.extend,
          copy = angular.copy,
          isFunction = angular.isFunction;

        /**
         * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
         * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set
         * (pchar) allowed in path segments:
         *    segment       = *pchar
         *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
         *    pct-encoded   = "%" HEXDIG HEXDIG
         *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
         *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
         *                     / "*" / "+" / "," / ";" / "="
         */
        function encodeUriSegment(val) {
            return encodeUriQuery(val, true).
              replace(/%26/gi, '&').
              replace(/%3D/gi, '=').
              replace(/%2B/gi, '+');
        }

        /**
         * This method is intended for encoding *key* or *value* parts of query component. We need a
         * custom method because encodeURIComponent is too aggressive and encodes stuff that doesn't
         * have to be encoded per http://tools.ietf.org/html/rfc3986:
         *    query       = *( pchar / "/" / "?" )
         *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
         *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
         *    pct-encoded   = "%" HEXDIG HEXDIG
         *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
         *                     / "*" / "+" / "," / ";" / "="
         */
        function encodeUriQuery(val, pctEncodeSpaces) {
            return encodeURIComponent(val).
              replace(/%40/gi, '@').
              replace(/%3A/gi, ':').
              replace(/%24/g, '$').
              replace(/%2C/gi, ',').
              replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
        }

        function Route(template, defaults) {
            this.template = template;
            this.defaults = extend({}, commonDefaults, defaults);
            this.urlParams = {};
        }

        Route.prototype = {
            setUrlParams: function (config, params, actionUrl) {
                var self = this,
                  url = actionUrl || self.template,
                  val,
                  encodedVal,
                  protocolAndDomain = '';

                var urlParams = self.urlParams = {};
                forEach(url.split(/\W/), function (param) {
                    if (param === 'hasOwnProperty') {
                        throw $resourceMinErr('badname', "hasOwnProperty is not a valid parameter name.");
                    }
                    if (!(new RegExp("^\\d+$").test(param)) && param &&
                      (new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url))) {
                        urlParams[param] = true;
                    }
                });
                url = url.replace(/\\:/g, ':');
                url = url.replace(PROTOCOL_AND_DOMAIN_REGEX, function (match) {
                    protocolAndDomain = match;
                    return '';
                });

                params = params || {};
                forEach(self.urlParams, function (_, urlParam) {
                    val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
                    if (angular.isDefined(val) && val !== null) {
                        encodedVal = encodeUriSegment(val);
                        url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), function (match, p1) {
                            return encodedVal + p1;
                        });
                    } else {
                        url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W|$)", "g"), function (match,
                            leadingSlashes, tail) {
                            if (tail.charAt(0) == '/') {
                                return tail;
                            } else {
                                return leadingSlashes + tail;
                            }
                        });
                    }
                });

                // strip trailing slashes and set the url (unless this behavior is specifically disabled)
                if (self.defaults.stripTrailingSlashes) {
                    url = url.replace(/\/+$/, '') || '/';
                }

                // then replace collapse `/.` if found in the last URL path segment before the query
                // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
                url = url.replace(/\/\.(?=\w+($|\?))/, '.');
                // replace escaped `/\.` with `/.`
                config.url = protocolAndDomain + url.replace(/\/\\\./, '/.');


                // set params - delegate param encoding to $http
                forEach(params, function (value, key) {
                    if (!self.urlParams[key]) {
                        config.params = config.params || {};
                        config.params[key] = value;
                    }
                });
            }
        };

        function resourceFactory(url, paramDefaults, actions, options) {

            if (url && !url.startsWith('http')) {
                url = RequestContext.PathAPI + url;
            }

            var route = new Route(url, options);

            _.each(actions, function (action) {
                if (action.url && !action.url.startsWith('http')) {
                    action.url = RequestContext.PathAPI + action.url;
                }
            });
            actions = extend({}, commonDefaults.actions, actions);

            function extractParams(data, actionParams) {
                var ids = {};
                actionParams = extend({}, paramDefaults, actionParams);
                forEach(actionParams, function (value, key) {
                    if (isFunction(value)) { value = value(); }
                    ids[key] = value && value.charAt && value.charAt(0) == '@' ?
                      lookupDottedPath(data, value.substr(1)) : value;
                });
                return ids;
            }

            function Resource() {
            }

            var idParam = paramDefaults.id.substring(1); // Require an id parameter for the uid, strip off '@' prefix.

            // convert save requests to create POST for new records or update PUT for existing records.
            Resource.save = function (params, data) {
                if (!data[idParam] || data[idParam] === giConstant.NEW_RECORD) {
                    delete data[idParam];
                    return this.create(params, data);
                }
                else {
                    return this.update(params, data);
                }
            };

            forEach(actions, function (action, name) {
                var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);

                Resource[name] = function (a1, a2) {
                    var params = {}, data;

                    switch (arguments.length) {
                        case 2:
                            params = a1;
                            data = a2;
                            break;
                        case 1:
                            if (hasBody) data = a1;
                            else params = a1;
                            break;
                        case 0: break;
                        default:
                            throw $resourceMinErr('badargs',
                              "Expected up to 2 arguments [params, data], got {0} arguments",
                              arguments.length);
                    }

                    var httpConfig = {};

                    forEach(action, function (value, key) {
                        switch (key) {
                            default:
                                httpConfig[key] = copy(value);
                                break;
                            case 'params':
                            case 'isArray':
                                break;
                            case 'timeout':
                                if (value && !angular.isNumber(value)) {
                                    $log.debug('ngResource:\n' +
                                        '  Only numeric values are allowed as `timeout`.\n' +
                                        '  Promises are not supported in $resource, because the same value would ' +
                                        'be used for multiple requests.\n' +
                                        '  If you need support for cancellable $resource actions, you should ' +
                                        'upgrade to version 1.5 or higher.');
                                }
                                break;
                        }
                    });

                    if (hasBody) httpConfig.data = data;
                    route.setUrlParams(httpConfig,
                      extend({}, extractParams(data, action.params || {}), params),
                      action.url);

                    var promise = $http(httpConfig).then(function (response) {
                        var data = response.data;
                        if (data) {
                            // Need to convert action.isArray to boolean in case it is undefined
                            // jshint -W018
                            if (angular.isArray(data) !== (!!action.isArray)) {
                                throw $resourceMinErr('badcfg',
                                    'Error in resource configuration for action `{0}`. Expected response to ' +
                                    'contain an {1} but got an {2} (Request: {3} {4})', name, action.isArray ? 'array' : 'object',
                                  angular.isArray(data) ? 'array' : 'object', httpConfig.method, httpConfig.url);
                            }
                            // jshint +W018
                        }
                        return data;
                    }, function (response) {
                        return $q.reject(response);
                    });

                    return promise;
                };
            });

            return Resource;
        }

        return resourceFactory;
    }

})();
(function () {
    'use strict';

    angular
        .module('smartbreachapp')
        .factory('giConstant', GIConstant);

    GIConstant.$inject = [];

    function GIConstant() {

        return {
            NEW_RECORD: "NEW",
            ELIG_NEW_RECORD: "ELIG_NEW",

            Parameters: {
                OVERRIDE_TENANT_RECORDID: 'tenantId'
            },

            EditMode: {
                READ: 0,
                EDIT: 1,
                SAVE: 2
            },

            Filter: {
                EXCLUDE_FULL: "1",
                EXCLUDE_PARTIAL: "2",
                EXCLUDE_ENTITY: "*"
            },
            LookupRelationshipType: {
                Spouse: 1,
                DomesticPartner: 2,
                Child: 3,
                Other: 4,
                Unborn: 5
            },
            LookupEmployeeRelationshipType: {
                Dependant: 1,
                Beneficiary: 2,
                Trust: 3,
                Estate: 4,
                Organization: 5
            },
            Import: {
                NoneTransformationType: "0",
                CustomTransformationType: "3",
                DefaultTransformationType: "4"
            },
            Participant: {
                FIRSTLASTLAST2ANDTYPE: 1
            },
            LookupEOIStatus: {
                PENDING : 1,
                CANCELLED : 2,
                APPROVED : 3,
                DECLINED : 4,
                VALIDATING : 5,
                DROPPED : 6,
                APPROVING : 7,
                DEFERRED : 8,
                CANCELLING : 9,
                DECLINING : 10
            },
            LookupEventStatus: {
                PENDING: 1,
                SUBMITTED: 2,
                APPROVED: 3,
                DECLINED: 4,
                QUEUED: 5,
                DECLINED_FROM_PENDING: 41,
                DECLINED_FROM_SUBMITTED: 42,
                DECLINED_FROM_APPROVED: 43,
            },
            Privilege: {
                
                READ: 1,
                UPDATE: 2,
                ADD: 3,
                DELETE: 4

            }
        };
    }

})();
(function () {
    'use strict';

    angular
        .module('smartbreachapp')
        .service('navigationService', navigationService);

    navigationService.$inject = ['$rootScope', '$state', '$window', 'pageContextService'];

    function navigationService($rootScope, $state, $window, pageContextService) {

        $rootScope.$on("$stateChangeSuccess", function (evt, to, toP, from, fromP) {
            updatePageContext();
        });

        $rootScope.$watchCollection(function () { return _options.mainNavigation; }, function () {
            updatePageContext();
        });

        var _options = {
            mainNavigation: [],
            mainNavVisible: false,
            mainNavigationTitle: undefined,
        }

        var service = {
            options: _options,
            mainNavigation: _options.mainNavigation,
            mainNavVisible: _options.mainNavVisible,

            setMainNavigation: setMainNavigation,
            toggleNavView: toggleNavView,
            isMenuItemEnabled: isMenuItemEnabled,
            goToStep: goToStep,
            hasPreviousPage: hasPreviousPage,
            previousPage: previousPage,
            hasNextPage: hasNextPage,
            nextPage: nextPage,
            isLastStep: isLastStep
        };

        return service;

        function setMainNavigation(navItems, title) {
            _options.mainNavigation = navItems;
            _options.mainNavigationTitle = title || undefined;
            updatePageContext();
        };

        function toggleNavView() {
            _options.mainNavVisible = !_options.mainNavVisible;
        };

        function updatePageContext() {
            var contexts = [];

            updateNavigation(_options.mainNavigation, contexts);

            pageContextService.setContextList(contexts.reverse());
        }

        function updateNavigation(navigationItems, contexts) {

            // First deactivate current active items
            for (var i = 0; i < navigationItems.length; i++) {
                navigationItems[i].IsGroupOpen = false;
            }

            var levelActive = false,
                innerContexts = [];

            for (var i = 0; i < navigationItems.length; i++) {
                var navItem = navigationItems[i];

                navItem.IsActive = isNavItemActive(navItem);
                navItem.ChildrenActive = false;
                levelActive = levelActive || (navItem.IsActive == true);

                if ((navItem.children || []).length > 0) {
                    navItem.IsParent = true;

                    if (updateNavigation(navItem.children, contexts) || navItem.IsActive) {
                        navItem.IsGroupOpen = true;
                        navItem.ChildrenActive = true;
                        levelActive = true;
                    }
                }

                if (navItem.IsActive || navItem.ChildrenActive) {
                    pushPageContext(innerContexts, navItem.label);
                }
            }

            if (innerContexts.length > 0) {
                _.each(innerContexts.reverse(), function (c) {
                    pushPageContext(contexts, c.title);
                })
            }

            return levelActive;
        }

        function isNavItemActive(navItem) {
            var stateIncludes = $state.includes(navItem.state, navItem.stateParams);
            stateIncludes = (typeof stateIncludes === "undefined") ? false : stateIncludes;

            return navItem.state != null // a state is specified
                && stateIncludes; // the current state includes the named state
        }

        /*========================================================================================
            TODO: add pageContext to mainNavigation object for usage like CP
        ==========================================================================================*/
        function pushPageContext(contexts, pageContext) {
            if (pageContext != null) {
                contexts.push({ 'title': pageContext });
            }
        }

        /**
         * Returns true if the supplied step is currently enabled.
         * @param {} step 
         * @returns {} true if the supplied step is currently enabled
         */
        function isMenuItemEnabled(item) {
            var enabled = false;
            try {
                enabled = !item.hidden && (item.enableOn == null || item.enableOn(item));
            } catch (e) {
                console.log(e);
            }
            return enabled;
        }

        /**
         * Flattens out or menuGroups, and adds in the recordid's of the repeating children
         * to make it easier to work out which step is next/previous.
         * @returns {} 
         */
        function getSteps() {
            var tmpSteps = [];
            _.forEach(_options.mainNavigation, function (group) {
                tmpSteps.push(group);
                _.forEach(group.children, function (child) {
                    tmpSteps.push(child);
                    if ((child.children || []).length > 0) {
                        _.forEach(child.children, function (subchild) {
                            tmpSteps.push(subchild);
                        });
                    }
                });
            });
            return tmpSteps;
        }

        /**
        * Returns true if the current step is the last.
        * This is a bit of a bodge at the moment as things have been hardcoded in the menu structure..
        *
        **/
        function isLastStep() {
            var tmpSteps = getSteps();
            if (tmpSteps.length > 0) {
                var lastStep = tmpSteps[tmpSteps.length - 1];
                var stateIncludes = $state.includes(lastStep.state, lastStep.stateParams);
                return (typeof stateIncludes === "undefined") ? false : stateIncludes;
            }
            return false;
        }

        /**
         * Sets the state to the state of the given step,
         * provided that step has a state. Repeated children are expected to have already populated
         * step.recordID with their recordID so we can pass it along to the page.
         * @param {} step 
         * @returns {} 
         */
        function goToStep(step) {
            if (step.state && isMenuItemEnabled(step)) {
                if (step.stateParams) {
                    if (step.newWindow) {
                        var url = $state.href(step.state, step.stateParams);
                        var win = $window.open(url, '_blank', 'status=0,toolbar=0,resizable=1');
                    } else {
                        $state.go(step.state, step.stateParams);
                    }
                    _options.mainNavVisible = false;
                } else {
                    if (step.newWindow) {
                        var url = $state.href(step.state);
                        var win = $window.open(url, '_blank', 'status=0,toolbar=0,resizable=1');
                    } else {
                        $state.go(step.state);
                    }
                    _options.mainNavVisible = false;
                }
            }
        }

        /**
         * Returns true if a previous step exists.
         * Steps with no state will be skipped.
         * @returns {} 
         */
        function hasPreviousPage() {
            var previousStep = findPreviousStep();
            return (previousStep) ? true : false;
        }

        /**
         * Find the previous step in our step structure and navigate to it.
         * Steps with no state will be skipped.
         * @returns {} 
         */
        function previousPage() {
            var previousStep = findPreviousStep();
            if (previousStep) {
                goToStep(previousStep);
            }
        }

        /**
         * Returns true if a next step exists.
         * Steps with no state will be skipped.
         * @returns {} 
         */
        function hasNextPage() {
            var nextStep = findNextStep();
            return (nextStep) ? true : false;
        }

        /**
         * Find the next step in our step structure and navigate to it.
         * @returns {} 
         */
        function nextPage() {
            var nextStep = findNextStep();
            if (nextStep) {
                goToStep(nextStep);
            }
        }

        function findPreviousStep() {
            var tmpSteps = getSteps();
            var currentStep = null;
            var previousStep = null;
            for (var i = tmpSteps.length - 1; i >= 0; i--) {
                if (currentStep) {

                    if (tmpSteps[i].state && isMenuItemEnabled(tmpSteps[i])) {
                        previousStep = tmpSteps[i];
                        break;
                    }
                } else {
                    var stateIncludes = $state.includes(tmpSteps[i].state, tmpSteps[i].stateParams);
                    stateIncludes = (typeof stateIncludes === "undefined") ? false : stateIncludes;
                    if (tmpSteps[i].state != null && stateIncludes) {
                        currentStep = tmpSteps[i];
                    }
                }
            }
            return previousStep;
        }

        function findNextStep() {
            var tmpSteps = getSteps();
            var currentStep = null;
            var nextStep = null;
            for (var i = 0; i < tmpSteps.length; i++) {
                if (currentStep) {

                    if (tmpSteps[i].state && isMenuItemEnabled(tmpSteps[i])) {
                        nextStep = tmpSteps[i];
                        break;
                    }
                } else {
                    var stateIncludes = $state.includes(tmpSteps[i].state, tmpSteps[i].stateParams);
                    stateIncludes = (typeof stateIncludes === "undefined") ? false : stateIncludes;
                    if (tmpSteps[i].state != null && stateIncludes) {
                        currentStep = tmpSteps[i];
                    }
                }
            }
            return nextStep;
        }
    }

})();
(function () {
    'use strict';

    angular.module('smartbreachapp')
        .service('pageContextService', [pageContextService]);

    function pageContextService() {
        var context = {
            icon: '',
            breadcrumbs: [],
            titleComponents: []
        };

        return {
            context: context,
            clear: clearContext,
            setContextList: setContextList
        };

        function clearContext() {
            context.breadcrumbs.length = 0;
            context.titleComponents.length = 0;
        }

        function setContextList(contextList) {
            clearContext();
            _.each(contextList, function (pc) {
                if (pc.breadcrumbs && pc.breadcrumbs.length > 0) {
                    context.breadcrumbs = context.breadcrumbs.concat(pc.breadcrumbs);
                }

                if (pc.title) {
                    context.titleComponents = context.titleComponents.concat(pc.title);
                }

                if (pc.icon) {
                    context.icon = pc.icon;
                }
            });
        }
    }
})();

(function () {
    'use strict'

    angular.module('smartbreachapp')
        .factory('sharedProperties', function () {

        var property = "First";
        return {
            getProperty: function () {
                return property;
            },
            setProperty: function (value) {
                property = value;
            }
        }

    });

})();
(function () {
    'use strict';

    angular
        .module('smartbreachapp')
        .service('smartNavigationService', smartNavigationService);

    smartNavigationService.$inject = ['$rootScope', '$state', '$window'];

    function smartNavigationService($rootScope, $state, $window) {

        var service = {
            redirectToState: redirectToState
        };

        function redirectToState(item, openInNewWindow, $event) {
            angular.element(".menu-tab, .sub-menu-tab").removeClass('active-tab');
            angular.element($event.target).addClass('active-tab');
            if (openInNewWindow) {
                var url = $state.href(item.state, item.stateParams);
                $window.open(url, '_blank', 'status=0,toolbar=0,resizable=1');
            }
            else {
                $state.go(item.state, item.stateParams);
            }
        }

        return service;

    }

})();
(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('angularExamples', {
            templateUrl: '/static/app/modules/angularExamples/layout/first-page.html',
            controller: ['$scope', '$rootScope', '$window', '$timeout', 'sharedProperties', '$parse', '$compile', '$interpolate', controller]
        });

    function controller($scope, $rootScope, $window, $timeout, sharedProperties, $parse, $compile, $interpolate) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.oneWayBindingData = "One way data passed";
            $ctrl.twoWayBindingData = "Two way data passed";
        }

        angular.element("[data-toggle='tooltip']").tooltip({
            animated: 'fade',
            placement: 'right'
        });

        //$interpolate
        $ctrl.htmlStringValue = "Hyderabad";
        var htmlString = "Working from : {{$ctrl.htmlStringValue}}";
        $ctrl.htmlStringAssigned = $interpolate(htmlString)($scope);

        $ctrl.buttonText = "Click Me";
        var htmlButton = "<button ng-click='clickme();'>{{$ctrl.buttonText}}</button>";
        $ctrl.htmlButtonAssigned = $interpolate(htmlButton)($scope);

        //$parse
        $ctrl.name = 'Valluru';
        $ctrl.parse = $parse('$ctrl.name')($scope);
        $parse('$ctrl.name').assign($scope, 'Harish');
        $ctrl.parse_assign = $parse('$ctrl.name')($scope);

        //Browser Cache
        $scope.$watch('$ctrl.sessionStorage', function () {
            $window.sessionStorage.setItem('cacheValue', $ctrl.sessionStorage);
        });

        //Sharing properties between controllers
        $scope.$watch('$ctrl.sharedProperty', function () {
            sharedProperties.setProperty($ctrl.sharedProperty);
        });

        //Broadcast properties $rootScope ----> $scope
        $scope.$watch('$ctrl.broadcastProperty', function () {
            $rootScope.$broadcast('broadcastPropertyEvent', { 'broadcastValue': $ctrl.broadcastProperty })
        });

        $scope.$on('emitPropertyEvent', function (event, args) {
            $ctrl.emitPropertyValue = args.emitValue;
        });

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            //alert(current);
            if (current != next) {
                if ($scope.formFirstPage.$dirty) {
                    //alert(1);
                }
                else {
                    //alert(2);
                }
            }
        });



        //Inheritance in Javascript
        var ClassA = function () {
            this.name = "Matrix 1";
            this.trans = "Matrix 2";
        }

        ClassA.prototype.print = function () {
            console.log(this.name);
        }

        var a = new ClassA();

        //a.print();

        var inheritsFrom = function (child, parent) {
            child.prototype = Object.create(parent.prototype);
        };

        var ClassB = function () {
            this.name = "class B";
            this.surname = "I'm the child";
        }

        inheritsFrom(ClassB, ClassA);

        ClassB.prototype.print = function () {
            ClassA.prototype.print.call(this);
            console.log(this.surname);
        }

        var b = new ClassB();
        b.print();


    };
})();

(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('secondPage', {
            templateUrl: '/static/app/modules/angularExamples/layout/second-page.html',
            controller: ['$scope', '$rootScope', '$window', '$timeout', 'sharedProperties', controller],
            bindings: {
                'oneWayBinding': '<',
                'twoWayBinding': '='
            }
        });

    function controller($scope, $rootScope, $window, $timeout, sharedProperties) {
        
        var $ctrl = this;
        $ctrl.vmParent = $scope.vm;
        $ctrl.proceed = _proceed;

        $ctrl.$onInit = function () {
            $ctrl.countries = [
                { id: 1, name: 'India' },
                { id: 2, name: 'Japan' },
                { id: 3, name: 'China' },
                { id: 4, name: 'Russia' }
            ];
        }

        function _proceed() {
            //Set $window.sessionStorage value in second page
            if (!angular.isDefined($window.sessionStorage.getItem('cacheValue')) || $window.sessionStorage.getItem('cacheValue') != null) {
                $ctrl.sessionStorageValue = $window.sessionStorage.getItem('cacheValue');
            }

            //Set Shared property value from first page to second page
            $ctrl.sharedPropertyValue = sharedProperties.getProperty();
        }

        $scope.$on('broadcastPropertyEvent', function (event, args) {
            $ctrl.broadcastPropertyValue = args.broadcastValue;
        });

        //Emit properties $scope ----> $rootScope
        $scope.$watch('$ctrl.emitProperty', function () {
            $scope.$emit('emitPropertyEvent', { 'emitValue': $ctrl.emitProperty })
        });

    };
})();



(function () {
    'use strict';

    angular.module('smartbreachapp.dashboard')
        .component('appInformation', {
            templateUrl: '/static/app/modules/appInformation/layout/app-information.html',
            controller: ['$scope', controller],
            controllerAs: 'vm',
            bindings: {
                modalInstance: '<'
            }
        });

    function controller($scope) {
        var vm = this;
        vm.cancel = cancel;

        function cancel() {
            vm.modalInstance.dismiss();
        }

    }

})();
(function () {
    'use strict'

    angular.module('smartbreachapp.pages')
        .component('directiveFormcontrols', {
            templateUrl: 'static/app/modules/customDirectives/layout/directiveFormcontrols.html',
            controller: ['$scope', controller]
        })

    function controller($scope) {
        var $ctrl = this;
        $ctrl.name = 23;
        $ctrl.lastName = "With template from html controller";

    }


})();
(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('directiveFunctionalities', {
            templateUrl: '/static/app/modules/customDirectives/layout/directiveFuntionalities.html',
            controller: ['$scope', controller],
            controllerAs: 'vm'
        });

    function controller($scope) {
        var vm = this;
        vm.display = display;
        vm.oneWayData = 'Passed using one way binding';

        vm.twoWayBinding = "Passed using two way binding";

        angular.element("[data-toggle='tooltip']").tooltip({
            animated: 'fade',
            placement: 'right'
        });

        function display(value) {
            toastr.success(value);
        }

    }

})();
(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .directive('cardViewList', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                controller: ['$scope', controller],
                controllerAs: 'vm'


            }
        });

})();
(function () {
    'use strict';

    angular.module('smartbreachapp.pages')
        .directive('smartInputNt', function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    var i = 0;
                    ngModelCtrl.$parsers.push(function (viewValue) {
                        var viewValue = validateEvenOdd(viewValue, element);
                        ngModelCtrl.$setViewValue(viewValue);
                        ngModelCtrl.$render();
                        console.log("viewValue --" + viewValue);
                    });
                    ngModelCtrl.$formatters.push(function (modelValue) {
                        var modelValue = validateEvenOdd(modelValue, element);
                        console.log("modelValue --" + modelValue + " " + i++);
                        return modelValue;
                        //ngModelCtrl.$modelValue = modelValue;         // Doesn't work in $formatters
                        //ngModelCtrl.$setViewValue(modelValue);        // Doesn't work in $formatters - as modelValue is assigned automatically viewValue will also update
                        //ngModelCtrl.$render();                        // Doesn't work in $formatters
                    });
                }

            }
        });

    angular.module('smartbreachapp.pages')
        .directive('smartInputT', function () {
            return {
                restrict: 'EA',
                scope: {
                    sendModel: '='
                },
                controller: ['$scope', controller],
                controllerAs: 'vm',
                template: '<input type="text" ng-model="vm.sendModel1" class="form-control" />',
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    var i = 0;
                    ngModelCtrl.$parsers.push(function (viewValue) {
                        var viewValue = validateEvenOdd(viewValue, element);
                        ngModelCtrl.$setViewValue(viewValue);
                        ngModelCtrl.$render();
                        console.log("viewValue --" + viewValue);
                    });
                    ngModelCtrl.$formatters.push(function (modelValue) {
                        var modelValue = validateEvenOdd(modelValue, element);
                        console.log("modelValue --" + modelValue + " " + i++);
                        return modelValue;
                    });
                }
            }

            function controller($scope) {
                var vm = this;
                vm.sendModel1 = $scope.sendModel + "  ---  " + "Appended in directive controller";


            }

        });

    function validateEvenOdd(value, element) {
        var regNumberExp = /^\d*$/;
        if (regNumberExp.test(value)) {
            if (value % 2 === 0)
                $(element).css("border-color", "green");
            else
                $(element).css("border-color", "red");

            return value;
        }
        else {
            return null;
        }
    }

})();
(function () {
    'use strict';

    angular
    .module('smartbreachapp.pages')
    .directive('directiveTransclude', function () {
        var directive = {
            restrict: 'E',
            transclude: true,
            template: '<div style="cursor: pointer;padding: 20px; background-color: #ccc;">' +
                        '<b>This is directive template</b>&nbsp;&nbsp;&nbsp;&nbsp;' +
                          '<ng-transclude>' +
                          '</ng-transclude>' +
                        '</div>'
        }

        return directive;
    });

    //scope: false(default)
    angular
        .module('smartbreachapp.pages')
        .directive('directiveScopeFalse', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                scope: false,
                template: "<div>Product title : {{product}}</div>" +
                            "Type a new product title : <input type='text' class='form-control' ng-model='product' />"
            }

            return directive;
        });

    //scope: true
    angular
        .module('smartbreachapp.pages')
        .directive('directiveScopeTrue', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                scope: true,
                template: "<div>Product title : {{product1}}</div>" +
                            "Type a new product title : <input type='text' class='form-control' ng-model='product1' />"
            }

            return directive;
        });

    //scope: {} -- which is an isolated scope
    angular
        .module('smartbreachapp.pages')
        .directive('directiveScopeIsolated', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                scope: {
                    oneWayBinding: '@',
                    twoWayBinding: '=',
                    methodToCall: '&method'
                },
                templateUrl: 'template/scope/isolatedscope.html',
                controller: ['$scope', controller]
            }

            function controller($scope) {
                var vm = $scope;    //In a template for example, you'll need to bind a function to the scope to access it. You'll not be able to call a function binded on this directly.
                vm.viewDisplay = function () {
                    vm.methodToCall({ value: 'Returned from directive' });
                }
            }

            return directive;
        });

    angular.module("smartbreachapp.templates", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/scope/isolatedscope.html",
          "<h4>‘@’ – Text binding / one-way binding</h4><span>{{oneWayBinding}}</span><h4>‘=’ – Direct model binding / two-way binding</h4><span>{{twoWayBinding}}</span><h4>‘&’ – Behavior binding / Method binding</h4><button ng-click='viewDisplay()'>View Product</button>" +
          "");
    }]);

    //Compile function
    angular
        .module('smartbreachapp.pages')
        .directive('directiveCompile', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                scope: {
                    compileAttr: '=?'
                },
                template: '<h4>Compile Attribute changes</h4><div class="custom-div"><center><span>{{compileAttr}}</span></center></div>',
                controller: ['$scope', controller],
                compile: function (scope, element, attrs) {

                    //==========Not accesible, as the scope is not available for compile - Then use pre and post========//
                    //element.find('h4').css('color', 'steelblue');
                    //attrs.customAttr = 'Harish';
                    //scope.customAttr = "COMPILE - Attribute Data changed with compile function"; 

                    //return {
                    //    post: function (scope, element, attrs) {
                    //        scope.customAttr = "COMPILE - Attribute Data changed with compile function"; 
                    //    }
                    //}

                    return {
                        pre: function (scope, element, attrs) {
                            scope.compileAttr = "COMPILE - Attribute Data changed with compile function";
                        }
                    }

                    //return function preLink(scope, element, attrs) {
                    //    scope.customAttr = "COMPILE - Attribute Data changed with compile function"; 
                    //}

                    //return function postLink(scope, element, attrs) {
                    //    element.find('h4').css('color', 'steelblue');
                    //    scope.customAttr = "COMPILE - Attribute Data changed with compile function"; 
                    //}
                }
            }

            function controller($scope) {
                var vm = $scope;    //In a template for example, you'll need to bind a function to the scope to access it. You'll not be able to call a function binded on this directly.
            }

            return directive;
        });

    //Link function
    angular
        .module('smartbreachapp.pages')
        .directive('directiveLink', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                scope: {
                    linkAttr: '=?'
                },
                template: '<h4>{{linkheading}}</h4><div class="custom-div"><center><span>{{linkAttr}}</span></center></div>',
                controller: ['$scope', controller],
                link: function (scope, element, attrs) {
                    scope.linkAttr = "LINK - Attribute Data changed with link function";

                    element.find(".custom-div").css({ 'background-color': '#ccc', 'color': 'black' });

                    element.on('click', function () {
                        if (!element.find(".custom-div").hasClass("act"))
                            element.find(".custom-div").addClass("act").css({ 'background-color': 'steelblue', 'color': 'white' });
                        else
                            element.find(".custom-div").removeClass("act").css({ 'background-color': '#ccc', 'color': 'black' });
                    });

                }
            }

            function controller($scope) {
                var vm = $scope;    //In a template for example, you'll need to bind a function to the scope to access it. You'll not be able to call a function binded on this directly.
                vm.linkheading = "Link attribute changes";
            }

            return directive;
        });

    //bindToController
    angular
        .module('smartbreachapp.pages')
        .directive('directiveBindtocontroller', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                scope: {},
                controller: ['$scope', controller],
                controllerAs: 'vm',
                bindToController:{
                    bindtocontrollerAttr: '='
                },
                template: '<h4>{{vm.bindToControllerHeading}}</h4><span>{{vm.bindtocontrollerText}}</span>'
            }

            function controller($scope) {
                var vm = this;    //In a template for example, you'll need to bind a function to the scope to access it. You'll not be able to call a function binded on this directly.

                vm.$onInit = function () {
                    vm.bindToControllerHeading = "bindToController text changes";
                    vm.bindtocontrollerText = vm.bindtocontrollerAttr;
                }
                
            }

            return directive;
        });

    //services - $compile, $parse, $interpolate
    angular
        .module('smartbreachapp.pages')
        .directive('directiveServices', function () {
            var directive = {
                restrict: 'E',
                replace: false,
                controller: ['$scope', controller],
                controllerAs: 'vm',
                scope: {
                    oneWayBinding: '@',
                },
                template: '<h4>{{vm.bindToControllerHeading}}</h4><span>My name is {{oneWayBinding}}</span>'
            }

            function controller($scope) {
                var vm = $scope;    //In a template for example, you'll need to bind a function to the scope to access it. You'll not be able to call a function binded on this directly.

                vm.$onInit = function () {
                    vm.bindToControllerHeading = "$compile";
                }

            }

            return directive;
        });

})();
(function () {
    'use strict';

    angular.module('smartbreachapp.dashboard')
        .component('smartDashboard', {
            templateUrl: '/static/app/modules/dashboard/layout/dashboard.html',
            controller: ['$scope', '$rootScope', controller],
            controllerAs: 'vm'
        });

    function controller($scope, $rootScope) {

        var vm = this;
        vm.scope = $scope;
        vm.tgState = true;

        vm.menus = [
            {
                id: 'smartItems', name: 'Smart Items', state: 'dashboard.smartitems', cssClass: 'active-tab', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Form Builder', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formControls', name: 'Form Controls', state: 'dashboard.formcontrols', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false, stateParams: { employeeId : 37 }
            },
            {
                id: 'angularExamples', name: 'Angular Examples', state: 'dashboard.angularexamples', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'customDirectives', name: 'Custom Directives', cssClass: '', hasChildMenus: true, toOpenInNewWindow: false,
                childMenus: [
                    { name: 'Directive Functionalities', state: 'dashboard.directivefunctionalities', cssClass: '', toOpenInNewWindow: false },
                    { name: 'Directive Form Controls', state: 'dashboard.directiveformcontrols', cssClass: '', toOpenInNewWindow: false }
                ]
            },
        ];

    }

})();
(function () {
    'use strict';

    angular
        .module('smartbreachapp.dashboard').config(['$stateProvider', '$urlRouterProvider', config]);

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('/Dashboard', '/Dashboard/SmartItems');

        $stateProvider
            .state('dashboard',
            {
                abstract: true,
                url: "/Dashboard",
                template: '<smart-dashboard></smart-dashboard>'
            })
            .state('dashboard.smartitems',
            {
                url: "/SmartItems",
                template: "<smart-items></smart-items>"
            })
            .state('dashboard.formbuilder',
            {
                url: "/FormBuilder",
                template: "<dynamic-formbuilder></dynamic-formbuilder>"
            })
            .state('dashboard.formcontrols',
            {
                url: "/FormControls/:employeeId",
                template: "<form-controls></form-controls>"
            })
            .state('dashboard.angularexamples',
            {
                url: "/AngularExamples",
                template: "<angular-examples></angular-examples>"
            })
            .state('dashboard.directivefunctionalities',
            {
                url: "/DirectiveFunctionalities",
                template: "<directive-functionalities></directive-functionalities>"
            })
            .state('dashboard.directiveformcontrols',
            {
                url: "/DirectiveFormControls",
                template: "<directive-formcontrols></directive-formcontrols>"
            })

    }
})();
(function () {
    'use strict';

    angular.module('smartbreachapp.dashboard')
        .directive('smartNavigation', function () {

            var directive = {
                restrict: 'E',
                controller: ['$scope', '$state', '$window', 'navigationService', 'smartNavigationService', controller],
                controllerAs: 'vm',
                replace: false,
                scope: {},
                bindToController: {
                    menuToBuild: '=',
                    navigationMode: '@'
                },
                templateUrl: 'template/scope/sideNav.html',
                link: function (scope, elem, attrs) {

                }
            };

            function controller($scope, $state, $window, navigationService, smartNavigationService) {
                var vm = this;
                
                vm.smartNavigationService = smartNavigationService;

                vm.$onInit = function () {
                    vm.menus = vm.menuToBuild;
                }

            }

            return directive;

        });

    angular.module("smartbreachapp.templates").run(['$templateCache', function ($templateCache) {
        $templateCache.put("template/scope/sideNav.html",
            '<div class="mainmenu">' +
                '<div ng-repeat="menu in vm.menus" ng-class="{\'horzontal-nav\': vm.navigationMode == \'horizontal\'}">' +
                    '<div class="menu-tab {{menu.cssClass}}" ng-if="!menu.hasChildMenus" ng-click="vm.smartNavigationService.redirectToState(menu, menu.toOpenInNewWindow, $event)">{{menu.name}}</div>' +
                    '<div id="{{menu.id}}_btn" ng-if="menu.hasChildMenus" aria-expanded="false" data-toggle="collapse" data-target="#{{menu.id}}_submenu">{{menu.name}}<i class="fa fa-caret-down pull-right"></i></div>' +
                    '<ul class="collapse submenu" ng-if="menu.hasChildMenus" id="{{menu.id}}_submenu" aria-labelledby="{{menu.id}}_btn" role="menu">' +
                        '<li role="presentation" ng-repeat="childMenu in menu.childMenus" class="{{childMenu.cssClass}}">' +
                            '<div class="sub-menu-tab {{menu.cssClass}}" ng-click="vm.smartNavigationService.redirectToState(childMenu, childMenu.toOpenInNewWindow, $event)">{{childMenu.name}}</div>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>'
            )

    }])


})();
(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('dynamicFormbuilder', {
            templateUrl: '/static/app/modules/formBuilder/layout/formBuilder.html',
            controllerAs: 'vm',
            controller: ['$scope', '$rootScope', '$window', '$cacheFactory', '$timeout', '$filter', controller]
        });

    function controller($scope, $rootScope, $window, $cacheFactory, $timeout, $filter) {

        var vm = this;
        vm.addRow = _addRow;
        vm.removeRow = _removeRow;
        vm.getFormBuilderData = _getFormBuilderData;

        vm.countries = [
            { id: 1, name: 'India' },
            { id: 2, name: 'Japan' },
            { id: 3, name: 'China' },
            { id: 4, name: 'Russia' }
        ];

        vm.formBuilder = [{
            name: "",
            country: ""
        }];

        function _addRow() {
            var newItemNo = vm.formBuilder.length + 1;
            vm.formBuilder.push({
                name: "",
                country: ""
            });
        }

        function _removeRow() {
            var newItemNo = vm.formBuilder.length - 1;
            vm.formBuilder.pop({
                name: "",
                country: ""
            });
        }

        function _getFormBuilderData() {
            alert(angular.toJson(vm.formBuilder));
            console.log(angular.fromJson(vm.formBuilder));
        }

    };
})();
(function () {
    'use strict';

    angular.module('smartbreachapp.pages').component('formControls', {
            templateUrl: '/static/app/modules/formControls/layout/formControls.html',
            controllerAs: 'vm',
            controller: ['$q', '$scope', '$rootScope', '$window', '$cacheFactory', '$timeout', '$filter', '$uibModal', 'formControlService', 'formControlsHttpService', 'modalConfirmService', controller]
        });

    function controller($q, $scope, $rootScope, $window, $cacheFactory, $timeout, $filter, $uibModal, formControlService, formControlsHttpService, modalConfirmService) {

        var vm = this;
        vm.mode = 'fun'; //Lets test if property name is set to Rahil

        vm.query = _query;
        vm.get = _get;
        vm.put = _put;
        vm.post = _post
        vm.delete = _delete;

        vm.httpQuery = _httpQuery;
        vm.httpGet = _httpGet;
        vm.httpPut = _httpPut;
        vm.httpPost = _httpPost;
        vm.httpDelete = _httpDelete;

        vm.getFormData = _getFormData;
        vm.singleCustomList = _singleCustomList;
        vm.multipleCustomList = _multipleCustomList;

        //toastr.success("StateParam Parameter :   " + $stateParams.employeeId);

        $scope.$onInit = function () {
            vm.disableStatus = !vm.registrationForm.$invalid;
        }

        //$scope.$watch(angular.bind(this, function () {
        //    return this.name;
        //}), function (newVal) {
        //    console.log('Name changed to ' + newVal);
        //});

        vm.years = [2015, 2016, 2017];
        
        vm.gender = [
            { id: 1, type: 'Male' },
            { id: 2, type: 'Female' }
        ];

        vm.register = {
            multiSelectModel: []
        }

        vm.multiSelectData = [
            { id: 1, label: "David" },
            { id: 2, label: "Jhon" },
            { id: 3, label: "Danny" }
        ];

        vm.countries = [
            { id: 1, name: 'India' },
            { id: 2, name: 'Japan' },
            { id: 3, name: 'China' },
            { id: 4, name: 'Russia' }
        ];

        vm.allStates = [
            { id: 1, name: 'Andhra Pradesh', countryId: 1 },
            { id: 2, name: 'Telangana', countryId: 1 },
            { id: 3, name: 'Japan State 1', countryId: 2 },
            { id: 4, name: 'Japan State 2', countryId: 2 },
            { id: 5, name: 'Japan State 3', countryId: 2 },
            { id: 6, name: 'China State 1', countryId: 3 },
            { id: 7, name: 'Russia State 1', countryId: 4 },
            { id: 8, name: 'Russia State 2', countryId: 4 }
        ];

        vm.cities = {
            city1: 'Hyderabad',
            city2: 'Kurnool',
            city3: 'Visakapatnam',
            city4: 'vijayawada'
        }

        vm.towns = {
            town1: {id: 1, name: 'Town Name 1'},
            town2: { id: 2, name: 'Town Name 2' },
            town3: { id: 3, name: 'Town Name 3' },
            town4: { id: 4, name: 'Town Name 4' }
        }

        vm.directions = [
            { id: 1, name: 'East' },
            { id: 2, name: 'West' },
            { id: 3, name: 'North' },
            { id: 4, name: 'South' }
        ];

        vm.matrixVibes = [
            { id: 1, name: 'Matrix 1' },
            { id: 2, name: 'Matrix 2' },
            { id: 3, name: 'Matrix 3' },
            { id: 4, name: 'Matrix 4' }
        ];

        angular.element(document).ready(function () {
            $scope.$watch('vm.register.selectedCountry', function () {
                vm.states = vm.allStates.filter(function (s) {
                    return s.countryId == vm.register.selectedCountry;
                });
            });
        });

        angular.element("[data-toggle='tooltip']").tooltip({
            animated: 'fade',
            placement: 'right'
        });

        function _getFormData() {
            alert(JSON.stringify(vm.register));
        }

        //---------------------------------------USING API RESOURCE----------------------------------------------------------------------

        function _query() {
            formControlService.Register.query({}).then(function (data) {
                toastr.success('Using apiResource  : ' + data);
            });
        }

        function _get() {
            formControlService.Register.get({ id: 2444 }).then(function (data) {
                toastr.success('Using apiResource  : ' + data);
            });
        }

        function _put() {
            vm.vibes = { recid: 1, name: 'Matrix 1' };
            formControlService.Register.update({ id: 2444 }, vm.vibes).then(function (data) {
                toastr.success('Using apiResource  : ' + data);
            });
        }

        function _post() {
            vm.saveVibes = { id: 33, name: 'Matrix 2' };
            formControlService.Register.save({}, vm.saveVibes).then(function (data) {
                toastr.success('Using apiResource  : ' + data);
            });
        }

        function _delete() {
            formControlService.Register.delete({ id: 32 }).then(function (data) {
                toastr.success('Using apiResource  : ' + data);
            });
        }

        function _singleCustomList() {
            formControlService.Register.singleCustomList({}).then(function (data) {
                toastr.success('Using apiResource  : ' + data);
            });
        }

        function _multipleCustomList() {
            formControlService.Register.multipleCustomList({ dataSource: 5454 }).then(function (data) {
                toastr.success('Using apiResource  : ' + data.id + " , " + data.name);
            });
        }

        //------------------------------------USING $HTTP-------------------------------------------------------------

        function _httpQuery() {
            formControlsHttpService.httpQuery().then(function (response) {
                toastr.success('Using $http  : ' + response.data);
            });
        }

        function _httpGet() {
            formControlsHttpService.httpGet(14).then(function (response) {
                toastr.success('Using $http  : ' + response.data);
            });
        }

        function _httpPut() {
            vm.saveVibes = { id: 33, name: 'Matrix 2' };
            formControlsHttpService.httpPut(35, vm.saveVibes).then(function (response) {
                toastr.success('Using $http  : ' + response.data);
            });
        }

        function _httpPost() {
            vm.saveVibes = { id: 33, name: 'Matrix 2' };
            formControlsHttpService.httpPost(vm.saveVibes).then(function (response) {
                toastr.success('Using $http  : ' + response.data);
            });
        }

        function _httpDelete() {
            formControlsHttpService.httpDelete(56).then(function (response) {
                toastr.success('Using $http  : ' + response.data);
            });
        }

    };
})();

(function () {
    'use strict';

    angular.module('smartbreachapp.pages').
        service('formControlService', formControlService);

    formControlService.$inject = ['apiResource'];

    function formControlService(apiResource) {
        var service = {
            Register: apiResource('Smart/Register/:id', { id: '@RecordID', dataSource: "@DataSource" }, {
                singleCustomList: { method: 'GET', url: 'Smart/Register/:id/singleCustomList', isArray: true },
                multipleCustomList: { method: 'GET', url: 'Smart/Register/multipleCustomList/:dataSource', isArray: true } // isArray: true -- For list of objects
            })
        }
        return service;
    }

})();
(function () {
    'use strict'

    angular.module('smartbreachapp.pages')
        .service('formControlsHttpService', formControlsHttpService);

    formControlsHttpService.$inject = ['$http', 'RequestContext'];

    function formControlsHttpService($http, RequestContext) {

        var service = {
            httpQuery: httpQuery,
            httpGet: httpGet,
            httpPost: httpPost,
            httpPut: httpPut,
            httpDelete: httpDelete
        }

        function httpQuery() {
            return $http({
                method: 'GET',
                url: RequestContext.WebAPI_UrlPath + 'Smart/Register'
            });
        }

        function httpGet(id) {
            return $http({
                method: 'GET',
                url: RequestContext.WebAPI_UrlPath + 'Smart/Register/' + id
            });
        }

        function httpPost(dataToSave) {
            return $http({
                method: 'POST',
                url: RequestContext.WebAPI_UrlPath + 'Smart/Register',
                data: dataToSave
            });
        }

        function httpPut(id, dataToSave) {
            return $http({
                method: 'PUT',
                url: RequestContext.WebAPI_UrlPath + 'Smart/Register/' + id,
                data: dataToSave
            });
        }

        function httpDelete(id) {
            return $http({
                method: 'DELETE',
                url: RequestContext.WebAPI_UrlPath + 'Smart/Register/' + id
            });
        }

        return service;

    }

})();
(function () {
    'use strict';

    angular
        .module('smartbreachapp.pages')
        .component('unitTesting', {
            templateUrl: '/static/app/modules/formControls/layout/unitTest.html',
            controllerAs: 'vm',
            controller: ['$q', '$scope', '$rootScope', '$window', controller]
        });

    function controller($q, $scope, $rootScope, $window) {

        var vm = this;
        vm.mode = 'fun'; //Lets test if property name is set to Rahil
        vm.mode1 = 'funa';

    };
})();

(function () {
    'use strict';

    angular.module('smartbreachapp')
        .controller('ModalConfirm', ['$scope', '$uibModalInstance', 'text', 'title', 'okText', 'cancelText', 'isConfirm', ModalConfirm]);

    function ModalConfirm($scope, $uibModalInstance, text, title, okText, cancelText, isConfirm) {
        var vm = this;

        $scope.text = text;
        $scope.title = title;
        $scope.okText = okText;
        $scope.cancelText = cancelText;
        $scope.isConfirm = isConfirm;

        $scope.ok = ok;
        $scope.cancel = cancel;

        function ok() {
            $uibModalInstance.close();
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }
    }
})();
/// <reference path="layout/modal-confirm.html" />
/// <reference path="layout/modal-confirm.html" />
(function () {
    'use strict';

    angular.module('smartbreachapp')
        .service('modalConfirmService', ['$uibModal', '$q', modalConfirmService]);

    function modalConfirmService($uibModal, $q) {
        /* Service */

        var service = {
            confirm: showConfirmationDialog,
            confirmok: showConfirmationOkDialog
        };
        return service;

        /* Members */
        function showConfirmationDialog(options) {
            $q.all([
                //translationService.getTranslator('ConfirmService')
            ]).then(function (results) {
                //var translator = results[0];
                options.text = options.text || "Are you sure?";
                options.title = options.title || "Confirm";
                options.okText = options.okText || "OK";
                options.cancelText = options.cancelText || "Cancel";
                options.isConfirm = options.isConfirm || true;

                var modalInstance = $uibModal.open({
                    templateUrl: '/static/app/modules/modalConfirm/layout/modal-confirm.html',
                    controller: 'ModalConfirm',
                    resolve: {
                        text: function () {
                            return options.text;
                        },
                        title: function () {
                            return options.title;
                        },
                        okText: function () {
                            return options.okText;
                        },
                        cancelText: function () {
                            return options.cancelText;
                        }
                        ,
                        isConfirm: function () {
                            return options.isConfirm;
                        }
                    },
                    backdrop: 'static',
                    size: 'sm'
                });

                modalInstance.result.then(
                    function (res) { // User hit OK
                        if (options.onOk) {
                            options.onOk(res);
                        }
                    },
                    function () {
                        if (options.onCancel) {
                            options.onCancel();
                        }
                    }
            );
            }
            )
        };

        function showConfirmationOkDialog(options) {
            $q.all([
                //translationService.getTranslator('ConfirmService')
            ]).then(function (results) {
                //var translator = results[0];
                options.text = options.text || "Are you sure?";
                options.title = options.title || "Confirm";
                options.okText = options.okText || "OK";
                options.isConfirm = options.isConfirm || true;

                var modalInstance = $uibModal.open({
                    templateUrl: '/static/app/common/layout/modal-confirmok.html',
                    controller: 'ModalConfirmOK',
                    resolve: {
                        text: function () {
                            return options.text;
                        },
                        title: function () {
                            return options.title;
                        },
                        okText: function () {
                            return options.okText;
                        },
                        isConfirm: function () {
                            return options.isConfirm;
                        }
                    },
                    backdrop: 'static',
                    size: 'sm'
                });

                modalInstance.result.then(
                    function () { // User hit OK
                        if (options.onOk) {
                            options.onOk();
                        }
                    }
            );
            }
            )
        };
    }
})();

(function () {
    'use strict';

    angular.module('smartbreachapp.dashboard')
        .component('modalTabStructure', {
            templateUrl: '/static/app/modules/modalTabStructure/layout/modal-tab-structure.html',
            controller: ['$scope', '$state', controller],
            controllerAs: 'vm',
            bindings: {
                modalInstance: '<'
            }
        });

    function controller($scope, $state) {
        var vm = this;
        vm.cancel = cancel;
        vm.navigationMode = "horizontal";
        
        function cancel() {
            vm.modalInstance.close();
            $state.go('dashboard.smartitems');
        }

        vm.menus = [
            {
                id: 'formBuilder', name: 'Form Builder', state: 'tabstructure.formbuilder', cssClass: 'active-tab', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formcontrols', name: 'Form Controls', state: 'tabstructure.formcontrols', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'smartitems', name: 'Smart Items', state: 'tabstructure.smartitems', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            }];
    }

})();
(function () {
    'use strict';

    angular
        .module('smartbreachapp.dashboard').config(['$stateProvider', '$urlRouterProvider', config]);

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('tabstructure', {
                url: "/TabStructure/:employeeId",
                parent: 'dashboard.smartitems',
                resolve: {
                    modalInstance: ['$uibModal', function ($uibModal) {
                        return $uibModal.open(
                         {
                             component: 'modalTabStructure',
                             backdrop: 'static',
                             size: "lg",
                         });
                    }]
                }
            })
            .state('tabstructure.formbuilder',
            {
                url: "/FormBuilder",
                views: {
                    'tabbody@': {
                        template: "<dynamic-formbuilder></dynamic-formbuilder>"
                    }
                }
            })
            .state('tabstructure.formcontrols',
            {
                url: "/FormControls/:employeeId",
                views: {
                    'tabbody@': {
                        template: "<form-controls></form-controls>"
                    }
                }
            })
            .state('tabstructure.smartitems',
            {
                url: "/SmartItems",
                views: {
                    'tabbody@': {
                        template: "<smart-items></smart-items>"
                    }
                }
            })
    }
})();
(function () {
    'use strict';

    angular.module('smartbreachapp.pages')
        .component('smartItems', {
            templateUrl: '/static/app/modules/smartItems/layout/smartItems.html',
            controller: ['$scope', '$uibModal', '$state', 'modalConfirmService', controller],
            controllerAs: 'vm'
        });

    function controller($scope, $uibModal, $state, modalConfirmService) {
        var vm = this;
        vm.navigationMode = "horizontal";
        vm.openModalPopup = openModalPopup;
        vm.openTabStructureModalPopup = openTabStructureModalPopup;
        vm.openConfirmationPopup = openConfirmationPopup;
        vm.toastrSuccess = toastrSuccess;
        vm.toastrError = toastrError;
        vm.toastrWarning = toastrWarning;
        vm.toastrInfo = toastrInfo;

        vm.$onInit = function () {
            $scope.people = [
                { id: 1, first: 'John', last: 'Rambo', actor: 'Silvester' },
                { id: 2, first: 'Rocky', last: 'Balboa', actor: 'Silvester' },
                { id: 3, first: 'John', last: 'Kimble', actor: 'Arnold' },
                { id: 4, first: 'Ben', last: 'Richards', actor: 'Arnold' }
            ];
        }

        function openModalPopup() {
            var modalInstance = $uibModal.open(
             {
                 component: 'appInformation',
                 backdrop: 'static'
             });

            modalInstance.result.then(function (eventData) {

            }, function () {

            });
        }

        function openTabStructureModalPopup() {
            $state.go('tabstructure.formbuilder', { employeeId: 53 });
        }

        function openConfirmationPopup() {
            modalConfirmService.confirm
            ({
                text: "Are you sure you want to cancel?   All the changes will be discarded",
                title: "Confirmation Message",
                onOk: function () {

                },
                onCancel: function () {

                }
            });
        }

        function toastrSuccess() {
            toastr.success("toastr Success");
        }

        function toastrError() {
            toastr.error("toastr Error");
        }

        function toastrWarning() {
            toastr.warning("toastr Warning");
        }

        function toastrInfo() {
            toastr.info("toastr Info");
        }

        vm.menus = [
            {
                id: 'formBuilder', name: 'Menu 1', state: 'dashboard.formbuilder', cssClass: 'active', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 2', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 3', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 4', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 5', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 1', state: 'dashboard.formbuilder', cssClass: 'active', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 2', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 3', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 4', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 5', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 1', state: 'dashboard.formbuilder', cssClass: 'active', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 2', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 3', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 4', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            },
            {
                id: 'formBuilder', name: 'Menu 5', state: 'dashboard.formbuilder', cssClass: '', hasChildMenus: false, toOpenInNewWindow: false
            }
        ];
    }

})();
angular.module("smartbreachapp").run(["$templateCache", function($templateCache) {$templateCache.put("/static/app/app-loader.component.html","<div ng-switch=\"$ctrl.status\"><div class=\"loader-container\"><div ng-if=\"Loading || Error\" class=\"loader\"><div class=\"circle\"></div><div class=\"circle\"></div><div class=\"circle\"></div><div class=\"circle\"></div><div class=\"circle\"></div></div><div class=\"loader-text\"><center><h1 ng-switch-when=\"Error\">OMG, It\'s not working!</h1><h1 ng-switch-when=\"Loading\">Please Wait...</h1><h1 ng-switch-default>Staring...</h1></center></div></div><div ng-switch-when=\"Loaded\" style=\"height: 100%; width: 100%\" ng-transclude></div></div>");
$templateCache.put("/static/app/app-loader.html","<div ng-switch=\"$ctrl.status\"><div ng-show=\"$ctrl.status==\'Loading\' || $ctrl.status==\'Error\'\" class=\"loader-container\"><div class=\"loader\"><div class=\"circle\"></div><div class=\"circle\"></div><div class=\"circle\"></div><div class=\"circle\"></div><div class=\"circle\"></div></div><div class=\"loader-text\"><center><h1 ng-switch-when=\"Error\">OMG, It\'s not working!</h1><h1 ng-switch-when=\"Loading\">Please Wait...</h1><h1 ng-switch-default>Staring...</h1></center></div></div><div ng-show=\"$ctrl.status==\'Loaded\'\" style=\"height: 100%; width: 100%\" ng-transclude></div></div>");
$templateCache.put("/static/app/common/controls/input-selector.component.html","<div class=\"input-group input-selector\"><span class=\"input-group-btn\" ng-if=\"!$ctrl.required\"><button type=\"button\" class=\"btn btn-default fa fa-times\" ng-click=\"$ctrl.clear()\" ng-disabled=\"$ctrl.disabled || !$ctrl.displayName\"></button> </span><input type=\"text\" class=\"form-control\" ng-readonly=\"true\" value=\"{{$ctrl.displayName}}\"> <span class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default fa fa-search\" ng-click=\"$ctrl.openSelector()\" ng-disabled=\"$ctrl.disabled\" aria-hidden=\"true\"></button></span></div>");
$templateCache.put("/static/app/modules/angularExamples/layout/first-page.html","<div><form name=\"formFirstPage\"><div class=\"col-lg-12\"><div class=\"col-lg-6\"><div style=\"width: 100%; height: 50px; background-color: white\"></div><table><tr><td><span>$window.sessionStorage</span></td><td><input type=\"text\" ng-model=\"$ctrl.sessionStorage\" class=\"form-control\"></td></tr><tr><td><span>Share properties between controllers</span></td><td><input type=\"text\" ng-model=\"$ctrl.sharedProperty\" class=\"form-control\"></td></tr><tr><td><span>$broadcast</span></td><td><input type=\"text\" ng-model=\"$ctrl.broadcastProperty\" class=\"form-control\"></td></tr><tr><td><span>$emit</span></td><td><input type=\"text\" ng-model=\"$ctrl.emitPropertyValue\" class=\"form-control\"></td></tr><tr><td><span>Controller Bindings &nbsp; <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"\"></i></span></td><td><span>{{$ctrl.oneWayBindingData}}</span><br><span>{{$ctrl.twoWayBindingData}}</span> <input type=\"text\" ng-model=\"$ctrl.twoWayBindingData\"></td></tr></table></div><div class=\"col-lg-6\"><second-page one-way-binding=\"$ctrl.oneWayBindingData\" two-way-binding=\"$ctrl.twoWayBindingData\"></second-page></div></div><div class=\"col-lg-12\"><div style=\"width: 100%; height: 50px; background-color: white\"></div><table><tr><td><span>$interpolate &nbsp; <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"This service is used to evaluate angular expressions. You can run an entire string against a scope, and interpolate will give the result.\"></i></span></td><td><span ng-bind-html=\"$ctrl.htmlStringAssigned\"></span> &nbsp;&nbsp;<div ng-bind-html=\"$ctrl.htmlButtonAssigned\"></div></td></tr><tr><td><span>$parse &nbsp; <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"This service is used as a getter/setter for single variables only.\"></i></span></td><td>Parse : {{$ctrl.parse}} {{$ctrl.parse_assign}}</td></tr></table></div></form></div>");
$templateCache.put("/static/app/modules/angularExamples/layout/second-page.html","<div><div class=\"col-lg-12\" style=\"margin-top: 2px\"><input type=\"button\" class=\"btn btn-primary\" value=\"RUN\" ng-click=\"$ctrl.proceed();\"></div><div class=\"col-lg-12\" style=\"margin-top: 13px\"><table><tr><td><span>$window.sessionStorage</span></td><td><input type=\"text\" ng-model=\"$ctrl.sessionStorageValue\" class=\"form-control\"></td></tr><tr><td><span>Share properties between controllers</span></td><td><input type=\"text\" ng-model=\"$ctrl.sharedPropertyValue\" class=\"form-control\"></td></tr><tr><td><span>$broadcast</span></td><td><input type=\"text\" ng-model=\"$ctrl.broadcastPropertyValue\" class=\"form-control\"></td></tr><tr><td><span>$emit</span></td><td><input type=\"text\" ng-model=\"$ctrl.emitProperty\" class=\"form-control\"></td></tr><tr><td><span>controller bindings</span></td><td><input class=\"form-control\" type=\"text\" ng-model=\"$ctrl.oneWayBinding\"><br><input class=\"form-control\" type=\"text\" ng-model=\"$ctrl.twoWayBinding\"></td></tr></table></div></div>");
$templateCache.put("/static/app/modules/appInformation/layout/app-information.html","<div class=\"modal-header\"><button type=\"button\" class=\"close btn-nostyle\" ng-click=\"vm.cancel();\">&times;</button><h4 class=\"modal-title\">Application Information</h4></div><div class=\"modal-body\"><p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"vm.cancel()\">OK</button> <button class=\"btn btn-default\" ng-click=\"vm.cancel()\">Cancel</button></div>");
$templateCache.put("/static/app/modules/customDirectives/layout/directiveFormControls.html","<div><form name=\"vm.appRegistrationForm\"><div class=\"col-lg-12\"><table><tr><td>First Name :</td><td><input type=\"text\" ng-model=\"$ctrl.name\" smart-input-nt class=\"form-control\" required></td></tr><tr><td>First Name :</td><td><smart-input-t send-model=\"$ctrl.lastName\" ng-model=\"$ctrl.lastName\"></smart-input-t></td></tr></table></div><div class=\"col-lg-12 text-center\" style=\"padding-top:10px\"><input type=\"submit\" ng-disabled=\"!vm.appRegistrationForm.$valid\" value=\"Get Form Data\" class=\"btn btn-primary\" ng-click=\"vm.getFormData();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></form></div>");
$templateCache.put("/static/app/modules/customDirectives/layout/directiveFuntionalities.html","<div class=\"col-lg-12\"><table><tr><td><h3>restrict</h3></td><td><ul><li>A - (Attribute) = &lt;div doc&gt;&lt;/div&gt;</li><li>C - (Class) = &lt;div class=\"Doc\"&gt;&lt;/div&gt;</li><li>E - (Element) = &lt;doc data=\"book_data\"&gt;&lt;/doc&gt;</li><li>M - (comment) = &lt;!--directive:Doc --&gt;</li></ul></td></tr><tr><td><h3>transclude : true and ng-transclude</h3></td><td><directive-transclude><button>some button</button> <a href=\"#\">and a link</a></directive-transclude></td></tr><tr><td><h3>$compile</h3></td><td><div class=\"surround\"><directive-services one-way-binding=\"{{vm.oneWayData}}\"></directive-services></div></td></tr><tr><td><h3>scope : false(default)</h3></td><td><div class=\"surround\"><h4>Product: {{product}}</h4>Change Product Name : <input type=\"text\" class=\"form-control\" ng-model=\"product\"></div><div class=\"surround\"><directive-scope-false></directive-scope-false></div></td></tr><tr><td><h3>scope : true &nbsp; <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"There is one thing to note here: If the content in the text box in the header section is changed first, then this change is also reflected inside the directive. However, after the movie title in the directive is changed, any changes made to the heading text no longer affect the directive content. The explanation for this is that the ng-model creates a new movie variable only after the text box value is changed. Until then, it refers to the value in the parent scope.\"></i></h3></td><td><div class=\"surround\"><h4>Product: {{product1}}</h4>Change Product Name : <input type=\"text\" class=\"form-control\" ng-model=\"product1\"></div><div class=\"surround\"><directive-scope-true></directive-scope-true></div></td></tr><tr><td><h3>scope : { }(Isolated Scope)</h3><span></span></td><td><div class=\"surround\"><directive-scope-isolated custom-attr=\"\" one-way-binding=\"{{vm.oneWayData}}\" two-way-binding=\"vm.twoWayBinding\" data-method=\"vm.display(value)\"></directive-scope-isolated></div></td></tr><tr><td><h3>Compile function &nbsp; <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"The compile function is used for template DOM manipulation and if you need to perform some common calculations for all references of a given directive. It executes in phase when Angular compiles your directive. Compile function doesn’t have scope. So if you have multiple usages of directive on the page the compile function will executes once. In addition the compile function must return link function, since the link attribute is ignored if the compile attribute is defined.\"></i></h3></td><td><div class=\"surround\"><directive-compile compile-attr=\"\"></directive-compile></div></td></tr><tr><td><h3>Link function &nbsp; <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"The link function is normally used for registering DOM listeners, $watch expressions on the scope, manipulating of DOM for the current instance of the directive. This function executes in the linking phase, when the data from the $scope is attached to the function and then link function returns the linked html.\"></i></h3></td><td><div class=\"surround\"><directive-link link-attr=\"\"></directive-link></div></td></tr><tr><td><h3>bindToController</h3></td><td><div class=\"surround\"><directive-bindtocontroller bindtocontroller-attr=\"vm.twoWayBinding\"></directive-bindtocontroller></div></td></tr></table></div>");
$templateCache.put("/static/app/modules/dashboard/layout/dashboard.html","<!--Header--><div class=\"header\"><div class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container-fluid\"><div class=\"navbar-header\"><h2>Smart Breach</h2></div></div></div></div><div><!--Side Navigation--><div class=\"sidenav\" ng-class=\"{open: vm.tgState}\"><smart-navigation menu-to-build=\"vm.menus\"></smart-navigation></div><!--Main Content--><div class=\"content app-content\" ng-class=\"{\'sidenav-open\': vm.tgState}\"><div class=\"col-lg-12\"><div class=\"col-lg-1\"><hamburger-toggle state=\"vm.tgState\" class=\"hamburger-toggle\"></hamburger-toggle></div><div class=\"col-lg-11 main-content\"><div ui-view ng-class=\"{\'side-nav-active\': vm.tgState}\"></div></div></div></div></div><!--Footer--> <!--<div class=\"footer text-center\">\r\n    <p>\r\n        <span>&copy;&nbsp;&nbsp;Smart Breach</span>\r\n    </p>\r\n</div>\r\n<div class=\"clearfix\"></div>-->");
$templateCache.put("/static/app/modules/dashboard/layout/sidenav.html","<!--<div class=\"mainmenu\">\r\n    <div ng-repeat=\"menu in vm.menus\" ng-class=\"{\'horzontal-nav\': vm.navigationMode == \'horizontal\'}\">\r\n        <div class=\"menu-tab {{menu.cssClass}}\" ng-if=\"!menu.hasChildMenus\" ng-click=\"vm.smartNavigationService.redirectToState(menu, menu.toOpenInNewWindow, $event)\">{{menu.name}}</div>\r\n        <div id=\"{{menu.id}}_btn\" ng-if=\"menu.hasChildMenus\" aria-expanded=\"false\" data-toggle=\"collapse\" data-target=\"#{{menu.id}}_submenu\">{{menu.name}}<i class=\"fa fa-caret-down pull-right\"></i></div>\r\n        <ul class=\"collapse submenu\" ng-if=\"menu.hasChildMenus\" id=\"{{menu.id}}_submenu\" aria-labelledby=\"{{menu.id}}_btn\" role=\"menu\">\r\n            <li role=\"presentation\" ng-repeat=\"childMenu in menu.childMenus\" class=\"{{childMenu.cssClass}}\">\r\n                <div class=\"sub-menu-tab {{menu.cssClass}}\" ng-click=\"vm.smartNavigationService.redirectToState(childMenu, childMenu.toOpenInNewWindow, $event)\">{{childMenu.name}}</div>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>-->");
$templateCache.put("/static/app/modules/formBuilder/layout/formBuilder.html","<div class=\"form-builder\"><div class=\"col-lg-12 builder-padding form-control-div\" ng-repeat=\"formBuild in vm.formBuilder\"><center><div class=\"form-control-div col-lg-6\"><input type=\"text\" ng-model=\"formBuild.name\" class=\"form-control\"></div><div class=\"form-control-div col-lg-6\"><select ng-model=\"formBuild.country\" ng-options=\"country.name as country.name for country in vm.countries\" class=\"form-control\"><option>select</option></select></div></center></div><div class=\"col-lg-12 form-control-div\"><center><input type=\"button\" class=\"btn btn-primary\" value=\"Add Row\" ng-click=\"vm.addRow();\"> <input type=\"button\" class=\"btn btn-danger\" value=\"Delete Row\" ng-click=\"vm.removeRow();\"></center></div><div class=\"col-lg-12 form-control-div\"><center><input type=\"button\" class=\"btn btn-primary\" value=\"GET DATA\" ng-click=\"vm.getFormBuilderData();\"></center></div></div>");
$templateCache.put("/static/app/modules/formControls/layout/formControls.html","<div><form name=\"vm.registrationForm\"><div class=\"col-lg-12\"><table><tr><td>First Name :</td><td><input type=\"text\" ng-model=\"vm.register.firstName\" class=\"form-control\"></td></tr><tr><td>Last Name :</td><td><input type=\"text\" ng-model=\"vm.register.lastName\" class=\"form-control\"></td></tr><tr><td>Arc Year <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"Using ng-options - Dropdown with - Array of values - Last value should be selected by default - orderBy should be reverse\"></i> :</td><td><select class=\"form-control\" ng-model=\"vm.register.selectedArcYear\" ng-init=\"vm.register.selectedArcYear = vm.years[vm.years.length-1]\" ng-options=\"y for (x, y) in vm.years | orderBy:\'-\'\"></select></td></tr><tr><td>Stc Year <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"Using ng-repeat - Dropdown with - Array of values - Last value should be selected by default - orderBy should be reverse\"></i> :</td><td><select ng-model=\"vm.register.selectedStcYear\" class=\"form-control\"><option ng-selected=\"selected\" value=\"\">{{vm.years[vm.years.length - 1]}}</option><option ng-if=\"$index !== 0\" ng-repeat=\"year in vm.years | orderBy:\'-\'\" value=\"{{year}}\">{{year}}</option></select></td></tr><tr><td>Gender <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"Using ng-options with Array of objects\"></i> :</td><td><select ng-model=\"vm.register.selectedGender\" ng-options=\"gender.type as gender.type for gender in vm.gender\" class=\"form-control\"><option value=\"\">Select</option></select></td></tr><tr><td>Country <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"Cascading Dropdown - Using ng-repeat with Array of objects\"></i> :</td><td><select ng-model=\"vm.register.selectedCountry\" class=\"form-control\"><option value=\"\">Select</option><option ng-repeat=\"country in vm.countries\" value=\"{{country.id}}\">{{country.name}}</option></select></td></tr><tr><td>State <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"Cascading Dropdown - Using ng-repeat with Array of objects\"></i> :</td><td><select ng-model=\"vm.register.selectedState\" class=\"form-control\"><option value=\"\">Select</option><option ng-repeat=\"state in vm.states\" value=\"{{state.id}}\">{{state.name}}</option></select></td></tr><tr><td>City &nbsp; <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"The Data Source as an Object - key and value pair\"></i> :</td><td><select ng-model=\"vm.register.selectedCity\" ng-options=\"y for (x,y) in vm.cities\" class=\"form-control\"><option value=\"\">Select</option></select></td></tr><tr><td>Town &nbsp; <i class=\"fa fa-info-circle\" data-toggle=\"tooltip\" title=\"The Data Source as an Object - key and value pair and value as an object\"></i> :</td><td><select ng-model=\"vm.register.selectedTown\" ng-options=\"y.name for (x,y) in vm.towns\" class=\"form-control\"><option value=\"\">Select</option></select></td></tr><tr><td>Address</td><td><textarea ng-model=\"vm.register.address\" rows=\"3\" class=\"form-control\"></textarea></td></tr><tr><td>Direction</td><td><span ng-repeat=\"direction in vm.directions\" style=\"padding-left: 10px\"><input type=\"radio\" ng-model=\"vm.register.direction\" value=\"{{direction.name}}\">{{direction.name}}</span></td></tr><tr><td>Matrix Vibes</td><td><span ng-repeat=\"matrix in vm.matrixVibes\" style=\"padding-left: 10px\"><input checklist-model=\"vm.register.selectedMatrix\" checklist-value=\"matrix.name\" type=\"checkbox\">{{matrix.name}}</span></td></tr><tr><td>Multi select dropdown</td><td><div ng-dropdown-multiselect=\"\" options=\"vm.multiSelectData\" selected-model=\"vm.register.multiSelectModel\"></div></td></tr><tr><td>Input Selector :</td><td><aon-eb-input-selector ng-required=\"false\" disabled=\"false\" ng-model=\"$ctrl.selected.CopyID\" selector=\"\'Line\'\" keyfield=\"\'RecordID\'\"></aon-eb-input-selector></td></tr></table></div><div class=\"col-lg-12 text-center\" style=\"padding-top:10px\"><input type=\"submit\" ng-disabled=\"vm.disableStatus\" value=\"Get Form Data\" class=\"btn btn-primary\" ng-click=\"vm.getFormData();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class=\"col-lg-12 text-center\" style=\"padding-top:10px\"><div class=\"col-lg-2\"><span>Using API Resource</span></div><div class=\"col-lg-10\"><input type=\"submit\" value=\"Query\" class=\"btn btn-primary\" ng-click=\"vm.query();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"submit\" value=\"Get\" class=\"btn btn-primary\" ng-click=\"vm.get();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"submit\" value=\"Post\" class=\"btn btn-primary\" ng-click=\"vm.post();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"submit\" value=\"Put\" class=\"btn btn-primary\" ng-click=\"vm.put();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"submit\" value=\"Delete\" class=\"btn btn-primary\" ng-click=\"vm.delete();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"submit\" value=\"Custom method without Id\" class=\"btn btn-primary\" ng-click=\"vm.singleCustomList();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"submit\" value=\"Custom method Id\" class=\"btn btn-primary\" ng-click=\"vm.multipleCustomList();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div><div class=\"col-lg-12 text-center\" style=\"padding-top:10px\"><div class=\"col-lg-2\"><span>Using $http</span></div><div class=\"col-lg-10\"><input type=\"submit\" value=\"Query\" class=\"btn btn-primary\" ng-click=\"vm.httpQuery();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"submit\" value=\"Get\" class=\"btn btn-primary\" ng-click=\"vm.httpGet();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"submit\" value=\"Post\" class=\"btn btn-primary\" ng-click=\"vm.httpPost();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"submit\" value=\"Put\" class=\"btn btn-primary\" ng-click=\"vm.httpPut();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type=\"submit\" value=\"Delete\" class=\"btn btn-primary\" ng-click=\"vm.httpDelete();\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div></form></div>");
$templateCache.put("/static/app/modules/formControls/layout/unitTest.html","<!DOCTYPE html><html><head><title></title><meta charset=\"utf-8\"></head><body></body></html>");
$templateCache.put("/static/app/modules/modalConfirm/layout/modal-confirm.html","<div class=\"modal-header\"><button type=\"button\" class=\"close btn-nostyle\" ng-click=\"cancel()\">×</button><h4 class=\"modal-title\" ng-bind=\"title\"></h4></div><div class=\"modal-body\"><div ng-bind=\"text\"></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\" ng-bind=\"okText\"></button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\" ng-bind=\"cancelText\" ng-show=\"isConfirm\"></button></div>");
$templateCache.put("/static/app/modules/modalTabStructure/layout/modal-tab-structure.html","<div class=\"modal-header\"><button type=\"button\" class=\"close btn-nostyle\" ng-click=\"vm.cancel();\">&times;</button><h4 class=\"modal-title\">Application Information</h4></div><div class=\"modal-body\"><smart-navigation menu-to-build=\"vm.menus\" navigation-mode=\"{{vm.navigationMode}}\"></smart-navigation><div ui-view=\"tabbody\"></div></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"vm.cancel()\">OK</button> <button class=\"btn btn-default\" ng-click=\"vm.cancel()\">Cancel</button></div>");
$templateCache.put("/static/app/modules/smartItems/layout/smartItems.html","<div class=\"col-lg-12\"><div class=\"col-lg-12 table-padding\"><div class=\"col-lg-4\"><span>Modal Popup</span></div><div class=\"col-lg-8\"><button class=\"btn btn-primary\" ng-click=\"vm.openModalPopup();\">Open Modal Popup</button></div></div><div class=\"col-lg-12 table-padding\"><div class=\"col-lg-4\"><span>Modal Popup with Tab Structure</span></div><div class=\"col-lg-8\"><button class=\"btn btn-primary\" ng-click=\"vm.openTabStructureModalPopup();\">Open Modal Popup with Tab Structure</button></div></div><div class=\"col-lg-12 table-padding\"><div class=\"col-lg-4\"><span>Confirmation Popup</span></div><div class=\"col-lg-8\"><button class=\"btn btn-primary\" ng-click=\"vm.openConfirmationPopup();\">Open Confirmation Popup</button></div></div><div class=\"col-lg-12 table-padding\"><div class=\"col-lg-4\"><span>Horizontal navigation</span></div><div class=\"col-lg-8\"><smart-navigation menu-to-build=\"vm.menus\" navigation-mode=\"{{vm.navigationMode}}\"></smart-navigation></div></div><div class=\"col-lg-12 table-padding\"><div class=\"col-lg-4\"><span>toastr Messages</span></div><div class=\"col-lg-8\"><button class=\"btn btn-success\" ng-click=\"vm.toastrSuccess();\">toastr Success</button> <button class=\"btn btn-danger\" ng-click=\"vm.toastrError();\">toastr Error</button> <button class=\"btn btn-info\" ng-click=\"vm.toastrInfo();\">toastr Info</button> <button class=\"btn btn-warning\" ng-click=\"vm.toastrWarning();\">toastr Warning</button></div></div><div class=\"col-lg-12 table-padding\"><div class=\"col-lg-4\"><span>Icon Picker</span></div><div class=\"col-lg-8\"><ui-iconpicker ng-model=\"iconClass\" groups=\"font-awesome\"></ui-iconpicker>&nbsp;&nbsp;&nbsp;<span class=\"icon-name\"></span></div></div><div class=\"col-lg-12 table-padding\"><div class=\"col-lg-4\"><span>Animated Search</span></div><div class=\"col-lg-8\"><input type=\"text\" class=\"form-control\" ng-model=\"searchString\"><div ng-repeat=\"person in people | filter:searchString | orderBy:sort\" class=\"animated-search\">{{ person.first + \' \' + person.last }}</div></div></div></div>");}]);
//# sourceMappingURL=maps/app-d5235d3ae7.js.map
