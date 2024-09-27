import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { HiOutlinePhone } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
function Footer() {
  const socialHandles = [
    {
      name: "Facebook",
      icon: <FaFacebook className="w-6 h-6" />,
      link: "https://www.facebook.com/your-page-name", // replace with your Facebook page URL
    },
    {
      name: "Twitter",
      icon: <FaXTwitter className="w-6 h-6" />,
      link: "https://twitter.com/your-handle", // replace with your Twitter handle URL
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-6 h-6" />,
      link: "https://www.linkedin.com/company/your-company-name", // replace with your LinkedIn company page URL
    },
    {
      name: "Pinterest",
      icon: <FaPinterest className="w-6 h-6" />,
      link: "https://www.pinterest.com/your-profile-name", // replace with your Pinterest profile URL
    },
  ];
  const ServiceContent = [
    {
      name: "HOUSE CLEANING",
      link: "/",
    },
    {
      name: "SALON SERVICE",
      link: "/",
    },
    {
      name: "AC REPAIR & SERVICING",
      link: "/",
    },
    {
      name: "MASSAGE SERVICES",
      link: "/",
    },
    {
      name: "PEST CONTROL SERVICES",
      link: "/",
    },
    {
      name: "ELECTRICIAN SERVICES",
      link: "/",
    },
  ];
  const ContactInfo = [
    {
      icon: <CiMail />,
      label: "Email",
      info: "info@example.com",
      link: "mailto:info@example.com",
    },
    {
      icon: <HiOutlinePhone />,
      label: "Phone",
      info: "+91 1234567890",
      link: "tel:+911234567890",
    },
    {
      icon: <IoLocationOutline />,
      label: "Location",
      info: "123, Main Street, New Delhi, India - 110001",
      link: "https://maps.google.com/?q=123,+Main+Street,+New+Delhi,+India",
    },
  ];

  return (
    <div className="mt-10 md:mt-20">
      {/* Main Footer */}
      <div className="w-full py-6 bg-gray-50">
        <div className="max-w-6xl flex flex-col md:flex-row border-b justify-between gap-3 mx-auto px-6 py-8">
              <div>
                  <h3 className="text-3xl font-semibold text-gray-800 mb-2">Reach out to us.</h3>
                  <p>Standard dummy text here.</p>
              </div>
              <div className=" my-3">
                  <div className=" border-gray-700 relative">
                    <input className="p-3 outline-none text-gray-600 w-full md:w-[380px] bg-gray-200 rounded-l-md" placeholder="Enter your Email id" />
                    <button className="absolute  p-3 right-0 bg-sky-950 text-white rounded-md">Subscribe</button>
                  </div>
              </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10">
          <div>
            <h3 className="text-gray-800 text-3xl md:text-2xl font-bold mb-2">About us</h3>
            <p className="text-black text-[15px]  tracking-wide">
              BookMyService is your go-to platform for booking reliable and
              professional services right at your doorstep. BookMyService
              connects you with trusted local service providers quickly and
              effortlessly.{" "}
            </p>
          </div>
          <div>
            <h3 className="text-gray-800  text-3xl md:text-2xl font-bold mb-2">
              Our Misson
            </h3>
            <p className="text-black text-[15px]  tracking-wide">
            At BookMyService, our mission is to revolutionize the way you access everyday services, making life easier, more convenient, and stress-free.
            </p>
          </div>
          <div>
            <h3 className="text-gray-800  text-3xl md:text-2xl font-bold mb-2">
              Our Services
            </h3>
            <ul className="flex flex-col w-fit gap-1">
              {ServiceContent.map((e, index) => (
                <li className="cursor-pointer text-[16px] md:text-[14px]  tracking-wide" key={index}>
                  <Link to={e.link}>{e.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-gray-800  text-3xl md:text-2xl font-bold mb-2">
              Contact Us
            </h3>
            <ul className="contact-list flex flex-col gap-1">
              {ContactInfo.map((contact, index) => (
                <li className="flex flex-row  items-center  gap-2" key={index}>
                  <span className="icon">{contact.icon}</span>
                  <div>
                     {contact.info}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Ribbon */}
      <div className="w-full bg-sky-950 ">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-3 md:flex-row justify-between py-4 md:py-6">
          <div>
            <p className="text-white text-center text-[17px]">
              Copyright By BookMyService - 2024
            </p>
          </div>
          <div className="flex flexr-row gap-3 justify-center">
            {socialHandles.map((e) => (
              <div className="text-white p-1 md:bg-sky-900 cursor-pointer hover:bg-sky-800 rounded-md">
                {e.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
