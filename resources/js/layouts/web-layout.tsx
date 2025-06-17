// components/Layout.tsx
import { ReactNode } from 'react';

export default function WebLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            {/* Top Header */}
            <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
                <div className="text-xl font-bold">logo</div>
                <nav className="flex items-center gap-6">
                    <a href="#" className="text-sm font-medium">SIGN IN</a>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-1.5 rounded-md border border-gray-300"
                    />
                </nav>
            </header>

            {/* Categories */}
            <div className="bg-white text-center py-3 font-semibold text-lg tracking-widest border-y border-dotted">
                C a t e g o r i e s
            </div>

            {/* Main content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-white border-t mt-10">
                <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
                    <div>
                        <div className="font-bold mb-2">logo</div>
                        <p className="text-sm text-gray-600">Descriptions</p>
                        <div className="flex gap-2 mt-2">social icons</div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Amazing Discounts</h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                            <li><a href="#">Link 1</a></li>
                            <li><a href="#">Link 2</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Information</h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                            <li><a href="#">Link 3</a></li>
                            <li><a href="#">Link 4</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">More From Us</h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                            <li><a href="#">Link 5</a></li>
                            <li><a href="#">Link 6</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-xs text-gray-500 pb-4 px-4">
                    © 2025 YourCompany — All rights reserved.
                </div>
            </footer>
        </div>
    );
}
