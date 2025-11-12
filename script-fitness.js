// ===== Grab elements =====
let goalInput   = document.getElementById("goal");
let timeInput   = document.getElementById("time");
let outputEl    = document.getElementById("output");
let setGoalBtn  = document.getElementById("setGoalBtn");
let addBtn      = document.getElementById("addBtn");
let outputMins  = document.getElementById("outputMins");
let resetBtn    = document.getElementById("resetBtn");

//==== OUTPUT STYLE ====
outputEl.style.color = "limegreen";
outputEl.style.fontWeight = "bold";
outputEl.style.fontFamily = "monospace";
outputEl.style.textShadow = "0 0 5px #080808ff";
outputMins.style.color = "limegreen";
outputMins.style.fontWeight = "bold";
outputMins.style.fontFamily = "monospace";
outputMins.style.textShadow = "0 0 5px #080808ff";

// ===== Default state =====
let goal = 0;
let total = 0;
let rounded;
outputEl.textContent = `Ready!`;

// ===== Storage helpers =====
const STORAGE_KEY = "fitnessTracker.v1";
const todayISO = () => new Date().toISOString().slice(0,10);

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ goal, total, date: todayISO() })
    );
  } catch (_) { /* ignore quota / private mode errors */ }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);

    if (typeof data.goal === "number") goal = data.goal;
    if (typeof data.total === "number") total = data.total;

    // Optional: new day = keep goal, reset total
    if (data.date && data.date !== todayISO()) {
      total = 0;
      saveState();
    }
  } catch (_) { /* ignore parse errors */ }
}

function renderStatus(percentOverride) {
  const percent = (goal > 0) ? ((total / goal) * 100) : 0;
  const p = (typeof percentOverride === "number") ? percentOverride : percent;
  rounded = p.toFixed(1);
  outputMins.textContent = goal > 0
    ? `${total} / ${goal} minute(s) logged ${rounded}% there!`
    : "";
}

//==== Motivational Messages ====
function messageFor(percent) {
  if (percent >= 100) return "🎉 Congratulations!";
  if (percent < 25)  return "Nice warm-up — you're just getting started! 🏁";
  if (percent < 50)  return "Getting there! Keep that energy going! ⚡";
  if (percent < 75)  return "Almost at the finish line! 🔥";
  return "Just a little more!";
}

//==== Input Limiters ====
goalInput.addEventListener("input", function() {
  goalInput.value = goalInput.value.replace(/\D/g, "").slice(0, 3);
});
timeInput.addEventListener("input", function () {
  timeInput.value = timeInput.value.replace(/\D/g, "").slice(0, 3);
});

// ===== Load saved state on start =====
loadState();
if (goal > 0) {
  outputEl.textContent = `Goal: ${goal} min(s). Log some minutes!`;
  renderStatus();
}

//==== Set Goal button ====
setGoalBtn.addEventListener("click", function() {
  let val = parseInt(goalInput.value, 10);
  if (isNaN(val) || val <= 0) {
    outputEl.textContent = "Invalid entry. Please try again.";
    return;
  }
  goal = Math.min(Math.max(val, 1), 999);
  total = 0;
  outputEl.textContent = `Goal set ${goal} min(s).  Lets log some minutes!`;
  renderStatus();
  saveState();
});

//==== Add Button ====
addBtn.addEventListener("click", function() {
  if (goal <= 0) {
    outputEl.textContent = "Set a goal first.";
    return;
  }
  let add = parseInt(timeInput.value, 10);
  if (isNaN(add) || add <= 0) {
    outputEl.textContent = "Invalid input. Please try again.";
    return;
  }
  total = Math.min(goal, total + add);
  const percent = (total / goal) * 100;
  outputEl.textContent = messageFor(percent);
  renderStatus(percent);
  timeInput.value = "";
  saveState();
});

//==== Reset Button ====
resetBtn.addEventListener("click", function() {
  // Keep your current goal, or reset it—your choice:
  // goal = 0; // uncomment to wipe goal too
  total = 0;
  outputMins.textContent = "Progress has been reset.";
  goalInput.value = "";
  timeInput.value = "";
  saveState();
});

outputEl.textContent = `Ready!`;
