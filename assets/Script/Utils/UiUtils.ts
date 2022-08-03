export default function setCanvasScaleMode(canvas: cc.Canvas) {
  const standarRadio = 16 / 9; // 标准宽高比 横屏
  const screenSize = cc.view.getFrameSize();
  const currentRadio = screenSize.width / screenSize.height;
  canvas.fitHeight = currentRadio < standarRadio;
  canvas.fitWidth = currentRadio >= standarRadio;
}
