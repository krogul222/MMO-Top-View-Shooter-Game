import { Actor } from './Entities/Actor';
import { WeaponType } from "./enums";

export class WeaponCollection {

        weapons: any = [];
		socket;
        server;
        owner: Actor;

        constructor() {}

        shoot = (id, bullets) => {

        }

        chooseNextWeaponWithAmmo = () => {

        }

        choosePrevWeaponWithAmmo = () => {
            
        }

        addWeapon = (id,amount) => {
            for(var i = 0 ; i < this.weapons.length; i++){
                if(this.weapons[i].id === id){
                    this.weapons[i].amount += amount;
                    return;
                }
            }
            this.weapons.push({id:id,amount:amount, ammo: 50, reload: Weapon.list[id].reload});
            console.log("Weapon " +id+" added");
            //self.refreshRender();
        }
    }

export class SingleWeapon {
        meleeDmg: number = 0;
        shootDmg: number = 0;
        shootSpeed: number = 0;
        attackRadius: number = 0;
        attackSpd: number = 30;
        attackMelee: boolean = true;
        reloadSpd: number = 30;
        ammoInGun: number = 30;
        _weapon: WeaponType;
        _ammo: number;
        maxSpd: number = 8;
        reloadTime: number = 0;
       // recoil: number = 0;

        //private _weapon: WeaponType, private _ammo: number, private radius: number = 0
        constructor (param) {
            this._weapon = (param.weapon !== undefined) ? param.weapon : WeaponType.knife; 
            this.attackRadius = (param.attackRadius !== undefined) ? param.attackRadius : 0; 
            this.attackSpd = (param.attackSpd !== undefined) ? param.attackSpd : 0;
            this.attackMelee = (param.attackMelee !== undefined) ? param.attackMelee : true;
            this.shootDmg = (param.shootDmg !== undefined) ? param.shootDmg : 0;
            this.meleeDmg = (param.meleeDmg !== undefined) ? param.meleeDmg : 0;
            this.maxSpd = (param.maxSpd !== undefined) ? param.maxSpd : 8;
            this._ammo = (param.ammo !== undefined) ? param.ammo : 8;
            this.shootSpeed = (param.shootSpeed !== undefined) ? param.shootSpeed : 0;
            this.reloadTime = (param.reloadTime !== undefined) ? param.reloadTime : 0;
            this.reloadSpd = (param.reloadSpd !== undefined) ? param.reloadSpd : 0;
           // this.recoil = (param.recoil !== undefined) ? param.recoil : 0;
        } 

        get ammo() { return this._ammo; }
        get weapon() { return this._weapon; }

        reload = () => {

        }
    }
