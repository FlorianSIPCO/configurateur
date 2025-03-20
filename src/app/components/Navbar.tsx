"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, User } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Produits", href: '/products'},
    { name: "Accueil", href: '/'},
    { name: "Contact", href: '/contact'},
  ]

  return (
    <nav className="relative top-0 left-0 w-full bg-gray-800 text-amber-700 backdrop-blur-lg  shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <motion.div
          className="w-24 h-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href='/'>
            <Image 
              src='/images/logo.png'
              alt="Logo SIPCO Gaming"
              width={50}
              height={50}
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item, i) => (
            <motion.li
              key={i}
              className="relative cursor-pointer text-2xl font-bold text-amber-700 transition-all duration-300 hover:text-amber-600 hover:scale-105"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.2 } }}
            >
              <Link href={item.href} className="flex items-center">
                {item.name}
              </Link>
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-800 scale-x-0 transition-transform duration-300 hover:scale-x-100" />
            </motion.li>
          ))}
        </ul>

        {/* Icons Login */}
        <div className="flex items-center space-x-4">
          <Link href='/login'>
            <User className="w-10 h-10 cursor-pointer hover:text-amber-600 transition" />
          </Link>
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-10 h-10" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          className="md:hidden h-screen bg-gray-700 p-4 text-center justify-center items-center space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map((item, i) => (
            <motion.div
              key={i}
              className="cursor-pointer text-lg h-18 m-auto items-center text-white hover:text-amber-600 transition-all duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.2 } }}
            >
              <Link
                href={item.href}
                className="text-lg text-white hover:text-amber-600 transition-all duration-300"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
