const qs = (el) => document.querySelector(el)
const qsAll = (el) => document.querySelectorAll(el)
let modalQt = 1

//1.Lista de pizzas

pizzaJson.map((item, index)=>{
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index)
    
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        modalQt = 1;

        //console.log(pizzaJson[key])
        qs('.pizzaBig img').src = pizzaJson[key].img
        qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        qs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
        qs('.pizzaInfo--size.selected').classList.remove('selected')
        qsAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
            qs('.pizzaInfo--qt').innerHTML = modalQt

        })


        qs('.pizzaWindowArea').style.opacity = 0
        qs('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=>{
            qs('.pizzaWindowArea').style.opacity = 1

        }, 200)
    })
    qs('.pizza-area').append(pizzaItem)

})

//2.Eventos do Modal

const closeModal = () =>{
    qs('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        qs('.pizzaWindowArea').style.display = 'none'

    }, 200)

}

qsAll('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
})

qs('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if( modalQt > 1){
        modalQt --;
        qs('.pizzaInfo--qt').innerHTML = modalQt
    } else return
} )
qs('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt ++;
    qs('.pizzaInfo--qt').innerHTML = modalQt
} )

qsAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        qs('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })

})
