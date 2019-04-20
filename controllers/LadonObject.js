function LadonData(data=null){
  this.ladonData = data;
  this.ld = this.ladonData;

  this.getDataById = (id) => {
    for(let i = 0; i < this.ld['data'].length; i++){
      if(this.ld['data'][i].id == id){
        return i;
      }
    }
    return -404;
  }
  this.checkerUpdate = (i, action) => {
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
}
module.exports = LadonData;
