document.addEventListener("DOMContentLoaded", () => {
  // Data of all Products
  const listOfProducts = [
    { image: "./assets/fusee-juice.webp", title: "Fusée", price: 1000 },
    {
      image: "./assets/APS02-MOUILLESSE-LT_Page_1.jpg",
      title: "Maison",
      price: 350,
    },
    {
      image:
        "./assets/apps.14383.14158570914565605.0ab0d28f-9654-4a9c-bac9-84fe7a174fae.jfif",
      title: "Forklift",
      price: 10000,
    },
  ];

  // console.log(listOfProducts[0]);
  // console.log(listOfProducts[0]["image"]);

  listOfProducts.forEach((content) => {
    const productsContainer = document.getElementById("product");
    const divProduit = document.createElement("div");
    divProduit.classList.add("fl-column");
    productsContainer.append(divProduit);
    // Adding the Image & Title structure
    const img = document.createElement("img");
    const title = document.createElement("p");
    img.setAttribute("src", content["image"]);
    divProduit.append(img);
    title.innerHTML = content["title"];
    divProduit.append(title);
    // Adding the Cost structure
    const cost = document.createElement("div");
    const price = document.createElement("p");
    const unit = document.createElement("span");
    cost.classList.add("costAlign");
    divProduit.append(cost);
    price.innerHTML = content["price"];
    cost.append(price);
    unit.innerHTML = "€";
    cost.append(unit);
    const btn = document.createElement("button");
    btn.classList.add("add-basket-button");
    btn.innerHTML = "Ajouter au panier";
    divProduit.append(btn);
  });

  const buttons = document.querySelectorAll(".add-basket-button");
  const basketContain = document.getElementById("basket");
  const emptyMessage = document.createElement("p");
  emptyMessage.id = "empty-basket-message";
  emptyMessage.textContent = "Panier vide";
  basketContain.appendChild(emptyMessage);
  let idCounter = 0;
  let deletedLog = [];

  // Clickable buttons, Adding Product to Basket
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

        // récupère la class créee ligne 89
        const priceTag = existingBasket.querySelector(".total-price");

        //Récupère la valeur de l’attribut de l'élément trouvé précédemment et contient le prix de base
        const basePrice = Number(priceTag.getAttribute("data-base-price"));

        //additionne le prix de base avec la quantitée ajoutée +1
        priceTag.textContent = `${basePrice * (currentQuantity + 1)} `;

        //---------------------------
      } else {
        clonedProduct = product.cloneNode(true);

        // récupère le deuxième <p> (le prix)
        const productPriceText = product.querySelectorAll("p")[1].textContent;
        const productPrice = Number(productPriceText);

        const priceTotal = document.createElement("p");
        priceTotal.classList.add("total-price");

        //ajout d'attribut à priceTotal et de stocker la valeur
        priceTotal.setAttribute("data-base-price", productPrice);

        //---------------------------------------------------
        priceTotal.textContent = `${productPrice} €`;
        clonedProduct.appendChild(priceTotal);
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

        //--Delete from Basket------------------------------------------------------------------

        const currentId = idCounter; // Get's data's ID

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer les articles";

        deleteButton.addEventListener("click", () => {
          const productToDelete = findProductById(currentId);
          if (productToDelete) {
            deletedLog.push(productToDelete.outerHTML);
            console.log(deletedLog);
            setTimeout(() => {
              productToDelete.remove();
              emptyBasket();
            });
          }
        });

        //-------------------------------------------------------------------------------------

        addButton.addEventListener("click", () => {
          let numbers = Number(quantity.textContent);
          quantity.textContent = numbers + 1;
          const price = clonedProduct.querySelector(".total-price");
          const basePrice = Number(price.getAttribute("data-base-price"));
          price.textContent = `${basePrice * (numbers + 1)} €`;
        });

        minusButton.addEventListener("click", () => {
          let numbers = Number(quantity.textContent);
          if (numbers > 1) {
            quantity.textContent = numbers - 1;
            const price = clonedProduct.querySelector(".total-price");
            const basePrice = Number(price.getAttribute("data-base-price"));
            price.textContent = `${basePrice * (numbers - 1)} €`;
          } else {
            basketContain.removeChild(clonedProduct);
          }
        });

        clonedProduct.appendChild(deleteButton);
        basketContain.appendChild(clonedProduct);
        emptyBasket();
        idCounter++;
      }
    });
  });

  function findProductById(id) {
    return document.querySelector(`[data-id="${id}"]`);
  }
  function emptyBasket() {
    const hasProducts = [...basketContain.children].some(
      (child) => !child.id || child.id !== "empty-basket-message"
    );
    emptyMessage.style.display = hasProducts ? "none" : "block";
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
