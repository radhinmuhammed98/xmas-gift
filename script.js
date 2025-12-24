const shuffleBtn = document.getElementById("shuffleBtn");
const gifts = document.querySelectorAll(".gift");
const scare = document.getElementById("scare");
const scareText = document.getElementById("scareText");
const result = document.getElementById("result");
const sound = document.getElementById("scareSound");

shuffleBtn.onclick = () => {
  shuffleBtn.style.display = "none";
  shuffleGifts();
};

gifts.forEach(gift => {
  gift.onclick = () => openGift(gift);
});

function shuffleGifts() {
  const parent = document.getElementById("gifts");
  [...gifts].sort(() => Math.random() - 0.5)
    .forEach(g => parent.appendChild(g));
}

function openGift(gift) {
  gifts.forEach(g => g.onclick = null);
  gift.classList.add("open");

  setTimeout(() => {
    jumpscare(gift.dataset.name);
  }, 400);
}

function jumpscare(name) {
  scareText.innerText = name;
  scare.style.display = "flex";
  sound.play();

  setTimeout(() => {
    scare.style.display = "none";
    result.style.display = "flex";
  }, 1200);
}

function retry() {
  result.style.display = "none";
  shuffleBtn.style.display = "block";

  gifts.forEach(g => {
    g.classList.remove("open");
    g.onclick = () => openGift(g);
  });
}

function share() {
  navigator.share?.({
    title: "Santa Gift 🎁",
    text: "ഈ സൈറ്റിൽ ഒരു സമ്മാനം തുറക്കൂ 😈🎄",
    url: location.href
  });
}
