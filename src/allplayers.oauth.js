/** The allplayers namespace. */
var allplayers = allplayers || {};

/** The allplayers.group namespace */
allplayers.consumer = allplayers.consumer || {};

allplayers.consumer.credentials = {
  consumerKey    : "",
  consumerSecret : "",
  tokenKey    : "",
  tokenSecret : "",
  serviceProvider: {
    signatureMethod     : "HMAC-SHA1",
    requestTokenURL     : "/oauth/request_token",
    userAuthorizationURL: "/oauth/authorize",
    accessTokenURL      : "/oauth/access_token"
  }
};

// TODO: collapse these into one function
allplayers.consumer.request_token =
function request_token(site_url, consumerKey, consumerSecret) {
  var url = site_url + allplayers.consumer.credentials.serviceProvider.requestTokenURL;
  allplayers.consumer.credentials.consumerKey = consumerKey;
  allplayers.consumer.credentials.consumerSecret = consumerSecret;
  var accessor = {
    consumerSecret: allplayers.consumer.credentials.consumerSecret,
    tokenSecret   : allplayers.consumer.credentials.tokenSecret
  };
  var message = {
    action: url,
    method: "get",
    parameters: [
      ["oauth_consumer_key", allplayers.consumer.credentials.consumerKey],
      ["oauth_signature_method","HMAC-SHA1"],
      ["oauth_timestamp",""],
      ["oauth_nonce",""],
      ["oauth_signature",""]
    ]
  };
  var query = {
    url: url,
    data: {}
  };
  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);
  query.data = OAuth.getParameterMap(message.parameters);
  return query;
};

allplayers.consumer.access_token =
function access_token(site_url, tokenKey, tokenSecret) {
  var url = site_url + allplayers.consumer.credentials.serviceProvider.accessTokenURL;
  allplayers.consumer.credentials.tokenKey = tokenKey;
  allplayers.consumer.credentials.tokenSecret = tokenSecret;
  var accessor = {
    consumerSecret: allplayers.consumer.credentials.consumerSecret,
    tokenSecret   : allplayers.consumer.credentials.tokenSecret
  };
  var message = {
    action: url,
    method: "get",
    parameters: [
      ["oauth_consumer_key", allplayers.consumer.credentials.consumerKey],
      ["oauth_token", allplayers.consumer.credentials.tokenKey],
      ["oauth_signature_method","HMAC-SHA1"],
      ["oauth_timestamp",""],
      ["oauth_nonce",""],
      ["oauth_signature",""]
    ]
  };
  var query = {
    url: url,
    data: {}
  };
  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);
  query.data = OAuth.getParameterMap(message.parameters);
  return query;
};

allplayers.consumer.authorized_call =
function authorized_call(site_url, tokenKey, tokenSecret) {
  var url = site_url;
  allplayers.consumer.credentials.tokenKey = tokenKey;
  allplayers.consumer.credentials.tokenSecret = tokenSecret;
  var accessor = {
    consumerSecret: allplayers.consumer.credentials.consumerSecret,
    tokenSecret   : allplayers.consumer.credentials.tokenSecret
  };
  var message = {
    action: url,
    method: "get",
    parameters: [
      ["oauth_consumer_key", allplayers.consumer.credentials.consumerKey],
      ["oauth_token", allplayers.consumer.credentials.tokenKey],
      ["oauth_signature_method","HMAC-SHA1"],
      ["oauth_timestamp",""],
      ["oauth_nonce",""],
      ["oauth_signature",""]
    ]
  };
  var query = {
    url: url,
    data: {}
  };
  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);
  query.data = OAuth.getParameterMap(message.parameters);
  return query;
};
