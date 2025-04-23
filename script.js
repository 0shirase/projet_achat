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
