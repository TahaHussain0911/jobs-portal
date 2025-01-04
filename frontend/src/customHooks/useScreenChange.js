export default function isScreenResizeHook(setIsResize, width = 992) {
  window.addEventListener("load", () => {
    getWidthAndDecideScreen(setIsResize, width);
  });
  window.addEventListener("resize", () => {
    getWidthAndDecideScreen(setIsResize, width);
  });
  getWidthAndDecideScreen(setIsResize, width);
}
const getWidthAndDecideScreen = (setIsResize, width) => {
  if (window.screen.width < width || window.innerWidth > width) {
    setIsResize(true);
  } else {
    setIsResize(false);
  }
};
