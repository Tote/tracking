let tracking
function init(){
    tracking = JSON.parse(localStorage.getItem('tracking'))
    if(!tracking){
        tracking = []
        localStorage.setItem('tracking', JSON.stringify(tracking))
    }
}

function addTracking(){
    const store     = document.querySelector('#retail').value
    const tracknum  = document.querySelector('#idseguimiento').value
    console.log(store, tracknum)
    
    tracking.push({store, tracknum})
    localStorage.setItem('tracking', JSON.stringify(tracking))
    
}

function fillList(){
    const list = document.querySelector('#compras')

    for(item of tracking){
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

init()
fillList()