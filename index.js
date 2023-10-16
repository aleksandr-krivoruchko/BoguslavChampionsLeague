const groups = [
  {
    title: "A",
    teams: [
      {
        id: 1,
        country: "Spain",
        name: "Real Madrid",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 22, against: 5 },
      },
      {
        id: 2,
        country: "Belgium",
        name: "Antverpen",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 14, against: 7 },
      },
      {
        id: 3,
        country: "Germany",
        name: "Bayern Munich",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 12, against: 9 },
      },
      {
        id: 4,
        country: "Ukraine",
        name: "Shakhtar Donetsk",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 11, against: 12 },
      },
    ],
  },
  {
    title: "B",
    teams: [
      {
        id: 1,
        country: "Spain",
        name: "Barcelona",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 22, against: 5 },
      },
      {
        id: 2,
        country: "Italy",
        name: "Napoli",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 14, against: 7 },
      },
      {
        id: 3,
        country: "Germany",
        name: "Borussia D",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 12, against: 9 },
      },
      {
        id: 4,
        country: "Ukraine",
        name: "Dynamo Kyiv",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 11, against: 12 },
      },
    ],
  },
  {
    title: "C",
    teams: [
      {
        id: 1,
        country: "Spain",
        name: "Sevilla",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 22, against: 5 },
      },
      {
        id: 2,
        country: "France",
        name: "PSG",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 14, against: 7 },
      },
      {
        id: 3,
        country: "Germany",
        name: "Bayern",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 12, against: 9 },
      },
      {
        id: 4,
        country: "Ukraine",
        name: "Dnipro",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 11, against: 12 },
      },
    ],
  },
  {
    title: "D",
    teams: [
      {
        id: 1,
        country: "Spain",
        name: "Sevilla",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 22, against: 5 },
      },
      {
        id: 2,
        country: "France",
        name: "PSG",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 14, against: 7 },
      },
      {
        id: 3,
        country: "Germany",
        name: "Bayern",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 12, against: 9 },
      },
      {
        id: 4,
        country: "Ukraine",
        name: "Dnipro",
        played: 6,
        win: 3,
        draw: 2,
        lose: 1,
        goals: { for: 11, against: 12 },
      },
    ],
  },
];

const root = document.querySelector(".root");

renderTable();
renderGroup();

const a = roundRobin(takeTeamName()[0]);
const b = roundRobin(takeTeamName()[1]);
const c = roundRobin(takeTeamName()[2]);
const d = roundRobin(takeTeamName()[3]);

for (let i = 0; i < a.length; i++) {
  renderMatches(a[i], "A");
  renderMatches(b[i], "B");
  renderMatches(c[i], "C");
  renderMatches(d[i], "D");
}

function renderTable() {
  const markup = groups
    .map((gr) => {
      return `<div class="group" >
      <div >
		<h3 class="heading">Group ${gr.title}</h3>
      <table data-group="${gr.title}">
		<tr class="col">
		<th>Team</th>
		<th>P</th>
		<th>W</th>
		<th>D</th>
		<th>L</th>
		<th>F</th>
		<th>A</th>
		<th>PTS</th>
		</tr>
      </table>
		</div>
		<ul data-list="${gr.title}">
		</ul>
		</div>
		`;
    })
    .join("");
  root.insertAdjacentHTML("beforeend", markup);
}
function renderGroup() {
  groups.map((gr) => {
    const markup = gr.teams.map((t) => {
      return `<tr class="wpos">
		<td>${t.name}</td>
		<td>${t.played}</td>
		<td>${t.win}</td>
		<td>${t.draw}</td>
          <td>${t.lose}</td>
			 <td>${t.goals.for}</td>
			 <td>${t.goals.against}</td>
			 <td>${t.win * 3 + t.draw * 1}</td>
        </tr>`;
    });
    document
      .querySelector(`table[data-group="${gr.title}"]`)
      .insertAdjacentHTML("beforeend", markup.join(""));
  });
}
function renderMatches(teams, letter) {
  const markup = teams.map((t) => {
    return `<li class="match"><p>${t[0]}  <span class="home">0</span> - <span class="away">2</span>  ${t[1]}</p><div class="modal">
  <div class="modal-content">
       <form>
      <input type="text" name="home" placeholder="${t[0]}">
      <span> - </span>
      <input type="text" name="away" placeholder="${t[1]}" />
      <button type="submit">OK</button>
		</form>
  </div>
</div>
</li>`;
  });
  document
    .querySelector(`ul[data-list='${letter}']`)
    .insertAdjacentHTML("beforeend", markup.join(""));
}
function roundRobin(teams) {
  let schedule = [];
  let league = teams.slice();

  if (league.length % 2) {
    league.push("None");
  }

  let rounds = league.length;

  for (let j = 0; j < (rounds - 1) * 2; j++) {
    schedule[j] = [];
    for (let i = 0; i < rounds / 2; i++) {
      if (league[i] !== "None" && league[rounds - 1 - i] !== "None") {
        if (j % 2 == 1) {
          schedule[j].push([league[i], league[rounds - 1 - i]]);
        } else {
          schedule[j].push([league[rounds - 1 - i], league[i]]);
        }
      }
    }
    league.splice(1, 0, league.pop());
  }
  return schedule;
}
function takeTeamName() {
  return groups.map((gr) => gr.teams.map((t) => t.name));
}

let score = 0;

// function onMatchClick(e) {
//   let home = e.target.closest("li").querySelector(".home");
//   let away = e.target.closest("li").querySelector(".away");
//   score = prompt();
//   home.textContent = score.split("-")[0];
//   away.textContent = score.split("-")[1];
// }

function onMatchClick(e) {
  const btn = e.target.closest("li");
  const modal = btn.querySelector(".modal");

  modal.style.display = "block";
}

const list = document.querySelectorAll("ul");
list.forEach((el) => {
  el.addEventListener("click", onMatchClick);
  el.querySelector("form").addEventListener("submit", handleSubmit);
});

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const home = form.elements.home.value;
  const away = form.elements.away.value;

  if (home === "" || away === "") {
    return prompt("Please fill in all the fields!");
  }

  if (home > away) {
    console.log("Победа хозяев");
  } else if (home < away) {
    console.log("Победа гостей");
  } else {
    console.log("Победителя не выявлено");
  }

  const modal = document.querySelector(".modal");
  modal.style.display = "none";
}
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

// function checkWinner() {
//   const home = document.querySelectorAll(".home");
//   const away = document.querySelectorAll(".away");

//   for (let i = 0; i < home.length; i++) {
//     if (home[i].textContent > away[i].textContent) {
//       home[i].classList.add("winner");
//       away[i].classList.add("loser");
//     } else if (home[i].textContent < away[i].textContent) {
//       away[i].classList.add("winner");
//       home[i].classList.add("loser");
//     }
//   }
// }
// checkWinner();
