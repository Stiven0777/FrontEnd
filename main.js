document.addEventListener("DOMContentLoaded", function () {
  const songList = document.getElementById("song-list");
  const songForm = document.getElementById("song-form");

  let editMode = false;
  let editIndex = -1;

  // Función para agregar una nueva canción a la lista
  function agregarCancion(artista, cancion, imagenURL, enlaceURL) {
    const nuevaCancion = document.createElement("li");
    nuevaCancion.innerHTML = `
          <strong>Artista:</strong> ${artista},
          <strong>Canción:</strong> ${cancion}
          <img src="${imagenURL}" alt="${artista}">
          <a href="${enlaceURL}" target="_blank" class="reproducir">Reproducir</a>
          <button class="editar">Editar</button>
          <button class="eliminar">Eliminar</button>
      `;

    songList.append(nuevaCancion);

    // Agregar evento de click al botón "Editar"
    const editarBoton = nuevaCancion.querySelector(".editar");
    editarBoton.addEventListener("click", function () {
      editarCancion(nuevaCancion);
    });

    // Agregar evento de click al botón "Eliminar"
    const eliminarBoton = nuevaCancion.querySelector(".eliminar");
    eliminarBoton.addEventListener("click", function () {
      eliminarCancion(nuevaCancion);
    });
  }

  // Evento de envío del formulario para agregar o editar una canción
  songForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que la página se recargue

    const artistaInput = document.getElementById("artista");
    const cancionInput = document.getElementById("cancion");
    const imagenInput = document.getElementById("imagen");
    const enlaceInput = document.getElementById("enlace"); // Nuevo campo para el enlace de la canción

    const artista = artistaInput.value;
    const cancion = cancionInput.value;
    const imagenURL = imagenInput.value;
    const enlaceURL = enlaceInput.value; // Obtener el valor del enlace

    if (artista && cancion && imagenURL && enlaceURL) {
      if (editMode) {
        // Modo de edición
        const cancionEditada = songList.children[editIndex];
        cancionEditada.querySelector(
          "strong:nth-child(odd)"
        ).textContent = `Artista: ${artista}`;
        cancionEditada.querySelector(
          "strong:nth-child(even)"
        ).textContent = `Canción: ${cancion}`;
        cancionEditada.querySelector("img").setAttribute("src", imagenURL);
        cancionEditada
          .querySelector(".reproducir")
          .setAttribute("href", enlaceURL); // Actualizar el enlace
        editMode = false;
        editIndex = -1;
      } else {
        // Modo de agregar
        // Pasar el enlace como argumento
      }

      agregarCancion(artista, cancion, imagenURL, enlaceURL);

      // Limpiar los campos del formulario
      artistaInput.value = "";
      cancionInput.value = "";
      imagenInput.value = "";
      enlaceInput.value = ""; // Limpiar el campo del enlace
    } else {
      alert("Por favor, complete todos los campos, incluyendo el enlace.");
    }
  });

  // Función para editar una canción en la lista
  function editarCancion(cancion) {
    const artistaTexto = cancion.querySelector(
      "strong:nth-child(odd)"
    ).textContent;
    const cancionTexto = cancion.querySelector(
      "strong:nth-child(even)"
    ).textContent;

    const artistaInput = prompt("Editar Artista:", artistaTexto);
    const cancionInput = prompt("Editar Canción:", cancionTexto);

    if (artistaInput !== null && cancionInput !== null) {
      const imagenURL = cancion.querySelector("img").getAttribute("src");
      cancion.querySelector(
        "strong:nth-child(odd)"
      ).textContent = `Artista: ${artistaInput}`;
      cancion.querySelector(
        "strong:nth-child(even)"
      ).textContent = `Canción: ${cancionInput}`;
    }
  }

  // Función para eliminar una canción de la lista
  function eliminarCancion(cancion) {
    songList.removeChild(cancion);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const songList = document.getElementById("song-list");
  const songForm = document.getElementById("song-form");

  // Cargar canciones desde localStorage al cargar la página
  cargarCanciones();

  // Restaurar las canciones almacenadas en localStorage
  function cargarCanciones() {
    const canciones = JSON.parse(localStorage.getItem("canciones")) || [];
    canciones.forEach(function (cancion) {
      agregarCancion(cancion.artista, cancion.cancion);
    });
  }

  // Función para agregar una nueva canción a la lista y almacenarla en localStorage
  function agregarCancion(artista, cancion) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
          <td>${artista}</td>
          <td>${cancion}</td>
          <td>
              <button class="btn btn-edit" onclick="editarCancion(${
                songList.rows.length - 1
              })">Editar</button>
              <button class="btn btn-delete" onclick="eliminarCancion(${
                songList.rows.length - 1
              })">Eliminar</button>
          </td>
      `;
    songList.appendChild(newRow);

    // Almacenar la canción en localStorage
    const canciones = JSON.parse(localStorage.getItem("canciones")) || [];
    canciones.push({ artista, cancion });
    localStorage.setItem("canciones", JSON.stringify(canciones));
  }

  // Resto del código (editarCancion, eliminarCancion, etc.)
});
