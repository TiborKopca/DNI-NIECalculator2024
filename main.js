// ****************************************************************
// Crear un Array de la lista de letras de la policia
// ****************************************************************
const LETRAS_DNI = [
  "T",
  "R",
  "W",
  "A",
  "G",
  "M",
  "Y",
  "F",
  "P",
  "D",
  "X",
  "B",
  "N",
  "J",
  "Z",
  "S",
  "Q",
  "V",
  "H",
  "L",
  "C",
  "K",
  "E",
  "T",
];
//NIE CALCULATION
/*Los NIE's de extranjeros residentes en España tienen una letra (X, Y, Z), 7 números y dígito de control.
Para el cálculo del dígito de control se sustituye:
X → 0
Y → 1
Z → 2
y se aplica el mismo algoritmo que para el NIF. */
//https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/calculo-del-digito-de-control-del-nif-nie/

//TEST DATA
//02350764-A

//VARIABLES

//CONSTANTS HTML
const userInput = document.getElementById("userInput");
const resultBox = document.getElementById("resultBox");
const hintsUL = document.getElementById("hints");
resultBox.innerHTML = "N/A";
const MAXCHARS = 8;

//FUNCIONES
function hintElementModification(action, element, textContent) {}

//VERIFIES FORMAT OF A INPUT
function verifyInputLength(dni) {
  // console.log(`${dni}, type: ${typeof dni}, length: ${dni.length}`);

  //CREATING LIST ELEMENT WITH PARAMETER ID
  let hintLength = document.createElement("li");
  hintLength.setAttribute("id", "length-warning");

  if (dni.length > MAXCHARS) {
    userInput.style.backgroundColor = "red";
    //DYNAMICALLY ADD HINT
    // console.log(
    //   `VerifyInputLenght has child nodes:${!hintsUL.hasChildNodes()}`
    // );
    if (document.getElementById("length-warning") === null) {
      hintLength.textContent = "El DNI debe tener 8 caracteres";
      hintsUL.appendChild(hintLength);
      return false;
    }
  } else if (dni.length === MAXCHARS) {
    userInput.style.backgroundColor = "#817c73";
    //DYNAMICALLY REMOVE HINT
    if (document.getElementById("length-warning") !== null) {
      hintsUL.removeChild(document.getElementById("length-warning"));
    }
    return true;
  } else {
    userInput.style.backgroundColor = "#817c73";
    // hintsUL.innerHTML = "";
    if (document.getElementById("length-warning") !== null) {
      hintsUL.removeChild(document.getElementById("length-warning"));
    }
    return false;
  }
}

//VERIFIES FORMAT OF A NIE NUMBER
function verifyNieFormat(dni) {
  let hintNieFormat = document.createElement("li");
  hintNieFormat.setAttribute("id", "nie-warning");

  let firstCharacter = dni.charAt(0).toUpperCase();
  if (
    firstCharacter !== "X" &&
    firstCharacter !== "Y" &&
    firstCharacter !== "Z"
  ) {
    if (document.getElementById("nie-warning") === null) {
      //IF HINT DOESN'T EXIST, ADD IT
      hintNieFormat.textContent =
        "El NIE solo puede tener una letra de X, Y o Z";
      hintsUL.appendChild(hintNieFormat);
    }
    //CHECK FOR OTHER CHARACTERS
    verifyAllCharsApartFromFirst(dni);
    //ALWAYS RETURN FALSE
    return false;
  } else {
    //DYNAMICALLY REMOVE HINT
    if (document.getElementById("nie-warning") !== null) {
      //IF HINT EXISTS, REMOVE IT
      hintsUL.removeChild(document.getElementById("nie-warning"));
    }
    if (verifyAllCharsApartFromFirst(dni)) {
      //ALL THE OTHER CHARACTERS ARE VALID
      return true;
    }
  }
}

//VERIFIES INPUT FROM THE 2nd CHARACTER ON
function verifyAllCharsApartFromFirst(dni) {
  let hintFormat = document.createElement("li");
  hintFormat.setAttribute("id", "general-warning");

  let dniRestOfTheString = dni.substring(1);
  if (isNaN(dniRestOfTheString)) {
    //DNI IS NOT A NUMBER
    //DYNAMICALLY ADD HINT
    if (document.getElementById("general-warning") === null) {
      //IF HINT DOESN'T EXIST, ADD IT
      hintFormat.textContent = "El DNI debe ser un número";
      hintsUL.appendChild(hintFormat);
    }
    return false;
  } else {
    //DYNAMICALLY REMOVE HINT
    if (document.getElementById("general-warning") !== null) {
      //IF HINT EXISTS, REMOVE IT
      hintsUL.removeChild(document.getElementById("general-warning"));
    }
    return true;
  }
}

//VERIFIES GLOBAL FORMAT - NIE OR DNI
function verifyInputFormat(dni) {
  let firstCharacter = dni.charAt(0);

  if (!isNaN(firstCharacter)) {
    //INPUT IS NOT A DNI -- check all characters after the first one
    return verifyAllCharsApartFromFirst(dni);
  } else {
    //INPUT IS NIE --check Nie format
    return verifyNieFormat(dni);
  }
}

//CALCULATES RESULT OF A DNI
function doStuff() {
  let data = userInput.value;
  let lengthCorrect = verifyInputLength(data);
  let formatCorrect = verifyInputFormat(data);

  if (lengthCorrect && formatCorrect) {
    //CALCULATION IN CASE OF NIE
    if (isNaN(data.charAt(0))) {
      data = verifyNieCharacter(data);
    }
    let dniCorrected = Number(data);
    let resto = dniCorrected % 23;
    resultBox.innerHTML = LETRAS_DNI[resto];
  } else {
    // console.error("El DNI no es correcto");
    resultBox.innerHTML = "N/A";
  }
}

//FUNCION PARA COMPOBAR SI LA LETRA DE EXTRANJEROS ES VALIDA
function verifyNieCharacter(dni) {
  //Los NIE's de extranjeros residentes en España tienen una letra (X, Y, Z), 7 números y dígito de control.
  //X=0, Y=1, Z=2
  let firstCHaracter = dni.charAt(0).toUpperCase();
  if (firstCHaracter == "X") {
    return (dni = 0 + dni.substring(1));
  } else if (firstCHaracter == "Y") {
    return (dni = 1 + dni.substring(1));
  } else if (firstCHaracter == "Z") {
    return (dni = 2 + dni.substring(1));
  } else {
    return dni;
  }
}

//EVENT LISTENERS
userInput.addEventListener("keyup", function (event) {
  doStuff();
});

document.addEventListener("keyup", function (event) {
  if (event.key === 13 || event.key === "Enter") {
    console.log("Enter key pressed");
    doStuff();
  }
});
