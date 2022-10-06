const formContact = document.querySelector("#formContact");
const spinnerBorderContact = document.querySelector("#spinnerBorderContact");
class Contact {
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
  spinnerBorderContact.classList.remove("visually-hidden");

  setTimeout(() => {
    const form = e.target.children;
    const contact = new Contact({
      firstName: form[0].children[1].value,
      lastName: form[1].children[1].value,
      email: form[2].children[1].value,
      message: form[3].children[1].value,
    });

    sendEmail(contact)
      ? Swal.fire({
          title: "Mensaje enviado!",
          text: `${contact.firstName} ${contact.lastName},recibimos tu mensaje con exito.
      Nos comunicaremos con usted a la brevedad.
      `,
          icon: "success",
        })
      : Swal.fire({
          title: "Error",
          text: `${contact.firstName} ${contact.lastName},no pudimos enviar tu mensaje.
      Intenta mas tarde.
    `,
          icon: "error",
        });

    e.target.reset();
    spinnerBorderContact.classList.add("visually-hidden");
  }, 1000);
};

const sendEmail = (contact) => {
  return true;
};

formContact.addEventListener("submit", validateForm);
