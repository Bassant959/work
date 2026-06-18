const products = [

    {
    name:"Laptop Bag",
    price:650,
    image:"Laptop_Bag.jpeg"
    },
    
    {
    name:"Laptop Bag 1",
    price:650,
    image:"images/Laptop_Bag_1.jpeg"
    },
    
    {
    name:"Laptop Bag 2",
    price:650,
    image:"images/Laptop_Bag_2.jpeg"
    },
    
    {
    name:"Laptop Bag 3",
    price:750,
    image:"images/Laptop_Bag_3.jpeg"
    },
    
    {
    name:"Laptop Bag 4",
    price:700,
    image:"images/Laptop_Bag_4.jpeg"
    },
    
    {
    name:"Laptop Bag 5",
    price:600,
    image:"images/Laptop_Bag_5.jpeg"
    },
    
    {
    name:"Laptop Bag 6",
    price:600,
    image:"images/Laptop_Bag_6.jpeg"
    },
    
    {
    name:"Laptop Bag 7",
    price:650,
    image:"images/Laptop_Bag_7.jpeg"
    },
    
    {
    name:"Laptop Bag 8",
    price:750,
    image:"images/Laptop_Bag_8.jpeg"
    },
    
    {
    name:"Laptop Bag 9",
    price:600,
    image:"images/Laptop_Bag_9.jpeg"
    }
    
    ];
    
    const container = document.querySelector(".products");
    
    products.forEach(product => {
    
    container.innerHTML += `
    <div class="card">
    
    <img src="${product.image}" alt="${product.name}">
    
    <div class="info">
    
    <h3>${product.name}</h3>
    
    <div class="price">
    ${product.price} EGP
    </div>
    
    <button class="buy"
    onclick="buyNow('${product.name}','${product.price}')">
    
    Buy Now
    
    </button>
    
    </div>
    
    </div>
    `;
    
    });
    
    function buyNow(name,price){
    
    localStorage.setItem("product",name);
    localStorage.setItem("price",price);
    
    window.location.href="checkout.html";
    
    }
