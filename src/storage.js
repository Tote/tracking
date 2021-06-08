export default class StorageService{

    serviceID   = 'TRACKING'
    storageObj  = null
    
    constructor(){
        this.storageObj = JSON.parse(localStorage.getItem(this.serviceID))
        if(!this.storageObj){
            this.storageObj = []
            localStorage.setItem(this.serviceID, JSON.stringify(this.storageObj))
        }
    }

    add(store, info){
        this.storageObj.push({store, info})
        localStorage.setItem(this.serviceID, JSON.stringify(this.storageObj))
    }

    readAll(){
        return this.storageObj
    }
}