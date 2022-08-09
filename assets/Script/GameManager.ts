// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Fruit from './Fruit';
import UiUtils from './Utils/UiUtils';
import setCanvasScaleMode from './Utils/UiUtils';
// import { Game, Canvas, getSetOfTouchesEndOrCancel, resources, loader, Node, randomRangeInt, handleTouchesBegin, targetedAction } from '../../creator';
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
  targetFruit = null;
  method: UiUtils = null;
  fruitNum: number = 0; //记录目前下面有几个水果，也即是能够生成的最大的水果lev
  onLoad() {
    this.method = new UiUtils();
    this.method.setCanvasScaleMode(this.node.getComponent(cc.Canvas));
    // 绑定点击生成水果的事件
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    this.physicsSystemCtrl(true, false);
    this.creatFruit(0, cc.v2(0, 500));
  }
  // 物理引擎控制
  physicsSystemCtrl(enablePhysics: boolean, enableDebug: boolean) {
    cc.director.getPhysicsManager().enabled = enablePhysics;
    cc.director.getPhysicsManager().gravity = cc.v2(0, -300);
    if (enableDebug) {
      cc.director.getPhysicsManager().debugDrawFlags =
        cc.PhysicsManager.DrawBits.e_shapeBit;
    }
    cc.director.getCollisionManager().enabled = enablePhysics;
    cc.director.getCollisionManager().enabledDebugDraw = enableDebug;
  }

  // 触摸开始回调
  onTouchStart(e: cc.Touch) {
    let x = this.node.convertToNodeSpaceAR(e.getLocation()).x;
    if (this.targetFruit) {
      cc.tween(this.targetFruit)
        .to(0.1, { position: cc.v2(x, 500) })
        .call(() => {})
        .start()
        .tag(2);
    } else {
      return;
    }
  }

  // 滑动取消事件
  onTouchCancel(e: cc.Touch) {
    if (!this.targetFruit) {
      return;
    } else {
      // 触摸结束时物理引擎生效
      this.targetFruit.getComponent(cc.RigidBody).type =
        cc.RigidBodyType.Dynamic;
      this.targetFruit.getComponent(cc.PhysicsCircleCollider).radius =
        this.targetFruit.height / 2;
      this.targetFruit.getComponent(cc.PhysicsCircleCollider).apply();
      this.targetFruit = null;
      this.creatFruit(this.fruitNum, cc.v2(0, 500));
    }
  }

  // 触摸滑动事件
  onTouchMove(e: cc.Touch) {
    if (!this.targetFruit) {
      return;
    } else {
      // cc.director.getActionManager().removeActionByTag(1);
      cc.Tween.stopAllByTag(1);
      let x = this.node.convertToNodeSpaceAR(e.getLocation()).x;
      let wid = cc.view.getFrameSize().width;
      if (x > wid) {
        this.targetFruit.x = wid;
      } else if (x < -wid) {
        this.targetFruit.x = -wid;
      } else {
        this.targetFruit.x = x;
      }
    }
  }
  // 触摸事件结束
  onTouchEnd(e: cc.Touch) {
    if (!this.targetFruit) {
      return;
    } else {
      // 触摸结束时物理引擎生效
      this.targetFruit.getComponent(cc.RigidBody).type =
        cc.RigidBodyType.Dynamic;
      this.targetFruit.getComponent(cc.PhysicsCircleCollider).radius =
        this.targetFruit.height / 2;
      this.targetFruit.getComponent(cc.PhysicsCircleCollider).apply();
      this.targetFruit = null;
      this.creatFruit(this.fruitNum, cc.v2(0, 500));
    }
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
  creatFruit = function (num: number, pos: cc.Vec2) {
    //增加一个防抖
    let t = this;
    if (t.targetFruit) {
      return;
    }
    t.method
      .loadImg('fruit/' + t.randFruitLev(num), cc.SpriteFrame)
      .then(res => {
        let fruitPre = cc.instantiate(t.FruitItem);
        fruitPre.getComponent(cc.Sprite).spriteFrame = <cc.SpriteFrame>res;
        // 创建时不受重力影响
        fruitPre.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
        fruitPre.getComponent(cc.PhysicsCircleCollider).radius = 0;
        fruitPre.getComponent(cc.PhysicsCircleCollider).apply();
        fruitPre.parent = t.node;
        fruitPre.position = cc.v2(0, pos.y);
        fruitPre.scale = 0;
        cc.tween(fruitPre)
          .to(0.3, { scale: 1 }, { easing: 'backOut' })
          .call(() => {
            t.targetFruit = fruitPre;
          })
          .start()
          .tag(1);
        t.handleFruitLev();
      });
  };
  handleFruitLev() {
    this.fruitNum < 10 ? (this.fruitNum += 1) : (this.fruitNum = 10);
  }

  update(dt) {}
}
