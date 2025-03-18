document.addEventListener("DOMContentLoaded", function () {
  const moodDate = document.querySelector("#mood-date");
  const moodBtn = document.querySelectorAll(".mood-btn");
  const saveBtn = document.querySelector("#save-mood");

  //history
  const filter = document.querySelector("#filter");
  const moodHistory = document.querySelector("#mood-history");

  //calendar
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const currentMonthDisplay = document.getElementById("current-month");
  const calendar = document.getElementById("calendar");

  let selectedMood = null;
  let currentDate = new Date();

  //select Mood Emoji
  moodBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      selectedMood = this.getAttribute("data-mood");
    });
  });

  //save Data
  saveBtn.addEventListener("click", function () {
    //validation
    if (!selectedMood || !moodDate.value) {
      alert("Please select both Mood Emoji and Date");
      return;
    }

    const selectedDate = moodDate.value;

    let moods = JSON.parse(localStorage.getItem("moods")) || {};

    moods[selectedDate] = selectedMood;
    //save in local Storage
    localStorage.setItem("moods", JSON.stringify(moods));
  });

  //filter and Display History
  function displayHistory() {
    const moods = JSON.parse(localStorage.getItem("moods")) || {};
    moodHistory.innerHTML = "";
    const filterValue = filter.value;
    console.log(filterValue);

    const today = new Date();

    const dateList = Object.keys(moods);

    dateList.forEach((date) => {
      const moodDate = new Date(date);
      let isDisplay = false;

      if (filterValue == "day") {
        const formatedDate = today.toISOString().split("T")[0];
        isDisplay = date === formatedDate;
        console.log(isDisplay);
      } else if (filterValue === "week") {
        console.log("click");

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        isDisplay = moodDate >= oneWeekAgo && moodDate <= today;
      } else if (filterValue === "month") {
        isDisplay =
          moodDate.getMonth() === today.getMonth() &&
          moodDate.getFullYear() === today.getFullYear();
      }

      console.log(isDisplay);
      if (isDisplay) {
        const li = document.createElement("li");
        li.textContent = `${date}: ${moods[date]}`;
        li.classList.add("bg-gray-200", "p-2", "rounded");
        moodHistory.appendChild(li);
      }
    });
  }

  function displayCalendar() {
    const moods = JSON.parse(localStorage.getItem("moods")) || {};
    calendar.innerHTML = "";
    //display current Month
    currentMonthDisplay.textContent = currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    let daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    for (let i = 1; i < daysInMonth; i++) {
      let day = i.toString();
      let date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${day.padStart(2, "0")}`;

      let mood = moods[date] || "⬜";
      let div = document.createElement("div");
      div.innerHTML = `<span class='text-xs'>${day}</span><br>${mood}`;
      div.classList.add(
        "w-10",
        "h-10",
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "border",
        "rounded"
      );
      calendar.appendChild(div);
    }
  }

  prevMonthBtn.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    displayCalendar();
  });

  nextMonthBtn.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    displayCalendar();
  });

  filter.addEventListener("change", displayHistory);
  displayHistory();
  displayCalendar();
});
