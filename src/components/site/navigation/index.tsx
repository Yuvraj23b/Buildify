'use client'
import { User } from '@clerk/nextjs/server'
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/global/mode-toggle'

type Props = {
    user?: null | User
}

const Navigation = ({ user }: Props) => {
  const scrollToBottom = (e: React.MouseEvent) => {
    e.preventDefault();  // Prevent the default anchor link behavior
    window.scrollTo({
      top: document.body.scrollHeight,  // Scroll to the bottom of the page
      behavior: 'smooth'  // Smooth scrolling
    });
  };

  return (
    <div className='fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-10' suppressHydrationWarning>
      {/* Left side of the navigation bar */}
      <aside className='flex items-center gap-2'>
        <Image 
          src={'./assets/buildify-logo.svg'}
          width={50}
          height={50} 
          alt='buildify logo'/>
        <span className='text-xl font-bold'>Buildify.</span>
      </aside>
      
      <nav className='hidden md:block absolute left-[50%] top-[50%] transfrom translate-x-[-50%] translate-y-[-50%]'>
        <ul className="flex items-center justify-center gap-8">
          {/* Add the scroll-to-bottom handler on the Pricing link */}
          <a href="#" id="pricing-link" onClick={scrollToBottom}>Pricing</a>
          {/* <a href="#">About</a>
          <a href="#">Documentation</a>
          <a href="#">Feature</a> */}         {/** Work in progress ! */}
        </ul>
      </nav>

      {/* Right side of the navigation bar */}
      <aside className='flex gap-2 items-center'>
        <a href="/agency" className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80">
          Login  
        </a>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
}

export default Navigation;
