/* 
CHALLENGE: 
1 - Page should have the id as parameter.
2 - Fetch information from the server
3 - Fill the html with the information responded by the API.
Notes
Sizes available should match the response.
Stars rating should be rounded (2.5 should display 3 full stars)
*/


// 1- Set Dynamic URL
// Falta definir de onde vem o valor do parâmetro - 

const urlProdshop = 'https://edit-shop-api.herokuapp.com/product.html?productId='
let productId = '1' //valor vem de um split do link da imagem da homepage?
let urlProduct = (urlProdshop,productId) => {   // Duvida: preciso que seja uma função??
    return newUrl = (`${urlProdshop}${productId}`)
}

// 2- Add - Event Listener to change URL
// Erro - o URL carrega antes de fazer o update da informação. 
// Ideia - IF getData = resolve > entao change url - procurar info

/*window.addEventListener('load', function() {
   document.location.href = urlProduct(urlProdshop,productId)
   })
*/

// 3- DOING - Get ApiData and DOMManipulation - update HTML

//Dynamic url
const urlAPI = (`http://localhost:5000/api/getProduct?productId=${productId}`)

//Get Data
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

    //Get roundScoreValue
    productScore = Math.round(score)
    console.log('the data score:',score, 'was rounded into the product score:', productScore)

    //Get sizes
    productSizes = sizes
    console.log('Available product sizes',productSizes)    

    //Set HTML product info
    document.getElementById("name").innerText = name;
    document.getElementById("brand").innerText = brand;
    document.getElementById("partnership").innerText = partnership;
    document.getElementById("madeIn").innerText = madeIn;
    document.getElementById("description").innerText = description;
    document.getElementById("image").src = image;
    document.getElementById("price").innerText = price;
    
    //Set HTML product score
    const htmlScore = document.getElementsByClassName("score")[0].getElementsByTagName("span")[0]
    htmlScore.innerText = `score of ${productScore}`
    console.log(htmlScore)

    //Set HTML product stars
    const htmlStars = document.getElementsByClassName("score")[0].getElementsByTagName("i")
    console.log(htmlStars) //All stars

    for(i=0;i<productScore; i++){ //Nao consigo fazer com que o forEach funcione
        htmlStars[i].className = 'icn-star primary'
    }

    //Set HTML product sizes
    const htmlSizes = document.getElementsByClassName("sizebtns")[0].getElementsByTagName("button")
    console.log(htmlSizes) //All buttons size 
    //Enabling available sizes
    for(i=0;i<htmlSizes.length; i++){ //Nao consigo fazer com que o forEach funcione
        if(productSizes[i] > 0){
        htmlSizes[i].removeAttribute('disabled')
        }
    }
} //END FECTH
getData()