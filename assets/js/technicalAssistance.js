const formTicket = document.querySelector("#formTicket");
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

const validateForm = async (e) => {
  e.preventDefault();
  spinnerBorderTechnicalAssistance.classList.remove("visually-hidden");

  const form = e.target.children;
  const ticket = new Ticket({
    firstName: form[0].children[1].value,
    lastName: form[1].children[1].value,
    celphone: form[2].children[1].value,
    email: form[3].children[1].value,
    message: form[4].children[1].value,
  });

  (await createTicket(ticket))
    ? Swal.fire({
        title: "Ticket creado",
        text: `${ticket.firstName} ${ticket.lastName}, tu ticket fue creado con exito.
        Nos comunicaremos con usted a la brevedad.
        `,
        icon: "success",
        iconColor: "#ec811c",
        confirmButtonColor: "#ec811c",
      })
    : Swal.fire({
        title: "Error",
        text: `${ticket.firstName} ${ticket.lastName}, no se pudo crear tu ticket.
        Intenta mas tarde.
      `,
        icon: "error",
        confirmButtonColor: "#e33",
      });

  e.target.reset();
  spinnerBorderTechnicalAssistance.classList.add("visually-hidden");
};

const createTicket = (ticket) => {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(ticket),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => console.log(error));
  });
};

formTicket.addEventListener("submit", validateForm);
