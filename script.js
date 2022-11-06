var currPage=0;
var globalData=[];
var table= document.createElement('table');

const fetchProducts = async () => {
    try{
    const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
    const products= await response.json();
    
//   products.forEach(({ brand,name,price,image_link,description}) => { // destructured flag from each country
//     console.log(brand,name,price,image_link,description);
return products;
    }catch{
        const p=document.createElement('p');
        p.innerText='incorrect API';
        document.body.appendChild(p);
    }
}

const btnsDiv = document.createElement('div');
btnsDiv.className = 'd-flex justify-content-center';
btnsDiv.id = "buttons";
const nextBtn = document.createElement('button');
const backBtn = document.createElement('button');
backBtn.innerText = 'Back';
backBtn.id= "backButton";
backBtn.style.display = "none";

//backBtn.className = 'd-flex justify-content-left';
nextBtn.innerText= "Next";
//nextBtn.className = ' justify-content-right';
btnsDiv.append(backBtn);
btnsDiv.append(nextBtn);

function createTh(){
table.classList.add("table");
table.classList.add("table-bordered");
table.classList.add("border-primary");
table.classList.add("border");
var tr1= document.createElement('tr');
var th1= document.createElement('th');
th1.classList.add(".bg-dark");
th1.classList.add("col-4");
var th2= document.createElement('th');
th2.classList.add(".bg-dark");
th1.innerText='Product Image';
th1.style.textAlign='center'
th2.innerText='Details';
th2.style.textAlign='center'
th2.classList.add("col-8");
tr1.appendChild(th1);
tr1.appendChild(th2);
table.appendChild(tr1);
}

function createTrs(image_link, brand, name,product_link,description,price,price_sign){
    var tr2=document.createElement('tr');
        var td1=document.createElement('td');
        const product = document.createElement('img');
        product.src = image_link;
        product.title = name;
        product.alt = 'Image not found';
        product.style.margin = '8px';
        product.description = description;
        product.style.height = '200px';
        product.style.width = '400px';
        td1.appendChild(product);
        tr2.appendChild(td1);
        table.appendChild(tr2);
        var td2=document.createElement('td');

        const divEle = document.createElement('div');
        const divEle1 = document.createElement('div');
        const divEle2 = document.createElement('div');
        const divEle3 = document.createElement('div');
        const divEle4 = document.createElement('div');
        const a = document.createElement('a');
        a.href= product_link;
        a.innerHTML= "productlink";
        a.target= "_blanck";

        const divEle5 = document.createElement('div');

        divEle1.innerHTML="<b>brand:</b>" + brand;
        divEle2.innerHTML="<b>Name: </b>" + name;
        divEle3.innerHTML="<b>Price: </b>" + price+ " " + price_sign;
        divEle4.appendChild(a);
        divEle5.innerHTML="<b>Description: </b>" +description;
        divEle.appendChild(divEle1);
        divEle.appendChild(divEle2);
        divEle.appendChild(divEle3);
        
        divEle.appendChild(divEle5);
        divEle.appendChild(divEle4);
        td2.appendChild(divEle);
        td2.classList.add("m-auto");
        tr2.appendChild(td2);
}

fetchProducts().then(products => {
    document.getElementById('pid').style.display="none";

    
globalData=products;
document.body.classList.add("m-4");

createTh();

products.slice(currPage, 3).forEach(({ image_link, brand, name,product_link,description,price,price_sign}) => {
        createTrs(image_link, brand, name,product_link,description,price,price_sign);
        
    }
)
    document.body.append(table);
    document.body.append(btnsDiv);


    
});

const showNextSetOfData = () => {

    table.innerHTML = '';
  
    currPage++;
    document.body.classList.add("m-4");
    createTh();
    const startIndex = currPage * 3;
  
    const endIndex = (currPage * 3) + 3;
    globalData.slice(startIndex, endIndex).forEach(({ image_link, brand, name,product_link,description,price,price_sign}) => {
        createTrs(image_link, brand, name,product_link,description,price,price_sign);
    }
);
if(currPage > 0)
{
    document.getElementById("backButton").style.display="block";
}else{
    document.getElementById("backButton").style.display="none";
}
} 
nextBtn.addEventListener('click', showNextSetOfData);


const showPrevSetOfData = () => {
    currPage--;
    table.innerHTML = '';
    document.body.classList.add("m-4");
    createTh();
    const startIndex = currPage * 3;
  
    const endIndex = (currPage * 3) + 3;
    globalData.slice(startIndex, endIndex).forEach(({ image_link, brand, name,product_link,description,price,price_sign}) => {
        createTrs(image_link, brand, name,product_link,description,price,price_sign);
    }
);
if(currPage > 0)
{
    document.getElementById("backButton").style.display="block";
}else{
    document.getElementById("backButton").style.display="none";
}
} 
backBtn.addEventListener('click', showPrevSetOfData);

