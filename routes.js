let express = require('express')
let router = express.Router()
let fs = require('fs')
let tournament = require('./tournament-logic')
//let fighters = require('./data.json')

//home page
router.get('/', (req, res) => {
  let playerArr = {}
  playerArr.players = tournament.getCompetitors();
  res.render('home', playerArr)
})

//fight page
router.get('/fight', (req, res) => {
  let currentPlayers = {}
  currentPlayers.players = tournament.getNextCompetitors();
  res.render('fight', currentPlayers)
  // console.log(currentPlayers)
})

//sending winner information for refresh
router.post('/fight', (req, res) => {
  //winner info
  writeBackTOJson()
  res.redirect('/') //back to fight
})

//final fight view
router.get('/finalFight', (req, res) => {
  res.render('/finalFight')
})

//display final winner
router.get('/winner', (req, res) => {
  res.render('winner')
})

//after finished, writing new information set back to data file
function writeBackTOJson (array){
fs.writeFile('data.json', JSON.stringify(array, null, 2), 'utf8', (err) => {
    if (err) {
      console.log(err)
    } console.log("done")
 })
}

module.exports = router
