const ramosData = {
  "I semestre": [
    { nombre: "Matemáticas I", desbloquea: ["Matemáticas II", "Introducción a la Mecánica", "Bioestadística"] },
    { nombre: "Química General I", desbloquea: ["Química General II"] },
    { nombre: "Biología Celular", desbloquea: ["Bioquímica"] },
    { nombre: "Zoología" }
  ],
  "II semestre": [
    { nombre: "Matemáticas II", requiere: ["Matemáticas I"], desbloquea: ["Álgebra Lineal y Cálculo Vectorial", "Termodinámica", "Microeconomía"] },
    { nombre: "Química General II", requiere: ["Química General I"], desbloquea: ["Química Orgánica", "Termodinámica"] },
    { nombre: "Introducción a la Mecánica", requiere: ["Matemáticas I"], desbloquea: ["Óptica y Electromagnetismo"] },
    { nombre: "Biología Vegetal" }
  ],
  "III semestre": [
    { nombre: "Álgebra Lineal y Cálculo Vectorial", requiere: ["Matemáticas II"], desbloquea: ["Métodos y Aplicaciones de las Ecuaciones Diferenciales"] },
    { nombre: "Óptica y Electromagnetismo", requiere: ["Introducción a la Mecánica"], desbloquea: ["Termodinámica"] },
    { nombre: "Química Orgánica", requiere: ["Química General II"], desbloquea: ["Bioquímica"] },
    { nombre: "Introducción a la Ingeniería Genética" },
    { nombre: "Acuicultura" }
  ],
  "IV semestre": [
    { nombre: "Métodos y Aplicaciones de las Ecuaciones Diferenciales", requiere: ["Álgebra Lineal y Cálculo Vectorial"], desbloquea: ["Cinética y Electroquímica", "Optimización"] },
    { nombre: "Bioquímica", requiere: ["Química Orgánica", "Biología Celular"], desbloquea: ["Genética", "Microbiología", "Fisicoquímica Macromolecular", "Fisiología General"] },
    { nombre: "Termodinámica", requiere: ["Matemáticas II", "Química General II", "Óptica y Electromagnetismo"], desbloquea: ["Cinética y Electroquímica"] },
    { nombre: "Inglés Científico I", desbloquea: ["Inglés Científico II"] },
    { nombre: "Curso Formación General I" }
  ],
  "V semestre": [
    { nombre: "Genética", requiere: ["Bioquímica"], desbloquea: ["Biología Molecular", "Taller de Ingeniería", "Ecología Microbina y Biotecnología Ambiental", "Bioética"] },
    { nombre: "Microbiología", requiere: ["Bioquímica"], desbloquea: ["Biología Molecular", "Microbiología Industrial"] },
    { nombre: "Bioestadística", requiere: ["Matemáticas I"] },
    { nombre: "Cinética y Electroquímica", requiere: ["Métodos y Aplicaciones de las Ecuaciones Diferenciales", "Termodinámica"], desbloquea: ["Fisicoquímica Macromolecular"] }
  ],
  "VI semestre": [
    { nombre: "Biología Molecular", requiere: ["Genética", "Microbiología"], desbloquea: ["Biotecnología", "Inmunología", "Fisiología Vegetal", "Biotecnología Médica"] },
    { nombre: "Fisicoquímica Macromolecular", requiere: ["Cinética y Electroquímica", "Bioquímica"], desbloquea: ["Instrumentación"] },
    { nombre: "Taller de Ingeniería", requiere: ["Genética"], desbloquea: ["Patentes y Legislación"] },
    { nombre: "Electivo Especialidad o Unidad De Investigación Electiva" },
    { nombre: "Curso Formación General II" }
  ],
  "VII semestre": [
    { nombre: "Biotecnología", requiere: ["Biología Molecular"] },
    { nombre: "Instrumentación", requiere: ["Fisicoquímica Macromolecular"] },
    { nombre: "Fisiología General", requiere: ["Bioquímica"] },
    { nombre: "Ecología Microbina y Biotecnología Ambiental", requiere: ["Genética"] },
    { nombre: "Inglés Científico II", requiere: ["Inglés Científico I"] }
  ],
  "VIII semestre": [
    { nombre: "Inmunología", requiere: ["Biología Molecular"] },
    { nombre: "Microeconomía", requiere: ["Matemáticas II"], desbloquea: ["Evaluación de Proyectos"] },
    { nombre: "Fisiología Vegetal", requiere: ["Biología Molecular"], desbloquea: ["Taller de Biotecnología Vegetal"] },
    { nombre: "Optimización", requiere: ["Métodos y Aplicaciones de las Ecuaciones Diferenciales"], desbloquea: ["Operaciones Unitarias"] },
    { nombre: "Bioética", requiere: ["Genética"] },
    { nombre: "Patentes y Legislación", requiere: ["Taller de Ingeniería"] }
  ],
  "IX semestre": [
    { nombre: "Microbiología Industrial", requiere: ["Microbiología"] },
    { nombre: "Biotecnología Médica", requiere: ["Biología Molecular"] },
    { nombre: "Operaciones Unitarias", requiere: ["Optimización"] },
    { nombre: "Taller de Biotecnología Vegetal", requiere: ["Fisiología Vegetal"] },
    { nombre: "Unidad de Investigaciones de Seminario de Título" }
  ],
  "X semestre": [
    { nombre: "Evaluación de Proyectos", requiere: ["Microeconomía"] },
    { nombre: "Seminario de Título" }
  ]
};

const malla = document.getElementById("malla");
const estadoRamos = {};

function crearRamo(nombre, semestre) {
  const div = document.createElement("div");
  div.textContent = nombre;
  div.className = "ramo bloqueado";
  div.dataset.nombre = nombre;
  div.dataset.semestre = semestre;
  div.addEventListener("click", () => aprobarRamo(nombre));
  return div;
}

function crearSemestre(nombre, ramos) {
  const div = document.createElement("div");
  div.className = "semestre";
  const titulo = document.createElement("h2");
  titulo.textContent = nombre;
  div.appendChild(titulo);
  ramos.forEach(r => {
    const ramoDiv = crearRamo(r.nombre, nombre);
    div.appendChild(ramoDiv);
    estadoRamos[r.nombre] = { aprobado: false, requiere: r.requiere || [], desbloquea: r.desbloquea || [], div: ramoDiv };
  });
  return div;
}

function aprobarRamo(nombre) {
  const ramo = estadoRamos[nombre];
  if (ramo.div.classList.contains("bloqueado")) return;
  if (ramo.aprobado) return;
  ramo.aprobado = true;
  ramo.div.classList.add("aprobado");

  ramo.desbloquea.forEach(nombreDesbloqueado => {
    const desbloqueado = estadoRamos[nombreDesbloqueado];
    if (desbloqueado && desbloqueado.requiere.every(r => estadoRamos[r]?.aprobado)) {
      desbloqueado.div.classList.remove("bloqueado");
      desbloqueado.div.classList.add("desbloqueado");
    }
  });
}

// Inicialización
Object.entries(ramosData).forEach(([semestre, ramos]) => {
  const divSemestre = crearSemestre(semestre, ramos);
  malla.appendChild(divSemestre);
});

// Desbloquear iniciales
Object.values(estadoRamos).forEach(ramo => {
  if (!ramo.requiere.length) {
    ramo.div.classList.remove("bloqueado");
    ramo.div.classList.add("desbloqueado");
  }
});
