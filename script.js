// Variável que guarda o nome do aluno
let nomeAluno = "";

// Vetor de 4 posições para as notas
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

// Calcula e exibe a média sempre que uma nota é editada
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

// Ao submeter o formulário
form.addEventListener("submit", function (event) {
  event.preventDefault(); // impede o envio padrão até validarmos

  // Salva o nome digitado
  nomeAluno = inputNome.value;

  // Verifica se todas as notas foram preenchidas
  const valores = inputsNotas.map(input => input.value);
  const todasPreenchidas = valores.every(v => v !== "" && !isNaN(parseFloat(v)));

  if (!todasPreenchidas) {
    mensagemErro.textContent = "Preencha todas as 4 notas antes de registrar o resultado.";
    return;
  }

  mensagemErro.textContent = "";

  // Salva as notas no vetor JS
  notas = valores.map(v => parseFloat(v));

  // Calcula a média final
  const somaFinal = notas.reduce((acc, v) => acc + v, 0);
  const mediaFinal = somaFinal / notas.length;

  // Guarda os dados para a próxima página (nome e média)
  localStorage.setItem("nomeAluno", nomeAluno);
  localStorage.setItem("mediaFinal", mediaFinal);

  // Encaminha para a página de resultado
  window.location.href = "resultado.html";
});
