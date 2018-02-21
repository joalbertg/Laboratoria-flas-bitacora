const begin = () => {
  const $fabContainer = $('#fab');

  // init modal
  $('.modal').modal();
  // main
  const insertAction = event => {
    switch (true) {
    case event.currentTarget.id === 'add-message':
      Message.newForm();
      break;
    case event.currentTarget.id === 'add-image':
      Image.newForm();
      break;
    case event.currentTarget.id === 'add-event':
      Event.newForm();
      break;
    case event.currentTarget.id === 'add-media':
      Media.newForm();
      break;
    }
  };

  $fabContainer.on('click', 'li', insertAction);
};

$(document).ready(begin);
