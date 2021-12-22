import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a href="/">
            <img src="https://img.icons8.com/doodle/48/000000/facebook-new.png"  alt="error"/>
          </a>
           <a href="/">
            <img src="https://img.icons8.com/stickers/50/000000/instagram-new--v2.png" alt="error"/>
          </a>
           <a href="/">
            <img src="https://img.icons8.com/doodle/48/000000/youtube-play--v2.png" alt="error"/>
          </a>
           <a href="/">
            <img src="https://img.icons8.com/doodle/50/000000/tiktok--v2.png" alt="error"/>
          </a>
        </div>
        <ul className="">
          <li className="list-inline-item">
          <a href="/">Trang chu</a>
          <a href="/">Loai can ho</a>
          <a href="/">Can ho</a>
          <a href="/">Lien he</a>
          <a href="/">Tien ich</a>
          </li>
        </ul>
        <p className="copyright">@ Copyright Homestay Chim tren cay</p>
      </footer>
    </div>
  );
}
