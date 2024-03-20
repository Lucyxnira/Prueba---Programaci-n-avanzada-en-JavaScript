// Función para reproducir sonido
function reproducirSonido(sonido) {
    const player = document.getElementById('player');
    player.src = sonido;
    player.play();
    console.log("Reproduciendo sonido:", sonido);
}

// Definición de clases
class Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    this.nombre = nombre;
    this.edad = edad;
    this.img = img;
    this.comentarios = comentarios;
    this.sonido = sonido;
  }

  getNombre() {
    return this.nombre;
  }

  getEdad() {
    return this.edad;
  }

  getImg() {
    return this.img;
  }

  setComentarios(comentarios) {
    this.comentarios = comentarios;
  }

  getSonido() {
    return this.sonido;
  }
}

class Leon extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  rugir() {
    console.log("¡Rugido!");
  }
}

class Lobo extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  aullar() {
    console.log("¡Aullido!");
  }
}

class Oso extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  gruñir() {
    console.log("¡Gruñido!");
  }
}

class Serpiente extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  sisear() {
    console.log("¡Siseo!");
  }
}

class Aguila extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  chillar() {
    console.log("¡Chillido!");
  }
}

// Imágenes y sonidos de animales
async function obtenerImagenesYSonidosAnimales(animales) {
  const imagenes = {};
  const sonidos = {};

  for (let animal of animales) {
    imagenes[animal.name] = `assets/img/${animal.imagen}`;
    sonidos[animal.name] = `assets/sound/${animal.sonido}`;
  }

  return { imagenes, sonidos };
}

// DOM
const DOMManipulation = (() => {
    // Función para mostrar animales en la tabla del HTML
    function mostrarAnimalEnTabla(animal) {
      const tablaAnimales = document.getElementById("Animales");
      tablaAnimales.innerHTML = ""; // Limpiar contenido actual
  
      // Crear fila para el animal y mostrar sus detalles
      const fila = document.createElement("div");
      fila.classList.add("animal-info");
      fila.innerHTML = `
        <div class="card bg-dark text-white m-2" style="width: 18rem;">
          <img src="${animal.img}" class="card-img-top" alt="${animal.nombre}">
          <div class="card-body">
            <h5 class="card-title">${animal.nombre}</h5>
            <p class="card-text">${animal.comentarios}</p>
            <button class="btn btn-primary" onclick="reproducirSonido('${animal.sonido}')">Reproducir sonido</button>
          </div>
        </div>
      `;
      tablaAnimales.appendChild(fila);
    }
  
    return {
      mostrarAnimalEnTabla
    };
})();

// Obtener datos del formulario y crear instancias de animales
document.getElementById("btnRegistrar").addEventListener("click", async () => {
    const nombreAnimal = document.getElementById("animal").value;
    const edadAnimal = document.getElementById("edad").value;
    const comentariosAnimal = document.getElementById("comentarios").value;
  
    // Crear instancia del animal seleccionado
    let animal;
    switch (nombreAnimal) {
      case "Leon":
        animal = new Leon(nombreAnimal, edadAnimal, "assets/imgs/Leon.png", comentariosAnimal, "assets/sounds/Rugido.mp3");
        break;
      case "Lobo":
        animal = new Lobo(nombreAnimal, edadAnimal, "assets/imgs/Lobo.jpg", comentariosAnimal, "assets/sounds/Aullido.mp3");
        break;
      case "Oso":
        animal = new Oso(nombreAnimal, edadAnimal, "assets/imgs/Oso.jpg", comentariosAnimal, "assets/sounds/Gruñido.mp3");
        break;
      case "Serpiente":
        animal = new Serpiente(nombreAnimal, edadAnimal, "assets/imgs/Serpiente.jpg", comentariosAnimal, "assets/sounds/Siseo.mp3");
        break;
      case "Aguila":
        animal = new Aguila(nombreAnimal, edadAnimal, "assets/imgs/aguila.png", comentariosAnimal, "assets/sounds/Chillido.mp3");
        break;
      default:
        console.log("Animal no válido");
        return;
    }
  
    // Mostrar animal en la tabla
    DOMManipulation.mostrarAnimalEnTabla(animal);
  
    // Limpiar formulario
    document.getElementById("animal").selectedIndex = 0;
    document.getElementById("edad").selectedIndex = 0;
    document.getElementById("comentarios").value = "";
});


// Cargar imágenes y sonidos de animales al cargar la página
const url = "animales.json";
window.addEventListener("load", async () => {
  const response = await fetch(url);
  const data = await response.json();
  const { imagenes, sonidos } = await obtenerImagenesYSonidosAnimales(data.animales);
  
  // Actualizar imágenes y sonidos de animales en la tabla
  const animales = data.animales.map(animal => ({
    ...animal,
    img: imagenes[animal.name],
    sonido: sonidos[animal.name]
  }));
  
});
