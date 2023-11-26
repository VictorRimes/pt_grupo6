document.addEventListener("DOMContentLoaded", function () {
  const createPostButton = document.querySelector(".publi-e-post button");
  const feedContainer = document.querySelector(".container");

  const openModal = () => {
    const modalContent = document.createElement("div");
    modalContent.innerHTML = `
    <textarea id="markdownEditor"></textarea>
    <div class="botoes">
      <button id="cancelPost">Cancelar</button>
      <button id="savePost">Publicar</button>
      
    </div>
  `;

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  const simplemde = new SimpleMDE({
    element: document.getElementById("markdownEditor"),
    spellChecker: false,
  });

  const savePostButton = document.getElementById("savePost");
  const cancelPostButton = document.getElementById("cancelPost");

  savePostButton.addEventListener("click", () => {
    const markdownContent = simplemde.value();
    const htmlContent = window.markdownit().render(markdownContent);

    addPostToFeed(htmlContent);

    document.body.removeChild(modal);
  });

  cancelPostButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  const closeModalButton = modal.querySelector('.closeModal');
  closeModalButton.addEventListener('click', () => {
    document.body.removeChild(modal);
    });
  };

  const addPostToFeed = (htmlContent) => {
    const postContainer = document.createElement("div");
    postContainer.classList.add("box");
    
    postContainer.innerHTML = `
    <div class="post-header">
      <div class="usercontainer">
        <img src="./images/R.png" id="img" alt="imagem de perfil">
        <h2 id="user">USERNAME</h2>
      </div>
    </div>
    <div class="post-content">${htmlContent}</div>
    <div class="post-actions">
      <a href="#" class="msn" id = "msn">comentários</a>
      <time class="post-date" datetime="${getCurrentDate()}">${getCurrentDate()}</time>
    </div>
  `;

      
    feedContainer.insertBefore(postContainer, feedContainer.firstChild);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  createPostButton.addEventListener("click", openModal);
});
