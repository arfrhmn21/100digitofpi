const piDigits =
    "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

const prefix = "3.";
const hideButton = document.querySelector(".hide");
const resultArea = document.querySelector(".resultArea");
const belakangKoma = document.querySelector(".belakangKoma");

let output = "";
let count = 0;

for (let i = 2; i < piDigits.length; i++) {
  output += `<span>${piDigits[i]}</span>`;
  count++;

  if (count % 10 === 0) {
    output += "<br>";
  }
}

belakangKoma.innerHTML = output;

document.querySelectorAll("button")[0].disabled = true;

function cekPi() {

document.querySelectorAll("button")[0].disabled = true;


  const input = document.getElementById("piInput").value;
  const feedback = document.getElementById("feedback");

  const spans = belakangKoma.querySelectorAll("span");

  // 🔹 Reset semua warna dulu jadi hitam
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
  hideButton.style.display = "flex";
}



window.onload = () => {
    const input = document.getElementById("piInput");
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
};

document.getElementById("piInput").addEventListener("input", function () {
    const input = document.getElementById("piInput");

    if (!input.value.startsWith(prefix)) {
        input.value = prefix;
    }

    if (input.value.length > piDigits.length) {
        input.value = input.value.slice(0, piDigits.length);
    }
});

function hideClue() {
    resultArea.style.opacity = 0;
    hideButton.style.display = "none";
    document.querySelectorAll("button")[0].disabled = false;
}