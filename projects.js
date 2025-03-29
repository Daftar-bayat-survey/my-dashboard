document.addEventListener("DOMContentLoaded", function () {
    const projectForm = document.getElementById("projectForm");
    const projectList = document.getElementById("projectList");

    // بارگذاری پروژه‌ها از حافظه مرورگر
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    function updateProjectList() {
        projectList.innerHTML = "";
        projects.forEach((project, index) => {
            let li = document.createElement("li");
            li.textContent = project;
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.onclick = function () {
                projects.splice(index, 1);
                localStorage.setItem("projects", JSON.stringify(projects));
                updateProjectList();
            };
            li.appendChild(deleteBtn);
            projectList.appendChild(li);
        });
    }

    projectForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let projectName = document.getElementById("projectName").value.trim();
        if (projectName !== "") {
            projects.push(projectName);
            localStorage.setItem("projects", JSON.stringify(projects));
            document.getElementById("projectName").value = "";
            updateProjectList();
        }
    });

    updateProjectList(); // بارگذاری اولیه لیست پروژه‌ها
});
