import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: absolute;
  top: 45%;
  left: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: #f1356d;
  color: white;
`;

const WelcomeMessage = styled.h2`
  margin: 0;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Option = styled.h3`
  margin: 10%;
`;

const Navbar = () => {
  return (
    <Nav>
      <h1>Welcome to Look into the Future</h1>
      <WelcomeMessage>What would you like to do first?</WelcomeMessage>
      <OptionsContainer>
        <Option>
          <Link to="/home">Modify your calendar</Link>
        </Option>
        <Option>
          <Link to="/calendar">View your calendar</Link>
        </Option>
      </OptionsContainer>
    </Nav>
  );
}

export default Navbar;