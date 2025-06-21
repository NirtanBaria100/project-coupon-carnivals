// resources/js/Layouts/AppLayout.jsx
import React from 'react';
import Header from '@/components/Header'; // Ensure correct path
import Footer from '@/components/Footer'; // Ensure correct path

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
