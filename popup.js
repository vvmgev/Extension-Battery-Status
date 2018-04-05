$(function(){
    let log = chrome.extension.getBackgroundPage().console.log;

    getDevices();
    renderDevices();

    // '[{"id":1111,"deviceName":"samsung galaxy s8","percentage":14},{"id":2222,"deviceName":"samsung note 8","percentage":56},{"id":3333,"deviceName":"iphone 7","percentage":81}]';

    function renderDevices(devices) {
      devices = devices ? devices : getDevicesFromStorage();
      if (devices) {
        $('.content').html('');
        devices.map(device => {
          let { deviceName, percentage, id} = device;
          let deviceHtml = `
            <div class="device">
                <h3>${deviceName}</h3>
                <h1>${percentage}%</h1>
                <div class="battery" id="battery-${id}">
                    <div></div>
                </div>
            </div>
          `;
          $('.content').append(deviceHtml);
          batUpdate(id, percentage);
        })
      }
    }


    function getDevices() {
      let ids = getIds();
      if (ids) {
        sendMessage({type: 'getDevices', ids: JSON.stringify(ids)} , (response) => {
          log(response)
          renderDevices();
        })
      }
    }
    


    $('body').on('click', '.add-device-btn', () => {
      let id = Number($('.add-device-inp').val());
      if (!isNaN(id)) {
        sendMessage({type: 'getDevice', id} , (response) => {
          setBattery(response);
        })
      } else {
        alert('NaN')
      }
    });

    async function sendMessage(data, callback) {
      chrome.runtime.sendMessage(data, function(response) {
        if(typeof callback === 'function') {
          callback(response);
        }
      });
    }


    function getDevicesFromStorage() {
      let devices = localStorage.getItem('devices');
      if (devices) {
          return JSON.parse(devices);
      }
    }

    function getIds() {
      let devices = getDevicesFromStorage();
      return  devices ? devices.map(device => device.id) : undefined;
    }

    function batUpdate(id, percentage){
      if(percentage<20){
        // Red - Danger!
        col = ["#750900","#c6462b", "#b74424", "#df0a00", "#590700"];
      }else if(percentage<40){
        // Yellow - Might wanna charge soon...
        col = ["#754f00","#f2bb00", "#dbb300", "#df8f00", "#593c00"];
      }else{
        // Green - All good!
        col = ["#316d08","#60b939", "#51aa31", "#64ce11", "#255405"];
      }
      $(`#battery-${id} div`).css("background-image","linear-gradient(to right, transparent 5%, "+col[0]+" 5%, "+col[0]+" 7%, "+col[1]+" 8%, "+col[1]+" 10%, "+col[2]+" 11%, "+col[2]+" "+ (percentage-3) +"%, "+col[3]+" "+ (percentage-2) +"%, "+col[3]+" "+ percentage +"%, "+col[4]+" "+ percentage +"%, black "+ (percentage+5) +"%, black 95%, transparent 95%), linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.4) 4%, rgba(255,255,255,0.2) 7%, rgba(255,255,255,0.2) 14%, rgba(255,255,255,0.8) 14%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0) 41%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.4) 86%, rgba(255,255,255,0.6) 90%, rgba(255,255,255,0.1) 92%, rgba(255,255,255,0.1) 95%, rgba(255,255,255,0.5) 98%)");
    }
})

