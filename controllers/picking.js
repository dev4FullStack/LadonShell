const fs = require("fs");
const lad = require(".././controllers/LadonObject");

let content = fs.
readFileSync("data.json");

const swp = JSON.parse(content);
const clip = document.
getElementById('clipboard');

function addClip(elmt, json){

for(let d = 0; d < json['data'].length; d++){
  let tr = document.
  createElement('tr');
  let data = json["data"][d];
  for(let i = 0; i <= 5; i++){
    let td = document.
    createElement('td');
    switch(i){
      case 0:
        td.dataset.id = data.id;
        td.innerHTML =
        "<input "+`data-action='selected' ` + `data-id='${data.id}'` + " class='checkEvent' type='checkbox' " + (data.selected ? "checked" : "") +" >";
        break;
      case 1:
        td.innerHTML =
        data.script_name;
        td.dataset.script = 'script-dataset';
        break;
      case 2:
        td.innerHTML =
        "<input type='input'" +`class="checkParams" placeholder="${
        data.parameters}"`+" >";
        break;
      case 3:
        td.dataset.id = data.id;
        td.innerHTML =
        "<input "+ `data-action='admin' `+`data-id='${data.id}'` + " class='checkEvent' type='checkbox' " + (data.admin ? "checked" : "") +" >";
        break;
      case 4:
        td.dataset.id = data.id;
        td.innerHTML =
        "<input "+ `data-action='continue' `+`data-id='${data.id}'` + " class='checkEvent' type='checkbox' " + (data.continue ? "checked" : "") +" >";
        break;
      case 5:
        td.innerHTML =
        data.status;
        break;
      default:
      break;
    }
    tr.
    appendChild(td);
  }
  elmt.
  appendChild(tr);
}
}

window.ladonData = new lad(swp);
window.swp_lad = swp;
addClip(clip,swp);

//console.log(swp["data"].length);
