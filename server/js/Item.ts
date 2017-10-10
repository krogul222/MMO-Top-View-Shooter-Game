export class Item {

    constructor(private id: string, private name: string, private add: any, private remove: any, private event: any, private info: any) {
        Item.list[this.id] = this;
    }

    static list = {};
}

new Item("medicalkit","Medical Kit",function(player){
	
    if((player.hp+player.hpMax/2) < player.hpMax){
        player.hp += player.hpMax/2;
    } else{
        player.hp = player.hpMax;
    }
    
	player.inventory.removeItem("medicalkit",1);
}, function(actor, amount){}, function(actor, amount){}, function(actor){
    return "";
});

new Item("pistol","Pistol",function(actor){
	//Weapon.list["pistol"].equip(actor);
},function(actor, amount){
    actor.weaponCollection.addWeapon("pistol", amount);
}, function(actor, amount){
    actor.weaponCollection.removeWeapon("pistol", amount);
}, function(actor){
    return "Ammo: "+actor.weaponCollection.getWeaponAmmo("pistol");
});

new Item("knife","Knife",function(actor){
   // Weapon.list["knife"].equip(actor);
}, function(actor, amount){
    actor.weaponCollection.addWeapon("knife",amount);
}, function(actor, amount){
    actor.weaponCollection.removeWeapon("knife", amount);
}, function(actor){
    return "";
});

new Item("shotgun","Shotgun",function(actor){
	//Weapon.list["shotgun"].equip(actor);
}, function(actor, amount){
    actor.weaponCollection.addWeapon("shotgun",amount);
}, function(actor, amount){
    actor.weaponCollection.removeWeapon("shotgun", amount);
}, function(actor){
    return "Ammo: "+actor.weaponCollection.getWeaponAmmo("shotgun");
});

new Item("rifle","Rifle",function(actor){
	//Weapon.list["rifle"].equip(actor);
}, function(actor, amount){
    actor.weaponCollection.addWeapon("rifle",amount);
}, function(actor, amount){
    actor.weaponCollection.removeWeapon("rifle", amount);
}, function(actor){
    return "Ammo: "+actor.weaponCollection.getWeaponAmmo("rifle");
});

new Item("claws","Claws",function(actor){
    //Weapon.list["claws"].equip(actor);
}, function(actor, amount){
    actor.weaponCollection.addWeapon("claws",amount);
}, function(actor, amount){
    actor.weaponCollection.removeWeapon("claws", amount);
}, function(actor){
    return "";
});