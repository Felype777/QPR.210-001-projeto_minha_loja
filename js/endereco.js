const btn = document.querySelector("#salvar-endereco");

btn.addEventListener("click",()=>{

const endereco={

nome:document.querySelector("#nome").value,

cep:document.querySelector("#cep").value,

rua:document.querySelector("#rua").value,

numero:document.querySelector("#numero").value,

bairro:document.querySelector("#bairro").value,

cidade:document.querySelector("#cidade").value,

estado:document.querySelector("#estado").value

};

localStorage.setItem(

"endereco",

JSON.stringify(endereco)

);

alert("Endereço salvo com sucesso!");

});