const Event = ((window, document) => {
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
    
    const $datepicker = $(event.target).find('.datepicker').val();
    // se crea la estructura y se grega como hijo principal
    structure($title, $datepicker).prependTo($container);
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
              <div class="input-field col s12">
                <input type="text" class="datepicker">
              </div>
              <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>`);

    $modal.find('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
    
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
