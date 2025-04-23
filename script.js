document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-basket-button");
  const basket = document.getElementById("basket");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.parentElement;
      const cloneProduct = product.cloneNode(true);
    });
  });
});
