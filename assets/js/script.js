const today = luxon.DateTime.now();
$("#currentDay").text(today.toLocaleString());

function addEvent() {
  const currentText = $(this).text();
  const currentColor = colorClass($(this));
  $(this).replaceWith(
    "<textarea class='task bg-white task m-0 d-flex justify-content-left align-items-center col-9 " +
      currentColor +
      "' maxlength='100'>" +
      currentText +
      "</textarea>"
  );
  $(".task").focus();
}

function colorClass(block) {
  if ($(this).hasClass("green")) {
    return "green";
  } else if ($(this).hasClass("red")) {
    return "red";
  } else {
    return "gray";
  }
}

function saveEvent() {
  const eventBlock = $(this).siblings(".task");
  const hour = $(this).siblings(".hour").text();
  console.log(hour);
  const task = eventBlock.val();
  console.log(task);
  const currentColor = colorClass($(this));
  eventBlock.replaceWith(
    "<div class = 'col-12 d-flex justify-content-left align-items-center col-md-9 eventblock " +
      currentColor +
      "'>" +
      task +
      "</div>"
  );

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

const timeBlocksContainer = $(".time-blocks-container");
timeBlocksContainer.on("click", ".eventblock", addEvent);

const saveButton = $(".btn");
saveButton.on("click", saveEvent);

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
timeBlocksContainer.on("blur", () => {
  $(this).removeClass("bg-white");
  assignColors();
});
assignColors();
loadTasks();
