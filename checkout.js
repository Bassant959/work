let orderSent = false;

function sendOrder() {
  // 🚫 منع أي تنفيذ مهما حصل
  if (orderSent) return;
  orderSent = true;

  const btn = document.getElementById("confirmBtn");

  // 🔒 قفل فوري + منع أي ضغط
  btn.disabled = true;
  btn.innerText = "Sending...";
  btn.style.pointerEvents = "none";

  const name = document.getElementById("name").value.trim();
  const phone1 = document.getElementById("phone1").value.trim();
  const phone2 = document.getElementById("phone2").value.trim();
  const address = document.getElementById("address").value.trim();

  const product = localStorage.getItem("product");
  const price = localStorage.getItem("price");

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

    // تثبيت الحالة
    orderSent = true;

    // انتقال مباشر
    window.location.href = "success.html";
  })
  .catch(err => {
    console.error(err);

    // لو فشل نرجع نفتح كل حاجة
    orderSent = false;
    btn.disabled = false;
    btn.style.pointerEvents = "auto";
    btn.innerText = "Confirm Order";
  });
}
