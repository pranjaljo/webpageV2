class TextScramble {
  constructor(el,chars) {
    this.el = el
    this.chars = chars
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

textScramble = function (el, phrases,randomizerHomePage) {
  const fx = new TextScramble(el,randomizerHomePage)
  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 1200)
    })
    counter = (counter + 1) % phrases.length
  }
  next()
}

const phrasesHomePage = [
  'and this is my webpage',
  'and this is my rezume',
  'and this is a little something about me',
]
const randomizerHomePage = '!<>-_\\/[]{}—=+*^?#________'
const elHomePage = document.querySelector('.text')
textScramble(elHomePage, phrasesHomePage,randomizerHomePage);

const phrasesContact = [
  'have a question ?',
  'wanna be friends ?',
  'want to work together ?',
]
const randomizerContact = '!<>-_\\/[]{}—=+*^汉字#____'
const elContact = document.querySelector('.text-contact');
textScramble(elContact, phrasesContact,randomizerHomePage);
