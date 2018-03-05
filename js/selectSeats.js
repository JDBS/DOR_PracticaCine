


function getVips(){
  return $(".vipselected").length;
}

function saveVips(){
  tickets = load(TICKET_COUNT_SAVE_ID);
  tickets.vips=getVips();
  save(tickets,TICKET_COUNT_SAVE_ID);
}

function payment(){
  const selected= getSelectedCount();
  const count= getTotalTicketsCount();

  if(selected<count){
    toastr.error(`Faltan por seleccionar ${count-selected} asientos.`);
  }else{
    saveVips();
    document.location.href="./payment.html"
  }
}

function setScaleEvent(){
  $('#scale_input')
    .on('change',(event)=>{
      const zoom=event.target.value;
      room.setZoom(zoom);
    });
}

function setButtonsEvents(){
  $('#right_button')
    .on('click',(event)=>{
      room.move(1,0);
    });
  $('#left_button')
    .on('click',(event)=>{
      const zoom=event.target.value;
      room.move(-1,0);
    });
  $('#down_button')
    .on('click',(event)=>{
      room.move(0,1);
    });
  $('#up_button')
    .on('click',(event)=>{
      const zoom=event.target.value;
      room.move(0,-1);
    });
}

$(function(){
  setButtonsEvents();
  setScaleEvent();
});