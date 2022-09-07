// ############################
function calcularTotal(precio, cuotas) {
  switch (cuotas) {
    case 3:
      return (precio * 1.1).toFixed(2);
    //   break;
    case 6:
      return (precio * 1.15).toFixed(2);
    //   break;
    case 12:
      return (precio * 1.2).toFixed(2);
    //   break;
  }
}

function calcularCuota(total, cuotas) {
  return (total / cuotas).toFixed(2);
}

function solicitarNumeroPositivo(mensaje) {
  let numero = Number(prompt(mensaje));
  while (numero <= 0 || isNaN(numero)) {
    numero = Number(prompt(mensaje));
  }
  return numero;
}

let precio = solicitarNumeroPositivo("Ingrese precio: ");

let cuotas = solicitarNumeroPositivo(
  "Seleccione cantidad de cuotas: 3 - 6 - 12 "
);
while ((cuotas !== 3 && cuotas !== 6 && cuotas !== 12) || isNaN(cuotas)) {
  cuotas = solicitarNumeroPositivo(
    "Seleccione cantidad de cuotas: 3 - 6 - 12 "
  );
}

let total = calcularTotal(precio, cuotas);
alert(`El total a pagar con recargo es: $${total}`);
alert(`${cuotas} cuotas de $${calcularCuota(total, cuotas)}`);

// ################################################
const agregarIva = (precio) => (precio * 1.21).toFixed(2);
const calcularDescuento = (precio, descuento) =>
  (precio - (precio * descuento) / 100).toFixed(2);

let precioSinIva = solicitarNumeroPositivo("Ingrese precio sin iva:");
alert(`El precio con iva es:${agregarIva(precioSinIva)}`);

let descuento = solicitarNumeroPositivo("Ingrese porcentaje de descuento: ");
alert(
  `El precio con descuento es:${calcularDescuento(
    agregarIva(precioSinIva),
    descuento
  )}`
);
