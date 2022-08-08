// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Fruit extends cc.Component {
  public init(num: number, sF: cc.SpriteFrame) {
    this.node.getComponent(cc.Sprite).spriteFrame = sF;
  }
  fruitNum: number = 0;
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  // update (dt) {}
}
