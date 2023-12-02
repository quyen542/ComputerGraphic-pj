import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;
    //Create game
    class Game{
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 3;
            //call background
            this.background = new Background(this);
            //call new player
            this.player = new Player(this);
            //call new inputhandler to get keyboard
            this.input = new InputHandler();

        }
        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context)
        }
    }

    //call game to create
    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    let lastTime = 0;


    //Update and draw game over and over
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        //make motion move
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);


})