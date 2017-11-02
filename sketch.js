
'use strict';


var floor = Math.floor;
var stage = new Stage();
var manager;
var redImage, greenImage, blueImage;


////// DELCARE ALL VARIABLES (SCENES, IMAGES, ETC...) HERE /////

function preload() {
  ////// IMPORT ALL IMAGES HERE //////
  redImage = loadImage("images/redcircle.png");
  greenImage = loadImage("images/green.png");
  blueImage = loadImage("images/sphere.png");
}


function setup() {
  MASTER = true;
  resizeCanvas(windowWidth, windowHeight);

  initMenuVariables();

////// SETUP ALL SCENES HERE ////////

  this.homeScene = new ConsoleOpeningScene(this.goToArmMenuScene.bind(this));
  stage.addScene("HomeScene", homeScene);
  
  var armMenuButtonsNames = ["Manual Control", "Demo"];
  var armMenuButtonsActions = [this.goToArmControlSceneInDirection.bind(this, 1), this.armDemo.bind(this)];
  this.armMenuScene = new ButtonsScene("Arm Game Menu",
                                      "This arm moves the ball between the different towers",
                                      armMenuButtonsNames,
                                      armMenuButtonsActions,
                                      null,
                                      null);
  stage.addScene("ArmMenuScene", armMenuScene);
  
    
  this.armControlScene = new ArmControlScene();
  stage.addScene("ArmControlScene", armControlScene);
 
  var electromagnetControlButtonsNames = ["Magnet On", "Magnet Off"];
  var electromagnetControlButtonsActions = [this.armElectromagnetOn.bind(this), this.armElectromagnetOff.bind(this)];
  this.electromagnetControlScene = new ButtonsScene("Electromagnet Control",
                                      null,
                                      electromagnetControlButtonsNames,
                                      electromagnetControlButtonsActions,
                                      null,
                                      this.goToArmControlSceneInDirection.bind(this, -1));
  stage.addScene("ElectromagnetControlScene", electromagnetControlScene);
  
  var motionMachineMenuButtonsNames = ["Manual", "Demo"];
  var motionMachineMenuButtonsActions = [this.goToMotionMachineRampControlScene.bind(this), this.motionMachineDemo.bind(this)];
  this.motionMachineMenuScene = new ButtonsScene("Motion Machine Menu",
                                      null,
                                      motionMachineMenuButtonsNames,
                                      motionMachineMenuButtonsActions,
                                      null,
                                      null);
  stage.addScene("MotionMachineMenuScene", motionMachineMenuScene);
  
  this.motionMachineRampControlScene = new MotionMachineRampScene();
  stage.addScene("MotionMachineRampControlScene", motionMachineRampControlScene);
  
  var motionMachineStairsButtonsNames = ["Stairs On", "Stairs Off"];
  var motionMachineStairsButtonsActions = [this.stairsOn.bind(this), this.stairsOff.bind(this)];
  this.motionMachineStairsScene = new ButtonsScene("Motion Machine Stairs",
                                      null,
                                      motionMachineStairsButtonsNames,
                                      motionMachineStairsButtonsActions,
                                      null,
                                      this.goToMotionMachineGateControlScene.bind(this));
  stage.addScene("MotionMachineStairsScene", motionMachineStairsScene);
  
  
  var motionMachineGateButtonsNames = ["Gate Open", "Gate Closed", "Play Again", "Finished"];
  var motionMachineGateButtonsActions = [this.gateOpen.bind(this), this.gateClosed.bind(this), this.goToMotionMachineMenuSceneInDirection.bind(this, -1), this.goToHomeScene.bind(this)];
  this.motionMachineGateScene = new ButtonsScene("Motion Machine Gate",
                                      null,
                                      motionMachineGateButtonsNames,
                                      motionMachineGateButtonsActions,
                                      null,
                                      null);
  stage.addScene("MotionMachineGateScene", motionMachineGateScene);
  
  manager.setEventHandler(ARM.tablet.events.demoComplete, this.unpauseScene.bind(this));
  manager.setEventHandler(PERPETUALMOTION.tablet.events.demoComplete, this.unpauseScene.bind(this));
  
  stage.transitionTo('HomeScene');
}

/*function goToPerpetualMotionScene() {
  console.log("go to perpetual motion scene");
  manager.changeState(STATE_PERPETUALMOTION);
  stage.transitionTo('PerpetualMotionScene', 1);
}*/

function goToArmMenuScene() {
  console.log("go to arm menu scene");
  manager.changeState(STATE_ARM);
  stage.transitionTo('ArmMenuScene', 1);
}

function goToArmControlSceneInDirection(dir) {
  ARM.master.events.armUp();
  console.log("go to arm control scene in direction of " + dir);
  ARM.master.events.homeStepper();
  stage.transitionTo('ArmControlScene', dir);
}

function goToElectromagnetControlScene() {
  console.log("go to electromagnet control scene");
  stage.transitionTo('ElectromagnetControlScene', 1);
}

function goToMotionMachineMenuSceneInDirection(dir) {
  console.log("go to motion machine menu scene in direction of " + dir);
  manager.changeState(STATE_PERPETUALMOTION);
  stage.transitionTo('MotionMachineMenuScene', dir);
}

function goToMotionMachineRampControlScene() {
  console.log("go to motion machine ramp control scene");
  PERPETUALMOTION.master.events.homeStepper();
  stage.transitionTo('MotionMachineRampControlScene', 1);
}

function goToMotionMachineStairsControlScene() {
  console.log("go to motion machine stairs control scene");
  stage.transitionTo('MotionMachineStairsControlScene', 1);
}

function goToMotionMachineGateControlScene() {
  console.log("go to motion machine gate control scene");
  stage.transitionTo('MotionMachineGateScene', 1);
}

function goToHomeScene() {
  console.log("go to home scene");
  manager.changeState(STATE_IDLE);
  stage.transitionTo('HomeScene', 1);
}

function armDemo() {
  stage.pause();
  ARM.master.events.demo();
  console.log("arm demo runnning");
}

function motionMachineDemo() {
  stage.pause();
  PERPETUALMOTION.master.events.demo();
  console.log("motion machine demo runnning");
}


function armElectromagnetOn() {
  ARM.master.events.turnOnMagnet();
  console.log("electromagnet on");
}

function armElectromagnetOff() {
  ARM.master.events.turnOffMagnet();
  console.log("electromagnet off");
}

function gateOpen() {
  PERPETUALMOTION.master.events.setServoRight();
  console.log("gate open");
}

function gateClosed() {
  PERPETUALMOTION.master.events.setServoLeft();
  console.log("gate closed");
}

function stairsOn() {
  PERPETUALMOTION.master.events.startSteps();
  console.log("stairs on");
}

function stairsOff() {
  PERPETUALMOTION.master.events.stopSteps();
  console.log("stairs off");
}

function unpauseScene() {
	stage.resume();
}

function draw() {
  stage.draw();
}

// all these are needed to handle touch/mouse events properly
window.touchStarted = stage.touchStarted.bind(stage);
window.touchMoved = stage.touchMoved.bind(stage);
window.touchEnded = stage.touchEnded.bind(stage);
window.mousePressed = stage.mousePressed.bind(stage);
window.mouseDragged = stage.mouseDragged.bind(stage);
window.mouseReleased = stage.mouseReleased.bind(stage);
