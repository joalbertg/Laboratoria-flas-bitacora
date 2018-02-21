// FIXME: validar tipo de data en file
const Media = ((window, document) => {
  let fileURL = null;

  const handleFile = event => {
    // get file
    const file = event.target.files[0];
    // se vacia el contenedor
    $('#list').empty();

    // si es una imagen
    if (file.type.match('video/*')) {
      const reader = new FileReader();

      fileURL = null;

      // al completar la carga
      reader.onload = (theFile => {
        return () => {
          const $span = $('<span></span>');

          fileURL = URL.createObjectURL(theFile);

          $span.html(
            `<video class="responsive-video" controls>
              <source src="${fileURL}" type="video/mp4">
              Your browser does not support the video tag.
            </video>`);
          $('#list').append($span);
        };
      // se pasa file como argumento
      })(file);
      // render video
      reader.readAsDataURL(file);
    }
  };

  const structure = title => {
    const $card = $(
      `<div class="card white">
        <div class="card-content black-text">
          <span class="card-title">${title}</span>
            <video class="responsive-video" controls>
              <source src="${fileURL}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
        </div>
      </div>`);

    return $card;
  };

  const create = event => {
    event.preventDefault();
    // se selecciona el container de bitacora
    const $container = $('.conatiner-bitacora');
    // get de title, video
    const title = $(event.target).find('#title_msg').val();
    // const video = $(event.target).find('#file').val();
    // se crea la estructura y se grega como hijo principal
    structure(title).prependTo($container);
    // se cierra el modal
    $('#modal1').modal('close');
  };

  const structureModal = () => {
    const $modal = $(
      `<div class="modal-content">
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input id="title_msg" type="text" class="validate" data-length="10" required>
                <label for="title_msg">Title</label>
              </div>
              <div class="file-field input-field col s12">
                <div class="btn">
                  <span>VIDEO</span>
                  <input id="file" type="file" accept="video/*" required>
                </div>
                <div class="file-path-wrapper">
                  <input id="file-path" class="file-path validate" type="text">
                </div>
                <output id="list" class="col s12"></output>
              </div>
              <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>`);

    // se busca el form y se le asigna el evento
    $modal.find('form').on('submit', create);
    // manejador del input file
    $modal.find('#file').on('change', handleFile);
    // init materialize
    $modal.find('input#title_msg').characterCounter();
    return $modal;
  };

  const newForm = () => {
    const $structure = structureModal();

    // se vacia el contenido del modal
    $('.modal').empty();
    // agregamos la estructura correspondiente
    $('.modal').append($structure);
    // desplegamos el modal
    $('#modal1').modal('open');
  };

  return { newForm: newForm };
})(window, document);
