import React, { useEffect } from 'react'
import './FAQ.scss'

const FAQ = () => {

    // useEffect(() => {
    //     const items = document.querySelectorAll(".accordion button");
    
    //     function toggleAccordion() {
    //       const itemToggle = this.getAttribute('aria-expanded');
    
    //       for (let i = 0; i < items.length; i++) {
    //         items[i].setAttribute('aria-expanded', 'false');
    //       }
    
    //       if (itemToggle === 'false') {
    //         this.setAttribute('aria-expanded', 'true');
    //       }
    //     }
    
    //     items.forEach(item => item.addEventListener('click', toggleAccordion));
    
    //     // Cleanup function to remove event listeners on component unmount
    //     return () => {
    //       items.forEach(item => item.removeEventListener('click', toggleAccordion));
    //     };
    //   }, []);

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
    <div class="accordion-item">
      <button id="accordion-button-2" aria-expanded="false"><span class="accordion-title">กำลังมองหาวิธีเติมเงินอยู่ไช่หรือไม่?</span><span class="icon" aria-hidden="true"></span></button>
      <div class="accordion-content">
        <p>อันดับแรก ให้เลือกปุ่มเติมเงินจากแถบข้างบน</p>
        <p>หากลูกค้ายังไม่ได้ ล็อคอิน หรือ สมัครสมาชิก โปรดล็อคอินหรือสมัครสมาชิกให้เรียบร้อย</p>
        <p>ทางเราจะมีบริการเติมเงินด้วย 2 วิธี <br /> วิธีที่ 1 คือ การเติมเงินด้วย True Wallet อั่งเปา <br /> วิธีที่ 2 คือ เติมเงินผ่านการโอนเงินด้วยธนาคาร <br />
        ทั้งสองระบบจะเป็นการเติมเงินเข้าเว็ปไซต์อัติโนมัติไม่ต้องรอแอดมินอนุมัติ เติมเงินแล้วเงินเข้าเว็ปไซต์ทันที
        </p>
      </div>
    </div>
    <div class="accordion-item">
      <button id="accordion-button-3" aria-expanded="false"><span class="accordion-title">วิธีสั่งสินค้าของทางเรา ไม่ยากอย่างที่คิด?</span><span class="icon" aria-hidden="true"></span></button>
      <div class="accordion-content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p>
      </div>
    </div>
    <div class="accordion-item">
      <button id="accordion-button-4" aria-expanded="false"><span class="accordion-title">การรับประกันสินค้าจากทางเรา?</span><span class="icon" aria-hidden="true"></span></button>
      <div class="accordion-content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p>
      </div>
    </div>
    <div class="accordion-item">
      <button id="accordion-button-5" aria-expanded="false"><span class="accordion-title">ข้อความที่ต้องการใส่?</span><span class="icon" aria-hidden="true"></span></button>
      <div class="accordion-content">
      <iframe width="1280" height="720" src="https://www.youtube.com/embed/KLuTLF3x9sA" title="Norway 4K • Scenic Relaxation Film with Peaceful Relaxing Music and Nature Video Ultra HD" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p> */}
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default FAQ
