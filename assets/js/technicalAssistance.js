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
  const spinnerBorder = document.querySelector(".spinner-border");
  spinnerBorder.classList.remove("visually-hidden");
  setTimeout(() => {
    const form = e.target.children;
    const ticket = new Ticket({
      firstName: form[0].children[1].value,
      lastName: form[1].children[1].value,
      celphone: form[2].children[1].value,
      email: form[3].children[1].value,
      message: form[4].children[1].value,
    });
    e.target.reset();

    const messegeResponse = document.querySelector("#messegeResponse");
    messegeResponse.classList.remove("d-none");
    messegeResponse.innerHTML = `
      <strong>${ticket.firstName} ${ticket.lastName}, tu ticket fue creado con exito. </br>
      Nos comunicaremos con usted a la brevedad.
      </strong>
      `;
    spinnerBorder.classList.add("visually-hidden");
  }, 1000);
};

const formTicket = document.querySelector("#formTicket");
formTicket.addEventListener("submit", validateForm);
