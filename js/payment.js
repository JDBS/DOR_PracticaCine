


function getMovieInfo() {
  return load(SELECTED_MOVIE_SAVE_ID);
}


function loadTickets(){
  return load(TICKET_COUNT_SAVE_ID);
}

function submitPayment() {
  const name = $('#first_name').val();
  const lastName = $('#last_name').val();
  const cardNumber = $('#card_number').val();
  const email = $('#email').val();
  const movie = getMovieInfo();

  const tickets=loadTickets();

  
  room.confirmChanges();

  save(
    {
      name,
      lastName,
      cardNumber,
      email,
      movie,
      tickets
    }, 
    PURCHASE_INFO_SAVE_ID
  );

  document.location.href='./confirmation.html';
  return true;
}