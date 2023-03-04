let searchBox = document.getElementById("history");
let searchCart = " ";
function getHistory() {
  let data = JSON.parse(localStorage.getItem("searchHistory"));
  console.log(data);

   if(data){
    data.map((item) => {
      searchCart += `<div class="box1">
         
          <div class="content" id = ${item.id}>
  
          <div class="text">
          <p>${item.query}</p>
          </div>
       
           <div class="time">
            <p>Searched On :${item.date} at ${item.time}</p>
             </div>
          </div>
  
           </div>`
    });
  
    searchBox.innerHTML = searchCart;
   }else{
    searchBox.innerHTML = " ";
   }
}

const onClick = (event) =>{
    var id = event.target.id
    // console.log(event.target.id);
      localStorage.setItem("id",id);
  }


window.addEventListener('click',onClick)
getHistory();


function clearSearch(){
  localStorage.removeItem("searchHistory")
  getHistory();
}