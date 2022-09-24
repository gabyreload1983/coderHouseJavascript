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
  const spinnerBorder = document.querySelector(".spinner-border");
  spinnerBorder.classList.remove("visually-hidden");
  setTimeout(() => {
    const form = e.target.children;
    const contact = new Contact({
      firstName: form[0].children[1].value,
      lastName: form[1].children[1].value,
      email: form[2].children[1].value,
      message: form[3].children[1].value,
    });
    e.target.reset();

    const messegeResponse = document.querySelector("#messegeResponse");
    messegeResponse.classList.remove("d-none");
    messegeResponse.innerHTML = `
      <strong>${contact.firstName} ${contact.lastName}, recibimos tu mensaje con exito. </br>
      Nos comunicaremos con usted a la brevedad.
      </strong>
      `;
    spinnerBorder.classList.add("visually-hidden");
  }, 1000);
};

const formContact = document.querySelector("#formContact");
formContact.addEventListener("submit", validateForm);
