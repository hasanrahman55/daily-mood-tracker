document.addEventListener("DOMContentLoaded", function () {
  const moodDate = document.querySelector("#mood-date");
  const moodBtn = document.querySelectorAll(".mood-btn");
  const saveBtn = document.querySelector("#save-mood");

  let selectedMood = null;

  //select Mood Emoji
  moodBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      selectedMood = this.getAttribute("data-mood");
    });
  });

  //save Data
  saveBtn.addEventListener("click", function () {
    //validation
    if (!selectedMood || !moodDate) {
      alert("Please select a both Mood Emoji and Date");
      return;
    }

    const selectedDate = moodDate.value;

    let moods = JSON.parse(localStorage.getItem("moods")) || {};

    moods[selectedDate] = selectedMood;
    //save in local Storage
    localStorage.setItem("moods", JSON.stringify(moods));
  });
});
