var selectSeatsMode;
const SEAT_STATES=[
  {id:0,status:'free'},
  {id:1,status:'vip'},
  {id:2,status:'selected'},
  {id:3,status:'vipselected'},
  {id:4,status:'unavailable'}
];

class Room{
  constructor(name,session){
    this.name=name;
    this.session=session;
    this.value=undefined;
    this.loadRoom();
    this.render();

    this.position={
      x:0,
      y:0
    }
    this.scale=1;
  }

  getRoomId(){
    return 'room-'+this.name + '-' + this.session;
  }
  getRoomChangesId(){
    return 'room-changes-'+this.name + '-' + this.session;
  }

  loadRoom(){
    const roomId=this.getRoomId();
    let value = load(roomId);
    if(!value){
      value=DEFAULT_MAP;
    }
    this.value=value;
    this.saveRoom();
    if(!selectSeatsMode){
      this.executeChanges();
    }
  }

  loadChanges(){
    const roomChangesid=this.getRoomChangesId();
    return load(roomChangesid) || [];
  }
  
  addChange(change){
    const changes = this.loadChanges();
    changes.push(change);
    save(changes, this.getRoomChangesId());
  }

  executeChanges(){
    const changes = this.loadChanges();
    changes.forEach(
      (change)=>{
        this.value[change.row][change.seat]=this.getStateId(change.state);
      }
    );
  }

  confirmChanges(){
    this.saveRoom();
    save([],this.getRoomChangesId())
  }
  
  getStateId(state){
    const seatState = SEAT_STATES.find(
      (seat)=>seat.status==state
    );
    if(seatState){
      return seatState.id;
    }else{
      return 'error';
    }
  }

  getStateClass(id){
    const seatState = SEAT_STATES.find(
      (seat)=>seat.id==id
    );
    if(seatState){
      return seatState.status;
    }else{
      return 'error';
    }
  }

  render(){
    const room=$('#room');
    const map = this.value;
    for(let y=0; y<map.length; y++){
      for(let x=0; x<map[y].length; x++){
        if(map[y][x]>=0){
          const state = this.getStateClass(map[y][x]);
          const newSeat=seat.create(y,x);
          room.append(newSeat);
          seat.setState(y,x,state);
        }
      }
    }
  }

  updateViewBox(){
    const x= this.position.x;
    const y= this.position.y;
    const size= parseInt(384/this.scale);
    const maxX=x+size;
    const maxY=y+size;
    const vbSize= parseInt(384/this.scale);

    if(maxX>384 || maxY>384){
      this.position.x=0;
      this.position.y=0;
      this.updateViewBox();
      return;
    }

    const viewbox=`${x} ${y} ${vbSize} ${vbSize}`;

    const room=$('#room')
      .attr('viewBox',viewbox);
  }

  setZoom(scale){
    const inverseScale=12-scale;
    scale = 12 - Math.sqrt(inverseScale*12);
    if(!scale){
      return;
    }
    if(scale<=1){
      scale=1;
    }
    if(scale>12){
      scale=12;
    }
    

    this.scale=scale;
    this.updateViewBox();
  }

  move(x,y){
    x=x||0;
    y=y||0;
    const size= 384;
    const vbSize= parseInt(384/this.scale);
    const moveUnit=vbSize/10;
    const newX=this.position.x+x*moveUnit;
    const newY=this.position.y+y*moveUnit;

    if(newX<0){
      this.position.x=0;
      return;
    }
    if(newY<0){
      this.position.y=0;
      return;
    }
    if(newX+vbSize>size){
      this.position.x=size-vbSize;
      return;
    }
    if(newY+vbSize>size){
      this.position.y=size-vbSize;
      return;
    }

    this.position.x=newX;
    this.position.y=newY;
    this.updateViewBox();
  }

  saveRoom(){
    const roomId=this.getRoomId();
    for(let y=0; y<this.value.length; y++){
      for(let x=0; x<this.value[y].length; x++){
        if(this.value[y][x]==2 || this.value[y][x]==3){
          this.value[y][x]=4;
        }
      }
    }
    save(this.value,roomId);
  }
}

function getSelectedCount(){
  return $('.selected').length + $('.vipselected').length
}

function getTotalTicketsCount(){
  const ticketsObject =load(TICKET_COUNT_SAVE_ID)||{child:0,adult:0};
  const count = ticketsObject.adult + ticketsObject.child;
  return count
}

function onClickEvent(r,s){
  const seatElement=seat.get(r,s);
  const maxTickets= getTotalTicketsCount();
  const ticketsAvailable=maxTickets - getSelectedCount();

  if(seatElement.hasClass('free') && ticketsAvailable>=0){
    room.addChange(
      seat.setState(r,s,'selected')
    );

  } else if(seatElement.hasClass('selected')){
    room.addChange(
      seat.setState(r,s,'free')
    );
  } else if(seatElement.hasClass('vip') && ticketsAvailable>=0){
    room.addChange(
      seat.setState(r,s,'vipselected')
    );
  } else if(seatElement.hasClass('vipselected')){
    room.addChange(
      seat.setState(r,s,'vip')
    );
  }
}

var room = undefined;

$(function(){
  let movie=load(SELECTED_MOVIE_SAVE_ID);
  let session=load(TICKET_COUNT_SAVE_ID).session;
  room=new Room(movie.id,session);
});