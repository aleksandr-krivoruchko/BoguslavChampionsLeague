const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");

dpi = window.devicePixelRatio;

function fix_dpi() {
  let style = {
    height() {
      return +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    },
    width() {
      return +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    },
  };
  canvas.setAttribute("width", style.width() * dpi);
  canvas.setAttribute("height", style.height() * dpi);
}
fix_dpi();

const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};
const stats = load("stats");
const { team } = stats.sort((t1, t2) => t2.points - t1.points)[0];

ctx.beginPath();
ctx.fillStyle = "rgba(164, 61, 233, 0.7)";
ctx.strokeStyle = "#fff";
ctx.fillRect(30, 70, 200, 50);
ctx.fillRect(30, 190, 200, 50);
ctx.moveTo(230, 95);
ctx.lineTo(270, 95);
ctx.lineTo(270, 215);
ctx.lineTo(230, 215);
ctx.lineWidth = "5";
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#fff";
ctx.font = "35px Roboto";
ctx.fillText(`${team}`, 70, 105);
ctx.fillText(`${team}`, 70, 225);
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "rgba(164, 61, 233, 0.7)";
ctx.strokeStyle = "#fff";
ctx.fillRect(260, 130, 200, 50);
ctx.fillRect(260, 350, 200, 50);
ctx.moveTo(460, 155);
ctx.lineTo(500, 155);
ctx.lineTo(500, 375);
ctx.lineTo(460, 375);
ctx.lineWidth = "5";
ctx.stroke();
ctx.closePath();
