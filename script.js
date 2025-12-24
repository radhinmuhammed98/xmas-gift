const shuffleBtn = document.getElementById("shuffleBtn");
const giftsWrap = document.getElementById("gifts");
const gifts = document.querySelectorAll(".gift");
const reveal = document.getElementById("reveal");
const scareName = document.getElementById("scareName");

let canClick = false;

function playSound(id) {
  const s = document.getElementById(id);
  if (!s) return;
  s.currentTime = 0;
  s.play();
}

/* BUTTON CLICK */
shuffleBtn.onclick = () => {
  shuffleBtn.style.display = "none";
  startShuffle();
};

/* SHUFFLE LOGIC */
function startShuffle() {
  giftsWrap.classList.add("locked");

  gifts.forEach(g => g.classList.add("shuffle"));

  let count = 0;
  const shuffleInterval = setInterval(() => {
    const parent = giftsWrap;
    [...gifts].sort(() => Math.random() - 0.5)
      .forEach(g => parent.appendChild(g));
    count++;
    if (count === 7) {
      clearInterval(shuffleInterval);
      stopShuffle();
    }
  }, 250);
}

function stopShuffle() {
  gifts.forEach(g => g.classList.remove("shuffle"));
  giftsWrap.classList.remove("locked");
  gifts.forEach(g => g.classList.add("clickable"));
  canClick = true;
}

/* GIFT CLICK */
gifts.forEach(gift => {
  gift.onclick = () => {
    if (!canClick) return;

    canClick = false;
    gifts.forEach(g => g.classList.remove("clickable"));

    gift.classList.add("open");

    setTimeout(() => {
      revealGift(gift.dataset.name, gift.dataset.sound);
    }, 450);
  };
});

/* REVEAL */
function revealGift(name, soundId) {
  scareName.innerText = name;
  reveal.style.display = "flex";
  playSound(soundId);
}

/* RETRY */
function retry() {
  reveal.style.display = "none";

  gifts.forEach(g => {
    g.classList.remove("open", "clickable");
  });

  shuffleBtn.style.display = "block";
  giftsWrap.classList.add("locked");
  canClick = false;
}

/* SHARE */
function share() {
  navigator.share?.({
    title: "Rizzmas 🎄",
    text: "Rizzmas 🎁 ഒരു സമ്മാനം തുറക്കൂ 😈",
    url: location.href
  });
}
