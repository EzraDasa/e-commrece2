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
    
    function getAllMessages() {
        document.getElementById("messages").innerHTML +=`
        <table class="table table-bordered table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    </tr>
                    </thead>
                    <tbody id="mess">
                        
                        </tbody>
                        </table>
                        `;
                        axios
                        .get("/contact")
                        .then((res)=>{
                            let arrayMessages= res.data;
                            document.getElementById("messages").style="width: 45vw;background :rgb(202, 199, 199);margin: auto;"
                            for (let i = 0; i < arrayMessages.length; i++) {
                                document.getElementById("mess").innerHTML +=`
                                <tr>
                                    <th scope="row">${i+1}</th>
                                    <td>${arrayMessages[i].name}</td>
                                    <td>${arrayMessages[i].email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">message :</th>
                                        <td colspan="2">"${arrayMessages[i].message}"</td>
                                        </tr>
                                        `;
                                    }
                                })
                                .catch((err)=>{
                                    throw err
                                })
                            }
                            
function crateMovie() {
let category = document.getElementById("inputState").value;
let name = document.getElementById("exampleFormControlInput2").value;
let price = document.getElementById("exampleFormControlInput3").value;
let summary = document.getElementById("exampleFormControlTextarea4").value;
let actors = [document.getElementById("exampleFormControlInput5").value];
let img = `${document.getElementById("exampleFormControlInput6").value}`;
let trailer = `<iframe width="560" height="315" src="${document.getElementById("exampleFormControlInput7").value}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

let moviesObj = {};

moviesObj.category = category;
moviesObj.name = name;
moviesObj.img = img;
moviesObj.price = price;
if (summary) {
moviesObj.summary = summary;
}
if (actors) {
moviesObj.actors = actors;
}
if (trailer) {
moviesObj.trailer = trailer;
}
console.log(moviesObj);
axios
.post("/movies",moviesObj)
.then((res)=>{
console.log(res);
})
.catch((err)=>{
console.log(err);
})
}

document.getElementById("fromMessage").addEventListener("submit",crateMovie);
