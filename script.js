let transacoes = [];
let contadorId = 1;
let idTransacaoEditando = null;
const formFinanceiro = document.querySelector(".form-financeiro");
const inputDescricao = document.getElementById("add-descricao");
const inputValor = document.getElementById("add-valor");
const selectTipo = document.getElementById("add-tipo");
const selectCategoria = document.getElementById("add-categoria");
const inputData = document.getElementById("add-data");
const corpoTabelaMarido = document.getElementById("listagem-body-marido");
const corpoTabelaEsposa = document.getElementById("listagem-body-esposa");
const totalDespesasElement = document.getElementById("total-despesas");
const totalReceitasElement = document.getElementById("total-receitas");
const saldoElement = document.getElementById("saldo");
const selectResponsavel = document.getElementById("add-responsavel");

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

function adicionarTransacaoNaTabela(transacao) {
    const primeiraLinha = document.createElement("tr");
    primeiraLinha.dataset.id = transacao.id;
    const celulaDescricao = document.createElement("td");
    const celulaValor = document.createElement("td");
    const celulaTipo = document.createElement("td");
    const celulaCategoria = document.createElement("td");
    const celulaData = document.createElement("td");
    const celulaResponsavel = document.createElement("td");
    const celulaAcoes = document.createElement("td");
    const botaoExcluir = document.createElement("button");
    const botaoEditar = document.createElement("button");

    celulaDescricao.textContent = transacao.descricao;
    celulaValor.textContent = formatarMoeda(transacao.valor);
    celulaTipo.textContent = transacao.tipo;
    celulaCategoria.textContent = transacao.categoria;
    celulaData.textContent = formatarData(transacao.data);
    celulaResponsavel.textContent = transacao.responsavel;
    botaoExcluir.textContent = "Excluir";
    botaoEditar.textContent = "Editar";

    primeiraLinha.appendChild(celulaDescricao);
    primeiraLinha.appendChild(celulaValor);
    primeiraLinha.appendChild(celulaTipo);
    primeiraLinha.appendChild(celulaCategoria);
    primeiraLinha.appendChild(celulaData);
    primeiraLinha.appendChild(celulaResponsavel);
    primeiraLinha.appendChild(celulaAcoes);
    celulaAcoes.appendChild(botaoExcluir);
    celulaAcoes.appendChild(botaoEditar);
    
    if (transacao.responsavel === "marido") {
        corpoTabelaMarido.appendChild(primeiraLinha);
    } else {
        corpoTabelaEsposa.appendChild(primeiraLinha);
    }

    botaoExcluir.addEventListener("click", function() {
        const indiceTransacao = transacoes.findIndex(function(item) {
            if (transacao.id === item.id) {
                return true;
            }
        });
        transacoes.splice(indiceTransacao, 1);
        primeiraLinha.remove();
        atualizarTotais();
    });

    botaoEditar.addEventListener("click", function() {
        idTransacaoEditando = transacao.id;
        inputDescricao.value = transacao.descricao;
        inputValor.value = transacao.valor;
        selectTipo.value = transacao.tipo;
        selectCategoria.value = transacao.categoria;
        inputData.value = transacao.data;
        selectResponsavel.value = transacao.responsavel;
    });

}

formFinanceiro.addEventListener("submit", function (event){
    event.preventDefault();
    const descricao = inputDescricao.value;
    const valor = Number(inputValor.value);
    const tipo = selectTipo.value;
    const categoria = selectCategoria.value;
    const data = inputData.value;
    const responsavel = selectResponsavel.value;

    if (idTransacaoEditando !== null) {
        const indiceTransacao = transacoes.findIndex(function(transacao) {
            if (transacao.id === idTransacaoEditando) {
                return true;
            }
        });

        const transacaoEmEdicao = transacoes[indiceTransacao];
        transacaoEmEdicao.descricao = descricao;
        transacaoEmEdicao.valor = valor;
        transacaoEmEdicao.tipo = tipo;
        transacaoEmEdicao.categoria = categoria;
        transacaoEmEdicao.data = data;

        const responsavelAnterior = transacaoEmEdicao.responsavel;
            if (responsavelAnterior !== responsavel) {


                
        transacaoEmEdicao.responsavel = responsavel;

        const linhaEmEdicao = corpoTabela.querySelector(`tr[data-id="${idTransacaoEditando}"]`);
        linhaEmEdicao.children[0].textContent = descricao;
        linhaEmEdicao.children[1].textContent = formatarMoeda(valor);
        linhaEmEdicao.children[2].textContent = tipo;
        linhaEmEdicao.children[3].textContent = categoria;
        linhaEmEdicao.children[4].textContent = formatarData(data);
        linhaEmEdicao.children[5].textContent = responsavel;
        idTransacaoEditando = null;
        atualizarTotais();
        formFinanceiro.reset();

    } else {
        const novaTransacao = {
            id: contadorId++,
            descricao,
            valor,
            tipo,
            categoria,
            data,
            responsavel,
        };
        
        transacoes.push(novaTransacao);
        adicionarTransacaoNaTabela(novaTransacao);        
        atualizarTotais();
        formFinanceiro.reset();
    }
});