//create input object
export class InputHandler{
    constructor(game) {
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {

            //have index -1 is not in array
            if ( (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'f'   ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            } else if (e.key === 'd'){
                this.game.debug = !this.game.debug;
            }
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'f'  ){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            console.log(e.key, this.keys);
        });
    }

}