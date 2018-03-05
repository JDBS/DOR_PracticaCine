

function getTicketsCount(){
  return load(TICKET_COUNT_SAVE_ID)||{child:0,adult:0};
}

function clearTickets(){
  save({adult:0,child:0},TICKET_COUNT_SAVE_ID);
}

function saveTickets(){
  const childTicketsInput=$('#child_tickets');
  const adultTicketsInput=$('#adult_tickets');
  const childCount=parseInt(childTicketsInput.val())||0;
  const adultCount=parseInt(adultTicketsInput.val())||0;

  const saveObject={
    adult:adultCount,
    child:childCount
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

$(function(){
  clearTickets();
  setVipPriceInfo();
  updatePrices();
  const childTicketsInput=$('#child_tickets');
  const adultTicketsInput=$('#adult_tickets');
  childTicketsInput.
    on('change',()=>{
      updatePrices();
    })
  adultTicketsInput.
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