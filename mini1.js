console.log("%cMini 1 · Tu primera llamada Fetch", "font-weight: bold; color: green; font-size: 15px;");
console.log("")

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => {
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    return response.json();
  })
  .then((post) => {
    console.log('Post 1:');
    console.log('ID:', post.id);
    console.log('Título:', post.title);
    console.log('Cuerpo:', post.body);
    console.log('userId:', post.userId);
  })
  .catch((error) => {
    console.error('Error al obtener el post 1:', error);
  });

  async function fetchPost(id) {
  const inicio = Date.now();

  const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!resp.ok) {
    throw new Error('HTTP ' + resp.status);
  }

  const data = await resp.json();

  const duracion = Date.now() - inicio;
  console.log(`Post ${id} tardó: ${duracion} ms`);
  console.log(`Post ${id}:`, data);

  return data;
}

async function main() {
  try {
    const post5 = await fetchPost(5);

    const post10 = await fetchPost(10);
  } catch (error) {
    console.error('Error en la secuencia de posts:', error);
  }
}

main();