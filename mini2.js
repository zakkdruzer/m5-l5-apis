// Mini 2

const lista = document.getElementById('lista');
const estado = document.getElementById('estado');
const inputBusqueda = document.getElementById('busqueda');

const empleados = []; // aquí guardamos referencia al div + datos para filtrar

async function cargarEmpleados() {
  try {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!resp.ok) {
      throw new Error('HTTP ' + resp.status);
    }

    const users = await resp.json();

    // Ya llegaron los datos: ocultamos el estado de carga
    estado.style.display = 'none';

    users.forEach((u) => {
      const div = document.createElement('div');
      div.classList.add('empleado');

      div.innerHTML = `
        <h2>${u.name}</h2>
        <p><strong>Email:</strong> ${u.email}</p>
        <p><strong>Teléfono:</strong> ${u.phone}</p>
        <p><strong>Ciudad:</strong> ${u.address.city}</p>
      `;

      lista.appendChild(div);

      empleados.push({
        el: div,
        nombre: u.name,
        email: u.email,
      });
    });
  } catch (error) {
    estado.textContent = 'Error al cargar empleados';
    console.error('Error al obtener usuarios:', error);
  }
}

inputBusqueda.addEventListener('input', () => {
  const q = inputBusqueda.value.toLowerCase();

  empleados.forEach((e) => {
    const coincideNombre = e.nombre.toLowerCase().includes(q);
    const coincideEmail = e.email.toLowerCase().includes(q);

    e.el.style.display = coincideNombre || coincideEmail ? '' : 'none';
  });
});

cargarEmpleados();