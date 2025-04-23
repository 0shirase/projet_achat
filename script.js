document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-basket-button");
  const basketContain = document.getElementById("basket");
  let idCounter = 0;
  let deletedLog = [];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.parentElement;
      const productName = product.querySelector("p")?.textContent;

      const existingBasket = [...basketContain.children].some((item) => {
        const name = item.querySelector("p")?.textContent;
        return name === productName;
      });

      if (existingBasket) {
        alert("Vous avez déjà selectionné ce produit");
      } else {
        const clonedProduct = product.cloneNode(true);
        const clonedButton = clonedProduct.querySelector(".add-basket-button");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer l'article";
        if (clonedButton) {
          clonedButton.remove();
        }

        clonedProduct.setAttribute("data-id", idCounter);
        const currentId = idCounter; // Get's data's ID
        console.log("Delete button", deleteButton);

        deleteButton.addEventListener("click", () => {
          const productToDelete = findProductById(currentId);
          if (productToDelete) {
            deletedLog.push(productToDelete.outerHTML);
            console.log(deletedLog);
            setTimeout(() => {
              productToDelete.remove();
            });
          }
        });

        idCounter++;
        basketContain.appendChild(clonedProduct);
        clonedProduct.appendChild(deleteButton);
      }
    });
  });

  function findProductById(id) {
    const findBtn = document.querySelector(`[data-id="${id}"]`);
    return findBtn;
  }
});
