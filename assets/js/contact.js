class Contact {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.celphone = user.celphone;
    this.email = user.email;
    this.message = user.message;
  }
  sendMessage() {
    alert(`
    ${this.firstName} ${this.lastName}, tu consulta se envio con exito. 
    Nos comunicaremos con usted a la brevedad`);
  }
}

const contact = () => {
  const contact = new Contact({
    firstName: prompt("Ingrese su nombre"),
    lastName: prompt("Ingrese su apellido"),
    email: prompt("Ingrese su email"),
    message: prompt("Ingrese su consulta"),
  });
  contact.sendMessage();
};

contact();
