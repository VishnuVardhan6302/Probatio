import { BrowserRouter,Routes,Route } from "react-router-dom"

import ProbationDashboard from "./components/ProbationDashboard"

import ProbationDetails from "./components/ProbationDetails"
import DomainWiseProbation from "./components/DomainWiseProbation"
import Documents from "./components/Documents"
import Dashboard from "./components/Dashboard"

import UploadDocument from "./components/UploadDocuments"
import Domain from "./components/Domain"
import Login from "./components/Login"
import Reports from "./components/Reports"
import UserManagement from "./components/UserManagement"

import EmployeeList from "./components/Employees/EmployeeList";
import AddEmployee from "./components/Employees/AddEmployee";
import EmployeeDetails from "./components/Employees/EmployeeDetails";
import EditEmployee from "./components/Employees/EditEmployee";
import FormerEmployees from "./components/Employees/FormerEmployees";

const App=()=>
<>
<BrowserRouter>

    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>

      <Route path="/domains" element={<Domain/>}/>
      <Route path="/probation-dashboard" element={<ProbationDashboard/>}/>
      <Route path="/probation/:employeeId" element={<ProbationDetails/>}/>
      <Route path="/probation/domain" element={<DomainWiseProbation />} />
      <Route path="/documents" element={<Documents/>}/>
      <Route path="/upload-documents" element={<UploadDocument/>}/>
      <Route path="/reports" element={<Reports/>}/>
      <Route path="/user-management" element={<UserManagement/>}/>

        <Route path="/employees/:id" element={<EmployeeDetails />} />
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/employees/add" element={<AddEmployee />} />
      <Route path="/employees/:id/edit" element={<EditEmployee />} />
      <Route path="/former-employees" element={<FormerEmployees />} />
    </Routes>
</BrowserRouter>
</>


export default App