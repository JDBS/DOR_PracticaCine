

function getTicketsCount(){
  return load(TICKET_COUNT_SAVE_ID)||{child:0,adult:0};
}

function clearTickets(){
  save({adult:0,child:0},TICKET_COUNT_SAVE_ID);
}

function saveTickets(){
  const childTicketsInput=$('#child_tickets');
  const adultTicketsInput=$('#adult_tickets');
  const sessionInput=$('#input_hour');
  const childCount=parseInt(childTicketsInput.val())||0;
  const adultCount=parseInt(adultTicketsInput.val())||0;
  const session=sessionInput.val();

  const saveObject={
    adult:adultCount,
    child:childCount,
    session
  }
  save(saveObject,TICKET_COUNT_SAVE_ID);
}

function getChildPrice() {
  return (getTicketsCount().child * CHILD_PRICE).toFixed(2);
}

function getAdultPrice(){
  return (getTicketsCount().adult * ADULT_PRICE).toFixed(2);
}

function setVipPriceInfo(){
  const infoElement=$('#vip_price_info');
  infoElement.text(`Cada asiento VIP añadirá ${VIP_COST_ADITION}€`);
}

function updateAdultPrice(){
  const adultPriceElement=$('#adult_tickets_price');
  adultPriceElement.text(`${getAdultPrice()}€ (Base)`);
}

function updateChildPrice(){
  const childPriceElement=$('#child_tickets_price');
  childPriceElement.text(`${getChildPrice()}€ (Base)`);
}

function updatePrices(){
  saveTickets();
  updateAdultPrice();
  updateChildPrice();
}

function initializeSession(){
  const scheduleList=load(SELECTED_MOVIE_SAVE_ID).schedule;
  const sessionInput = $('#input_hour');
  scheduleList.forEach(
    (schedule)=>sessionInput.append(
      `<option value="${schedule}">${schedule}</option>`
    )
  );
}

function notZero(number1,number2){
  return number1>0 || number2>0;
}

function isInRange(number){
  if(!number){
    return false;
  }
  return number>=0 && number<=100;
}

function validateInfo(){
  const adultTickets=$('#adult_tickets').val();
  const childTickets=$('#child_tickets').val();
  const session=$('#input_hour').val();
  

  if(!isInRange(adultTickets)){
    toastr.error("Los tickets para adultos deben estar entre 0 y 10");
    return false;
  }
  if(!isInRange(childTickets)){
    toastr.error("Los tickets para niños deben estar entre 0 y 10");
    return false;
  }
  if(!notZero(adultTickets,childTickets)){
    toastr.error("No puedes comprar 0 tickets");
    return false;
  }
  if(session==null){
    toastr.error("Tienes que elegir una sesión");
    return false;
  }

  return true;
}

function goSelectSeats(){
  if(validateInfo()){
    document.location.href='./selectSeats.html';
  }
}

$(function(){
  initializeSession();
  clearTickets();
  setVipPriceInfo();
  updatePrices();
  const childTicketsInput=$('#child_tickets');
  const adultTicketsInput=$('#adult_tickets');
  const sessionInput=$('#input_hour');
  childTicketsInput.
    on('change',()=>{
      updatePrices();
    })
  adultTicketsInput.
    on('change',()=>{
      updatePrices();
    })
  sessionInput.
    on('change',()=>{
      updatePrices();
    })
});
/*
adult_tickets
adult_tickets_price
child_tickets
child_tickets_price
vip_price_info
*/