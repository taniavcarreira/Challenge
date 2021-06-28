/* 
CHALLENGE: 
    Listing page (2/3) Done
    Apply sortBy, category and sizes. Done
    Fetch information from the server. Done
    Should reload product list  >>>>>>>>>>>>>>>>>>>>>> To Do Load More
    
    I can unselect filters. Done
    All the products should have their route correct. >>>>>>>>>>>>>>>>>>>>>>>>< To DO URL update
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
const sizes = ['1', '2', '3', '4']
let sizesToFilter = []

const constructor = (a) => {
    productSection.innerHTML = ''

    for(i=0; i<a;i++){
        const sizeThumbs = '240w'
        const sizeSmall = '640w'
        const sizeMedium = '720w'
        const src = '1200w'
        const imgThumbs = `/imgs/products/thumbs/thumb${productList[i]['id']}.jpg ${sizeThumbs}`;
        const imgSmall = `/imgs/products/small/product${productList[i]['id']}.jpg ${sizeSmall}`
        const imgMedium = `/imgs/products/medium/product${productList[i]['id']}.jpg ${sizeMedium}`
        const imgSrc = `/imgs/products/product${productList[i]['id']}-${src}.jpg ${src}`
// API devolve: /imgs/products/product14.jpg 

        let cardProduct = document.createElement('a')
        cardProduct.className = 'product-card col-6 col-d-4'
        cardProduct.href = `product.html?id=${productList[i]['id']}`
        cardProduct.title = 'View Product'

        let cardProductdetail = 
        `<div class="product-card-image">
            <img class="imgfit" 
            srcset="${imgThumbs}, ${imgSmall}, ${imgMedium}, ${imgSrc}"
            sizes="(min-width: 1200px) 720px, (min-width: 750px) 640px, 240px"
            src="${productList[i]['image']}">
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
    loadMore.setAttribute('onclick', 'addMore()')
    const loadMoredetail = `
    <button href="#" title="Load More">
    <i class="icn-reload"></i>
    Load More
    </button>`
    loadMore.innerHTML= loadMoredetail
    productSection.appendChild(loadMore)

    if(productSection.childNodes.length-1 < numberOfProduct){
        loadMore.style = 'visibility:hidden'
    } else {
        loadMore.removeAttribute = 'style'
    }    
}



// Display products
const refreshList = () => {
    let urlAPI = `/api/getProductsList?nProducts=${numberOfProduct}&sortBy=${sortBy}`
    productSection.innerHTML = ''
    fetch(urlAPI)
    .then(resp => resp.json())
    .then(({ data }) => { 
        productList = data
        constructor(productList.length)

        if(categoriesToFilter.length > 0) {
            productList = productList.filter(product => 
                product.category.some(categoryId => 
                    categoriesToFilter.indexOf(categoryId) !== -1))
                    console.log(productList);
                    constructor(productList.length)
        }


        for(i = 0; i < productList.length;i++){
            let  sizesAvailable = []
            Object.keys(productList[i].sizes).forEach(key => {
                if (productList[i].sizes[key] > 0) {
                    sizesAvailable.push(parseInt(key))
                    //console.log(sizesAvailable)
                    productList[i].sizesAvailable = sizesAvailable //assign array to object
                    //console.log(productList[i].sizesAvailable)
                }
                return productList[i]
            })
            //console.log('final debug do Id:'+ productList[i].id + ' ' + productList[i].sizesAvailable)
        } 

        if(sizesToFilter.length > 0) {
            productList = productList.filter(product => 
                product.sizesAvailable.some(sizeId => 
                    sizesToFilter.indexOf(sizeId) !== -1))
                    console.log(productList);
                    constructor(productList.length)
                    
            return productList
        }

        //return productList    
    })   
    //return productList         
}
// EXECUTE - Filters PriceList
document.addEventListener("DOMContentLoaded", () => {
    refreshList()

    //SortBy
    getSelectValue = () => {
        sortBy = document.querySelector('div#sortbar select').value.toLowerCase()
        refreshList();
        console.log(sortBy)
    }

    // Categories
    const catFilters = document.querySelectorAll('.categories ul > li')
    catFilters.forEach((li, i) => {
        li.addEventListener('click', () => {

            const categoryId = i+1;
            console.log(categoryId)
            if(categoriesToFilter.indexOf(categoryId) === -1) {
                categoriesToFilter.push(categoryId);
                li.children[0].style.fontWeight = '700'


            } else {
                categoriesToFilter = categoriesToFilter.filter( id => id !== categoryId)
                li.children[0].removeAttribute('style')
            }
        refreshList()
        })
    })

    // Sizes
    const sizeFilters = document.querySelectorAll('.sizebtns  button')
    sizeFilters.forEach((button, i) => {
        button.addEventListener('click', () => {

            const sizeId = i+1;
            console.log(sizeId)
            if(sizesToFilter.indexOf(sizeId) === -1) {
                sizesToFilter.push(sizeId);
                button.style = 'border-color:darkgrey; font-weight:700'
            } 
            else {
                sizesToFilter = sizesToFilter.filter( id => id !== sizeId)
                button.removeAttribute('style')
            }
        refreshList()
        })
    })

    // LoadMore
        //const loadMore = productSection.lastElementChild //Nao identifica a div :  devolve null 
        //loadMore.addEventListener('click', addmore())
    
    addMore = () => {
        numberOfProduct += 10 
        console.log(numberOfProduct)
        refreshList();
    }
})




//se o nTotalProdutos da página !== nProductNumber entao esconde o loadMore

    // //LoadMore
    // let loadMore = document.getElementById('loadmore')
    // loadMore.addEventListener('click', (e) => {

    //     let nProductlisted = productSection.childNodes
    //     console.log(nProductlisted)

