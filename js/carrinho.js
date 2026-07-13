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

        <h2>Total: R$ ${total.toFixed(2).replace(".", ",")}</h2>

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

    alert("Compra finalizada com sucesso! Obrigado pela preferência.");

    localStorage.removeItem("carrinho");

    carregarCarrinho();

}

window.aumentar = aumentar;
window.diminuir = diminuir;
window.remover = remover;
window.esvaziarCarrinho = esvaziarCarrinho;
window.finalizarCompra = finalizarCompra;

carregarCarrinho();