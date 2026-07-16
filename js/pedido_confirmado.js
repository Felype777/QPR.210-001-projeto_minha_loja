import { mostrarToast } from "./toast.js";

const numeroPedido = document.querySelector("#numero-pedido");
const dataPedido = document.querySelector("#data-pedido");
const btnImprimir = document.querySelector("#btn-imprimir");

function gerarNumeroPedido(){

    const numero =
        Math.floor(Math.random() * 900000) + 100000;

    numeroPedido.textContent = "#" + numero;

}

function mostrarData(){

    const hoje = new Date();

    const data = hoje.toLocaleDateString("pt-BR");

    const hora = hoje.toLocaleTimeString("pt-BR",{
        hour:"2-digit",
        minute:"2-digit"
    });

    dataPedido.textContent = `${data} às ${hora}`;

}

btnImprimir.addEventListener("click",()=>{

    window.print();

});

window.addEventListener("load",()=>{

    gerarNumeroPedido();

    mostrarData();

    mostrarToast("🎉 Pedido confirmado com sucesso!");

});