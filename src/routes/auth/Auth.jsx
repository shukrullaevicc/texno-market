import { Outlet } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center relative'>
      <div className="animated-bg absolute top-0 left-0 w-full h-full z-0"></div>

      <div className='max-w-[350px] w-full p-7 shadow-cm relative z-10 bg-white rounded-lg'>
        <Outlet />
      </div>
    </div>
  )
}

export default Auth;
