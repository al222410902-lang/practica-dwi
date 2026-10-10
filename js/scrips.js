// Carga de eventos iniciales al renderizar la página
document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  if (taskInput) {
    taskInput.addEventListener('keypress', handleTaskKey);
    renderTasks();
  }
});

// --- PROYECTO 1: CALCULADORA DE EDAD ---
function calculateAge() {
  const inputElem = document.getElementById('birth-date');
  const resultElem = document.getElementById('age-result');
  if (!inputElem || !resultElem) return;

  const input = inputElem.value.trim();
  const parts = input.split('/');

  if (parts.length !== 3) {
    resultElem.textContent = "Ingrese una fecha válida (DD/MM/AAAA)";
    resultElem.style.color = "red";
    return;
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const birthDate = new Date(year, month, day);
  const today = new Date();

  if (isNaN(birthDate.getTime()) || birthDate > today || day > 31 || month > 11) {
    resultElem.textContent = "Fecha inválida o futura.";
    resultElem.style.color = "red";
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
    months += 12;
  }

  resultElem.style.color = "#2e7d32";
  resultElem.textContent = `Tienes ${years} años y ${months} meses de edad.`;
}

// --- PROYECTO 2: CONVERTIDOR DE TEMPERATURA ---
function checkTempForm() {
  const val = document.getElementById('temp-val')?.value;
  const from = document.getElementById('unit-from')?.value;
  const to = document.getElementById('unit-to')?.value;
  const btn = document.getElementById('convert-btn');

  if (btn) {
    btn.disabled = !(val !== '' && val !== undefined && from !== '' && to !== '');
  }
}

function convertTemp() {
  const val = parseFloat(document.getElementById('temp-val').value);
  const from = document.getElementById('unit-from').value;
  const to = document.getElementById('unit-to').value;
  let tempInCelsius = val;

  if (from === 'Fahrenheit') tempInCelsius = (val - 32) * (5 / 9);
  if (from === 'Kelvin') tempInCelsius = val - 273.15;

  let result = tempInCelsius;
  if (to === 'Fahrenheit') result = (tempInCelsius * 9 / 5) + 32;
  if (to === 'Kelvin') result = tempInCelsius + 273.15;

  document.getElementById('temp-result').textContent = `${val} ${from} es ${result.toFixed(1)} ${to}`;
}

// --- PROYECTO 3: GESTIÓN DE TAREAS ---
let tasks = [];

function handleTaskKey(event) {
  if (event.key === 'Enter') {
    const input = document.getElementById('task-input');
    const text = input.value.trim();
    if (text !== '') {
      tasks.push({ descripcion: text, completada: false });
      input.value = '';
      renderTasks();
    }
  }
}

function toggleTask(index) {
  tasks[index].completada = !tasks[index].completada;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  const listElem = document.getElementById('task-list');
  if (!listElem) return;
  
  listElem.innerHTML = '';

  const sortedTasks = tasks.map((task, originalIndex) => ({ ...task, originalIndex }))
    .sort((a, b) => a.completada - b.completada);

  sortedTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completada ? 'completed' : ''}`;
    
    li.innerHTML = `
      <div>
        <input type="checkbox" ${task.completada ? 'checked' : ''} onchange="toggleTask(${task.originalIndex})">
        <span>${task.descripcion}</span>
      </div>
      <button class="delete-btn" onclick="deleteTask(${task.originalIndex})">🗑️</button>
    `;
    listElem.appendChild(li);
  });
}