const renderNavLoginHome = (user = false) => {
  const navLogin = document.querySelector("#navLogin");
  navLogin.innerHTML = "";
  if (user) {
    navLogin.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${user.firstName} ${user.lastName}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownUser">
             <li><a class="dropdown-item" id="closeSession" href="#">Cerrar</a></li>
            </ul>
            `;

    const closeSession = document.querySelector("#closeSession");
    closeSession.addEventListener("click", () => {
      sessionStorage.clear();
      renderNavLoginHome();
    });
  } else {
    navLogin.innerHTML = `
            <a class="nav-link" href="./pages/login.html">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-person-circle me-2"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
             Ingreso/Registro
            </a>
          `;
  }
};

const user = JSON.parse(sessionStorage.getItem("user")) || false;

renderNavLoginHome(user);
