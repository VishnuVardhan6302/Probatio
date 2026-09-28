import { BrowserRouter,Routes,Route } from "react-router-dom"

import NavSection from "./components/NavSection"
import ProbationDashboard from "./components/ProbationDashboard"


const App=()=>
<>
<BrowserRouter>
    <Routes>
      <Route path="/" element={<NavSection/>}/>
      <Route path="/probation-dashboard" element={<ProbationDashboard/>}/>
    </Routes>
</BrowserRouter>
</>


export default App