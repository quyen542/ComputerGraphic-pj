export class UI{
    constructor(game) {
        this.game = game;
        this.fontsize = 30;
        this.fontFamily = 'Creepster';
        this.livesImage = document.getElementById('lives');
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;

        context.font = this.fontsize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText('Score: ' + this.game.score, 20 , 50);
        //timer
        context.font = this.fontsize*0.8 + 'px ' + this.fontFamily;
        context.fillText('Timer: ' + (this.game.time * 0.001).toFixed(1), 20 , 80);
        //energy
        context.font = this.fontsize*0.8 + 'px ' + this.fontFamily;
        context.fillText('Energy: ' + this.game.energy, 20 , 110);
        //lives
        for(let i =0; i < this.game.lives; i++){
            context.drawImage(this.livesImage, 25*i + 20, 120, 25, 25);
        }
        //game over message
        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontsize * 2 + 'px ' + this.fontFamily;
            if(this.game.score > this.game.winningScore){
                context.fillText('Congratulation!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontsize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('what are the creatures of the night afraid of? You !!!',  this.game.width * 0.5, this.game.height * 0.5 + 20 );
            }else{
                context.fillText('Game over!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontsize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Nope, better luck next time!',  this.game.width * 0.5, this.game.height * 0.5 + 20 );
            }
        }

        if(!this.game.startGame){
            context.textAlign = 'center';
            context.font = this.fontsize * 2 + 'px ' + this.fontFamily;
            context.fillText('Are You Ready!', this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = this.fontsize * 0.7 + 'px ' + this.fontFamily;
            context.fillText('Press -> to start the game',  this.game.width * 0.5, this.game.height * 0.5 + 20 );
        }

        context.restore();

    }
}