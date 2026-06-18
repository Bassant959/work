(function () {

  let locked = false;

  window.sendOrder = function () {

    // 🚫 منع تكرار نهائي
    if (locked) return;
    locked = true;

    const btn = document.getElementById("confirmBtn");

    // 🔒 قفل فوري
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
      keepalive: true, // 🔥 مهم جدًا لمنع الإلغاء عند التنقل
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
      // ⛔ تأخير بسيط جدًا لضمان الإرسال
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
