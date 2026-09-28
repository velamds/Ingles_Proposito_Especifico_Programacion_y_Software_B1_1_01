//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, DataFlowchart1, DataFlowchart, MessageHandler*/

/**
 * Main state class
 */
var StateFlowchart1 = function (game) {};

StateFlowchart1.prototype = {
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
    
    this.voBegin = [this.add.audio('1_1'),this.add.audio('1_2'), this.add.audio('1_3')];
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.background = game.add.sprite(0, 0, 'bkg_flowchart1');

    var validCounter = 0, i;

    /*this.spotsObjects = [];
    for (i = 0; i < DataFlowchart1.spotsData.length; i++){
      this.spotsObjects.push(new SpotObject(DataFlowchart1.spotsData[i],this));
      this.spotsObjects[i].active = true;
      
      //Reference to the sprite on the scene
      if(DataFlowchart1.goodAnimation.atlas == "")
        this.spotsObjects[i].good = this.add.sprite ( DataFlowchart1.spotsData[i].x + DataFlowchart1.goodAnimation.x, DataFlowchart1.spotsData[i].y + DataFlowchart1.goodAnimation.y, DataFlowchart1.goodAnimation.spriteName);
      else
        this.spotsObjects[i].good = this.add.sprite ( DataFlowchart1.spotsData[i].x + DataFlowchart1.goodAnimation.x, DataFlowchart1.spotsData[i].y + DataFlowchart1.goodAnimation.y, DataFlowchart1.goodAnimation.atlas, DataFlowchart1.goodAnimation.spriteName);
      
      this.spotsObjects[i].good.pivot.set(this.spotsObjects[i].good.width * 0.5, this.spotsObjects[i].good.height * 0.5);
      this.spotsObjects[i].good.alpha = 0;
      this.spotsObjects[i].good.rotation = this.rnd.realInRange(0,2*Math.PI);
      this.spotsObjects[i].good.animations.add('good', [], 12, false, false);
    }
    
    this.dragablesObjects = [];
    for (i = 0; i < DataFlowchart1.dragableData.length; i++) {
      this.dragablesObjects.push(new DragableObject(DataFlowchart1.dragableData[i],this));
      this.dragablesObjects[i].addOnSpotEvent(this.mySpotEvent);
      this.dragablesObjects[i].addOnNotSpotEvent(this.myNotOnSpotEvent);
      for(var j = 0; j < DataFlowchart1.dragableData[i].validSpots.length; j++){
        this.dragablesObjects[i].addSpot (this.spotsObjects[j], DataFlowchart1.dragableData[i].validSpots[j]);
        this.dragablesObjects[i].spots[j].good = this.spotsObjects[j].good;
      }
      this.dragablesObjects[i].pickAudio = this.sfxPick;
      if(DataFlowchart1.dragableData[i].valid)
        validCounter++;
    }*/
    
    var style = { font: "30px Myriad Pro(Bold Condensed)", fill: "#000000", align: "left"};
    
    this.counter = 0;
    
    this.clickableObjects = [];
    for (i = 0; i < DataFlowchart1.clickableData.length; i++){
      this.clickableObjects.push(new ClickableObject(DataFlowchart1.clickableData[i],this));
      this.clickableObjects[i].sprite.scale.setTo(DataFlowchart1.clickableData[i].scale);
      
      this.clickableObjects[i].text = this.add.text ( DataFlowchart1.clickableData[i].textOffsetX, DataFlowchart1.clickableData[i].textOffsetY, DataFlowchart1.clickableData[i].text, style);
      this.clickableObjects[i].text.x -= this.clickableObjects[0].sprite.width*0.5;
      this.clickableObjects[i].text.anchor.setTo(0,0.5);
      this.clickableObjects[i].text.alpha = 0;
      this.clickableObjects[i].sprite.addChild(this.clickableObjects[i].text);
      
      this.clickableObjects[i].sprite.events.onInputUp.add(function(){
        this.gameContext.sfxGood.play();
        this.clickableObj.text.alpha = 1;
        this.clickableObj.disable();
        this.gameContext.counter++;
        if(this.gameContext.counter == this.gameContext.clickableObjects.length)
          this.gameContext.endLevel(this.gameContext);
      }, {clickableObj : this.clickableObjects[i], gameContext : this});
    }

    this.step = 0;

    //this.messageHandler = this.add.text(10,10,DataFlowchart1.firstMessage);
    this.messageHandler = new MessageHandler (DataFlowchart.messageData, this);
    
    this.progressHandler = new ProgressHandler(DataFlowchart.progressData, this);
    this.progressHandler.setStep(1);
    this.time.events.add(2000, this.playIntro, this);
  },
  playIntro: function () {
    this.disableInput();
    this.messageHandler.showMultipleMessagesWithAudio(DataFlowchart1.firstMessage,this.voBegin, 0, this.enableInput,this);
  },
  endLevel : function(gameContext){
    //gameContext.stopAllVO(gameContext);
    //this.voEnd.play();
    //gameContext.messageHandler.showMessage(DataFlowchart1.lastMessage, 1);
    this.time.events.add(2000, this.goToNextScene, this);
  },
  enableInput: function(){
    game.input.enabled = true;
  },
  disableInput: function(){
    game.input.enabled = false;
  },
  goToNextScene: function () {
    this.state.start('StateFlowchart2');
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