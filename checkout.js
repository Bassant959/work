(function () {

  // 🚨 GLOBAL LOCK (مش بيتكرر حتى لو الكود اتنادى مرتين)
  if (window.__orderLocked) return;
  window.__orderLocked = false;

  window.sendOrder = function () {

    // 🚫 منع أي تكرار نهائي
    if (window.__orderLocked) return;
    window.__orderLocked = true;

    const btn = document.getElementById("confirmBtn");

    // 🔒 قفل فوري جدًا
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
        price,
        orderId: Date.now() // مهم جدًا
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.text())
    .then(data => {

      window.location.href = "success.html";
    })
    .catch(err => {

      // لو فشل نفتح القفل تاني
      window.__orderLocked = false;

      btn.disabled = false;
      btn.innerText = "Confirm Order";
      btn.style.pointerEvents = "auto";
    });

  };

})();
