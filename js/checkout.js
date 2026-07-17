import { mostrarToast } from "./toast.js";

const formulario = document.querySelector("#form-checkout");
const resumoPedido = document.querySelector("#lista-produtos");
const valorFrete = document.querySelector("#valor-frete");
const valorDesconto = document.querySelector("#valor-desconto");
const valorTotal = document.querySelector("#valor-total");

const pagamento = document.querySelector("#pagamento");

const dadosCartao = document.querySelector("#dados-cartao");
const pixBox = document.querySelector("#pix-box");
const boletoBox = document.querySelector("#boleto-box");

const selectParcelas = document.querySelector("#parcelas");

const cep = document.querySelector("#cep");
const endereco = document.querySelector("#endereco");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");
const estado = document.querySelector("#estado");

const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

let subtotal = 0;
let frete = 25;
let desconto = 0;

function carregarResumo(){

    resumoPedido.innerHTML = "";

    subtotal = 0;

    carrinho.forEach(produto=>{

        const item = document.createElement("div");

        item.className = "item-resumo";

        const totalProduto =
            produto.valor_unitario * produto.quantidade;

        subtotal += totalProduto;

        item.innerHTML = `
            <span>${produto.descricao_produto} x${produto.quantidade}</span>
            <strong>
                R$ ${totalProduto.toFixed(2).replace(".",",")}
            </strong>
        `;

        resumoPedido.appendChild(item);

    });

    atualizarTotal();

}

function atualizarTotal(){

    desconto = 0;

    if(pagamento.value === "Pix"){

        desconto = subtotal * 0.05;

    }

    if(pagamento.value === "Boleto"){

        desconto = subtotal * 0.03;

    }

    valorFrete.textContent =
        `R$ ${frete.toFixed(2).replace(".",",")}`;

    valorDesconto.textContent =
        `- R$ ${desconto.toFixed(2).replace(".",",")}`;

    const total = subtotal + frete - desconto;

    valorTotal.textContent =
        `R$ ${total.toFixed(2).replace(".",",")}`;

}

pagamento.addEventListener("change",()=>{

    dadosCartao.style.display = "none";
    pixBox.style.display = "none";
    boletoBox.style.display = "none";

    if(pagamento.value === "Credito"){

        dadosCartao.style.display = "block";

        selectParcelas.innerHTML = "";

        for(let i=1;i<=12;i++){

            const option = document.createElement("option");

            option.value = i;

            option.textContent =
                `${i}x de R$ ${(subtotal/i).toFixed(2).replace(".",",")}`;

            selectParcelas.appendChild(option);

        }

    }

    if(pagamento.value === "Pix"){

        pixBox.style.display = "block";

    }

    if(pagamento.value === "Boleto"){

        boletoBox.style.display = "block";

    }

    atualizarTotal();

});

cep.addEventListener("blur",()=>{

    const numeroCep = cep.value.replace(/\D/g,"");

    if(numeroCep.length !== 8){

        return;

    }

    fetch(`https://viacep.com.br/ws/${numeroCep}/json/`)

    .then(res=>res.json())

    .then(dados=>{

        endereco.value = dados.logradouro || "";
        bairro.value = dados.bairro || "";
        cidade.value = dados.localidade || "";
        estado.value = dados.uf || "";

    });

});

formulario.addEventListener("submit",(e)=>{

    e.preventDefault();

    if(carrinho.length === 0){

        mostrarToast("Seu carrinho está vazio.");

        return;

    }

    localStorage.removeItem("carrinho");

    mostrarToast("Pedido realizado com sucesso!");

    setTimeout(()=>{

        window.location.href="pedido_confirmado.html";

    },2000);

});

carregarResumo();

pagamento.dispatchEvent(new Event("change"));

const chavePix = "79998334561";

document.getElementById("codigo-pix").value = chavePix;

new QRCode(document.getElementById("qrcode-pix"),{
    text:chavePix,
    width:220,
    height:220
});

console.log("Checkout carregado!");

const btnCopiarPix = document.querySelector("#btn-copiar-pix");

btnCopiarPix.addEventListener("click", () => {

    navigator.clipboard.writeText(chavePix);

    mostrarToast("✅ Chave PIX copiada!");

});