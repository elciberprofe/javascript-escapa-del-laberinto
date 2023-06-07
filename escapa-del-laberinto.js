/*
Título: Juego Escapa del Laberinto.
Nivel Educativo: Ciclo Formativo de Grado Superior
Curso: DAM, DAW o ASIR
Conocimientos del alumnado I: Tipos de Datos, Constantes y Variables 
Conocimientos del alumnado II: Operaciones Aritméticas, Lógicas y Relacionales
Conocomientos del alumnado III: Instrucciones de Control Condicional
Conocomientos del alumnado IV: Instrucciones de Control Iterativa
Conocomientos del alumnado V: Estructuras de datos (Vectores)
Conocomientos del alumnado VI: Funciones y Procedimientos
Conocomientos del alumnado VII: Estructuras de datos (Objeto básico)
Fecha: 06 / 06 / 2023
Autor: Xavi Garcia (ElCiberProfe)
Web: https://www.elciberprofe.com
Lenguaje: JavaScript
*/

//CONSTANTES Y VARIABLES PARA EL CONTROL DE LA EVOLUCIÓN DE LA PARTIDA
const jugador = document.createElement("img");
jugador.src = "./jugador.png";
let posJugador = { fila: 0, columna: 7 }; //Coordenadas del jugador (fila y columna), valores de 0 a 7
let numeroMovimientos = 0;
const movimientosMaximos = 25;

//VECTOR MULTIDIMENSIONAL (8x8) PROPORCIONADO POR EL PROFESORADO
//0 - Casilla libre (se puede acceder a ella "camino")
//1 - Casilla ocupada (no se puede acceder "muro")
//2 - Casilla inicial (donde empieza el personaje)
//3 - Casilla final (donde debe terminar el personaje)
const matrizLaberinto = [
  [1, 0, 0, 0, 1, 1, 0, 2],
  [0, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 1, 0, 3],
];

//GENERACIÓN DEL MAPA (tabla) - A partir de una matriz de ejemplo proporcionada por el profesorado.
const mapa = document.createElement("table");
//Recorrer el vector multidimensional: Crear las filas y columnas de la tabla (casillas del mapa)
for (let i = 0; i < matrizLaberinto.length; i++) {
  //Crear el elemento HTML fila (tr) a cada iteración del bucle externo
  const fila = document.createElement("tr");
  //Guardar la fila de la tabla del vector multidimensional
  const filaLaberinto = matrizLaberinto[i];
  //Recorrer el vector unidimensional que contiene cada posición del vector matrizLaberinto
  for (let j = 0; j < filaLaberinto.length; j++) {
    //Crear el elemento HTML column/celda (td) a cada iteración del bucle interno
    const celda = document.createElement("td");
    //Para cada posición comprobar su valor y determinar con una estructura de control condicional (switch):
    switch (filaLaberinto[j]) {
      //Casilla libre (estilos CSS de camino)
      case 0:
        celda.className = "camino";
        break;
      //Casilla ocupada (estilos CSS de muro)
      case 1:
        celda.className = "muro";
        break;
      //Casilla inicial del jugador (estilos CSS de inicio)
      //Casilla donde se debe mostrar el jugador al inicio
      case 2:
        celda.className = "inicio";
        celda.appendChild(jugador);
        break;
      //Casilla inicial del jugador (estilos CSS de final)
      case 3:
        celda.className = "final";
        break;
      default:
        break;
    }
    //Añadimos cada celda/columna al elemento HTML fila
    fila.appendChild(celda);
  }
  //Añadimos cada fila al elemento HTML tabla
  mapa.appendChild(fila);
}
//Añadimos la tabla al elemento BODY de la página
document.body.appendChild(mapa);

//LÓGICA DEL JUEGO ESCAPA DEL LABERINTO

// ---------------------------------------------------------------
// -------------------- Control del Personaje --------------------
// ---------------------------------------------------------------

//Procedimiento que moviliza el personaje a la celda estipulada
function moverPersonaje() {
  //Mover el jugador a la nueva posición
  const fila = posJugador.fila;
  const columna = posJugador.columna;
  const celda = mapa.rows[fila].cells[columna];
  celda.appendChild(jugador);
  //Incrementar la variable de movimientos
  numeroMovimientos++;
}

//Procedimiento que comprueba si se se ha superado el nivel o el número máximo de movimientos
function comprobarVictoria() {
  //Controlar si ha llegado al final del laberinto
  if (numeroMovimientos > movimientosMaximos) {
    alert(
      `Has superado el número máximo de movimientos permitidos para el nivel. Vuelve a intentarlo.`
    );
  } else if (matrizLaberinto[posJugador.fila][posJugador.columna] == 3) {
    setTimeout(() => {
      alert(
        `¡Felicidades has superado el nivel con ${numeroMovimientos} moviminetos!`
      );
    }, 200);
  }
}

//Procedimiento que determina si la dirección que recibe es válida (posición a la que se quiere mover el jugador )
function controlaMovimiento(direccion) {
  //Controlar los movimientos no permitidos (Salida del mapa)
  //posJugador.fila es Fila 0 quiere moverse a Dirección: Arriba (0)
  //posJugador.columna es Columna 7 quiere moverse a Dirección: Derecha (1)
  //posJugador.fila es Fila 7 quiere moverse a Dirección: Abajo (2)
  //posJugador.columna es Columna 0 quiere moverse a Dirección: Izquierda (3)
  let fila = posJugador.fila;
  let columna = posJugador.columna;
  switch (direccion) {
    case 0: //Ariba (movimiento a la fila superior)
      //EXPLICACIÓN DEL CASO PASO A PASO MOVIMIENTOS + DEBUG + REFACTORIZADO
      if (fila != 0 && matrizLaberinto[fila - 1][columna] != 1) {
        posJugador.fila--;
      }
      /*if (fila == 0) {
        console.log("Movimiento fuera del mapa: Arriba");
      } else if (matrizLaberinto[fila - 1][columna] == 1) {
        console.log("Movimiento no permitido: Muro Arriba");
      } else {
        posJugador.fila--;
      }*/
      break;
    case 1: //Derecha (movimiento a la columna contigua derecha)
      if (columna != 7 && matrizLaberinto[fila][columna + 1] != 1) {
        posJugador.columna++;
      }
      /*if (columna == 7) {
        console.log("Movimiento fuera del mapa: Derecha");
      } else if (matrizLaberinto[fila][columna + 1] == 1) {
        console.log("Movimiento no permitido: Muro Derecha");
      } else {
        posJugador.columna++;
      }*/
      break;
    case 2: //Abajo (movimiento a la fila inferior)
      if (fila != 7 && matrizLaberinto[fila + 1][columna] != 1) {
        posJugador.fila++;
      }
      /*if (fila == 7) {
        console.log("Movimiento fuera del mapa: Abajo");
      } else if (matrizLaberinto[fila + 1][columna] == 1) {
        console.log("Movimiento no permitido: Muro Abajo");
      } else {
        posJugador.fila++;
      }*/
      break;
    case 3: //Izquierda (movimiento a la columna contigua izquierda)
      if (columna != 0 && matrizLaberinto[fila][columna - 1] != 1) {
        posJugador.columna--;
      }
      /*if (columna == 0) {
        console.log("Movimiento fuera del mapa: Izquierda");
      } else if (matrizLaberinto[fila][columna - 1] == 1) {
        console.log("Movimiento no permitido: Muro Izquierda");
      } else {
        posJugador.columna--;
      }*/
      break;

    default:
      break;
  }
  //Mover el personaje a la celda estipulada
  moverPersonaje();
  //Comprobar si se ha llegado al final del laberinto o se ha superado el número máximo de movimientos
  comprobarVictoria();
}

// ---------------------------------------------------------------
// -------------------- Eventos de Teclado -----------------------
// ---------------------------------------------------------------
//Obtener la tecla que ha clicado el jugador con una estructura de control condicional (switch)
//Codificar las 4 direcciones de movimiento del personaje - Agujas del Reloj (0: Arriba, 1:Derecha, 2: Abajo, 3: Izquierda)
addEventListener("keydown", (evento) => {
  switch (evento.key) {
    case "ArrowUp":
      controlaMovimiento(0);
      break;
    case "ArrowRight":
      controlaMovimiento(1);
      break;
    case "ArrowDown":
      controlaMovimiento(2);
      break;
    case "ArrowLeft":
      controlaMovimiento(3);
      break;
    default:
      break;
  }
});
