//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, DataFlowchart2, DataFlowchart, MessageHandler*/

/**
 * Main state class
 */
var StateFlowchart2 = function (game) {};

StateFlowchart2.prototype = {
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
    
    this.voBegin = [this.add.audio('2_1'),this.add.audio('2_2')];
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
    for (i = 0; i < DataFlowchart2.spotsData.length; i++){
      this.spotsObjects.push(new SpotObject(DataFlowchart2.spotsData[i],this));
      this.spotsObjects[i].active = true;
      
      //Reference to the sprite on the scene
      if(DataFlowchart2.goodAnimation.atlas == "")
        this.spotsObjects[i].good = this.add.sprite ( DataFlowchart2.spotsData[i].x + DataFlowchart2.goodAnimation.x, DataFlowchart2.spotsData[i].y + DataFlowchart2.goodAnimation.y, DataFlowchart2.goodAnimation.spriteName);
      else
        this.spotsObjects[i].good = this.add.sprite ( DataFlowchart2.spotsData[i].x + DataFlowchart2.goodAnimation.x, DataFlowchart2.spotsData[i].y + DataFlowchart2.goodAnimation.y, DataFlowchart2.goodAnimation.atlas, DataFlowchart2.goodAnimation.spriteName);
      
      this.spotsObjects[i].good.pivot.set(this.spotsObjects[i].good.width * 0.5, this.spotsObjects[i].good.height * 0.5);
      this.spotsObjects[i].good.alpha = 0;
      this.spotsObjects[i].good.rotation = this.rnd.realInRange(0,2*Math.PI);
      this.spotsObjects[i].good.animations.add('good', [], 12, false, false);
    }
    
    this.dragablesObjects = [];
    for (i = 0; i < DataFlowchart2.dragableData.length; i++) {
      this.dragablesObjects.push(new DragableObject(DataFlowchart2.dragableData[i],this));
      this.dragablesObjects[i].addOnSpotEvent(this.mySpotEvent);
      this.dragablesObjects[i].addOnNotSpotEvent(this.myNotOnSpotEvent);
      for(var j = 0; j < DataFlowchart2.dragableData[i].validSpots.length; j++){
        this.dragablesObjects[i].addSpot (this.spotsObjects[j], DataFlowchart2.dragableData[i].validSpots[j]);
        this.dragablesObjects[i].spots[j].good = this.spotsObjects[j].good;
      }
      this.dragablesObjects[i].pickAudio = this.sfxPick;
      if(DataFlowchart2.dragableData[i].valid)
        validCounter++;
    }*/
    
    var style = { font: "14px Myriad Pro(Bold Condensed)", fill: "#0000ff", align: "center"};
    
    this.counter = 0;
    
    this.clickableObjects = [];
    for (i = 0; i < DataFlowchart2.clickableData.length; i++){
      this.clickableObjects.push(new ClickableObject(DataFlowchart2.clickableData[i],this));
      this.clickableObjects[i].sprite.scale.setTo(DataFlowchart2.clickableData[i].scale);
      
      this.clickableObjects[i].text = this.add.text ( DataFlowchart2.clickableData[i].textOffsetX, DataFlowchart2.clickableData[i].textOffsetY, DataFlowchart2.clickableData[i].text, style);
      //this.clickableObjects[i].text.x -= this.clickableObjects[i].sprite.width*0.5;
      this.clickableObjects[i].text.anchor.setTo(0.5);
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

    //this.messageHandler = this.add.text(10,10,DataFlowchart2.firstMessage);
    this.messageHandler = new MessageHandler (DataFlowchart.messageData, this);
    
    this.progressHandler = new ProgressHandler(DataFlowchart.progressData, this);
    this.progressHandler.setStep(2);
    this.time.events.add(2000, this.playIntro, this);
  },
  playIntro: function () {
    this.disableInput();
    this.messageHandler.showMultipleMessagesWithAudio(DataFlowchart2.firstMessage,this.voBegin, 0, this.enableInput,this);
  },
  endLevel : function(gameContext){
    //gameContext.stopAllVO(gameContext);
    //this.voEnd.play();
    //gameContext.messageHandler.showMessage(DataFlowchart2.lastMessage, 1);
    this.time.events.add(2000, this.goToNextScene, this);
  },
  enableInput: function(){
    game.input.enabled = true;
  },
  disableInput: function(){
    game.input.enabled = false;
  },
  goToNextScene: function () {
    this.state.start('StateFlowchart3');
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