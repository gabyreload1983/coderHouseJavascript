class Producto {
  constructor(product) {
    this.id = product.id;
    this.description = product.description;
    this.brand = product.brand;
    this.categorie = product.categorie;
    this.price = product.price;
    this.stock = product.stock;
    this.offer = false;
  }
  checkId(id) {
    return this.id === id;
  }
  sumarIva() {
    return this.price * 1.21;
  }
}

const searchProduct = (id) => {
  for (const product of products) {
    if (product.checkId(id)) {
      return product;
    }
  }
  return false;
};

const insertNumber = (text) => {
  let num = Number(prompt(text));
  while (num <= 0 || isNaN(num)) {
    num = Number(prompt(text));
  }
  return num;
};

const products = [];

let answer = prompt(
  "Ingresar productos?? (yes / any key to exit): "
).toLowerCase();

while (answer === "yes" || answer === "y") {
  const product = new Producto({
    id: insertNumber("Ingrese id"),
    description: prompt("Ingrese description"),
    brand: prompt("Ingrese brand "),
    categorie: prompt("Ingrese categorie"),
    price: insertNumber("Ingrese price "),
    stock: insertNumber("Ingrese stock"),
  });
  products.push(product);
  answer = prompt(
    "Ingresar nuevo producto?? (yes / any key to exit): "
  ).toLowerCase();
}

alert(`Se ingresaron ${products.length} productos`);

if (products.length) {
  let id = Number(prompt(`Buscar producto por ID: `));
  const product = searchProduct(id);
  if (product) {
    alert(`El id ${id} pertenece al producto ${product.description}.
    EL precio con IVA es $${product.sumarIva()}`);
  }
}
