import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

const Footer = () => {
  const [dropContact, setDropContact] = useState(false);
  const [dropHelp, setDropHelp] = useState(false);

  return (
    <footer>
      <div className="container">
        <div className="flex flex1">
          <div className="logo">
            <img src="/profiles/7.jpg" alt="WebsiteLogo" />
          </div>
          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
              Facere corrupti aut neque molestias in perferendis modi, natus
              sint similique doloremque.
            </p>
          </div>
        </div>
        <div className="flex flex2">
          <div className="title">
            <h4>ติดต่อ</h4>
          </div>
          <div className="list">
            <ul>
              <Link className="link">
                <li>Facebook</li>
              </Link>
              <Link className="link">
                <li>Line</li>
              </Link>
              <Link className="link">
                <li>Discord</li>
              </Link>
              <Link className="link">
                <li>08xxxxxxx</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex flex3">
          <div className="title">
            <h4>ช่วยเหลือ</h4>
          </div>
          <div className="list">
            <ul>
              <Link className="link" to='/faq/howregister'>
                <li>วิธีสมัครสมาชิก</li>
              </Link>
              <Link className="link" to='/faq/howtopup'>
                <li>วิธีเติมเงิน</li>
              </Link>
              <Link className="link" to='/faq/howorder'>
                <li>วิธีสั่งสินค้า</li>
              </Link>
              <Link className="link" to='/faq/terms'>
                <li>Terms Of Use</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="responsive-item">
          <div className="item2">
            <div className="title">
              <h4>ติดต่อ</h4>
            </div>
            <div className="list">
              <ul>
                <Link className="link">
                  <li>Facebook</li>
                </Link>
                <Link className="link">
                  <li>Line</li>
                </Link>
                <Link className="link">
                  <li>Discord</li>
                </Link>
                <Link className="link">
                  <li>08xxxxxxx</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="item3">
            <div className="title">
              <h4>ช่วยเหลือ</h4>
            </div>
            <div className="list">
              <ul>
                <Link className="link">
                  <li>วิธีสมัครสมาชิก</li>
                </Link>
                <Link className="link">
                  <li>วิธีเติมเงิน</li>
                </Link>
                <Link className="link">
                  <li>วิธีสั่งสินค้า</li>
                </Link>
                <Link className="link">
                  <li>Terms Of Use</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="item4">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FShopArea999&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="340"
              height="130"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="yes"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
        <div className="flex flex4">
          {/* <img src="" alt="Facebook page" /> */}
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FUndawnTH&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="340"
            height="130"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="yes"
            frameborder="0"
            allowTransparency="true"
            allow="encrypted-media"
            // title="Facebook Page"
          ></iframe>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FShopArea999&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="340"
            height="130"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="yes"
            frameborder="0"
            allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>

      <div className="reponsive-container">
        <div className="website-des">
          <img className="image" src="/profiles/7.jpg" alt="WebsiteLogo" />
          <div className="content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
              Facere corrupti aut neque molestias in perferendis modi, natus
              sint similique doloremque.
            </p>
          </div>
        </div>
        <ul className="presentation">
          <li
            className="presentation-list"
            onClick={() => setDropContact(!dropContact)}
          >
            <p className="list-heading">ติดต่อ</p>
            <RiArrowDropDownLine
              className={dropContact ? "list-open" : "list-close"}
            />
          </li>
          <ul className={dropContact ? "drop-list" : "list"}>
            <Link className="link">
              <li>Facebook</li>
            </Link>
            <Link className="link">
              <li>Line</li>
            </Link>
            <Link className="link">
              <li>Discord</li>
            </Link>
            <Link className="link">
              <li>08xxxxxxx</li>
            </Link>
          </ul>
        </ul>
        <ul className="presentation">
          <li
            className="presentation-list"
            onClick={() => setDropHelp(!dropHelp)}
          >
            <p className="list-heading">ช่วยเหลือ</p>
            <RiArrowDropDownLine
              className={dropHelp ? "list-open" : "list-close"}
            />
          </li>
          <ul className={dropHelp ? "drop-list" : "list"}>
            <Link className="link">
              <li>วิธีสมัครสมาชิก</li>
            </Link>
            <Link className="link">
              <li>วิธีเติมเงิน</li>
            </Link>
            <Link className="link">
              <li>วิธีสั่งสินค้า</li>
            </Link>
            <Link className="link">
              <li>Terms Of Use</li>
            </Link>
          </ul>
        </ul>
        <div className="pages">
        <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FUndawnTH&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="340"
            height="130"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="yes"
            frameborder="0"
            allowTransparency="true"
            allow="encrypted-media"
            // title="Facebook Page"
          ></iframe>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FShopArea999&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="340"
            height="130"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="yes"
            frameborder="0"
            allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>

      <div className="license">© OattyDev Ltd. All rights reserved</div>
    </footer>
  );
};

export default Footer;