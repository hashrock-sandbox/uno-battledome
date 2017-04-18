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

function parseCardStr(card){
  var regexs = [
    {type: "number", regex: /([YRGB])([0-9])/},
    {type: "wild", regex: /(W)(D4|)/},
    {type: "special", regex: /([YRGB])([D2|R|S])/}
  ]
  for(var i = 0; i < regexs.length; i++){
    var obj = card.match(regexs[i].regex)
    if(obj){
      return {
        type: regexs[i].type,
        color: obj[1],
        option: obj[2]
      }
    }
  }
}

function isSameColor(a, b){
  return a.color === b.color
}

function isSameOption(a, b){
  return a.option === b.option
}


function isAvailableCard(nowCardStr, cardStr){
  var nowCard = parseCardStr(nowCardStr)
  var card = parseCardStr(cardStr)

  //WILD, WILD4はいつでも出せる
  if(card.type === "wild"){
    return true
  }

  //WILD, 数字カードの後には色が同じならなんでも出せる
  var isNumberOrWild = 
    nowCard.type === "number" ||
    nowCard.type === "wild" 

  console.log("isNumberOrWild", isNumberOrWild)
  console.log("isSameColor", isSameColor(nowCard, card))

  if(isNumberOrWild && isSameColor(nowCard, card)){
    return true
  }

  //数字カードの後には同じ数字のカードが出せる
  if(
    nowCard.type === "number" && card.type === "number" && 
    isSameOption(nowCard, card)
  ){
    return true
  }

  //特殊カードの後には同種の特殊カードなら出せる
  if(nowCard.type === "special" && isSameOption(nowCard, card)){
    return true
  }

  //特殊カードの後には同色の特殊カードなら出せる
  if(nowCard.type === "special" && isSameColor(nowCard, card)){
    return true
  }

  //WILD4の後には同色の特殊カードなら出せる
  if(nowCard.type === "wild" && nowCard.option === "D4" &&
    card.type === "special" && isSameColor(nowCard, card)
  ){
    return true
  }
  return false
}


/**
 * ルール上出せる札をリストアップ
 */
function getAvailableCards(nowCard, cards){
  return cards.filter((card)=>{
    return isAvailableCard(nowCard, card)
  })
}


module.exports = {
  getAllCards : getAllCards,
  getCardRandom : getCardRandom,
  getAvailableCards: getAvailableCards,
  parseCardStr: parseCardStr
}
