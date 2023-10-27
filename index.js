const audio = document.createElement("AUDIO");
document.body.appendChild(audio);
audio.src = "./audio/gimn.mp3";

document.body.addEventListener("mousemove", function () {
  audio.play();
});
