-function toggleNewPasswordVisibility() {
    var passwordField = document.getElementById("newPassword");
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
  }
document.getElementById('bioFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('storedbio').value = e.target.result;
        }
        reader.readAsText(file);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve data from localStorage and set to input fields on page load
    var firstname = localStorage.getItem("firstname_data");
    var lastname = localStorage.getItem("lastname_data");
    var email = localStorage.getItem("email_data");
    var Bio = localStorage.getItem("bio_data");
    var Phone = localStorage.getItem("phone_data");
    document.getElementById("storedFirstname").value = firstname;
    document.getElementById("storedLastname").value = lastname;
    document.getElementById("storedEmail").value = email;
    document.getElementById("storedbio").value = Bio;
    document.getElementById("storedPhone").value = Phone;
    
    // Add event listener to the "Save changes" button
    document.getElementById("saveChangesBtn").addEventListener("click", function() {
        // Get updated input values
        var updatedFirstname = document.getElementById("storedFirstname").value;
        var updatedLastname = document.getElementById("storedLastname").value;
        var updatedEmail = document.getElementById("storedEmail").value;
        var updatedPhone = document.getElementById("storedPhone").value;
        var country = $('#country').val();
        // Update localStorage with the new values
        localStorage.setItem("firstname_data", updatedFirstname);
        localStorage.setItem("lastname_data", updatedLastname);
        localStorage.setItem("email_data", updatedEmail);
        localStorage.setItem("phone_data", updatedPhone);
        localStorage.setItem("country_data", country);
        
        var updatedBio = document.getElementById("storedbio").value;
        // Update localStorage with the bio data
        localStorage.setItem("bio_data", updatedBio);

        var updatedBirthday = document.getElementById("birthday").value;
        // Update localStorage with the bio data
        localStorage.setItem("birthday", updatedBirthday);

        var newPasswordInput = document.getElementById("newPassword").value;
        var repeatNewPasswordInput = document.getElementById("repeatNewPassword").value;
        var currentPasswordInput = document.getElementById("currentPassword").value.trim(); // Trim whitespace
        var storedPassword = localStorage.getItem("password_data"); // Retrieve stored password
        
        var hashedCurrentPassword = CryptoJS.SHA256(currentPasswordInput).toString(CryptoJS.enc.Hex);
        
        if (hashedCurrentPassword !== storedPassword) {
            alert('Current password is incorrect.');
            return;
        }
        // Check if the new password matches the repeated new password
        if (newPasswordInput !== repeatNewPasswordInput) {
            alert('New passwords do not match.');
            return;
        }
        
        // Encrypt the new password before storing
        var encryptedPassword = CryptoJS.SHA256(newPasswordInput).toString(CryptoJS.enc.Hex);
        
        // If everything is fine, update the password in localStorage
        localStorage.setItem('password_data', encryptedPassword);
        alert("Password changed successfully!");
        
        // Provide feedback to the user that changes have been saved
        alert("Changes saved successfully!");
    });
});


$(document).ready(function() {
    // Event listener for file input change
    $("#profileimg").change(function() {
        var file = this.files[0]; // Get the selected file
        var reader = new FileReader();
        reader.readAsDataURL(file); // Read file as data URL

        reader.onload = function() {
            var imageData = reader.result; // Base64 image data
            localStorage.setItem("userPhoto", imageData); // Save image data to local storage
            $("#userPhoto").attr("src", imageData); // Update the image src
        };
    });

    // Event listener for reset button
    $("#resetBtn").click(function() {
        localStorage.removeItem("userPhoto"); // Remove image data from local storage
        $("#userPhoto").attr("src", "img/baseuser.jpg"); // Reset image src to default
        $("#profileimg").val(""); // Clear the file input
    });

    $("#signout").click(function() {
        localStorage.removeItem("remember_data");
        window.location.href = "index.html";
    });

    // Load user photo from local storage on page load
    var userPhoto = localStorage.getItem("userPhoto");
    if (userPhoto) {
        $("#userPhoto").attr("src", userPhoto);
    }
});
