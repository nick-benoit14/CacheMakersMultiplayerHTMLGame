
UrlManager = function(){
}

UrlManager.addUrlParams = function(obj, paramHash){ //Takes has of URL's adds parameters to each
if(obj && paramHash){
  var paramString = "?";
  Object.keys(paramHash).forEach(function(key){paramString += ('&' + key + '=' + paramHash[key]);});
  Object.keys(obj).forEach(function(key){
    obj[key] += paramString;
  });
}else{console.log("Url or parameter Object not valid");}}

UrlManager.unParam = function(url){
  if(url){var strings = url.split('?');
  return strings[0]
  }else console.log("Not Valid Url");}

 UrlManager.getUrlParam = function(){ //Returns Url Parameters
    var url = window.location.search.substring(1);
    var variables = url.split('&');
    var obj = {};
    for(var i = 0; i < variables.length; i++){
      var paramName = variables[i].split('=');
      if(paramName != ""){
        obj[paramName[0]] = paramName[1];
      }
    }
    return obj;
  }
