import { lazy } from "react";

const Services = lazy(() => import("./components/Services"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const DashboardAdmin = lazy(() => import("./Pages/DashboardAdmins"));
const Login = lazy(() => import("./components/Login"));
const Catalog = lazy(() => import("./Pages/Catalog"));

const routes = [
    { path: '/', element: <Dashboard /> },
    { path: '/admin', element: <DashboardAdmin /> },
    { path: '/auth', element: <Login /> },
    { path: '/catalog', element: <Catalog /> },
    { path: '/services', element: <Services /> }
]

export default routes;