//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, DataFlowchart3, DataFlowchart, MessageHandler*/

/**
 * Main state class
 */
var StateFlowchart3 = function (game) {};

StateFlowchart3.prototype = {
  init: function () {
    this.scale.pageAlignHorizontally = true;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  },
  preload : function () {
  },
  create : function () {
    game.input.enabled = false;
    // Audio
    this.sfxBad = this.add.audio('sfx_bad');
    this.sfxDrop = this.add.audio('sfx_drop');
    this.sfxGood = this.add.audio('sfx_good');
    this.sfxPick = this.add.audio('sfx_pick');
    this.sfxWin = this.add.audio('sfx_win');
    
    this.voBegin = this.add.audio('3_1');
    /*this.voBegin = this.add.audio('vo_sc01_01');
    this.voBegin.onStop.add(this.enableInput,this);
    this.voBegin.onPlay.add(this.disableInput,this);
    
    this.voCorrect = [];
    this.voCorrect.push(this.add.audio('vo_sc01_correct_1'));
    this.voCorrect[0].onStop.add(this.enableInput,this);
    this.voCorrect[0].onPlay.add(this.disableInput,this);
    
    this.voCorrect.push(this.add.audio('vo_sc01_correct_2'));
    this.voCorrect[1].onStop.add(this.enableInput,this);
    this.voCorrect[1].onPlay.add(this.disableInput,this);
    
    this.voCorrect.push(this.add.audio('vo_sc01_correct_2'));
    this.voCorrect[2].onStop.add(this.enableInput,this);
    this.voCorrect[2].onPlay.add(this.disableInput,this);
    
    this.voWrong = this.add.audio('vo_sc01_wrong');
    this.voWrong.onStop.add(this.enableInput,this);
    this.voWrong.onPlay.add(this.disableInput,this);
    
    this.voEnd = this.add.audio('vo_sc01_end');
    this.voEnd.onStop.add(this.enableInput,this);
    this.voEnd.onPlay.add(this.disableInput,this);*/
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.background = game.add.sprite(0, 0, 'bkg_flowchart1');

    var validCounter = 0, i;

    /*this.spotsObjects = [];
    for (i = 0; i < DataFlowchart3.spotsData.length; i++){
      this.spotsObjects.push(new SpotObject(DataFlowchart3.spotsData[i],this));
      this.spotsObjects[i].active = true;
      
      //Reference to the sprite on the scene
      if(DataFlowchart3.goodAnimation.atlas == "")
        this.spotsObjects[i].good = this.add.sprite ( DataFlowchart3.spotsData[i].x + DataFlowchart3.goodAnimation.x, DataFlowchart3.spotsData[i].y + DataFlowchart3.goodAnimation.y, DataFlowchart3.goodAnimation.spriteName);
      else
        this.spotsObjects[i].good = this.add.sprite ( DataFlowchart3.spotsData[i].x + DataFlowchart3.goodAnimation.x, DataFlowchart3.spotsData[i].y + DataFlowchart3.goodAnimation.y, DataFlowchart3.goodAnimation.atlas, DataFlowchart3.goodAnimation.spriteName);
      
      this.spotsObjects[i].good.pivot.set(this.spotsObjects[i].good.width * 0.5, this.spotsObjects[i].good.height * 0.5);
      this.spotsObjects[i].good.alpha = 0;
      this.spotsObjects[i].good.rotation = this.rnd.realInRange(0,2*Math.PI);
      this.spotsObjects[i].good.animations.add('good', [], 12, false, false);
    }
    
    this.dragablesObjects = [];
    for (i = 0; i < DataFlowchart3.dragableData.length; i++) {
      this.dragablesObjects.push(new DragableObject(DataFlowchart3.dragableData[i],this));
      this.dragablesObjects[i].addOnSpotEvent(this.mySpotEvent);
      this.dragablesObjects[i].addOnNotSpotEvent(this.myNotOnSpotEvent);
      for(var j = 0; j < DataFlowchart3.dragableData[i].validSpots.length; j++){
        this.dragablesObjects[i].addSpot (this.spotsObjects[j], DataFlowchart3.dragableData[i].validSpots[j]);
        this.dragablesObjects[i].spots[j].good = this.spotsObjects[j].good;
      }
      this.dragablesObjects[i].pickAudio = this.sfxPick;
      if(DataFlowchart3.dragableData[i].valid)
        validCounter++;
    }*/
    
    var style = { font: "14px Myriad Pro(Bold Condensed)", fill: "#0000ff", align: "center"};
    
    this.counter = 0;
    
    this.clickableObjects = [];
    for (i = 0; i < DataFlowchart3.clickableData.length; i++){
      this.clickableObjects.push(new ClickableObject(DataFlowchart3.clickableData[i],this));
      this.clickableObjects[i].sprite.scale.setTo(DataFlowchart3.clickableData[i].scale);
      
      this.clickableObjects[i].text = this.add.text ( DataFlowchart3.clickableData[i].textOffsetX, DataFlowchart3.clickableData[i].textOffsetY, DataFlowchart3.clickableData[i].text, style);
      this.clickableObjects[i].text.anchor.setTo(0.5);
      this.clickableObjects[i].sprite.addChild(this.clickableObjects[i].text);
      
      //	A mask is a Graphics object
      this.clickableObjects[i].frontColor = game.add.graphics(0, 0);
      //	Shapes drawn to the Graphics object must be filled.
      this.clickableObjects[i].frontColor.beginFill(0x008800);
      //	Here we'll draw a circle
      this.clickableObjects[i].frontColor.drawRect(this.clickableObjects[i].sprite.x - this.clickableObjects[i].sprite.width*0.55, this.clickableObjects[i].sprite.y - this.clickableObjects[i].sprite.height*0.3 + DataFlowchart3.clickableData[i].textOffsetY, this.clickableObjects[i].sprite.width*1.1, this.clickableObjects[i].sprite.height*0.6);
      this.clickableObjects[i].frontColor.alpha = 0;
    }

    this.step = 0;

    //this.messageHandler = this.add.text(10,10,DataFlowchart3.firstMessage);
    this.messageHandler = new MessageHandler (DataFlowchart.messageData, this);
    
    this.progressHandler = new ProgressHandler(DataFlowchart.progressData, this);
    this.progressHandler.setStep(3);
    this.time.events.add(2000, this.playIntro, this);
  },
  playIntro: function () {
    game.input.enabled = true;
    this.voBegin.play();
    this.executeStep();
    //this.messageHandler.showMessage(DataFlowchart3.firstMessage,0);
    //this.time.events.add(2000, this.executeStep, this);
    //this.voBegin.play();
  },
  executeStep(){
    if(this.step == DataFlowchart3.scriptedAnimation.length)
      this.goToNextScene();
    else{
      this.messageHandler.showMessage(DataFlowchart3.scriptedAnimation[this.step].message, 0);
      for(var i = 0; i < this.clickableObjects.length; i++)
        this.clickableObjects[i].frontColor.alpha = 0;
      for(var i = 0; i < DataFlowchart3.scriptedAnimation[this.step].highlightData.length; i++)
        this.clickableObjects[DataFlowchart3.scriptedAnimation[this.step].highlightData[i]].frontColor.alpha = 0.5;
      this.time.events.add(DataFlowchart3.scriptedAnimation[this.step].timeNextEvent, this.executeStep, this);
      this.step++;
    }
  },
  endLevel : function(gameContext){
    //gameContext.stopAllVO(gameContext);
    //this.voEnd.play();
    //gameContext.messageHandler.showMessage(DataFlowchart3.lastMessage, 1);
    this.time.events.add(2000, this.goToNextScene, this);
  },
  enableInput: function(){
    game.input.enabled = true;
  },
  disableInput: function(){
    game.input.enabled = false;
  },
  goToNextScene: function () {
    this.state.start('StateFlowchart4');
  }/*,
  stopAllVO : function(gameContext){
    gameContext.voBegin.stop();
    gameContext.voCorrect[0].stop();
    gameContext.voCorrect[1].stop();
    gameContext.voCorrect[2].stop();
    gameContext.voWrong.stop();
    gameContext.voEnd.stop();
  }*/
};