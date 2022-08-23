const word_el = document.getElementById('word')
const popup = document.getElementById('popup-container')
const popupred = document.getElementById('popup-container-red')
const message_el = document.getElementById('success-message')
const failmessage_el = document.getElementById('failure-message')
const wrongLetters_el = document.getElementById('wrong-letters')
const items = document.querySelectorAll('.item')
const message = document.getElementById('message')
const playAgain = document.getElementById('play-again-win')
const playAgainLose = document.getElementById('play-again-lose')
// import w from './wordlist.js'


const correctLetters = []
const wrongLetters = []
let selectedWord = getRandomWord()


function getRandomWord() {
    const words = ['html', 'java', 'css']
    return words[Math.floor(Math.random() * words.length)]
}

function displayWord() {
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class = "letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join('')}

    `
    
    const w = word_el.innerText.replace(/\n/g, '')
    if (w === selectedWord) {
        popup.style.display = 'flex'
        message_el.innerText = 'Adam kurtuldu! Ailesi aşırı mutlu!'
    }
}

function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3> Hatalı Harfler </h3>': ''}
        ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length

        if (index < errorCount) {
            item.style.display = 'block' 
        } else {
            item.style.display = 'none'
        }
    })

    if (wrongLetters.length === items.length) {
        popupred.style.display = 'flex'
        failmessage_el.innerText = 'Adam geberdi! Ailesi mavoldu!'
    }
}

function displayMessage() {
    message.classList.add("show")

    setTimeout(function() {
        message.classList.remove("show")
    }, 1500)

}

playAgain.addEventListener('click', function() {
    correctLetters.splice(0)
    wrongLetters.splice(0)
    selectedWord = getRandomWord()
    displayWord()
    updateWrongLetters()
    popup.style.display = 'none'
    
})

playAgainLose.addEventListener('click', function() {
    correctLetters.splice(0)
    wrongLetters.splice(0)
    selectedWord = getRandomWord()
    displayWord()
    updateWrongLetters()
    popupred.style.display = 'none'
})

window.addEventListener('keydown', function(e){
    
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter)
                displayWord()
            } else {
                displayMessage()
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter)
                updateWrongLetters()
            } else {
                displayMessage()
            }
        }
    }
})


displayWord()