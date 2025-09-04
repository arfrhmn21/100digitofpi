const piDigits =
    "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

const prefix = "3.";
const hideButton = document.querySelector(".hide");
const resultArea = document.querySelector(".resultArea");
const belakangKoma = document.querySelector(".belakangKoma");
const piInput = document.getElementById("piInput");

let output = "";
let count = 0;

// 🔹 awalnya input dikunci
piInput.disabled = true;

for (let i = 2; i < piDigits.length; i++) {
  output += `<span>${piDigits[i]}</span>`;
  count++;

  if (count % 10 === 0) {
    output += "<br>";
  }
}

belakangKoma.innerHTML = output;

// awalnya tombol cek juga disabled
document.querySelectorAll("button")[0].disabled = true;

function cekPi() {
  document.querySelectorAll("button")[0].disabled = true;

  const input = piInput.value;
  const feedback = document.getElementById("feedback");
  const spans = belakangKoma.querySelectorAll("span");

  spans.forEach(span => {
    span.style.color = "black";
  });

  let correctCount = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === piDigits[i]) {
      correctCount++;
      if (i > 1) {
        spans[i - 2].style.color = "green"; 
      }
    } else {
      if (i > 1) {
        spans[i - 2].style.color = "red"; 
      }
      break;
    }
  }

  if (correctCount === input.length && input.length > 0) {
    feedback.innerHTML = `<span class="correct">Benar sampai digit ke-${correctCount - 2}!</span>`;
  } else {
    feedback.innerHTML = `<span class="wrong">Salah di digit ke-${correctCount + 1 - 2}</span>`;
  }

  resultArea.style.opacity = "1"; 
  hideButton.style.display = "inline-block";
}

window.onload = () => {
  piInput.focus();
  piInput.setSelectionRange(piInput.value.length, piInput.value.length);
};

piInput.addEventListener("input", function () {
  if (!piInput.value.startsWith(prefix)) {
    piInput.value = prefix;
  }

  if (piInput.value.length > piDigits.length) {
    piInput.value = piInput.value.slice(0, piDigits.length);
  }
});

function hideClue() {
  resultArea.style.opacity = 0;
  hideButton.style.display = "none";

  // 🔹 aktifkan input + tombol cek
  piInput.disabled = false;
  document.querySelectorAll("button")[0].disabled = false;

  // langsung fokus ke input biar enak
  piInput.focus();
}

// 🔹 disable klik kanan
// document.addEventListener("contextmenu", event => event.preventDefault());

// 🔹 disable copy & cut
document.addEventListener("copy", event => event.preventDefault());
document.addEventListener("cut", event => event.preventDefault());

// 🔹 disable shortcut CTRL+U (view source), CTRL+C, CTRL+A
document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey && (event.key === "u" || event.key === "U")) ||  // ctrl+u
        (event.ctrlKey && (event.key === "a" || event.key === "A")) ||  // ctrl+a
        (event.ctrlKey && (event.key === "c" || event.key === "C"))) {  // ctrl+c
        event.preventDefault();
    }
});

function refreshPage() {
    window.location.reload(); // reload halaman
}