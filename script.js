//Función que me aplica el estilo a la opciòn seleccionada y quita la previamente seleccionada
function seleccionar(link) {
  var opciones = document.querySelectorAll('#links  a');
  opciones[0].className = "";
  opciones[1].className = "";
  opciones[2].className = "";
  opciones[3].className = "";
  opciones[4].className = "";
  link.className = "seleccionado";

  //Hacemos desaparecer el menu una vez que se ha seleccionado una opcion
  //en modo responsive
  var x = document.getElementById("nav");
  x.className = "";
}

//función que muestra el menu responsive
function responsiveMenu() {
  var x = document.getElementById("nav");
  if (x.className === "") {
    x.className = "responsive";
  } else {
    x.className = "";
  }
}

//detecto el scrolling para aplicar la animación del la barra de habilidades
window.onscroll = function () { efectoHabilidades() };


function abrirLibro(libro) {
  document.getElementById('vista-libros').style.display = 'none';
  const vistaLibro = document.getElementById('vista-libro');
  const titulo = document.getElementById('titulo-libro');
  const contenido = document.getElementById('contenido-capitulos');

  vistaLibro.classList.remove('oculto');
  vistaLibro.classList.add('vista-activa');

  titulo.innerText = libro.charAt(0).toUpperCase() + libro.slice(1);

  fetch(`capitulos/${libro}.html`)
    .then(response => response.text())
    .then(html => {
      contenido.innerHTML = html;
    })
    .catch(err => {
      contenido.innerHTML = '<p>Error al cargar los capítulos.</p>';
    });
}

function volver() {
  document.getElementById('vista-libro').classList.add('oculto');
  document.getElementById('vista-libro').classList.remove('vista-activa');
  document.getElementById('vista-libros').style.display = 'block';
}

const btnIzquierda = document.querySelector('.btn-carrusel.izquierda');
const btnDerecha = document.querySelector('.btn-carrusel.derecha');
const contenedor = document.querySelector('.contenedor-libros');

const libro = document.querySelector('.libro');
const libroWidth = libro.offsetWidth + 180; // ancho + gap
let index = 0;

btnDerecha.addEventListener('click', () => {
  index++;
  moverCarrusel();
});

btnIzquierda.addEventListener('click', () => {
  index--;
  moverCarrusel();
});

function moverCarrusel() {
  const maxIndex = contenedor.children.length - Math.floor(contenedor.parentElement.offsetWidth / libroWidth);
  if (index < 0) index = 0;
  if (index > maxIndex) index = maxIndex;
  const desplazamiento = libroWidth * index;
  contenedor.style.transform = `translateX(-${desplazamiento}px)`;
}

// Responsivo: recalcular al cambiar tamaño
window.addEventListener('resize', () => {
  moverCarrusel();
});
document.addEventListener('DOMContentLoaded', () => {
  const sinContenido = document.querySelectorAll('.sin-contenido');

  sinContenido.forEach(item => {
    item.addEventListener('click', () => {
      alert('⚠️ Aún no contamos con el contenido de este libro.');
    });
  });
});
