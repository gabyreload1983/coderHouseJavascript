const formContact = document.querySelector("#formContact");
const spinnerBorderContact = document.querySelector("#spinnerBorderContact");
class Contact {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.message = user.message;
  }
}

const sendEmail = (e) => {
  e.preventDefault();
  spinnerBorderContact.classList.remove("visually-hidden");

  const contact = new Contact({
    firstName: e.target.children[0].children[1].value,
    lastName: e.target.children[1].children[1].value,
    email: e.target.children[2].children[1].value,
    message: e.target.children[3].children[1].value,
  });

  const serviceID = "default_service";
  const templateID = "template_9j3zeeo";

  emailjs.send(serviceID, templateID, contact).then(
    () => {
      Swal.fire({
        title: "Mensaje enviado!",
        text: `${contact.firstName} ${contact.lastName},recibimos tu mensaje con exito.
        Nos comunicaremos con usted a la brevedad.
        `,
        icon: "success",
        iconColor: "#ec811c",
        confirmButtonColor: "#ec811c",
      });
      e.target.reset();
      spinnerBorderContact.classList.add("visually-hidden");
    },
    (err) => {
      Swal.fire({
        title: "Error",
        text: `${contact.firstName} ${contact.lastName},no pudimos enviar tu mensaje.
        Intenta mas tarde.
      `,
        icon: "error",
        confirmButtonColor: "#e33",
      });
      e.target.reset();
      spinnerBorderContact.classList.add("visually-hidden");
    }
  );
};

formContact.addEventListener("submit", sendEmail);
