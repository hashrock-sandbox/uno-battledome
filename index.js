//ウノの最適戦略をバトルしよう！
var utils = require("./utils")

var yama = utils.getAllCards()

/**
 * ルール上出せる札をリストアップ
 */
function getAvailableCards(nowCard, cards){
  //WILD, WILD4はいつでも出せる
  //WILD, 数字カードの後には色が同じならなんでも出せる
  //特殊カードの後には同種の特殊カードなら出せる
  //特殊カードの後には同色の特殊カードなら出せる
  //WILD4の後には同色の特殊カードなら出せる
  return []
}

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

  //ペナルティがあれば適用してターンを飛ばす

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
