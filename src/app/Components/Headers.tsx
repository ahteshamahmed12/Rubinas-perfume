'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CircleUser, Menu, Search, ShoppingCart, Heart } from 'lucide-react';

const CartIndicator = dynamic(() => import('./CartIndicator'), { ssr: false });

const UserMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button
        aria-label="Account menu"
        className="hover:text-[#db4444] p-2 focus:outline-none focus:ring-2 focus:ring-[#db4444] rounded"
      >
        <CircleUser className="w-5 h-5" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-white text-black font-medium ">
      <DropdownMenuItem asChild>
        <Link href="/Signup">Login</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/Register">Register</Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const Headers = () => {
  return (
    <header className="w-full shadow-md bg-black text-gray-300 mt-2" role="banner">
      {/* Mobile Header */}
      <div className="lg:hidden w-full py-2">
        <div className="flex items-center justify-between ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Open main menu"
                className="hover:text-[#db4444] p-2 focus:outline-none focus:ring-2 focus:ring-[#db4444] rounded"
              >
                <Menu className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black font-medium z-50">
              <DropdownMenuItem asChild><Link href="/">Home</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/Shop">Shop</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/AboutUs">About Us</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/ContactUs">Contact Us</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <h1 className="text-sm font-bold whitespace-nowrap select-none">
            RUBINA&apos;S FRAGRANCE
          </h1>


          <div className="flex items-center space-x-2 md:space-x-6">
            <Link href="/Shop" aria-label="Search" className="hover:text-[#db4444]">
              <Search className="w-5 h-5" />
            </Link>
             
            

            <Link href="/cart" aria-label="Cart" className="relative hover:text-[#db4444]">
              <ShoppingCart className="w-5 h-5" />
              <div
                aria-live="polite"
                className="absolute -top-1 -right-2 w-4 h-4 bg-[#db4444] text-black text-[10px] font-bold flex items-center justify-center rounded-full pointer-events-none"
              >
                <CartIndicator />
              </div>
            </Link>

            <UserMenu />
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between px-10 py-4">
        <h1 className="text-xl font-bold select-none"> RUBINA&apos;S FRAGRANCE</h1>

        <nav aria-label="Main navigation" className="flex gap-8 font-medium">
          <Link href="/" className="hover:text-[#db4444]">Home</Link>
          <Link href="/Shop" className="hover:text-[#db4444]">Shop</Link>
          <Link href="/AboutUs" className="hover:text-[#db4444]">About Us</Link>
          <Link href="/ContactUs" className="hover:text-[#db4444]">Contact Us</Link>
        </nav>

        <div className="flex items-center gap-6">
          

          <Link href={"/Shop"} aria-label='Shop' className='relative hover:text-[#db4444] '>
          <Search/>
          </Link>

          <Link href="/cart" aria-label="Cart" className="relative hover:text-[#db4444]">
            <ShoppingCart className="w-5 h-5" />
            <span
              aria-live="polite"
              className="absolute -top-1 -right-2 w-4 h-4 bg-[#db4444] text-black text-[10px] font-bold flex items-center justify-center rounded-full pointer-events-none"
            >
              <CartIndicator />
            </span>
          </Link>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Headers;
