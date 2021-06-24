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

//1: open and close Categories filter

const openClose = document.getElementsByClassName('open')[0]
const openIcon = openClose.getElementsByClassName('icn-chevron-down')[0]
const closeIcon = openClose.getElementsByClassName('icn-chevron-up')[0]

let categoryOpenClose = () => {

    openIcon.addEventListener('click', function() {
        openClose.ClassName = 'open'
        closeIcon.display = 'none'
        openIcon.display = 'block'
     })

     /*
     closeIcon.addEventListener('click', function() {
        openClose.ClassName = ''
        openIcon.display = 'none'
        closeIcon.display = 'block'
    })
    */
}

categoryOpenClose()



















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

