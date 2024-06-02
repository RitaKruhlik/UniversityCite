const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysConcalendar = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  calendarevDay = document.querySelector(".calendarev-day"),
  calendarevDate = document.querySelector(".calendarev-date"),
  calendarevsConcalendar = document.querySelector(".calendarevs"),
  calendarevFilter = document.getElementById("calendarev-filter");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Sample calendarevs array
const calendarevsArr = [
  { day: 31, month: 5, year: 2024, calendarevs: [
    { title: "Виставка Голосіївської палітри", time: "11:00 AM", type: "gathering" },
    { title: "Вебінар: Про GitHub", time: "2:00 PM", type: "vebinar" }
  ]},
  { day: 20, month: 5, year: 2024, calendarevs: [
    { title: "Calendarev 3", time: "11:00 AM", type: "other" }
  ]},
  { day: 12, month: 5, year: 2024, calendarevs: [
    { title: "Calendarev 4", time: "9:00 AM", type: "gathering" },
    { title: "Calendarev 5", time: "4:00 PM", type: "vebinar" }
  ]}
];

// Add event listener to the filter select element
calendarevFilter.addEventListener("change", () => {
  initCalendar();
});

function updateCalendar() {
  initCalendar();
}

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let calendarev = false;
    let filteredEvents = [];

    // Filter events based on the selected filter
    if (calendarevFilter.value === "all") {
      filteredEvents = calendarevsArr.filter(
        (calendarevObj) =>
          calendarevObj.day === i &&
          calendarevObj.month === month + 1 &&
          calendarevObj.year === year
      );
    } else {
      filteredEvents = calendarevsArr.filter(
        (calendarevObj) =>
          calendarevObj.day === i &&
          calendarevObj.month === month + 1 &&
          calendarevObj.year === year &&
          calendarevObj.calendarevs.some(
            (event) => event.type === calendarevFilter.value
          )
      );
    }

    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateCalendarevs(i);
      if (filteredEvents.length > 0) {
        days += `<div class="day today active calendarev">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (filteredEvents.length > 0) {
        let classNames = "day calendarev";
        filteredEvents.forEach((calendarevObj) => {
          let lastEventType = null;
          calendarevObj.calendarevs.forEach((event) => {
            if (event.type === 'gathering') {
              lastEventType = 'gathering';
            } else if (event.type === 'vebinar') {
              lastEventType = 'vebinar';
            } else if (event.type === 'other') {
              lastEventType = 'other';
            }
          });
          if (lastEventType === 'gathering') {
            classNames += " type-gathering";
          } else if (lastEventType === 'vebinar') {
            classNames += " type-vebinar";
          } else if (lastEventType === 'other') {
            classNames += " type-other";
          } else {
            classNames += "";
          }
        });     
        days += `<div class="${classNames}">${i}</div>`;
      } else {
        days += `<div class="day">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysConcalendar.innerHTML = days;
  addListner();
}


function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateCalendarevs(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      days.forEach((day) => {
        day.classList.remove("active");
      });
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  calendarevDay.innerHTML = dayName;
  calendarevDate.innerHTML = date + " " + months[month] + " " + year;
}

function updateCalendarevs(date) {
  let calendarevs = "";
  const filter = calendarevFilter.value;

  calendarevsArr.forEach((calendarev) => {
    if (
      date === calendarev.day &&
      month + 1 === calendarev.month &&
      year === calendarev.year
    ) {
      calendarev.calendarevs.forEach((calendarev) => {
        if (filter === "all" || calendarev.type === filter) {
          calendarevs += `<div class="calendarev ${calendarev.type}">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="calendarev-title">${calendarev.title}</h3>
            </div>
            <div class="calendarev-time">
              <span class="calendarev-time">${calendarev.time}</span>
            </div>
        </div>`;
        }
      });
    }
  });

  if (calendarevs === "") {
    calendarevs = `<div class="no-calendarev">
            <h3>Подій немає</h3>
        </div>`;
  }

  calendarevsConcalendar.innerHTML = calendarevs;
}

getCalendarevs();
