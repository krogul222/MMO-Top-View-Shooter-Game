import { Entity } from './Entity';

export class Upgrade extends Entity{
    private category: string = "";

    constructor(param) {
        super(Upgrade.updateParam(param));
        this.category = param.category;
    }

    static updateParam = (param) => {
        param.type = "upgrade";
        return param;
    }
}