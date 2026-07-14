const formCadastro = document.getElementById("formCadastro");

formCadastro.addEventListener("submit", function(event){

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if(nome === "" || email === "" || senha === "" || confirmarSenha === ""){

        alert("Preencha todos os campos.");

        return;

    }

    if(senha !== confirmarSenha){

        alert("As senhas não coincidem.");

        return;

    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExiste = usuarios.find(usuario => usuario.email === email);

    if(usuarioExiste){

        alert("Este e-mail já está cadastrado.");

        return;

    }

    const novoUsuario = {

        nome: nome,
        email: email,
        senha: senha

    };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

    window.location.href = "login.html";

});