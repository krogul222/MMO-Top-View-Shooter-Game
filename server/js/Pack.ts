import { Upgrade } from './Entities/Upgrade';
import { Enemy } from './Entities/Enemy';
import { Bullet } from './Entities/Bullet';
import { Player } from './Entities/Player';
var initPack = {player:[],bullet:[], enemy:[], upgrade:[]};

export class Pack {
    public player: any[] = [];
    public bullet: any[] = [];
    public enemy: any[] = [];
    public upgrade: any[] = [];
    public smoke: any[] = [];
    public particle: any[] = [];

    constructor(){}
}