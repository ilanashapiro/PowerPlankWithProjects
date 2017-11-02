
"use strict"; 
var armDown = false;

function ArmControlScene() {

  Scene.call(this); 

  ///// SETUP ALL ACTORS HERE /////
  this.backgroundBorder = new BackgroundBorder();
  this.addActor(this.backgroundBorder);
  
  this.titleLable = new Label (windowWidth/5, windowHeight/5 - 120, "Arm Control", {size:50, width:25}, 450, 50);
  this.addActor(this.titleLable);
  
  this.armStepperSlider = new Slider(windowWidth/4, windowHeight/4 - 50, 1000, 0, 100, 0, this.armStepperSliderChange.bind(this));
  this.armStepperSlider.sliderImage(greenImage);
  this.armStepperSliderLabel = new Label(windowWidth * 0.15, windowHeight * 0.16, 0 + " Revolutions", {size:20, width:25}, 300, 20);
  this.addActor(this.armStepperSlider);
  this.addActor(this.armStepperSliderLabel);
  
  this.armUpButton = new TextButton(windowWidth * 0.2, 3 * windowHeight/5, 300, 75, YELLOW, "Arm Up", {size:25, leading: 30}, this.armUp.bind(this), "rect");
  this.addActor(this.armUpButton);
  
  this.armDownButton = new TextButton(windowWidth * 0.4, 3 * windowHeight/5, 300, 75, BLUE, "Arm Down", {size:25, leading: 30}, this.armDown.bind(this), "rect");  //also leads to electromagnet scene
  this.addActor(this.armDownButton);
  
  this.armToHighTowerButton = new TextButton(windowWidth * 0.3, 4 * windowHeight/5, 320, 75, BLUE, "Arm To High Tower", {size:25, leading: 30}, this.armToHighTower.bind(this), "rect");  //also leads to electromagnet scene
  this.addActor(this.armToHighTowerButton);
  
  this.armToLowTowerButton = new TextButton(windowWidth * 0.5, 4 * windowHeight/5, 320, 75, BLUE, "Arm To Low Tower", {size:25, leading: 30}, this.armToLowTower.bind(this), "rect");  //also leads to electromagnet scene
  this.addActor(this.armToLowTowerButton);
  
  this.armHomingButton = new TextButton(windowWidth * 0.6, 3 * windowHeight/5, 300, 75, RED, "Home Arm", {size:25, leading: 30}, this.homingArmStepper.bind(this), "rect");  //also leads to electromagnet scene
  this.addActor(this.armHomingButton);
  
  this.nextButton = new NextButton(this.goToMotionMachineMenuSceneInDirection.bind(this, 1));
  this.addActor(this.nextButton);
}

_inherits(ArmControlScene, Scene); 

///// CUSTOM FUNCTIONS BELOW THIS LINE /////

ArmControlScene.prototype.armStepperSliderChange = function(val) {
  manager.change(ARM.master.values.armRotationInt, val);
  this.armStepperSliderLabel.text = val/100.0 + " Rotations";
  console.log("arm stepper slider change running");
}

ArmControlScene.prototype.armUp = function() {
  ARM.master.events.armUp();
  console.log("arm up");
}

ArmControlScene.prototype.armDown = function() {
  ARM.master.events.armDown();
  stage.transitionTo("ElectromagnetControlScene", 1);
  console.log("arm down and transition to electromagnet control scene");
  armDown = true;
}

ArmControlScene.prototype.armToHighTower = function() {
  if(armDown === true) {
	ARM.master.events.armUp();
	console.log("move arm up");
	armDown = false;
  }
  ARM.master.events.moveStepperToHighTower();
  console.log("arm to high tower");
}

ArmControlScene.prototype.armToLowTower = function() {
  if(armDown === true) {
	ARM.master.events.armUp();
	console.log("move arm up");
	armDown = false;
  }
  ARM.master.events.moveStepperToLowTower();
  console.log("arm to low tower");
}


ArmControlScene.prototype.goToMotionMachineMenuSceneInDirection = function(dir) {
  console.log("next button: go to motion machine menu scene in direction of " + dir);
  manager.changeState(STATE_PERPETUALMOTION);
  stage.transitionTo('MotionMachineMenuScene', dir);
}

ArmControlScene.prototype.homingArmStepper = function() {
  console.log("home arm stepper");
  ARM.master.events.homeStepper();
}


ArmControlScene.prototype.demoAction = function() {
  
}
