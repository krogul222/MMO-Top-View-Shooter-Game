import { Player } from './Entities/Player';
import { Item } from "./Item";

export class Inventory {
    items: any[] = [];
    socket: any = 0;
    server: boolean = false;
    owner: string = ""; 

    constructor() {
        if(this.server && this.socket){
            this.socket.on("useItem", function(itemId){
                if(!this.hasItem(itemId,1)){
                    console.log("Cheater!");
                    return;
                }
                    
                let item = Item.list[itemId];
                item.event(Player.list[this.socket.id]);
            });
        }   
    }

    addItem = (id,amount) => {
		for(var i = 0 ; i < this.items.length; i++){
			if(this.items[i].id === id){
				this.items[i].amount += amount;
                Item.list[id].add(this.owner, amount);
				this.refreshRender();
				return;
			}
		}
		this.items.push({id:id,amount:amount});
        Item.list[id].add(this.owner, amount);
		this.refreshRender();
    }

    removeItem = (id,amount) => {
		for(var i = 0 ; i < this.items.length; i++){
			if(this.items[i].id === id){
				this.items[i].amount -= amount;
                Item.list[id].remove(this.owner, amount);
				if(this.items[i].amount <= 0)
                this.items.splice(i,1);
				this.refreshRender();
				return;
			}
		}    
    }

    hasItem = (id,amount) => {
		for(var i = 0 ; i < this.items.length; i++){
			if(this.items[i].id === id){
                return this.items[i].amount >= amount;
            }
		}  
		return false;
    }

    useItem = (id) => {
		if(this.hasItem(id,1)){
            Item.list[id].event(this.owner);
        }
    }

    getItemAmount = (id) => {
		for(var i = 0 ; i < this.items.length; i++){
			if(this.items[i].id === id){
				return this.items[i].amount;
			}
        }
        return 0;
    }    

	refreshRender = () => {
		//server
		if(this.server){
            
            if(!this.socket) { return; }
			this.socket.emit('updateInventory',this.items);
			return;
		}
		
		//client only
        let inventory = document.getElementById("inventory");
        inventory.innerHTML = "";
        
        let addButton = function(data){
            let item = Item.list[data.id];
            let socket = this.socket;
            let button = document.createElement('button');
            button.onclick = function(){
                socket.emit("useItem", item.id);
            }
            button.innerText = item.name + " x" + data.amount;
            inventory.appendChild(button);
        } 

		for(let i = 0 ; i < this.items.length; i++){
			let item = Item.list[this.items[i].id];
			addButton(this.items[i]);
		}     
	}    
}