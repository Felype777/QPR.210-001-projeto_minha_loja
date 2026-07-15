// IMPORTANDO OS PRODUTOS
import { produtos } from "./lista_produtos.js";
import { mostrarToast } from "./toast.js";

// ELEMENTOS DA PÁGINA

const fotoProduto = document.querySelector("#foto-produto");
const nomeProduto = document.querySelector("#nome-produto");
const precoProduto = document.querySelector("#preco-produto");
const parcelamento = document.querySelector("#parcelamento");
const descricaoProduto = document.querySelector("#descricao-produto");

const btnCarrinho = document.querySelector("#btn-carrinho");
const btnComprar = document.querySelector("#btn-comprar");

// AVALIAÇÕES

const mediaEstrelas = document.querySelector("#media-estrelas");
const notaMedia = document.querySelector("#nota-media");
const listaAvaliacoes = document.querySelector("#lista-avaliacoes");
const novaAvaliacao = document.querySelector("#nova-avaliacao");
const btnAvaliar = document.querySelector("#btn-avaliar");

const estrelas = document.querySelectorAll(".estrela");

let notaSelecionada = 0;

const modalImagem = document.querySelector("#modal-imagem");
const imagemAmpliada = document.querySelector("#imagem-ampliada");
const fecharModal = document.querySelector("#fechar-modal");

// PRODUTO SELECIONADO

const produtoSalvo = JSON.parse(localStorage.getItem("produtoSelecionado"));

const produto = produtoSalvo || produtos[0];

// EXIBIR PRODUTO

fotoProduto.src = "../" + produto.caminho_imagem;

fotoProduto.alt = produto.descricao_produto;

nomeProduto.textContent = produto.descricao_produto;

precoProduto.textContent =
`R$ ${produto.valor_unitario.toFixed(2).replace(".", ",")}`;

parcelamento.textContent =
`ou 12x de R$ ${(produto.valor_unitario / 12).toFixed(2).replace(".", ",")}`;

descricaoProduto.textContent =
`Produto original, garantia de fábrica e envio rápido para todo o Brasil.`;

// ADICIONAR AO CARRINHO

btnCarrinho.addEventListener("click", () => {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push({

        ...produto,

        quantidade: 1

    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    mostrarToast("🛒 Produto adicionado ao carrinho!");

});

// COMPRAR AGORA

btnComprar.addEventListener("click", () => {

    btnCarrinho.click();

    window.location.href = "carrinho.html";

});

// PRODUTOS RELACIONADOS

const cardsRelacionados = document.querySelector("#cards-relacionados");

const relacionados = produtos.filter(item =>
    item.id_produto !== produto.id_produto
);

relacionados.slice(0, 4).forEach(item => {

    const card = document.createElement("div");
    card.className = "card-relacionado";

    const img = document.createElement("img");
    img.src = "../" + item.caminho_imagem;
    img.alt = item.descricao_produto;

    const nome = document.createElement("p");
    nome.textContent = item.descricao_produto;

    const preco = document.createElement("h3");
    preco.textContent =
        `R$ ${item.valor_unitario.toFixed(2).replace(".", ",")}`;

    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(preco);
    card.addEventListener("click", () => {
        localStorage.setItem(
            "produtoSelecionado",
            JSON.stringify(item)
        );
        location.reload();
    });
    
    cardsRelacionados.appendChild(card);
});

// ZOOM DA IMAGEM

fotoProduto.addEventListener("click", () => {
    imagemAmpliada.src = fotoProduto.src;
    modalImagem.style.display = "flex";
});

fecharModal.addEventListener("click", () => {
    modalImagem.style.display = "none";

});

modalImagem.addEventListener("click", (e) => {
    if(e.target === modalImagem){
        modalImagem.style.display = "none";
    }
});

// ESCOLHER ESTRELAS
estrelas.forEach(estrela => {
    estrela.addEventListener("click", () => {
        notaSelecionada = Number(
            estrela.dataset.nota
        );
        estrelas.forEach(item => {
            if(Number(item.dataset.nota) <= notaSelecionada){
                item.classList.add("ativa");
            }else{
                item.classList.remove("ativa");
            }
        });
    });
});

// CARREGAR AVALIAÇÕES SALVAS
function carregarAvaliacoes(){
    listaAvaliacoes.innerHTML = "";
    const avaliacoes = JSON.parse(
        localStorage.getItem("avaliacoes")
    ) || {};
    const lista = avaliacoes[produto.id_produto] || [];
    lista.forEach(item => {
        const div = document.createElement("div");
        div.className = "avaliacao";
        const titulo = document.createElement("h3");
        titulo.innerHTML =
        `<span class="estrelas-avaliacao">
        ${"★".repeat(item.nota)}
        ${"☆".repeat(5-item.nota)}
        </span>`;
        const p = document.createElement("p");
        p.textContent = item.texto;
        div.appendChild(titulo);
        div.appendChild(p);
        listaAvaliacoes.appendChild(div);
    });

}

// SALVAR AVALIAÇÃO

btnAvaliar.addEventListener("click", () => {
    if(notaSelecionada === 0){
        mostrarToast("⭐ Escolha uma quantidade de estrelas.");
        return;
    }
    if(novaAvaliacao.value.trim() === ""){
        mostrarToast("Digite uma avaliação.");
        return;
    }
    let avaliacoes = JSON.parse(
        localStorage.getItem("avaliacoes")
    ) || {};
    if(!avaliacoes[produto.id_produto]){
        avaliacoes[produto.id_produto] = [];
    }
    avaliacoes[produto.id_produto].push({
        nota: notaSelecionada,
        texto: novaAvaliacao.value
    });





    localStorage.setItem(

        "avaliacoes",

        JSON.stringify(avaliacoes)

    );





    novaAvaliacao.value = "";



    notaSelecionada = 0;




    estrelas.forEach(item => {


        item.classList.remove("ativa");
        
    });
    carregarAvaliacoes();

});
carregarAvaliacoes();

// CALCULAR MÉDIA DAS AVALIAÇÕES

function calcularMediaAvaliacoes(){


    const avaliacoes = JSON.parse(
        localStorage.getItem("avaliacoes")
    ) || {};



    const lista = avaliacoes[produto.id_produto] || [];



    if(lista.length === 0){

        mediaEstrelas.textContent = "★★★★★";

        notaMedia.textContent = "(0.0)";

        return;

    }



    let soma = 0;



    lista.forEach(item => {

        soma += item.nota;

    });



    const media = soma / lista.length;



    const estrelasCheias = Math.round(media);



    mediaEstrelas.textContent =
        "★".repeat(estrelasCheias) +
        "☆".repeat(5 - estrelasCheias);



    notaMedia.textContent =
        `(${media.toFixed(1)}) ${lista.length} avaliações`;



}



calcularMediaAvaliacoes();