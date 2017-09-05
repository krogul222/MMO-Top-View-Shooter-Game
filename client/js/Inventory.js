Inventory = function(socket, server, owner){
    var self = {
        items:[], //{id:"itemId",amount:1}
		socket:socket,
        server: server,
        owner: owner
    }
    self.addItem = function(id,amount){
		for(var i = 0 ; i < self.items.length; i++){
			if(self.items[i].id === id){
				self.items[i].amount += amount;
                Item.list[id].add(owner, amount);
				self.refreshRender();
				return;
			}
		}
		self.items.push({id:id,amount:amount});
        Item.list[id].add(owner, amount);
		self.refreshRender();
    }
    self.removeItem = function(id,amount){
		for(var i = 0 ; i < self.items.length; i++){
			if(self.items[i].id === id){
				self.items[i].amount -= amount;
                Item.list[id].remove(owner, amount);
				if(self.items[i].amount <= 0)
					self.items.splice(i,1);
				self.refreshRender();
				return;
			}
		}    
    }
    self.hasItem = function(id,amount){
		for(var i = 0 ; i < self.items.length; i++){
			if(self.items[i].id === id){
				return self.items[i].amount >= amount;
			}
		}  
		return false;
    }
    
    self.useItem = function(id){
		if(self.hasItem(id,1)){
            Item.list[id].event(owner);
        }
    }
    
	self.refreshRender = function(){
		//server
        
		if(self.server){
            
            if(!self.socket){
                return;
            }
            
			self.socket.emit('updateInventory',self.items);
			return;
		}
		
		//client only
        
        let inventory = document.getElementById("inventory");
        inventory.innerHTML = "";
        
        let addButton = function(data){
            let item = Item.list[data.id];
            let button = document.createElement('button');
            button.onclick = function(){
                self.socket.emit("useItem", item.id);
            }
            button.innerText = item.name + " x" + data.amount;
            inventory.appendChild(button);
        } 

		for(let i = 0 ; i < self.items.length; i++){
			let item = Item.list[self.items[i].id];
			addButton(self.items[i]);
		}     
	}

    
    if(self.server && self.socket){
        socket.on("useItem", function(itemId){
            if(!self.hasItem(itemId,1)){
                console.log("Cheater!");
                return;
            }
                
            let item = Item.list[itemId];
            item.event(Player.list[self.socket.id]);
        });
    }   

	return self;
}


Item = function(id , name, event, add, remove, info){
	var self = {
		id:id,
		name:name,
        add:add,
        remove:remove,
		event:event,
        info: info
	}
	Item.list[self.id] = self;
	return self;
}
Item.list = {};

Item("medicalkit","Medical Kit",function(player){
	
    if((player.hp+player.hpMax/2) < player.hpMax){
        player.hp += player.hpMax/2;
    } else{
        player.hp = player.hpMax;
    }
    
	player.inventory.removeItem("medicalkit",1);
}, function(actor, amount){}, function(actor, amount){}, function(actor){
    return "";
});

/*Item("enemy","Spawn Enemy",function(){
	Enemy.randomlyGenerate();
});
*/
Item("pistol","Pistol",function(actor){
	Weapon.list["pistol"].equip(actor);
},function(actor, amount){
    actor.weaponCollection.addWeapon("pistol", amount);
}, function(actor, amount){
    actor.weaponCollection.removeWeapon("pistol", amount);
}, function(actor){
    return "Ammo: "+actor.weaponCollection.getWeaponAmmo("pistol");
});

Item("knife","Knife",function(actor){
    Weapon.list["knife"].equip(actor);
}, function(actor, amount){
    actor.weaponCollection.addWeapon("knife",amount);
}, function(actor, amount){
    actor.weaponCollection.removeWeapon("knife", amount);
}, function(actor){
    return "";
});

Item("shotgun","Shotgun",function(actor){
	Weapon.list["shotgun"].equip(actor);
}, function(actor, amount){
    actor.weaponCollection.addWeapon("shotgun",amount);
}, function(actor, amount){
    actor.weaponCollection.removeWeapon("shotgun", amount);
}, function(actor){
    return "Ammo: "+actor.weaponCollection.getWeaponAmmo("shotgun");
});

Item("rifle","Rifle",function(actor){
	Weapon.list["rifle"].equip(actor);
}, function(actor, amount){
    actor.weaponCollection.addWeapon("rifle",amount);
}, function(actor, amount){
    actor.weaponCollection.removeWeapon("rifle", amount);
}, function(actor){
    return "Ammo: "+actor.weaponCollection.getWeaponAmmo("rifle");
});




