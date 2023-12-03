import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";

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
            this.input = new InputHandler(this);
            //cal ui
            this.UI = new UI(this);
            //call enemy
            this.enemies = [];
            this.particles = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = true;
            //edit for score
            this.score = 0;
            this.fontColor = 'black;'
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();


        }
        update(deltaTime){
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            //handle enemy
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            }else{
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach(enemy =>{
                enemy.update(deltaTime);
                if(enemy.markedForDeletion){
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            });

            //handle particle
            this.particles.forEach((particle, index) => {
                particle.update();
                if(particle.markedForDeletion){
                    this.particles.splice(index, 1);
                }
            });

        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context)

            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            })

            this.particles.forEach((particle) => {
                particle.draw(context);
            });


            this.UI.draw(context);
        }

        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5){
                this.enemies.push(new GroundEnemy(this));
            }else if(this.speed > 0){
                this.enemies.push(new ClimbingEnemy(this));
            }
            this.enemies.push(new FlyingEnemy(this));

        }
    }

    //call game to create
    const game = new Game(canvas.width, canvas.height);

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