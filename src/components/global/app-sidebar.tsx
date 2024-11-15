'use client';

import React, { useState } from 'react';
import {
  ChevronUp,
  User2,
  ChevronRight,
  LucideIcon,
  MessageSquare,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { siteConfig } from '@/config/site';
import { ScrollArea } from '../ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';

interface ISubItems {
  title: string;
  url: string;
  icon?: LucideIcon;
  description?: string;
}

interface IRecentChat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

// Mock data for recent chats
const recentChats: IRecentChat[] = [
  {
    id: '1',
    title: 'Project Discussion',
    lastMessage: "Let's schedule a call",
    timestamp: '2h ago',
  },
  {
    id: '2',
    title: 'Client Meeting',
    lastMessage: 'Presentation looks great',
    timestamp: '1d ago',
  },
  {
    id: '3',
    title: 'Team Sync',
    lastMessage: 'Updates on the new feature',
    timestamp: '3d ago',
  },
];

const AppSidebar = () => {
  const path = usePathname();
  console.log({ path });
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Sidebar
      collapsible={isCollapsed ? 'icon' : 'offcanvas'}
      className={`bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <SidebarHeader className='flex-row h-10 items-center justify-between'>
        <SidebarTrigger onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight /> : <ChevronUp />}
        </SidebarTrigger>
      </SidebarHeader>

      <ScrollArea className='h-full'>
        <SidebarContent>
          <SidebarGroup className='overflow-hidden'>
            <SidebarGroupLabel>{!isCollapsed && 'Dashboard'}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {siteConfig().SidebarNav.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    {item.items ? (
                      <Accordion type='single' collapsible className='w-full'>
                        <AccordionItem
                          value={item.title}
                          className='border-b-0'
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AccordionTrigger
                                className={cn(
                                  'hover:bg-muted dark:hover:bg-muted flex h-10 items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:no-underline',
                                  path.includes(item.url)
                                    ? 'bg-neutral-200 dark:bg-gray-500'
                                    : 'transparent'
                                )}
                              >
                                <div className='flex items-center gap-2'>
                                  <item.icon className='size-5  shrink-0' />
                                  {!isCollapsed && <span>{item.title}</span>}
                                </div>
                              </AccordionTrigger>
                            </TooltipTrigger>
                            {isCollapsed && (
                              <TooltipContent side='right'>
                                {item.title}
                              </TooltipContent>
                            )}
                          </Tooltip>
                          <AccordionContent className='flex flex-col gap-2 px-6 py-1.5 pb-0'>
                            {!isCollapsed &&
                              item.items.map((subItem: ISubItems) => (
                                <Link
                                  key={subItem.url}
                                  href={subItem.url}
                                  className={cn(
                                    'hover:bg-muted border-l-muted-foreground dark:hover:bg-muted flex h-10 items-center gap-2 border-l px-2 py-1.5 text-sm',
                                    path.includes(subItem.url)
                                      ? 'bg-muted dark:bg-muted'
                                      : 'transparent'
                                  )}
                                  onClick={() => {
                                    if (setIsCollapsed) setIsCollapsed(false);
                                  }}
                                >
                                  {subItem.icon && (
                                    <subItem.icon className='size-4 shrink-0' />
                                  )}
                                  <span>{subItem.title}</span>
                                </Link>
                              ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton className='h-10' asChild>
                              <a
                                href={item.url}
                                className='flex items-center gap-3'
                              >
                                <item.icon className='size-5' />
                                {!isCollapsed && <span>{item.title}</span>}
                              </a>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          {isCollapsed && (
                            <TooltipContent side='right'>
                              <p>{item.title}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <Separator />
          {/* Recent Chats Section */}
          <SidebarGroup className='overflow-hidden'>
            <SidebarGroupLabel>
              {!isCollapsed && 'Recent Chats'}
            </SidebarGroupLabel>

            {/* Fixed height for recent chats */}
            <SidebarGroupContent>
              <SidebarMenu>
                {recentChats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton className='h-10' asChild>
                            <Link
                              href={`/chat/${chat.id}`}
                              className='flex items-center gap-3'
                            >
                              <MessageSquare className='size-5 shrink-0' />
                              {!isCollapsed && (
                                <div className='flex flex-col overflow-hidden'>
                                  <span className='truncate'>{chat.title}</span>
                                  <span className='text-xs text-muted-foreground truncate'>
                                    {chat.lastMessage}
                                  </span>
                                </div>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent side='right'>
                            <p>{chat.title}</p>
                            <p className='text-xs text-muted-foreground'>
                              {chat.lastMessage}
                            </p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>

      <SidebarFooter className='border-t'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton className='h-10'>
                        <User2 className='size-5' />
                        {!isCollapsed && <span>Username</span>}
                        {!isCollapsed && <ChevronUp className='ml-auto' />}
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side='right'>
                      <p>User menu</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent side='top' align='start' className='w-56'>
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
