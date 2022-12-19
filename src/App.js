import {Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TablePage from "./pages/TablePage";
import CreateMenuItem from "./pages/CreateMenuItem";
import TablesPage from "./pages/TablesPage";
import MenuItemsPage from "./pages/MenuItemsPage";
import CreateTable from "./pages/CreateTable";

function App() {
    return (
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/admin" exact element={<LoginPage/>}/>
                <Route path="/menuItems" exact element={<MenuItemsPage/>}/>
                <Route path="/tables" exact element={<TablesPage/>}/>
                <Route path="/newMenuItem" exact element={<CreateMenuItem/>}/>
                <Route path="/newTable" exact element={<CreateTable/>}/>
                <Route path="/table/:id" element={<TablePage/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
    );
}

export default App;
