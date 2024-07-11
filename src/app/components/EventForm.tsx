
import Header from './Header';
import React from 'react';

type Props = {};

const EventForm = (props: Props) => {
  const pagestyle = {
    width: '1166px', // Fixed width
    height: '1142px', // Hug height
    backgroundColor: '#f0f0f0', // Black background color
   // Space from the left side
    // padding: '20px', // Add some padding if needed
    opacity: '1', // Set opacity to 1 to make it visible
  };



  return (
    <div style={pagestyle}>
         <Header />
        Page Content</div>
  );
};

export default EventForm;



