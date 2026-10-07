// "Ask me" — preview version with canned answers (no AI backend yet).
const ANSWERS = [
  {
    re: /ant|agent|wiki|llm|xiaokang|insurance/,
    text: "At Ant Group I built, solo, an LLM-Wiki insurance intelligence platform: an agent that monitors 20+ sources, ingests and quality-checks content, and keeps 500+ entity pages current every day. It earned my department's Q2 AI Pioneer recognition.",
    source: 'Ant Group, 2026'
  },
  {
    re: /tool|skill|stack|sql|python|tableau/,
    text: 'SQL (Hive) and Python for analysis, XGBoost / LightGBM for modeling, Tableau and Power BI for dashboards — and Codex / Claude Code for building and evaluating agents.',
    source: 'résumé'
  },
  {
    re: /translat|background|why|major/,
    text: 'I studied Translation & Interpreting at Zhejiang University (GPA 4.0), then moved into an MS in Business Analytics at USC.',
    source: 'education'
  },
  {
    re: /role|job|looking|hire|open|work with|after/,
    text: 'Data science and AI-focused roles, starting after I graduate in May 2027.',
    source: 'USC Marshall'
  }
];

const FALLBACK = {
  text: "This preview only knows a few answers. The live version will answer from my résumé and projects. Try asking about Ant, my stack, or what I'm looking for.",
  source: 'preview'
};

const form = document.getElementById('ask-form');
const input = document.getElementById('ask-input');
const box = document.getElementById('ask-answer');
const qEl = document.getElementById('ask-q');
const aEl = document.getElementById('ask-a');
const sEl = document.getElementById('ask-src');

function answer(q) {
  const s = q.toLowerCase();
  return ANSWERS.find((a) => a.re.test(s)) || FALLBACK;
}

function ask(q) {
  const a = answer(q);
  qEl.textContent = q;
  aEl.textContent = a.text;
  sEl.textContent = 'source · ' + a.source;
  box.classList.remove('flash');
  void box.offsetWidth; // restart animation
  box.classList.add('flash');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = input.value.trim();
  if (q) { ask(q); input.value = ''; }
});

document.querySelectorAll('#ask-chips button').forEach((btn) => {
  btn.addEventListener('click', () => ask(btn.textContent));
});

// Reveal elements as their section scrolls into view
const animated = document.querySelectorAll('.rise, .pop');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  animated.forEach((el) => io.observe(el));
} else {
  animated.forEach((el) => el.classList.add('in'));
}
