let newSoppingCart;
let inputMovie,input,checksMovie,allMovies;
let pricePay=document.getElementById("pricePay"),sum=0;

axios
.get(`/movies`)
.then((res)=>{
    searchOneMovie=res.data;
    
    searchMovie=()=>{
        inputMovie=document.getElementById("inputMovie");
        input=inputMovie.value.toLowerCase();
        checksMovie=document.getElementById("checksMovie");
        checksMovie.innerHTML="";
        checksMovie.style.border+="1px solid #ccc"
        checksMovie.style.zIndex+="10"
        for (let i = 0; i < searchOneMovie.length; i++) {
            if((searchOneMovie[i].name.indexOf(input) > -1)&& input && (input != " ")){
                checksMovie.innerHTML+= `
                <li class="foundMovie">
                    <a href="${searchOneMovie[i].page}" class="a_search">${searchOneMovie[i].name}</a>
                    </li>`;
                }else{
                    checksMovie.style="none";
                }   
            }
        }
    })
    .catch((err)=>{
        console.log(err);
        throw err;
    })

axios
.get(`/cart`)
.then((res)=>{
    allMovies=res.data[0].products;
        
        function printToCart(id){
            sum=0;
                
                for (let i = 0; i < allMovies.length; i++) {
                    products.innerHTML += `<tr id="${allMovies[i].cartId}">
                    <th scope="row">${i+1}</th>
                    <td class="nameMovie"><b>${allMovies[i].name}</b></td>
                    <td class="imgMovie"><img class="imgCart" src="${allMovies[i].img}"></td>
                    <td class="priceMovie"><b style="color:green">${allMovies[i].price}$<b></td>
                    <td><button class="removeMovie" onclick="remove(${allMovies[i].cartId})">remove</button></td>
                    </tr>`;
                    sum += Number(allMovies[i].price);
                    
                }
            
            pricePay.innerHTML += `price : <b style="color:green;">${sum}$</b>`
        }
        printToCart()

})
.catch((err)=>{
  console.log(err);
  throw err;
})


let products=document.getElementById("products");
function remove(idRemove){
    axios
    .patch(`/cart/${idRemove}`)//only one document
    .then((res)=>{
        console.log(res);
    })
    .catch((error)=>{throw error;})
    document.getElementById(idRemove).innerHTML = "";
    document.getElementById(idRemove).style.display = "none";
}

