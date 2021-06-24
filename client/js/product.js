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
let productId = '2' //valor vem de um split do link da imagem da homepage?
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

    for(i=0;i<productScore; i++){
        htmlStars[i].className = 'icn-star primary'
    }


} //END FECTH
getData()
    

/*   
// 3- DONE - Função construtora para criar Produtos com base na recuperação da chave API
let Product = function() {
    this.id 
    this.url 
    this.image 
    this.name
    this.category 
    this.price 
    this.description 
    this.brand
    this.partnership
    this.score 
    this.sizes
}
let product = new Product()
*/