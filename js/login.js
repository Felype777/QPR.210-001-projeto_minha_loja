const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function(event){

    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if(!usuario){

        alert("E-mail ou senha incorretos!");

        return;

    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    alert(`Bem-vindo(a), ${usuario.nome}!`);

    window.location.href = "../index.html";

});