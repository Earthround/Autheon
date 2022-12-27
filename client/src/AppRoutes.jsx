import { Route, Routes} from "react-router-dom";
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Layout from './pages/Layout';
import Discover from './pages/Discover';
import NoPage from './pages/NoPage';
import ForgotPassword from "./authentication/ForgotPassword";
import Settings from "./account/Settings";
import Fanmail from "./pages/Fanmail";
import CreateLetter from "./pages/CreateLetter";


export default function AppRoutes() {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            
            <Route element={<Layout />}>

                
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<NoPage />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/fanmail" element={<Fanmail />} />
                <Route path="/fanmail/create" element={<CreateLetter />} />

            </Route>
        </Routes>
    )
}