var request = require("request");

function hug(callback) {
  request.get({
    "method" : "GET",
    "uri": "https://api.furry.bot/furry/sfw/hug",
    "followRedirect":false,
	"headers": {
      'User-Agent': 'DanteBot 0.1 Beta'
    }
  },function (err, res, body) {
	  
	  var inp = String(body);
	  var resp = JSON.parse(inp);
	  var img = resp.response.image;
	  
      callback(img);
  });
}

function kiss(callback) {
  request.get({
    "method" : "GET",
    "uri": "https://api.furry.bot/furry/sfw/kiss",
    "followRedirect":false,
	"headers": {
      'User-Agent': 'DanteBot 0.1 Beta'
    }
  },function (err, res, body) {
	  
	  var inp = String(body);
	  var resp = JSON.parse(inp);
	  var img = resp.response.image;
	  
      callback(img);
  });
}


function lick(callback) {
  request.get({
    "method" : "GET",
    "uri": "https://api.furry.bot/furry/sfw/lick",
    "followRedirect":false,
	"headers": {
      'User-Agent': 'DanteBot 0.1 Beta'
    }
  },function (err, res, body) {
	  
	  var inp = String(body);
	  var resp = JSON.parse(inp);
	  var img = resp.response.image;
	  
      callback(img);
  });
}

function boop(callback) {
  request.get({
    "method" : "GET",
    "uri": "https://api.furry.bot/furry/sfw/boop",
    "followRedirect":false,
	"headers": {
      'User-Agent': 'DanteBot 0.1 Beta'
    }
  },function (err, res, body) {
	  
	  var inp = String(body);
	  var resp = JSON.parse(inp);
	  var img = resp.response.image;
	  
      callback(img);
  });
}

function cuddle(callback) {
  request.get({
    "method" : "GET",
    "uri": "https://api.furry.bot/furry/sfw/cuddle",
    "followRedirect":false,
	"headers": {
      'User-Agent': 'DanteBot 0.1 Beta'
    }
  },function (err, res, body) {
	  
	  var inp = String(body);
	  var resp = JSON.parse(inp);
	  var img = resp.response.image;
	  
      callback(img);
  });
}

module.exports = {
  hug: hug,
  kiss:kiss,
  lick:lick,
  boop:boop,
 cuddle:cuddle
}
