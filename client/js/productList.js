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

//const priceFilter = document.querySelector('div#sortbar option:nth-child(1)')
//const nameFilter = document.querySelector('div#sortbar option:nth-child(2)')

const selectSortby = document.getElementsByTagName('select')[0]
selectSortby.setAttribute('onchange', 'getSelectValue()')
    numberOfProduct = 10

    //nameFilter.setAttribute('selected','selected')
    //priceFilter.removeAttribute('selected','selected')

let getSelectValue = () => {
    let selectedValue = document.querySelector('div#sortbar select').value.toLowerCase()
    console.log(selectedValue)

    urlAPI = `http://localhost:5000/api/getProductsList?nProducts=${numberOfProduct}&sortBy=${selectedValue}`

    console.log(urlAPI)

    return  urlFetch = urlAPI,
            numberOfProduct = 10
}
getSelectValue()

fetch(urlFetch)
.then((resp) => resp.json())
.then((data) => { 
    productList = data.data
    console.log(productList)

    const productSection = document.getElementById('mainproductlist')
    console.log(productSection)

    let category = ['snickers', 'coats', 'pants', 'jackets']
 

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
        <p class="gray marginnone">${productList[i]['category'].map (d => category[d])}</p>
        <p class="secondary marginnone">${productList[i]['price']}</p>`

        cardProduct.innerHTML= cardProductdetail
        productSection.prepend(cardProduct)
    }
})


















/*
let selectedValue = document.querySelector('div#sortbar select').value
    selectedValue.setAttribute = ('selected','true') // change selected - not working
    console.log(selectedValue)
    
   /* let selected = selectSortby.selectedIndex
    let options = selectSortby.options
    console.log(options[selected].value) 
    
    
     if(selected == nameFilter.value){
        nameFilter.setAttribute('selected','selected')
        priceFilter.removeAttribute('selected','selected')

    } else{
        priceFilter.setAttribute('selected','selected')
        nameFilter.removeAttribute = ('selected','selected')
    }
    
    */
