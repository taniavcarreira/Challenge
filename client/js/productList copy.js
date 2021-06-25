/* 
CHALLENGE: 
    Listing page (2/3)
    Apply sortBy, category and sizes.

    Fetch information from the server
    Should reload product list
    
    I can unselect filters.

    All the products should have their route correct.
    e.g - https://edit-shop-api.herokuapp.com/product.html?id=1

    Notes #2
    Category ids available:
    1 - snickers
    2 - coats
    3 - pants
    4 - jackets

    http://localhost:5000/productlist.html
*/


// - Apply sortBy, category and sizes.

//1: open and close Categories filter >>>> Nao está a funcionar


//Add Events to selectors





// SortBy filter

const priceFilter = document.querySelector('div#sortbar option:nth-child(1)')
const nameFilter = document.querySelector('div#sortbar option:nth-child(2)')


// Aply Sortby filter selection
const selectSortby = document.querySelector('div#sortbar select')
selectSortby.setAttribute('onchange', 'getSelectValue()')

// Change sortby filter selected > 
let getSelectValue = () => {
    let selectedValue = document.querySelector('div#sortbar select').value
    selectedValue.setAttribute = ('selected','true') // change selected - not working
    console.log(selectedValue)
    
    let selected = selectSortby.selectedIndex
    let options = selectSortby.options
    console.log(options[selected].value)

    //return activeSelected = selectSortby[selectSortby.selectedIndex].selected
    return selectedValue // change selected - not working
}
getSelectValue()
//console.log(selectedValue) // change selected - not working




// Categories
const openClose = document.getElementsByClassName('open')[0]

    // Category opened - not working
    const openIcon = openClose.getElementsByTagName('i')[0]
    openIcon.setAttribute('onclick', 'open()')

    let open = () => {
        openClose.classList.add('open')
        openIcon.display = 'none'
        closeIcon.display = 'block'
    }

    // Category closed - not working
    const closeIcon = openClose.getElementsByTagName('i')[1]
    closeIcon.setAttribute('onclick', 'close()')

    let close = () => {
        openClose.classList.remove('open')
        openIcon.display = 'block'
        closeIcon.display = 'none'
    }



// LoadMore - not working
const loadMore = document.querySelector('div.central-link-light > a[title]')
loadMore.setAttribute('onclick', 'addProduct()')

function addProduct() {
    return numberProducts += 10;
    //ver video para ver como definir o valor maximo do incremento total <= arrayIds.length
    // extrair todos os ids numa array e ver o length. 
}










//Get Data

let numberProducts = 10
let sortBy = ['price', 'name']
const urlAPI = (numberProducts,sortBy) => {return (`http://localhost:5000/api/getProductsList?nProducts=${numberProducts}&sortBy=${sortBy}`)}


async function getData () {



    if(priceFilter.selected === true){
        const response = await fetch(urlAPI(numberProducts,sortBy[0]));
        const data = await response.json();
        const product = data 
        console.log('this is the product object order by price:',product.data)
    } else{
        const response = await fetch(urlAPI(numberProducts,sortBy[1]));
        const data = await response.json();
        const product = data 
        console.log('this is the product object order by name:',product.data)
    }

    //Destructuring info product.data > not working
    /*
    function getInfoProduct (id, name, partnership, image, price){
        return id, name, partnership, image, price
    }
    getInfoProduct(product.data.id, product.data.name, product.data.partnership, product.data.image, product.data.price)
    console.log(getInfoProduct(product.data.id, product.data.name, product.data.partnership, product.data.image, product.data.price))
    */

//IDEIA

    /* ForEach arrayOfProduct.data >> Reduce product.data[i] para obter
     o id, image, name, partnership
    fico com o mesmo numero de objectos mas apenas com as opcoes que interessam. 
    */ 

    /*For Each arrayOfProduct.data[i] vou fazer 
      um destructuring semelhante ao do product.js 
      para retirar os argumentos que pretendo 
    */

    let produtlist = document.getElementById(mainproductlist)
    //For each promise 
    let productCard = document.createElement('a')
    productCard.ClassName = 'product-card col-6 col-d-4';
    productCard.href = '#url'//`http://localhost:5000/product.html#${id}`
    productCard.title = 'View Product';
    
    let divImageCard = productCard.createNode('div')
    divImageCard.ClassName = 'product-card-image'

    let imageCard = divImageCard.createNode('img')
    imageCard.ClassName = 'imgfit'
    imageCard.src = 'image'//${image}

    let nameCard = productCard.createNode('p')
    firstP.ClassName = 'margintophalf marginbottomnone'
    firstP.innerHtml = 'name'//${name}

    let partnershipCard = productCard.createNode('p')
    firstP.ClassName = 'gray marginnone'
    firstP.innerHtml = 'partnership'//partnership

    let priceCard = productCard.createNode('p')
    firstP.ClassName = 'margintophalf marginbottomnone'
    firstP.innerHtml = 'price'//price

    //opção mais simples:
    let product card = 
    `<a class="product-card col-6 col-d-4" href="${urlProduct(id)}" title="View Product">
        <div class="product-card-image">
            <img class="imgfit" src="${image}">
        </div>
        <p class="margintophalf marginbottomnone">${name}</p>
        <p class="gray marginnone">${partnership}</p>
        <p class="secondary marginnone">${price}</p>
    </a>`

}

getData ()



// document.getElementsByTagName("H1")[0].setAttribute("class", "democlass"); 
// Para aplicar/remover checked



/*
Logica:

1: no carregamento da pagina (onload) mostrar 10produtos (fetch 10 produtos)
fetch: 
2: ao clicar em Load More (event listener) carregar + 15 produtos

3:sortBy Price:
fetch product list: mostrar 10produtos por ordem 
load more: carregar +15produtos

4:sortBy Name:
fetch product list: mostrar 10produtos por ordem 
load more: carregar +15produtos

5: filter Categories:
5.1 -  abrir/fechar secção lista li (display:none/block + className:open/'')
5.2 -  filter selected: 
        > aply <a "checked"

        > aply <a not "checked" apply style="color:#cdcdcd"


*/

