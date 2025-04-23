document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-basket-button");
  const basketContain = document.getElementById("basket");
  let idCounter = 0;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.parentElement;
      const productName = product.querySelector("p")?.textContent;

      const existingBasket = [...basketContain.children].some((item) => {
        /* sert à transformer la liste de produits en tableau*/
        const name =
          item.querySelector(
            "p"
          )?.textContent; /* sert à sélectionner le content du premier P pour voir si il est déjà existant*/
        return name === productName; /* retourne la comparaison */
      });

      if (existingBasket) {
        alert("Vous avez déjà selectionné ce produit");
      } else {
        const clonedProduct = product.cloneNode(true);
        const clonedButton = clonedProduct.querySelector(".add-basket-button");
        if (clonedButton) {
          clonedButton.remove();
        }

        clonedProduct.setAttribute("data-id", idCounter);
        idCounter++;
        basketContain.appendChild(clonedProduct);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-basket-button");
  const basketContain = document.getElementById("basket");

  buttons.forEach((button) => {
    // Adds product to Basket
    button.addEventListener("click", () => {
      const product = button.parentElement;
      const cloneProduct = product.cloneNode(true);
    });
  });

  function findProductById(id) {
    const findBtn = document.querySelector(`[data-id="${id}"]`);
    return findBtn.parentElement;
  }
  let deletedLog = [];

  Array.from(basketContain.children).forEach((child) => {
    const deleteButton = child.querySelector("button");
    const id = deleteButton.getAttribute("data-id");
    // Deletes the product from Basket
    deleteButton.addEventListener("click", () => {
      deletedLog.push(findProductById(id));
      console.log(deletedLog);
      setTimeout(() => {
        findProductById(id).remove();
      });
    });
  });
});
