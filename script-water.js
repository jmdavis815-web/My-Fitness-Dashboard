// ===== Grab elements =====
const waterGoal = document.getElementById("waterGoal");
const setBtn = document.getElementById("setCups");
const addBtn = document.getElementById("addCup");
const waterOutput = document.getElementById("waterOutput");
const resetBtn = document.getElementById("resetCups");

// ===== Default values =====
let goal = 8;
let total = 0;

// ===== Storage helpers =====
const STORAGE_KEY = "waterTracker.v1";
function todayISO() { return new Date().toISOString().slice(0,10); }

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ goal, total, date: todayISO() })
  );
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (typeof data.goal === "number") goal = data.goal;
    if (typeof data.total === "number") total = data.total;

    // Optional: reset daily total if the saved date isn't today
    if (data.date !== todayISO()) {
      total = 0;               // keep goal, clear total for new day
      saveState();             // write back with today's date
    }
  } catch (_) {
    // ignore parse errors and keep defaults
  }
}

function renderStatus() {
  waterOutput.textContent = `${total} / ${goal} cups`;
}

// ===== Input limit =====
waterGoal.addEventListener("input", function() {
  waterGoal.value = waterGoal.value.replace(/\D/g, "").slice(0, 3);
});

// ===== Init: load + render =====
loadState();
renderStatus();

// ===== Set custom goal =====
setBtn.addEventListener("click", function () {
  const val = parseInt(waterGoal.value, 10);
  if (isNaN(val) || val <= 0) {
    waterOutput.textContent = "Enter a valid goal (1–999).";
    return;
  }
  goal = Math.min(Math.max(val, 1), 999);
  total = 0;
  saveState();
  renderStatus();
});

// ===== Add 1 cup per click =====
addBtn.addEventListener("click", function () {
  if (goal <= 0) {
    waterOutput.textContent = "Set a goal first.";
    return;
  }
  total = Math.min(goal, total + 1);
  saveState();
  renderStatus();
});

// ===== Reset button =====
resetBtn.addEventListener("click", function () {
  goal = 8;                  // reset to default goal (change if you prefer)
  total = 0;
  waterGoal.value = "";
  saveState();
  renderStatus();
});
