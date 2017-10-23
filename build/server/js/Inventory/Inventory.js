Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = require("./Item");
const Player_1 = require("../Entities/Player");
class Inventory {
    constructor(socket, server, owner) {
        this.items = [];
        this.socket = 0;
        this.server = false;
        this.addItem = (id, amount) => {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    this.items[i].amount += amount;
                    Item_1.Item.list[id].add(this.owner, amount);
                    this.refreshRender();
                    return;
                }
            }
            this.items.push({ id: id, amount: amount });
            Item_1.Item.list[id].add(this.owner, amount);
            this.refreshRender();
        };
        this.removeItem = (id, amount) => {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    this.items[i].amount -= amount;
                    Item_1.Item.list[id].remove(this.owner, amount);
                    if (this.items[i].amount <= 0)
                        this.items.splice(i, 1);
                    this.refreshRender();
                    return;
                }
            }
        };
        this.hasItem = (id, amount) => {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    return this.items[i].amount >= amount;
                }
            }
            return false;
        };
        this.useItem = (id) => {
            if (this.hasItem(id, 1)) {
                Item_1.Item.list[id].event(this.owner);
            }
        };
        this.getItemAmount = (id) => {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    return this.items[i].amount;
                }
            }
            return 0;
        };
        this.refreshRender = () => {
            if (this.server) {
                if (!this.socket) {
                    return;
                }
                this.socket.emit('updateInventory', this.items);
                return;
            }
            let inventory = document.getElementById("inventory");
            inventory.innerHTML = "";
            let addButton = function (data, socket) {
                let item = Item_1.Item.list[data.id];
                let button = document.createElement('button');
                button.onclick = function () {
                    socket.emit("useItem", item.id);
                };
                button.innerText = item.name + " x" + data.amount;
                inventory.appendChild(button);
            };
            for (let i = 0; i < this.items.length; i++) {
                let item = Item_1.Item.list[this.items[i].id];
                addButton(this.items[i], this.socket);
            }
        };
        this.socket = socket ? socket : 0;
        this.server = server ? server : false;
        this.owner = owner ? owner : 0;
        if (this.server && this.socket) {
            let currentInventory = this;
            this.socket.on("useItem", function (itemId) {
                if (!currentInventory.hasItem(itemId, 1)) {
                    console.log("Cheater!");
                    return;
                }
                let item = Item_1.Item.list[itemId];
                item.event(Player_1.Player.list[currentInventory.socket.id]);
            });
        }
    }
}
exports.Inventory = Inventory;
//# sourceMappingURL=Inventory.js.map