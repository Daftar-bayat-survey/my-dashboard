// ارسال فایل
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault(); // جلوگیری از ارسال فرم به صورت پیش‌فرض

    const file = document.getElementById('file').files[0];  // فایل انتخابی
    const formData = new FormData();
    formData.append('file', file);  // فایل رو به داده‌ها اضافه می‌کنیم

    // ارسال فایل به سرور
    fetch('server/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('فایل با موفقیت ارسال شد');
    })
    .catch(error => {
        alert('ارسال فایل با مشکل مواجه شد');
    });
});

// نوار پیشرفت
let progress = 0;
const progressBar = document.getElementById('progressBar');

function updateProgress() {
    progress += 10;  // هر بار 10% پیشرفت می‌کنه
    progressBar.style.width = progress + '%';
    progressBar.innerText = progress + '%';

    if (progress >= 100) {
        clearInterval(progressInterval);  // توقف پس از رسیدن به 100%
    }
}

const progressInterval = setInterval(updateProgress, 1000);  // هر ثانیه 10% پیشرفت می‌کنه

// فرم ثبت شماره تماس
const contacts = [];

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // جلوگیری از ارسال فرم

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    contacts.push({ name, phone });
    console.log('اطلاعات ثبت شده:', contacts);  // نمایش اطلاعات در کنسول
});
