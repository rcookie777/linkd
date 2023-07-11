
import { loginWithGithub, getUserData } from "../common/Github";
import { AuthContext } from "../App";
import { useContext} from "react";
  
const ProfileCard = () => {
    const { code , access_token } = useContext(AuthContext);

    return (
      <div className="w-full h-full bg-white shadow-default dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Profile Card
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
            {!code ? ( 
                <button className="flex items-center gap-2.5" onClick={loginWithGithub}>
                Log In with Github
                </button>
                ) : (
                <div> Code: {code} & Access: {access_token} 
                </div>
                )}
        </div>
        {/* Rest of the content */}
      </div>
    );
  };

  export default ProfileCard;
  
