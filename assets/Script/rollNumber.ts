// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class RollNumber extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // cc.log(this.node.y);
    // this.node.y = 600;
  }

  start() {}

  update(dt) {
    if (this.node.y >= 600) {
      this.node.y = 0;
    } else {
      this.node.y += dt * 30;
    }
    // cc.log(this.node.y);
  }
}
