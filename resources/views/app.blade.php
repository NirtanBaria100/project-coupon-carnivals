<!DOCTYPE html>
<html  lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="p:domain_verify" content="37dc9c4b62183b8da7e0e261ad07643c"/>
        <meta name=impact-site-verification value='f41e4ec9-ef72-495f-8c83-518bba3625f7'>
        

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

  
        <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
       

    </head>
    <body class="font-sans antialiased">
        @inertia
         <script>
                document.querySelectorAll('[inertia]').forEach(el => {
             el.removeAttribute('inertia');});
        </script>
    </body>
</html>
