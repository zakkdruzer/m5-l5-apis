// Mini 5

let paginaActual = 1;
const LIMITE = 5;

console.log('mini5.js cargado', paginaActual);

const contenedor = document.getElementById('lista-mini5');
const btn = document.getElementById('btn-cargar-mas');
console.log('btn-cargar-mas', btn);

function crearTarjetaPost(post) {
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6';

  const card = document.createElement('div');
  card.className = 'card h-100';

  const body = document.createElement('div');
  body.className = 'card-body';

  const titulo = document.createElement('h3');
  titulo.className = 'h6 card-title';
  titulo.textContent = `#${post.id} – ${post.title}`;

  const texto = document.createElement('p');
  texto.className = 'card-text small';
  const truncado =
    post.body.length > 100 ? post.body.slice(0, 100) + '…' : post.body;
  texto.textContent = truncado;

  body.appendChild(titulo);
  body.appendChild(texto);
  card.appendChild(body);
  col.appendChild(card);

  return col;
}

async function cargarPagina() {
  btn.disabled = true;
  btn.textContent = 'Cargando...';

  const url = `https://jsonplaceholder.typicode.com/posts?_limit=${LIMITE}&_page=${paginaActual}`;

  try {
    const resp = await fetch(url);
    const posts = await resp.json();

    // Si no hay posts (array vacío), ocultamos el botón.
    if (posts.length === 0) {
      btn.style.display = 'none';
      return;
    }

    posts.forEach((p) => {
      const tarjeta = crearTarjetaPost(p);
      contenedor.appendChild(tarjeta);
    });

    // Preparar siguiente página
    paginaActual += 1;

    btn.disabled = false;
    btn.textContent = 'Cargar más';
  } catch (error) {
    console.error('Error al cargar posts paginados:', error);
    btn.disabled = false;
    btn.textContent = 'Reintentar';
  }
}

// Al cargar la página, mostramos los primeros 5 posts (page=1)
cargarPagina();

// Al hacer clic, cargamos la siguiente página y agregamos posts debajo
btn.addEventListener('click', () => {
  cargarPagina();
});