const today = luxon.DateTime.now();
$("#currentDay").text(today.toLocaleString());

function test(event) {
  // find focused element
}
function addEvent() {
  $(this).replaceWith(
    "<textarea onblur = 'test()'class='task m-0 bg-success col-9'></textarea>"
  );
  $(".task").focus();
}

// If the user leaves the block without saving task, empty block

function saveEvent(event) {
  const eventBlock = $(this).siblings(".task");
  const hour = $(this).siblings(".hour").text();
  const task = eventBlock.val();

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
// turn the event into a paragraph or something
// get local storage
// If it's in there, overwrite
//If it's not, add it

const timeBlocksContainer = $(".time-blocks-container");
timeBlocksContainer.on("click", ".eventblock", addEvent);
//timeBlocksContainer.on("blur", ".task", test);
const saveButton = $(".btn");
saveButton.on("click", saveEvent);
