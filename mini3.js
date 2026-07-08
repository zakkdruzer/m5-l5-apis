// Mini 3

async function fetchSeguro(url, opciones = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const resp = await fetch(url, { ...opciones, signal: controller.signal });
    clearTimeout(timer);

    if (!resp.ok) {
      const mensajes = {
        404: 'Recurso no encontrado',
        500: 'Error del servidor',
      };
      const mensaje = mensajes[resp.status] || 'Ocurrió un error al cargar los datos';
      throw new Error(mensaje);
    }

    return await resp.json();
  } catch (e) {
    if (e.name === 'AbortError') {
      // Cuando AbortController aborta el fetch, el error es de tipo AbortError.
      throw new Error('Tiempo de espera agotado');
    }
    throw e;
  }
}

const resultado = document.getElementById('resultado-mini3');
const btnOk = document.getElementById('btn-ok');
const btn404 = document.getElementById('btn-404');
const btnError = document.getElementById('btn-error');

function mostrarMensaje(tipo, mensaje) {
  // tipo: 'success' | 'warning' | 'danger'
  resultado.className = `alert alert-${tipo} small mb-0`;
  resultado.textContent = mensaje;
}

btnOk.addEventListener('click', async () => {
  mostrarMensaje('secondary', 'Cargando recurso válido...');
  try {
    const data = await fetchSeguro('https://jsonplaceholder.typicode.com/posts/1');
    mostrarMensaje('success', `Recurso cargado correctamente: título "${data.title}"`);
  } catch (e) {
    mostrarMensaje('danger', e.message);
  }
});

btn404.addEventListener('click', async () => {
  mostrarMensaje('secondary', 'Probando recurso inexistente (404)...');
  try {
    await fetchSeguro('https://jsonplaceholder.typicode.com/posts/999999');
    mostrarMensaje('success', 'Esto no debería pasar si el servidor devuelve 404 😅');
  } catch (e) {
    // Deberías ver "Recurso no encontrado" u otro mensaje amigable, no “HTTP 404”.[web:58][web:62]
    mostrarMensaje('warning', e.message);
  }
});

btnError.addEventListener('click', async () => {
  mostrarMensaje('secondary', 'Probando URL inválida...');
  try {
    await fetchSeguro('https://url-que-no-existe-1234.test/api');
    mostrarMensaje('success', 'Si ves esto, la URL inválida respondió (!)');
  } catch (e) {
    // Aquí normalmente será un error de red, tipo “Failed to fetch”,
    // pero el usuario ve un mensaje corto si quieres transformarlo.
    mostrarMensaje('danger', e.message);
  }
});