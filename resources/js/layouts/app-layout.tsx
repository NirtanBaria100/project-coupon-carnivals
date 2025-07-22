import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { useEffect, type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) =>{

    useEffect(() => {
        <meta name="robots" content="noindex, nofollow"></meta>
    
        const NoIndexTag = document.createElement('meta');
        NoIndexTag.name = 'robots';
        NoIndexTag.content = 'noindex, nofollow';
        document.head.appendChild(NoIndexTag);
    
        
        
        // Optional cleanup on unmount
        return () => {
          document.head.removeChild(NoIndexTag);
        };
      }, []);
    return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <Toaster position="top-right" />
        <div className="m-7">{children}</div>
    </AppLayoutTemplate>
    // <>{children}</>
);

        }