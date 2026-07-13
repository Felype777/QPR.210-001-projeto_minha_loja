// IMPORTANDO OS PRODUTOS
import { produtos } from './lista_produtos.js';
console.log("produtos.js carregado");

const sectionCards = document.querySelector('#cards');
const ulMenuSecoes = document.querySelector('#menu-secoes');
const campoPesquisa = document.querySelector('#campo-pesquisa');

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

    alert("Produto salvo!");

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

        const descricao = document.createElement('p');
        descricao.textContent = produto.descricao_produto;

        const preco = document.createElement('h2');
        preco.textContent =
            `R$ ${produto.valor_unitario.toFixed(2).replace('.', ',')}`;

        const botao = document.createElement('button');
        botao.className = 'btn-add';
        botao.textContent = 'Adicionar';

        botao.addEventListener('click', () => {

            console.log("CLIQUE FUNCIONOU");
        
            console.log(produto);
    
            adicionarAoCarrinho(produto);
        
        });

        divCard.appendChild(img);
        divCard.appendChild(descricao);
        divCard.appendChild(preco);
        divCard.appendChild(botao);

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