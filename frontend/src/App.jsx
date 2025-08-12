// import Login from './components/Login';
import Signup from "./components/Signup";
// import VerifyOtp from './components/VerifyOtp';
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Loader from "./components/common/Loader";
import VerifyOtp from "./components/VerifyOtp";
import Login from "./components/Login";
import Home from "./components/pages/Home";
import AuthHoc from "./components/common/AuthHoc";
function App() {

  let ProtectedHome=AuthHoc(Home);
  return (
    <>
      <Loader />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="signup" element={<Signup />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<ProtectedHome/>} />
          {/* <Route path="verify-otp" element={<VerifyOtp />} /> */}
          {/* <Route index element={<Login />} /> */}
        </Route>
      </Routes>
    </>
  );
}
export default App;
