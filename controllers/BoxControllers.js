const electron = require('electron');
const ipc = require('electron').ipcRenderer;
const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
const fs = require('fs');
const lad = require(".././controllers/LadonObject");

let ld = JSON.parse(electron.remote.getGlobal('ld'));
let box_approuved = document.getElementById('box_approuved');
let box_option = document.getElementsByClassName('option-box');
let box_cancelled = document.getElementById('box_cancelled');

box_approuved.addEventListener('click', () => {
  let script_input = document.getElementById('script_input').value;
  let parameters_input = document.getElementById('parameters_input').value;
  let si = script_input, pi = parameters_input;
  let lado = new lad().reliquat;

  let selected = () => {
    for(let i = 0; i < box_option.length; i++)
      if(box_option[i].selected) return box_option[i].value;
  }

  //myConsole.log(pi);

  ipc.send('box_response', {'script_input' : si,
                            'parameters_input': pi,
                            'box_option': selected()});
  lado.script_name = si;
  lado.parameters = pi;
  lado.status = selected();

  ld['data'][ld['data'].length] = lado;
  fs.writeFile('data.json', JSON.stringify(ld));
  
});

box_cancelled.addEventListener('click', () => {
  ipc.send('box_stop');
});
/*
for(let i = 0; i < ld["data"].length; i++){
  myConsole.log(ld["data"][i].script_name);
}
*/
