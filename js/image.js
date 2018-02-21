// FIXME: validar tipo de data en file
const Image = ((window, document) => {
  let img = null;

  const structure = title => {
    const $card = $(
      `<div class="card white">
        <div class="card-content black-text">
          <span class="card-title">${title}</span>
          <figure>
            <img class="responsive-img" src="${img}">
          </figure>
        </div>
      </div>`);

    return $card;
  };
  
  const create = event => {
    event.preventDefault();
    // se selecciona el container de bitacora
    const $container = $('.conatiner-bitacora');
    // get de title, image and path
    const title = $(event.target).find('#title_msg').val();
    // const image = $(event.target).find('#file').val();
    // const imagePath = $(event.target).find('#file-path').val();
    // se crea la estructura y se grega como hijo principal
    structure(title).prependTo($container);
    // se cierra el modal
    $('#modal1').modal('close');
  };

  const handleFile = event => {
    // get file
    const file = event.target.files[0];
    // se vacia el contenedor
    $('#list').empty();

    // si es una imagen
    if (file.type.match('image.*')) {
      const reader = new FileReader();

      img = null;

      // al completar la carga
      reader.onload = (theFile => {
        return event => {
          const $span = $('<span></span>');

          img = event.target.result;
          $span.html(`<img class="thumb" src="${img}" title="${escape(theFile.name)}">`);
          $('#list').append($span);
        };
      // se pasa file como argumento
      })(file);
      // render image
      reader.readAsDataURL(file);
    }
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
                  <span>IMAGE</span>
                  <input id="file" type="file" accept="image/*" required>
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

    // init materialize
    $modal.find('input#title_msg').characterCounter();
    // se busca el form y se le asigna el evento
    $modal.find('form').on('submit', create);

    $modal.find('#file').on('change', handleFile);

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
