import { Actor } from "../Entities/Actor";
import { ItemType, WeaponType } from "../enums";


export class Item {

    constructor(private id: any, private name: string, private event: any, private add: any, private remove: any, private info: any) {
        Item.list[this.id] = this;
    }

    static list = {};
}

new Item(ItemType.medicalkit,"Medical Kit",function(player: Actor){
    player.lifeAndBodyController.heal(10);
	player.inventory.removeItem(ItemType.medicalkit,1);
}, function(actor, amount){}, function(actor, amount){}, function(actor){
    return "";
});

new Item(WeaponType.pistol,"Pistol",function(actor: Actor){
    actor.attackController.equip(WeaponType.pistol);
},function(actor: Actor, amount: number){
    actor.attackController.weaponCollection.addWeapon(WeaponType.pistol, amount);
}, function(actor: Actor, amount: number){
    actor.attackController.weaponCollection.removeWeapon(WeaponType.pistol, amount);
}, function(actor: Actor){
    //return "Ammo: "+actor.weaponCollection.getWeaponAmmo("pistol");
});

new Item(WeaponType.flamethrower,"Flamethrower",function(actor: Actor){
    actor.attackController.equip(WeaponType.flamethrower);
},function(actor: Actor, amount: number){
    actor.attackController.weaponCollection.addWeapon(WeaponType.flamethrower, amount);
}, function(actor: Actor, amount: number){
    actor.attackController.weaponCollection.removeWeapon(WeaponType.flamethrower, amount);
}, function(actor: Actor){
    //return "Ammo: "+actor.weaponCollection.getWeaponAmmo("pistol");
});

new Item(WeaponType.knife,"Knife",function(actor){
    actor.attackController.equip(WeaponType.knife);
},function(actor: Actor, amount: number){
    actor.attackController.weaponCollection.addWeapon(WeaponType.knife, amount);
}, function(actor: Actor, amount: number){
    actor.attackController.weaponCollection.removeWeapon(WeaponType.knife, amount);
}, function(actor: Actor){
    //return "Ammo: "+actor.weaponCollection.getWeaponAmmo("pistol");
});

new Item(WeaponType.shotgun,"Shotgun",function(actor){
    actor.attackController.equip(WeaponType.shotgun);
},function(actor: Actor, amount: number){
    actor.attackController.weaponCollection.addWeapon(WeaponType.shotgun, amount);
}, function(actor: Actor, amount: number){
    actor.attackController.weaponCollection.removeWeapon(WeaponType.shotgun, amount);
}, function(actor: Actor){
    //return "Ammo: "+actor.weaponCollection.getWeaponAmmo("pistol");
});

new Item(WeaponType.rifle,"Rifle",function(actor){
    actor.attackController.equip(WeaponType.rifle);
},function(actor: Actor, amount: number){
    actor.attackController.weaponCollection.addWeapon(WeaponType.rifle, amount);
}, function(actor: Actor, amount: number){
    actor.attackController.weaponCollection.removeWeapon(WeaponType.rifle, amount);
}, function(actor: Actor){
    //return "Ammo: "+actor.weaponCollection.getWeaponAmmo("pistol");
});

new Item(WeaponType.claws,"Claws",function(actor){
    actor.attackController.equip(WeaponType.claws);
},function(actor: Actor, amount: number){
    actor.attackController.weaponCollection.addWeapon(WeaponType.claws, amount);
}, function(actor: Actor, amount: number){
    actor.attackController.weaponCollection.removeWeapon(WeaponType.claws, amount);
}, function(actor: Actor){
    //return "Ammo: "+actor.weaponCollection.getWeaponAmmo("pistol");
});