const HOST = "http://b57df09d.ngrok.io";

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      if (request.type === "getDevice") {
        sendRequest(generateQuery(request))
        .then(data => {
            console.log(data)
            if(!data.error) {
                let id = data.id,
                    devicesFromStorage = getFromStorage('devices');
                    devices = devicesFromStorage ? devicesFromStorage : [];
                if (devices) {
                    devices.push(data);
                } else {
                    devices.push(data);
                }
                storeToStorage('devices', devices);
                sendResponse();
            }
        });
      } else if (request.type === "getDevices") {
        sendRequest(generateQuery(request))
        .then(data => {
            storeToStorage('devices', data);
            sendResponse(data)
        });
      }
      return true; 
});


function storeToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
function getFromStorage(key) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
}

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