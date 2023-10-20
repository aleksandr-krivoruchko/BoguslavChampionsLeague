const source = {
  groups: ["a", "b"],
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
    {
      id: 6,
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
    {
      id: 7,
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
    {
      id: 8,
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
    const matches = load(`matches-${gr}`);
    !matches && save(`matches-${gr}`, rounds);
    renderMatches(gr);
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
function renderMatches(group) {
  const matches = load(`matches-${group}`);

  const markup = matches.map((t) => {
    return `<li class="match" data-group=${group}><p><span data-team="home">${t.match[0]}</span>  <span class="home">${t.score[0]}</span> - <span class="away">${t.score[1]}</span>  <span data-team="away">${t.match[1]}</span></p><div class="modal">
    <div class="modal-content">
         <form>
        <input type="number" name="home" placeholder="${t.match[0]}">
        <span> - </span>
        <input type="number" name="away" placeholder="${t.match[1]}"/>
        <button type="submit">OK</button>
  		</form>
    </div>
  </div>
  </li>`;
  });
  document.querySelector(`ul[data-list='${group}']`).innerHTML =
    markup.join("");
  const list = document.querySelectorAll("li");
  list.forEach((el) => {
    el.addEventListener("click", modalOpen);
  });
}
function getID() {
  return "id" + Math.random().toString(16).slice(2);
}
//!=========== Список матчей с модалкой =================

function modalOpen(e) {
  const modal = e.target.closest("li").querySelector(".modal");
  const form = e.target.closest("li").querySelector("form");
  const closeBtn = form.querySelector("button");

  modal.classList.add("open");

  form.addEventListener("submit", handleSubmit);
  closeBtn.addEventListener("click", closeModal);
}

function closeModal() {
  const modal = document.querySelector(".open");
  modal.classList.replace("open", "close");
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const teamHome = form.closest("li").querySelector("span[data-team='home']");
  const teamAway = form.closest("li").querySelector("span[data-team='away']");
  const group = form.closest("li").dataset.group;
  const matches = load(`matches-${group}`);
  const home = form.elements.home.value;
  const away = form.elements.away.value;

  const match = {
    match: [teamHome.textContent, teamAway.textContent],
    score: [Number(home) || 0, Number(away) || 0],
  };
  const index = matches.findIndex(
    (m) =>
      m.match[0] + m.match[1] === teamHome.textContent + teamAway.textContent
  );
  matches.splice(index, 1, match);
  save(`matches-${group}`, matches);
  renderMatches(group);
}
