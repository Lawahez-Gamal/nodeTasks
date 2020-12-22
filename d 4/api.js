fetch('http://newsapi.org/v2/top-headlines?country=eg&apiKey=350c5ee5a4b44f428981b8f8e2eb4b33',{})
.then(
  res=>{
  if(res.status == 200){
    return res.json()
  }
  else throw new Error('server error')
})
.then(data =>{
  
    console.log(data.articles)
     
    displayNews(data)
 
 
})
.catch(e=>console.log(e))


//Function to create elements
const newElement = function(eleType, eleContent, eleClasses){
  ele = document.createElement(eleType)
   ele.innerHTML = eleContent
  eleClasses.forEach(c=> ele.classList.add(c))
  return ele
}


//function to display data to html
const displayNews = function(data){
    data.articles.map(article => {
    const app =  document.querySelector('#app');
    app.setAttribute('class', 'row');

    const container = newElement('div','',['p-3','col-md-4','d-flex']);
   
    app.appendChild(container);
    
      const card = newElement('div','',[]);
      card.setAttribute('class', 'card w-80');
  
      const postImage = newElement('img',`${article.urlToImage}`,[]);
      postImage.src = `${article.urlToImage}`
  
      postImage.setAttribute('class', 'card-img-top')

      const postTitle= newElement('h4',`${article.title}`,[]);
      
   
      const postAuthor= newElement('a',`${article.author}`,[]);
      postAuthor.href = `${article.author}`
  
      const postDescription= newElement('p',`${article.description}`,[]);
    
      container.appendChild(card);
      card.appendChild(postImage);
      card.appendChild(postTitle);
      card.appendChild(postAuthor);
      card.appendChild(postDescription);
     
    }).join(""); 
    
}


 
      





