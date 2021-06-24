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

const openClose = document.getElementsByClassName('open')[0]
const openIcon = openClose.getElementsByTagName('i')[0]
const closeIcon = openClose.getElementsByTagName('i')[1]

closeIcon.addEventListener('click', function(){
    openClose.classList.remove('open')
    openIcon.display = 'block'
    closeIcon.display = 'none'
    console.log(closeIcon)
    console.log(openClose)
})


openIcon.addEventListener('click', function(){
    openClose.classList.add('open')
    openIcon.display = 'none'
    closeIcon.display = 'block'
    console.log(closeIcon)
    console.log(openClose)
})

//Get Data

const urlAPI = (`http://localhost:5000/api/getProductsList?nProducts=${numberProducts}&sortBy=${sortBy}`)
let numberProducts = 10
let sortBy = ['price', 'name']


async function getData () {

    //Fetch - Return Promise
    const response = await fetch(urlAPI);
    const data = await response.json();
    const product = data 
    console.log('this is the product object',product)
    
    //Destructuring
    const {id, name, partnership, brand, madeIn, description, image, price, score, sizes} = product;
    
    //Get parameterId
    productId = id;
    console.log('the product id parameter is:',id)









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

