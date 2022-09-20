class User {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.celphone = user.celphone;
    this.email = user.email;
    this.password = user.password;
  }
  registerOk() {
    alert(`${this.firstName}, gracias por registrarse!`);
  }
}

const signup = () => {
  const data = {
    firstName: prompt("Ingrese su nombre"),
    lastName: prompt("Ingrese su apellido"),
    celphone: prompt("Ingrese su celular"),
    email: prompt("Ingrese su email"),
    password: prompt("Ingrese su password"),
    confirmPassword: prompt("Confirme su password"),
  };
  while (data.password !== data.confirmPassword) {
    alert("Las contraseñas no coinciden");
    data.password = prompt("Ingrese su password");
    data.confirmPassword = prompt("Confirme su password");
  }
  const user = new User(data);
  user.registerOk();
};

signup();
