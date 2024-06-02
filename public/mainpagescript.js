let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
$(document).ready(function() {
  // Function to update profile photo
  function updateProfilePhoto() {
      var userPhoto = localStorage.getItem("userPhoto");
      if (userPhoto) {
          $("#profile-item img").attr("src", userPhoto);
      } else {
          $("#profile-item img").attr("src", "img/baseuser.jpg");
      }
  }

  // Load user photo from local storage on page load
  updateProfilePhoto();

  // Event listener for file input change
  $("#profileimg").change(function() {
      var file = this.files[0]; // Get the selected file
      var reader = new FileReader();
      reader.readAsDataURL(file); // Read file as data URL

      reader.onload = function() {
          var imageData = reader.result; // Base64 image data
          localStorage.setItem("userPhoto", imageData); // Save image data to local storage
          updateProfilePhoto(); // Update profile photo on the page
      };
  });
  document.getElementById("showcalendar").addEventListener("click", function() {
    var iframeContainer = document.querySelector(".iframe-container");
    if (iframeContainer.style.display === "none") {
        iframeContainer.style.display = "block";
    } else {
        iframeContainer.style.display = "none";
    }
});
  // Event listener for reset button
  $("#resetBtn").click(function() {
      localStorage.removeItem("userPhoto"); // Remove image data from local storage
      updateProfilePhoto(); // Update profile photo on the page
      $("#profileimg").val(""); // Clear the file input
  });
});

