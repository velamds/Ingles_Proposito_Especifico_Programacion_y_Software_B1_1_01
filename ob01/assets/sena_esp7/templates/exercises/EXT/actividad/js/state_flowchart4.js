//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, DataFlowchart4, DataFlowchart, MessageHandler*/

/**
 * Main state class
 */
var StateFlowchart4 = function (game) {};

StateFlowchart4.prototype = {
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
    
    this.voBegin = [this.add.audio('4_1'),this.add.audio('4_2')];
    this.voEnd = this.add.audio('5');
    this.voEnd.onStop.add(this.enableInput,this);
    this.voEnd.onPlay.add(this.disableInput,this);
    
    this.voCorrect = this.add.audio('correct');
    this.voCorrect.onStop.add(this.enableInput,this);
    this.voCorrect.onPlay.add(this.disableInput,this);
    
    this.voWrong = this.add.audio('wrong');
    this.voWrong.onStop.add(this.enableInput,this);
    this.voWrong.onPlay.add(this.disableInput,this);
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

    var style = { font: "14px Arial", fill: "#0000ff", align: "center"};
    
    this.spotsObjects = [];
    for (i = 0; i < DataFlowchart4.spotsData.length; i++){
      this.spotsObjects.push(new SpotObject(DataFlowchart4.spotsData[i],this));
      
      this.spotsObjects[i].sprite.scale.setTo(DataFlowchart4.spotsData[i].scale);
      
      //Reference to the sprite on the scene
      if(DataFlowchart4.goodAnimation.atlas == "")
        this.spotsObjects[i].good = this.add.sprite ( DataFlowchart4.spotsData[i].x + DataFlowchart4.goodAnimation.x, DataFlowchart4.spotsData[i].y + DataFlowchart4.goodAnimation.y, DataFlowchart4.goodAnimation.spriteName);
      else
        this.spotsObjects[i].good = this.add.sprite ( DataFlowchart4.spotsData[i].x + DataFlowchart4.goodAnimation.x, DataFlowchart4.spotsData[i].y + DataFlowchart4.goodAnimation.y, DataFlowchart4.goodAnimation.atlas, DataFlowchart4.goodAnimation.spriteName);
      
      this.spotsObjects[i].good.pivot.set(this.spotsObjects[i].good.width * 0.5, this.spotsObjects[i].good.height * 0.5);
      this.spotsObjects[i].good.alpha = 0;
      this.spotsObjects[i].good.rotation = this.rnd.realInRange(0,2*Math.PI);
      this.spotsObjects[i].good.animations.add('good', [], 12, false, false);
      
      this.spotsObjects[i].text = this.add.text ( DataFlowchart4.spotsData[i].textOffsetX, DataFlowchart4.spotsData[i].textOffsetY, DataFlowchart4.spotsData[i].text, style);
      this.spotsObjects[i].text.alpha = 0;
      this.spotsObjects[i].text.anchor.setTo(0.5);
      this.spotsObjects[i].sprite.addChild(this.spotsObjects[i].text);
    }
    
    style = { font: "24px Arial", fill: "#000000", align: "center"};
    
    this.dragablesObjects = [];
    for (i = 0; i < DataFlowchart4.dragableData.length; i++) {
      this.dragablesObjects.push(new DragableObject(DataFlowchart4.dragableData[i],this));
      this.dragablesObjects[i].addOnSpotEvent(this.mySpotEvent);
      this.dragablesObjects[i].addOnNotSpotEvent(this.myNotOnSpotEvent);
      //this.dragablesObjects[i].sprite.alpha = 0.5;
      
      this.dragablesObjects[i].sprite.scale.setTo(DataFlowchart4.dragableData[i].scale);
      
      this.dragablesObjects[i].text = this.add.text ( DataFlowchart4.dragableData[i].textOffsetX, DataFlowchart4.dragableData[i].textOffsetY, DataFlowchart4.dragableData[i].text, style);
      this.dragablesObjects[i].text.anchor.setTo(0.5);
      this.dragablesObjects[i].sprite.addChild(this.dragablesObjects[i].text);
      
      for(var j = 0; j < DataFlowchart4.dragableData[i].validSpots.length; j++){
        this.dragablesObjects[i].addSpot (this.spotsObjects[j], DataFlowchart4.dragableData[i].validSpots[j]);
        this.dragablesObjects[i].spots[j].good = this.spotsObjects[j].good;
        this.dragablesObjects[i].spots[j].text = this.spotsObjects[j].text;
      }
      this.dragablesObjects[i].pickAudio = this.sfxPick;
      if(DataFlowchart4.dragableData[i].valid)
        validCounter++;
    }
    
    this.counter = 0;

    this.step = 0;

    //this.messageHandler = this.add.text(10,10,DataFlowchart4.firstMessage);
    this.messageHandler = new MessageHandler (DataFlowchart.messageData, this);
    
    this.progressHandler = new ProgressHandler(DataFlowchart.progressData, this);
    this.progressHandler.setStep(4);
    this.time.events.add(2000, this.playIntro, this);
  },
  playIntro: function () {
    this.disableInput();
    this.messageHandler.showMultipleMessagesWithAudio(DataFlowchart4.firstMessage,this.voBegin, 0, this.enableInput,this);
  },
  mySpotEvent : function (dragableObj,spotObj,gameContext) {
    if(spotObj.sprite.tint != 0xffffff){
      gameContext.myNotOnSpotEvent(dragableObj,gameContext);
      return;
    }
    for(var i = 0; i < gameContext.dragablesObjects.length; i++)
      gameContext.dragablesObjects[i].changeToCorrect();
    
    for(var i = 0; i < gameContext.spotsObjects.length; i++){
      if(gameContext.spotsObjects[i].sprite.tint == 0xf09090){
        gameContext.spotsObjects[i].sprite.tint = 0xffffff;
        gameContext.spotsObjects[i].text.alpha = 0;
      }
    }
    
    if(spotObj.data.valid && dragableObj.data.valid){
      //gameContext.voCorrect[gameContext.step].play();
      
      for(var i = 0; i < gameContext.dragablesObjects.length; i++)
          gameContext.dragablesObjects[i].changeSpotValid(spotObj, 2);
      
      spotObj.sprite.tint = 0x90f09b;
      spotObj.text.alpha = 1;
      spotObj.text.setText(dragableObj.text.text);
      
      gameContext.sfxGood.play();
      gameContext.counter++;
      dragableObj.sprite.inputEnabled = false;
      if(dragableObj.data.hideOnEvent){
        dragableObj.sprite.alpha = 0;
      }else{
        dragableObj.sprite.alpha = 0;
        dragableObj.sprite.x = spotObj.sprite.x;
        dragableObj.sprite.y = spotObj.sprite.y;
      }
      gameContext.voCorrect.play();
      gameContext.messageHandler.showMessage(dragableObj.data.messageOnValidSpot, 1);
      spotObj.good.play('good');
      spotObj.good.alpha = 1;
      spotObj.good.bringToTop();
      if(gameContext.counter == DataFlowchart4.objective[gameContext.step])
      {
        gameContext.step++;
        if(gameContext.step == DataFlowchart4.objective.length){
          gameContext.sfxWin.play();
          gameContext.endLevel(gameContext);
        }else{
          gameContext.counter = 0;
        }
        //game.state.start('StateActivity14');
      }
    }else{
      //gameContext.voWrong.play();
      gameContext.sfxBad.play();
      
      dragableObj.sprite.x = dragableObj.oldPosition.x;
      dragableObj.sprite.y = dragableObj.oldPosition.y;
      
      //spotObj.text.alpha = 1;
      //spotObj.text.setText(dragableObj.text.text);
      //spotObj.sprite.tint = 0xf09090;
      
      dragableObj.changeToWrong();
      gameContext.voWrong.play();
      gameContext.messageHandler.showMessage(dragableObj.data.messageOnWrongSpot, 2);
    }
  },
  myNotOnSpotEvent : function(dragableObj,gameContext){
    gameContext.sfxDrop.play();
    dragableObj.sprite.x = dragableObj.oldPosition.x;
    dragableObj.sprite.y = dragableObj.oldPosition.y;
  },
  endLevel : function(gameContext){
    this.voCorrect.stop();
    this.voEnd.play();
    gameContext.messageHandler.showMessage(DataFlowchart4.lastMessage, 0);
    this.time.events.add(8000, this.goToNextScene, this);
  },
  enableInput: function(){
    game.input.enabled = true;
  },
  disableInput: function(){
    game.input.enabled = false;
  },
  goToNextScene: function () {
    this.state.start('StateFlowchartOver');
  }
};