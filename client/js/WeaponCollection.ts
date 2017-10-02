import { WeaponType } from "./enums";

export class WeaponCollection {

        weapons;
		socket;
        server;
        owner;

        shoot = (id, bullets) => {

        }

        chooseNextWeaponWithAmmo = () => {

        }

        choosePrevWeaponWithAmmo = () => {
            
        }
    }

export class SingleWeapon {
        meleeDmg = 0;
        shootDmg = 0;
        shootSpeed = 0;
        attackRadius = 0;
        attackSpd = 30;
        reloadSpd = 30;
        ammoInGun = 30;
        
        constructor (private _weapon: WeaponType, private _ammo: number, private radius: number = 0) {} 

        get ammo() { return this._ammo; }
        get weapon() { return this._weapon; }

        reload = () => {

        }
    }
