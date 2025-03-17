const date = document.getElementById("date");
const emoji = document.getElementById("emoji");
const addButton = document.getElementById("add");
const ul = document.getElementById("ul");

let dayList = [];

addButton.addEventListener("click", function () {
  if (!date.value || !emoji.value) {
    alert("both date and emoji are required");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `${date.value} and ${emoji.value}`;
  ul.append(li);
});
