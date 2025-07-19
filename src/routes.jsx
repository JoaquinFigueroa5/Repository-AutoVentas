import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const DashboardAdmin = lazy(() => import("./Pages/DashboardAdmins"));
const Login = lazy(() => import("./components/Login"));

const routes = [
    { path: '/', element: <Dashboard /> },
    { path: '/admin', element: <DashboardAdmin /> },
    { path: '/auth', element: <Login /> }
]

export default routes;