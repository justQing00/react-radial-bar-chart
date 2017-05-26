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
