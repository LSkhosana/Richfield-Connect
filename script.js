console.log("JS is running");

function toggleMenu() {
    var menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
}
// Navigation hover effect
$(".links a").hover(
    function () {
        $(this).animate({ opacity: 0.6 }, 200);
    },
    function () {
        $(this).animate({ opacity: 1 }, 200);
    }
);

const interests = [
  "Programming ",
  "Web Development",
  "Mobile App Development",
  "Data Science",
  "Artificial Intelligence",
  "Career Development"
];


const container = document.querySelector(".interest-options");
const preview = document.getElementById("previewInterests");

let selectedInterests = [];
if (container) {
    interests.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = item;
    
    button.addEventListener("click", () => { 
        if (selectedInterests.includes(item)) {
        // remove intrest
        selectedInterests = selectedInterests.filter(i => i !== item);
        button.classList.remove("active");
        } else {
        // add intrest
        selectedInterests.push(item);
        button.classList.add("active");
        }
        // UPDATE PREVIEW
        updatePreview();
    });

    container.appendChild(button);
    });
}

function updatePreview() {
    if (!preview) return;
    preview.innerHTML = "";

    selectedInterests.forEach(item => {
        const tag = document.createElement("span");
        tag.textContent = item;
        tag.classList.add("tag");
        preview.appendChild(tag);
  });
}




$(document).ready(function() {
    // FORM SUBMIT
    $("form").on("submit", function(e) {
        e.preventDefault(); // requirement 1
        
        let isValid = true;

        $(".error").text("");
        $("input, textarea").removeClass("input-error");

        // get values
        const name = $("#fullName").val();
        const studentNumber = $("#studentNumber").val();
        const campus = $("#campus").val();
        const email = $("#email").val();
        const password = $("#password").val();
        const bio = $("#bio").val();

        // validation 
        if (name === "") {
            $("#nameError").text("Name is required");
            $("#fullName").addClass("input-error");
            isValid = false;
        }

        if (password === "") {
            $("#passwordError").text("Password is required");
            $("#password").addClass("input-error");
            isValid = false;
        } else if (password.length < 8) {
            $("#passwordError").text("Password must be at least 6 characters long");
            $("#password").addClass("input-error");
            isValid = false;
        }

        if (email === "") {
            $("#emailError").text("Email is required");
            $("#email").addClass("input-error");
            isValid = false;
        } else if (!email.includes("@")) {
            $("#emailError").text("Please enter a valid email address");
            $("#email").addClass("input-error");
            isValid = false;
        }

        if (studentNumber === "") {
            $("#studentError").text("Student number is required");
            $("#studentNumber").addClass("input-error");
            isValid = false;
        } else if (isNaN(studentNumber)) {
            $("#studentError").text("Please enter a valid student number");
            $("#studentNumber").addClass("input-error");
            isValid = false;
        }

        if (bio === "") {
            $("#bioError").text("Bio is required");
            $("#bio").addClass("input-error");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // store in localStorage
        const user = {
            name: name,
            studentNumber: studentNumber,
            campus: campus,
            email: email,
            password: password,
            bio: bio,
            interests: selectedInterests

        };

        localStorage.setItem("user", JSON.stringify(user));

        // redirect
        window.location.href = "profile.html";
    });
});


// LOAD PROFILE DATA
if (window.location.pathname.includes("profile.html")) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        const profile = document.querySelector(".profile");

        profile.innerHTML = `
            <h1>${user.name}</h1>
            <p><strong>Student Number:</strong> ${user.studentNumber}</p>
            <p><strong>Campus:</strong> ${user.campus}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Bio:</strong><br /> ${user.bio}</p>
            <p><strong>Interests:</strong><br /> ${user.interests.join(", ")}</p>
        `;
    } else {
        document.querySelector(".profile").innerHTML = `
            <p>No profile found. Please sign up first.</p>
        `;
    }
}


// LIVE PREVIEW
if ($("#fullName").length) {
$("#fullName").on("input", function() {
    $("#previewName").text($(this).val());
});

$("#bio").on("input", function() {
    $("#previewBio").text($(this).val());
});
}