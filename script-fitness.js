// ===== Grab elements =====
let goalInput = document.getElementById("goal");
let timeInput = document.getElementById("time");
let outputEl  = document.getElementById("output");
let setGoalBtn = document.getElementById("setGoalBtn");
let addBtn = document.getElementById("addBtn");
let outputMins = document.getElementById("outputMins");
let resetBtn = document.getElementById("resetBtn");

//==== OUTPUT STYLE ====
outputEl.style.color = "limegreen";
outputEl.style.fontWeight = "bold";
outputEl.style.fontFamily = "monospace";
outputEl.style.textShadow = "0 0 5px #080808ff";
outputMins.style.color = "limegreen";
outputMins.style.fontWeight = "bold";
outputMins.style.fontFamily = "monospace";
outputMins.style.textShadow = "0 0 5px #080808ff";

let goal = 0;
let total = 0;
let rounded;

// ==== Load saved data ====
const STORAGE_KEY = "fitnessTrackerSave";
const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (savedData) {
  goal = savedData.goal || 0;
  total = savedData.total || 0;
}

if (goal <= 0) {
  outputEl.textContent = `Set today's Goal!`;
} else { 
  let percent = (total / goal) * 100;
  rounded = percent.toFixed(1);
  outputEl.textContent = `Ready!`;
  outputMins.textContent = `${total} / ${goal} minute(s) logged ${rounded}% there!`;
}

//==== Motivational Messages ====
function messageFor(percent) {
  if (percent >= 100) return "🎉 Congratulations!";
  if (percent < 25)  return "Nice warm-up — you're just getting started! 🏁";
  if (percent < 50)  return "Getting there! Keep that energy going! ⚡";
  if (percent < 75)  return "Almost at the finish line! 🔥";
  return "Just a little more!";
}

//==== Save helper ====
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ goal, total }));
}

//==== Input Limiters ====
goalInput.addEventListener("input", function() {
  if (goalInput.value.length > 3) {
    goalInput.value = goalInput.value.slice(0, 3);
  }
});

timeInput.addEventListener("input", function () {
  if (timeInput.value.length > 3) {
    timeInput.value = timeInput.value.slice(0, 3);
  }
});

//==== Set Goal button ====
setGoalBtn.addEventListener("click", function(event) {
  event.preventDefault();
  let val = parseInt(goalInput.value, 10);
  if (isNaN(val) || val <= 0) {
    outputEl.textContent = "Invalid entry. Please try again. (1-999)";
    outputMins.textContent = "";
    return;
  }
  goal = val;
  total = 0;
  outputEl.textContent = `Goal set ${goal} min(s). Don't forget to stretch!`;
  outputMins.textContent = "";
  saveProgress();
});

//==== Add Button (defaults to +1 if input is empty/invalid) ====
function handleAdd(event) {
  if (event) event.preventDefault();
  if (goal <= 0) {
    outputEl.textContent = "Set a goal first.";
    outputMins.textContent = "";
    return;
  }

  let add = parseInt(timeInput.value, 10);
  if (isNaN(add) || add <= 0) {
    add = 1;
  }

  total = Math.min(goal, total + add);
  let percent = (total / goal) * 100;
  rounded = percent.toFixed(1);
  outputEl.textContent = messageFor(percent);
  outputMins.textContent = `${total} / ${goal} minute(s) logged ${rounded}% there!`;
  timeInput.value = "";
  saveProgress();
}

addBtn.addEventListener("click", handleAdd);

//==== Trigger Add when pressing Enter in the time input ====
timeInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleAdd();
  }
});

//==== Reset Button ====
resetBtn.addEventListener("click", function(event) {
  event.preventDefault();
  total = 0;
  goal = 0;
  outputEl.textContent = `Goal: ${goal} min(s)`;
  outputMins.textContent = "Progress has been reset.";
  goalInput.value = "";
  timeInput.value = "";
  saveProgress();
});
