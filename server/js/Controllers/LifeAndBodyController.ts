import { Actor } from './../Entities/Actor';

export class LifeAndBodyController {
    
    private _hp: number = 30;
    private _hpMax: number = 30;

    constructor(private parent: Actor, param) {
        this._hp = (param.hp) ? param.hp : this._hp;
        this._hpMax = this._hp;
    }

    get hp() { return this._hp; }
    get hpMax() { return this._hpMax; }

    heal = (hp) => {
        this._hp = (this._hp+hp > this._hpMax) ? (this._hpMax ) : (this._hp+hp);
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