let valorFrete = 0;
const listaItens = document.getElementById("itens-carrinho");

function carregarCarrinho() {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    listaItens.innerHTML = "";

    if (carrinho.length === 0) {

        listaItens.innerHTML = `
            <h2>Seu carrinho está vazio.</h2>

            <a href="../index.html">
                <button class="btn-add">
                    Continuar Comprando
                </button>
            </a>
        `;

        return;
    }

    let total = 0;

    carrinho.forEach((produto, indice) => {

        const subtotal = produto.valor_unitario * produto.quantidade;

        total += subtotal;

        const item = document.createElement("div");

        item.className = "item";

        item.innerHTML = `

            <div class="img-item">

                <img src="../${produto.caminho_imagem}" width="130">

            </div>

            <div class="dados-item">

                <h3>${produto.descricao_produto}</h3>

                <p>Preço: <strong>R$ ${produto.valor_unitario.toFixed(2).replace(".", ",")}</strong></p>

                <p>

                    Quantidade

                    <button onclick="diminuir(${indice})">−</button>

                    <strong>${produto.quantidade}</strong>

                    <button onclick="aumentar(${indice})">+</button>

                </p>

                <p>

                    Subtotal:
                    <strong>
                        R$ ${subtotal.toFixed(2).replace(".", ",")}
                    </strong>

                </p>

                <button class="btn-add" onclick="remover(${indice})">
                    Remover
                </button>

            </div>

        `;

        listaItens.appendChild(item);

    });

    listaItens.innerHTML += `

        <hr>

        <h2>Produtos: R$ ${total.toFixed(2).replace(".", ",")}</h2>

<h3>Frete: R$ ${valorFrete.toFixed(2).replace(".", ",")}</h3>

<h2>Total Geral: R$ ${(total + valorFrete).toFixed(2).replace(".", ",")}</h2>

        <br>

        <button class="btn-add" onclick="esvaziarCarrinho()">
            Esvaziar Carrinho
        </button>

        <button class="btn-add" onclick="finalizarCompra()">
            Finalizar Compra
        </button>

    `;
}

function aumentar(indice){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho[indice].quantidade++;

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    carregarCarrinho();

}

function diminuir(indice){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if(carrinho[indice].quantidade > 1){

        carrinho[indice].quantidade--;

    }else{

        carrinho.splice(indice,1);

    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    carregarCarrinho();

}

function remover(indice){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.splice(indice,1);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    carregarCarrinho();

}

function esvaziarCarrinho(){

    if(confirm("Deseja realmente esvaziar o carrinho?")){

        localStorage.removeItem("carrinho");

        carregarCarrinho();

    }

}
function finalizarCompra(){
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    if(carrinho.length === 0){
        alert("Seu carrinho está vazio.");
        return;
    }
    window.location.href = "checkout.html";
}
window.aumentar = aumentar;
window.diminuir = diminuir;
window.remover = remover;
window.esvaziarCarrinho = esvaziarCarrinho;
window.finalizarCompra = finalizarCompra;

carregarCarrinho();

const campoCep = document.querySelector("#cep");
const btnFrete = document.querySelector("#btn-frete");
const resultadoFrete = document.querySelector("#resultado-frete");

if(btnFrete){

    btnFrete.addEventListener("click", async () => {

        const cep = campoCep.value.replace(/\D/g,"");

        if(cep.length !== 8){

            resultadoFrete.innerHTML =
            "<strong>Digite um CEP válido.</strong>";

            return;

        }

        try{

            const resposta = await fetch(
                `https://viacep.com.br/ws/${cep}/json/`
            );

            const dados = await resposta.json();

            if(dados.erro){

                resultadoFrete.innerHTML =
                "<strong>CEP não encontrado.</strong>";

                return;

            }

            valorFrete = Number((Math.random() * 20 + 10).toFixed(2));

            const prazo = Math.floor(Math.random()*5)+2;

            resultadoFrete.innerHTML = `

                <p><strong>📍 ${dados.localidade} - ${dados.uf}</strong></p>

                <p>🚚 Frete:
                <strong>R$ ${frete.replace(".",",")}</strong></p>

                <p>📦 Prazo:
                <strong>${prazo} dias úteis</strong></p>

            `;

            carregarCarrinho();

        }catch{

            resultadoFrete.innerHTML =
            "<strong>Erro ao consultar o CEP.</strong>";

        }

    });

}