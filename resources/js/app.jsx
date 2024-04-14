import './bootstrap';
import '../css/app.css';
import "@mantine/core/styles.css";


import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { createTheme, MantineProvider } from "@mantine/core";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const theme = createTheme({
    /** Put your mantine theme override here */
});

function DefaultLayout({children}) {
    return (
        <MantineProvider theme={theme}>
            {children}
        </MantineProvider>
    )
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx")
        let page = pages[`./Pages/${name}.jsx`];

        page.default.layout = (page) => <DefaultLayout children={page} />;
        return page
        // resolvePageComponent(
        //     `./Pages/${name}.jsx`,
        //     import.meta.glob("./Pages/**/*.jsx")
        // );
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
