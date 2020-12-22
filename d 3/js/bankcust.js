customers = JSON.parse(localStorage.getItem('customers')) || []

customerId=500300200

document.querySelector("#showForm").addEventListener('click', function(e){
    e.target.textContent == "Add New customer"? e.target.textContent="Hide Form": e.target.textContent="Add New customer";

    document.querySelector('#addcustomerForm').classList.toggle('d-none')    
})

document.querySelector("#addcustomerData").addEventListener('submit',function(e){
    e.preventDefault()

    data = e.target.elements

    customers.length>0? customerId=customers[customers.length-1].id+1 : customerId

    customer ={ 
        id:customerId
     }    
    
    for(i=0; i<data.length-1;i++){ 
      
        customer[data[i].name] = data[i].value
    }
   
    customers.push(customer)
    localStorage.setItem('customers', JSON.stringify(customers))
   
    e.target.reset()
   
    document.querySelector("#showForm").textContent="Add New customer"
    document.querySelector('#mycustomer').classList.remove('d-none')
    displaycustomers()   

})

const newElement = function(eleType, eleContent){
    ele = document.createElement(eleType)
    ele.innerHTML = eleContent
  
    return ele
}


const displaycustomers = function(){  

    document.querySelector('#mycustomer table tbody').textContent=""
    if(customers.length==0){
        div = newElement('article','No Data Found')
        document.querySelector('#mycustomer table tbody').appendChild(div)
        return
    }

    customers.forEach( (customer, i) => {
    const tr =  newElement('tr','')
    const td1 = newElement('td', customer.id)
    const td2 = newElement('td', customer.customerName)
    const td3 = newElement('td', customer.customerContent)
    const td4 = newElement('button', 'DELETE  customer')
    const td5 = newElement('button', 'Add Balance')
    const td6 = newElement('button', 'Withdraw  Balance')
    

     
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
                      
    document.querySelector('#mycustomer table tbody').appendChild(tr)

    delcustomer(td4,i)
    addBalance(td5,i)
    withdrawBalance(td6,i)
    
   
    
        });


 }
 
delcustomer = function(btn, i){
    btn.addEventListener('click', function(e){
    customers.splice(i,1)
    localStorage.setItem('customers', JSON.stringify(customers))
     customers.length == 0 ? document.querySelector('#mycustomer').classList.add('d-none'): displaycustomers()

    })
}


withdrawBalance = function(btn, i){
    btn.addEventListener('click', function(e){
        value = parseFloat(prompt('enter value'))
        customers[i].customerContent>value? customers[i].customerContent = customers[i].customerContent - value : alert("Rejected withdraw")
        localStorage.setItem('customers', JSON.stringify(customers))
        displaycustomers()

    })
}


addBalance = function(btn, i){
    btn.addEventListener('click', function(e){
    value = parseFloat(prompt('enter value'))
    customers[i].customerContent= + customers[i].customerContent + value
    localStorage.setItem('customers', JSON.stringify(customers))
   displaycustomers()

    })
}


document.querySelector("#searchTable").addEventListener('keyup', function(e){

    const Searchvalue= e.target.value
    table = document.getElementById("displayTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtvalue = td.textContent ;
          if (txtvalue.includes(Searchvalue) > 0) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }

      
})






