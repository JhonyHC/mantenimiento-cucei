import './bootstrap';
import '../css/app.css';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { createTheme, MantineProvider } from '@mantine/core';
import AppLayout from './Layouts/AppLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function Mantine({ children }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    let page = pages[`./Pages/${name}.jsx`];
    console.log(page, name);
    page.default.layout =
      page.default.layout ||
      (page => (
        <Mantine>
          {name.startsWith('Landing/') || name.startsWith('Auth/') ? (
            page
          ) : (
            <AppLayout>{page}</AppLayout>
          )}
        </Mantine>
      ));

    return page;
    // resolvePageComponent(
    //     `./Pages/${name}.jsx`,
    //     import.meta.glob("./Pages/**/*.jsx")
    // );
  },
  setup({ el, App, props }) {
    console.log({ el, App, props });
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});
