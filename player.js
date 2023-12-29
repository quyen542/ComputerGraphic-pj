import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from "./playerStates.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessages } from "./floatingMessages.js";

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
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        this.currentState = null;

    }

    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        //check input array
        //horizontal movement
        this.x += this.speed;
        if(input.includes('ArrowRight') && this.currentState !== this.states[6]){
            this.speed = this.maxspeed;
        }
        else if(input.includes('ArrowLeft') && this.currentState !== this.states[6]){
            this.speed = -this.maxspeed;
        }
        else{
            this.speed = 0;
        }

        //horizontal boundaries



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

        //vertical boundaries
        if(this.y > this.game.height - this.height - this.game.groundMargin){
            this.y = this.game.height - this.height - this.game.groundMargin;
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
            //Hit sound check
            if (this.currentState === this.states[6]){
                if( this.frameX === 1){
                    this.sound = new Audio();
                    this.sound.src= 'sound/Dizzy.mp3' ;
                    this.sound.volume= 0.1;
                    this.sound.play();
                }
            }
            //jump sound check
            if (this.currentState === this.states[2]){
                if( this.frameX === 1){
                    this.sound = new Audio();
                    this.sound.src= 'sound/jump.mp3' ;
                    this.sound.volume= 0.1;
                    this.sound.play();
                }
            }

            //roll sound check
            if (this.currentState === this.states[4]){
                if( this.frameX === 1){
                    this.sound = new Audio();
                    this.sound.src= 'sound/fireball.mp3' ;
                    this.sound.volume= 0.1;
                    this.sound.play();
                }
            }

        }else {

            this.frameTimer += deltaTime;
        }

        //energy check
        if(this.currentState === this.states[4]){

            if(this.game.energyTimer > this.game.energyInterval){
                this.game.energyTimer = 0;
                this.game.energy -= 5;
                if(this.game.energy < 0){
                    this.game.energy = 0;
                }
            }else{
                this.game.energyTimer += deltaTime;
            }

        }else{
            if(this.game.energyTimer > this.game.energyInterval){
                this.game.energyTimer = 0;
                if(this.game.energy < this.game.maxEnergy) {
                    this.game.energy += 5;
                }
            }else{
                this.game.energyTimer += deltaTime;
            }
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
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5 ));
                if(this.currentState === this.states[4] || this.currentState === this.states[5]){
                    this.game.score++;
                    this.game.floatingMessages.push(new FloatingMessages('+1', enemy.x, enemy.y, 150, 50 ));

                }else{
                    this.setState(6, 0);
                    this.game.lives--;
                    if(this.game.lives <= 0){
                        this.game.gameOver = true;
                    }
                }
            }
        })
    }
}