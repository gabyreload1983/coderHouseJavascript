const dataBaseProducts = [
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
];

const dataBaseDollar = 145;

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
  checkId(id) {
    return this.id === id;
  }
  addTax() {
    return (this.price * 1.105).toFixed(2);
  }
}

const products = [];
for (const product of dataBaseProducts) {
  products.push(new Product(product, dataBaseDollar));
}

const menu = (options) => {
  let option = Number(prompt(options));
  while (option < 0 || isNaN(option)) {
    option = Number(prompt(options));
  }
  return option;
};

const searchProducts = () => {
  let keyWords = prompt("Ingrese producto a buscar:").toLocaleUpperCase();
  let productsFound = products.filter((product) =>
    product.description.includes(keyWords)
  );
  if (!productsFound.length)
    return "No se encontraron productos con esa descripcion";
  let result = "";
  productsFound.forEach((product) => {
    result += `
    ${product.id} - ${product.description} - $${product.addTax()}
    `;
  });

  return result;
};

// alert(searchProducts());//
