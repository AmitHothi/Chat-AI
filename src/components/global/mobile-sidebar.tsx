'use client';

import React from 'react';
import { MessageSquare, User2 } from 'lucide-react';
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface ISubItems {
  title: string;
  url: string;
  icon?: React.ElementType;
  description?: string;
}

interface IRecentChat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
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

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const path = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side='left' className='p-0 w-4/5 max-w-sm flex flex-col'>
        <SheetHeader className='px-4 py-2 border-b'>
          <SheetTitle className='text-sm text-left font-medium'>
            Sidebar Menu
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className='h-full'>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>

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
                            <AccordionTrigger
                              className={cn(
                                'hover:bg-muted dark:hover:bg-muted flex h-10 items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:no-underline',
                                path.includes(item.url)
                                  ? 'bg-neutral-200 dark:bg-gray-500'
                                  : 'transparent'
                              )}
                            >
                              <div className='flex items-center gap-2'>
                                {item.icon && (
                                  <item.icon className='h-5 w-5 shrink-0' />
                                )}
                                <span>{item.title}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className='flex flex-col gap-2 px-4 py-1.5 pb-0'>
                              {item.items.map((subItem: ISubItems) => (
                                <Link
                                  key={subItem.url}
                                  href={subItem.url}
                                  className={cn(
                                    'hover:bg-muted border-l-muted-foreground dark:hover:bg-muted flex h-10 items-center gap-2 border-l px-2 py-1.5 text-sm',
                                    path.includes(subItem.url)
                                      ? 'bg-muted dark:bg-muted'
                                      : 'transparent'
                                  )}
                                  onClick={onClose}
                                >
                                  {subItem.icon && (
                                    <subItem.icon className='h-4 w-4 shrink-0' />
                                  )}
                                  <span>{subItem.title}</span>
                                </Link>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <SidebarMenuButton className='h-10' asChild>
                          <Link
                            href={item.url}
                            className='flex items-center gap-3'
                            onClick={onClose}
                          >
                            {item.icon && <item.icon className='h-5 w-5' />}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <Separator />
            <SidebarGroup>
              <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {recentChats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton className='h-10' asChild>
                        <Link
                          href={`/chat/${chat.id}`}
                          className='flex items-center gap-3'
                          onClick={onClose}
                        >
                          <MessageSquare className='h-5 w-5 shrink-0' />
                          <div className='flex flex-col overflow-hidden'>
                            <span className='truncate'>{chat.title}</span>
                            <span className='text-xs text-muted-foreground truncate'>
                              {chat.lastMessage}
                            </span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
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
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className='h-10'>
                    <User2 className='h-5 w-5' />
                    <span>Username</span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='top' align='start' className='w-56'>
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onClose}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SheetContent>
    </Sheet>
  );
};
export default MobileSidebar;
