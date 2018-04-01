const HOST = "http://f67ebb71.ngrok.io";


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type === "getData") {
        sendRequest(generateQuery(request))
        .then(data => sendResponse(data));
      } 
      return true; 
});


function generateQuery(query) {
    let url = HOST;
    Object.keys(query).map((value, key) => {
        url = url.indexOf('?') !== -1 ? 
        url + '&' + value + '=' + query[value] :
        url + '?' + value + '=' + query[value]; 
    })
    return url;
}


async function sendRequest(url) {
    let response = await fetch(url),
    data = await response.json();
    return data;
}