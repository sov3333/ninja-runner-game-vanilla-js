const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
}

class State {
    constructor(state){
        this.state = state;
    }
}

export class Sitting extends State {
    constructor(player){
        super('SITTING');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 11;
        this.player.frameY = 0;
    }
    handleInput(input){
        if (input.includes(`ArrowLeft`) || input.includes(`ArrowRight`)){
            this.player.setState(states.RUNNING);
        }
    }
}
export class Running extends State {
    constructor(player){
        super('RUNNING');
        this.player = player;
    }
    enter(){
        this.player.width = 2247/21;
        this.player.maxFrame = 20;
        this.player.frameY = 1;
    }
    handleInput(input){
        if (input.includes(`ArrowDown`)){
            this.player.setState(states.SITTING);
        } else if (input.includes(`ArrowUp`)){
            this.player.setState(states.JUMPING);
        }
    }
}
export class Jumping extends State {
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter(){
        if (this.player.onGround()) this.player.vy -= 25;
        this.player.width = 1111/12;
        this.player.maxFrame = 6;
        this.player.frameY = 0;
    }
    handleInput(input){
        if (this.player.vy > this.player.weight){
            this.player.setState(states.FALLING);
        }
    }
}
export class Falling extends State {
    constructor(player){
        super('FALLING');
        this.player = player;
    }
    enter(){
        this.player.maxFrame = 6;
        this.player.frameY = 0;
    }
    handleInput(input){
        if (this.player.onGround()){
            this.player.setState(states.RUNNING);
        }
    }
}