
import { Link } from "react-router-dom";
import {
  NavbarContainer,
  Logo,
  NavMenu,
  NavItem,
  Hr,
 
} from "./styledComponents";

const NavSection = ()=>(
    <NavbarContainer>
      <Logo>Hirenest</Logo>
      <Hr/>

      <NavMenu>
         <NavItem as={Link} to="/dashboard">
         Dashboard
        </NavItem>
        <NavItem as={Link} to="/employees">
         Employees
        </NavItem>
        <NavItem as={Link} to="/domains">
         Domains
        </NavItem>
      
        <NavItem as={Link} to="/probation-dashboard">
          Probation Dashboard
        </NavItem>

        <NavItem as={Link} to="/probation/:employeeId">
          Probation Details
        </NavItem>

        <NavItem as={Link} to="/probation/domain">
          Domain-wise Probation
        </NavItem>

        <NavItem as={Link} to="/documents">
          Documents
        </NavItem>

        <NavItem as={Link} to="/upload-documents">
          Upload Document
        </NavItem>

        <NavItem as={Link} to="/reports">
          Reports
        </NavItem>

        <NavItem as={Link} to="/user-management">
          User Management
        </NavItem>

        <NavItem as={Link} to="/user-profile">
          User Profile
        </NavItem>

        <NavItem as={Link} to="/settings">
          Settings
        </NavItem>
      </NavMenu>
    </NavbarContainer>
  );


export default NavSection;

