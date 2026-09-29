const URL_API = "https://economia.awesomeapi.com.br/json/last/USD-BRL";

document.addEventListener("DOMContentLoaded", buscarCotacao);

async function buscarCotacao() {
    const elementoValorAtual = document.getElementById("valorAtual");
    const elementoVariacao = document.getElementById("variacao");
    const elementoMaximo = document.getElementById("valorMaximo");
    const elementoMinimo = document.getElementById("valorMinimo");
    const elementoAtualizacao = document.getElementById("ultimaAtualizacao");

    try {
        const resposta = await fetch(URL_API);

        if (!resposta.ok) {
            throw new Error("A API respondeu com erro: " + resposta.status);
        }

        const dados = await resposta.json();
        const cotacao = dados.USDBRL;

        const valorAtual = parseFloat(cotacao.bid);
        const valorMaximo = parseFloat(cotacao.high);
        const valorMinimo = parseFloat(cotacao.low);
        const variacaoPercentual = parseFloat(cotacao.pctChange);

        elementoValorAtual.textContent = "R$ " + valorAtual.toFixed(4);
        elementoMaximo.textContent = "R$ " + valorMaximo.toFixed(4);
        elementoMinimo.textContent = "R$ " + valorMinimo.toFixed(4);

        const subiu = variacaoPercentual >= 0;
        elementoVariacao.textContent =
            (subiu ? "▲ " : "▼ ") + Math.abs(variacaoPercentual).toFixed(2) + "%";
        elementoVariacao.classList.add(subiu ? "positiva" : "negativa");

        elementoAtualizacao.textContent =
            "Última atualização: " + cotacao.create_date;

    } catch (erro) {
        elementoValorAtual.textContent = "Erro ao carregar";
        elementoAtualizacao.textContent = "Não foi possível buscar a cotação.";
        console.error("Erro ao buscar cotação:", erro);
    }
}
