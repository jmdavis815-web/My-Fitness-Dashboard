let goalInput = document.getElementById("goal");
let timeInput = document.getElementById("time");
let outputEl  = document.getElementById("output");
let setGoalBtn = document.getElementById("setGoalBtn");
let addBtn = document.getElementById("addBtn");
let outputMins = document.getElementById("outputMins");
let resetBtn = document.getElementById("resetBtn");
    //==== OUPUT STYLE ====
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

//==== Motivational Messages ====
function messageFor(percent) {
    if (percent >= 100) return "🎉 Congratulations!";
    if (percent < 25)  return "Nice warm-up — you're just getting started! 🏁";
    if (percent < 50)  return "Getting there! Keep that energy going! ⚡";
    if (percent < 75)  return "Almost at the finish line! 🔥";
    return "Just a little more!";
}

//==== Input Limiter ====
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
setGoalBtn.addEventListener("click", function() {
    let val = parseInt(goalInput.value, 10);
    if (isNaN(val) || val <= 0) {
        outputEl.textContent = "Invalid entry. Please try again.";
        return;
    }
    goal = val;
    total = 0;
    outputEl.textContent = "Goal set. Log some minutes!";
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
    let percent = (total / goal) * 100;
    rounded = percent.toFixed(1);
    outputEl.textContent = messageFor(percent);
    outputMins.textContent = `${total} / ${goal} minute(s) logged ${rounded}% there!`;
    timeInput.value = "";
});

//==== Reset Button ====
resetBtn.addEventListener("click", function() {
  goal = 0;
  total = 0;
  outputEl.textContent = "Progress has been reset.";
  outputMins.textContent = "";
  goalInput.value = "";
  timeInput.value = "";
});



    
