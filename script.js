const STORAGE_KEY = 'gerador-senha-prefs'

const CHARSET = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  symbols: '*&$#@!',
  numbers: '0123456789',
}

const DEFAULTS = {
  length: 16,
  uppercase: true,
  symbols: true,
  numbers: true,
}

const slider = document.getElementById('slider')
const lengthOutput = document.getElementById('value')
const generateBtn = document.getElementById('generate')
const copyBtn = document.getElementById('copy')
const passwordOutput = document.getElementById('password')
const feedbackEl = document.getElementById('feedback')
const uppercaseInput = document.getElementById('uppercase')
const symbolsInput = document.getElementById('symbols')
const numbersInput = document.getElementById('numbers')

let lastPassword = ''
let feedbackTimeout = null

function loadPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    const saved = JSON.parse(raw)
    return {
      length: clampLength(saved.length ?? DEFAULTS.length),
      uppercase: saved.uppercase ?? DEFAULTS.uppercase,
      symbols: saved.symbols ?? DEFAULTS.symbols,
      numbers: saved.numbers ?? DEFAULTS.numbers,
    }
  } catch {
    return { ...DEFAULTS }
  }
}

function savePreferences() {
  const prefs = {
    length: Number(slider.value),
    uppercase: uppercaseInput.checked,
    symbols: symbolsInput.checked,
    numbers: numbersInput.checked,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
}

function clampLength(value) {
  const n = Number(value)
  if (Number.isNaN(n)) return DEFAULTS.length
  return Math.min(64, Math.max(8, Math.round(n)))
}

function applyPreferences(prefs) {
  slider.value = prefs.length
  lengthOutput.textContent = prefs.length
  slider.setAttribute('aria-valuenow', prefs.length)
  uppercaseInput.checked = prefs.uppercase
  symbolsInput.checked = prefs.symbols
  numbersInput.checked = prefs.numbers
}

function buildCharset() {
  let charset = CHARSET.lowercase
  if (uppercaseInput.checked) charset += CHARSET.uppercase
  if (symbolsInput.checked) charset += CHARSET.symbols
  if (numbersInput.checked) charset += CHARSET.numbers
  return charset
}

function randomIndex(max) {
  const buffer = new Uint32Array(1)
  crypto.getRandomValues(buffer)
  return buffer[0] % max
}

function generatePassword() {
  const charset = buildCharset()
  const length = Number(slider.value)
  let password = ''

  for (let i = 0; i < length; i++) {
    password += charset.charAt(randomIndex(charset.length))
  }

  lastPassword = password
  passwordOutput.textContent = password
  showFeedback('')
  savePreferences()
}

function showFeedback(message, isSuccess = false) {
  if (feedbackTimeout) clearTimeout(feedbackTimeout)
  feedbackEl.textContent = message
  feedbackEl.classList.toggle('result__feedback--success', isSuccess)

  if (message) {
    feedbackTimeout = setTimeout(() => {
      feedbackEl.textContent = ''
      feedbackEl.classList.remove('result__feedback--success')
    }, 1800)
  }
}

function hasTextSelection() {
  const selection = window.getSelection()
  return selection && selection.toString().length > 0
}

async function copyPassword() {
  if (!lastPassword) return false

  try {
    await navigator.clipboard.writeText(lastPassword)
    showFeedback('Copiado', true)
    return true
  } catch {
    showFeedback('Não foi possível copiar')
    return false
  }
}

function onLengthChange() {
  const value = slider.value
  lengthOutput.textContent = value
  slider.setAttribute('aria-valuenow', value)
  savePreferences()
}

function onKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    generatePassword()
    return
  }

  const isCopyShortcut =
    (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c'

  if (!isCopyShortcut || !lastPassword || hasTextSelection()) return

  event.preventDefault()
  copyPassword()
}

const prefs = loadPreferences()
applyPreferences(prefs)

slider.addEventListener('input', onLengthChange)
generateBtn.addEventListener('click', generatePassword)
copyBtn.addEventListener('click', copyPassword)

;[uppercaseInput, symbolsInput, numbersInput].forEach((input) => {
  input.addEventListener('change', () => {
    savePreferences()
    generatePassword()
  })
})

document.addEventListener('keydown', onKeydown)

generatePassword()
