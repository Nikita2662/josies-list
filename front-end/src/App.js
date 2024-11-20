import "./App.css";
import Landing from "./screens/Landing";
import SignIn from "./screens/SignIn";
import Profile from "./screens/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
