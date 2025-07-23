// components/Layout.tsx
import { ReactNode } from 'react';
import Header from './web/header';
import Footer from './web/footer';
import { Toaster } from 'react-hot-toast';
import { Schema } from '@/components/Schema';

export default function WebLayout({ children , FirstSchema , SecondSchema , ThirdSchema , FourthSchema }: { children: ReactNode , FirstSchema: object | "", SecondSchema:object | "", ThirdSchema:object | "", FourthSchema:object| "" }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            
            <Header/>
            <Toaster position="top-right" />
            {/* Main content */}
            <main className="flex-1">{children}</main>
            {FirstSchema && (
              <Schema data={FirstSchema} />
            )}
            {SecondSchema && (
            <Schema data={SecondSchema} />
            )}
            {ThirdSchema && (
            <Schema data={ThirdSchema} />
            )}
            {FourthSchema && (
            <Schema data={FourthSchema} />
            )}
            {/* Footer */}
           <Footer/>
        </div>
    );
}
