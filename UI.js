export class UI{
    constructor(game) {
        this.game = game;
        this.fontsize = 30;
        this.fontFamily = 'Helvetica';
    }
    draw(context){
        context.font = this.fontsize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText('Score: ' + this.game.score, 20 , 50);

    }
}