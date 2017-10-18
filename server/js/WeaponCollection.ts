import { WeaponTypes } from './WeaponTypes';
import { Actor } from './Entities/Actor';
import { WeaponType } from "./enums";

export class WeaponCollection {

        weapons: any = [];
		socket;
        server;
        owner: Actor;

        constructor(owner) {
            this.owner = owner;
        }

        shoot = (id, bullets) => {
            return true;
        }

        chooseNextWeaponWithAmmo = () => {
            if(!this.owner.attackController.reloadCounter.isActive()){
                let inc = 1;
    
                for(let i = 0 ; i < this.weapons.length; i++){
                    if(this.weapons[i].id === this.owner.attackController.activeWeapon.weapon){
                        while(i+inc < this.weapons.length){
                            if(this.weapons[i+inc].ammoInGun >0 ){
                                this.owner.attackController.equip(this.weapons[i+inc].id);
                                return;
                            } else{
                                inc++;
                            }
                        }
                        inc = 0;
                        while( inc < i){
                            if(this.weapons[inc].ammoInGun >0 ){
                                this.owner.attackController.equip(this.weapons[inc].id);
                                return;
                            } else{
                                inc++;
                            }
                        }
    
                        return;
                    }
                } 
            }
        }

        choosePrevWeaponWithAmmo = () => {
            
        }


        setWeaponAmmo = (id: WeaponType, ammo) => {
            for(let i = 0 ; i < this.weapons.length; i++){
                if(this.weapons[i].id === id){
                    this.weapons[i].ammo = ammo;
                    if(this.owner.attackController.activeWeapon.weapon == id){
                        if(this.owner.attackController.activeWeapon.ammo == 0 && ammo > 0){
                            this.owner.attackController.reloadCounter.activate();
                        } 
                        this.owner.attackController.activeWeapon.updateAmmo();
                    }
                }
            }
        }

        addWeaponAmmo = (id: WeaponType, ammo) => {
            for(let i = 0 ; i < this.weapons.length; i++){
                if(this.weapons[i].id === id){
                    this.weapons[i].ammo = this.weapons[i].ammo + ammo;
                    if(this.owner.attackController.activeWeapon.weapon == id){
                        if(this.owner.attackController.activeWeapon.ammo == 0 && ammo > 0){
                            this.owner.attackController.reloadCounter.activate();
                        } 
                        this.owner.attackController.activeWeapon.updateAmmo();
                    }
                }
            }
        }

        decAmmo = (id: WeaponType, amount: number) => {
            for(let i = 0 ; i < this.weapons.length; i++){
                if(this.weapons[i].id === id){
                    this.weapons[i].ammoInGun = (this.weapons[i].ammoInGun > amount) ? this.weapons[i].ammoInGun-amount : 0;
                }
            }
        }

        reload = (id: WeaponType) => {
            for(let i = 0 ; i < this.weapons.length; i++){
                if(this.weapons[i].id === id){
                    this.weapons[i].ammoInGun = (this.weapons[i].ammo > WeaponTypes.list[id].reloadAmmo) ? WeaponTypes.list[id].reloadAmmo : this.weapons[i].ammo;
                    this.weapons[i].ammo = this.weapons[i].ammo - this.weapons[i].ammoInGun;
                }
            }
        }

        removeWeapon = (id: WeaponType,amount: number) => {
        }

        hasWeapon = (id: WeaponType, amount: number) => {
            for(var i = 0 ; i < this.weapons.length; i++){
                if(this.weapons[i].id === id){
                    return this.weapons[i].amount >= amount;
                }
            }  
            return false;
        }

        changeWeapon = (id: WeaponType) => {
            if(this.hasWeapon(id, 1) && !this.owner.attackController.reloadCounter.isActive()){
                this.owner.attackController.equip(id);
            }
        }

        addWeapon = (id: WeaponType,amount) => {
            for(let i = 0 ; i < this.weapons.length; i++){
                if(this.weapons[i].id === id){
                    this.weapons[i].amount += amount;
                    return;
                }
            }
            this.weapons.push({id:id,amount:amount, ammo: 10, ammoInGun: WeaponTypes.list[id].reloadAmmo});
            //self.refreshRender();
        }
    }

export class SingleWeapon {

        _ammoInGun: number = 30;
        _weapon: WeaponType;
        _ammo: number;
        name: string = "";

        constructor (private parent: Actor, param) {
            if(param.weapon !== undefined) {
                this._weapon = param.weapon; 
                let weaponParameters: WeaponTypes = WeaponTypes.getWeaponParameters(this._weapon);
                this._ammoInGun = weaponParameters.reloadAmmo;
            } else{
                this._weapon = WeaponType.knife;
            }

            this._ammo = (param.ammo !== undefined) ? param.ammo : 8;
            this.name = (param.name !== undefined) ? param.name : "knife";
        } 

        get ammo() { return this._ammo; }
        get weapon() { return this._weapon; }
        get ammoInGun(){ return this._ammoInGun; }

        reload = () => {
            this.parent.attackController.weaponCollection.reload(this._weapon);
            this._ammoInGun = (this._ammo > WeaponTypes.list[this._weapon].reloadAmmo) ? WeaponTypes.list[this._weapon].reloadAmmo : this._ammo;
            this._ammo = this._ammo - this._ammoInGun;
        }

        decAmmo = (amount: number) => {
            this._ammoInGun = (this._ammoInGun - amount >= 0) ? this._ammoInGun - amount : 0;
            this.parent.attackController.weaponCollection.decAmmo(this._weapon, amount);
        }

        updateAmmo = () => {
            let weaponCollection: WeaponCollection = this.parent.attackController.weaponCollection;
            
            for(let i = 0 ; i < weaponCollection.weapons.length; i++){
                if(weaponCollection.weapons[i].id === this.weapon){
                    this._ammo = weaponCollection.weapons[i].ammo;
                }
            }
        }

        shoot = (bullets) => {
            if(bullets <= this._ammoInGun){

                        if(this._ammoInGun - bullets >= 0) {
                            this.decAmmo(bullets);
                        } else {
                            this.parent.attackController.reloadCounter.activate();
                            return false;
                        }

                        if(this._ammoInGun == 0) this.parent.attackController.reloadCounter.activate();
                        
                        if(WeaponTypes.list[this.weapon].recoil) this.parent.movementController.recoilCounter.activate();

                        return true;
                    }
            return false;
            }

        equip = (weapon: WeaponType) => {
            let weaponCollection: WeaponCollection = this.parent.attackController.weaponCollection;

            for(let i = 0 ; i < weaponCollection.weapons.length; i++){
                if(weaponCollection.weapons[i].id === weapon){
                    let weaponProperties: WeaponTypes = WeaponTypes.getWeaponParameters(weapon);
                    this._weapon = weapon;
                    this.name = weaponProperties.name;
                    this._ammo = weaponCollection.weapons[i].ammo;
                    this._ammoInGun = weaponCollection.weapons[i].ammoInGun;
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
