const audio = document.createElement("AUDIO");
document.body.appendChild(audio);
audio.src = "./audio/gimn.mp3";

window.addEventListener("DOMContentLoaded", audio.play());
