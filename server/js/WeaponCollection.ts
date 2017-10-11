import { WeaponTypes } from './WeaponTypes';
import { Actor } from './Entities/Actor';
import { WeaponType } from "./enums";

export class WeaponCollection {

        weapons: any = [];
		socket;
        server;
        owner: Actor;

        constructor() {}

        shoot = (id, bullets) => {
            return true;
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
            this.weapons.push({id:id,amount:amount, ammo: 50, reload: WeaponTypes.list[id].reload});
            console.log("Weapon " +id+" added");
            //self.refreshRender();
        }

        equip = () => {

        }
    }

export class SingleWeapon {

        ammoInGun: number = 30;
        _weapon: WeaponType;
        _ammo: number;
        name: string = "";

        constructor (param) {
            this._weapon = (param.weapon !== undefined) ? param.weapon : WeaponType.knife; 
            this._ammo = (param.ammo !== undefined) ? param.ammo : 8;
            this.name = (param.name !== undefined) ? param.name : "knife";
        } 

        get ammo() { return this._ammo; }
        get weapon() { return this._weapon; }

        reload = () => {

        }

        equip = (weapon: WeaponType) => {
            for(let i in WeaponTypes.list){
                let weaponFromBank: WeaponTypes = WeaponTypes.list[i];
                if(weaponFromBank.weapon == weapon) {
                    this._weapon = weapon;
                    this.name = weaponFromBank.name;
                   // this._ammo = weaponFromBank.ammo;
                 /*   this.attackRadius = weaponFromBank.attackRadius;
                    this.attackSpd = weaponFromBank.attackSpd;
                    this.attackMelee = weaponFromBank.attackMelee;
                    this.shootDmg = weaponFromBank.shootDmg;
                    this.meleeDmg = weaponFromBank.meleeDmg;
                    this.maxSpd = weaponFromBank.maxSpd;
                    this.shootSpeed = weaponFromBank.shootSpeed;
                    this.reloadAmmo = weaponFromBank.reloadAmmo;
                    this.reloadSpd = weaponFromBank.reloadSpd;*/
                    break;
                }
            }
        }

        get reloadSpd() { return WeaponTypes.list[this._weapon].reloadSpd; }

        get attackSpd() { return WeaponTypes.list[this._weapon].attackSpd; }

        get attackRadius() { return WeaponTypes.list[this._weapon].attackRadius; }

        get shootSpeed() { return WeaponTypes.list[this._weapon].shootSpeed; }

        get meleeDmg() { return WeaponTypes.list[this._weapon].meleeDmg; }

        get shootDmg() { return WeaponTypes.list[this._weapon].shootDmg; }


    }
