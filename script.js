var slider = document.getElementById('slider')
var button = document.getElementById('button')
var sizePassword = document.getElementById('value')
var passwordResult = document.getElementById('password')
var passwordSection = document.querySelector('.password_section')

var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*"
var newPassword = ""

sizePassword.innerHTML = slider.value

slider.oninput = function () {
    sizePassword.innerHTML = this.value
}

function generatePassword() {
    var password = ""

    for (var i = 0, n = charset.length; i < slider.value; i++) {
        password += charset.charAt(Math.floor(Math.random() * n))
    }

    passwordSection.classList.remove("hide")
    passwordResult.innerHTML = password
    newPassword = password
}

function copyPassword() {
    alert("Copiada Com Sucesso")
    navigator.clipboard.writeText(newPassword)
}
