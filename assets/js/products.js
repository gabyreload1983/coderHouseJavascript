const dataBaseCategories = [
  { id: 14, description: "Microprocesadores" },
  { id: 1, description: "Placas Madre" },
  { id: 13, description: "Memorias RAM" },
  { id: 66, description: "Discos" },
  { id: 31, description: "Notebooks" },
  { id: 54, description: "Celulares" },
];

const dataBaseDollar = 145;

dataBaseCategories.sort((a, b) => {
  if (a.description > b.description) {
    return 1;
  }
  if (a.description < b.description) {
    return -1;
  }
  return 0;
});

const dataBaseProducts = [
  {
    id: 810048,
    description: "CEL XIAOMI REDMI NOTE 9 4GB 128GB",
    brand: "XIAOMI",
    categorie: 54,
    price: 282.73,
    stock: 2,
    offer: false,
  },
  {
    id: 811726,
    description: "CEL SAMSUNG A32 4GB 128GB",
    brand: "SAMSUNG",
    categorie: 54,
    price: 290.39,
    stock: 3,
    offer: true,
  },
  {
    id: 811319,
    description: "CPU AMD ATHLON 300GE AM4 - SIN COOLER",
    brand: "AMD",
    categorie: 14,
    price: 104.5539,
    stock: 2,
    offer: false,
  },
  {
    id: 811362,
    description: "CPU INTEL CORE I3-10105 3.7GHZ S1200 BOX",
    brand: "INTEL",
    categorie: "14",
    price: 187.3868,
    stock: 2,
    offer: false,
  },
  {
    id: 810379,
    description: "CPU AMD RYZEN 5 5600X AM4 65W 4.6GHZ",
    brand: "AMD",
    categorie: 14,
    price: 342.6142,
    stock: 2,
    offer: true,
  },
  {
    id: 802076,
    description: "MB AMD AM4 ASUS PRIME A320M-K M.2 VGA-HDMI",
    brand: "ASUS",
    categorie: 1,
    price: 81.0545,
    stock: 11,
    offer: true,
  },
  {
    id: 803073,
    description: "MB INTEL S1151 MSI H310M PRO-VDH PLUS 9N",
    brand: "MSI",
    categorie: 1,
    price: 76.4569,
    stock: 2,
    offer: false,
  },
  {
    id: 811552,
    description: "DDR4 8GB ADATA XPG 3200MHZ HUNTER",
    brand: "ADATA",
    categorie: 13,
    price: 63.9522,
    stock: 3,
    offer: true,
  },
  {
    id: 803262,
    description: "CPU AMD ATHLON 200GE 3.2GHZ AM4 DUALCORE",
    brand: "AMD",
    categorie: 14,
    price: 93.6934,
    stock: 6,
    offer: false,
  },
  {
    id: 810341,
    description: "CPU INTEL CORE I5-10400 COMETLAKE S1200 BOX",
    brand: "INTEL",
    categorie: 14,
    price: 271.7238,
    stock: 2,
    offer: false,
  },
  {
    id: 800672,
    description: "DISCO SSD 480GB KINGSTON A400",
    brand: "KINGSTON",
    categorie: 66,
    price: 59.1457,
    stock: 6,
    offer: true,
  },
  {
    id: 801783,
    description: "DISCO SSD 240GB KINGSTON A400",
    brand: "KINGSTON",
    categorie: 66,
    price: 37.7256,
    stock: 19,
    offer: false,
  },
  {
    id: 811594,
    description: "NOTEBOOK 15.6 ASUS R565E I5-1135G7",
    brand: "ASUS",
    categorie: 31,
    price: 850.6,
    stock: 2,
    offer: false,
  },
  {
    id: 880948,
    description: "NOTEBOOK 15.6 LENOVO 15IHU6 GAMING I5-11300H",
    brand: "LENOVO",
    categorie: 31,
    price: 953.5,
    stock: 1,
    offer: false,
  },
  {
    id: 811345,
    description: "NOTEBOOK 10.1 LENOVO IDEAPAD D330",
    brand: "LENOVO",
    categorie: 31,
    price: 230.0,
    stock: 4,
    offer: true,
  },
  {
    id: 6500,
    description: "NOTEBOOK 14 LENOVO LN14W A6-9220C 128SSD 4GB WIN10",
    brand: "LENOVO",
    categorie: 31,
    price: 465.5,
    stock: 2,
    offer: false,
  },
];

class Product {
  constructor(product, dollar) {
    this.id = product.id;
    this.description = product.description;
    this.brand = product.brand;
    this.categorie = product.categorie;
    this.price = product.price * dollar;
    this.stock = product.stock;
    this.offer = product.offer;
  }
  addTax() {
    return (this.price * 1.105).toFixed(2);
  }
}

const products = [];
for (const product of dataBaseProducts) {
  products.push(new Product(product, dataBaseDollar));
}

const createListProducts = (products, categorie) => {
  let listProducts = document.querySelector("#listProducts");
  for (let product of products) {
    if (product.categorie !== categorie) {
      continue;
    }

    let div = document.createElement("div");
    div.className = "col-12 col-md-6 col-lg-3 mb-3";
    div.innerHTML = `
  <div class="card border border-primary">
    <a href="">
      <img
        src="../assets/images/products/${product.id}-1.jpg"
        class="card-img-top"
        alt="..."
      />
    </a>
    <div class="card-body d-flex flex-column justify-content-end">
      <strong>CODIGO: ${product.id}</strong>
      <h5 class="card-title">
        ${product.description}
      </h5>
      <p class="card-text">$${product.addTax()}</p>
      <button
        class="btn btn-primary d-flex justify-content-center align-items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-cart-plus me-2"
          viewBox="0 0 16 16"
        >
          <path
            d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"
          />
          <path
            d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
          /></svg
        >Agregar
      </button>
    </div>
  </div>
  
  `;
    listProducts.append(div);
  }
};

const creatListCategories = (categories) => {
  let listCategories = document.querySelector("#listCategories");
  for (let categorie of categories) {
    let li = document.createElement("li");
    li.className = "nav-item";
    li.innerHTML = `<a class="nav-link navCategories p-2 mb-2" href="#" id="categorie-${categorie.id}">${categorie.description}</a>`;
    listCategories.append(li);
  }
};

const selectCategorie = (categorie) => {
  const selected = document.querySelector(`#categorie-${categorie}`);
  selected.classList.add("navCategoriesActive");

  const navCategories = document.querySelectorAll(".navCategories");
  for (const nav of navCategories) {
    if (nav.id !== `categorie-${categorie}`) {
      nav.classList.remove("navCategoriesActive");
    }
  }
};

const menu = (options) => {
  let option = Number(prompt(options));
  while (option < 0 || isNaN(option)) {
    option = Number(prompt(options));
  }
  return option;
};

creatListCategories(dataBaseCategories);

let menuFilter = `
FILTRAR BUSQUEDA POR CODIGO:`;
for (const option of dataBaseCategories) {
  menuFilter += `
  ${option.description} : ${option.id}`;
}

let categorie = menu(menuFilter);
createListProducts(products, categorie);
selectCategorie(categorie);
