import { Actor } from './../Entities/Actor';

export class LifeAndBodyController {
    
    private _hp: number = 30;
    private _hpMax: number = 30;

    private _burn: boolean = false;
    private _burnTime: number = 0;

    constructor(private parent: Actor, param) {
        this._hp = (param.hp) ? param.hp : this._hp;
        this._hpMax = this._hp;
    }

    get hp() { return this._hp; }
    get hpMax() { return this._hpMax; }
    get burn() { return this._burn; }

    heal = (hp) => {
        this._hp = (this._hp+hp > this._hpMax) ? (this._hpMax ) : (this._hp+hp);
        this._burnTime = 0;
    }

    startBurn = (time) => {
        this._burnTime = time;
    }

    update = () =>{
        if(this._burnTime > 0){
            this._burnTime--;
            this._burn = true; 

            this.wasHit(this.hpMax/1000);

        } else{
            this._burn = false;
        }
    }

    wasHit = ( damage ) => { 
        this._hp = this._hp - damage;
        this._hp = (this._hp >= 0) ? this._hp : 0;

        if(this._hp == 0) { this.parent.onDeath(); }
    }

    reset = () => {
        this._hp = this._hpMax;
    }
}