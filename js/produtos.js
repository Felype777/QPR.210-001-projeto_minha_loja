//IMPORTANDO OS PRODUTOS DO ARQUIVO lista_produtos.js
import { produtos } from './lista_produtos.js'

//PEGANDO ELEMENTOS DO DOM
const sectionCards = document.querySelector('#cards')

//CARREGANDO OS CARDS
const listarProdutos = () => {

    produtos.forEach((elem, i) => {

        const divCards = document.createElement('div')
        divCards.setAttribute('class', 'card')
    
        const imgCard = document.createElement('img')
        imgCard.setAttribute('src', elem.caminho_imagem)
        imgCard.setAttribute('alt', elem.descricao_produto)
    
        //CRIANDO O ELEMENTO P E ATRIBUINDO A DESCRIÇÃO DOS PRODUTOS
        const pCard = document.createElement('p')
        pCard.innerHTML = elem.descricao_produto

         //CRIANDO O ELEMENTO h2 E ATRIBUINDO O VALOR UNITÁRIODEIXANDO EM DUAS CASAS DECIMAIS E SUBSTITUINDO PONTO POR VÍRGULA
        const h2Card = document.createElement('h2')
        h2Card.innerHTML = `R$ ${parseFloat(elem.valor_unitario)
        .toFixed(2).replace('.', ',')}`

         //CRIANDO O ELEMENTO button E DEFININDO OS ATRIBUTOS CLASS E A DESCRIÇÃO ADICIONAR
         const btnCard = document.createElement('button')
         btnCard.setAttribute('class', 'btn-add')
        btnCard.innerHTML = 'Adicionar'

        //ADICIONANDO OS ELEMENTOS FILHOS AOS divCard
        divCard.appendChild(imgCard)
        divCard.appendChild(pCard)
        divCard.appendChild(h2Card)
        divCard.appendChild(btnCard)

        //ADICIONANDO O divCard A SECTION CARDS
        sectionCards.appendChild(divCard)
    })

}

//CHAMANDO A FUNÇÃO listarProdutos
listarProdutos()

//MONTANDO OS MENUS SEÇÕES
cosnt 
