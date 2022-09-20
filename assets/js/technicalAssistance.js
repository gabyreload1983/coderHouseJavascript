class Ticket {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.celphone = user.celphone;
    this.email = user.email;
    this.message = user.message;
  }
  createTicket() {
    alert(`
    ${this.firstName} ${this.lastName}, tu ticket se genero con exito. 
    Nos comunicaremos con usted a la brevedad`);
  }
}

const technicalAssistance = () => {
  const ticket = new Ticket({
    firstName: prompt("Ingrese su nombre"),
    lastName: prompt("Ingrese su apellido"),
    celphone: prompt("Ingrese su celular"),
    email: prompt("Ingrese su email"),
    message: prompt("Detalle la falla"),
  });
  ticket.createTicket();
};

technicalAssistance();
