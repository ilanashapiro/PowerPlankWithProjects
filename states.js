
var IDLE = {
  id: 0,
  master: {
    values: {
      
    },
    events: {
      
    }
  },
  tablet: {
    values: {
      
    },
    events: {
      
    }
  }
};
var STATE_IDLE = 0;
var OFF = {
  id: 1,
  master: {
    values: {
      
    },
    events: {
      
    }
  },
  tablet: {
    values: {
      
    },
    events: {
      
    }
  }
};
var STATE_OFF = 1;
var PERPETUALMOTION = {
  id: 2,
  master: {
    values: {
      stepperInt: new HardwareValue(2, 0, Manager.TYPE_UINT32),
      servoInt: new HardwareValue(2, 1, Manager.TYPE_UINT32)
    },
    events: {
      homeStepper: function homeStepper() { manager.sendEvent(0, 2); },
      moveStepperToTop: function moveStepperToTop() { manager.sendEvent(1, 2); },
      setServoLeft: function setServoLeft() { manager.sendEvent(2, 2); },
      setServoRight: function setServoRight() { manager.sendEvent(3, 2); },
      startSteps: function startSteps() { manager.sendEvent(4, 2); },
      stopSteps: function stopSteps() { manager.sendEvent(5, 2); },
      demo: function demo() { manager.sendEvent(6, 2); }
    }
  },
  tablet: {
    values: {
      
    },
    events: {
      demoComplete: new LocalEvent(2, 0)
    }
  }
};
var STATE_PERPETUALMOTION = 2;
var ARM = {
  id: 3,
  master: {
    values: {
      armRotationInt: new HardwareValue(3, 0, Manager.TYPE_UINT32)
    },
    events: {
      armDown: function armDown() { manager.sendEvent(0, 3); },
      armUp: function armUp() { manager.sendEvent(1, 3); },
      turnOffMagnet: function turnOffMagnet() { manager.sendEvent(2, 3); },
      turnOnMagnet: function turnOnMagnet() { manager.sendEvent(3, 3); },
      moveStepperToLowTower: function moveStepperToLowTower() { manager.sendEvent(4, 3); },
      moveStepperToHighTower: function moveStepperToHighTower() { manager.sendEvent(5, 3); },
      homeStepper: function homeStepper() { manager.sendEvent(6, 3); },
      demo: function demo() { manager.sendEvent(7, 3); }
    }
  },
  tablet: {
    values: {
      
    },
    events: {
      demoComplete: new LocalEvent(3, 0)
    }
  }
};
var STATE_ARM = 3;

var STATES = {
  IDLE: IDLE,
  OFF: OFF,
  PERPETUALMOTION: PERPETUALMOTION,
  ARM: ARM
};
var manager = new Manager([IDLE, OFF, PERPETUALMOTION, ARM]);
