import Home from "./pages/Home";
import User from "./pages/User";
import Booking from "./pages/Booking";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Students from "./pages/Students";
export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/newuser' element={<User />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/students' element={<Students />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}