//calculate total function
let title=document.querySelector('#title');
let price=document.querySelector('#price');
let taxes=document.querySelector('#taxes');
let ads=document.querySelector('#ads');
let discount=document.querySelector('#discount');
let total=document.querySelector('#total');
let count=document.querySelector('#count');
let category=document.querySelector('#category');
let CreateBtn=document.querySelector('#CreateBtn');
let place=document.querySelector('#search');
let mode='create';
let search='title';
let tmp;
function calcTotal(){
    if(price.value!=''){
        let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }
    else{
        total.innerHTML='';
        total.style.background= 'rgba(157, 32, 32, 0.837)';
    }
}
let data;
if(localStorage.product!=null){
    data=JSON.parse(localStorage.product);
}
else{
    data=[];
}

CreateBtn.addEventListener('click',()=>{
    let Object = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    
    if(title.value!=''){
       
        if(mode==='create'){
            if(Object.count>1){
                for(let i=0;i<Object.count;i++){
                    data.push(Object);
                }
            }
            else{
                data.push(Object);
            }
        }
        else{
            data[tmp]=Object;
            mode='create';
            CreateBtn.innerHTML='Create';
            count.style.display='block';
        }
    }
    else{
        title.focus();
    }


    localStorage.setItem('product',JSON.stringify(data))
    clear();
    read();

})
function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML='';
}
function read(){
    let table='';
    calcTotal();
    for(let i=0;i<data.length;i++){
        table+=`
        <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <th><button onclick="update(${i})" id="update">update</button></th>
            <th><button onclick="deleteData(${i})" id="delete">delete</button></th>
        </tr>
        `
    }
    document.querySelector('#tbody').innerHTML=table;
    let deletebtn=document.getElementById("deleteAll");
    if(data.length>0){
        deletebtn.classList.remove('hide');
        deletebtn.innerHTML=`
        <button onclick="deleteAllData()">delete All(${data.length})</button>
        `
    }
    else{
        deletebtn.classList.add('hide');
    }
}
read();
function deleteData(i){
    data.splice(i,1);
    window.localStorage.product=JSON.stringify(data);
    read();
}
function deleteAllData(){
    data.splice(0);
    window.localStorage.clear();
    read();
}
function update(i){
    title.value=data[i].title;
    price.value=data[i].price;
    taxes.value=data[i].taxes;
    ads.value=data[i].ads;
    discount.value=data[i].discount;
    count.value=data[i].count;
    category.value=data[i].category;
    total.innerHTML=data[i].total;
    count.style.display='none';
    CreateBtn.innerHTML='Update';
    mode='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    });
    // console.log(i);
}

let scroll2=document.querySelector('#resetbtn');
window.onscroll=function(){
    if(scrollY>440.8073425292969){
        scroll2.style.display='block';
    }
    else{
        scroll2.style.display='';
    }
}

scroll2.addEventListener('click',()=>{
    scroll({
        left:0,
        top:0,
        behavior:"smooth"
    })
})

function getSearchMode(id){   
    
    if(id=='searchTitle'){
        search='title';
        place.Placeholder ='Search By Title';
    }
    else{
        search='category';
        place.Placeholder='Search By Category';
    }
    place.focus();
}

function SearchData(value){
    let table='';
    
    if(search=='title'){
        for(let i=0;i<data.length;i++){
            if(data[i].title.includes(value)){
                table+=`
                <tr>
                <td>${i}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <th><button onclick="update(${i})" id="update">update</button></th>
                <th><button onclick="deleteData(${i})" id="delete">delete</button></th>
                </tr>
                `    
            }
           
        }
    }
    else{
        for(let i=0;i<data.length;i++){
            if(data[i].category.includes(value)){
                table+=`
                <tr>
                <td>${i}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <th><button onclick="update(${i})" id="update">update</button></th>
                <th><button onclick="deleteData(${i})" id="delete">delete</button></th>
                </tr>
                `    
            }
           
        }
    } 
    document.querySelector('#tbody').innerHTML=table;
}

