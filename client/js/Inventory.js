Inventory = function(socket, server){
    var self = {
        items:[], //{id:"itemId",amount:1}
		socket:socket,
        server: server
    }
    self.addItem = function(id,amount){
		for(var i = 0 ; i < self.items.length; i++){
			if(self.items[i].id === id){
				self.items[i].amount += amount;
				self.refreshRender();
				return;
			}
		}
		self.items.push({id:id,amount:amount});
		self.refreshRender();
    }
    self.removeItem = function(id,amount){
		for(var i = 0 ; i < self.items.length; i++){
			if(self.items[i].id === id){
				self.items[i].amount -= amount;
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
	self.refreshRender = function(){
		//server
		if(self.server){
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

    
    if(self.server){
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


Item = function(id,name,event){
	var self = {
		id:id,
		name:name,
		event:event,
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
});

/*Item("enemy","Spawn Enemy",function(){
	Enemy.randomlyGenerate();
});
*/
Item("pistol","Pistol",function(player){
	player.equipWeapon("pistol");
});

Item("knife","Knife",function(player){
	player.equipWeapon("knife");
});

Item("shotgun","Shotgun",function(player){
	player.equipWeapon("shotgun");
});




