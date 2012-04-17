/** The allplayers namespace. */
var allplayers = allplayers || {};

/** The allplayers.group namespace */
allplayers.consumer = allplayers.consumer || {};

allplayers.consumer.credentials = {
  consumerKey    : "AWeKC3PVG7DmP8JcgFgACqAL4tz3HkGD",
  consumerSecret : "XCGYQS9noNt3wJxDKJ3CTmSa8mA8v3gs",
  tokenKey    : "",
  tokenSecret : "",
  serviceProvider: {
    signatureMethod     : "HMAC-SHA1",
    requestTokenURL     : "/oauth/request_token",
    userAuthorizationURL: "/oauth/authorize",
    accessTokenURL      : "/oauth/access_token"
  }
};

allplayers.consumer.request_token =
function request_token(data) {
    var accessor = {
      consumerSecret: allplayers.consumer.credentials.consumerSecret,
      tokenSecret   : allplayers.consumer.credentials.tokenSecret
    };
    var message = {
      action: form.action,
      method: form.method,
      parameters: []
    };
   /* for (var e = 0; e < form.elements.length; ++e) {
        var input = form.elements[e];
        if (input.name != null && input.name != "" && input.value != null
            && (!(input.type == "checkbox" || input.type == "radio") || input.checked))
        {
            message.parameters.push([input.name, input.value]);
        }
    }
    */
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    data = OAuth.getParameterMap(message.parameters);
    /*for (var p in parameterMap) {
        if (p.substring(0, 6) == "oauth_"
         && form[p] != null && form[p].name != null && form[p].name != "")
        {
            form[p].value = parameterMap[p];
        }
    }*/
    return "" + allplayers.consumer.credentials.serviceProvider.requestTokenURL;
};
