const product = localStorage.getItem("product");
const price = localStorage.getItem("price");

function sendOrder(){

let name=document.getElementById("name").value;
let phone1=document.getElementById("phone1").value;
let phone2=document.getElementById("phone2").value;
let address=document.getElementById("address").value;

if(!name || !phone1 || !address){

alert("Please fill all required fields");

return;

}

const message = `🛍️ New Order

Product: ${product}

Price: ${price} EGP

Name: ${name}

Phone 1: ${phone1}

Phone 2: ${phone2}

Address: ${address}`;

fetch(
"https://script.google.com/macros/s/AKfycby2ZVW4WRYKL_Fqq2pjcELZfZ9OSRLHBvQtoIChPpdA6wRfSteh8s5JxhPWXiZlXLFR/exec",
{
method:"POST",
body:JSON.stringify({
product,
price,
name,
phone1,
phone2,
address
})
}
)
.then(()=>{

window.open(
`https://wa.me/201270584171?text=${encodeURIComponent(message)}`,
"_blank"
);

})
.catch(err=>{

console.log(err);

alert("Error sending order");

});

}