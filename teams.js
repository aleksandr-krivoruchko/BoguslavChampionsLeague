const source = {
  groups: ["a", "b"],
  teams: [
    {
      id: 1,
      group: "a",
      country: "Spain",
      name: "Real Madrid",
      img: "./img/real.png",
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
  //   console.log("first record to local storage");
  save("data", source);
  data = Object.assign({}, source);

  //   console.log(data);
  renderTable();

  data.groups.forEach((gr) => {
    renderGroup(gr);
    const rounds = roundRobin(filteredTeamsNameByGroup(gr));
    const matches = load(`matches-${gr}`);
    !matches && save(`matches-${gr}`, rounds);
    renderMatches(gr);
  });
} else {
  //   console.log("get data from local storage");
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
checkWinner();

function filteredTeamsNameByGroup(group) {
  return data.teams.filter((t) => t.group === group).map((t) => t.name);
}

function renderTable() {
  console.log("render table");
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
  console.log("render group");

  const markup = data.teams
    .filter((t) => t.group === group)
    .map((t) => {
      return `<tr class= ${t.owner === "Sasha" ? "sasha" : "pasha"}>
		<td><img src='${t.img}' width="30px"/>  ${t.name}</td>
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
        match: [r[0], r[1]],
        score: ["", ""],
        finished: false,
      };
      matches.push(z);
    })
  );

  return matches;
}

function renderMatches(group) {
  const matches = load(`matches-${group}`);

  const markup = matches.map((t) => {
    const scoreHome = t.score[0];
    const scoreAway = t.score[1];
    const teamHome = t.match[0];
    const teamAway = t.match[1];

    return `<li class="match" data-group=${group}><p><span data-team="home">${teamHome}</span>  (<span class="home">${scoreHome}</span> : <span class="away">${scoreAway}</span>)  <span data-team="away">${teamAway}</span></p><div class="modal">
    <div class="modal-content">
         <form>
        <input type="number" name="home" placeholder="${teamHome}">
        <span> - </span>
        <input type="number" name="away" placeholder="${teamAway}"/>
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

  const home = Number(form.elements.home.value) || 0;
  const away = Number(form.elements.away.value) || 0;

  const match = {
    match: [teamHome.textContent, teamAway.textContent],
    score: [home, away],
    finished: true,
  };
  const index = matches.findIndex(
    (m) =>
      m.match[0] + m.match[1] === teamHome.textContent + teamAway.textContent
  );
  matches.splice(index, 1, match);
  save(`matches-${group}`, matches);
  renderMatches(group);
  checkWinner();
  matchStats(match.match, match.score);
}

function checkWinner() {
  const homeScore = document.querySelectorAll(".home");
  const awayScore = document.querySelectorAll(".away");
  const homeTeam = document.querySelectorAll("span[data-team='home']");
  const awayTeam = document.querySelectorAll("span[data-team='away']");

  for (let i = 0; i < homeScore.length; i++) {
    if (homeScore[i].textContent > awayScore[i].textContent) {
      homeScore[i].classList.add("winner");
      awayScore[i].classList.add("loser");
      homeTeam[i].classList.add("winner");
      awayTeam[i].classList.add("loser");
    } else if (homeScore[i].textContent < awayScore[i].textContent) {
      awayScore[i].classList.add("winner");
      homeScore[i].classList.add("loser");
      homeTeam[i].classList.add("loser");
      awayTeam[i].classList.add("winner");
    } else if (
      homeScore[i].textContent &&
      awayScore[i].textContent &&
      homeScore[i].textContent === awayScore[i].textContent
    ) {
      homeScore[i].classList.add("draw");
      awayScore[i].classList.add("draw");
      homeTeam[i].classList.add("draw");
      awayTeam[i].classList.add("draw");
    }
  }
}

function matchStats(match, score) {
  const stats = load("stats") || [];
  const teamStat1 = countStats(match, score)[0];
  const teamStat2 = countStats(match, score)[1];

  const teamInList1 = stats.find((i) => i.team === teamStat1.team);
  const index1 = stats.findIndex((i) => i.team === teamStat1.team);
  const teamInList2 = stats.find((i) => i.team === teamStat2.team);
  const index2 = stats.findIndex((i) => i.team === teamStat2.team);

  //   console.log("teamInList1", teamInList1);
  //   console.log("teamStat1", teamStat1);

  if (!teamInList1) {
    stats.push(teamStat1);
  } else {
    const updateTeamStat1 = updateStats(teamInList1, teamStat1);
    //  console.log("updateTeamStat1", updateTeamStat1);
    stats.splice(index1, 1, updateTeamStat1);
  }

  if (!teamInList2) {
    stats.push(teamStat2);
  } else {
    const updateTeamStat2 = updateStats(teamInList2, teamStat2);
    stats.splice(index2, 1, updateTeamStat2);
  }

  save("stats", stats);
}

function checkTeamInList(list, team) {
  return list.find((i) => i.team === team);
}

function countStats(match, score) {
  const t1 = {
    team: match[0],
    played: 0,
    win: 0,
    draw: 0,
    lose: 0,
    goals: { for: 0, against: 0 },
  };
  const t2 = {
    team: match[1],
    played: 0,
    win: 0,
    draw: 0,
    lose: 0,
    goals: { for: 0, against: 0 },
  };

  if (score[0] > score[1]) {
    t1.played++;
    t2.played++;
    t1.win++;
    t2.lose++;
  } else if (score[0] < score[1]) {
    t1.played++;
    t2.played++;
    t1.lose++;
    t2.win++;
  } else if (score[0] === score[1]) {
    t1.played++;
    t2.played++;
    t1.draw++;
    t2.draw++;
  }
  t1.goals.for = score[0];
  t1.goals.against = score[1];
  t2.goals.for = score[1];
  t2.goals.against = score[0];

  return [t1, t2];
}

function updateStats(oldGame, newGame) {
  const updateGame = {
    team: oldGame.team,
    played: oldGame.played + newGame.played,
    win: newGame.win > 0 ? oldGame.win + newGame.win : oldGame.win,
    draw: newGame.draw > 0 ? oldGame.draw + newGame.draw : oldGame.draw,
    lose: newGame.lose > 0 ? oldGame.draw + newGame.draw : oldGame.lose,
    goals: {
      for: oldGame.goals.for + newGame.goals.for,
      against: oldGame.goals.against + newGame.goals.against,
    },
  };
  return updateGame;
}
