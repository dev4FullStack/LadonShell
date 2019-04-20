const ipc = require('electron').ipcRenderer;
const exec = require('child_process').exec;
const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
/*
const con = require('electron').remote.getGlobal('console')
con.log('This will be output to the main process console.')
*/
checker = document.getElementsByClassName('checkEvent');
for(let i=0; i < checker.length; i++){
  checker[i].addEventListener('click', function(){
    myConsole.log(" ID : "+this.dataset.id + " ACTION : "+this.dataset.action);

    let dI = window.ladonData.getDataById(this.dataset.id);
    window.ladonData.checkerUpdate(dI, this.dataset.action);
    myConsole.log(window.ladonData.ld['data'][dI]);

  });
}
const action_run = document.getElementById('action_run');
action_run.addEventListener('click', () => {
  ipc.send('action_run', window.ladonData);

  function puts(error, stdout, stderr) { console.log(stdout) }

  for(let i=0; i < window.ladonData.ld['data'].length; i++){
    let ld = window.ladonData.ld['data'][i];
    if(ld.selected) exec(ld.script_name + " " +ld.parameters,
        (error, stdout, stderr) => {
          myConsole.log(stdout);
          myConsole.log(stderr);
        });
    console.log(ld);
  }
 /*
  exec('ls -l', (error, sdout, stderr) => {
    const cnsle = document.getElementsByClassName('console');
    cnsle[0].innerHTML = cnsle[0].innerHTML + `<br /> ${sdout} <br />`;

  }/*puts);*/

});
