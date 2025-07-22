import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { useEffect } from 'react';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
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
        <AuthLayoutTemplate title={title} description={description} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
