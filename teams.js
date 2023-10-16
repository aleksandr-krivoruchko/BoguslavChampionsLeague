const teams = [
  {
    id: 1,
    group: "A",
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
    group: "A",
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
    group: "A",
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
    group: "A",
    country: "Ukraine",
    name: "Shakhtar Donetsk",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 11, against: 12 },
  },
  {
    id: 5,
    group: "B",
    country: "Spain",
    name: "Barcelona",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 22, against: 5 },
  },
  {
    id: 6,
    group: "B",
    country: "Italy",
    name: "Napoli",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 14, against: 7 },
  },
  {
    id: 7,
    group: "B",
    country: "Germany",
    name: "Borussia D",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 12, against: 9 },
  },
  {
    id: 8,
    group: "B",
    country: "Ukraine",
    name: "Dynamo Kyiv",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 11, against: 12 },
  },
  {
    id: 9,
    group: "C",
    country: "Spain",
    name: "Sevilla",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 22, against: 5 },
  },
  {
    id: 10,
    group: "C",
    country: "France",
    name: "PSG",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 14, against: 7 },
  },
  {
    id: 11,
    group: "C",
    country: "Germany",
    name: "Bayern",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 12, against: 9 },
  },
  {
    id: 12,
    group: "C",
    country: "Ukraine",
    name: "Dnipro",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 11, against: 12 },
  },
  {
    id: 13,
    group: "D",
    country: "Spain",
    name: "Sevilla",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 22, against: 5 },
  },
  {
    id: 14,
    group: "D",
    country: "France",
    name: "PSG",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 14, against: 7 },
  },
  {
    id: 15,
    group: "D",
    country: "Germany",
    name: "Bayern",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 12, against: 9 },
  },
  {
    id: 16,
    group: "D",
    country: "Ukraine",
    name: "Dnipro",
    played: 6,
    win: 3,
    draw: 2,
    lose: 1,
    goals: { for: 11, against: 12 },
  },
];
const groups = ["A", "B", "C", "D"];

const root = document.querySelector(".root");

renderTable();
renderGroup();

const a = roundRobin(takeTeamName("A"));
const b = roundRobin(takeTeamName("B"));
const c = roundRobin(takeTeamName("C"));
const d = roundRobin(takeTeamName("D"));

for (let i = 0; i < a.length; i++) {
  renderMatches(a[i], "A");
  renderMatches(b[i], "B");
  renderMatches(c[i], "C");
  renderMatches(d[i], "D");
}

function renderTable() {
  const markup = groups.map((g) => {
    return `<div class="group" >
      <div >
		<h3 class="heading">Group ${g}</h3>
      <table data-group="${g}">
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
		<ul data-list="${g}">
		</ul>
		</div>
		`;
  });

  root.insertAdjacentHTML("beforeend", markup.join(""));
}

function renderGroup() {
  groups.map((gr) => {
    const markup = teams.map((t) => {
      if (gr === t.group) {
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
      }
    });
    document
      .querySelector(`table[data-group="${gr}"]`)
      .insertAdjacentHTML("beforeend", markup.join(""));
  });
}

function renderMatches(teams, letter) {
  const markup = teams.map((t) => {
    return `<li>${t[0]}  <span class="home">0</span> - <span class="away">2	</span>  ${t[1]}</li>`;
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
function takeTeamName(l) {
  return teams.map((t) => (t.group === l ? t.name : ""));
}

let score = 0;

function onMatchClick(e) {
  let home = e.target.closest("li").querySelector(".home");
  let away = e.target.closest("li").querySelector(".away");
  score = prompt();
  home.textContent = score.split("-")[0];
  away.textContent = score.split("-")[1];
}
const list = document.querySelectorAll("ul");
list.forEach((el) => {
  el.addEventListener("click", onMatchClick);
});

function checkWinner() {
  const home = document.querySelectorAll(".home");
  const away = document.querySelectorAll(".away");

  for (let i = 0; i < home.length; i++) {
    if (home[i].textContent > away[i].textContent) {
      home[i].classList.add("winner");
      away[i].classList.add("loser");
    } else if (home[i].textContent < away[i].textContent) {
      away[i].classList.add("winner");
      home[i].classList.add("loser");
    }
  }
}
checkWinner();
