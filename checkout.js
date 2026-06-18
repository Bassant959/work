(function () {

  let locked = false;

  window.sendOrder = function () {

    if (locked) return;
    locked = true;

    const btn = document.getElementById("confirmBtn");

    btn.disabled = true;
    btn.innerText = "Sending...";
    btn.style.pointerEvents = "none";

    const name = document.getElementById("name").value.trim();
    const phone1 = document.getElementById("phone1").value.trim();
    const phone2 = document.getElementById("phone2").value.trim();
    const address = document.getElementById("address").value.trim();

    const product = localStorage.getItem("product");
    const price = localStorage.getItem("price");

    fetch("https://script.google.com/macros/s/AKfycbxhQqGFF0q4HdrgvFhwyeehQDW3obfSrRQuvAOMvlObV4h51RDt5ERwQtNFME5kzj3Q/exec", {
      method: "POST",
      keepalive: true,
      body: JSON.stringify({
        name,
        phone1,
        phone2,
        address,
        product,
        price,
        orderId: crypto.randomUUID()
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      setTimeout(() => {
        window.location.replace("success.html");
      }, 200);
    })
    .catch(() => {

      locked = false;
      btn.disabled = false;
      btn.innerText = "Confirm Order";
      btn.style.pointerEvents = "auto";
    });

  };

})();
