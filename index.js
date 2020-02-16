const {Board, Led} = require('johnny-five');
let myBoard, myLed, myLedAux;
let speedinterval = 10, minSpeed = 10, maxSpeed = 1000, interval = 5000;
let led1speed = 0, led2speed = 0;
let led1Dir = 'up';
let led2Dir = 'down';

myBoard = new Board();

myBoard.on('ready', () =>{
  myLed = new Led(11);
  myLedAux = new Led(10);
  fnInit();
  myBoard.repl.inject({
    led1:myLed,
    led2:myLedAux
  });
});

myBoard.on('error', (err) => {
  console.log(err);
});

let fnRun = (spd1, spd2) => {
  fnChangeSpeed(myLed, spd1);
  fnChangeSpeed(myLedAux, spd2);
  if (spd1 == maxSpeed || spd1 == minSpeed){
    led1Dir = (spd1 == maxSpeed) ? 'down' : 'up';
  }
  led1speed = (led1Dir == 'down') ? led1speed - speedinterval : led1speed + speedinterval;

  if (spd2 == maxSpeed || spd2 == minSpeed){
    led2Dir = (spd2 == maxSpeed) ? 'down' : 'up';
  }
  led2speed = (led2Dir == 'down') ? led2speed - speedinterval : led2speed + speedinterval;

  //console.log('Led1 | ' + spd1 + ' | ' +  led1speed);
  //console.log('Led2 | ' + spd2 + ' | ' +  led2speed);
  setTimeout(() => {fnRun(led1speed, led2speed);}, interval);
};
let fnChangeSpeed = (ledItem, speed) => {ledItem.strobe(speed);};
let fnBucle = () => {
  led1speed = minSpeed;
  led2speed = maxSpeed;
  fnRun(led1speed, led2speed);
};
let fnInit = () => {myLed.strobe(10); myLedAux.strobe(200);};
