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

const selectSortby = document.getElementsByTagName('select')[0]
selectSortby.setAttribute('onchange', 'getSelectValue()')

let sortBy = "price"
let numberOfProduct = 10
let productSection = document.getElementById('mainproductlist')
const category = ['snickers', 'coats', 'pants', 'jackets']
let categoriesToFilter = []

// Display products
const refreshList = () => {
    let urlAPI = `/api/getProductsList?nProducts=${numberOfProduct}&sortBy=${sortBy}`
    productSection.innerHTML = ''
    fetch(urlAPI)
    .then(resp => resp.json())
    .then((data) => { 
        productList = data.data

        if(categoriesToFilter.length > 0) {
            productList = productList.filter(product =>
                product.category.some (categoryId =>
                    categoriesToFilter.indexOf(categoryId !== -1)
                )
            )
            console.log(productList)
        }

        for(i=0; i<productList.length;i++){
            let cardProduct = document.createElement('a')
            cardProduct.className = 'product-card col-6 col-d-4'
            cardProduct.href = `product.html?id=${productList[i]['id']}`
            cardProduct.title = 'View Product'

            let cardProductdetail = 
            `<div class="product-card-image">
                <img class="imgfit" src="${productList[i]['image']}">
            </div>
            <p class="margintophalf marginbottomnone">${productList[i]['name']}</p>
            <p class="gray marginnone">${productList[i]['category'].map (i => category[i-1])}</p>
            <p class="secondary marginnone">${productList[i]['price']}</p>`

            cardProduct.innerHTML= cardProductdetail
            productSection.appendChild(cardProduct)
        }
        let loadMore = document.createElement('div')
        loadMore.className = 'central-link-light marginbottomdouble'
        loadMore.id = 'loadmore'
        const loadMoredetail = `
        <a href="#" title="Load More">
        <i class="icn-reload"></i>
        Load More
        </div>`
        loadMore.innerHTML= loadMoredetail
        productSection.appendChild(loadMore)
    })
}


// EXECUTE - Filters PriceList
document.addEventListener("DOMContentLoaded", () => {

    //SortBy
    getSelectValue = () => {
        sortBy = document.querySelector('div#sortbar select').value.toLowerCase()
        refreshList();
        console.log(sortBy)
    }

//console.log(numberOfProduct)

    // Filters Categories
    const filters = document.querySelectorAll('.categories ul > li')
    filters.forEach((li, i) => {
        li.addEventListener('click', () => {

            const categoryId = i+1;
            console.log(categoryId)
            if(categoriesToFilter.indexOf(categoryId) === -1) {
                categoriesToFilter.push(categoryId);

            } else {
                categoriesToFilter = categoriesToFilter.filter( id => id !== categoryId)
            }

        refreshList()
        })
    })

    refreshList();
})





//Categories + Sizes
//dentro do refreshList

// Aplicar e retirar o filtro
// aplicar categoria = click => aplicar class: bold
// se tiver bold - entao o click retira o bold e a categoria. 

//se o nTotalProdutos da página !== nProductNumber entao esconde o loadMore

    // //LoadMore
    // let loadMore = document.getElementById('loadmore')
    // loadMore.addEventListener('click', (e) => {

    //     let nProductlisted = productSection.childNodes
    //     console.log(nProductlisted)

    // // numberOfProduct = numberOfProduct + 10
    // // refreshList();
    // // console.log(sortBy)
    // })