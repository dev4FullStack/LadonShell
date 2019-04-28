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
let clickRunAction;
let intervalID ;
let continueScript = () => {
  for(let i = 0; i < window.ladonData.ld['data'].length; i++){
    let ld = window.ladonData.ld['data'][i];
    let isRestricted = !(ld.admin) ? "<< rbash | " : "";
    if(ld.continue){
      if(ld.selected) exec(isRestricted+ld.script_name + " " +ld.parameters,
          (error, stdout, stderr) => {

            const cnsle = document.getElementsByClassName('console');
            if(stdout){
            cnsle[0].innerHTML = cnsle[0].innerHTML + `<br /> ${stdout} <br />`;
            }
            if(stderr){
            cnsle[0].innerHTML = cnsle[0].innerHTML + `<br /> ${stderr} <br />`;
            }
            if(isRestricted){
            cnsle[0].innerHTML = cnsle[0].innerHTML + `<br /> Mode restricted <br />`;
            }
            cnsle[0].scrollTop = cnsle[0].scrollHeight;
      });
    }
  }
}
intervalID = window.setInterval(() => {
  continueScript();
}, 2000);

action_run.addEventListener('click', clickRunAction = () => {
  ipc.send('action_run', window.ladonData);

  function puts(error, stdout, stderr) { console.log(stdout) }
  const chk_p = document.getElementsByClassName('checkParams');

  for(let i=0; i < window.ladonData.ld['data'].length; i++){
    let ld = window.ladonData.ld['data'][i];
    if(!(chk_p[i].value === "")){
      ld.parameters = chk_p[i].value;
      fs.writeFile('data.json',JSON.stringify(window.ladonData.ld), (err) => {

        if(err)myConsole.log("Erreur d'ecriture data.json ["+err+"]");
      });
      //myConsole.log(`[${chk_p[i].value}]`);
      //myConsole.log(chk_p[i].placeholder);
    }else{
    }

    let isRestricted = !(ld.admin) ? "<< rbash | " : "";
    if(ld.selected) exec(isRestricted+ld.script_name + " " +ld.parameters,
        (error, stdout, stderr) => {

          const cnsle = document.getElementsByClassName('console');
          if(stdout){
          cnsle[0].innerHTML = cnsle[0].innerHTML + `<br /> ${stdout} <br />`;
          }
          if(stderr){
          cnsle[0].innerHTML = cnsle[0].innerHTML + `<br /> ${stderr} <br />`;
          }
          if(isRestricted){
          cnsle[0].innerHTML = cnsle[0].innerHTML + `<br /> Mode restricted <br />`;
          }
          cnsle[0].scrollTop = cnsle[0].scrollHeight;
    });


  }
 /*
  exec('ls -l', (error, sdout, stderr) => {
    const cnsle = document.getElementsByClassName('console');
    cnsle[0].innerHTML = cnsle[0].innerHTML + `<br /> ${sdout} <br />`;

  }/*puts);*/

});

const new_script = document.getElementById('action_newScript');
new_script.addEventListener('click', () => {
  ipc.send('new_script', JSON.stringify(window.swp_lad)/*donnée a envoyer*/);

});

const reset_script = document.getElementById('action_reset');
let new_ld;
reset_script.addEventListener('click', () => {
  let swp_ = () => {
    for(let i=0; i < window.ladonData.ld['data'].length; i++){
      let ld = window.ladonData.ld['data'][i];
      if (ld.selected) {
        new_ld = window.ladonData.ld['data'].splice(i,1);
        swp_();
      }
      //myConsole.log(ld.script_name +" : "+ld.selected);
    }

  }

  swp_();


  fs.writeFile('data.json',JSON.stringify(window.ladonData.ld), (err) => {

    if(err)myConsole.log("Erreur d'ecriture data.json ["+err+"]");
  });
  ipc.send('box_response', window.ladonData.ld);
  //myConsole.log(window.ladonData.ld['data']);
});
