// Possible characters/numbers including Hiragana, Katakana, and Kanji
const hiragana =
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
const katakana =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const kanji = "日月火水木金土山川田人手目耳口心"; // Sample Kanji characters
const englishCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()+=:;?/|"; // English characters and symbols
const hindiCharacters =
  "अआइईउऊऋएऐओऔअंअःकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहकषत्रज्ञऽ";
const usedPositions = [];
const maxAttempts = 100; // Limit the number of attempts to find a position

function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkOverlap(x, y, size) {
  for (let pos of usedPositions) {
    let distance = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
    if (distance < (pos.size + size) / 2) {
      return true; // Overlaps
    }
  }
  return false; // No overlap
}

function createRandomCharacter(fontColor, selectedFont) {
  const char = document.createElement("div");
  char.className = "char";

  let characters; // Declare variable for characters based on the selected font

  if (selectedFont === "Noto Sans JP") {
    // If "Noto Sans JP" is selected, use Hiragana, Katakana, and Kanji
    characters = hiragana + katakana + kanji;
  } else if (selectedFont === "Gowun Batang") {
    // If "Gowun Batang" is selected, use English characters
    characters = englishCharacters;
  } else if (selectedFont === "Martel") {
    characters = hindiCharacters;
  } else if (selectedFont === "Arial, sans-serif") {
    characters = englishCharacters;
  }

  char.innerText = characters[generateRandom(0, characters.length - 1)];

  const size = generateRandom(20, 100); // Random size between 20 and 100
  char.style.fontSize = `${size}px`;
  char.style.color = fontColor;
  char.style.fontFamily = selectedFont; // Set the selected font

  let x,
    y,
    attempts = 0;
  do {
    x = generateRandom(0, window.innerWidth - size);
    y = generateRandom(0, window.innerHeight - size);
    attempts++;
  } while (checkOverlap(x, y, size) && attempts < maxAttempts);

  if (attempts < maxAttempts) {
    usedPositions.push({ x, y, size });

    char.style.left = `${x}px`;
    char.style.top = `${y}px`;
    char.style.transform = `rotate(${generateRandom(0, 360)}deg)`; // Random rotation

    document.body.appendChild(char);
  } else {
    console.log("Skipped character due to overcrowding");
  }
}

function generateCharacters() {
  // Set background color without replacing innerHTML
  document.body.style.backgroundColor =
    document.getElementById("bgColor").value;

  // Clear previous characters without affecting the controls
  document.querySelectorAll(".char").forEach(function (char) {
    char.remove();
  });
  usedPositions.length = 0;

  const charCount = parseInt(document.getElementById("charCount").value);
  const fontColor = document.getElementById("fontColor").value;
  const selectedFont = document.getElementById("fontSelector").value; // Get the selected font

  for (let i = 0; i < charCount; i++) {
    createRandomCharacter(fontColor, selectedFont);
  }
}

document
  .getElementById("generate")
  .addEventListener("click", generateCharacters);

document.getElementById("optionSelect").addEventListener("change", function () {
  const selectedOption = this.value;

  document.querySelectorAll(".option-input").forEach(function (element) {
    element.style.display = "none";
  });

  if (selectedOption === "charCount") {
    document.getElementById("charCountInput").style.display = "block";
  } else if (selectedOption === "bgColor") {
    document.getElementById("bgColorInput").style.display = "block";
  } else if (selectedOption === "fontColor") {
    document.getElementById("fontColorInput").style.display = "block";
  }
});

// Initial setup
document.getElementById("optionSelect").dispatchEvent(new Event("change"));
generateCharacters();
