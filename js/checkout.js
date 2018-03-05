

function getOutput(label,message){
  return `
    <div class="row">
      <div class="col s6">
        <h5>${label}</h5>
      </div>
      <div class="col s6">
        <h5>${message}</h5>
      </div>
    </div>
  `;
}


function loadPurchaseList(){
  return load(PURCHASE_LIST_SAVE_ID) || [];
}


function loadUserInfo(){
  return load(PURCHASE_INFO_SAVE_ID);
}


function confirmation(){
  const purchaseList=loadPurchaseList();
  const userInfo= loadUserInfo();
  purchaseList.push(userInfo);
  room.confirmChanges();
  document.location.href='./confirmation.html';
}


function getVipPrice(tickets){
  return tickets.vips*VIP_COST_ADITION;
}

function getPrice(tickets){
  const adultPrice=tickets.adult*ADULT_PRICE;
  const childPrice=tickets.adult*CHILD_PRICE;
  return (adultPrice + childPrice + getVipPrice(tickets)).toFixed(2);
}


$(function(){
  const container=$('#checkout_info');
  const userInfo=loadUserInfo();

  container.append(
    getOutput(
      'Película',
      userInfo.movie.title
    )
  );
  container.append(
    getOutput(
      'Tarjeta',
      '***'+userInfo.cardNumber.substring(19,24)
    )
  );
  container.append(
    getOutput(
      'Precio Total',
      getPrice(userInfo.tickets) + '€'
    )
  );
  
})