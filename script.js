const bgMusic = new Audio("assets/music.mp3");
const unwrapSound = new Audio("assets/unwrap.mp3");
const scareSound = new Audio("assets/scare.mp3");

bgMusic.volume = 0.3;
bgMusic.loop = true;

let gifts = ["scare", "funny", "safe"].sort(() => Math.random() - 0.5);

function start() {
  bgMusic.play();
}

function pickBox(index, el) {
  document.querySelectorAll(".gift").forEach(b => b.onclick = null);

  unwrapSound.play();
  el.classList.add("open");

  setTimeout(() => {
    if (gifts[index] === "scare") {
      triggerScare();
    } else if (gifts[index] === "funny") {
      showMessage("🎅 You got socks!");
    } else {
      showMessage("🎁 A warm hug from Santa ❤️");
    }
  }, 1500);
}

function triggerScare() {
  bgMusic.pause();
  document.body.classList.add("scare-mode");
  scareSound.play();

  setTimeout(() => location.reload(), 2500);
}

function showMessage(msg) {
  document.getElementById("message").innerText = msg;
}
  setTimeout(resetGame, 2000);
}

function resetGame() {
  scare.style.display = "none";
  statusText.innerText = "Try again 😈";
  document.querySelectorAll(".box").forEach(b => b.style.pointerEvents = "auto");
  shuffleBoxes();
}
