class Ticket {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.celphone = user.celphone;
    this.email = user.email;
    this.message = user.message;
  }
  createTicket() {
    return true;
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
  if (ticket.createTicket()) {
    const messegeResponse = document.querySelector("#messegeResponse");
    messegeResponse.classList.remove("d-none");
    messegeResponse.innerHTML = `
     ${ticket.firstName} ${ticket.lastName}, tu ticket se genero con exito. 
     Nos comunicaremos con usted a la brevedad`;
  }
};

technicalAssistance();
