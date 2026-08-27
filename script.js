let transacoes = [];
const formFinanceiro = document.querySelector(".form-financeiro");
const inputDescricao = document.getElementById("add-descricao");
const inputValor = document.getElementById("add-valor");
const selectTipo = document.getElementById("add-tipo");
const selectCategoria = document.getElementById("add-categoria");
const inputData = document.getElementById("add-data");

formFinanceiro.addEventListener("submit", function (event){
    event.preventDefault();
    const descricao = inputDescricao.value;
    const valor = Number(inputValor.value);
    const tipo = selectTipo.value;
    const categoria = selectCategoria.value;
    const data = inputData.value;

    const novaTransacao = {
        descricao,
        valor,
        tipo,
        categoria,
        data,
    }

    transacoes.push(novaTransacao);
});