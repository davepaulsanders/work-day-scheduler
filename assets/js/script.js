const today = luxon.DateTime.now();
$("#currentDay").text(today.toLocaleString());

function addEvent() {
  const currentText = $(this).text();
  console.log(currentText);
  $(this).replaceWith(
    "<textarea class='task m-0 bg-success col-9' maxlength='100'>" +
      currentText +
      "</textarea>"
  );
  $(".task").focus();
}

// If the user leaves the block without saving task, empty block

function saveEvent(event) {
  const eventBlock = $(this).siblings(".task");
  const hour = $(this).siblings(".hour").text();
  const task = eventBlock.val().trim();

  eventBlock.replaceWith(
    "<div class = 'col-12 d-flex justify-content-left align-items-center col-md-9 bg-success eventblock'>" +
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
}

const timeBlocksContainer = $(".time-blocks-container");
timeBlocksContainer.on("click", ".eventblock", addEvent);
//timeBlocksContainer.on("blur", ".task", test);
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
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
  ];
  const today2 = luxon.DateTime.fromISO(today);
  const amOrPm = today2.hour > 11 ? "P" : "A";
  let finalTime = `${today2.toFormat("h")}${amOrPm}M`;
  let justHourTime = finalTime.split(":")[0];
  for (hour of hoursArr) {
    // if the index is lower than the index of finalTime, it should be gray
    // if the index is equal, it should be red
    //if it's higher, it should be green
  }
}
loadTasks();
assignColors();
