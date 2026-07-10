// IMPORTANDO OS PRODUTOS
import { produtos } from './lista_produtos.js'

// ELEMENTOS DO DOM
const sectionCards = document.querySelector('#cards')
const ulMenuSecoes = document.querySelector('#menu-secoes')
const campoPesquisa = document.querySelector('#campo-pesquisa')

// MONTAR CARDS
const montaCards = (listaProdutos) => {

    sectionCards.innerHTML = ''

    listaProdutos.forEach((produto) => {

        const divCard = document.createElement('div')
        divCard.className = 'card'

        const img = document.createElement('img')
        img.src = produto.caminho_imagem
        img.alt = produto.descricao_produto

        const descricao = document.createElement('p')
        descricao.textContent = produto.descricao_produto

        const preco = document.createElement('h2')
        preco.textContent = `R$ ${produto.valor_unitario.toFixed(2).replace('.', ',')}`

        const botao = document.createElement('button')
        botao.className = 'btn-add'
        botao.textContent = 'Adicionar'

        divCard.appendChild(img)
        divCard.appendChild(descricao)
        divCard.appendChild(preco)
        divCard.appendChild(botao)

        sectionCards.appendChild(divCard)

    })

}

// MOSTRAR TODOS OS PRODUTOS
const listarProdutos = () => {
    montaCards(produtos)
}

// FILTRAR POR CATEGORIA
const filtroProduto = (idSecao) => {

    if (idSecao === 0) {
        listarProdutos()
        return
    }

    const filtrados = produtos.filter(produto => produto.id_secao === idSecao)

    montaCards(filtrados)

}

// CARREGAR MENU
const carregaSecoes = () => {

    ulMenuSecoes.innerHTML = '';

    // BOTÃO TODOS
    const liTodos = document.createElement('li')

    const aTodos = document.createElement('a')
    aTodos.href = '#'
    aTodos.className = 'lnk-secao'
    aTodos.textContent = 'Todos'

    aTodos.addEventListener('click', (e) => {
        e.preventDefault()
        listarProdutos()
    })

    liTodos.appendChild(aTodos)
    ulMenuSecoes.appendChild(liTodos)

    // REMOVE CATEGORIAS REPETIDAS
    const categorias = []

    produtos.forEach((produto) => {

        if (!categorias.some(cat => cat.id_secao === produto.id_secao)) {
            categorias.push({
                id_secao: produto.id_secao,
                secao: produto.secao
            })
        }

    })

    // CRIA MENU
    categorias.forEach((categoria) => {

        const li = document.createElement('li')

        const a = document.createElement('a')
        a.href = '#'
        a.className = 'lnk-secao'
        a.textContent = categoria.secao

        a.addEventListener('click', (e) => {

            e.preventDefault()

            filtroProduto(categoria.id_secao)

        })

        li.appendChild(a)

        ulMenuSecoes.appendChild(li)

    })

}

// PESQUISA
campoPesquisa.addEventListener('keyup', () => {

    const texto = campoPesquisa.value.toLowerCase()

    const resultado = produtos.filter(produto =>
        produto.descricao_produto.toLowerCase().includes(texto)
    )

    montaCards(resultado)

})

// INICIAR
listarProdutos()
carregaSecoes()