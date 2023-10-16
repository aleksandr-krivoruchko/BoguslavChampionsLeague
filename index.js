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

const lc = {
  group: "A",
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
  group: "B",
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
  group: "C",
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
};

const root = document.querySelector(".root");

renderTable();
renderGroup();

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
		<ol data-list="${gr.title}">
		</ol>
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
    //  document
    //    .querySelector(`ol[data-list='${gr.title}']`)
    //    .insertAdjacentHTML("beforeend", markup.join(""));
  });
}

function renderMatches(teams) {
  const markup = teams.map((t) => {
    return `<li><span>${t[0]}  <span class="score">0</span></span> - <span ><span class="score">0</span>  ${t[1]}</span></li>`;
  });
  document
    .querySelector("ol[data-list='A']")
    .insertAdjacentHTML("beforeend", markup.join(""));
}

let teams = ["Tigers", "Foofels", "Drampamdom", "Lakebaka"];

const roundRobin = (teams) => {
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
};

let leagueSchedule = roundRobin(takeTeamName()[0]);

for (let i = 0; i < leagueSchedule.length; i++) {
  renderMatches(leagueSchedule[i]);
}

function takeTeamName() {
  return groups.map((gr) => gr.teams.map((t) => t.name));
}
