import React from "react";
import "./Footer.css";

import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span className=" text-2xl">EasyLink</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            EasyLink Alaways provide the best and qulity product to the customer
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link className="text-gray-600 hover:text-gray-800">Laptop</Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">Shirt</Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">Monitor</Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">Desktop</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              USEFUL LINKS
            </h2>
            <nav className="list-none mb-10">
            
              <li>
                <Link className="text-gray-600 hover:text-gray-800" to={'/login'}>Login</Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800" to={'/products'}>Products</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              FOllOW US
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link className="text-gray-600 hover:text-gray-800">Facebook</Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">Instagram</Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">Linkedin</Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">Youtube</Link>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CONTACT US
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  9761635523
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800">
                  Chahbil Chowk
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-800" to={"mailto:hariommahato20@gmail.com"}>
                  hariommahato20@gmail.com
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2023 EasyLink—
            <Link
              href="/"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @CreatedBy-UnitechItSolution
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
