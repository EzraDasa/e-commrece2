let inputMovie,input,checksMovie,allMovies;
checksMovie=document.getElementById("checksMovie");

axios
.get(`/movies`)
.then((res)=>{

  allMovies=res.data;
})
.catch((err)=>{
  console.log(err);
  throw err;
})
searchMovie=()=>{
    inputMovie=document.getElementById("inputMovie");
    input=inputMovie.value.toLowerCase();
    checksMovie=document.getElementById("checksMovie");
    checksMovie.innerHTML="";
    checksMovie.style.border+="1px solid #ccc"
    checksMovie.style.zIndex+="10"
    console.log(allMovies);
    for (let i = 0; i < allMovies.length; i++) {
        if((allMovies[i].name.indexOf(input) > -1)&& input && (input != " ")){
            checksMovie.innerHTML+= `
            <li class="foundMovie">
                <a href="${allMovies[i].page}" class="a_search">${allMovies[i].name}</a>
            </li>`;
            console.log(checksMovie);
        }else{
            checksMovie.style="none";
        }
        
    }

}

window.onscroll=function(){
    let height=document.getElementById("height");
    if ( document.body.scrollTop >= 200 ){
        
        height.style =`position: fixed;z-index: 7;width: 100%; background-color: rgba(3, 8, 77, 0.9);`;
    }
    else{
        
        height.style = `position: fixed;z-index: 7;width: 100%;background-color: rgb(5, 5, 5,0.3);`;

    }
}



let sizeCard=document.getElementsByClassName("sizeCard");
let imgSlide=document.getElementsByClassName("imgSlide");


hover=()=>{
    for (let i = 0; i < sizeCard.length; i++) {
        if (sizeCard[i].onmouseover) {
            
            sizeCard[i].firstElementChild.style.height=`75%`;
        }
       
    }
}
out=()=>{
    for (let i = 0; i < sizeCard.length; i++) {
            
            sizeCard[i].firstElementChild.style.height=`100%`;
        
       
    }
}

let vol=document.getElementById("vol");
let video=document.getElementById("video");

volume=()=>{
    if(vol.value == "false"){

        vol.value ="ture";
        vol.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
        <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
        <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
        <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"/>
        </svg>`;
      video.volume=0.4;
    }
    else{

        vol.value = "false";
        vol.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-volume-mute" viewBox="0 0 16 16">
        <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
      </svg>`;
        video.volume=0.0;
    }
    
    console.log(vol.value);
}

let btnTrailer=document.getElementById("btnTrailer");


setTimeout(()=>{
    video.volume=0.0;
},0
)

setTimeout(()=>{
    video.src=""
    video.style.backgroundImage+="linear-gradient(to right, black , yellow)";
    vol.style.display="none";
    vol.innerHTML="";
},160000
)