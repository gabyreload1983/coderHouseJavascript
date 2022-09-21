class Contact {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.celphone = user.celphone;
    this.email = user.email;
    this.message = user.message;
  }
  sendMessage() {
    return true;
  }
}

const contact = () => {
  const contact = new Contact({
    firstName: prompt("Ingrese su nombre"),
    lastName: prompt("Ingrese su apellido"),
    email: prompt("Ingrese su email"),
    message: prompt("Ingrese su consulta"),
  });
  if (contact.sendMessage()) {
    const messegeResponse = document.querySelector("#messegeResponse");
    messegeResponse.classList.remove("d-none");
    messegeResponse.innerHTML = `
     ${contact.firstName} ${contact.lastName}, recibimos tu mensaje con exito. 
     Nos comunicaremos con usted a la brevedad`;
  }
};

contact();
