class InventoryItem {
    static all = [] 

    constructor(id, name, description, amount) {
        this.id = id
        this.name = name 
        this.description = description
        this.amount = amount 
        this.element = document.createElement('div')
        this.element.id = `inventory-item-${this.id}`
        InventoryItem.all.push(this)
    }
}