import { Link , NavLink } from 'react-router-dom';
import Logo from '../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownUser from './DropdownUser';
import useUserStatus from '../hooks/useUserStatus';
import { AuthContext } from '../App';
import { useContext } from 'react';

const Header = () => {;

  const {access_token,user_data} = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="hidden sm:block">
        {/* { ? ( <div className="relative">
              <NavLink className='font-medium text-bodydark2 px-2 duration-300 ease-in-out hover:text-black' to='/auth/signup'>
                Sign up
                </NavLink>
                <NavLink className='font-medium text-bodydark2 px-2 duration-300 ease-in-out hover:text-black' to='/auth/signin'>
                Sign In
                </NavLink>
            </div>) : (<div></div>)} */}
        </div>
        
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}
          </ul>
          {/* <!-- User Area --> */}
          {!access_token ? (<div></div>) : (<DropdownUser />)}
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
