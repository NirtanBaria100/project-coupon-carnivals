import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { useEffect } from 'react';
import CookieBanner from './components/CookieBanner';

const appName = 'Promo Carnivals - Find Exclusive Coupons and Discounts';
const desc = 'Explore top deals & discounts on fashion, tech, beauty & more at PromoCarnivals. Shop smart, save big—new promos added daily!'

createInertiaApp({
    title: (title) => '',
    description: (description)=> "",
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <CookieBanner/>
            </>
    );
    },
    progress: {
        color: '#4B5563',
    },
});


// This will set light / dark mode on load...
initializeTheme();
