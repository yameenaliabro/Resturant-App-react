import { Outlet, Route, Routes } from "react-router-dom";
import AdminHome from "../AdminHome"
import AdminHeader from "../AdmiCommanpage/adminheaders/AdminHeader";
import AdminAdd from "../AdmiCommanpage/adminproduct/AdminProducts"
function AdminRoute(){
return(
    <div>
        <Routes>
            <Route path="/" element={<AdminHeader/>}>
                <Route index element={<AdminHome/>} />
                <Route path="add/product" element={<AdminAdd/>}/>
            </Route>
        </Routes>
        <Outlet/>
    </div>  
)
}
export default AdminRoute;