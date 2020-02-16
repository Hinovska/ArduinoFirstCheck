const {Board, Led} = require('johnny-five');

function ModelEngine(){
  let self = this;
  self.myBoard;
  self.myLedUp;
  self.myLedDown;
  self.myLedLeft;
  self.myLedRight;
  self.currentDir;
  self.direcctions = ['down', 'up', 'right', 'left'];
  self.myBoard = new Board();
  self.myBoard.on('ready', () =>{
    self.myLedUp = new Led(9);
    self.myLedDown = new Led(12);
    self.myLedLeft = new Led(11);
    self.myLedRight = new Led(10);
    if (self.fnInit()){
      self.myBoard.repl.inject({
        move: self.fnChangeDirection,
        stop: self.fnStop
      });
    }
  });

  self.myBoard.on('error', (err) => {
    console.log(err);
  });

  self.fnStop = () => {
    let result = {status:'OK',message:'Stoped'};
    self.myLedUp.off();
    self.myLedDown.off();
    self.myLedLeft.off();
    self.myLedRight.off();
    return result;
  };

  self.fnChangeDirection = (toDirection) => {
    let result = {status:'OK',message:'Moving to ' + toDirection };
    self.fnStop();
    switch (toDirection) {
      case 'up':
        self.myLedUp.on();
        break;
      case 'down':
        self.myLedDown.on();
        break;
      case 'left':
        self.myLedLeft.on();
        break;
      case 'right':
        self.myLedRight.on();
        break;
      default:
        result.status = 'Fail';
        result.message = 'Invalid direcction';
      break;
    }
    return result;
  };
  self.fnTestMoves = () => {
    console.log('Start Test Engine');
    self.direcctions.map((dir)=>{
      console.log(self.fnChangeDirection(dir));
    });
    console.log(self.fnStop());
    console.log('Finish Test Engine');
    return true;
  };
  self.fnInit = () => {return self.fnTestMoves();};
};

engine = new ModelEngine();
