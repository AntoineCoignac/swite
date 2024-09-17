"use client";

import Link from "next/link";
import "./Navbar.scss";
import GoogleButton from "./GoogleButton";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/outline";
import { LogoutIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function Navbar() {
  const { status, data: session } = useSession();
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  }

  return (
    <nav className="navbar">
      <Link href={"/"}>
        <svg
          width="82"
          height="24"
          viewBox="0 0 82 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.92529 24C5.48192 24 3.57108 23.4869 2.19277 22.4607C0.814457 21.4345 0.083534 19.9914 0 18.1315H4.44819C4.53172 18.6873 4.85542 19.1897 5.41927 19.6387C6.00401 20.0663 6.87067 20.2801 8.01927 20.2801C8.89637 20.2801 9.61685 20.1304 10.1807 19.8311C10.7654 19.5104 11.0578 19.0614 11.0578 18.4842C11.0578 17.9711 10.8385 17.5649 10.4 17.2656C9.96143 16.9449 9.1783 16.7204 8.05059 16.5922L6.70361 16.4639C4.63614 16.2501 3.08032 15.6622 2.03614 14.7001C1.01285 13.7381 0.501204 12.5088 0.501204 11.0123C0.501204 9.77227 0.804015 8.73539 1.40964 7.90161C2.01526 7.06783 2.8506 6.43715 3.91566 6.00957C5.0016 5.58199 6.23373 5.3682 7.61204 5.3682C9.82569 5.3682 11.6112 5.8706 12.9687 6.87542C14.3261 7.85885 15.0361 9.29124 15.0988 11.1726H10.6506C10.5671 10.5954 10.2747 10.1143 9.77348 9.72951C9.27228 9.32331 8.53091 9.12021 7.54939 9.12021C6.7767 9.12021 6.16063 9.26986 5.7012 9.56917C5.24176 9.86847 5.01204 10.2747 5.01204 10.7878C5.01204 11.2795 5.21044 11.6536 5.60722 11.9102C6.00401 12.1667 6.6514 12.3484 7.54939 12.4553L8.89637 12.5836C11.0056 12.8188 12.645 13.4174 13.8144 14.3794C14.9839 15.3415 15.5687 16.6349 15.5687 18.2597C15.5687 19.4356 15.2554 20.4618 14.6289 21.3383C14.0024 22.1935 13.1148 22.8562 11.9662 23.3266C10.8177 23.7755 9.47067 24 7.92529 24Z"
            fill="white"
          />
          <path
            d="M23.5461 23.8397C22.4601 23.8397 21.4682 23.6259 20.5702 23.1983C19.6722 22.7493 18.9517 22.0759 18.4087 21.178C17.8866 20.2801 17.6256 19.147 17.6256 17.7787V7.0999H21.9172V18.4201C21.9172 18.7194 21.9903 18.9973 22.1364 19.2539C22.2826 19.5104 22.481 19.7135 22.7316 19.8632C22.9822 20.0128 23.2537 20.0876 23.5461 20.0876C23.8384 20.0876 24.1099 20.0128 24.3605 19.8632C24.6111 19.7135 24.8095 19.5104 24.9557 19.2539C25.1019 18.9973 25.175 18.7194 25.175 18.4201V12.776C25.175 11.4933 25.4151 10.403 25.8955 9.50503C26.3967 8.60712 27.0858 7.92299 27.9629 7.45265C28.8609 6.96093 29.9051 6.71507 31.0955 6.71507C32.2858 6.71507 33.3196 6.96093 34.1967 7.45265C35.0947 7.92299 35.7838 8.60712 36.2641 9.50503C36.7653 10.403 37.0159 11.4933 37.0159 12.776V18.4201C37.0159 18.7194 37.089 18.9973 37.2352 19.2539C37.3814 19.5104 37.5798 19.7135 37.8304 19.8632C38.081 20.0128 38.3525 20.0876 38.6449 20.0876C38.9581 20.0876 39.2296 20.0128 39.4593 19.8632C39.7099 19.7135 39.9083 19.5104 40.0545 19.2539C40.2007 18.9973 40.2738 18.7194 40.2738 18.4201C40.2738 10.6916 41.4629 7.29231 46.1223 7.29231V11.9102C45.0049 12.1667 44.6039 13.4361 44.5653 17.7787C44.5653 19.147 44.2938 20.2801 43.7509 21.178C43.2288 22.0759 42.5187 22.7493 41.6207 23.1983C40.7228 23.6259 39.7308 23.8397 38.6449 23.8397C37.5798 23.8397 36.5983 23.6259 35.7003 23.1983C34.8023 22.7493 34.0818 22.0759 33.5388 21.178C32.9959 20.2801 32.7244 19.147 32.7244 17.7787V12.1346C32.7244 11.814 32.6513 11.536 32.5051 11.3009C32.3589 11.0443 32.1605 10.8412 31.9099 10.6916C31.6802 10.5419 31.4087 10.4671 31.0955 10.4671C30.8031 10.4671 30.5316 10.5419 30.281 10.6916C30.0304 10.8412 29.832 11.0443 29.6858 11.3009C29.5396 11.536 29.4665 11.814 29.4665 12.1346V17.7787C29.4665 19.147 29.1951 20.2801 28.6521 21.178C28.1091 22.0759 27.3886 22.7493 26.4906 23.1983C25.6135 23.6259 24.632 23.8397 23.5461 23.8397Z"
            fill="white"
          />
          <path
            d="M48.0648 23.4548V7.29231H52.2937V23.4548H48.0648ZM50.195 5.28945C49.4431 5.28945 48.8166 5.06497 48.3154 4.61601C47.8351 4.14567 47.595 3.34788 47.595 2.64237C47.595 1.93687 47.8351 1.15447 48.3154 0.705507C48.8166 0.235169 49.4431 0 50.195 0C50.9676 0 51.5941 0.235169 52.0745 0.705507C52.5757 1.15447 52.8263 1.93687 52.8263 2.64237C52.8263 3.34788 52.5757 4.14567 52.0745 4.61601C51.5941 5.06497 50.9676 5.28945 50.195 5.28945Z"
            fill="white"
          />
          <path
            d="M62.5037 23.4548C61.3969 23.4548 60.4258 23.2838 59.5904 22.9417C58.776 22.5783 58.139 21.9904 57.6796 21.178C57.2202 20.3442 56.9904 19.2111 56.9904 17.7787V10.916H54.2965V7.29231H56.9904V2.89892H61.2193V7.29231H64.5379V10.895L61.2193 10.916V17.8428C61.2193 18.5697 61.376 19.0721 61.6892 19.3501C62.0025 19.628 62.535 19.767 63.2868 19.767H63.7722L65.3543 23.4548H62.5037Z"
            fill="white"
          />
          <path
            d="M73.3429 23.8186C71.7557 23.8186 70.3461 23.4766 69.114 22.7924C67.9027 22.0869 66.9525 21.1142 66.2634 19.8742C65.5951 18.6128 65.261 17.1591 65.261 15.5129C65.261 13.8239 65.5951 12.3381 66.2634 11.0554C66.9525 9.75124 67.9027 8.73574 69.114 8.00885C70.3252 7.26059 71.7348 6.88646 73.3429 6.88646C74.9091 6.88646 76.277 7.23921 77.4465 7.94472C78.616 8.65022 79.5244 9.60159 80.1718 10.7988C80.8192 11.996 81.1429 13.3536 81.1429 14.8715C81.1429 15.0853 81.1429 15.3312 81.1429 15.6091C81.1429 15.8656 81.122 16.1329 81.0802 16.4108H68.2682V13.7812H76.8826C76.82 12.7336 76.4545 11.9105 75.7862 11.3119C75.1389 10.7133 74.3244 10.414 73.3429 10.414C72.6328 10.414 71.975 10.585 71.3694 10.9271C70.7638 11.2478 70.2834 11.7502 69.9284 12.4343C69.5943 13.1184 69.4272 13.9843 69.4272 15.0319V15.9618C69.4272 16.8384 69.5838 17.608 69.8971 18.2708C70.2312 18.9121 70.6907 19.4146 71.2754 19.778C71.8601 20.1201 72.5389 20.2911 73.3115 20.2911C74.0842 20.2911 74.7212 20.1201 75.2224 19.778C75.7445 19.4359 76.1308 18.9977 76.3814 18.4632H80.7043C80.4119 19.468 79.9212 20.3766 79.232 21.189C78.5429 22.0014 77.6971 22.6428 76.6947 23.1131C75.6923 23.5835 74.575 23.8186 73.3429 23.8186Z"
            fill="white"
          />
        </svg>
      </Link>
      {status === "authenticated" ? (
        <div className="menu">
          <div className="pp-wrapper" onClick={toggleMenu}>
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="profile"
                width={128}
                height={128}
              />
            ) : (
              <UserIcon className="regular-icon white-icon"/>
            )}
          </div>
          <div className={`menu-bg ${isMenuActive ? "active" : ""}`} onClick={toggleMenu}></div>
          <div className={`menu-items ${isMenuActive ? "active" : ""}`}>
            <div className="menu-item" id="user-info">
              <div className="pp-wrapper">
                <Image
                  src={session.user.image}
                alt="profile"
                  width={128}
                  height={128}
                />
              </div>
              <span className="text-white text-regular">{session.user.name}</span>
              <span className="text-grey text-small">{session.user.email}</span>
            </div>
            <div className="menu-item">
              <button onClick={()=>signOut()} className="button secondary">
                <LogoutIcon className="regular-icon white-icon"/>
                <span>Se déconnecter</span>
              </button>
            </div>
            <button className="toggle-menu" onClick={toggleMenu}>
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <GoogleButton />
      )}
    </nav>
  );
}
