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
const list_1_8 = document.querySelector(".list_1_8");
const list_1_8rev = document.querySelector(".list_1_8rev");

const DATA = load("data");
const stats = load("stats");

const teams = getTeams();
const mixedTeams = randomizeArr(teams);
const drawingTeams = draw(mixedTeams);

const teamsDistributedInPairs = [];

for (let i = 0; i < drawingTeams.length; i += 2) {
  teamsDistributedInPairs.push([drawingTeams[i], drawingTeams[i + 1]]);
}
const teams_1_8 = teamsDistributedInPairs.slice(0, 4);
const teams_1_8rev = teamsDistributedInPairs.slice(
  4,
  teamsDistributedInPairs.length
);

render_1_8();
render_1_8rev();

function render_1_8() {
  const markup = teams_1_8.map((t) => {
    return `<li class="item_1_8">
            <div class="teams">
              <p>${t[0].club}</p>
              <p>${t[1].club}</p>
            </div>
            <div class="line">
              <div class="hor bottom"></div>
              <div class="ver"></div>
              <div class="hor top"></div>
            </div>
          </li>
`;
  });
  list_1_8.insertAdjacentHTML("beforeend", markup.join(""));
}
function render_1_8rev() {
  const markup = teams_1_8rev.map((t) => {
    return `<li class="item_1_8rev">
            <div class="line">
              <div class="hor bottom"></div>
              <div class="ver"></div>
              <div class="hor top"></div>
            </div>
            <div class="teams">
              <p>${t[0].club}</p>
              <p>${t[1].club}</p>
            </div>
          </li>
`;
  });
  list_1_8rev.insertAdjacentHTML("beforeend", markup.join(""));
}
function draw(data) {
  const drawingResult = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      const cIndex = data[i];
      const againstIndex = data[j];
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
  return drawingResult;
}
function getTeams() {
  const winners = [];
  const runnersUp = [];
  const getCountryByClub = (club) => {
    return DATA.teams.find((t) => t.name === club)?.country;
  };

  DATA.groups.forEach((gr) => {
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

    const w = {
      country: getCountryByClub(q[0]?.team) || "",
      club: q[0]?.team || "",
      group: q[0]?.group || "",
      last_positions: 1,
    };
    const r = {
      country: getCountryByClub(q[1]?.team) || "",
      club: q[1]?.team || "",
      group: q[1]?.group || "",
      last_positions: 2,
    };

    w.club && winners.push(w);
    r.club && runnersUp.push(r);
  });
  return [...winners, ...runnersUp];
}
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

// render(teams_1_8rev, list_1_8rev);

// function render(round, domEl) {
//   const markup = round.map((t) => {
//     return `<li class="item_1_8rev">
//             <div class="line">
//               <div class="hor bottom"></div>
//               <div class="ver"></div>
//               <div class="hor top"></div>
//             </div>
//             <div class="teams">
//               <p>${t[0].club}</p>
//               <p>${t[1].club}</p>
//             </div>
//           </li>
// `;
//   });
//   domEl.insertAdjacentHTML("beforeend", markup.join(""));
// }
