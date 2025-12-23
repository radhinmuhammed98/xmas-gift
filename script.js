const bgMusic = document.getElementById("bgMusic");
const scare = document.getElementById("scare");
const statusText = document.getElementById("status");

function startGame() {
  document.getElementById("warning").style.display = "none";
  document.getElementById("game").classList.remove("hidden");
  bgMusic.volume = 0.4;
  bgMusic.play();
  shuffleBoxes();
}

function shuffleBoxes() {
  const boxes = document.getElementById("boxes");
  for (let i = boxes.children.length; i >= 0; i--) {
    boxes.appendChild(boxes.children[Math.random() * i | 0]);
  }
}

function pickBox(box) {
  statusText.innerText = "Opening your gift...";
  document.querySelectorAll(".box").forEach(b => b.style.pointerEvents = "none");

  setTimeout(() => {
    triggerScare();
  }, 1800);
}

function triggerScare() {
  bgMusic.pause();
  scare.style.display = "block";

  const audio = new Audio("assets/scare.mp3");
  audio.volume = 1;
  audio.play();

  setTimeout(resetGame, 2000);
}

function resetGame() {
  scare.style.display = "none";
  statusText.innerText = "Try again 😈";
  document.querySelectorAll(".box").forEach(b => b.style.pointerEvents = "auto");
  shuffleBoxes();
}
