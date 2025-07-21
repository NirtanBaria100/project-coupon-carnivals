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
            <Schema data={FirstSchema} />
            {/* <!-- 2. WebSite + Organization + SearchAction Schema --> */}
            <Schema data={SecondSchema} />
            {/* <!-- 3. SiteNavigationElement – Trending Menu (Home, Categories, Stores, Blogs) --> */}
            <Schema data={ThirdSchema} />
            {/* <!-- 4. SiteNavigationElement – Main Categories (Travel, Electronics, etc.) --> */}
            <Schema data={FourthSchema} />
            {/* Footer */}
           <Footer/>
        </div>
    );
}
