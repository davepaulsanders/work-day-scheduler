const today = luxon.DateTime.now();
$("#currentDay").text(today.toLocaleString());

function addEvent() {
  $(this).replaceWith(
    "<textarea class='task m-0 bg-success col-9'></textarea>"
  );
  $(".task").focus();
}

function saveEvent(event) {
  const eventBlock = $(this).siblings(".task");
  const hour = $(this).siblings(".hour").text();
  const task = eventBlock.val();

  eventBlock.replaceWith(
    "<div class = 'col-12 d-flex justify-content-left align-items-center col-md-9 bg-success eventblock'>" +
      task +
      "</div>"
  );
  // turn the event into a paragraph or something
  // get local storage
  // If it's in there, overwrite
  //If it's not, add it
}
const timeBlocksContainer = $(".time-blocks-container");
timeBlocksContainer.on("click", ".eventblock", addEvent);

const saveButton = $(".btn");
saveButton.on("click", saveEvent);
