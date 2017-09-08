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
                if(owner.weapon === id){
                    owner.ammo = self.weapons[i].ammo;
                }
				//self.refreshRender();
				return;
			}
		}
		self.weapons.push({id:id,amount:amount, ammo: 50, reload: Weapon.list[id].reload});
        console.log("Weapon " +id+" added");
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
    
    self.getWeaponAmmoInGun = function(id){
        for(var i = 0 ; i < self.weapons.length; i++){
			if(self.weapons[i].id === id){
                //owner.ammoInGun = self.weapons[i].ammoInGun;
				return self.weapons[i].reload;
			}
		}  
		return 0;
    }    
    
    self.addWeaponAmmo = function(id, amount){
        for(var i = 0 ; i < self.weapons.length; i++){
			if(self.weapons[i].id === id){
                self.weapons[i].ammo += amount;
			}
		}  
    }
    
    self.getShootSpeed = function(id){
        if(self.hasWeapon(id, 1)){
            return Weapon.list[id].shootSpd;
        } else{
            return 0;
        }
    }
    
    self.reload = function(id){
        for(var i = 0 ; i < self.weapons.length; i++){
			if(self.weapons[i].id === id){
                self.weapons[i].reload = Weapon.list[id].reload;
                self.owner.ammoInGun = Weapon.list[id].reload;
                console.log(self.weapons[i].reload );
            }
        }    
    }
    
    self.getReloadSpd = function(id){
        for(var i = 0 ; i < self.weapons.length; i++){
			if(self.weapons[i].id === id){
                return Weapon.list[id].reloadSpd;
            }
        }    
    }
    
    self.shoot = function(id, bullets){
        for(var i = 0 ; i < self.weapons.length; i++){
			if(self.weapons[i].id === id){
                if(bullets <= self.weapons[i].ammo){
                    self.weapons[i].ammo -= bullets;
                    owner.ammo = self.weapons[i].ammo;
                    
                    if(self.weapons[i].reload > 0)
                        self.weapons[i].reload--;
                    else
                        return false;
                    
                    owner.ammoInGun = self.weapons[i].reload;
                    
                    if(self.weapons[i].reload ==0){
                        owner.reload = true;
                        owner.reloadCounter = 0;
                    }
                    console.log("Reload"+ owner.reload+ " " +self.weapons[i].reload );
                    owner.recoil = Weapon.list[self.weapons[i].id].recoil;
                    owner.recoilCounter = 0;
                    return true;
                }
			}
		}  
		return false;
    }
    
    self.changeWeapon = function(id){
        if(self.hasWeapon(id, 1) && !owner.reload){
            Weapon.list[id].equip(owner);
        }
    }
    
    self.chooseNextWeaponWithAmmo = function(){
        if(!owner.reload){
            let inc = 1;

            for(var i = 0 ; i < self.weapons.length; i++){
                if(self.weapons[i].id === owner.weapon){
                    while(i+inc < self.weapons.length){
                        if(self.weapons[i+inc].ammo >0 ){
                            Weapon.list[self.weapons[i+inc].id].equip(owner);
                            return;
                        } else{
                            inc++;
                        }
                    }
                    inc = 0;
                    while( inc < i){
                        if(self.weapons[inc].ammo >0 ){
                            Weapon.list[self.weapons[inc].id].equip(owner);
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
    
self.choosePrevWeaponWithAmmo = function(){
        if(!owner.reload){
            let inc = 1;

            for(var i = 0 ; i < self.weapons.length; i++){
                if(self.weapons[i].id === owner.weapon){
                    while(i-inc >= 0){
                        if(self.weapons[i-inc].ammo >0 ){
                            Weapon.list[self.weapons[i-inc].id].equip(owner);
                            return;
                        } else{
                            inc++;
                        }
                    }
                    inc = self.weapons.length-1;
                    while( inc > i){
                        if(self.weapons[inc].ammo >0 ){
                            Weapon.list[self.weapons[inc].id].equip(owner);
                            return;
                        } else{
                            inc--;
                        }
                    }

                    return;
                }
            }      
        }

    }    
    

return self;
}
        
Weapon = function(id,name, param){
	var self = {
		id:id,
		name:name,        
	}
    
    if(param.atackRadius !== undefined){
        self.atackRadius = param.atackRadius;
    } else {
        self.atackRadius = 0;
    }
 
    if(param.atkSpd !== undefined){
        self.atkSpd = param.atkSpd;
    } else {
        self.atkSpd = 0;
    }
    
    
    if(param.attackMeele !== undefined){
        self.attackMeele = param.attackMeele;
    } else {
        self.attackMeele = true;
    }
    
    if(param.atkShootDmg !== undefined){
        self.atkShootDmg = param.atkShootDmg;
    } else {
        self.atkShootDmg = 0;
    }
    
    if(param.atkMeeleDmg !== undefined){
        self.atkMeeleDmg = param.atkMeeleDmg;
    } else {
        self.atkMeeleDmg = 0;
    }
    
    if(param.maxSpd !== undefined){
        self.maxSpd = param.maxSpd;
    } else {
        self.maxSpd = 8;
    }
    
    if(param.ammo !== undefined){
        self.ammo = param.ammo;
    } else {
        self.ammo = 0;
    } 
    
    if(param.shootSpd !== undefined){
        self.shootSpd = param.shootSpd;
    } else {
        self.shootSpd = 0;
    }    
    
    if(param.reload !== undefined){
        self.reload = param.reload;
    } else {
        self.reload = 0;
    }    
    
    if(param.reloadSpd !== undefined){
        self.reloadSpd = param.reloadSpd;
    } else {
        self.reloadSpd = 0;
    } 
    
    if(param.recoil !== undefined){
        self.recoil = param.recoil;
    } else {
        self.recoil = 0;
    }    
    
    self.equip = function(actor){
        actor.atackRadius = self.atackRadius;
        actor.atkSpd = self.atkSpd;
        actor.attackMeele = self.attackMeele;
        actor.atkShootDmg = self.atkShootDmg;
        actor.atkMeeleDmg = self.atkMeeleDmg;
        actor.weapon = self.id;
        actor.maxSpd = self.maxSpd;
        actor.ammo = actor.weaponCollection.getWeaponAmmo(self.id);
        actor.ammoInGun = actor.weaponCollection.getWeaponAmmoInGun(self.id);
    }
    
	Weapon.list[self.id] = self;
	return self;
}
Weapon.list = {};
    
Weapon("pistol","Pistol",{
    atackRadius: 0,
    atkSpd: 4,
    attackMeele : false,
    atkShootDmg : 2,
    atkMeeleDmg : 2,
    maxSpd : 10,
    shootSpd : 20,
    reload : 6,
    reloadSpd: 5,
    recoil: false
});

Weapon("shotgun","Shotgun",{
    atackRadius: 3,
    atkSpd: 2,
    attackMeele : false,
    atkShootDmg : 3,
    atkMeeleDmg : 4,
    maxSpd : 8,
    shootSpd : 15,
    reload : 2,
    reloadSpd: 2,
    recoil: true
});

Weapon("knife","Knife",{
    atackRadius: 0,
    atkSpd: 3,
    attackMeele : true,
    atkShootDmg : 0,
    atkMeeleDmg : 8,
    maxSpd : 11,
    reload : 0,
    reloadSpd: 0,
    recoil: false
});

Weapon("rifle","Rifle",{
    atackRadius: 0,
    atkSpd: 1,
    attackMeele : false,
    atkShootDmg : 15,
    atkMeeleDmg : 4,
    maxSpd : 8,
    shootSpd : 30,
    reload : 1,
    reloadSpd: 2,
    recoil: true
});
    