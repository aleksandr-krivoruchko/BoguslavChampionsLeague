const source = {
  groups: ["a", "b", "c", "d", "e", "f", "g", "h"],
  teams: [
    {
      id: 1,
      group: "a",
      name: "Бавария",
    },
    {
      id: 2,
      group: "a",
      name: "Галатасарай",
    },
    {
      id: 3,
      group: "a",
      name: "Манчестер Юнайтед",
    },
    {
      id: 4,
      group: "a",
      name: "Копенгаген",
    },
    {
      id: 5,
      group: "b",
      name: "Арсенал",
    },
    {
      id: 6,
      group: "b",
      name: "Ленс",
    },
    {
      id: 7,
      group: "b",
      name: "Севилья",
    },
    {
      id: 8,
      group: "b",
      name: "ПСВ",
    },
    {
      id: 9,
      group: "c",
      name: "Реал Мадрид",
    },
    {
      id: 10,
      group: "c",
      name: "Наполи",
    },
    {
      id: 11,
      group: "c",
      name: "Брага",
    },
    {
      id: 12,
      group: "c",
      name: "Юнион Берлин",
    },
    {
      id: 13,
      group: "d",
      name: "Реал Сосьедад",
    },
    {
      id: 14,
      group: "d",
      name: "Интер",
    },
    {
      id: 15,
      group: "d",
      name: "Зальцбург",
    },
    {
      id: 16,
      group: "d",
      name: "Бенфика",
    },
    {
      id: 17,
      group: "e",
      name: "Фейенорд",
    },
    {
      id: 18,
      group: "e",
      name: "Атлетико Мадрид",
    },
    {
      id: 19,
      group: "e",
      name: "Лацио",
    },
    {
      id: 20,
      group: "e",
      name: "Селтик",
    },
    {
      id: 21,
      group: "f",
      name: "ПСЖ",
    },
    {
      id: 22,
      group: "f",
      name: "Боруссия Дортмунд",
    },
    {
      id: 23,
      group: "f",
      name: "Ньюкасл",
    },
    {
      id: 24,
      group: "f",
      name: "Милан",
    },
    {
      id: 25,
      group: "g",
      name: "Манчестер Сити",
    },
    {
      id: 26,
      group: "g",
      name: "Лейпциг",
    },
    {
      id: 27,
      group: "g",
      name: "Янг Бойз",
    },
    {
      id: 28,
      group: "g",
      name: "Црвена Звезда",
    },
    {
      id: 29,
      group: "h",
      name: "Барселона",
    },
    {
      id: 30,
      group: "h",
      name: "Порту",
    },
    {
      id: 31,
      group: "h",
      name: "Шахтер",
    },
    {
      id: 32,
      group: "h",
      name: "Антверпен",
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
  data = Object.assign({}, source);
  renderTable();

  data.groups.forEach((gr) => {
    renderGroup(gr);

    const rounds = roundRobin(filteredTeamsNameByGroup(gr));
    const matches = load(`matches-${gr}`);
    !matches && save(`matches-${gr}`, rounds);

    renderMatches(gr);
  });
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
checkWinner();

function filteredTeamsNameByGroup(group) {
  return data.teams.filter((t) => t.group === group).map((t) => t.name);
}

function renderTable() {
  const markup = data.groups.map((gr) => {
    const teams = data.teams.filter((t) => t.group === gr).map((t) => t.name);
    return `<div class="group" >
      <div>
		<h3 class="heading">Группа ${gr}</h3>
      <table data-group="${gr}">
		<tr class="col">
		<th>Команда</th>
		<th>Матчи</th>
		<th>Победы</th>
		<th>Ничьи</th>
		<th>Проигр.</th>
		<th>Забито</th>
		<th>Проп.</th>
		<th>Очки</th>
		<th>Игрок	</th>
		</tr>
      </table>
		 <div class="modal" data-modal="table">
		<div class="modal-content">
        <form>
          <ul>
            <li>
              <span class="title">${teams[0]}</span>
              <label>
                <input type="radio" name="${teams[0]}" value="С" />C
              </label>
              <label>
                <input type="radio" name="${teams[0]}" value="П" />П
              </label>
            </li>
            <li>
              <span class="title">${teams[1]}</span>
              <label>
                <input type="radio" name="${teams[1]}" value="С" />C
              </label>
              <label>
                <input type="radio" name="${teams[1]}" value="П" />П
              </label>
            </li>
            <li>
              <span class="title">${teams[2]}</span>
              <label>
                <input type="radio" name="${teams[2]}" value="С" />C
              </label>
              <label>
                <input type="radio" name="${teams[2]}" value="П" />П
              </label>
            </li>
            <li>
              <span class="title">${teams[3]}</span>
              <label>
                <input type="radio" name="${teams[3]}" value="С" />C
              </label>
              <label>
                <input type="radio" name="${teams[3]}" value="П" />П
              </label>
            </li>
				<button type="submit" class="btn table-btn">OK</button>
          </ul>
        </form>
		</div>
		</div>
		</div>
		<ul data-list="${gr}">
		</ul>
		</div>
		`;
  });

  root.insertAdjacentHTML("beforeend", markup.join(""));
}

function renderGroup(group) {
  const stats = load("stats");

  const markup = data.teams
    .filter((t) => t.group === group)
    .map((t) => {
      const q = stats?.find((i) => i.team === t.name);

      return `<tr data-team="${t.name}">
		<td>${t.name}</td>
		<td>${q ? q.played : "-"}</td>
		<td>${q ? q.win : "-"}</td>
		<td>${q ? q.draw : "-"}</td>
		<td>${q ? q.lose : "-"}</td>
		<td>${q ? q.goals.for : "-"}</td>
		<td>${q ? q.goals.against : "-"}</td>
		<td>${q ? q.win * 3 + q.draw * 1 : "-"}</td>
		<td>${q ? q.player : "-"}</td>
        </tr>`;
    });
  const table = document.querySelector(`table[data-group="${group}"]`);
  table.insertAdjacentHTML("beforeend", markup.join(""));
  table.addEventListener("click", tableModalOpen);
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

    return `<li class="match" data-group=${group}><p><span data-team="home">${teamHome}</span>  (<span class="home">${scoreHome}</span> : <span class="away">${scoreAway}</span>)  <span data-team="away">${teamAway}</span></p>
	 <div class="modal" data-modal="match">
    <div class="modal-content">
         <form class="modal-form">
        <div class="home-box">
		 <input type="number" name="home" placeholder="${teamHome}" min="0">
		 <label>
        <input type="radio" name="homePlayer" value="С" />
        С
      </label>
      <label>
        <input type="radio" name="homePlayer" value="П" />
        П
      </label>
		</div>
		<span> - </span>
		<div class="away-box">
<input type="number" name="away" placeholder="${teamAway}" min="0"/> 
		 <label>
        <input type="radio" name="awayPlayer" value="С" />
        С
      </label>
      <label>
        <input type="radio" name="awayPlayer" value="П" />
        П
      </label>
		</div>
        <button type="submit" class="btn modal-btn">OK</button>
  		</form>
    </div>
  </div>
  </li>`;
  });
  const list = document.querySelector(`ul[data-list='${group}']`);
  list.innerHTML = markup.join("");
  list.addEventListener("click", modalOpen);
}

function renderGroupStats(group) {
  const stats = load("stats") || [];

  const markup = stats.map((t) => {
    return `<tr data-team="${t.team}">
		<td>${t.team}</td>
      <td>${t.played}</td>
		<td>${t.win}</td>
		<td>${t.draw}</td>
          <td>${t.lose}</td>
			 <td>${t.goals.for}</td>
			 <td>${t.goals.against}</td>
			 <td>${t.win * 3 + t.draw * 1}</td>
			 <td>${t.player}</td>
			 </tr>`;
  });
  document
    .querySelector(`table[data-group="${group}"]`)
    .insertAdjacentHTML("beforeend", markup.join(""));
}

function getID() {
  return "id" + Math.random().toString(16).slice(2);
}

function modalOpen(e) {
  const modal = e.target.closest("li").querySelector("div[data-modal='match']");
  const form = modal.querySelector(".modal-form");
  const closeBtn = form.querySelector("button");

  modal.classList.add("open");

  form.addEventListener("submit", handleSubmit);
  closeBtn.addEventListener("click", closeModal);
}

function closeModal() {
  const modal = document.querySelector("div[data-modal='match'].open");
  modal.classList.replace("open", "close");
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const teamHome = form.closest("li").querySelector("span[data-team='home']");
  const teamAway = form.closest("li").querySelector("span[data-team='away']");
  const group = form.closest("li").dataset.group;
  const matches = load(`matches-${group}`);
  const players = load("players") || [];
  const home = Number(form.elements.home.value) || 0;
  const away = Number(form.elements.away.value) || 0;
  const homePlayer = players.find((i) => i.team === teamHome.textContent);
  const awayPlayer = players.find((i) => i.team === teamAway.textContent);

  const match = {
    match: [teamHome.textContent, teamAway.textContent],
    score: [home, away],
    finished: true,
    player: [homePlayer?.player, awayPlayer?.player],
  };
  const index = matches.findIndex(
    (m) =>
      m.match[0] + m.match[1] === teamHome.textContent + teamAway.textContent
  );
  matches.splice(index, 1, match);
  save(`matches-${group}`, matches);
  renderMatches(group);
  checkWinner();
  matchStats(match);
  reRenderStats(teamHome.textContent);
  reRenderStats(teamAway.textContent);
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

function matchStats({ match, score, player }) {
  const stats = load("stats") || [];
  const teamStat1 = countStats(match, score, player)[0];
  const teamStat2 = countStats(match, score, player)[1];

  const teamInList1 = stats.find((i) => i.team === teamStat1.team);
  const index1 = stats.findIndex((i) => i.team === teamStat1.team);
  const teamInList2 = stats.find((i) => i.team === teamStat2.team);
  const index2 = stats.findIndex((i) => i.team === teamStat2.team);

  if (!teamInList1) {
    stats.push(teamStat1);
  } else {
    const updateTeamStat1 = updateStats(teamInList1, teamStat1);
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

function countStats(match, score, player) {
  const t1 = {
    team: match[0],
    played: 0,
    win: 0,
    draw: 0,
    lose: 0,
    goals: { for: 0, against: 0 },
    player: player[0],
  };
  const t2 = {
    team: match[1],
    played: 0,
    win: 0,
    draw: 0,
    lose: 0,
    goals: { for: 0, against: 0 },
    player: player[1],
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
    group: oldGame.group,
    team: oldGame.team,
    played: oldGame.played + newGame.played,
    win: newGame.win > 0 ? oldGame.win + newGame.win : oldGame.win,
    draw: newGame.draw > 0 ? oldGame.draw + newGame.draw : oldGame.draw,
    lose: newGame.lose > 0 ? oldGame.draw + newGame.draw : oldGame.lose,
    player: oldGame.player,
    goals: {
      for: oldGame.goals.for + newGame.goals.for,
      against: oldGame.goals.against + newGame.goals.against,
    },
  };
  return updateGame;
}

function reRenderStats(name) {
  const stats = load("stats");

  const markup = stats
    .filter((t) => t.team === name)
    .map((t) => {
      return `<td>${t.team}</td><td>${t.played}</td>
		<td>${t.win}</td>
		<td>${t.draw}</td>
          <td>${t.lose}</td>
			 <td>${t.goals.for}</td>
			 <td>${t.goals.against}</td>
			 <td>${t.win * 3 + t.draw * 1}</td>
			 <td>${t.player}</td>
			 `;
    });
  document.querySelector(`tr[data-team='${name}']`).innerHTML = markup.join("");
}

function renderTableModal(group) {
  const teams = data.teams.filter((t) => t.group === group).map((t) => t.name);

  const markup = data.groups.map((t) => {
    return `<div class="modal">
		<div class="modal-content">
        <form>
          <ul>
            <li>
              <p class="title">${teams[0]}</p>
              <label>
                <input type="radio" name="${teams[0]}" value="sasha" />C
              </label>
              <label>
                <input type="radio" name="${teams[0]}" value="pasha" />П
              </label>
            </li>
            <li>
              <p class="title">${teams[1]}</p>
              <label>
                <input type="radio" name="${teams[1]}" value="sasha" />C
              </label>
              <label>
                <input type="radio" name="${teams[1]}" value="pasha" />П
              </label>
            </li>
            <li>
              <p class="title">${teams[2]}</p>
              <label>
                <input type="radio" name="${teams[2]}" value="sasha" />C
              </label>
              <label>
                <input type="radio" name="${teams[2]}" value="pasha" />П
              </label>
            </li>
            <li>
              <p class="title">${teams[3]}</p>
              <label>
                <input type="radio" name="${teams[3]}" value="sasha" />C
              </label>
              <label>
                <input type="radio" name="${teams[3]}" value="pasha" />П
              </label>
            </li>
          </ul>
          <button type="submit">OK</button>
			<button type="button" class="close-btn">X</button>
        </form>
      </div>
		</div>`;
  });
  document
    .querySelector(`div[data-modal="${group}"]`)
    .insertAdjacentHTML("beforeend", markup.join(""));
}

function tableModalOpen(e) {
  const group = e.currentTarget.closest(".group");
  const modal = group.querySelector("div[data-modal='table']");
  const form = modal.querySelector("form");
  const closeBtn = modal.querySelector("button");

  modal.classList.add("open");

  form.addEventListener("submit", tableModalHandlerSubmit);
  closeBtn.addEventListener("click", tableModalClose);
}

function tableModalClose() {
  const modal = document.querySelector("div[data-modal='table'].open");

  modal.classList.replace("open", "close");
}

function tableModalHandlerSubmit(event) {
  event.preventDefault();

  const players = load("players") || [];
  const form = event.target;

  new FormData(form).forEach((value, name) =>
    players.push({
      team: name,
      player: value,
    })
  );

  save("players", players);
}
