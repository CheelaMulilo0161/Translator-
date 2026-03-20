const inputText    = document.getElementById('inputText');
const outputText   = document.getElementById('outputText');
const sourceLang   = document.getElementById('sourceLang');
const sourceLang2  = document.getElementById('sourceLang2');
const targetLang   = document.getElementById('targetLang');
const translateBtn = document.getElementById('translateBtn');
const swapBtn      = document.getElementById('swapBtn');
const charCount    = document.getElementById('charCount');
const notice       = document.getElementById('notice');

// ── Character counter + debounce trigger ──
inputText.addEventListener('input', () => {
  const len = inputText.value.length;
  charCount.textContent = `${len}/500`;
  charCount.className = 'char-count' + (len >= 500 ? ' over' : len >= 400 ? ' warn' : '');
  debounce();
});

// ── Debounce: auto-translate 700ms after user stops typing ──
let timer;
function debounce() {
  clearTimeout(timer);
  timer = setTimeout(() => { if (inputText.value.trim()) translate(); }, 700);
}

// ── Translate ──
async function translate() {
  const text = inputText.value.trim();
  if (!text) { outputText.textContent = ''; return; }

  const src = sourceLang.value === 'auto' ? sourceLang2.value : sourceLang.value;
  const tgt = targetLang.value;

  setLoading(true);
  hideNotice();

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${src}|${tgt}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (data.responseStatus === 200 || data.responseStatus === '200') {
      outputText.textContent = data.responseData.translatedText;
    } else {
      throw new Error(data.responseDetails || 'Translation failed');
    }
  } catch (err) {
    showNotice(`⚠ ${err.message || 'Translation failed. Please try again.'}`);
    outputText.textContent = '—';
  } finally {
    setLoading(false);
  }
}

// ── Loading state ──
function setLoading(on) {
  translateBtn.disabled = on;
  translateBtn.classList.toggle('loading', on);
  outputText.classList.toggle('loading', on);
  if (on) outputText.textContent = '';
}

// ── Notice helpers ──
function showNotice(msg) { notice.textContent = msg; notice.classList.add('show'); }
function hideNotice()    { notice.classList.remove('show'); }

// ── Translate button click ──
translateBtn.addEventListener('click', translate);

// ── Swap languages ──
swapBtn.addEventListener('click', () => {
  const outVal = outputText.textContent.trim();
  const s = sourceLang2.value;
  const t = targetLang.value;

  [...sourceLang2.options].forEach(o => o.selected = o.value === t);
  [...targetLang.options].forEach(o => o.selected = o.value === s);
  [...sourceLang.options].forEach(o => { if (o.value === t) o.selected = true; });

  if (outVal && outVal !== '—') {
    inputText.value = outVal;
    charCount.textContent = `${inputText.value.length}/500`;
  }
  outputText.textContent = '';
  translate();
});

// ── Copy to clipboard ──
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 1500);
  });
}

document.getElementById('copyInputBtn').addEventListener('click', function () {
  copyText(inputText.value, this);
});
document.getElementById('copyOutputBtn').addEventListener('click', function () {
  copyText(outputText.textContent, this);
});

// ── Text-to-Speech ──
function speak(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang;
  window.speechSynthesis.speak(utt);
}

document.getElementById('listenInputBtn').addEventListener('click', () => {
  speak(inputText.value, sourceLang2.value);
});
document.getElementById('listenOutputBtn').addEventListener('click', () => {
  speak(outputText.textContent, targetLang.value);
});

// ── Default translation on page load ──
window.addEventListener('load', () => {
  inputText.value = 'Hello, how are you';
  charCount.textContent = `${inputText.value.length}/500`;
  translate();
});
