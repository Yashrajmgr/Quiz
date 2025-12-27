const questions = [
  {question:"What is 2 + 2?", options:["3","4","5","6"], answer:"4"},
  {question:"What is the capital of France?", options:["Paris","London","Berlin","Rome"], answer:"Paris"},
  {question:"Which language runs in a web browser?", options:["Java","C","Python","JavaScript"], answer:"JavaScript"},
  {question:"HTML stands for?", options:["Hyper Text Markup Language","High Text Markup Language","Hyper Tabular Markup Language","None"], answer:"Hyper Text Markup Language"},
  {question:"Which is a JavaScript framework?", options:["React","Django","Laravel","Flask"], answer:"React"}
];

// Shuffle questions
questions.sort(() => Math.random() - 0.5);

let currentQuestion = 0;
let score = 0;
let time = 15;
let timer;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const timerEl = document.getElementById('timer');
const progressFill = document.getElementById('progress-fill');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

function startTimer() {
  clearInterval(timer);
  time = 15;
  timerEl.textContent = `Time: ${time}`;
  timer = setInterval(() => {
    time--;
    timerEl.textContent = `Time: ${time}`;
    if(time <= 0) nextQuestion();
  }, 1000);
}

function loadQuestion() {
  startTimer();
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(opt);
    optionsEl.appendChild(btn);
  });
  progressFill.style.width = ((currentQuestion+1)/questions.length)*100 + '%';
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = false;
}

function selectAnswer(answer) {
  if(answer === questions[currentQuestion].answer) score++;
  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;
  if(currentQuestion < questions.length) loadQuestion();
  else showResult();
}

function prevQuestion() {
  if(currentQuestion > 0){
    currentQuestion--;
    loadQuestion();
  }
}

function showResult() {
  clearInterval(timer);
  questionEl.style.display = 'none';
  optionsEl.style.display = 'none';
  document.querySelector('.navigation').style.display = 'none';
  progressFill.style.width = '100%';
  timerEl.style.display = 'none';
  resultEl.style.display = 'block';
  scoreEl.textContent = score;

  let highScore = localStorage.getItem('highScore') || 0;
  if(score > highScore) localStorage.setItem('highScore', score);
  highScoreEl.textContent = localStorage.getItem('highScore');
}

document.getElementById('restart').addEventListener('click', () => location.reload());
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);

loadQuestion();
