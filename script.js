// Mock function of getting current position.
// Return in a colon-seperated format, e.g. '15;34;90' ({x};{y};{deg}).
function getPos(i) {
  const d = new Date();
  const T = 15 * 1000;
  const t = (d.getTime() % T) / T;
  const r = 20;
  const x = 30 + (i % 2 - 0.5) * 2 * (Math.sin(2 * Math.PI * t) * r + i * 20);
  const y = 30 - (i % 2 - 0.5) * 2 * (Math.cos(2 * Math.PI * t) * r);
  return `${x};${y};${180 * i - 90 + t * 360}`
}

let objects = [];
let colors = ['orange', 'blue'];

// getting arrow element
for (let i = 0; i < 2; i += 1) {
  a = document.getElementById(`arrow${i}`);
  t = document.getElementById(`text${i}`);
  a.setAttribute('fill', colors[i]);
  t.setAttribute('fill', colors[i]);
  t.innerHTML = `Device ${i}`
  objects.push({
    'arrow': a,
    'text': t,
  });
}

function updateArrowPos() {
  for (let i = 0; i < 2; i += 1) {
    // getting pos data
    const pos = getPos(i);

    // parsing translate amount of x, y and deg rotated;
    // since we started from (0, 0), x and y translate is same as absolute ones.
    let l = pos.split(';');
    const x = Number(l[0]);
    const y = Number(l[1]);
    const d = Number(l[2]);

    // modifing arrtibute for the 'arrow':
    // first translate the object, then rotate (0 ~ 360 degree)
    objects[i]['arrow'].setAttribute('transform', `translate(${x} ${y}) rotate(${d})`);
    objects[i]['text'].setAttribute('transform', `translate(${x} ${y})`);
  }
}

// Here we 'setInterval' use for repetitive queries;
// There might be other ways: instead of keeping querying seperately,
// the broswer (user) can open a socket and keep listening to receive data.

// variable to store our intervalID
let nIntervId;

// getting interval time input element
const intervalTime = document.getElementById('interval');

function startMonitoring() {
  // check if an interval has already been set up
  if (!nIntervId) {
    // interval is set to 30 ms (which is about 30 fps).
    nIntervId = setInterval(updateArrowPos, Number(intervalTime.value));
  }
}

function stopMonitoring() {
  clearInterval(nIntervId);
  // release our intervalID from the variable
  nIntervId = null;
}

document.getElementById("start").addEventListener("click", startMonitoring);
document.getElementById("stop").addEventListener("click", stopMonitoring);
