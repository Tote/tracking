import StorageService from './storage.js'

const storage = new StorageService()
const trackers = {
    'easy'      : item => `https://www.easy.cl/tienda/seguimiento?orderId=${item.info}`,
    'cupoclick' : item => `https://api.enviame.io/s2/companies/3773/deliveries/${item.info}/tracking`,
    'spdigital' : item => {
        const parsedInfo = item.info.split('-')
        return `http://seguimiento.spdigital.cl/?web_order=${parsedInfo[0]}&check=${parsedInfo[1]}&button=`
    }
}

function fillList(){
    const list = document.querySelector('#compras')
    list.innerHTML =""
    for(let item of storage.readAll()){
        list.appendChild( createListNode(item.store, item.info, trackers[item.store](item)) )
    }

}

function createListNode(store, number, url){
    const li = document.createElement('li')
    li.innerHTML = `${store}, Nº${number} <a href="${url}">Seguir</a>`
    return li
}

function addTracking(){
    const store     = document.querySelector('#retail').value
    const info  = document.querySelector('#idseguimiento').value
    storage.add(store, info)
    fillList()
}
document.querySelector('#add').addEventListener('click', addTracking)
fillList()