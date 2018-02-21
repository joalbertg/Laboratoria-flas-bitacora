// FIXME: validad espacios en blanco en content
const Message = ((window, document) => {
  const structure = (title, content) => {
    const $card = $(
      `<div class="card white">
        <div class="card-content black-text">
          <span class="card-title">${title}</span>
          <p>${content}</p>
        </div>
      </div>`);

    return $card;
  };

  const create = event => {
    event.preventDefault();
    // se selecciona el container de bitacora
    const $container = $('.conatiner-bitacora');
    // get de title and paragraph
    const $title = $(event.target).find('#title_msg').val();
    const $paragraph = $(event.target).find('#paragraph').val();
    // se crea la estructura y se grega como hijo principal
    structure($title, $paragraph).prependTo($container);
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
                <input id="title_msg" type="text" data-length="10" class="validate" required>
                <label for="title_msg">Title</label>
              </div>
              <div class="input-field col s12">
                <textarea id="paragraph" class="materialize-textarea" required></textarea>
                <label for="paragraph">Textarea</label>
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
