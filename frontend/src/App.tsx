import { createContext, Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import { Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';
import { getAccessTokenFromCode, getUserData } from './common/Github';

export const AuthContext = createContext({
  code: null,
  setCode: () => { },
  access_token: null,
  setAccessToken: () => { },
  user_data: null,
  setUserData: () => { }
});

Amplify.configure(awsmobile);

const Settings = lazy(() => import('./pages/Settings'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const Main = lazy(() => import('./pages/Main'));
const UserProfile = lazy(() => import('./pages/UserPage'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [code, setCode] = useState<string | null>(null);
  const [access_token, setAccessToken] = useState<string | null>(null);
  const [user_data, setUserData] = useState<string | null>(null);

  const navigate = useNavigate();

  async function GetToken(code: string) {
    const token = await getAccessTokenFromCode(code);
    setAccessToken(token);
  }

  async function GetUserData(access_token: string) {
    const user_data = await getUserData(access_token)
    console.log("user_data in app", user_data)
    setUserData(user_data)
  }

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setCode(newUrl[1]);
      GetToken(newUrl[1]);
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (access_token) {
      GetUserData(access_token);
    }
  }, [access_token]);

  useEffect(() => {
    if (user_data) {
      // Redirect to user profile page if the user is logged in
      navigate(`/${user_data.login}`);
    }
  }, [user_data, navigate]);


  return loading ? (
    <Loader />
  ) : (
    <>
      <AuthContext.Provider value={{ code, setCode, access_token, setAccessToken, user_data, setUserData }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Main />} />
              <Route
                path="/settings"
                element={
                  <Suspense fallback={<Loader />}>
                    <Settings />
                  </Suspense>
                }
              />
              <Route path="/:userId" element={<UserProfile />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthContext.Provider>

    </>
  );
}

export default App;
