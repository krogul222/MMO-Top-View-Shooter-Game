import { MapController } from './../MapControler';
import { Player } from './Player';
import { Actor } from './Actor';
import { Pack } from '../Pack';
import { Point } from '../GeometryAndPhysics';
import { initPack, removePack } from '../globalVariables';
import { WeaponType } from '../enums';

export class Enemy extends Actor {

    toRemove: boolean = false;
    private kind: string = "";

    static globalMapControler = new MapController(null); 
    public superUpdate;

    constructor(param) {
        super(param);
        Enemy.list[param.id] = this;
        if(param.kind) this.kind = param.kind;
        this.attackController.pressingAttack = true;

        this.giveWeapons();

        initPack.enemy.push(this.getInitPack());
    } 

    extendedUpdate = () => {
        this.update();
        
        let player: Player = this.getClosestPlayer(10000, 360);

        let diffX = 0;
        let diffY = 0;
        
        if(player){
            diffX = player.position.x - this.position.x;
		    diffY = player.position.y - this.position.y;
        }

		this.updateAim(player, diffX, diffY);
		this.updateKeyPress(player, diffX, diffY);
        this.updateAttack(player, diffX, diffY);
	}

    updateAim = (player: Player, diffX: number, diffY: number) => {
		this.movementController.aimAngle = Math.atan2(diffY,diffX) / Math.PI * 180;
    }

	updateKeyPress = (player: Player, diffX: number, diffY: number) => {

        let safeDistance = 20;
        
        safeDistance = (this.attackController.melee) ? 30 : 100;

		this.movementController.pressingRight = diffX > safeDistance;
		this.movementController.pressingLeft = diffX < -safeDistance;
		this.movementController.pressingDown = diffY > safeDistance;
        this.movementController.pressingUp = diffY < -safeDistance; 
    }

    updateAttack = (player: Player, diffX: number, diffY: number) => {
        if(this.attackController.melee){
            if(Math.sqrt(diffX*diffX+diffY*diffY)<50)
		          this.attackController.performAttack();
        } else{
            if(Math.sqrt(diffX*diffX+diffY*diffY)<500)
                this.attackController.performAttack();
        }
    }
	onDeath = () => {
		this.toRemove = true;
    }
    
    getInitPack = () => {
        return {
           id: this.id,
           position: this.position,
           hp: this.lifeAndBodyController.hp,
           hpMax: this.lifeAndBodyController.hpMax,
           map: this.map,
           img: this.img,
           width: this.width,
           height: this.height,
           moving: this.movementController.moving,
           aimAngle: this.movementController.aimAngle,
           kind: this.kind,
           attackStarted: this.attackController.attackStarted,
           weapon: this.attackController.activeWeapon.weapon,
           attackMeele: this.attackController.melee,
           reload: this.attackController.reloadCounter.isActive()    
        };
    }

    getUpdatePack = () => {       
        
        let attackStartedTmp = this.attackController.attackStarted;
        
        this.attackController.attackStarted = false;
        
        return {
           id: this.id,
           position: this.position,
           hp: this.lifeAndBodyController.hp,
           moving: this.movementController.moving,
           aimAngle: this.movementController.aimAngle,
           attackStarted: attackStartedTmp,
           weapon: this.attackController.activeWeapon.weapon,
           attackMeele: this.attackController.melee,
           reload: this.attackController.reloadCounter.isActive()    
        };
    }   

    giveWeapons = () => {
        if(this.kind == 'zombie'){
            this.inventory.addItem(WeaponType.claws,1);
            this.inventory.useItem(WeaponType.claws);
        }
            
        if(this.kind == 'scorpion'){
            this.inventory.addItem(WeaponType.pistol,1);
            this.inventory.addItem(WeaponType.shotgun,1);
            this.inventory.addItem(WeaponType.rifle,1);
                
            this.attackController.weaponCollection.setWeaponAmmo(WeaponType.shotgun, 10);
            this.attackController.weaponCollection.setWeaponAmmo(WeaponType.pistol, 20);
            this.attackController.weaponCollection.setWeaponAmmo(WeaponType.rifle, 5);
                
            if(Math.random()<0.6){
                this.inventory.useItem(WeaponType.pistol);
            } else{
                if(Math.random()< 0.5){
                    this.inventory.useItem(WeaponType.shotgun);
                } else{
                    this.inventory.useItem(WeaponType.rifle);
                }
            }
        }
    }

    static update = () => {
        let pack: any[] =[];
        
        for(let i in Enemy.list){
            let enemy = Enemy.list[i];
            enemy.extendedUpdate();
            if(enemy.toRemove){
                delete Enemy.list[i];
                Enemy.randomlyGenerate('forest');
                removePack.enemy.push(enemy.id);
            } else {
                pack.push(enemy.getUpdatePack());   
            }
        }
        return pack;
    }

    static getAllInitPack = function(){
        let enemies: any[] = [];
        for(let i in Enemy.list){
            enemies.push(Enemy.list[i].getInitPack());
        }
        return enemies;
    }

    static randomlyGenerate = function(choosenMap){
        
        let map = Enemy.globalMapControler.getMap(choosenMap);

        let x = Math.random()*map.width;
        let y = Math.random()*map.height;
        let position = new Point(x,y);

        while(map.isPositionWall(position)){
            x = Math.random() * map.width; 
            y = Math.random() * map.height;  
            position.changePosition(x, y);
        }    
        
        let difficulty = 1+Math.round(Math.random()*2)*0.5;
        let height = 48*difficulty;
        let width = 48*difficulty;
        let id = Math.random();
        let enemy: Enemy;
        if(Math.random()<0.5){
            console.log("SCORPION");
            enemy = new Enemy({
                id: id,
                position: position,
                width: width,
                height: height,
                hp: 15*difficulty, 
                atkSpd: 0.8*difficulty,
                map: choosenMap,
                img: 'scorpion',
                type:'enemy',
                kind:'scorpion',
                maxSpdX: 3,
                maxSpdY: 3});
        } else{
            console.log("ZOMBIE");
            enemy = new Enemy({
                id: id,
                position: position,
                width: width,
                height: height,
                hp: 5*difficulty, 
                atkSpd: 0.4*difficulty,
                map: choosenMap,
                img: 'zombie',
                type:'enemy',
                kind:'zombie',
                maxSpdX: 7,
                maxSpdY: 7
            });
        }
    }

    static list = {};
}