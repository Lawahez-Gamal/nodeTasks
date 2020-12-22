fetch('https://jsonplaceholder.typicode.com/photos',{})
.then(
  res=>{
  if(res.status == 200){
    return res.json()
  }
  else throw new Error('server error')
})
.then(data =>{
  data.forEach(el=>{
    console.log(el)
     
    getphoto('img',el.url)
  
  });
})
.catch(e=>console.log(e))

const getphoto = function(image,url){
   image= document.createElement('img')
   image.setAttribute('src',url)
   image.setAttribute('class','img-thumbnail')
   document.querySelector("#photos").appendChild(image)
}




