import "./App.css";
import Landing from "./screens/Landing";
import SignIn from "./screens/SignIn";
import Profile from "./screens/Profile";
import Listing from "./screens/Listings";
import CreateAccount from "./screens/CreateAccount";
import Search from "./screens/Search";
import Sell from "./screens/Sell";
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
    {
      path: "/create-account",
      element: <CreateAccount />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/listing/",
      element: <Listing />,
    },
    {
      path: "/sell",
      element: <Sell />,
    },
    {
      path: "*",
      element: <div>404 - Page Not Found</div>,
    },
  ]);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
