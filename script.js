//Board
const BOARD_ROWS = 20;
const BOARD_COLUMNS = 20;
const SQUARE_SIZE = 30;

const BOARD_COLOR = "black";

var board;
var context;

//Snake

const SNAKE_INITIAL_X = 5;
const SNAKE_INTIAL_Y = 5;

const SNAKE_COLOR = "lime";

    //Snake head

    var snakeHeadX = SQUARE_SIZE * SNAKE_INITIAL_X;
    var snakeHeadY = SQUARE_SIZE * SNAKE_INTIAL_Y;

    var snakeDirection;
    var snakeDirectionX = 0;
    var snakeDirectionY = 0;

    //Snake body

    var snakeBodyCoordinates = [];

//Apple

var appleX;
var appleY;

var eatenApples = 0

const APPLE_COLOR = "red";

//Game

var gameOver = false;

//Highscore

var highscore = 0;

window.onload = function() {

    board = document.getElementById("board");
    board.height = BOARD_ROWS * SQUARE_SIZE;
    board.width = BOARD_COLUMNS * SQUARE_SIZE;

    context = board.getContext("2d");

    placeRandomApple();
    document.addEventListener("keyup", changeDirection);
    setInterval(refreshBoard, 1000/10);
}

function refreshBoard() {
    
    if(!gameOver) {

        context.fillStyle = BOARD_COLOR;
        context.fillRect(0, 0, board.width, board.height);

        context.fillStyle = APPLE_COLOR;
        context.fillRect(appleX, appleY, SQUARE_SIZE, SQUARE_SIZE);

        if(appleX == snakeHeadX && appleY == snakeHeadY) {
            eatApple();
        }

        for(let i = snakeBodyCoordinates.length-1; i > 0; i--) {
            snakeBodyCoordinates[i] = snakeBodyCoordinates[i-1];
        }

        if(snakeBodyCoordinates.length > 0) {
            snakeBodyCoordinates[0] = [snakeHeadX, snakeHeadY];
        }

        context.fillStyle = SNAKE_COLOR;
        snakeHeadX += snakeDirectionX * SQUARE_SIZE;
        snakeHeadY += snakeDirectionY * SQUARE_SIZE;
        context.fillRect(snakeHeadX, snakeHeadY, SQUARE_SIZE, SQUARE_SIZE);

        for(let i = 0; i<snakeBodyCoordinates.length; i++) {
            context.fillRect(snakeBodyCoordinates[i][0], snakeBodyCoordinates[i][1], SQUARE_SIZE, SQUARE_SIZE);
        }

        //Game over

        if(snakeHeadX < 0 || snakeHeadX > BOARD_COLUMNS * SQUARE_SIZE || snakeHeadY < 0 || snakeHeadY > BOARD_ROWS * SQUARE_SIZE) {
            handleGameOver();
        }

        for(let i = 0; i < snakeBodyCoordinates.length; i++) {
            if(snakeHeadX == snakeBodyCoordinates[i][0] && snakeHeadY == snakeBodyCoordinates[i][1]) {
                handleGameOver();
            }
        }
    }

}

function placeRandomApple() {
    appleX = Math.floor(Math.random() * BOARD_COLUMNS) * SQUARE_SIZE;
    appleY = Math.floor(Math.random() * BOARD_ROWS) * SQUARE_SIZE;
}

function changeDirection(keyPressed) {
    if(keyPressed.code == "ArrowUp" && snakeDirection != "Down") {
        snakeDirectionX = 0;
        snakeDirectionY = -1;
        snakeDirection = "Up";
    } else if(keyPressed.code == "ArrowDown" && snakeDirection != "Up") {
        snakeDirectionX = 0;
        snakeDirectionY = 1;
        snakeDirection = "Down";
    } else if(keyPressed.code == "ArrowLeft" && snakeDirection != "Right") {
        snakeDirectionX = -1;
        snakeDirectionY = 0;
        snakeDirection = "Left";
    } else if(keyPressed.code == "ArrowRight" && snakeDirection != "Left") {
        snakeDirectionX = 1;
        snakeDirectionY = 0;
        snakeDirection = "Right";
    } 
}

function handleGameOver() {
    gameOver = true;

    updateHighscore();
    
}

function updateHighscore() {
    if(highscore < eatenApples) {
        var highscoreTag = document.getElementById("highscore");

        highscore = eatenApples;

        highscoreTag.innerHTML = "Highscore: " + highscore;
    }
}

function eatApple() {
    snakeBodyCoordinates.push([appleX, appleY])
    eatenApples++;

    var eatenApplesTag =  document.getElementById("eaten-apples");

    eatenApplesTag.innerHTML = "Eaten apples: " + eatenApples;
    
    placeRandomApple();
}