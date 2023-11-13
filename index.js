const startBtn = document.getElementById("start");
const audio = document.querySelector("audio");

startBtn.addEventListener("click", start);
startBtn.addEventListener("mouseover", svistok);

function start() {
  const markup = `
	    <div class="title"><h3>boguslav pictures</h3>
		 <h5>presents</h5></div>
    <div class="players">
      <div class="player pasha">
        <img src="./img/ppp.png" alt="Pasha" />
      </div>
      <div class="stars">
		<img class="fuck" src="./img/FUCK (1).png" alt="Fuck" />
        <a href="teams.html"> <img class="stars-image" src="./img/stars.png" alt="Logo" /> </a>
		  <h1>CHAMPIONS</h1>
		  <h3>LEAGUE</h3>
      </div>
      <div class="player sasha">
        <img src="./img/sasha.png" alt="Sasha" />
      </div>
		    <audio src="./audio/gimn.mp3" ></audio>

    </div>
`;
  document.body.innerHTML = markup;
}
function svistok() {
  audio.play();
}
