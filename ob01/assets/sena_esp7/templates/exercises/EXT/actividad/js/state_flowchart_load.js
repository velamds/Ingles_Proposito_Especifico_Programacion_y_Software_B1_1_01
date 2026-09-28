//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, MessageHandler*/

/**
 * Main state class
 */
var StateFlowchartLoad = function (game) {};

StateFlowchartLoad.prototype = {
  preload: function () {
    this.game.stage.backgroundColor = '#ffffff';
    var progBarBkg = this.add.sprite(0, 0, 'ui_button_wrong');
    progBarBkg.x = this.world.centerX - progBarBkg.width / 2;  
    progBarBkg.y = this.world.centerY;
    
    var progBarFrg = this.add.sprite(0, 0, 'ui_button_right');
    progBarFrg.x = progBarBkg.x;
    progBarFrg.y = progBarBkg.y;
    
    this.load.setPreloadSprite(progBarFrg);
    
    // Voice over
    /*this.load.audio('vo_well_done', 'snd/vos/wellDone.ogg');
    this.load.audio('vo_correct', 'snd/vos/correct.ogg');
    this.load.audio('vo_wrong', 'snd/vos/wrong.ogg');
    
    this.load.audio('vo_sc01_01', 'snd/vos/flowchart_sc01_01.ogg');
    this.load.audio('vo_sc01_correct', 'snd/vos/flowchart_sc01_correct.ogg');
    this.load.audio('vo_sc01_end', 'snd/vos/flowchart_sc01_end.ogg');
    this.load.audio('vo_sc01_wrong', 'snd/vos/flowchart_sc01_wrong.ogg');*/
    
    this.load.audio('1_1', ['snd/vos/1_1.mp3', 'snd/vos/1_1.ogg']);
    this.load.audio('1_2', ['snd/vos/1_2.mp3', 'snd/vos/1_2.ogg']);
    this.load.audio('1_3', ['snd/vos/1_3.mp3', 'snd/vos/1_3.ogg']);
    this.load.audio('2_1', ['snd/vos/2_1.mp3', 'snd/vos/2_1.ogg']);
    this.load.audio('2_2', ['snd/vos/2_2.mp3', 'snd/vos/2_2.ogg']);
    this.load.audio('3_1', ['snd/vos/3_1.mp3', 'snd/vos/3_1.ogg']);
    this.load.audio('3_2', ['snd/vos/3_2.mp3', 'snd/vos/3_2.ogg']);
    this.load.audio('4_1', ['snd/vos/4_1.mp3', 'snd/vos/4_1.ogg']);
    this.load.audio('4_2', ['snd/vos/4_2.mp3', 'snd/vos/4_2.ogg']);
    this.load.audio('5', ['snd/vos/5.mp3', 'snd/vos/5.ogg']);
    
    this.load.audio('correct', ['snd/vos/correct.mp3', 'snd/vos/correct.ogg']);
    this.load.audio('wrong', ['snd/vos/wrong.mp3', 'snd/vos/wrong.ogg']);
    
    
    // Assets for All scenes
    this.load.audio('sfx_bad', ['snd/bad.mp3', 'snd/bad.ogg']);
    this.load.audio('sfx_drop', ['snd/drop.mp3', 'snd/drop.ogg']);
    this.load.audio('sfx_good', ['snd/good.mp3', 'snd/good.ogg']);
    this.load.audio('sfx_pick', ['snd/pick.mp3', 'snd/pick.ogg']);
    this.load.audio('sfx_win', ['snd/win.mp3', 'snd/win.ogg']);
    
    this.load.atlasJSONHash('goodAnimation',
      'img/gen_effects_st01.png',
      'img/gen_effects_st01.json');
    this.load.atlasJSONHash('UI',
      'img/sena_ui_st01.png',
      'img/sena_ui_st01.json');
    
    this.load.image('nameBox', 'img/tooltip.png');
    this.load.image('nameBoxLarge', 'img/tooltip2.png');
    
    // Assets for Scene 1
    this.load.image('bkg_flowchart1', 'img/flowchart_BKG01.png');
    this.load.atlasJSONHash('flowchart1', 'img/flowchart_sc01_st01.png', 'img/flowchart_sc01_st01.json');
    // Assets for Scene 2
    this.load.image('btn_wrong', 'img/ui_button_wrong.png');
    this.load.image('btn_right', 'img/ui_button_right.png');
    this.load.image('btn_idle', 'img/ui_button_idle.png');
    // Assets for Scene 3
    // Assets for Scene 3
    // Assets for Scene 4
  },
  create: function () {
    this.state.start('StateFlowchart1');
  }
};