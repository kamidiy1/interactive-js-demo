/* ========= 1) TRIVIA / QUIZ ========= */
const questionEl = document.getElementById('question');
const answersEl  = document.getElementById('answers');
const nextBtn    = document.getElementById('nextBtn');
const scoreBox   = document.getElementById('scoreBox');

const questions = [
  {
    q: 'Which CSS property changes the text color?',
    options: ['font-style', 'color', 'background-color', 'text-weight'],
    correct: 1
  },
  {
    q: 'What does DOM stand for?',
    options: [
      'Document Object Model',
      'Data Output Module',
      'Dynamic Oriented Map',
      'Display Object Manager'
    ],
    correct: 0
  },
  {
    q: 'Which array method adds an item to the end?',
    options: ['shift()', 'unshift()', 'push()', 'pop()'],
    correct: 2
  },
];

let current = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  answered = false;
  nextBtn.disabled = true;

  const item = questions[current];
  questionEl.textContent = item.q;

  answersEl.innerHTML = '';
  item.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = opt;
    btn.setAttribute('data-index', i);
    btn.addEventListener('click', () => checkAnswer(i));
    answersEl.appendChild(btn);
  });

  updateScore();
}

function checkAnswer(index) {
  if (answered) return;
  answered = true;

  const item = questions[current];
  const isCorrect = index === item.correct;
  if (isCorrect) score++;

  // visual feedback
  [...answersEl.children].forEach((btn, i) => {
    if (i === item.correct) {
      btn.classList.add('btn-accent');
    } else {
      btn.style.opacity = '.7';
    }
    btn.disabled = true;
  });

  updateScore();
  nextBtn.disabled = current >= questions.length - 1;
}

function updateScore() {
  scoreBox.textContent = `Score: ${score}/${current + 1 - (answered ? 0 : 1) + (answered ? 1 : 0)}`;
}

nextBtn.addEventListener('click', () => {
  current++;
  if (current < questions.length) {
    renderQuestion();
  }
});

renderQuestion();

/* ========= 2) CLICKER / COUNTER ========= */
const cheerBtn = document.getElementById('cheerBtn');
const resetBtn = document.getElementById('resetBtn');
const countEl  = document.getElementById('count');
let count = 0;

function updateCount() {
  countEl.textContent = `Count: ${count}`;
}

cheerBtn.addEventListener('click', () => { count++; updateCount(); });
cheerBtn.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); cheerBtn.click(); }
});
resetBtn.addEventListener('click', () => { count = 0; updateCount(); });

updateCount();

/* ========= 3) MEDIA CONTROLLER ========= */
const audio = document.getElementById('audio');
const playPause = document.getElementById('playPause');
const speed = document.getElementById('speed');
const mediaStatus = document.getElementById('mediaStatus');

// Disable play button if no source provided
function updateMediaUI() {
  const hasSrc = audio.querySelector('source')?.getAttribute('src');
  playPause.disabled = !hasSrc;
  mediaStatus.textContent = hasSrc ? 'Load your audio to test controls.' : 'No audio source set. Add a file to <source src=\"...\"> to enable controls.';
}
updateMediaUI();

playPause.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPause.textContent = '⏸ Pause';
    mediaStatus.textContent = `Playing at ${audio.playbackRate}×`;
  } else {
    audio.pause();
    playPause.textContent = '▶ Play';
    mediaStatus.textContent = 'Paused';
  }
});

speed.addEventListener('change', () => {
  audio.playbackRate = Number(speed.value);
  mediaStatus.textContent = `Speed set to ${audio.playbackRate}×`;
});
