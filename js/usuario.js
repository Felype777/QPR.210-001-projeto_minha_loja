const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

const menuUsuario = document.getElementById("menu-usuario");

if(usuario && menuUsuario){

    menuUsuario.innerHTML = `

        <span style="color:white;font-weight:bold;">
            Olá, ${usuario.nome}
        </span>

        <a href="#" id="btnSair" style="margin-left:15px;">
            Sair
        </a>

    `;

    document.getElementById("btnSair").addEventListener("click", function(e){

        e.preventDefault();

        localStorage.removeItem("usuarioLogado");

        alert("Logout realizado com sucesso!");

        location.reload();

    });

}