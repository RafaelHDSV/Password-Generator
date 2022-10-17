let slider = document.getElementById('slider')
let button = document.getElementById('button')
let sizePassword = document.getElementById('value')
let passwordResult = document.getElementById('password')
let passwordSection = document.querySelector('.password_section')
let predefinedSection = document.querySelector('.predefined_text')
let predefinedText = document.getElementById('predefinedText')
let uppercase = document.getElementById('switch-shadow_1 uppercase')
let symbols = document.getElementById('switch-shadow_2 symbols')
let numbers = document.getElementById('switch-shadow_3 numbers')
let text = document.getElementById('switch-shadow_4 text')
let lowercaseCharset = "abcdefghijklmnopqrstuvwxyz"
let uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let symbolsCharset = "*&$#@!"
let numbersCharset = "0123456789"
let textCharset = ''
let charset = ''
let newPassword = ''

sizePassword.innerHTML = slider.value

slider.oninput = function () {
    sizePassword.innerHTML = this.value
}

function generateCharset() {
    charset = lowercaseCharset

    if (uppercase.checked) {
        charset += uppercaseCharset
    }

    if (symbols.checked) {
        charset += symbolsCharset
    }

    if (numbers.checked) {
        charset += numbersCharset
    }

    if (text.checked) {
        predefinedSection.classList.remove("hide")

        if (predefinedText.value == '') {
            passwordSection.classList.add("hide")
            console.log(a);
        } else {
            textCharset = predefinedText.value
        }


    } else {
        predefinedSection.classList.add("hide")
        textCharset = ''
        predefinedText.value = ''
    }
}

function generatePassword() {
    generateCharset()


    let password = ""

    for (let i = 0, n = charset.length; i < slider.value; i++) {
        password += charset.charAt(Math.floor(Math.random() * n))
    }

    passwordSection.classList.remove("hide")

    if (textCharset == '') {
        passwordResult.innerHTML = password
    } else {
        passwordResult.innerHTML = textCharset + password
    }

    newPassword = passwordResult.textContent
}

function copyPassword() {
    passwordResult.innerHTML = 'Copiado com Sucesso'
    navigator.clipboard.writeText(newPassword)
}
