class InventoryItem {
    static all = [] 

    constructor(id, name, amount, measurement) {
        this.id = id
        this.name = name 
        this.amount = amount 
        this.measurement = measurement
        this.element = document.createElement('div')
        this.element.id = `inventory-item-${this.id}`
        InventoryItem.all.push(this)
    }

    static findById(id){
        return InventoryItem.all.find(item => item.id == id)
    }

    addEventListeners(){
        this.element.addEventListener('click', this.handleItemSelect)
    }

    handleItemSelect = (e) => {
        let id = e.target.dataset.id
        if (e.target.className === "edit"){
            this.renderEditForm(this.id)
        } else if (e.target.className === "delete"){
            inventoryItemsAdapter.deleteItem(id)
        } else if (e.target.className === "save") {
            console.log("needs work")
        }
    }

    get InventoryItemList() {
        return document.getElementById('inv-list')
    }

    attachToDom() {
        this.InventoryItemList.append(this.renderItem())
        this.addEventListeners()
    }

    renderEditForm() {
        const adapter = new InventoryItemsAdapter
        this.element.innerHTML = `
        <div class="item-container">
            <div class="item-info">
                <form id="edit-item-form">
                    <label for="item-name" name="name">Item:</label>
                    <input for="item-name" type="text" id="item-name" value="${this.name}"><br>
                    <label for="item-amount" name="amount">Amount:</label>
                    <input for="item-amount" type="number" step="0.1" id="item-amount" value="${this.amount}"><br>
                    <label for="item-measurement">Measurement:</label>
                    <select style="width: 150px" id="item-measurement" name="item-measurement" value="Measurement">
                        <option>lbs</option>
                        <option>oz</option>
                        <option>units</option>
                    </select><br>
                </form>

            </div>
            <div class="item-buttons" id="item-update-button">
                <button class="update" data-id="${this.id}">Update</button>
            </div>
        </div>
        `

       const editButton = document.getElementById("item-update-button")
       editButton.addEventListener("click", (e) => {
            e.preventDefault()
            const name = document.getElementById("item-name").value 
            const amount = document.getElementById("item-amount").value 
            const measurement = document.getElementById('item-measurement').value 

            let itemObj = {
                name: name, 
                amount: amount,
                measurement: measurement
            }
            this.updateItemOnDom() 
            adapter.sendPatch(this.id, itemObj)
       })
    }

    updateItemOnDom() {
        this.renderItem()
    }

    renderItem() {
        this.element.innerHTML = `
        <div class="item-container">
            <div class="item-info">
                <span class="item-box-text">${this.name}: ${this.amount + " " + this.measurement}</span>
            </div>
            <div class="item-buttons" id="item-buttons">
                <button class="edit" data-id="${this.id}">Edit</button>
                <button class="delete" data-id="${this.id}">Delete</button>
            </div>
        </div>
        <br>
        `
     
        return this.element
    }

    newItemForm() {
        const invList = document.getElementById('inv-list')
        const newItemForm = document.createElement('div') 
        newItemForm.innerHTML = `
        <form id="item-form">
        <h3>Add new inventory item</h3>
        <label for="item-name">Item:</label>
        <input type="text" name="name" id="item-name"><br><br>
        <label for="item-amount">Amount:</label> 
        <input type="number" name="amount" step="0.1" id="item-amount"><br><br>
        <label for="item-measurement">Measurement:</label>
        <select style="width: 150px" id="item-measurement" name="item-measurement" value="Measurement">
            <option>lbs</option>
            <option>oz</option>
            <option>units</option>
        </select><br><br>
        <input type="submit" value="Create">
        </form>
        `
        invList.textContent = ''
        newItemForm.addEventListener("submit", inventoryItemsAdapter.handleItemForm)
        invList.appendChild(newItemForm)
    }
}