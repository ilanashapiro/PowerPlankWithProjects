
"use strict"; 

function MotionMachineRampScene() {

  Scene.call(this); 

  ///// SETUP ALL ACTORS HERE /////
  this.backgroundBorder = new BackgroundBorder();
  this.addActor(this.backgroundBorder);
  
  this.titleLable = new Label (windowWidth * 0.12, windowHeight/5 - 120, "Motion Machine Ramp Control", {size:50, width:25}, 1000, 50);
  this.addActor(this.titleLable);
  
  this.motionMachineStepperSlider = new Slider(windowWidth/4, windowHeight/4 - 50, 1000, 0, 28, 0, this.motionMachineStepperSliderChange.bind(this));
  this.motionMachineStepperSlider.sliderImage(greenImage);
  this.motionMachineStepperSliderLabel = new Label(windowWidth * 0.15, windowHeight * 0.16, "Ramp Stepper Position is " + 0, {size:20, width:25}, 300, 20);
  this.addActor(this.motionMachineStepperSlider);
  this.addActor(this.motionMachineStepperSliderLabel);
  
  this.homeRampStepperButton = new TextButton(windowWidth * 0.41, 3 * windowHeight/5 , 300, 75, YELLOW, "Home Stepper", {size:25, leading: 30}, this.homeRampStepper.bind(this), "rect");
  this.addActor(this.homeRampStepperButton);
  
  this.nextButton = new NextButton(this.nextAction.bind(this));
  this.addActor(this.nextButton);
}

_inherits(MotionMachineRampScene, Scene); 

///// CUSTOM FUNCTIONS BELOW THIS LINE /////

MotionMachineRampScene.prototype.motionMachineStepperSliderChange = function(val) {
  manager.change(PERPETUALMOTION.master.values.stepperInt, val);
  this.motionMachineStepperSliderLabel.text = "Ramp Stepper Position is " + val;
  console.log("motion machine stepper slider change running");
}

MotionMachineRampScene.prototype.homeRampStepper = function() {
  this.motionMachineStepperSliderLabel.text = "Ramp Stepper Position is " + 0;
  this.motionMachineStepperSlider.position = 65;
  this.motionMachineStepperSlider.draw;
  PERPETUALMOTION.master.events.homeStepper();
  console.log("home ramp stepper");
}

MotionMachineRampScene.prototype.nextAction = function() {
  stage.transitionTo("MotionMachineStairsScene", 1);
  console.log("next action");
}

MotionMachineRampScene.prototype.demoAction = function() {
  
}
