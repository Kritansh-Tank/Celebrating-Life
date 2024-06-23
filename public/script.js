// Get all the links in the navigation menu
const navLinks = document.querySelectorAll('.nav-links li a');

// Loop through each link and add an event listener
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Remove the 'active' class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    // Add the 'active' class to the clicked link
    link.classList.add('active');
  });
});

function myFunction() {
  var x = document.getElementById("myNavbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}
