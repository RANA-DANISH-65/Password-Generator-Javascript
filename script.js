// ACCESSING ALL ELEMENTS FROM HTML
const passbox = document.getElementById("passbox");
const inputslider = document.getElementById("inputslider");
const passlength = document.getElementById("passlength");
const lower = document.getElementById("lowercase");
const upper = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const genbtn = document.getElementById("genbtn");
const copyicon = document.getElementById("copyicon");

// CREATING INDIVIDUAL STRINGS FOR ALL CATEGORIES
let lowerstr = "abcdefghijklmnopqrstuvwxyz";
let upperstr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbersstr = "0123456789";
let symbolsstr = "!@#$%^&*()_+{}|:\"<>?";

// CREATING AN EMPTY STRING TO ADD CHECKED CATEGORIES
let allchar = "";

// DISPLAYING SELECTED LENGTH
passlength.textContent = inputslider.value;
inputslider.addEventListener('input', () => {
    passlength.textContent = inputslider.value;
})

// ADDING EVENT LISTENER TO GENERATE BUTTON
genbtn.addEventListener('click', () => {
    // CHECKING WHICH CATEGORY IS CHECKED AND ADDING IT IN EMPTY STRING
    if (lower.checked) {
        allchar += lowerstr;
    }
    if (upper.checked) {
        allchar += upperstr;
    }
    if (numbers.checked) {
        allchar += numbersstr;
    }
    if (symbols.checked) {
        allchar += symbolsstr;
    }
    
    // IF NO CATEGORY IS SELECTED, SHOW AN ALERT AND STOP EXECUTION
    if (allchar === "") {
        alert("Please select at least one category to generate password");
        return;
    }

    // DISPLAYING MESSAGES FOR BETTER USER EXPERIENCE
    passbox.value = "Generating Password.....";
    setTimeout(() => {
        passbox.value = "Adding Characters.....";
    }, 1000)
    setTimeout(() => {
        passbox.value = "Checking Strength.....";
    }, 3000)

    // GENERATING PASSWORD AND DISPLAYING IT IN PASSWORD BOX
    setTimeout(() => {
        let password = "";
        // ITERATING LOOP TO SELECT PASSWORD LENGTH
        for (let i = 0; i < inputslider.value; i++) {
            // GENERATING RANDOM NUMBER TO SELECT CHARACTER FROM ALLCHAR STRING
            let random = Math.floor(Math.random() * allchar.length);
            password += allchar[random];
        }
        passbox.value = password;
    }, 5000)
})

// COPY PASSWORD TO USER CLIPBOARD
copyicon.addEventListener('click', () => {
    if (passbox.value !== "" &&
        passbox.value !== "Generating Password....." && 
        passbox.value !== "Adding Characters....." && 
        passbox.value !== "Checking Strength.....") {
        
        // WRITING PASSWORD TO CLIPBOARD
        navigator.clipboard.writeText(passbox.value);
        copyicon.innerText = "check";  // Changing icon to checkmark
        copyicon.title = "Password Copied";  // Showing tooltip

        // REVERTING ICON AND TOOLTIP AFTER 2 SECONDS
        setTimeout(() => {
            copyicon.innerHTML = "content_copy";
            copyicon.title = "";
        }, 2000)
    }
});
