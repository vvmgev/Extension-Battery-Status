const HOST = "http://7e2f0518.ngrok.io";


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.type === "getData") {
        sendRequest(generateQuery(request))
        .then(data => sendResponse(data));
      } else if (request.type === "getDevices") {
        sendRequest(generateQuery(request))
        .then(data => {
            storeDevices(JSON.stringify(data));
            sendResponse(data)
        });
      } 

      
      return true; 
});


function storeDevices(devices) {
    localStorage.setItem('devices', devices)
}

function generateQuery(query) {
    let url = HOST;
    Object.keys(query).map((value, key) => {
        url = url.indexOf('?') !== -1 ? 
        url + '&' + value + '=' + query[value] :
        url + '?' + value + '=' + query[value]; 
    })
    console.log(url)
    return url;
}


async function sendRequest(url) {
    let response = await fetch(url),
    data = await response.json();
    return data;
}