function generarCombinaciones(n) {
  const filas = Math.pow(2, n);
  const combinaciones = [];

  for (let i = 0; i < filas; i++) {
    const bin = i.toString(2).padStart(n, "0").split("").map(Number);
    combinaciones.push(bin);
  }

  return combinaciones;
}

function evaluarOperacion(op, val1, val2) {
  switch (op) {
    case "Y":
      return val1 && val2;
    case "O":
      return val1 || val2;
    case "X O R":
      return val1 !== val2;
    case "COND":
      return !val1 || val2;
    case "BICOND":
      return val1 === val2;
    default:
      return false;
  }
}

function generarTabla() {
  const numVars = parseInt(document.getElementById("variables").value);
  const operador = document.getElementById("operador").value;
  const combinaciones = generarCombinaciones(numVars);

  const variables = ["A", "B", "C", "D"].slice(0, numVars);
  let resultadoHTML = "<table><thead><tr>";

  variables.forEach((v) => {
    resultadoHTML += `<th>${v}</th>`;
  });

  resultadoHTML += `<th>Resultado</th></tr></thead><tbody>`;

  combinaciones.forEach((fila) => {
    resultadoHTML += "<tr>";
    fila.forEach((v) => {
      resultadoHTML += `<td>${v}</td>`;
    });

    // Evaluamos la operación lógica solo sobre las dos primeras variables (A y B)
    const resultado = evaluarOperacion(operador, fila[0], fila[1]) ? 1 : 0;
    resultadoHTML += `<td>${resultado}</td></tr>`;
  });

  resultadoHTML += "</tbody></table>";

  document.getElementById("tabla").innerHTML = resultadoHTML;
}
