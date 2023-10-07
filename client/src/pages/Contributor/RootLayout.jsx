import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ProfileContext from "../../store/ProfileContext";
import { useContext, useState } from "react";

export function RootLayout() {

    const ctx = useContext(ProfileContext);
    const [isProfileCreated, setIsProfileCreated] = useState(ctx.isProfileCreated);

    return (
        <ProfileContext.Provider value={{
            isProfileCreated: isProfileCreated,
            setIsProfileCreated: setIsProfileCreated,
        }}>
            <Navbar/>
            <Sidebar/>
            <Outlet/>
        </ProfileContext.Provider>
    );
}