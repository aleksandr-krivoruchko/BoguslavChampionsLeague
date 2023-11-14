const qqq = document.querySelector(".root");

qqq.insertAdjacentHTML(
  "beforeend",
  `<div class="music-player playing">
      <audio class="audio" src="" autoplay></audio>
      <p class="song">Song</p>
      <div class="progress-bar">
        <div class="progress"></div>
      </div>
      <div class="btns">
        <div class="music-btn prev">
          <img
            class="icon"
            src="./img/music/icons8-previous-64.png"
            alt="prev"
            width="50px"
          />
        </div>
        <div class="music-btn play">
          <img
            class="icon icon-src"
            src="./img/music/icons8-stop-64.png"
            alt="play"
            width="50px"
          />
        </div>
        <div class="music-btn next">
          <img
            class="icon"
            src="./img/music/icons8-next-64.png"
            alt="next"
            width="50px"
          />
        </div>
      </div>
      <div class="volume">
        <div class="down">
          <img
            class="icon icon-src"
            src="./img/music/down.png"
            alt="down"
            width="40px"
          />
        </div>
        <div class="mute">
          <img
            class="icon"
            src="./img/music/icons8-mute-64.png"
            alt="mute"
            width="40px"
          />
        </div>

        <div class="up">
          <img class="icon" src="./img/music/up.png" alt="up" width="40px" />
        </div>
      </div>
    </div>`
);

const player = document.querySelector(".music-player");
const musicAudio = document.querySelector(".audio");
const title = document.querySelector(".song");
const prevBtn = document.querySelector(".prev");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");
const iconSrc = document.querySelector(".icon-src");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const volumeBtnUp = document.querySelector(".up");
const volumeBtnDown = document.querySelector(".down");
const muteBtn = document.querySelector(".mute");

playBtn.addEventListener("click", () => {
  isPlaying = player.classList.contains("playing");

  !isPlaying ? playSong() : stopSong();
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
progressBar.addEventListener("click", setProgress);
musicAudio.addEventListener("timeupdate", updateProgress);
volumeBtnUp.addEventListener("click", volumeUp);
volumeBtnDown.addEventListener("click", volumeDown);
muteBtn.addEventListener("click", mute);

const songs = [
  "Linkin Park - Numb",
  "david_guetta__-_im_good_blue",
  "Eye Of The Tiger",
  "50_cent_-_in_da_club",
  "Jain - Makeba",
  "50_cent_feat_eminem",
  "Linkin Park - In The End",
  "limp_biskit_behind_blue_eyes",
  "metallica_-_the_day_that_never_comes",
  "limp_bizkit_-_take_a_look_around",
  "metallica_-_the_unforgiven",
  "the_prodigy_-_diesel_power",
  "nirvana_-_come_as_you_are",
  "snoop_dog_-_drop_it_like_its_hot",
  "nirvana_-_rape_me",
  "the_prodigy_-_shut_your_mouth",
  "david_guetta_-_2u_feat_justin_bieber",
];

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerHTML = song;
  musicAudio.src = `./audio/${song}.mp3`;
}

function playSong() {
  player.classList.add("playing");
  iconSrc.src = "./img/music/icons8-stop-64.png";
  musicAudio.play();
}

function stopSong() {
  player.classList.remove("playing");
  iconSrc.src = "./img/music/icons8-play-64.png";
  musicAudio.pause();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { currentTime, duration } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const spot = e.offsetX;
  const duration = musicAudio.duration;

  musicAudio.currentTime = (spot / width) * duration;
}

function volumeUp(e) {
  musicAudio.muted = false;

  if (musicAudio.volume === 1) return;

  musicAudio.volume += 0.1;
}

function volumeDown(e) {
  if (musicAudio.volume < 0.1) return;

  musicAudio.volume -= 0.1;
}

function mute() {
  musicAudio.muted = true;
}

musicAudio.addEventListener("ended", nextSong);
