// components/Layout.tsx
import { ReactNode } from 'react';
import Header from './web/header';
import Footer from './web/footer';

export default function WebLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <Header/>
            {/* Main content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
           <Footer/>
        </div>
    );
}
