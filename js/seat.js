const SIZE=128;
const DISTANCE=32;

const seat={
  getId:function(row,seat){
    return `seat${row}n${seat}`;
  },
  get:function(row,seat){
    return $(`#${this.getId(row,seat)}`);
  },
  setState:function(row,seat,state){
    const seatElement=$(this.get(row,seat));
    seatElement.removeClass();
    seatElement.addClass(state);
    return {
      row:row,
      seat:seat,
      state:state
    }
  },
  setStateForAll:function(state){
    $('use')
      .removeClass()
      .addClass(state);
  },
  create:function(row,seat){
    const seatElement=document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const title= document.createElementNS('http://www.w3.org/2000/svg','title');

    return $(seatElement)
      .attr('id',this.getId(row,seat))
      .attr('href','./svg/butaca.svg#butaca')
      .attr('x',seat*DISTANCE).attr('y',row*DISTANCE)
      .attr('onclick',`onClickEvent(${row},${seat})`)
      .append($(title).text(`Fila: ${row}, Butaca: ${seat}`));
  }
}


/*
rect = $(document.createElementNS(lu('svg'), 'rect'))
.addClass('emleGraphicOutline')
.attr({
    x: 35,
    y: 25,
    width: 200,
    height: 50
});
*/