import { Outlet } from "react-router-dom";                       //place where child/nested route are rendered

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Outlet />                                                          
    </div>
  );
};

export default AuthLayout;