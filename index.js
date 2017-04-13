//ウノの最適戦略をバトルしよう！
var utils = require("./utils")

var yama = utils.getAllCards()

/**
 * プレイヤー定義
 */
class Player{
  constructor(){
    this.fuda = []
    this.name = "RandomPlayer"
  }
  add(card){
    this.fuda.push(card)
  }
  doTurn(nowCard){
    //必ず１枚めを出す戦略
    return this.fuda.splice(0, 1)
  }
  sayUno(){
    if(this.fuda.length === 1){
      console.log("UNO!!")
    }
  }
  isClear(){
    return this.fuda.length === 0
  }
}

var player = new Player()

//ランダムに７枚ずつ山から取る
for(var i = 0; i < 7; i++){
  player.add(utils.getCardRandom(yama))
}

console.log(player.name, "さんの札 : " ,player.fuda)

//一枚取る
var nowCard = utils.getCardRandom(yama)

/**
 * プレイヤーのターン
 * @param yama 山
 * @param player プレイヤー定義 
 */
function turn(yama, player){
  //プレイヤー順に出せるか問い合わせ（複数枚可）
  var card = player.doTurn(nowCard)
  //出せなければ、一枚引く
  //出せるか問い合わせ
  //出せなければパス
  if(card.length > 0){
    console.log(card)
    nowCard = card[0]
  }

  //残りが１枚になれば、ウノという
  player.sayUno()
  //残りが０枚になれば、上がり
  if(player.isClear()){
    return true
  }
  return false
}

/**
 * メインループ
 */
var agari = false
while(!agari){
  agari = turn(yama, player)

  if(agari){
    console.log(player.name + "さんの勝ち")
  }
}
