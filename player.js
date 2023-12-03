import { Sitting, Running, Jumping, Falling, Rolling } from "./playerStates.js";

//Create player
export class Player{
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        //weight for falling and high in jumping
        this.vy = 0;
        this.weight = 1;
        //get image player from html
        this.image = document.getElementById('player');
        //place position in the image
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        //speed for moving
        this.speed = 0;
        this.maxspeed = 10;
        //state for player
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game)];

    }

    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        //check input array
        //horizontal movement
        this.x += this.speed;
        if(input.includes('ArrowRight')){
            this.speed = this.maxspeed;
        }
        else if(input.includes('ArrowLeft')){
            this.speed = -this.maxspeed;
        }
        else{
            this.speed = 0;
        }

        //prevent go outside canvas
        if(this.x < 0){
            this.x = 0;
        }
        if(this.x > this.game.width - this.width){
            this.x = this.game.width - this.width;
        }

        //vertical movement

        this.y += this.vy;
        if(!this.onGround()){
            this.vy += this.weight;
        }
        else{
            this.vy = 0;
        }

        //sprite animation

        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame){
                this.frameX++;
            }
            else {
                this.frameX = 0;
            }
        }else{
            this.frameTimer += deltaTime;
        }





    }

    draw(context){
        //draw player
        //0, 0 is the place in the img
        if(this.game.debug){
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);

    }


    //check player on the ground or in the air
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();

    }

    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ){
                //collision detected
                enemy.markedForDeletion = true;
                this.game.score++;
            }else{
                // no collision
            }
        })
    }
}