let data;
let card = document.getElementById("menu");
let result = document.getElementById("result");

async function fetchData() {
    const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=percy+jackson');
    data = await response.json();
    data = data.items;
}

fetchData();

function searchBook() {
    let searchValue = document.querySelector('input').value;
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let id = crypto.randomUUID()
    let searchObj  = {
        id : id,
        query : searchValue,
        "date" : date,
        "time" : time,
    }

    //local storage
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]")
    searchHistory.push( searchObj);
    localStorage.setItem("searchHistory",JSON.stringify(searchHistory));

    let books = " "
    //filtering based on title search
    if(searchValue.length>0){
        var searchedBooks = data.filter((item) => {
            return item.volumeInfo.title.includes(searchValue)
    })
        

    //mapping the search results
       searchedBooks.map((book) => {
        books += `<div class="box">
           <div class="img">
           <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="" height="350px" width="280px">
           </div>

           <div class="title">
           <p>Title: ${book.volumeInfo.title} </p>
           </div>

           <div class="author">
           <p>Author: ${book.volumeInfo.authors[0]} </p>
           </div>

           <div class="pageCount">
           <p>Page Count: ${book.volumeInfo.pageCount}</p>
           </div>

          <div class="publisher">
          <p>Publisher: ${book.volumeInfo.publisher} </p>
          </div>

           <button class="btn">Buy Now</button> 
          </div>`  
    })
    card.innerHTML = books

    }else{
        card.innerHTML = " "
    }

    if(searchValue.length>0){
        result.innerHTML  = `Book Results For ${searchValue}`
    }else{
        result.innerHTML  = " "
    }
}





