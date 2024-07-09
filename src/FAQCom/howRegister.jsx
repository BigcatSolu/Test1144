import React, { useEffect } from 'react'

const HowRegister = () => {

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
      <button id="accordion-button-1" aria-expanded="false"><span class="accordion-title">สมัครสมาชิกยังไง วิธีสมัครสมาชิกทำวิธีไหนบ้าง?</span><span class="icon" aria-hidden="true"></span></button>
      <div class="accordion-content">
        <p>กรอกข้อมูลที่มีสัญญาลักษ์ดอกจันทร์สีแดง ( <span className='red'>*</span> ) ให้ครบถ้วน และ ถ้าหากช่องไหนไม่มีดอกจันทร์สีแดงหมายความว่าจะกรอกหรือไม่กรอก ลูกค้าสามารถเลือกได้เลยครับ.</p>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default HowRegister
