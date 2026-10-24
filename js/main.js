(function () {
  var ROW = 112, idx = 0;
  var menu = document.getElementById("menu"), sweep = document.getElementById("sweep");
  var busy = false;

  APPS.forEach(function (a) {
    var li = document.createElement("li");
    li.textContent = a.name;
    li.style.setProperty("--c", a.color);
    menu.appendChild(li);
  });
  var items = menu.children;

  function render() {
    for (var i = 0; i < items.length; i++) {
      items[i].className = i === idx ? "focus" : (Math.abs(i - idx) === 1 ? "near" : "");
    }
    // keep focused row vertically centred
    menu.style.transform = "translateY(" + (-(idx * ROW + ROW / 2)) + "px)";
  }

  function launch(app) {
    try {
      if (window.tizen && tizen.application) {
        tizen.application.launch(app.id, null, function (e) { console.log("launch failed", e && e.message); });
      } else {
        console.log("(preview) would launch", app.name, app.id);
      }
    } catch (e) { console.log("launch error", e); }
  }

  function select() {
    if (busy) return;
    busy = true;
    var app = APPS[idx];
    sweep.style.setProperty("--c", app.color);
    sweep.style.top = "calc(50% - " + (ROW / 2) + "px)";
    sweep.className = "go";
    setTimeout(function () {
      launch(app);
      setTimeout(function () { sweep.className = ""; busy = false; }, 800);
    }, 450);
  }

  function move(d) { idx = (idx + d + items.length) % items.length; render(); }

  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 38: move(-1); break;           // up
      case 40: move(1); break;            // down
      case 13: select(); break;           // enter / OK
      case 10009:                         // Back: stay on launcher (don't exit)
        break;
    }
    e.preventDefault();
  });

  // Clock
  var timeEl = document.getElementById("time"), dateEl = document.getElementById("date");
  function tick() {
    var d = new Date(), p = function (n) { return (n < 10 ? "0" : "") + n; };
    timeEl.textContent = p(d.getHours()) + ":" + p(d.getMinutes());
    dateEl.textContent = d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
  }
  tick(); setInterval(tick, 10000);

  // Make sure the remote's keys reach the page
  try {
    if (window.tizen && tizen.tvinputdevice) {
      ["MediaPlay", "MediaPause", "ColorF0Red", "ColorF1Green"].forEach(function (k) { tizen.tvinputdevice.registerKey(k); });
    }
  } catch (e) {}

  render();
})();
