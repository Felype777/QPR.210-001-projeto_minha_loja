// IMPORTANDO OS PRODUTOS
import { produtos } from './lista_produtos.js';
import { mostrarToast } from './toast.js';
console.log("produtos.js carregado");

const sectionCards = document.querySelector('#cards');
const ulMenuSecoes = document.querySelector('#menu-secoes');
const campoPesquisa = document.querySelector('#campo-pesquisa');
const contadorCarrinho = document.querySelector('#contador-carrinho');
const contadorFavoritos = document.querySelector("#contador-favoritos");

// Atualiza o contador do carrinho
function atualizarContadorCarrinho(){
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let total = 0;
    carrinho.forEach(item => {
        total += item.quantidade;
    });
    if(contadorCarrinho){
        contadorCarrinho.textContent = total;
    }
}

function atualizarContadorFavoritos(){
    const favoritos =
        JSON.parse(localStorage.getItem("favoritos")) || [];
    if(contadorFavoritos){
        contadorFavoritos.textContent = favoritos.length;
    }
}

// ADICIONAR AO CARRINHO
function adicionarAoCarrinho(produto) {
    console.log("1");
    let carrinho = [];
    console.log("2");
    try {
        carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        console.log("3", carrinho);
    } catch (erro) {
        console.error("Erro ao ler localStorage:", erro);
        carrinho = [];
    }
    console.log("4");
    carrinho.push({
        ...produto,
        quantidade: 1
    });
    console.log("5");
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    console.log("6");
    atualizarContadorCarrinho();
    mostrarToast("🛒 Produto adicionado ao carrinho!");

}

// MONTAR CARDS
function montaCards(listaProdutos) {
    sectionCards.innerHTML = '';
    listaProdutos.forEach(produto => {
        const divCard = document.createElement('div');
        divCard.className = 'card';
        const img = document.createElement('img');

img.src = produto.caminho_imagem;
img.alt = produto.descricao_produto;

img.style.cursor = "pointer";

img.addEventListener("click", () => {

    localStorage.setItem("produtoSelecionado", JSON.stringify(produto));

    window.location.href = "paginas/produto.html";

});

       // Selo
       const selo = document.createElement("span");
       selo.className = "selo";
       const desconto = Math.floor(Math.random() * 20) + 10;
       selo.textContent = `-${desconto}% OFF`;

       // Estrelas
       const estrelas = document.createElement('div');
       estrelas.className = 'estrelas';
       const nota = (Math.random() * 0.8 + 4.2).toFixed(1);
estrelas.innerHTML = `
★★★★★
<span class="nota">
(${nota})
</span>`;

      // Descrição
      const descricao = document.createElement('p');

descricao.textContent = produto.descricao_produto;

descricao.style.cursor = "pointer";

descricao.addEventListener("click", () => {

    localStorage.setItem("produtoSelecionado", JSON.stringify(produto));

    window.location.href = "paginas/produto.html";

});
 
     // Preço
     const precoAntigo = document.createElement("p");
precoAntigo.className = "preco-antigo";
const valorAntigo = produto.valor_unitario * 1.20;
precoAntigo.textContent =
`De: R$ ${valorAntigo.toFixed(2).replace(".", ",")}`;
    const preco = document.createElement('h2');
    preco.textContent =
    `R$ ${produto.valor_unitario.toFixed(2).replace('.', ',')}`;

     // Parcelamento
     const parcela = document.createElement('span');
     parcela.className = 'parcelamento';
     parcela.textContent =
     `ou 12x de R$ ${(produto.valor_unitario/12).toFixed(2).replace('.', ',')}`;

    // Botão Comprar
    const comprar = document.createElement('button');
    comprar.className = 'btn-comprar';    
    comprar.textContent = 'Comprar Agora';
    comprar.addEventListener("click", () => {
        localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
    
        window.location.href = "paginas/produto.html";
    
    });

    // Botão Favorito
const favorito = document.createElement('button');
favorito.className = 'btn-favorito';
favorito.innerHTML = '🤍 Favoritar';

favorito.addEventListener('click', () => {

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    const existe = favoritos.find(item => item.id_produto === produto.id_produto);

    if(existe){

        favoritos = favoritos.filter(item => item.id_produto !== produto.id_produto);

        favorito.innerHTML = '🤍 Favoritar';

    }else{

        favoritos.push(produto);

        favorito.innerHTML = '❤️ Favoritado';

    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    atualizarContadorFavoritos();

});

    // Botão Carrinho
    const botao = document.createElement('button');
    botao.className = 'btn-add';
    botao.textContent = 'Adicionar ao Carrinho';

        botao.addEventListener('click', () => {

            console.log("CLIQUE FUNCIONOU");
        
            console.log(produto);
    
            adicionarAoCarrinho(produto);
        
        });

divCard.appendChild(selo);
divCard.appendChild(img);
divCard.appendChild(estrelas);
divCard.appendChild(descricao);
divCard.appendChild(precoAntigo);
divCard.appendChild(preco);
divCard.appendChild(parcela);
divCard.appendChild(comprar);
divCard.appendChild(botao);
divCard.appendChild(favorito);

sectionCards.appendChild(divCard);

    });

}

// LISTAR PRODUTOS
function listarProdutos() {
    montaCards(produtos);
}

// FILTRAR
function filtroProduto(idSecao) {

    if (idSecao === 0) {

        listarProdutos();
        return;

    }

    const filtrados = produtos.filter(produto =>
        produto.id_secao === idSecao
    );

    montaCards(filtrados);

}

// MENU
function carregaSecoes() {

    ulMenuSecoes.innerHTML = '';

    const liTodos = document.createElement('li');

    const aTodos = document.createElement('a');
    aTodos.href = '#';
    aTodos.className = 'lnk-secao';
    aTodos.textContent = 'Todos';

    aTodos.addEventListener('click', (e) => {

        e.preventDefault();

        listarProdutos();

    });

    liTodos.appendChild(aTodos);

    ulMenuSecoes.appendChild(liTodos);

    const categorias = [];

    produtos.forEach(produto => {

        if (!categorias.some(cat => cat.id_secao === produto.id_secao)) {

            categorias.push({

                id_secao: produto.id_secao,
                secao: produto.secao

            });

        }

    });

    categorias.forEach(categoria => {

        const li = document.createElement('li');

        const a = document.createElement('a');

        a.href = '#';

        a.className = 'lnk-secao';

        a.textContent = categoria.secao;

        a.addEventListener('click', (e) => {

            e.preventDefault();

            filtroProduto(categoria.id_secao);

        });

        li.appendChild(a);

        ulMenuSecoes.appendChild(li);

    });

}

// PESQUISA
campoPesquisa.addEventListener('keyup', () => {

    const texto = campoPesquisa.value.toLowerCase();

    const resultado = produtos.filter(produto =>
        produto.descricao_produto.toLowerCase().includes(texto)
    );

    montaCards(resultado);

});

// INICIAR
listarProdutos();
carregaSecoes();
atualizarContadorCarrinho();
atualizarContadorFavoritos();