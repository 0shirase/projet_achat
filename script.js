document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-basket-button");
  const basketContain = document.getElementById("basket");
  let idCounter = 0;
  let deletedLog = [];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.parentElement;
      const productName = product.querySelector("p")?.textContent;

      const existingBasket = [...basketContain.children].find((item) => {
        /* sert à transformer la liste de produits en tableau*/
        const name = item.querySelector("p")?.textContent;
        /* sert à sélectionner le content du premier P pour voir si il est déjà existant*/
        return name === productName;
        /* retourne la comparaison */
      });

      let clonedProduct;
      let quantity;

      if (existingBasket) {
        const quantitySpan = existingBasket.querySelector(".quantity");
        let currentQuantity = Number(quantitySpan.textContent);
        quantitySpan.textContent = currentQuantity + 1;
      } else {
        clonedProduct = product.cloneNode(true);
        const clonedButton = clonedProduct.querySelector(".add-basket-button");
        if (clonedButton) {
          clonedButton.remove();
        }

        const counterQuantity = document.createElement("div");
        counterQuantity.classList.add("counter-quantity");

        const minusButton = document.createElement("button");
        minusButton.textContent = "-";

        quantity = document.createElement("span");
        quantity.classList.add("quantity");
        quantity.textContent = "1";

        const addButton = document.createElement("button");
        addButton.textContent = "+";

        counterQuantity.appendChild(minusButton);
        counterQuantity.appendChild(quantity);
        counterQuantity.appendChild(addButton);

        clonedProduct.appendChild(counterQuantity);
        clonedProduct.setAttribute("data-id", idCounter);
        //---------------------------------------------------------------------------------------

        const currentId = idCounter;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer les articles";

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

        addButton.addEventListener("click", () => {
          let numbers = Number(quantity.textContent);
          quantity.textContent = numbers + 1;
        });

        minusButton.addEventListener("click", () => {
          let numbers = Number(quantity.textContent);
          if (numbers > 1) {
            quantity.textContent = numbers - 1;
          } else {
            basketContain.removeChild(clonedProduct);
          }
        });

        clonedProduct.appendChild(deleteButton);
        basketContain.appendChild(clonedProduct);
        idCounter++;
      }
    });
  });

  function findProductById(id) {
    return document.querySelector(`[data-id="${id}"]`);
  }
});

/* if (existingBasket) {
  alert("Vous avez déjà selectionné ce produit");
} else {
  const clonedProduct = product.cloneNode(true);
  const clonedButton = clonedProduct.querySelector(".add-basket-button");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Supprimer l'article";
  if (clonedButton) {
    clonedButton.remove();
  } */

/* clonedProduct.setAttribute("data-id", idCounter); */
