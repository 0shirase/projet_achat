document.addEventListener("DOMContentLoaded", () => {
  const listOfProducts = [
    { image: "./assets/fusee-juice.webp", title: "fusée", price: "1000 euros" },
    {
      image: "./assets/APS02-MOUILLESSE-LT_Page_1.jpg",
      title: "maison",
      price: "350 euros",
    },
    {
      image:
        "./assets/apps.14383.14158570914565605.0ab0d28f-9654-4a9c-bac9-84fe7a174fae.jfif",
      title: "forkfilt",
      price: "10 000 euros",
    },
  ];

  listOfProducts.map((content) => {
    const productsContainer = document.getElementById("product");
    const div = document.createElement("div");
    div.classList.add("fl-column");
    productsContainer.append(div);
    const img = document.createElement("img");
    const title = document.createElement("p");
    const price = document.createElement("p");

    img.setAttribute("src", content["image"]);
    div.append(img);
    title.innerHTML = content["title"];
    div.append(title);
    price.innerHTML = content["price"];
    div.append(price);

    const btn = document.createElement("button");
    btn.classList.add("add-basket-button");
    btn.innerHTML = "Ajouter au panier";
    div.append(btn);
  });

  // console.log(listOfProducts[0]);
  // console.log(listOfProducts[0]["image"]);

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
