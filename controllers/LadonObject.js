const uuid = require('uuid');

function LadonData(data=null){
  this.ladonData = data;
  this.ld = this.ladonData;
  this.reliquat = {
    "selected": false,
    "script_name":"nom du script",
    "parameters":"parametre du script",
    "admin":false,
    "continue":false,
    "status":"warning",
    "id":uuid.v1()
  };
  this.getDataById = (id) => {
    for(let i = 0; i < this.ld['data'].length; i++){
      if(this.ld['data'][i].id == id){
        return i;
      }
    }
    return -404;
  }
  this.checkerUpdate = (id, action) => {
    let i = this.getDataById(id);
    switch (action) {
      case 'selected':
        this.ld['data'][i].selected = (this.ld['data'][i].selected) ? false : true;
        break;
      case 'admin':
        this.ld['data'][i].admin = (this.ld['data'][i].admin) ? false : true;
        break;
      case 'continue':
        this.ld['data'][i].continue = (this.ld['data'][i].continue) ? false : true;
        break;
      default:
        break;
    }
  }
  this.add = (data) => {
    if(this.ld != null){
      
    }else {

    }
  }
}
module.exports = LadonData;
