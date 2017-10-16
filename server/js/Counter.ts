export class Counter {
    constructor(private max: number, private inc: number = 1, private _value: number = 0, private active: boolean = false){}

    count = () => this._value += this.inc;

    resetIfMax = () => {
        if(this._value >= this.max && this.active){
            this._value = 0;
            return true;
        } else{
            return false;
        }
    }

    setInc = (inc) => this.inc = inc;

    reset = () => this._value = 0;

    get value() { return this._value };

    activate = () =>{
        this.active = true;
        this._value = 0;
    } 

    deactivate = () => this.active = false;

    isActive = () => { return this.active; }
}