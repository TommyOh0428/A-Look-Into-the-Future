import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
position: absolute;
bottom: 13%;
left: 2%;
background-color: #fff;
padding-top: 0;
z-index: 1000;
width: 60%;
height: 20%;
border-radius: 12px;
border: 1px solid #000;
`;


const CloseButton = styled.button`
  position: absolute;
  right: 0.5vw;
  top: 0.2vh;
`;

const EventList = styled.ul`
display: grid; /* Use CSS Grid */
grid-template-columns: repeat(auto-fill, minmax(9vw, min-content)); 
grid-gap: 10px; /* Add some gap between grid items */
list-style: none;
padding: 0; 
max-height: 60%;
overflow:auto;

`;

const EventItem = styled.li`
margin: 10px 0;
cursor: pointer;
border-radius: 50px;
transition: background-color 0.5s ease;
&:hover {
  background-color: lightblue;
}
`;

const Header = styled.h3`
  text-align: center;
`;
const EventModal = ({ events, selectedDate, onClose, handleEventClick, deleteEvent,setEvents }) => {

  return (
    <>
      
      <Modal>
        <Header>Events on {selectedDate.toDateString()}:</Header>
        <EventList>
          {events.map((event, index) => (
            <EventItem key={index} onClick={() => handleEventClick(event.id)}>
              {event.summary}
              
            </EventItem>
          ))}
        </EventList>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Modal>
    </>
  );
};

export default EventModal;