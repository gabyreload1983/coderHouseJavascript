import {
  sort,
  createListProducts,
  creatListCategories,
  showCart,
} from "./cutomFunctions.js";
import {
  dataBaseCategories,
  dataBaseDollar,
  dataBaseProducts,
} from "./dataBase.js";

class Product {
  constructor(product, dollar) {
    this.id = product.id;
    this.description = product.description;
    this.brand = product.brand;
    this.category = product.category;
    this.price = product.price * dollar;
    this.stock = product.stock;
    this.quantity = 0;
  }
  addTax() {
    return (this.price * 1.105).toFixed(2);
  }
}

const products = [];
for (const product of dataBaseProducts) {
  products.push(new Product(product, dataBaseDollar));
}

sort(products);
sort(dataBaseCategories, "description");

creatListCategories(dataBaseCategories, products);

createListProducts(products);

const orderProductsByPrice = document.querySelector("#orderProductsByPrice");
orderProductsByPrice.addEventListener("change", (e) => {
  const selectedCategory = document.querySelector(".navCategoriesActive");
  sort(products, "price", e.target.value);
  if (selectedCategory !== null) {
    const selectedCategoryId = Number(selectedCategory.id.slice(9));
    createListProducts(products, selectedCategoryId);
  } else {
    createListProducts(products);
  }
});

const cartLink = document.querySelector("#cartLink");
cartLink.addEventListener("click", () => showCart());
