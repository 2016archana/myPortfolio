document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const typingContainer = document.querySelector('.typing-container p');
  
  if (typingContainer) {
    const text = typingContainer.innerHTML;
    typingContainer.innerHTML = '';
  
    let index = 0;
    function type() {
      if (index < text.length) {
        typingContainer.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 20);
      }
    }
    
    type();
  }
});

