// ===== Grab elements =====
const waterGoal = document.getElementById("waterGoal");
const setBtn = document.getElementById("setCups");
const addBtn = document.getElementById("addCup");
const waterOutput = document.getElementById("waterOutput");
const resetBtn = document.getElementById("resetCups");

// ===== Default values =====
let goal = 8;
let total = 0;

function renderStatus() {
  waterOutput.textContent = `${total} / ${goal} cups`;
}

waterGoal.addEventListener("input", function() {
  if (waterGoal.value.length > 3) {
    waterGoal.value = waterGoal.value.slice(0, 3);
  }
});

// ===== Defult Output =====
renderStatus();

// ===== Set custom goal =====
setBtn.addEventListener("click", function () {
  const val = parseInt(waterGoal.value, 10);
  if (isNaN(val) || val <= 0) {
    waterOutput.textContent = "Enter a valid goal (1–999).";
    return;
  } else {
    goal = val;
    total = 0;
    renderStatus();
  }
});

// ===== Add 1 cup per click =====
addBtn.addEventListener("click", function () {
  if (goal <= 0) {
    waterOutput.textContent = "Set a goal first.";
    return;
  }
  total = Math.min(goal, total + 1);
  renderStatus();
});

// ===== Reset button =====
resetBtn.addEventListener("click", function () {
  goal = 8; 
  total = 0;
  waterGoal.value = ""; 
  renderStatus();
});
