/* Benjamin Ramirez
 * December 13, 2017
 * Creating a small Flappy Bird Clone using Phaser.js */

var game;
var GAME_WIDTH = 270;
var GAME_HEIGHT = 480;

var background;
var middleground;

var player;


/* Initialize the game */
game = new Phaser.Game( GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'Phlappy Bird');


/* Create the Different Game States */

/* Loads all the assets (and shows load progress) -> transition to the Title Screen */
var Load = function(game){};

Load.prototype = {

    preload: function() {},
    create: function() {}

};

/* TitleS Screen with menu, just a Play Button and Title for now */
var TitleScreen = function(game){};

TitleScreen.prototype = {

    create: function() {},
    update: function() {},
    playGame: function() {}

};

/* The Main Game State, play the game, play again */
var Game = function(game){};

Game.prototype = {

    create: function() {},
    update: function() {},
    handleInput: function() {},
    gameWon: function() {},
    gameOver: function() {}

};


/* Add the States created to the game */
game.state.add('Load', Load);
