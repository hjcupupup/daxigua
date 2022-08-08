export default class UiUtils {
  constructor() {}
  setCanvasScaleMode(canvas: cc.Canvas) {
    const standarRadio = 16 / 9; // 标准宽高比 横屏
    const screenSize = cc.view.getFrameSize();
    const currentRadio = screenSize.width / screenSize.height;
    canvas.fitHeight = currentRadio < standarRadio;
    canvas.fitWidth = currentRadio >= standarRadio;
  }
  loadImgDir = function (path: string, type?) {
    return new Promise((resolve, reject) => {
      if (type) {
        cc.resources.loadDir(path, type, (err, resources) => {
          if (err) {
            cc.log(err);
            reject(err);
          } else {
            resolve(resources);
          }
        });
      } else {
        cc.resources.loadDir(path, (err, resources) => {
          if (err) {
            cc.log(err);
            reject(err);
          } else {
            resolve(resources);
          }
        });
      }
    });
  };
  loadImg = function (path: string, type?) {
    return new Promise((resolve, reject) => {
      if (type) {
        cc.resources.load(path, type, (err, res) => {
          if (err) {
            cc.log(err);
            reject(err);
          } else {
            resolve(res);
          }
        });
      } else {
        cc.resources.load(path, (err, res) => {
          if (err) {
            cc.log(err);
            reject(err);
          } else {
            resolve(res);
          }
        });
      }
    });
  };
  randInt(max) {
    // 获得0-max之间的随机整数
    return Math.floor(max * Math.random());
  }
}
