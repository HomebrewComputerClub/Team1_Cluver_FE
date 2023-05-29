import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../../pages/main/Main";
import Login from "../../pages/login/Login";
import Admin from "../../pages/login/Admin";
import Attendance from "../../pages/attendance/Attendance";
import CheckCode from "../../pages/login/CheckCode";
import Delete from "../../pages/login/Delete";
import Signup from "../../pages/login/Signup";
import AddClub from "../../pages/login/AddClub";
import EditClub from "../../pages/login/EditClub";
import PrivateRoute from "./PrivateRouter";
import CheckAttendance from "../../pages/login/CheckAttendance";
import Anonymous from "../../pages/anonymous/Anonymous";
import Menu from "./../../pages/menu/Menu";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* 로그인 여부 상관X */}
        <Route index path="/" element={<Main />} />
        <Route index path="/attendance/:clubID" element={<Attendance />} />
        <Route index path="/anonymous/:clubID" element={<Anonymous />} />
        <Route index path="/menu" element={<Menu />} />

        {/* 로그아웃 시 접속 가능한 페이지 */}
        <Route element={<PrivateRoute authentication={false} />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* 로그인 시 접속 가능한 페이지 */}
        <Route element={<PrivateRoute authentication={true} />}>
          <Route path="/editclub" element={<EditClub />} />
          <Route path="/addclub" element={<AddClub />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/checkcode" element={<CheckCode />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/checkattendance" element={<CheckAttendance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
