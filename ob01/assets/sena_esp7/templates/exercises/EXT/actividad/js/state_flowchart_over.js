//JS linter lines
/*jslint node: true */
'use strict';
/*global Phaser, game, Utils, Globals, SpotObject, MessageHandler*/

/**
 * Main state class
 */
var StateFlowchartOver = function (game) {};

StateFlowchartOver.prototype = {
  create: function () {
    this.game.stage.backgroundColor = '#ffffff';
  }
};