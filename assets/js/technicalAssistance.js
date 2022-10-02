const formTicket = document.querySelector("#formTicket");
const messegeResponse = document.querySelector("#messegeResponse");
const spinnerBorderTechnicalAssistance = document.querySelector(
  "#spinnerBorderTechnicalAssistance"
);

class Ticket {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.celphone = user.celphone;
    this.email = user.email;
    this.message = user.message;
  }
}

const validateForm = (e) => {
  e.preventDefault();
  spinnerBorderTechnicalAssistance.classList.remove("visually-hidden");

  setTimeout(() => {
    const form = e.target.children;
    const ticket = new Ticket({
      firstName: form[0].children[1].value,
      lastName: form[1].children[1].value,
      celphone: form[2].children[1].value,
      email: form[3].children[1].value,
      message: form[4].children[1].value,
    });

    if (createTicket(ticket)) {
      messegeResponse.innerHTML = `
            <strong>${ticket.firstName} ${ticket.lastName}, tu ticket fue creado con exito. </br>
            Nos comunicaremos con usted a la brevedad.
            </strong>
            `;
    } else {
      messegeResponse.innerHTML = `
            <strong>${ticket.firstName} ${ticket.lastName}, no se pudo crear tu ticket. </br>
            Intenta mas tarde.
            </strong>
            `;
    }
    e.target.reset();
    messegeResponse.classList.remove("d-none");
    spinnerBorderTechnicalAssistance.classList.add("visually-hidden");
  }, 1000);
};

const createTicket = (ticket) => {
  return true;
};

formTicket.addEventListener("submit", validateForm);
