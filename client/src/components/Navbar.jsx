import React from 'react'
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";

const Container = styled.div`
  position : sticky;
  top : 0;
  background-color :  ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  display : flex;
  align-items : center;
  justify-content : flex-end;
  height : 100%;
  padding : 10px 20px;
  position : relative;
`;

const Search = styled.div`
  position : absolute;  /*important inorder to center something independently*/
  width : 50%;
  left : 0px;
  right : 0px;
  margin : auto;
  display : flex;
  align-items : center;
  justify-content : space-between;
  padding : 5px;
  border : 1px solid #ccc;
  border-radius : 15px;
`;

const Input = styled.input`
  border : none;
  background-color : transparent;
  width: 50%;
`;


const Button = styled.button`
  padding : 5px 15px;
  background-color : transparent;
  border : 1px solid #3ea6ff;
  color : #3ea6ff;
  border-radius : 3px;
  font-weight : 500;
  cursor : pointer;
  display : flex;
  align-items : center;
  gap : 5px;
`;

const IconCustom = styled.div`
  color : ${({ theme }) => theme.text};
`;


/*If using padding means use Wrapper Class*/

export const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="  Search" />
          <IconCustom>
            <SearchOutlinedIcon />
          </IconCustom>
        </Search>
        <Link to="/signin" style={{ textDecoration: "none", color: "inherit" }}>
          <Button>
            <AccountCircleOutlinedIcon />
            SIGN IN
          </Button>
        </Link>
      </Wrapper>
    </Container>
  )
}
