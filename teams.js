const source = {
  groups: ["a", "b", "c"],
  teams: [
    {
      id: 1,
      group: "a",
      country: "Spain",
      name: "Real Madrid",
      played: 6,
      win: 3,
      draw: 2,
      lose: 1,
      goals: { for: 22, against: 5 },
      owner: "Sasha",
    },
    {
      id: 2,
      group: "a",
      country: "Belgium",
      name: "Antverpen",
      played: 6,
      win: 3,
      draw: 2,
      lose: 1,
      goals: { for: 14, against: 7 },
      owner: "Pasha",
    },
    {
      id: 3,
      group: "a",
      country: "Germany",
      name: "Bayern Munich",
      played: 6,
      win: 3,
      draw: 2,
      lose: 1,
      goals: { for: 12, against: 9 },
      owner: "Sasha",
    },
    {
      id: 4,
      group: "a",
      country: "Ukraine",
      name: "Shakhtar Donetsk",
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: { for: 0, against: 0 },
      owner: "Pasha",
    },
    {
      id: 5,
      group: "b",
      country: "Ukraine",
      name: "Shakhtar Donetsk",
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: { for: 0, against: 0 },
      owner: "",
    },
  ],
};

let data = null;
const root = document.querySelector(".root");

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};
const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

if (localStorage.length === 0) {
  save("data", source);
} else {
  data = { ...load("data") };
  renderTable();
  data.groups.forEach((gr) => {
    renderGroup(gr);
    const rounds = roundRobin(filteredTeamsNameByGroup(gr));
    console.log(rounds);
    //  rounds.length === 6 ? save(`matches-${gr}`, rounds) : [];
    renderMatches(rounds, gr);
  });
}

function filteredTeamsNameByGroup(group) {
  return data.teams.filter((t) => t.group === group).map((t) => t.name);
}

function renderTable() {
  const markup = data.groups
    .map((gr) => {
      return `<div class="group" >
      <div >
		<h3 class="heading">Group ${gr}</h3>
      <table data-group="${gr}">
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
		<ul data-list="${gr}">
		</ul>
		</div>
		`;
    })
    .join("");
  root.insertAdjacentHTML("beforeend", markup);
}
function renderGroup(group) {
  const markup = data.teams
    .filter((t) => t.group === group)
    .map((t) => {
      return `<tr class= ${t.owner === "Sasha" ? "sasha" : "pasha"}>
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
    .querySelector(`table[data-group="${group}"]`)
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

  const matches = [];

  schedule.map((m) =>
    m.map((r) => {
      const z = {
        id: getID(),
        match: [r[0], r[1]],
        score: [0, 0],
      };
      matches.push(z);
    })
  );

  return matches;
}
function renderMatches(teams, group) {
  const markup = teams.map((t) => {
    return `<li class="match" id=""><p><span data-team="home">${t[0]}</span>  <span class="home">0</span> - <span class="away">0</span>  <span data-team="away">${t[1]}</span></p><div class="modal">
  <div class="modal-content">
       <form>
      <input type="number" name="home" placeholder="${t[0]}">
      <span> - </span>
      <input type="number" name="away" placeholder="${t[1]}" />
      <button type="submit">OK</button>
		</form>	
  </div>
</div>
</li>`;
  });
  document
    .querySelector(`ul[data-list='${group}']`)
    .insertAdjacentHTML("beforeend", markup.join(""));
}
function getID() {
  return "id" + Math.random().toString(16).slice(2);
}
