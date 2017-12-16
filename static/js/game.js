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

/* Boot state loads the loadbar asset and then transitions to LoadScreen */
var Boot = function(game){};

Boot.prototype = {
    
    preload: function(){
        this.load.image('loadbar', 'assets/loadbar.png');
    },
    
    create: function(){
    /* set game display/scaling/rendering settings */
        game.stage.backgroundColor = "#0000FF"; 
        game.renderer.renderSession.roundPixels = false // no blurring
        this.state.start('LoadScreen');
    }

};


/* Loads all the assets (and shows load progress) -> transition to the Title Screen */
var LoadScreen = function(game){};

LoadScreen.prototype = {

    preload: function() {
        /* set the loadbar as preload sprite before to show load progress */
       /* this.loadbar = this.add.sprite(GAME_WIDTH/2, GAME_HEIGHT/2, 'loadbar');
        this.loadbar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.loadbar);

        /* load assets and create some name keys for Phaser engine */
        
        /* SPRITES */
        this.load.image('player', 'assets/player.png');
    },
    create: function() {
        /* now that assets are loaded, transition to the Title Screen */
        this.state.start('TitleScreen')
    }

};

/* TitleS Screen with menu, just a Play Button and Title for now */
var TitleScreen = function(game){};

TitleScreen.prototype = {

    create: function() {
        
        this.stage.setBackgroundColor("#0000FF");
        /* create the title, play, and instruction text*/
        this.titleText = game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2, 'PHLAPPY BIRD', {
            font: '60px Helvetica',
            fill: '#ffffff',
            fontWeight: '700'
        });
        this.titleText.anchor.set(0.5);

        /* play text */
        this.playText = game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 + 40, 'PLAY', {
            font: '15px Helvetica',
            fill: '#ffffff',
            fontWeight: '700'
        });
        this.playText.anchor.set(0.5);
        this.playText.inputEnabled = true;
        this.playText.events.onInputDown.add(this.playGame, this);

        /* Instructions */
        this.instructionText = game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 + 70,
            'Use SPACE or RIGHT-CLICK to fly',
            {
                font: '12px Helvetica',
                fill: '#ffffff',
                fontWeight: '500'    
        });
        this.instructionText.anchor.set(0.5);

    },

    update: function() {
        /* TODO animate background here */
    },

    playGame: function() {
        game.state.start('Game');
    }

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
game.state.add('Boot', Boot);
game.state.add('LoadScreen', LoadScreen);
game.state.add('TitleScreen', TitleScreen);
game.state.add('Game', Game);

/* start the game */
game.state.start('Boot');
