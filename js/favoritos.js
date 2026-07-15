import { mostrarToast } from "./toast.js";

// ELEMENTOS DA PÁGINA
const sectionFavoritos = document.querySelector("#cards-favoritos");

// CARREGAR FAVORITOS

function carregarFavoritos() {
    sectionFavoritos.innerHTML = "";
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (favoritos.length === 0) {
        sectionFavoritos.innerHTML = `
            <div class="sem-favoritos">
                ❤️ Você ainda não possui produtos favoritos.
            </div>
        `;
        return;
    }

    favoritos.forEach(produto => {

        const card = document.createElement("div");
        card.className = "card-favorito";

        const img = document.createElement("img");
        img.src = "../" + produto.caminho_imagem;
        img.alt = produto.descricao_produto;

        img.addEventListener("click", () => {

            localStorage.setItem(
                "produtoSelecionado",
                JSON.stringify(produto)
            );

            window.location.href = "produto.html";

        });

        const nome = document.createElement("p");
        nome.textContent = produto.descricao_produto;

        const preco = document.createElement("h2");
        preco.textContent =
            `R$ ${produto.valor_unitario.toFixed(2).replace(".", ",")}`;

        const btnCarrinho = document.createElement("button");
        btnCarrinho.className = "btn-carrinho";
        btnCarrinho.textContent = "Adicionar ao Carrinho";

        btnCarrinho.addEventListener("click", () => {

            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            carrinho.push({

                ...produto,

                quantidade: 1

            });

            localStorage.setItem(
                "carrinho",
                JSON.stringify(carrinho)
            );

            mostrarToast("🛒 Produto adicionado ao carrinho!");

        });

        const btnRemover = document.createElement("button");
        btnRemover.className = "btn-remover";
        btnRemover.textContent = "Remover";

        btnRemover.addEventListener("click", () => {

            const novaLista = favoritos.filter(item =>
                item.id_produto !== produto.id_produto
            );

            localStorage.setItem(
                "favoritos",
                JSON.stringify(novaLista)
            );

            carregarFavoritos();

        });

        card.appendChild(img);
        card.appendChild(nome);
        card.appendChild(preco);
        card.appendChild(btnCarrinho);
        card.appendChild(btnRemover);

        sectionFavoritos.appendChild(card);

    });

}

// INICIAR

carregarFavoritos();