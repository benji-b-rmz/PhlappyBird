/* Benjamin Ramirez
 * December 13, 2017
 * Creating a small Flappy Bird Clone using Phaser.js */

var game;
var GAME_WIDTH = 270;
var GAME_HEIGHT = 480;
var DISTANCE_BETWEEN_OBSTACLES = 200;

var background;
var middleground;

var player;
var obstacles;
var obstacleTypes;

var majorTextStyle = {
    font: '40px Helvetica',
    fill: '#ffffff',
    fontWeight: '700'   
};

var minorTextStyle = {
    font: '30px Helvetica',
    fill: '#ffffff',
    fontWeight: '700'    
};


/* Initialize the game */
game = new Phaser.Game( GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'Phlappy Bird');


/* Create the Different Game States */

/* Boot state loads the loadbar asset and then transitions to LoadScreen */
var Boot = function(game){};

Boot.prototype = {
    
    preload: function(){
        this.load.image('loadbar', '../static/assets/loadbar.png');
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
        this.load.image('player', '../static/assets/player.png');
        
        this.load.image('smallObstacle', '../static/assets/obstacle_1.png');
        this.load.image('mediumObstacle', '../static/assets/obstacle_2.png');
        this.load.image('largeObstacle', '../static/assets/obstacle_3.png');

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
        this.titleText = game.add.text(GAME_WIDTH/2, GAME_HEIGHT/3, 'PHLAPPY\n    BIRD', majorTextStyle);
        this.titleText.anchor.set(0.5);

        /* play text */
        this.playText = game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 + 40, 'PLAY', minorTextStyle);
        this.playText.anchor.set(0.5);
        this.playText.inputEnabled = true;
        this.playText.events.onInputDown.add(this.playGame, this);

        /* Instructions */
        this.instructionText = game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2 + 70,
            'Use SPACE or RIGHT-CLICK to fly',
            minorTextStyle
        );
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

    create: function() {
        /* create the player, and input object */
        game.stage.backgroundColor = "#0000ff";

        this.createPlayer();
        this.initObstacles();
        this.flyInput = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    update: function() {

        this.handleInput();
        
        if (player.isOutOfBounds(GAME_HEIGHT)){ this.gameOver(), this}
    },
    
    handleInput: function() {

        if(this.flyInput.isDown){
            player.body.velocity.y = -300;
            console.log('attempting to fly')
        }

    },
    
    gameWon: function() {},
    
    gameOver: function() {
        console.log('gameover');
        game.state.start('GameOver');

    },

    createPlayer() {

        player = game.add.sprite( GAME_WIDTH/2, GAME_HEIGHT/2, 'player', 30);
        player.anchor.setTo(0.5);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = false;
        player.body.gravity.y = 600;

        player.isOutOfBounds = function(yBound) {
            console.log(player.body.y);
            if (player.body.y < 0 || player.body.y > GAME_HEIGHT) {
                console.log('OUT OF BOUNDS');
                return true;
            }
            else {
                return false;
            }
        }

    },

    getFurthestObstacleX: function(obstacleArray) {
        var maxX = Number.MIN_SAFE_INTEGER;
        for (var i = 0; i < obstacleArray.length; i++) {
            if (maxX < obstacleArray[i].body.x){
                maxX = obstacleArray[i].body.x;
            }
        }
        return maxX;
    },

    initObstacles: function() {
        
        obstacleTypes = ['smallObstacle', 'mediumObstacle', 'largeObstacle'];
        obstacles = game.add.group();
        var currentObstacle;
        for(var i = 0; i < 4; i++) {
            currentObstacle = obstacles.create(i * DISTANCE_BETWEEN_OBSTACLES, 0, obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)] );
            game.physics.arcade.enable(currentObstacle);
            currentObstacle.body.velocity.x = -40;

            currentObstacle.update = function() {
                /* check if the sprite went out of bounds, if so, move it to the end of the line, change its size */
                if (this.body.x < -10) {
                    this.body.x = obstacles.length * DISTANCE_BETWEEN_OBSTACLES;
                }
            }
        }

    },

};

var GameOver = function(game){};

GameOver.prototype = {

    create: function() {
        /*load background, display gameover text, play again and return to title options */
        game.stage.backgroundColor = "#ff0000";

        this.gameOverText = game.add.text(GAME_WIDTH/2, GAME_HEIGHT/3, 'GAME OVER', majorTextStyle);
        this.gameOverText.anchor.set(0.5);

        this.playAgainText = game.add.text(GAME_WIDTH/2, 2*GAME_HEIGHT/3, 'PLAY AGAIN', minorTextStyle);
        this.playAgainText.inputEnabled = true;
        this.playAgainText.events.onInputDown.add(this.playAgain, this);
        this.playAgainText.anchor.set(0.5);

        this.exitText = game.add.text(GAME_WIDTH/2, 4*GAME_HEIGHT/5, 'EXIT TO TITLE', minorTextStyle);
        this.exitText.inputEnabled = true;
        this.exitText.events.onInputDown.add(this.goToMenu, this);
        this.exitText.anchor.set(0.5);

    },

    update: function(){},

    playAgain: function(){

        game.state.start('Game');

    },

    goToMenu: function(){

        game.state.start('TitleScreen');

    }

};






/* Add the States created to the game */
game.state.add('Boot', Boot);
game.state.add('LoadScreen', LoadScreen);
game.state.add('TitleScreen', TitleScreen);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);

/* start the game */
game.state.start('Boot');
