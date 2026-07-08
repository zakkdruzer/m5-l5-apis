// Ejercicio Final

// Estado global
let pokedexPokemones = [];
let pokedexUltimoId = 0;
let pokedexFiltroTipo = 'todos';

// Referencias al DOM (nombres específicos)
const pokedexGrid = document.getElementById('pokedex-grid');
const pokedexEstado = document.getElementById('pokedex-estado');
const pokedexBtnMas = document.getElementById('btn-pokedex-mas');

async function cargarPokemones(desde, hasta) {
  mostrarEstadoPokedex('loading');

  const ids = [];
  for (let i = desde; i <= hasta; i++) {
    ids.push(i);
  }

  try {
    const resultados = await Promise.all(
      ids.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json())
      )
    ); // cada resultado es un objeto Pokémon completo.

    pokedexPokemones = pokedexPokemones.concat(resultados);
    pokedexUltimoId = hasta;

    renderizarPokemones(pokedexPokemones);
    mostrarEstadoPokedex('ok');
  } catch (error) {
    console.error('Error al cargar Pokédex:', error);
    mostrarEstadoPokedex('error');
  }
}

const grid = document.getElementById('pokedex-grid');

function renderizarPokemones(lista) {
  pokedexGrid.innerHTML = '';

  lista.forEach((pokemon) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

    const card = document.createElement('div');
    card.className = 'card h-100 text-center';

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.alt = pokemon.name;
    img.src =
      pokemon.sprites.other['official-artwork'].front_default ||
      pokemon.sprites.front_default; // imagen oficial o fallback.

    const body = document.createElement('div');
    body.className = 'card-body';

    const titulo = document.createElement('h3');
    titulo.className = 'h6 card-title text-capitalize mb-1';
    titulo.textContent = `#${pokemon.id} ${pokemon.name}`;

    const tipos = document.createElement('p');
    tipos.className = 'card-text small mb-0';
    const nombresTipos = pokemon.types
      .map((t) => t.type.name)
      .join(' / '); // ["grass","poison"] etc.
    tipos.textContent = nombresTipos;

    body.appendChild(titulo);
    body.appendChild(tipos);
    card.appendChild(img);
    card.appendChild(body);
    col.appendChild(card);

    card.addEventListener('click', () => {
      mostrarDetalle(pokemon);
    });

    pokedexGrid.appendChild(col);
  });
}

const btnMas = document.getElementById('btn-pokedex-mas');

pokedexBtnMas.addEventListener('click', () => {
  const desde = pokedexUltimoId + 1;
  const hasta = pokedexUltimoId + 12;
  cargarPokemones(desde, hasta);
});

function mostrarEstadoPokedex(tipo) {
  if (tipo === 'loading') {
    pokedexEstado.textContent = 'Cargando Pokédex...';
  } else if (tipo === 'error') {
    pokedexEstado.textContent =
      'Hubo un error al cargar los Pokémon. Intenta nuevamente.';
  } else if (tipo === 'empty') {
    pokedexEstado.textContent = 'No hay Pokémon para mostrar.';
  } else {
    pokedexEstado.textContent = '';
  }
}

// Inicialización
cargarPokemones(1, 12);