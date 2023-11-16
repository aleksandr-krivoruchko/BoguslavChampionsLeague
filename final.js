// const canv = document.getElementById("canvas");
// const ctx = canv.getContext("2d");
// dpi = window.devicePixelRatio;

// function fix_dpi() {
//   let style = {
//     height() {
//       return +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
//     },
//     width() {
//       return +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
//     },
//   };
//   canvas.setAttribute("width", style.width() * dpi);
//   canvas.setAttribute("height", style.height() * dpi);
// }
// fix_dpi();

// ctx.beginPath();
// ctx.fillStyle = "rgba(164, 61, 233, 0.7)";
// ctx.strokeStyle = "#fff";
// ctx.fillRect(30, 70, 200, 50);
// ctx.fillRect(30, 190, 200, 50);
// ctx.moveTo(230, 95);
// ctx.lineTo(270, 95);
// ctx.lineTo(270, 215);
// ctx.lineTo(230, 215);
// ctx.lineWidth = "5";
// ctx.stroke();
// ctx.closePath();

// ctx.beginPath();
// ctx.fillStyle = "#fff";
// ctx.font = "35px Roboto";
// ctx.fillText(`${team}`, 70, 105);
// ctx.fillText(`${team}`, 70, 225);
// ctx.closePath();

// ctx.beginPath();
// ctx.fillStyle = "rgba(164, 61, 233, 0.7)";
// ctx.strokeStyle = "#fff";
// ctx.fillRect(260, 130, 200, 50);
// ctx.fillRect(260, 350, 200, 50);
// ctx.moveTo(460, 155);
// ctx.lineTo(500, 155);
// ctx.lineTo(500, 375);
// ctx.lineTo(460, 375);
// ctx.lineWidth = "5";
// ctx.stroke();
// ctx.closePath();

// ctx.beginPath();
// ctx.strokeStyle = "#fff";
// ctx.moveTo(0, 30);
// ctx.lineTo(30, 30);
// ctx.lineTo(30, 155);
// ctx.lineTo(0, 155);
// ctx.lineWidth = "5";
// ctx.stroke();
// ctx.closePath();

const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};
const groups = load("data").groups;
const stats = load("stats");

stats
  .filter((t) => t.group === "a")
  .sort((t1, t2) => {
    if (t2.points === t1.points) {
      return (
        t2.goals.for - t2.goals.against - (t1.goals.for - t1.goals.against)
      );
    }
    return t2.points - t1.points;
  });

const winners = [];
const runnersUp = [];

groups.forEach((gr) => {
  const q = stats
    .filter((t) => t.group === gr)
    .sort((t1, t2) => {
      if (t2.points === t1.points) {
        return (
          t2.goals.for - t2.goals.against - (t1.goals.for - t1.goals.against)
        );
      }
      return t2.points - t1.points;
    });
  winners.push(q[0]);
  runnersUp.push(q[1]);
});

function randomizeArr(arr) {
  let cIndex = arr.length,
    tempValue,
    randomIndex;
  while (cIndex != 0) {
    randomIndex = Math.floor(Math.random() * cIndex);
    cIndex -= 1;

    tempValue = arr[cIndex];
    arr[cIndex] = arr[randomIndex];
    arr[randomIndex] = tempValue;
  }
  return arr;
}

let drawingResult = [];

// Loop over the data, I know it O(n^2) and you should avoid that
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data.length; j++) {
    const cIndex = data[i];
    const againstIndex = data[j];
    // This is the match up logic, to follow the procedure (see README)
    if (
      againstIndex.club !== cIndex.club &&
      againstIndex.country !== cIndex.country &&
      againstIndex.group !== cIndex.group &&
      againstIndex.last_positions !== cIndex.last_positions
    ) {
      const drawOne = drawingResult
        .map((c) => c.club)
        .indexOf(againstIndex.club);
      const drawTwo = drawingResult.map((c) => c.club).indexOf(cIndex.club);
      if (drawOne === -1 && drawTwo === -1) {
        cIndex.last_positions > againstIndex.last_positions
          ? drawingResult.push(cIndex, againstIndex)
          : drawingResult.push(againstIndex, cIndex);
      }
    }
  }
}
