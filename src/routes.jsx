import { lazy } from "react";

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const DashboardAdmin = lazy(() => import("./Pages/DashboardAdmins"));
const Login = lazy(() => import("./components/Login"));
const CarListing = lazy(() => import("./components/Catalog"));

const routes = [
    { path: '/', element: <Dashboard /> },
    { path: '/admin', element: <DashboardAdmin /> },
    { path: '/auth', element: <Login /> },
    { path: '/catalog', element: <CarListing /> }
]

export default routes;