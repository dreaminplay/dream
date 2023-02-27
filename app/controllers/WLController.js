
const fs = require ('fs')
const axios = require('axios')
const getApp = async (req, res) => {

   let response = {}
   var wlDatas = [];
   var reqDomain = getDomainName(req.get('referer'));

   fs.readFile('./app/theme/wldata.json', 'utf8', (err, data) => {
      wlDatas = JSON.parse(data)
      var wldata = wlDatas.filter(wl => wl.appDomain == reqDomain)

      if(wldata.length > 0){

         response.appName = wldata[0].appName
         response.appTheme = wldata[0].appTheme
         res.send(response)

      }else{
         res.send({
            'error': 'Invalid Authentication'
         })
      }

   })

}





const getTheme = async (req, res) => {

    res.type('css');
    let logo = ''
    
    var wlDatas = [];
    var reqDomain = getDomainName(req.get('referer'));
 
    fs.readFile('./app/theme/wldata.json', 'utf8', (err, data) => {
       wlDatas = JSON.parse(data)
       var wldata = wlDatas.filter(wl => wl.appDomain == reqDomain)
 
       if(wldata.length > 0){
 
         logo = 'https://app.dreambetapi.com/logo/'+wldata[0].appLogo

          let response = ':root {'+
          '--mob-primary: #0a0c24;'+
          '--mob-secondary: #1d203c;'+
          '--third: #212547;'+
          '--event-color: #2d3362;'+
          '--tab-color: #202655;'+
          '--selection:#2f345b;'+
          '--inplay-off: #ffffff59;'+
          '--header-button: #242651; '+
          '--fancy-name: #1c203c;'+
          '--home-box: #131537;'+
          '--login-button: #FF6B00;'+
          '--background: #eaeaea;'+
          '--on-background: #1e1e1e;'+
          '--primary: #081c2f;'+
          '--on-primary: #fff;'+
          '--secondary: #fdc10e;'+
          '--on-secondary: #333;'+
          '--surface: #fff;'+
          '--on-surface: #1e1e1e;'+
          '--error: #d0021b;'+
          '--on-error: #eee;'+
          '--warning: #F6BB42;'+
          '--on-warning: #eee;'+
          '--app-logo: url('+logo+')'+
       '}'

      res.send(response)
  
          
       }else{
          res.send({
             'error': 'Invalid Authentication'
          })
       }
 
    })
    
}


function getDomainName(hostName) {
    let formatedHost = "";
    let splithostName = hostName.split('.');
    if (splithostName.length > 2) {
      formatedHost = hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
    } else {
      formatedHost = hostName.split('//')[1]
    }
    return formatedHost.slice(0, -1)
}


module.exports = {
   getTheme, getApp
}