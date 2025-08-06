import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(!user){
        console.log(user);
        
        return <Navigate to='/unauthorized' replace/>;
    }

    if(!allowedRoles.includes(user.role)){
        return <Navigate to='/unauthorized' replace />
    }

    return <Outlet />
}

export default PrivateRoute;