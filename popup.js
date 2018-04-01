$(function(){
    var log = chrome.extension.getBackgroundPage().console.log;
  
    var mouseTimer,showingOff, charge = default_charge = 50;
        batUpdate();

    // sendMessage({type: 'getPercentage'} , (response) => {
    //   log(response)
    // })


    $('body').on('click', '.add-device-btn', () => {
      let id = Number($('.add-device-inp').val());
      if (!isNaN(id)) {
        sendMessage({type: 'getData', id} , (response) => {
          setBatter(response);
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


    let id = response.id,
    percentage = response.percentage;
    charge = default_charge = Number(percentage);
    batUpdate();

        


        //   $("#buttons div").mousedown(function(){
        //     var charging = $(this).hasClass("more");
        //     mouseTimer = setInterval(function(){
        //       if(charge>1 && !charging){
        //         charge--;
        //       }else if(charge<100 && charging){
        //         charge++;
        //       }else{
        //         return false;
        //       }
        //       batUpdate();
        //     },250);
        //   }).click(function(){
        //     clearInterval(mouseTimer);
        //     if(charge>1 && !$(this).hasClass("more")){
        //       charge--;
        //     }else if(charge<100 && $(this).hasClass("more")){
        //       charge++;
        //     }else{
        //       return false;
        //     }
        //     batUpdate();
        //     log(charge)
        //   });
          // $(document).mouseup(function(){
            // clearInterval(mouseTimer);
            // return false;
          // });
          function batUpdate(){
            //console.log("Charge: ",charge);
            if(charge<20){
              // Red - Danger!
              col = ["#750900","#c6462b", "#b74424", "#df0a00", "#590700"];
            }else if(charge<40){
              // Yellow - Might wanna charge soon...
              col = ["#754f00","#f2bb00", "#dbb300", "#df8f00", "#593c00"];
            }else{
              // Green - All good!
              col = ["#316d08","#60b939", "#51aa31", "#64ce11", "#255405"];
            }
            $(".battery div").css("background-image","linear-gradient(to right, transparent 5%, "+col[0]+" 5%, "+col[0]+" 7%, "+col[1]+" 8%, "+col[1]+" 10%, "+col[2]+" 11%, "+col[2]+" "+ (charge-3) +"%, "+col[3]+" "+ (charge-2) +"%, "+col[3]+" "+ charge +"%, "+col[4]+" "+ charge +"%, black "+ (charge+5) +"%, black 95%, transparent 95%), linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.4) 4%, rgba(255,255,255,0.2) 7%, rgba(255,255,255,0.2) 14%, rgba(255,255,255,0.8) 14%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0) 41%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.4) 86%, rgba(255,255,255,0.6) 90%, rgba(255,255,255,0.1) 92%, rgba(255,255,255,0.1) 95%, rgba(255,255,255,0.5) 98%)");
          }
    })

