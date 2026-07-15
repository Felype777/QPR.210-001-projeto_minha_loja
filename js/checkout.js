// IMPORTAR TOAST
import { mostrarToast } from "./toast.js";

// ELEMENTOS
const resumoPedido = document.querySelector("#resumo-pedido");
const formulario = document.querySelector("#form-checkout");

// CARRINHO
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let total = 0;

// MOSTRAR RESUMO
function carregarResumo(){
    resumoPedido.innerHTML = "<h2>Resumo do Pedido</h2>";
    if(carrinho.length === 0){
        resumoPedido.innerHTML += "<p>Seu carrinho está vazio.</p>";
        return;
    }

    carrinho.forEach(produto => {
        const item = document.createElement("div");
        item.className = "item-resumo";
        const subtotal = produto.valor_unitario * produto.quantidade;
        total += subtotal;
        item.innerHTML = `
            <span>${produto.descricao_produto}</span>
            <span>R$ ${subtotal.toFixed(2).replace(".", ",")}</span>
        `;
        resumoPedido.appendChild(item);
    });

    const totalPedido = document.createElement("div");
    totalPedido.id = "total-pedido";
    totalPedido.textContent =
        `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
    resumoPedido.appendChild(totalPedido);
}

// FINALIZAR COMPRA
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if(carrinho.length === 0){
        mostrarToast("🛒 Seu carrinho está vazio!");
        return;
    }

    mostrarToast("✅ Pedido realizado com sucesso!");
    localStorage.removeItem("carrinho");
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 2500);
});

// INICIAR
carregarResumo();