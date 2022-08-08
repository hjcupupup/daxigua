// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Fruit from './Fruit';
import UiUtils from './Utils/UiUtils';
import setCanvasScaleMode from './Utils/UiUtils';
// import { Game, Canvas, getSetOfTouchesEndOrCancel, resources, loader, Node, randomRangeInt, handleTouchesBegin } from '../../creator';
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  @property({ type: cc.Prefab })
  FruitItem: cc.Prefab = null;
  // LIFE-CYCLE CALLBACKS:
  @property({ type: cc.Label })
  score: cc.Label = null;
  @property({ type: cc.Node })
  topNode: cc.Node = null;

  fruitList = [];
  method: UiUtils = null;
  fruitNum: number = 0; //记录目前下面有几个水果，也即是能够生成的最大的水果lev
  onLoad() {
    this.method = new UiUtils();
    this.method.setCanvasScaleMode(this.node.getComponent(cc.Canvas));
    // 绑定点击生成水果的事件
    this.node.on(cc.Node.EventType.TOUCH_START, this.creatFruit, this);
    // for (let i = 0; i < 100; i++) {
    //   cc.log(this.randFruitLev(10));
    // }
  }

  start() {
    // 微任务，必须宏任务执行完后才会执行.then中的回调函数。
    /* 
    ! 由于load资源是微任务，所以增加fruit节点的操作需要在.then中执行
     */
  }
  randFruitLev(max: number): number {
    return this.method.randInt(max);
  }
  creatFruit = function (
    num: number = this.FruitNum,
    pos: cc.Vec2 = new cc.Vec2(0, 500)
  ) {
    cc.log(this.fruitNum);
    this.method
      .loadImg('fruit/' + this.randFruitLev(this.fruitNum), cc.SpriteFrame)
      .then(res => {
        // cc.log(res);
        let fruitPre = cc.instantiate(this.FruitItem);
        fruitPre.getComponent(cc.Sprite).spriteFrame = <cc.SpriteFrame>res;
        fruitPre.parent = this.node;
        fruitPre.setPosition(pos);
        this.handleFruitLev();
      });
  };
  handleFruitLev() {
    this.fruitNum < 10 ? (this.fruitNum += 1) : (this.fruitNum = 10);
  }

  update(dt) {}
}
