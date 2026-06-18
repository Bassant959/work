let orderSent = false;

function sendOrder() {
  // 🚫 يمنع أي تكرار نهائي
  if (orderSent) return;
  orderSent = true;

  const name = document.getElementById("name").value.trim();
  const phone1 = document.getElementById("phone1").value.trim();
  const phone2 = document.getElementById("phone2").value.trim();
  const address = document.getElementById("address").value.trim();

  const product = localStorage.getItem("product");
  const price = localStorage.getItem("price");

  const btn = document.getElementById("confirmBtn");

  // 🔒 قفل الزر فورًا
  btn.disabled = true;
  btn.innerText = "Sending...";

  fetch("YOUR_GOOGLE_SCRIPT_URL", {
    method: "POST",
    body: JSON.stringify({
      name,
      phone1,
      phone2,
      address,
      product,
      price
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(data => {
    console.log("Order sent:", data);

    // تأكيد منع التكرار
    orderSent = true;

    window.location.href = "success.html";
  })
  .catch(err => {
    console.error(err);

    // لو فشل نفتح المحاولة تاني
    orderSent = false;
    btn.disabled = false;
    btn.innerText = "Confirm Order";
  });
}
