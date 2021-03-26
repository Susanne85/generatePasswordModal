// Assignment Code
let generateBtn = document.querySelector("#generate");

let modal = document.getElementById("myModal");

let span = document.getElementsByClassName("close")[0];

let submitBtn = document.querySelector("submit");

let passwordList;
let pwdLength;
  
let characterSet = {
  type: ["lowercase","uppercase","numbers","specialcharacters",],
  list: ["abcdefghijklmnopqrstuvwxyz","ABCDEFGHIJKLMNOPQRSTUVWXYZ",     "0123456789", " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]
}

let numberOfCharacterSets = characterSet.type.length;

generateBtn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

function closeModal() {
  modal.style.display = "none";
}

function pwdLengthCheck() {
  let message, lengthCheck;
  message = document.getElementById("pId");
  message.innerHTML = "";
  lengthCheck = document.getElementById("pwdLength").value;

  try {
    if(lengthCheck == "") throw "A number between 8 and 128 must be entered";
    if(isNaN(lengthCheck)) throw "This is not a number";
    lengthCheck = Number(lengthCheck);
    if(lengthCheck < 8) throw "Number must be greater than 7";
    if(lengthCheck > 128) throw "Number must be less than 129";
  }
  catch(err) {
    message.innerHTML = err;
    return true;
  }
  
}
function pwdCharactersCheck() {
  var message, numberOfSets;
  message = document.getElementsByClassName("pCh");
  message.innerHTML = "";
  numberOfSets      = 0;
  
  try {
    for (let i=0; i < numberOfCharacterSets ; i++) {
      let character = document.getElementById(characterSet.type[i]);
      if (character.checked) {
         numberOfSets = numberOfSets + 1;
      }
    }
    
    if (numberOfSets === 0){
      throw "At least one character set must be selected";
    }
  }
  catch(err) {
    let pchCheck = document.getElementsByClassName("pCh");
    let i;
    for (i = 0; i < pchCheck.length; i++) {
      pchCheck[i].innerHTML = err;
    }
    return true;
  }
  
}

function writePassword() {
 
  const submitBtn= document.getElementById("submit");
  
  if (submitBtn ){
    const selLength = document.getElementById("pwdLength");

    pwdLength = selLength.value;

    passwordList = "";

    let errMsgLength = pwdLengthCheck();
    
    let errMsgCharacters = pwdCharactersCheck();

    if (!errMsgLength && !errMsgCharacters){

      for (let i=0; i < numberOfCharacterSets; i++) {
        const cob = document.getElementById(characterSet.type[i]);
        if (cob.checked) {
          passwordList = passwordList + characterSet.list[i];
        }
      }
      let password = generatePassword();
      let passwordText = document.querySelector("#password");
      passwordText.value = password;
      let close = closeModal();
    }
  }
}


function generatePassword() {
  
  password = "";
  for (let i = 1; i <= pwdLength; i++) { 
        password += passwordList.charAt(Math.floor(Math.random() * passwordList.length));
  }
  password = "Your secure password is\n'" + password + "'" + "\nThe requested password length was " + pwdLength ;
  return password;
  
}

 
// Add event listener to generate button
submit.addEventListener("click", writePassword);
