let allMovies;
let categoryMovies = document.getElementById("moviesCard");
let category = document.getElementById("headCategory").innerText;
let trailers = document.getElementsByClassName("trailers");
let popUp = document.getElementById("popUp");
let btnBuy = document.getElementsByClassName("btnBuy");

axios
.get(`/movies/${category}`)
.then((res)=>{
  allMovies=res.data;
  for (let i = 0; i < allMovies.length; i++) {
    categoryMovies.innerHTML += `<article class="cardMovie">
      <div class="flip-box" id="${allMovies[i]._id}">
           <div class="flip-box-inner">
             <div class="flip-box-front">
               <img src="${allMovies[i].img}" alt="${allMovies[i].name}" style="width:100%;height:100%;">
             </div>
             <div class="flip-box-back" >
               <div class= "info">
               <h2>Movie : ${allMovies[i].name}</h2><br>
               <p>${allMovies[i].summary}</p>
               <br><h3>Actors :</h3>
               <p>${allMovies[i].actors.toString()}</p><br>
               <h3>price : <b style="color:green;">${allMovies[i].price}$<b></h3><br>
               <div class="buy_or_watch">
               <button  type="button" onclick="addToCart(${i})" id="${allMovies[i].id}" class="btnBuy" style="background-color: brown;border-radius: 20%;">buy</button>
               <button  type="button" onclick="deleteToMovies('${allMovies[i]._id}')" class="btnBuy" style="background-color: brown;border-radius: 20%;">Delete</button>
               <a class="trailers"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
               <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
               </svg></a>
               </div>
               <button class="btnBuy" style="background-color:blue" type="button" onclick="popUp_update('${allMovies[i]._id}')" class="btn btn-primary">update movie</button>
               </div>
             </div>
             </div>
           </div>
         </div> 
   </article>`;
  }

  //onclick show trailer
  for (let i = 0; i < allMovies.length; i++) {
    trailers[i].onclick = () => {
      popUp.innerHTML = `<div class="trailerMovies"><svg onClick="closeTrailer()" id="closeTrailer" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>${allMovies[i].trailer}</div>`;
      popUp.style.zIndex = "2";
    }
  }

})
.catch((err)=>{
  console.log(err);
  throw err;
})


closeTrailer = () => {
  popUp.innerHTML = "";
  popUp.style.zIndex = "-3"
}


function addToCart(x) {
  axios
  .post(`/carts`,allMovies[x])
  .then((response)=>{
    console.log(response.data);
  })
  .catch((error)=>{console.log(error);})
}

let inputMovie,input,checksMovie,searchOneMovie;
checksMovie=document.getElementById("checksMovie");

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

function deleteToMovies(MovieId) {
  console.log(MovieId);
  let verify = prompt("Are you sure you want to delete? Y / N");
  if (verify && verify.toLowerCase() == "y") {
    axios
    .delete(`/products/${MovieId}`)
    .then((response)=>{
      console.log(response.data);
    })
    .catch((error)=>{throw error;})
    document.getElementById(MovieId).innerHTML = ""
    document.getElementById(MovieId).style.display = "none"
  }
}

function popUp_update(id) {
  popUp.innerHTML = `<div class="trailerMovies">
  <div style=" display: flex;width: 35vw;height:65vh ;background :rgb(202, 199, 199);justify-content:center;">
      <form id="fromMessage" style="text-align:center;align-content:space-around;"><br>
                <div class="form-group">
                  <select id="inputState" class="form-control" required>
                  <option selected >Choose category</option>
                  <option>action</option>
                  <option>drama</option>
                  <option>comedy</option>
                  <option>animation</option>
                  </select><br><br>
                  <label for="exampleFormControlInput2">Name movie :</label><br>
                  <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="exp: john wick" required><br><br>
                  <label for="exampleFormControlInput3">price :</label><br>
                  <input type="number" class="form-control" id="exampleFormControlInput3" placeholder="exp: 21$" required><br><br>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea4">summary of the movie:</label><br>
                    <textarea style="width:90%;" class="form-control" id="exampleFormControlInput4" rows="3" ></textarea><br><br>
                </div>
                <label for="exampleFormControlInput5">actors :</label><br>
                <input type="text" class="form-control" id="exampleFormControlInput5" placeholder="exp: Tom Cruise ,tom hardy ,tom hanks" ><br><br>
                <label for="exampleFormControlInput6">image url :</label><br>
                <input type="text" class="form-control" id="exampleFormControlInput6" placeholder="exp: https://cdn.pixabay.com/photo/2015/01/05/17/19/film-589491_960_720.jpg" required><br><br>
                <label for="exampleFormControlInput7">trailer url :</label><br>
                <input type="text" class="form-control" id="exampleFormControlInput7" placeholder="exp: https://www.youtube.com/embed/jKCj3XuPG8M" ><br><br>
                <div style="display: flex;justify-content: space-evenly;">
                    <button type="button" onclick="updateMovie('${id}')" class="btn btn-primary">update</button>
                </div>
            </form>
          </div>
  <svg onClick="closeTrailer()" id="closeTrailer" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg></div>`;
      popUp.style.zIndex = "2";
}

function updateMovie(id) {
  let category = document.getElementById("inputState").value;
  let name = document.getElementById("exampleFormControlInput2").value;
  let price = document.getElementById("exampleFormControlInput3").value;
  let summary = document.getElementById("exampleFormControlInput4").value;
  let actors = [document.getElementById("exampleFormControlInput5").value];
  let img = `${document.getElementById("exampleFormControlInput6").value}`;
  let trailer = document.getElementById("exampleFormControlInput7").value;
  
  let moviesObj = {};
  if (price) {
    moviesObj.price = price;
  }
  if (img) {
    moviesObj.img = img;
  }
  if (name) {
    moviesObj.name = name;
  }
  if (category != 'Choose category') {
    moviesObj.category = category;
  }
  if (summary) {
  moviesObj.summary = summary;
  }
  if (actors[0] != '') {
  moviesObj.actors = actors;
  }
  if (trailer) {
    trailer =`<iframe width="560" height="315" src="${document.getElementById("exampleFormControlInput7").value}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    moviesObj.trailer = trailer;
  }

  axios
  .patch(`/movies/update/${id}`,moviesObj)
  .then((res)=>{
  console.log(res);

  })
  .catch((err)=>{
  console.log(err);
  })
  }