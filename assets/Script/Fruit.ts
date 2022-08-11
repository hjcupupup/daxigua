import GameManager from './GameManager';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Fruit extends cc.Component {
  public init(num: number, sF: cc.SpriteFrame, name: string) {
    this.node.getComponent(cc.Sprite).spriteFrame = sF;
    this.name = name;
  }
  fruitNum: number = 0;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {}
  onBeginContact(
    contact: cc.PhysicsContact,
    self: cc.PhysicsCollider,
    other: cc.PhysicsCollider
  ) {
    let _t = this;
    let fruitNode = GameManager.Instance.fruitNode;

    //是否碰撞到底部边界
    if (other.node.group == 'downwall') {
      // 碰撞后将其加入到fruitNode节点下
      self.node.parent = fruitNode;
      cc.log(self.node.y);
    }

    // 是否碰撞到其他水果

    if (other.node.group == 'fruit') {
      // 下面的水果碰到上面的水果忽略
      if (
        self.node.y < other.node.y ||
        self.node.y == 500 ||
        other.node.y == 500
      ) {
        return;
      }

      // 两个水果name相同的情况
      if (self.name == other.name && self.name.substring(0, 2) !== '10') {
        // 在被撞的水果处生成新的
        this.creatLevelupFruit(cc.v2(other.node.position), +other.name[0]);
        // 去掉边界避免再次碰撞

        other.node.getComponent(cc.PhysicsCircleCollider).radius = 0;
        other.node.getComponent(cc.PhysicsCircleCollider).apply();
        self.node.getComponent(cc.PhysicsCircleCollider).radius = 0;
        self.node.getComponent(cc.PhysicsCircleCollider).apply();
        // 销毁原来的两个
        self.node.active = false;
        other.node.active = false;
        self.node.destroy();
        other.node.destroy();
      }
    }
  }
  creatLevelupFruit(pos: cc.Vec2, lev) {
    GameManager.Instance.creatFruit.call(
      GameManager.Instance,
      lev + 1,
      pos,
      true
    );
  }

  start() {}

  // update (dt) {}
}
