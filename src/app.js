import StorageService from './storage.js'

const storage = new StorageService()


function addTracking(){
    const store     = document.querySelector('#retail').value
    const tracknum  = document.querySelector('#idseguimiento').value
    storage.add(store, tracknum)
    
}

function fillList(){
    const list = document.querySelector('#compras')

    for(let item of storage.readAll()){
        let url = ''
        switch(item.store){
            case 'easy':
                url = `https://www.easy.cl/tienda/seguimiento?orderId=${item.tracknum}`
                break
            case 'cupoclick':
                url = `https://api.enviame.io/s2/companies/3773/deliveries/${item.tracknum}/tracking`
                break
            case 'spdigital':
                const parsedInfo = item.tracknum.split('-')
                url = `http://seguimiento.spdigital.cl/?web_order=${parsedInfo[0]}&check=${parsedInfo[1]}&button=`
                break

        }
        list.appendChild( createListNode(item.store, item.tracknum, url) )
    }

}

function createListNode(store, number, url){
    const li = document.createElement('li')
    li.innerHTML = `${store}, Nº${number} <a href="${url}">Seguir</a>`
    return li
}

fillList()