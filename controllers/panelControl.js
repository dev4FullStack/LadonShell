const ipc = require('electron').ipcRenderer;
const exec = require('child_process').exec;
const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
//const fs = require("fs");
/*
const con = require('electron').remote.getGlobal('console')
con.log('This will be output to the main process console.')
*/

checker = document.getElementsByClassName('checkEvent');
for(let i=0; i < checker.length; i++){
  checker[i].addEventListener('click', function(){
    //myConsole.log(" ID : "+this.dataset.id + " ACTION : "+this.dataset.action);

    let dI = window.ladonData.getDataById(this.dataset.id);
    window.ladonData.checkerUpdate(this.dataset.id, this.dataset.action);

    //myConsole.log(JSON.stringify(window.ladonData.ld));

    fs.writeFile('data.json',JSON.stringify(window.ladonData.ld), (err) => {

      if(err)myConsole.log("Erreur d'ecriture data.json ["+err+"]");
    });

  });
}
const action_run = document.getElementById('action_run');
action_run.addEventListener('click', () => {
  ipc.send('action_run', window.ladonData);

  function puts(error, stdout, stderr) { console.log(stdout) }
  const chk_p = document.getElementsByClassName('checkParams');

  for(let i=0; i < window.ladonData.ld['data'].length; i++){
    let ld = window.ladonData.ld['data'][i];
    myConsole.log(`#${window.ladonData.reliquat.id}#`);
    if(!(chk_p[i].value === "")){
      ld.parameters = chk_p[i].value;
      fs.writeFile('data.json',JSON.stringify(window.ladonData.ld), (err) => {

        if(err)myConsole.log("Erreur d'ecriture data.json ["+err+"]");
      });
      //myConsole.log(`[${chk_p[i].value}]`);
      //myConsole.log(chk_p[i].placeholder);
    }else{
    }
    if(ld.selected) exec(ld.script_name + " " +ld.parameters,
        (error, stdout, stderr) => {
          /*
          myConsole.log(stdout);
          myConsole.log(stderr);
          */
          const cnsle = document.getElementsByClassName('console');
          if(stdout)
          cnsle[0].innerHTML = cnsle[0].innerHTML + `<br /> ${stdout} <br />`;
          if(stderr)
          cnsle[0].innerHTML = cnsle[0].innerHTML + `<br /> ${stderr} <br />`;
        });

  }
 /*
  exec('ls -l', (error, sdout, stderr) => {
    const cnsle = document.getElementsByClassName('console');
    cnsle[0].innerHTML = cnsle[0].innerHTML + `<br /> ${sdout} <br />`;

  }/*puts);*/

});
