/* 
CHALLENGE: 
    Product page (1/3)
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
let urlProduct = (urlProdshop,productId) => {   // Duvida: preciso que seja uma função??
    return newUrl = (`${urlProdshop}${productId}`)
}

// 2- Add - Event Listener to change URL
// Erro - o URL carrega antes de fazer o update da informação. 
// Ideia - criar promise/verificar se resolvida e dps correr recuperaçao de dados? IF getData = resolve > entao change url - procurar info
/*
window.addEventListener('load', function() {
   document.location.href = urlProduct(urlProdshop,productId)
})
                                               ou
window.addEventListener('load', getata())

*/

// 3 - Get ApiData and DOMManipulation - update HTML
//Dynamic urls
let productId = '1' //valor vem de onde? de um split do link da imagem da homepage?
const urlAPI = (`http://localhost:5000/api/getProduct?productId=${productId}`)
const urlProd = (`http://localhost:5000/product.html#${productId}`)

//Get Data
async function getData () {

    //Update pageURL
    document.location.href = urlProd 

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

    for(i=0;i<productScore; i++){
        htmlStars[i].classList.add('primary')
    }

    //Set HTML product sizes
    const htmlSizes = document.getElementsByClassName("sizebtns")[0].getElementsByTagName("button")
    console.log(htmlSizes) //All buttons size 
    //Enabling available sizes
    for(i=0;i<htmlSizes.length; i++){ 
        if(productSizes[i] > 0){
        htmlSizes[i].removeAttribute('disabled')
        }
    }
} 
//End fetch

getData() //END - FALTA EXECUTAR A FUNÇÃO ATRAVÉS DO LISTENER APOS Redireccionamento URL

/*
DUVIDAS: 
De onde vem o parametro quando entro na página?

ERROS: 
Ao alterar o URL a página deixa de executar o getData e a informação nao é actualizada

NOTAS:
O redireccionamento do Url é um processo lento que pede a execução de uma promessa
Não consegui fazer um array.map da promise data

OBS:
function constructor + destructur: aula 270

*/
