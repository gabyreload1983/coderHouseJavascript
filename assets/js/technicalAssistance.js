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

const createTicket = (e) => {
  e.preventDefault();
  spinnerBorderTechnicalAssistance.classList.remove("visually-hidden");

  const ticket = new Ticket({
    firstName: e.target.children[0].children[1].value,
    lastName: e.target.children[1].children[1].value,
    celphone: e.target.children[2].children[1].value,
    email: e.target.children[3].children[1].value,
    message: e.target.children[4].children[1].value,
  });

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(ticket),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      Swal.fire({
        title: "Ticket creado",
        text: `${json.firstName} ${json.lastName}, tu ticket fue creado con exito.
          Nos comunicaremos con usted a la brevedad.
          `,
        icon: "success",
        iconColor: "#ec811c",
        confirmButtonColor: "#ec811c",
      });
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: `${ticket.firstName} ${ticket.lastName}, no se pudo crear tu ticket.
      Intenta mas tarde.
    `,
        icon: "error",
        confirmButtonColor: "#e33",
      });
    })
    .finally(() => {
      e.target.reset();
      spinnerBorderTechnicalAssistance.classList.add("visually-hidden");
    });
};

formTicket.addEventListener("submit", createTicket);
