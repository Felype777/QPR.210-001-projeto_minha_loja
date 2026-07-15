const listaProdutos = document.querySelector("#lista-produtos");

const enderecoCliente = document.querySelector("#endereco-cliente");

const valorTotal = document.querySelector("#valor-total");

const btnFinalizar = document.querySelector("#finalizar");

const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const endereco = JSON.parse(localStorage.getItem("endereco"));

let total = 0;

carrinho.forEach(produto=>{

const div=document.createElement("div");

div.className="produto-checkout";

div.innerHTML=`

<span>${produto.descricao_produto}</span>

<strong>

R$ ${produto.valor_unitario.toFixed(2).replace(".",",")}

</strong>

`;

listaProdutos.appendChild(div);

total+=produto.valor_unitario;

});

valorTotal.textContent=

`Total: R$ ${total.toFixed(2).replace(".",",")}`;

if(endereco){

enderecoCliente.innerHTML=`

<strong>${endereco.nome}</strong><br>

${endereco.rua}, ${endereco.numero}<br>

${endereco.bairro}<br>

${endereco.cidade} - ${endereco.estado}<br>

CEP: ${endereco.cep}

`;

}else{

enderecoCliente.innerHTML=

"Endereço não cadastrado.";

}

btnFinalizar.addEventListener("click",()=>{

alert("🎉 Pedido realizado com sucesso!");

localStorage.removeItem("carrinho");

window.location.href="../index.html";

});