var yama = []
var colors = ["B", "R", "G", "Y"]
var wild = [
  "W", "W", "W" , "W",
  "WD4", "WD4", "WD4" , "WD4"
]

function getColoredCard(color){
  var numbers = [
    "0", //0は一枚だけ
    "1","1",
    "2","2",
    "3","3",
    "4","4",
    "5","5",
    "6","6",
    "7","7",
    "8","8",
    "9","9",
  ]
  var special = [
    "D2", "D2", 
    "R", "R",
    "S", "S"
  ]
  var coloredNumbers = numbers.map((card)=>{
    return color + card
  })
  var coloredSpecial = special.map((card)=>{
    return color + card
  })

  var allCards = []
  allCards = allCards.concat(coloredNumbers)
  allCards = allCards.concat(coloredSpecial)
  return allCards
}

function getAllCards(){
  var yama = []
  yama = yama.concat(getColoredCard("B"))
  yama = yama.concat(getColoredCard("R"))
  yama = yama.concat(getColoredCard("G"))
  yama = yama.concat(getColoredCard("Y"))
  yama = yama.concat(wild)
  return yama
}

function getCardRandom(yama){
  var index = Math.floor(Math.random() * yama.length)
  return yama.splice(index, 1)[0]
}

module.exports = {
  getAllCards : getAllCards,
  getCardRandom : getCardRandom
}
