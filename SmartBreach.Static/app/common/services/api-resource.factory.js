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