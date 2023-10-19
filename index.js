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
        owner: "Sasha",
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
        owner: "Pasha",
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
        owner: "Sasha",
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
        owner: "Pasha",
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
const matches = [];
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

renderTable();
renderGroup();

const a = roundRobin(takeTeamName()[0], "A");
console.log(a);
const b = roundRobin(takeTeamName()[1]);
const c = roundRobin(takeTeamName()[2]);
const d = roundRobin(takeTeamName()[3]);
for (let i = 0; i < a.length; i++) {
  renderMatches(a[i], "A");
  //   renderMatches(b[i], "B");
  //   renderMatches(c[i], "C");
  //   renderMatches(d[i], "D");
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
      .querySelector(`table[data-group="${gr.title}"]`)
      .insertAdjacentHTML("beforeend", markup.join(""));
  });
}
function renderMatches(teams, letter) {
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
  //   return {
  //     id: "id" + Math.random().toString(16).slice(2),
  //     group: group,
  //     teams: schedule,
  //     goals: [],
  //   };
  return schedule;
}
function takeTeamName() {
  return groups.map((gr) => gr.teams.map((t) => t.name));
}

//!=========== Список матчей с модалкой =================

const list = document.querySelectorAll("li");
list.forEach((el) => {
  el.addEventListener("click", modalOpen);
});

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
  const scoreHome = form.closest("li").querySelector(".home");
  const scoreAway = form.closest("li").querySelector(".away");
  const teamHome = form.closest("li").querySelector("span[data-team='home']");
  const teamAway = form.closest("li").querySelector("span[data-team='away']");

  const home = form.elements.home.value;
  const away = form.elements.away.value;

  scoreHome.textContent = home;
  scoreAway.textContent = away;

  console.log(teamAway.textContent);

  if (home === "" || away === "") {
    return prompt("Какой счет, мать вашу???");
  }

  if (home > away) {
    console.log(`Победа хозяев: ${home} - ${away}`);
  } else if (home < away) {
    console.log("Победа гостей");
  } else {
    console.log("Победителя не выявлено");
  }
  const match = {
    group: "A",
    [teamHome.textContent]: home,
    [teamAway.textContent]: away,
  };
  matches.push(match);
  save("matches", matches);
}

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
