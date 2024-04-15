// ... (existing code)

document.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollPosition = window.scrollY;

    // Toggle the visibility based on scroll position
    if (scrollPosition > 100) { // You can adjust this threshold as needed
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// ... (existing code)

// Function to scroll to the top of the document
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}