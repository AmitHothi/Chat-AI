import AppSidebar from '@/components/global/app-sidebar';
import SiteHeader from '@/components/global/header';
import { SidebarProvider } from '@/components/ui/sidebar';

interface OrgLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: OrgLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full overflow-hidden flex flex-col min-h-screen'>
        <div className='md:hidden inline'>
          <SiteHeader />
        </div>
        <div className='flex-grow flex-col flex items-center justify-center p-4'>
          <div className="text-base font-medium w-full">Chatgpt</div>
          <div className='h-full w-full flex items-center justify-center'>{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
