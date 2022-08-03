// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import setCanvasScaleMode from './Utils/UiUtils';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property({ type: cc.Prefab })
  FruitItem: cc.Prefab;
  // LIFE-CYCLE CALLBACKS:
  fruitList = [];
  onLoad() {
    setCanvasScaleMode(this.node.getComponent(cc.Canvas));
    cc.resources.loadDir(
      'fruit',
      cc.SpriteFrame,
      (err, sFs: cc.SpriteFrame[]) => {
        this.fruitList = sFs.sort((a, b) => {
          return Number(a.name) - Number(b.name);
        });
        // cc.log(this.fruitList);
      }
    );
  }
  start() {}

  update(dt) {}
}
