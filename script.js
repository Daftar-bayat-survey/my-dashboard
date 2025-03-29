
// دسترسی به عناصر صفحه
const projectForm = document.getElementById('project-form');
const projectList = document.getElementById('project-list');
const projectNameInput = document.getElementById('project-name');
const dueDateInput = document.getElementById('due-date'); // فیلد تاریخ تحویل

// اضافه کردن پروژه جدید به لیست
projectForm.addEventListener('submit', function(e) {
    e.preventDefault();  // جلوگیری از ارسال فرم

    const projectName = projectNameInput.value; // دریافت نام پروژه
    const dueDate = dueDateInput.value; // دریافت تاریخ تحویل

    // اطمینان از پر بودن فیلدها
    if (projectName !== "" && dueDate !== "") {
        // ایجاد عنصر جدید برای پروژه
        const li = document.createElement('li');
        li.textContent = `${projectName} - تاریخ تحویل: ${dueDate}`;

        // ایجاد دکمه‌های ویرایش و حذف
        const editButton = document.createElement('button');
        editButton.textContent = "ویرایش";
        editButton.classList.add('edit-button');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "حذف";
        deleteButton.classList.add('delete-button');

        // افزودن دکمه‌ها به پروژه
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        // اضافه کردن پروژه به لیست
        projectList.appendChild(li);

        // ذخیره در localStorage
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.push({ name: projectName, dueDate: dueDate });
        localStorage.setItem('projects', JSON.stringify(projects));

        // پاک کردن فیلد ورودی پس از افزودن
        projectNameInput.value = '';
        dueDateInput.value = '';
    }
});

// حذف پروژه
projectList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-button')) {
        const li = e.target.parentElement;
        const projectName = li.textContent.replace(" ویرایش حذف", "").split(" - ")[0];

        // حذف از localStorage
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects = projects.filter(project => project.name !== projectName);
        localStorage.setItem('projects', JSON.stringify(projects));

        li.remove();
    }
});

// ویرایش پروژه
projectList.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-button')) {
        const li = e.target.parentElement;
        const projectName = li.textContent.replace(" ویرایش حذف", "").split(" - ")[0];
        const dueDate = li.textContent.split(" - ")[1].replace("تاریخ تحویل: ", "");

        // بازگرداندن پروژه به فیلدهای ورودی
        projectNameInput.value = projectName;
        dueDateInput.value = dueDate;

        // حذف پروژه از لیست
        li.remove();

        // حذف از localStorage
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects = projects.filter(project => project.name !== projectName);
        localStorage.setItem('projects', JSON.stringify(projects));
    }
});

// بارگذاری پروژه‌ها از localStorage
document.addEventListener('DOMContentLoaded', function() {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    storedProjects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = `${project.name} - تاریخ تحویل: ${project.dueDate}`;
        
        // ایجاد دکمه‌های ویرایش و حذف
        const editButton = document.createElement('button');
        editButton.textContent = "ویرایش";
        editButton.classList.add('edit-button');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "حذف";
        deleteButton.classList.add('delete-button');

        // افزودن دکمه‌ها به پروژه
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        projectList.appendChild(li);
    });
});
