WeaponCollection = function(socket, server, owner){
    var self = {
        weapons:[], //{id:"weaponId",amount:1}
		socket:socket,
        server: server,
        owner: owner
    }

    self.addWeapon = function(id,amount){
		for(var i = 0 ; i < self.weapons.length; i++){
			if(self.weapons[i].id === id){
				self.weapons[i].amount += amount;
                self.weapons[i].ammo += 20;
                if(owner.weapon = id){
                    owner.ammo = self.weapons[i].ammo;
                }
				//self.refreshRender();
				return;
			}
		}
		self.weapons.push({id:id,amount:amount, ammo: 20});
		//self.refreshRender();
    }
    
    self.removeWeapon = function(id,amount){
		for(var i = 0 ; i < self.weapons.length; i++){
			if(self.weapons[i].id === id){
				self.weapons[i].amount -= amount;
				if(self.weapons[i].amount <= 0)
					self.weapons.splice(i,1);
				//self.refreshRender();
				return;
			}
		}    
    }
    
    self.hasWeapon = function(id,amount){
		for(var i = 0 ; i < self.weapons.length; i++){
			if(self.weapons[i].id === id){
				return self.weapons[i].amount >= amount;
			}
		}  
		return false;
    }
    
    self.getWeaponAmmo = function(id){
        for(var i = 0 ; i < self.weapons.length; i++){
			if(self.weapons[i].id === id){
				return self.weapons[i].ammo;
			}
		}  
		return 0;
    }
    
    self.shoot = function(id, bullets){
        for(var i = 0 ; i < self.weapons.length; i++){
			if(self.weapons[i].id === id){
                if(bullets <= self.weapons[i].ammo){
                    self.weapons[i].ammo -= bullets;
                    owner.ammo = self.weapons[i].ammo;
                    return true;
                }
			}
		}  
		return false;
    }

return self;
}
        
Weapon = function(id,name,equip){
	var self = {
		id:id,
		name:name,
		equip:equip,
	}
	Weapon.list[self.id] = self;
	return self;
}
Weapon.list = {};
    
Weapon("pistol","Pistol",function(actor){
    
	actor.atackRadius = 0;
    actor.atkSpd = 4;
    actor.attackMeele = false;
    actor.atkShootDmg = 2;
    actor.atkMeeleDmg = 1;
    actor.weapon = "pistol";
    actor.maxSpd = 10;
    actor.ammo = actor.weaponCollection.getWeaponAmmo("pistol");
    actor.updateEquipment = true;
});

Weapon("shotgun","Shotgun",function(actor){
    
	actor.atackRadius = 3;
    actor.atkSpd = 2;
    actor.atkShootDmg = 3;
    actor.atkMeeleDmg = 1;
    actor.attackMeele = false;
    
    actor.weapon = "shotgun";
    actor.maxSpd = 8;
    actor.ammo = actor.weaponCollection.getWeaponAmmo("shotgun");
    actor.updateEquipment = true;
});

Weapon("knife","Knife",function(actor){
    actor.atkSpd = 3;
    actor.atkMeeleDmg = 4;
    actor.attackMeele = true;
	actor.atackRadius = 0;
    actor.ammo = actor.weaponCollection.getWeaponAmmo("knife");
    
    actor.weapon = "knife";
    actor.maxSpd = 11;
    
    actor.updateEquipment = true;
});

Weapon("rifle","Rifle",function(actor){
    
	actor.atackRadius = 0;
    actor.atkSpd = 1;
    actor.attackMeele = false;
    actor.atkShootDmg = 6;
    actor.atkMeeleDmg = 1;
    actor.weapon = "rifle";
    actor.maxSpd = 8;
    actor.ammo = actor.weaponCollection.getWeaponAmmo("rifle");
    actor.updateEquipment = true;
});
    