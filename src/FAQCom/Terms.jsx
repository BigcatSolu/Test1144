import React, { useEffect } from 'react'

const Terms = () => {
    useEffect(() => {
        const items = document.querySelectorAll(".accordion button");
    
        function toggleAccordion() {
          const content = this.nextElementSibling;
          const itemToggle = this.getAttribute('aria-expanded');
          
          for (let i = 0; i < items.length; i++) {
            const siblingContent = items[i].nextElementSibling;
            items[i].setAttribute('aria-expanded', 'false');
            siblingContent.style.maxHeight = '0';
            siblingContent.style.opacity = '0';
          }
    
          if (itemToggle === 'false') {
            this.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
          }
        }
    
        items.forEach(item => item.addEventListener('click', toggleAccordion));
    
        // Cleanup function to remove event listeners on component unmount
        return () => {
          items.forEach(item => item.removeEventListener('click', toggleAccordion));
        };
      }, []);

  return (
    <div className='FAQ'>
      <div class="FAQcontainer">
  <h2>Frequently Asked Questions</h2>
  <div class="accordion">
    <div class="accordion-item">
      <button id="accordion-button-1" aria-expanded="false"><span class="accordion-title">การรับประกันสินค้าจากทางเรา??</span><span class="icon" aria-hidden="true"></span></button>
      <div class="accordion-content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Terms
