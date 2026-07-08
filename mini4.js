// Mini 4

const elNombre = document.getElementById('usuario-nombre');
const elPosts = document.getElementById('usuario-posts');
const elTodos = document.getElementById('usuario-todos');
const elTiempos = document.getElementById('tiempos-mini4');

const btnDashboard = document.getElementById('btn-dashboard');
const btnDashboardSeq = document.getElementById('btn-dashboard-seq');

function renderDashboard(user, posts, todos, tiempoMs, etiquetaModo) {
  const completados = todos.filter((t) => t.completed).length;
  const pendientes = todos.length - completados;

  elNombre.textContent = user.name;
  elPosts.textContent = `${posts.length} posts`;
  elTodos.textContent = `${completados} completados / ${pendientes} pendientes`;

  elTiempos.textContent =
    `${etiquetaModo}: ${tiempoMs} ms (user=1, posts?userId=1, todos?userId=1)`;
}

// Enfoque paralelo con Promise.all
btnDashboard.addEventListener('click', async () => {
  const inicio = performance.now();

  try {
    const [posts, todos, user] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts?userId=1').then((r) =>
        r.json()
      ),
      fetch('https://jsonplaceholder.typicode.com/todos?userId=1').then((r) =>
        r.json()
      ),
      fetch('https://jsonplaceholder.typicode.com/users/1').then((r) =>
        r.json()
      ),
    ]);

    const fin = performance.now();
    const tiempo = Math.round(fin - inicio);

    renderDashboard(user, posts, todos, tiempo, 'Paralelo (Promise.all)');
    // Comentario para el bootcamp:
    // En modo paralelo, el tiempo total ≈ la request más lenta, no la suma de todas.
  } catch (error) {
    elTiempos.textContent = 'Error al cargar el dashboard en paralelo.';
    console.error(error);
  }
});

// Enfoque secuencial (una request espera a la anterior)
btnDashboardSeq.addEventListener('click', async () => {
  const inicio = performance.now();

  try {
    const postsResp = await fetch(
      'https://jsonplaceholder.typicode.com/posts?userId=1'
    );
    const posts = await postsResp.json();

    const todosResp = await fetch(
      'https://jsonplaceholder.typicode.com/todos?userId=1'
    );
    const todos = await todosResp.json();

    const userResp = await fetch(
      'https://jsonplaceholder.typicode.com/users/1'
    );
    const user = await userResp.json();

    const fin = performance.now();
    const tiempo = Math.round(fin - inicio);

    renderDashboard(user, posts, todos, tiempo, 'Secuencial (await uno a uno)');
    // Comentario: en secuencial el tiempo total ≈ suma de las 3 latencias,
    // así que casi siempre será más lento que el paralelo.
  } catch (error) {
    elTiempos.textContent = 'Error al cargar el dashboard de forma secuencial.';
    console.error(error);
  }
});