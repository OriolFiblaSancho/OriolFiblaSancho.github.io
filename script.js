// Lista de posibles títulos a mostrar en secuencia
const titles = [
  "Desarrollador Web",
  "Frontend Developer",
  "Programador JavaScript",
  "Resolvedor de Problemas"
];

const jobTitle = document.querySelector("#job-title");
const letters = "$%&#@!1234567890?¿*+/\\~^[]{}|:;_<>-.,'`";

let interval = null;
let iteration = 0;
let titleIndex = 0;
let isErasing = false;
let currentText = "";

// Guardar el texto original del dataset como primer título si no está en la lista
if (!titles.includes(jobTitle.dataset.value)) {
  titles.unshift(jobTitle.dataset.value);
}

// Función para iniciar la animación (construcción o borrado)
function startAnimation() {
  // Limpia cualquier intervalo existente
  clearInterval(interval);
  
  // Si estamos en modo borrado
  if (isErasing) {
    currentText = jobTitle.innerText;
    iteration = 0; // Inicia desde el lado izquierdo
    
    interval = setInterval(() => {
      // Reemplazar caracteres uno por uno con caracteres aleatorios desde la izquierda
      jobTitle.innerText = currentText
        .split("")
        .map((letter, index) => {
          if (index <= iteration) {
            return letters[Math.floor(Math.random() * letters.length)];
          }
          return letter;
        })
        .join("");
      
      // Avanzar la iteración
      if (iteration < currentText.length) {
        iteration += 0.5; // Velocidad de la ola
      } else {
        // Terminó de borrar
        clearInterval(interval);
        isErasing = false;
        titleIndex = (titleIndex + 1) % titles.length; // Avanzar al siguiente título
        setTimeout(startAnimation, 0); // Pausa antes de construir el siguiente
      }
    }, 50);
  } else {
    // Modo construcción
    currentText = titles[titleIndex];
    iteration = 0; // Inicia desde el lado izquierdo
    
    interval = setInterval(() => {
      // Construye la nueva cadena de texto con la ola desde la izquierda
      jobTitle.innerText = currentText
        .split("")
        .map((letter, index) => {
          if (index <= iteration) {
            return currentText[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");
      
      // Si hemos terminado de revelar todo el texto
      if (iteration >= currentText.length) {
        clearInterval(interval);
        // Espera un momento antes de comenzar a borrar
        setTimeout(() => {
          isErasing = true;
          startAnimation();
        }, 2000); // Mantiene el texto completo visible por 2 segundos
      }
      
      iteration += 1; // Velocidad de la ola
    }, 50);
  }
}

// Inicia la animación 1 segundo después de cargar la página
setTimeout(startAnimation, 1000);

function copyEmail() {
  const email = document.querySelector('.email-text').textContent;
  navigator.clipboard.writeText(email).then(() => {
      const button = document.querySelector('.copy-button');
      const originalText = button.textContent;
      button.textContent = 'Copiado!';
      setTimeout(() => {
          button.textContent = originalText;
      }, 2000);
  });
}