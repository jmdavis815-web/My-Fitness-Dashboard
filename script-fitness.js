const goalInput = document.getElementById("goal");
const timeInput = document.getElementById("time");
const outputEl  = document.getElementById("output");
const setGoalBtn = document.getElementById("setGoalBtn");
const addBtn = document.getElementById("addBtn");
const outputMins = document.getElementById("outputMins")
const outputPrc = document.getElementById("outputPrc");
const resetBtn = document.getElementById("resetBtn");
    outputEl.style.color = "limegreen";
    outputEl.style.fontWeight = "bold";
    outputEl.style.fontFamily = "Arial, sans-serif";
    outputEl.style.textShadow = "0 0 5px #080808ff";
    outputMins.style.color = "limegreen";
    outputMins.style.fontWeight = "bold";
    outputMins.style.fontFamily = "Arial, sans-serif";
    outputMins.style.textShadow = "0 0 5px #080808ff";

let goal = 0;
let total = 0;
let rounded;

function messageFor(percent) {
    if (percent >= 100) return "🎉 Congratulations!";
    if (percent < 25)  return "Nice warm-up — you're just getting started! 🏁";
    if (percent < 50)  return "Getting there! Keep that energy going! ⚡";
    if (percent < 75)  return "Almost at the finish line! 🔥";
    return "Just a little more!";
}

goalInput.addEventListener("input", () => {
  if (goalInput.value.length > 3) {
    goalInput.value = goalInput.value.slice(0, 3);
  }
});

setGoalBtn.addEventListener("click", () => {
    const val = parseInt(goalInput.value, 10);
    if (isNaN(val) || val <= 0) {
        outputEl.textContent = "Invalid entry. Please try again.";
        return;
    }
    goal = val;
    total = 0;
    outputEl.textContent = "Goal set. Log some minutes!";
});

addBtn.addEventListener("click", () => {
    if (goal <= 0) {
        outputEl.textContent = "Set a goal first.";
        return;
    }
    const add = parseInt(timeInput.value, 10);
    if (isNaN(add) || add < 0) {
        outputEl.textContent = "Invalid input. Please try again.";
        return;
    }

    total = Math.min(goal, total + add);
    const percent = (total / goal) * 100;
    rounded = percent.toFixed(1);
    outputEl.textContent = messageFor(percent);
    outputMins.textContent = `${total} minute(s) logged ${rounded}% there!`;
    timeInput.value = "";
});

resetBtn.addEventListener("click", () => {
  goal = 0;
  total = 0;
  outputEl.textContent = "Progress has been reset.";
  outputMins.textContent = "";
  goalInput.value = "";
  timeInput.value = "";
});



    
