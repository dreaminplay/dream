
const fs = require ('fs')
const axios = require('axios')


const listGame = async (req, res) => {


   fs.readFile('./app/data/listgame.json', 'utf8', (err, data) => {

      wlDatas = JSON.parse(data)
      res.send(wlDatas)

   })

}

const matchOdds = async (req, res) => {


    fs.readFile('./app/data/marketdata.json', 'utf8', (err, data) => {
 
       wlDatas = JSON.parse(data)
       res.send(wlDatas)
 
    })
 
 }
 



const fetchGame = async (req, res) => {

   await axios.get('https://dreambetapi.com/pad=82/listGames').then((response) => {


    var json = JSON.stringify(response.data);
      fs.writeFile('./app/data/listgame.json', json, 'utf-8',  function(err) {
         if (err) throw err;
         console.log('Updated Gamelist')
    });
      
   })
}



const fetchMarket = async (req, res) => {

    
    await axios.get('https://dreambetapi.com/pad=82/listGames').then(async (response) => {



            gameData = response.data.result
            let marketList = []
            for(var game of gameData) {
                if(game.markets.length > 0){
                    marketList.push(game.markets[0].marketId)
                }
            }
        
            url = 'https://betfair.dreaminplay.com/matchOdds/4/?ids='+marketList.toString();
            
            await axios.get(url).then((response) => {

                var json = JSON.stringify(response.data);
                      fs.writeFile('./app/data/marketdata.json', json, 'utf-8',  function(err) {
                         if (err) throw err;
                         console.log('Updated Market')
                    });

            })
   })



    


}



const mainFrame = async (req, res) => {
    res.send('Market Ok')
}


module.exports = {
    listGame, fetchGame, fetchMarket, matchOdds, mainFrame
}