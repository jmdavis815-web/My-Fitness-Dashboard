const goalInput = document.getElementById("goal");
const timeInput = document.getElementById("time");
const outputEl  = document.getElementById("output");
const setGoalBtn = document.getElementById("setGoalBtn");
const addBtn = document.getElementById("addBtn");
const outputMins = document.getElementById("outputMins")
const outputPrc = document.getElementById("outputPrc");

let goal = 0;
let total = 0;

function messageFor(percent) {
  if (percent >= 100) return "🎉 Congratulations!";
  if (percent < 25)  return "Nice warm-up — you're just getting started! 🏁";
  if (percent < 50)  return "Getting there! Keep that energy going! ⚡";
  if (percent < 75)  return "Almost at the finish line! 🔥";
  return "Just a little more!";
}

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
  let rounded = total.toFixed(2);
  const percent = (total / goal) * 100;
  outputEl.textContent = messageFor(percent);
  outputMins.textContent = `${total} minutes logged ${percent}% there!`;
  timeInput.value = "";
});
