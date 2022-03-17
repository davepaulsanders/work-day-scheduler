const today = luxon.DateTime.now();
let focusedEl;
$("#currentDay").text(today.toLocaleString());
function editEvent(event) {
  const currentText = $(this).text();
  const classes = $(this).attr("class");

  if ($(this).is("textarea")) {
    return;
  }
  $(this).replaceWith(
    "<textarea autofocus spellcheck='false' class='" +
      classes +
      "'>" +
      currentText +
      "</textarea>"
  );
  $(".eventblock").focus();
}

function saveEvent() {
  const eventBlock = $(this).siblings(".eventblock");
  const task = eventBlock.val().trim();
  const hour = $(this).siblings(".hour").text();
  const classes = eventBlock.attr("class");
  eventBlock.replaceWith("<div class='" + classes + "'>" + task + "</div>");

  const newTask = {
    hour,
    task,
  };
  let currentTasks = JSON.parse(localStorage.getItem("tasks"));
  let updatedTasks;

  // if that timeslot already contains something, delete it and store new one
  for (x in currentTasks) {
    if (currentTasks[x].hour === newTask.hour) {
      updatedTasks = currentTasks.filter((y) => y !== currentTasks[x]);
      updatedTasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return;
    }
  }
  if (!currentTasks) {
    const taskArr = [];
    taskArr.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskArr));
    return;
  }
  currentTasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(currentTasks));
  assignColors();
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  for (obj in savedTasks) {
    if ($(".block-" + savedTasks[obj].hour)) {
      $(".block-" + savedTasks[obj].hour).text(savedTasks[obj].task);
    }
  }
}

function assignColors() {
  const hoursArr = [
    "12AM",
    "1AM",
    "2AM",
    "3AM",
    "4AM",
    "5AM",
    "6AM",
    "7AM",
    "8AM",
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM",
    "8PM",
    "9PM",
    "10PM",
    "11PM",
  ];
  const today2 = luxon.DateTime.fromISO(today);
  const amOrPm = today2.hour > 11 ? "P" : "A";
  let finalTime = `${today2.toFormat("h")}${amOrPm}M`;

  for (hour of hoursArr) {
    if (hoursArr.indexOf(hour) === hoursArr.indexOf(finalTime)) {
      $(".block-" + hour).addClass("red");
    } else if (hoursArr.indexOf(hour) < hoursArr.indexOf(finalTime)) {
      $(".block-" + hour).addClass("gray");
    } else {
      $(".block-" + hour).addClass("green");
    }
  }
}

const timeBlocksContainer = $(".time-blocks-container");
timeBlocksContainer.on("mousedown", ".eventblock", editEvent);
const text = $(".eventblock");

const saveButton = $(".btn");
saveButton.on("click", saveEvent);

assignColors();
loadTasks();
