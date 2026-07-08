# Fetch & APIs 🛰 — Módulo 5, Lección 5 (Día 1)

Proyecto de práctica de consumo de APIs en JavaScript moderno.  
Incluye minis independientes y un ejercicio integrador: una **Pokédex interactiva**.

Tecnologías principales:

- HTML + Bootstrap 5 (sin CSS propio)
- JavaScript ES6+
- `fetch()`, `async/await`
- `Promise.all` y manejo de errores
- Manipulación del DOM

---

## Estructura del proyecto

```text
m5-l5-apis/
├─ index.html
├─ mini1.js
├─ mini2.js
├─ mini3.js
├─ mini4.js
├─ mini5.js
├─ mini6.js
└─ ejercicio-final.js
```

El `index.html` sirve como hub visual de todos los ejercicios, usando solo componentes y utilidades de Bootstrap.

---

## Cómo ejecutar

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/<tu-usuario>/m5-l5-apis.git
   cd m5-l5-apis
   ```

2. Abrir `index.html` en el navegador (doble clic o usando Live Server).

3. Mantener abiertas las DevTools:
   - Pestaña **Console** para ver logs.
   - Pestaña **Network** para observar las requests en tiempo real.

---

## Mini 1 — Primera llamada Fetch

**Objetivo:** hacer la primera llamada `fetch()` y medir tiempos con `async/await`.

- Endpoint: `https://jsonplaceholder.typicode.com/posts/1`
- Tareas:
  - Obtener el post #1 y mostrar en consola: `id`, `title`, `body`, `userId`.
  - Obtener secuencialmente los posts #5 y #10 usando `async/await`.
  - Medir tiempo de cada petición con `Date.now()` y comparar.

**Aprendizaje clave:**

- Uso básico de `fetch()` y `response.ok`.
- Diferencia entre `.then()` y `async/await`.
- Medición simple de latencia de requests.

---

## Mini 2 — Lista de usuarios con filtro

**Objetivo:** consumir una API, renderizar en el DOM y filtrar en tiempo real.

- Endpoint: `https://jsonplaceholder.typicode.com/users`
- Tareas:
  - Mostrar los 10 usuarios en `div.empleado` con nombre, email, teléfono y ciudad.
  - Input de búsqueda que filtra por nombre o email usando evento `input`.
  - Estado de carga: texto visible “Cargando usuarios…” que desaparece al renderizar.

**Detalles de implementación:**

- Se mantiene un array `empleados` con referencias `{ el, nombre, email }`.
- El filtro no hace nuevos `fetch`: solo muestra/oculta elementos ya creados.
- Todo el layout se arma con clases Bootstrap (inputs, cards, tipografía).

---

## Mini 3 — `fetchSeguro` con manejo de errores

**Objetivo:** construir una función de `fetch` reutilizable y robusta.

- Función principal: `async function fetchSeguro(url, opciones = {})`
- Características:
  - Timeout de 5 segundos usando `AbortController`.
  - Verifica `response.ok` y traduce códigos HTTP a mensajes amigables:
    - `404 → "Recurso no encontrado"`
    - `500 → "Error del servidor"`
    - Otros códigos → mensaje genérico.
  - Detecta `AbortError` y devuelve `"Tiempo de espera agotado"`.

**Escenarios probados:**

- URL válida.
- URL que provoca 404.
- URL inválida (error de red).

Los resultados se muestran en el DOM usando `alert` de Bootstrap (success/warning/danger), sin exponer mensajes técnicos al usuario final.

---

## Mini 4 — Dashboard con `Promise.all`

**Objetivo:** cargar múltiples fuentes de datos en paralelo para un dashboard.

- Endpoints:
  - `posts?userId=1`
  - `todos?userId=1`
  - `users/1`
- Dos enfoques:
  - Paralelo con `Promise.all`.
  - Secuencial con `await` uno por uno.

**Métricas mostradas:**

- Nombre del usuario.
- Cantidad de posts.
- Todos completados vs pendientes.

**Medición de tiempo:**

- Se mide tiempo total con `performance.now()`.
- Se comparan los ms de la versión paralela vs secuencial en el DOM.
- Comentarios en el código explican la diferencia de comportamiento.

---

## Mini 5 — Paginación con “Cargar más”

**Objetivo:** implementar paginación incremental para posts.

- Endpoint: `https://jsonplaceholder.typicode.com/posts`
- Parámetros:
  - `_limit=5`
  - `_page=N`

**Comportamiento:**

- Al cargar la página se muestran los primeros 5 posts.
- Botón “Cargar más”:
  - Deshabilitado y texto “Cargando…” mientras se hace la request.
  - Incrementa `paginaActual` y pide la siguiente página.
  - Agrega nuevos posts al DOM sin borrar los anteriores.
  - Si no hay más posts (`posts.length === 0`), el botón se oculta.

Cada post se muestra en una tarjeta Bootstrap con id, título y cuerpo truncado a 100 caracteres.

---

## Mini 6 — Galería de usuarios con fotos (`randomuser.me`)

**Objetivo:** construir una galería visual con avatares reales.

- Endpoint: `https://randomuser.me/api/?results=8`
- Estructura de cada usuario (propiedad `results` en el JSON):
  - Foto: `picture.large`
  - Nombre completo: `name.first + name.last`
  - Email: `email`
  - País: `location.country`

**Comportamiento:**

- Se muestran 8 usuarios en una grilla de tarjetas Bootstrap.
- Botón “Recargar”:
  - Deshabilita mientras carga.
  - Hace un nuevo `fetch` y reemplaza las tarjetas con usuarios nuevos.
- Estado de carga “Cargando usuarios…” visible mientras se espera la respuesta.

---

## Ejercicio Final — Pokédex Interactiva

Aplicación integradora que consume la PokéAPI y muestra Pokémon de forma visual e interactiva.

### BLOQUE 01 — Carga inicial

- Al iniciar la app se cargan los Pokémon del #1 al #12 en paralelo usando `Promise.all`.
- Cada tarjeta muestra:
  - Sprite oficial: `sprites.other['official-artwork'].front_default` (con fallback).
  - Nombre.
  - Número (`#id`).
  - Tipos (`types`).

Se muestra un estado “Cargando Pokédex…” mientras se obtienen los datos.

### BLOQUE 02 — Buscar y filtrar

- Buscador por nombre:
  - Input que acepta nombre de Pokémon.
  - Hace `fetch` directo a `/pokemon/{nombre}` (en minúsculas).
  - Maneja 404 mostrando estado “No encontrado”.
- Filtro por tipo:
  - Botones toggle (Todos / Fuego / Agua / Planta / Eléctrico, etc.).
  - Muestran solo los Pokémon de ese tipo, filtrando sobre los ya cargados.
  - No hacen nuevo `fetch`, solo trabajan con el array de estado.
- Botón “Cargar más”:
  - Usa el mismo patrón de Mini 5.
  - Lleva un contador del último id cargado.
  - Añade de a 12 Pokémon nuevos a la grilla.

### BLOQUE 03 — Ficha de detalle

Al hacer clic en una tarjeta se muestra un panel de detalle:

- Stats base: HP, ataque, defensa, velocidad (leídos del array `stats`).
- Altura (`height / 10` m).
- Peso (`weight / 10` kg).
- Habilidades (`abilities`).

Opcional pero recomendado: mostrar las stats como barras de progreso (por ejemplo, usando componentes de Bootstrap) calculando un porcentaje respecto a un valor máximo (~255).

### BLOQUE 04 — Estados de la aplicación

Se gestionan varios estados:

- **Cargando:** spinner o mensaje “Cargando Pokédex…”.
- **No encontrado:** cuando la búsqueda por nombre responde 404:
  - Mensaje amigable (“Ese Pokémon no existe 🔍”).
  - Botón para volver a la lista completa.
- **Error de red:** cuando la request falla:
  - Mensaje humano (“No se pudo conectar con el servidor”).
  - Botón de reintento.

### BLOQUE 05 — Arquitectura de funciones

El código de la Pokédex está organizado en funciones con responsabilidades claras:

- `async function cargarPokemones(desde, hasta)`  
  Pide un rango de Pokémon usando `Promise.all` y actualiza el estado global.

- `function renderizarPokemones(lista)`  
  Crea y pinta las tarjetas en la grilla del DOM.

- `function filtrarPorTipo(tipo)`  
  Aplica el filtro sobre el array de estado y vuelve a renderizar.

- `function mostrarDetalle(pokemon)`  
  Rellena el panel de detalle con stats, habilidades, altura y peso.

- `function mostrarEstadoPokedex(tipo)`  
  Controla los mensajes de estado (loading / error / empty / ok) visibles para el usuario.

Esta organización facilita la lectura, el mantenimiento y la extensión del proyecto.

---

## Puedes ver el resultado en:

https://zakkdruzer.github.io/m5-l5-apis/
