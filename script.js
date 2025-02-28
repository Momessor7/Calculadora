let runningTotal = 0; //armazena o resultado das operações
let buffer = "0"; //armazena o valor atual que o usuario esta digitando
let previousOperator; //guarda o ultimo operador digitado(+,-,*,/)

const screen = document.querySelector(".screen"); //screen armazena o elemento HTML da tela da calculadora, .screnn onde os números e resultados são exibidos

function buttonClick(value) {
  //função principal que é chamada quando um botão é clicado
  if (isNaN(value)) {
    handleSymbol(value); //se for simbolo chama esse
  } else {
    handleNumber(value); //se for numero chama esse
  }
  screen.innerText = buffer; //att o valor da tela da calculadora
}

function handleSymbol(symbol) {
  //função que lida com os simbolos
  switch (symbol) {
    case "C": //limpa a tela e reseta os valores
      buffer = "0";
      runningTotal = 0;
      break;
    case "=": //calcula o resultado com base nos numeros e operador anterior
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "←": //apaga o ultimo digito
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+": //todos esses chamam a handleMathsss
    case "−":
    case "×":
    case "÷":
      handleMath(symbol); //proessa operação  matemática
      break;
  }
}

function handleMath(symbol) {
  //função chamada acima(tratar operações matemáticas)
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseInt(buffer); //converte buffer em numero inteiro

  if (runningTotal === 0) {
    //se for primeira operação, guarda intBuffer em runningTotal
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer); //se ja tiver algum valor, chama flushOperation(intBuffer)
  }
  previousOperator = symbol; //guarda o operador atual
  buffer = "0"; //reseta buffer  para 0, para receber o proximo numero
}

function flushOperation(intBuffer) {
  //função que faz a operação
  if (previousOperator === "+") {
    //exec a op mat de acordo com o ultimo operador(previousOperator)
    runningTotal += intBuffer;
  } else if (previousOperator === "−") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  }
  //att runningTotal
}

function handleNumber(numberString) {
  //função que lida com numeros
  if (buffer === "0") {
    //se for = 0, sobrescreve
    buffer = numberString;
  } else {
    //senão concatena
    buffer += numberString;
  }
}

function init() {
  //add os eventos de click aos botões dentro de .calc-buttons
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText); //qnd um botao eh clicado, chama a função buttonClick, com o valor do botão pressionado
    });
}

init(); //eh chamado para inicializar a calculadora
