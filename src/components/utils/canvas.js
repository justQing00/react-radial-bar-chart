export const getEventPosition = (event) => {
  let x = null;
  let y = null;
  if (event.layerX || event.layerX === 0) {
    x = event.layerX;
    y = event.layerY;
  } else if (event.offsetX || event.offsetX === 0) {
    x = event.offsetX;
    y = event.offsetY;
  }
  return { x, y };
};

export const getPixelRatio = (context) => {
  const backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / backingStore;
};
