
let nomeAluno = "";

let notas = [null, null, null, null];

const form = document.getElementById("formAluno");
const inputNome = document.getElementById("nome");
const inputsNotas = [
  document.getElementById("nota1"),
  document.getElementById("nota2"),
  document.getElementById("nota3"),
  document.getElementById("nota4")
];
const spanMedia = document.getElementById("mediaResultado");
const mensagemErro = document.getElementById("mensagemErro");

function calcularMedia() {
  const valores = inputsNotas.map(input => parseFloat(input.value));
  const preenchidas = valores.filter(v => !isNaN(v));

  if (preenchidas.length === 0) {
    spanMedia.textContent = "-";
    return null;
  }

  const soma = preenchidas.reduce((acc, v) => acc + v, 0);
  const media = soma / preenchidas.length;
  spanMedia.textContent = media.toFixed(2);
  return media;
}

inputsNotas.forEach(input => {
  input.addEventListener("input", calcularMedia);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  nomeAluno = inputNome.value;

  const valores = inputsNotas.map(input => input.value);
  const todasPreenchidas = valores.every(v => v !== "" && !isNaN(parseFloat(v)));

  if (!todasPreenchidas) {
    mensagemErro.textContent = "Preencha todas as 4 notas antes de registrar o resultado.";
    return;
  }

  mensagemErro.textContent = "";

  notas = valores.map(v => parseFloat(v));

  const somaFinal = notas.reduce((acc, v) => acc + v, 0);
  const mediaFinal = somaFinal / notas.length;

  localStorage.setItem("nomeAluno", nomeAluno);
  localStorage.setItem("mediaFinal", mediaFinal);

  window.location.href = "resultado.html";
});
