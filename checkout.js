(function () {
  let locked = false;

  window.sendOrder = function () {
    if (locked) return;

    // جلب البيانات وتنظيف المسافات
    const name = document.getElementById("name").value.trim();
    const phone1 = document.getElementById("phone1").value.trim();
    const phone2 = document.getElementById("phone2").value.trim();
    const address = document.getElementById("address").value.trim();

    // التحقق من إدخال البيانات الأساسية
    if (!name || !phone1 || !address) {
      alert("برجاء ملء جميع البيانات الأساسية (الاسم، رقم الموبايل، والعنوان)");
      return;
    }

    locked = true;
    const btn = document.getElementById("confirmBtn");

    // تجميل الزرار أثناء الإرسال
    btn.disabled = true;
    btn.innerText = "Sending Order...";
    btn.style.pointerEvents = "none";

    const product = localStorage.getItem("product") || "منتج غير معروف";
    const price = localStorage.getItem("price") || "0";
    const orderId = crypto.randomUUID(); // توليد رقم مميز لكل طلب

    // إرسال البيانات لجوجل شيت (تصحيح الـ fetch والأقواس)
    fetch("https://script.google.com/macros/s/AKfycbzo0CrGXoa2qJQcbVIU5EdFjNCSfrvo95yxHdKi5054_Qd8Js3fZEGS8idRqtBaTB8/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        name,
        phone1,
        phone2,
        address,
        product,
        price,
        orderId
      })
    })
    .then(() => {
      // تجهيز رسالة الواتساب التلقائية
      const whatsappNumber = "201234567890"; // *** حط رقم واتساب البراند بتاعك هنا ***
      const message = `طلب جديد لابتوب براند 🎒\n\nرقم الطلب: ${orderId}\nالمنتج: ${product}\nالسعر: ${price} EGP\nالاسم: ${name}\nالموبايل 1: ${phone1}\nالموبايل 2: ${phone2 || 'لا يوجد'}\nالعنوان: ${address}`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
      // فتح الواتساب للعميل لإرسال الرسالة
      window.open(whatsappUrl, "_blank");

      // تحويل العميل لصفحة النجاح
      setTimeout(() => {
        window.location.replace("success.html");
      }, 500);
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("حدث خطأ أثناء إرسال الطلب، برجاء المحاولة مرة أخرى.");
      
      // إعادة تفعيل الزرار في حال حدوث خطأ
      locked = false;
      btn.disabled = false;
      btn.innerText = "Confirm Order";
      btn.style.pointerEvents = "auto";
    });
  };
})();
