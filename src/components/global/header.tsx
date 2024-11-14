'use client';

import { PanelLeft, SquarePen } from 'lucide-react';
import { Button } from '../ui/button';
import MobileSidebar from './mobile-sidebar';
import { useState } from 'react';

const SiteHeader = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className='bg-background/90 duration-slow animate-in fade-in slide-in-from-top-full sticky top-0 z-40 mb-2
        flex h-12 w-full items-center justify-between
        border-b-2 px-2.5 backdrop-blur-md'
      >
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleMobileSidebar}
          className='md:hidden h-10 w-10'
        >
          <PanelLeft className='h-5 w-5' />
          <span className='sr-only'>Toggle Sidebar</span>
        </Button>
        <div className='flex justify-center w-full'>Internal Alchemy</div>
        <nav className='flex flex-1 items-center justify- space-x-2'>
          <Button
            //   onClick={handleAddNewChat}
            variant='ghost'
            size='icon'
            className='h-7 w-7'
          >
            <SquarePen className='size-4' />
            <span className='sr-only'>Add new chat</span>
          </Button>
        </nav>
      </header>
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
    </>
  );
};

export default SiteHeader;
