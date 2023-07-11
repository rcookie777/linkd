import SignIn from "../pages/Authentication/SignIn";

const SignInBox = () => {
  
  return (
    <>
      {/* Input Fields */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Sign In with GitHub
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5 chat-messages-container">
        </div>
        <div className="flex p-6.5">
         
        </div>
      </div>
    </>
  );
};


export default SignInBox;
