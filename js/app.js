// Vairis Kovels, vk21134
const form = document.querySelector('form');

// Tiek izveidots elements p kļūdu parādīšanai
const errorParagraph = document.createElement('p');
errorParagraph.setAttribute("id", "error-message");
errorParagraph.style.color = "red";
form.appendChild(errorParagraph);

// Funkcija , kura parāda kļūdu uz ekrāna
function displayError(message) {
    errorParagraph.innerText = message;
}

// Funkcija, kura pārbauda vai tika ievadīts gan vārds, gan uzvārds
function checkName(name) {
    const names = name.split(" ");
    if (names.length < 2) {
        displayError('Please, enter full name.');
        return false;
    }
    return true;
}

// Funkcija, kura nosaka vai pareizi tika ievadīts datums
function checkDate(date) {
    const inputDate = date.split('/').join('.').split('.').join(' ').split(' ');

    const d = new Date();
    let currentDate = [];
    currentDate[0] = d.getDate(); 
    currentDate[1] = d.getMonth() + 1; 
    currentDate[2] = d.getFullYear(); 

    let isDayValid = true;
    let isMonthValid = true;
    let isYearValid = true;

    if (inputDate[2] == currentDate[2]) {
        if (inputDate[1] == currentDate[1]) {
            
            if (currentDate[1] == 1 || currentDate[1] == 3 || currentDate[1] == 5 || currentDate[1] == 7 || currentDate[1] == 8 || currentDate[1] == 10 || currentDate[1] == 12) {
                if (inputDate[0] <= currentDate || inputDate[0] > 31) {
                    isDayValid = false;
                }
            } else if (currentDate[1] == 4 || currentDate[1] == 6 || currentDate[1] == 9 || currentDate[1] == 11) {
                if (inputDate[0] <= currentDate || inputDate[0] > 30) {
                    isDayValid = false;
                }
            } else if (currentDate[1] == 2) {
                if (inputDate[0] <= currentDate || inputDate[0] > 28) {
                    isDayValid = false;
                }
            }

        } else if (inputDate[1] < currentDate[1] || inputDate[1] > 12) {
            isMonthValid = false;
        } else {
            if (inputDate[1] == 1 || inputDate[1] == 3 || inputDate[1] == 5 || inputDate[1] == 7 || inputDate[1] == 8 || inputDate[1] == 10 || inputDate[1] == 12) {
                if (inputDate[0] <= 0 || inputDate[0] > 31) {
                    isDayValid = false;
                }
            } else if (inputDate[1] == 4 || inputDate[1] == 6 || inputDate[1] == 9 || inputDate[1] == 11) {
                if (inputDate[0] <= 0 || inputDate[0] > 30) {
                    isDayValid = false;
                }
            } else if (inputDate[1] == 2) {
                if (inputDate[0] <= 0 || inputDate[0] > 28) {
                    isDayValid = false;
                }
            }
        }
    } else if (inputDate[2] > currentDate[2]) {
        if (inputDate[1] <= 0 || inputDate[1] > 12) {
            isMonthValid = false;
        } else {
            if (inputDate[1] == 1 || inputDate[1] == 3 || inputDate[1] == 5 || inputDate[1] == 7 || inputDate[1] == 8 || inputDate[1] == 10 || inputDate[1] == 12) {
                if (inputDate[0] <= 0 || inputDate[0] > 31) {
                    isDayValid = false;
                }
            } else if (inputDate[1] == 4 || inputDate[1] == 6 || inputDate[1] == 9 || inputDate[1] == 11) {
                if (inputDate[0] <= 0 || inputDate[0] > 30) {
                    isDayValid = false;
                }
            } else if (inputDate[1] == 2) {
                if (inputDate[0] <= 0 || inputDate[0] > 28) {
                    isDayValid = false;
                }
            }
        }
    } else {
        isYearValid = false;
    }

    if (isDayValid && isMonthValid && isYearValid) {
        return true;
    } else {
        displayError("Please, enter a valid date.");
        return false;
    }
}

// Funkcija, kura nosaka vai pareizi tika ievadīts laiks
function checkTime(time) {
    const inputTime = time.split(':').join('.').split('.');
    let isHourValid = true;
    let isMinuteValid = true;

    if (inputTime[0] >= 24 || inputTime[0] < 0) {
        isHourValid = false;
    } else if (inputTime[1] >= 60 || inputTime[1] < 0) {
        isMinuteValid = false;
    }

    if (isHourValid && isMinuteValid) {
        return true;
    } else {
        displayError("Please, enter a valid time.");
        return false;
    }
    
}

// Funkcija, kura nosaka vai tika ievadīts pareizs telefona numurs
function checkPhone(phone) {
    if (isNaN(phone)) {
        displayError("Phone number shold contain only digits.");
        return false;  
    }
    return true;
}

form.addEventListener('submit', function(e) {
    errorParagraph.innerText = "";

    const name = document.getElementById('fullname').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const phone = document.getElementById('phone').value;
    
    if (name == "") {
        displayError("Please, fill in 'Full Name' field.")
    } else if (date == "") {
        displayError("Please, fill in 'Date' field.")
    } else if (time == "") {
        displayError("Please, fill in 'Time' field.")
    } else if (phone == "") {
        displayError("Please, fill in 'Phone Number' field.")
    } else {
        let isNameValid = checkName(name);
        let isDateValid = checkDate(date);
        let isTimeValid = checkTime(time);
        let isPhoneValid = checkPhone(phone);
        let isFormValid = isNameValid && isDateValid && isTimeValid && isPhoneValid;
        
        if (isFormValid) {
            const xhr = new XMLHttpRequest();
            xhr.send();
        } 
    }

    e.preventDefault();
});
