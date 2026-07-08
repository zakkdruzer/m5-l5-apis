// Mini 6

const galeriaMini6 = document.getElementById('galeria-mini6');
const estadoMini6 = document.getElementById('estado-mini6');
const botonRecargarMini6 = document.getElementById('btn-recargar-mini6');

function crearTarjetaUsuario(usuario) {
  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-lg-3';

  const card = document.createElement('div');
  card.className = 'card h-100 text-center';

  const img = document.createElement('img');
  img.src = usuario.picture.large;
  img.alt = `${usuario.name.first} ${usuario.name.last}`;
  img.className = 'card-img-top';

  const body = document.createElement('div');
  body.className = 'card-body';

  const nombre = document.createElement('h6');
  nombre.className = 'card-title mb-1';
  nombre.textContent = `${usuario.name.first} ${usuario.name.last}`;

  const email = document.createElement('p');
  email.className = 'card-text small mb-1';
  email.textContent = usuario.email;

  const pais = document.createElement('p');
  pais.className = 'card-text small text-muted mb-0';
  pais.textContent = usuario.location.country;

  body.appendChild(nombre);
  body.appendChild(email);
  body.appendChild(pais);

  card.appendChild(img);
  card.appendChild(body);
  col.appendChild(card);

  return col;
}

async function cargarUsuariosMini6() {
  galeriaMini6.innerHTML = '';
  estadoMini6.textContent = 'Cargando usuarios...';
  botonRecargarMini6.disabled = true;

  try {
    const resp = await fetch('https://randomuser.me/api/?results=8');
    const data = await resp.json(); // data.results es el array con los usuarios.[web:102][web:104][web:110]

    galeriaMini6.innerHTML = '';
    data.results.forEach((u) => {
      const tarjeta = crearTarjetaUsuario(u);
      galeriaMini6.appendChild(tarjeta);
    });

    estadoMini6.textContent = 'Usuarios cargados. Puedes recargar para ver otros.';
  } catch (error) {
    console.error('Error al cargar usuarios de randomuser:', error);
    estadoMini6.textContent =
      'No se pudieron cargar los usuarios. Intenta nuevamente.';
  } finally {
    botonRecargarMini6.disabled = false;
  }
}

// Carga inicial
cargarUsuariosMini6();

// Botón "Recargar"
botonRecargarMini6.addEventListener('click', cargarUsuariosMini6);