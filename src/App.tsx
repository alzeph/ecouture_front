import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { DatesProvider } from "@mantine/dates";
import { Provider as ProviderRedux } from 'react-redux';
import { store } from '@shared/services/store';
import { AuthProvider, DrawerProvider, WindowProvider } from "@features/core/providers"
import { theme } from '@shared/utils/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth, usePlatform } from "@features/core/hook";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "@shared/constants";
import { Suspense } from "react";
import { AmountOrderWorkshopForm, DeliveryOrderWorkshopForm, FittingForm, MeasurementOrderWorkshopForm, OrderWorshoForm, WorkerOrderWorkshopForm, WorkshopCreateForm } from "@features/workshop/components/form";
import { LoginForm, UserForm } from "@features/users/components/form";
import { CustomerPage, DashboardPage, DiaryPage, HomePage, WorkerPage, WorkshopSettingPage } from "./pages";
import { Dashboard } from "@shared/components";

const queryClient = new QueryClient();


const AppRoute = ({ routeDashboard }: { routeDashboard: '/' | "/dashboard" }) => {
    return (
        <Routes>
            {routeDashboard === '/dashboard' && <Route path="/" element={<HomePage/>} />}
            <Route path={routeDashboard} element={<Dashboard/>}>
                <Route index element={<DashboardPage/>} />
                <Route path={ROUTES.CLIENTS.LIST} element={<CustomerPage/>} />
                <Route path={ROUTES.WORKERS.LIST} element={<WorkerPage/>} />
                <Route path={ROUTES.AGENDA} element={<DiaryPage/>} />
                {/* <Route path={ROUTES.MERCERIE} element={<></>} /> */}
                <Route path={ROUTES.SETTINGS} element={<WorkshopSettingPage/>} />
                {/* <Route path={ROUTES.PROFILE} element={<></>} /> */}
            </Route>
        </Routes>
    )
}


export default function App() {
    const { isWeb } = usePlatform()
    const { loading } = useAuth()

    return (
        <DatesProvider settings={{ locale: "fr" }}>
            <ProviderRedux store={store}>
                <QueryClientProvider client={queryClient}>
                    <MantineProvider theme={theme}>
                        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 4, bg: "secondary.4", opacity: 0.7, }} />
                        <Suspense fallback={<LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 4, bg: "secondary.4", opacity: 0.7, }} />}>
                            <WindowProvider>
                                <DrawerProvider>
                                    <Notifications position="bottom-right" />
                                    <AuthProvider>
                                        {isWeb
                                            ? (<BrowserRouter><AppRoute routeDashboard="/dashboard" /></BrowserRouter>)
                                            : (<HashRouter><AppRoute routeDashboard="/" /></HashRouter>)
                                        }
                                        <LoginForm />
                                        <UserForm />
                                        <AmountOrderWorkshopForm />
                                        <DeliveryOrderWorkshopForm />
                                        <FittingForm />
                                        <MeasurementOrderWorkshopForm />
                                        <OrderWorshoForm />
                                        <WorkerOrderWorkshopForm />
                                        <WorkshopCreateForm />
                                    </AuthProvider>
                                </DrawerProvider>
                            </WindowProvider>
                        </Suspense>
                    </MantineProvider>
                </QueryClientProvider>
            </ProviderRedux>
        </DatesProvider>
    )
}