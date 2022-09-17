const dataBaseProducts = [
  {
    id: 802076,
    description: "MB AMD AM4 ASUS PRIME A320M-K M.2 VGA-HDMI",
    brand: "ASUS",
    categorie: "1",
    price: 81.0545,
    stock: 11,
    offer: true,
  },
  {
    id: 803073,
    description: "MB INTEL S1151 MSI H310M PRO-VDH PLUS 9N",
    brand: "MSI",
    categorie: "1",
    price: 76.4569,
    stock: 2,
    offer: false,
  },
  {
    id: 811552,
    description: "DDR4 8GB ADATA XPG 3200MHZ HUNTER",
    brand: "ADATA",
    categorie: "13",
    price: 63.9522,
    stock: 3,
    offer: true,
  },
  {
    id: 803262,
    description: "CPU AMD ATHLON 200GE 3.2GHZ AM4 DUALCORE",
    brand: "AMD",
    categorie: "14",
    price: 93.6934,
    stock: 6,
    offer: false,
  },
  {
    id: 810341,
    description: "CPU INTEL CORE I5-10400 COMETLAKE S1200 BOX",
    brand: "INTEL",
    categorie: "14",
    price: 271.7238,
    stock: 2,
    offer: false,
  },
];

const dataBaseDollar = 145;

const dataBaseUsers = [
  { email: "gaby@gmail.com", password: "123", name: "Gabriel" },
  { email: "lisa@gmail.com", password: "456", name: "Lisa" },
  { email: "pilar@gmail.com", password: "789", name: "Pilar" },
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
  checkId(id) {
    return this.id === id;
  }
  addTax() {
    return (this.price * 1.21).toFixed(2);
  }
}

class Ticket {
  constructor(ticket) {
    this.firstName = ticket.firstName;
    this.lastName = ticket.lastName;
    this.celphone = ticket.celphone;
    this.email = ticket.email;
    this.message = ticket.message;
  }
  sendTicket() {
    alert(`
    ${this.firstName} ${this.lastName}, tu ticket se genero con exito. 
    Nos comunicaremos con usted a la brevedad`);
  }
}

class Contact {
  constructor(contact) {
    this.firstName = contact.firstName;
    this.lastName = contact.lastName;
    this.email = contact.email;
    this.message = contact.message;
  }
  sendMessage() {
    alert(`
    ${this.firstName} ${this.lastName}, tu consulta se envio con exito. 
    Nos comunicaremos con usted a la brevedad`);
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

const getOffers = () => {
  let offers = products.filter((product) => product.offer);
  return offers.map((product) => {
    return `
    ${product.description} - $${product.addTax()}
    `;
  });
};

const menuProducts = () => {
  const productsMenu = `
  MENU PRODUCTOS
  1 - Ver todos los productos
  2 - Buscar producto por ID
  0 - Salir
  `;
  let option = menu(productsMenu);
  while (option !== 0) {
    if (option === 1) alert(getProducts());
    if (option === 2) alert(getProductById());

    option = menu(productsMenu);
  }
};

const getProducts = () => {
  return products.map((product) => {
    return `
    ${product.description} - $${product.addTax()}
    `;
  });
};

const getProductById = () => {
  const id = Number(prompt("Ingrese id de producto:"));
  const productFound = products.find((product) => product.id === id);
  if (productFound)
    return `${productFound.description} - $${productFound.addTax()}`;
  return "No se encontro id";
};

const createTicket = () => {
  let ticket = new Ticket({
    firstName: prompt("Ingrese su nombre"),
    lastName: prompt("Ingrese su apellido"),
    celphone: prompt("Ingrese telefono"),
    email: prompt("Ingrese email"),
    message: prompt("Detalle su problema"),
  });
  ticket.sendTicket();
};

const contact = () => {
  let contact = new Contact({
    firstName: prompt("Ingrese su nombre"),
    lastName: prompt("Ingrese su apellido"),
    email: prompt("Ingrese email"),
    message: prompt("Ingrese su mensaje"),
  });
  contact.sendMessage();
};

const login = () => {
  let email = prompt("Ingrese su email");
  let password = prompt("Ingrese su password");

  let user = dataBaseUsers.find(
    (user) => user.email === email && password === user.password
  );
  if (user) {
    alert(`Bienvenido ${user.name}`);
  } else {
    alert(`Datos incorrectos`);
  }
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

const mainMenu = `
MENU PRINCIPAL
1 - Ofertas
2 - Productos
3 - Asistencia Tecnica
4 - Contacto
5 - Ingreso/Registro
6 - Buscar articulos
0 - Salir
`;
let option = menu(mainMenu);

while (option !== 0) {
  switch (option) {
    case 1:
      alert(getOffers());
      break;
    case 2:
      menuProducts();
      break;
    case 3:
      createTicket();
      break;
    case 4:
      contact();
      break;
    case 5:
      login();
      break;
    case 6:
      alert(searchProducts());
      break;
    default:
      break;
  }
  option = menu(mainMenu);
}

alert("Byebye");
