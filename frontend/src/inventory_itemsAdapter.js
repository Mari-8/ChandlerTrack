class InventoryItemsAdapter{

    constructor() {
        this.normUrl = 'http://localhost:3000/inventory_items'
    }

    fetchInventoryItems(){
        fetch(this.normUrl)
        .then(res => res.json())
        .then(response => {
            const invList = document.getElementById('inv-list')
            invList.innerHTML = ''
            response.data.forEach(el => {
                let inventoryItem = new InventoryItem
                inventoryItem.id = el.id 
                inventoryItem.name = el.attributes.name 
                inventoryItem.amount = el.attributes.amount
                inventoryItem.element.id = `item-${el.id}`
                inventoryItem.attachToDom(inventoryItem)
            })
        })
        
    }

    handleItemForm(e) {
        e.preventDefault()
        const adapter = new InventoryItemsAdapter
        const invList = document.getElementById('inv-list') 
        const name = document.getElementById('item-name').value
        const amount = document.getElementById('item-amount').value
        
    
        let newItemObject = {
            name: name,
            amount: amount        
        }
    
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newItemObject)
        }
    
        fetch('http://localhost:3000/inventory_items', configObj)
        .then(res => res.json())
        .then(json => {
            let item = new InventoryItem 
            item.id = json.data.id 
            item.name = json.data.attributes.name 
            item.amount = json.data.attributes.amount
            item.element.id = `item-${json.data.id}`
            adapter.fetchInventoryItems()
        })
    }

    deleteItem(id){
        let configObj = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }
    
        fetch(this.normUrl + `/${id}`, configObj)
        .then(res => res.json())
        .then(json => {
            alert(json.message)
        })
        
        InventoryItem.all = InventoryItem.all.filter(i => i.id != id)

       
        let item = document.getElementById(`item-${id}`)
        item.remove()
    }

    sendPatch(itemId, itemObj) {

        let configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(itemObj)
        }

        fetch(this.normUrl + `/${itemId}`, configObj)
        .then(res => res.json())
        .then(response => {
            let item = InventoryItem.all.find(i => i.id == itemId)
            item.name = itemObj.name
            item.amount = itemObj.amount 
            
            item.attachToDom()
        })
    }
}