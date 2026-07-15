// NOTIFICAÇÃO (TOAST)
export function mostrarToast(mensagem){
    const toast = document.querySelector("#toast");
    const texto = document.querySelector("#toast-texto");
    if(!toast || !texto) return;
    texto.textContent = mensagem;
    toast.classList.add("mostrar");
    setTimeout(() => {
        toast.classList.remove("mostrar");
    }, 3000);
}