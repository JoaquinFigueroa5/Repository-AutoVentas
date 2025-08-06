import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Services = lazy(() => import("./components/Services"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const DashboardAdmin = lazy(() => import("./Pages/DashboardAdmins"));
const Login = lazy(() => import("./components/Login"));
const Catalog = lazy(() => import("./Pages/Catalog"));
const UnauthorizedModal = lazy(() => import("./components/UnauthorizedModal"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

const routes = [
    { path: '/', element: <Dashboard /> },
    { path: '/unauthorized', element: <UnauthorizedModal /> },
    { path: '/auth', element: <Login /> },
    { path: '/catalog', element: <Catalog /> },
    { path: '/services', element: <Services /> },
    {
        path: '/admin/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE']} />,
        children: [
            { path: '', element: <DashboardAdmin /> }
        ]
    },
    { path: '*', element: <Navigate to="/" replace /> }]

export default routes;