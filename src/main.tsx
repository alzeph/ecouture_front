import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/urbanist/index.css'
import '@fontsource/work-sans/index.css'

import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import '@mantine/carousel/styles.css'
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css"
import "@mantine/spotlight/styles.css"
import "@mantine/tiptap/styles.css";
import 'mantine-datatable/styles.layer.css';
import { PlatformProvider } from '@features/core/providers';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlatformProvider>
      <App />
    </PlatformProvider>
  </StrictMode>,
)
