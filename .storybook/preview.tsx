import type { Preview } from '@storybook/react-vite'
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { MemoryRouter } from "react-router-dom"
import { DatesProvider } from "@mantine/dates";
import { Provider as ProviderRedux } from 'react-redux';
import { store } from '../src/shared/services/store';
import { PlatformProvider, AuthProvider, WindowProvider, DrawerProvider } from "../src/features/core/providers"
import { theme } from '../src/shared/utils/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {  DeliveryOrderWorkshopForm, AmountOrderWorkshopForm, MeasurementOrderWorkshopForm, WorkerOrderWorkshopForm, FittingForm} from '../src/features/workshop/components/form/';

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

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <PlatformProvider>
          <MantineProvider theme={theme}>
            <WindowProvider>
              <DrawerProvider>
                <DatesProvider settings={{ locale: "fr" }}>
                  <ProviderRedux store={store}>
                    <QueryClientProvider client={queryClient}>
                      <Notifications position="top-right" />
                      <AuthProvider>
                        <Story />
                        <DeliveryOrderWorkshopForm />
                        <AmountOrderWorkshopForm />
                        <MeasurementOrderWorkshopForm />
                        <WorkerOrderWorkshopForm />
                        <FittingForm />
                      </AuthProvider>
                    </QueryClientProvider>
                  </ProviderRedux>
                </DatesProvider>
              </DrawerProvider>
            </WindowProvider>
          </MantineProvider>
        </PlatformProvider>
      </MemoryRouter>
    ),
  ],
};

export default preview;