let transacoes = [];
let contadorId = 1;
let idTransacaoEditando = null;
const formFinanceiro = document.querySelector(".form-financeiro");
const inputDescricao = document.getElementById("add-descricao");
const inputValor = document.getElementById("add-valor");
const selectTipo = document.getElementById("add-tipo");
const selectCategoria = document.getElementById("add-categoria");
const inputData = document.getElementById("add-data");
const corpoTabela = document.getElementById("listagem-body");
const totalDespesasElement = document.getElementById("total-despesas");
const totalReceitasElement = document.getElementById("total-receitas");
const saldoElement = document.getElementById("saldo");

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function formatarData(data) {
    const partesData = data.split("-");
    return `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
}

function atualizarTotais() {
    const despesas = transacoes.filter(function(transacao) {
        if (transacao.tipo === "despesa") {
            return true
        }
    });

    const totalDespesas = despesas.reduce(function(acumulador, valorAtual) {
        return acumulador + valorAtual.valor;
    }, 0);

    const receitas = transacoes.filter(function(transacao) {
        if (transacao.tipo === "receita") {
            return true
        }
    });

    const totalReceitas = receitas.reduce(function(acumulador, valorAtual) {
        return acumulador + valorAtual.valor;
    }, 0);

    const saldo = (totalReceitas - totalDespesas);

    totalDespesasElement.textContent = formatarMoeda(totalDespesas);
    totalReceitasElement.textContent = formatarMoeda(totalReceitas);
    saldoElement.textContent = formatarMoeda(saldo);
}

formFinanceiro.addEventListener("submit", function (event){
    event.preventDefault();
    const descricao = inputDescricao.value;
    const valor = Number(inputValor.value);
    const tipo = selectTipo.value;
    const categoria = selectCategoria.value;
    const data = inputData.value;

    if (idTransacaoEditando !== null) {
        const indiceTransacao = transacoes.findIndex(function(transacao) {
            if (transacao.id === idTransacaoEditando) {
                return true;
            }
        });

        const transacaoEmEdicao = transacoes[indiceTransacao];



    } else {
        const novaTransacao = {
            id: contadorId++,
            descricao,
            valor,
            tipo,
            categoria,
            data,
        };
        
        transacoes.push(novaTransacao);
        console.log(transacoes);

        const primeiraLinha = document.createElement("tr");
        const celulaDescricao = document.createElement("td");
        const celulaValor = document.createElement("td");
        const celulaTipo = document.createElement("td");
        const celulaCategoria = document.createElement("td");
        const celulaData = document.createElement("td");
        const celulaAcoes = document.createElement("td");

        const botaoExcluir = document.createElement("button");
        const botaoEditar = document.createElement("button");

        celulaDescricao.textContent = novaTransacao.descricao;
        celulaValor.textContent = formatarMoeda(novaTransacao.valor);
        celulaTipo.textContent = novaTransacao.tipo;
        celulaCategoria.textContent = novaTransacao.categoria;
        celulaData.textContent = formatarData(novaTransacao.data);
        botaoExcluir.textContent = "Excluir";
        botaoEditar.textContent = "Editar";
        
        primeiraLinha.appendChild(celulaDescricao);
        primeiraLinha.appendChild(celulaValor);
        primeiraLinha.appendChild(celulaTipo);
        primeiraLinha.appendChild(celulaCategoria);
        primeiraLinha.appendChild(celulaData);
        primeiraLinha.appendChild(celulaAcoes);
        celulaAcoes.appendChild(botaoExcluir);
        celulaAcoes.appendChild(botaoEditar);
        corpoTabela.appendChild(primeiraLinha);
        atualizarTotais();
        formFinanceiro.reset();

        botaoExcluir.addEventListener("click", function() {
            const indiceTransacao = transacoes.findIndex(function(transacao) {
                if (transacao.id === novaTransacao.id) {
                    return true;
                }
            });
            transacoes.splice(indiceTransacao, 1);
            primeiraLinha.remove();
            atualizarTotais();
        });

        botaoEditar.addEventListener("click", function() {
            idTransacaoEditando = novaTransacao.id;
            inputDescricao.value = novaTransacao.descricao;
            inputValor.value = novaTransacao.valor;
            selectTipo.value = novaTransacao.tipo;
            selectCategoria.value = novaTransacao.categoria;
            inputData.value = novaTransacao.data;
        });
    }
});