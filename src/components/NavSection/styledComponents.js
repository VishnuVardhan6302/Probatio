
import styled,{keyframes} from "styled-components";

export const NavbarContainer = styled.nav`
  width: 260px;
  height: 100vh;

  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;

  background: #064e3b;

  border-right: 1px solid #e5e7eb;

  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);

  box-sizing: border-box;

  padding: 25px 15px;
  

  z-index: 1000;

`;

const animate =keyframes`
from{
transform:translateX(-100px);
}to{
transform:translateX(0px)
}

`

export const Logo = styled.h2`
  margin: 0 0 30px 15px;

  color: white;

  font-size: 30px;
  font-weight: 700;
  font-family:"Roboto";
  margin-bottom:15px;
padding-bottom:0px;
animation:${animate} 1s forwards;

`;

export const NavMenu = styled.div`
  display: flex;
  flex-direction: column;

  gap: 6px;

  width: 100%;
   overflow-y: auto; 

`;

export const NavItem = styled.a`
  width: 100%;

  padding: 12px 15px;

  box-sizing: border-box;

 color:#f8e7c9;

  text-decoration: none;

  border-radius: 8px;

  font-size: 14px;
  font-weight: 500;

  transition: all 0.2s ease;
  display:flex;
  align-items:center;


  &:hover {
    color: black;
    background-color: white;
  }

  &:active {
    color: #ffffff;
    background-color: black;
  }
`;



export const Hr =styled.hr`
color:white;
width:85%;
margin-bottom:20px;
margin-top:0px;
padding-top:0px;
animation:${animate} 1s forwards;
`


export const Icon =styled.p`
font-size:20px;
`