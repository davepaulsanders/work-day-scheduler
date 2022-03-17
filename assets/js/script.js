//Get today's date
const today = luxon.DateTime.now();
$("#currentDay").text(today.toLocaleString());

// event listeners and global objects
const timeBlocksContainer = $(".time-blocks-container");
timeBlocksContainer.on("mousedown", ".eventblock", editEvent);
const saveButton = $(".btn");
saveButton.on("click", saveEvent);
// initial time set up

function getTime() {
  let time = luxon.DateTime.now();
  let today2 = luxon.DateTime.fromISO(time);
  let amOrPm = today2.hour > 11 ? "P" : "A";
  let displayTime = `${today2.toFormat("h:mm")} ${amOrPm}M`;
  let finalTime = `${today2.toFormat("h")}${amOrPm}M`;
  $("#currentTime").text(displayTime);
  return finalTime;
}
// time interval
function timeCall() {
  const timeInterval = setInterval(() => {
    getTime();
  }, 10000);
}

// Loads tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  for (obj in savedTasks) {
    if ($(".block-" + savedTasks[obj].hour)) {
      $(".block-" + savedTasks[obj].hour).text(savedTasks[obj].task);
    }
  }
}

// after initial calls repeats color set up and task loading every 10 minutes
function setIntervalLoadTasks() {
  const timeLoop = setInterval(() => {
    loadTasks();
    assignColors();
  }, 300000);
}

// assigns colors based on index of current time in relations to hoursArr comparison object
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
  const currentTime = getTime();

  for (hour of hoursArr) {
    if (hoursArr.indexOf(hour) === hoursArr.indexOf(currentTime)) {
      $(".block-" + hour).addClass("red");
    } else if (hoursArr.indexOf(hour) < hoursArr.indexOf(currentTime)) {
      $(".block-" + hour).addClass("gray");
    } else {
      $(".block-" + hour).addClass("green");
    }
  }
}

// When clicking in timeblock
function editEvent(event) {
  const currentText = $(this).text();
  const classes = $(this).attr("class");

  if ($(this).is("textarea")) {
    return;
  }
  $(this).replaceWith(
    "<textarea spellcheck='false' class='" +
      classes +
      "'>" +
      currentText +
      "</textarea>"
  );
}
// save to local storage and add task to timeblock
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

// Initial time set up
getTime();
// setInterval for time
timeCall();
//Set colors to timeblocks
assignColors();
// load tasks initially
loadTasks();
// set Interval to load tasks and colors
setIntervalLoadTasks();
