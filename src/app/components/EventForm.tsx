"use client"; // Add this line at the top
import React, { useState } from 'react';
import Header from './Header';
import { Flex, Box, Button, Text } from '@radix-ui/themes';
import { useDropzone } from 'react-dropzone';

type Props = {};

const EventForm = (props: Props) => {
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const pagestyle = {
    width: '1166px', // Fixed width
    height: '100%', // Hug height
    backgroundColor: '#f0f0f0', // Background color
    marginLeft: '346px', // Space from the left side
    opacity: '1', // Set opacity to 1 to make it visible
  };

  const formStyle = {
    width: '570px', // Fixed width
    height: '990px', // Hug height
    gap: 'var(--Spacing9)', // Gap
    opacity: '1', // Set opacity to 1 to make it visible
    padding: '20px', // Add some padding
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    marginBottom: '16px',
    padding: '8px',
  };

  const headerStyle = {
    marginBottom: '20px',
  };

  const dropzoneStyle = {
    border: '2px dashed #0070f3',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '16px',
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });

  const validateForm = () => {
    const formData = {
      eventName: '', // Replace with actual code to get the value of event name input
      eventDate: '', // Replace with actual code to get the value of event date input
      startTime: '', // Replace with actual code to get the value of start time input
      endTime: '', // Replace with actual code to get the value of end time input
      timeZone: '', // Replace with actual code to get the value of time zone input
    };

    const emptyFields = Object.entries(formData)
      .filter(([key, value]) => !value.trim())
      .map(([key]) => {
        switch (key) {
          case 'eventName':
            return 'Event Name';
          case 'eventDate':
            return 'Date & Time';
          case 'startTime':
            return 'Start Time';
          case 'endTime':
            return 'End Time';
          case 'timeZone':
            return 'Time Zone';
          default:
            return '';
        }
      });

    if (emptyFields.length > 0) {
      const message = `Missing ${emptyFields.join(', ')}.`;
      setValidationMessage(message);
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      // Handle form submission logic here
      console.log('Form submitted successfully!');
    } else {
      setFormSubmitted(true); // To display validation message
    }
  };

  return (
    <div style={pagestyle}>
      <Header />
      {formSubmitted && validationMessage && (
        <div style={{ color: 'red', marginBottom: '16px' }}>
          {validationMessage}
        </div>
      )}
      <Box style={formStyle}>
        <Box style={headerStyle}>
          <Flex direction='column'>
            <Text size="6">Create an Event</Text>
            <Text size="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</Text>
          </Flex>
        </Box>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Event Name</label>
          <input type="text" style={inputStyle} placeholder="Enter event name" />

          <label style={labelStyle}>Date & Time</label>
          <Flex gap="16px">
            <input type="date" style={inputStyle} placeholder="Select date" />
            <input type="text" style={inputStyle} placeholder="Time zone" />
          </Flex>
          <Flex gap="16px">
            <input type="time" style={inputStyle} placeholder="Start time" />
            <input type="time" style={inputStyle} placeholder="End time" />
          </Flex>

          <label style={labelStyle}>Description</label>
          <textarea style={inputStyle} placeholder="Enter description"></textarea>

          <label style={labelStyle}>Video</label>
          <input type="text" style={inputStyle} placeholder="Enter video URL" />

          <label style={labelStyle}>Banner Image</label>
          <Box {...getRootProps({ style: dropzoneStyle })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a file here, or click to select a file</p>
          </Box>

          <Flex gap="var(--Spacing9)">
            <Button style={{ flex: 1 }} variant="primary" type="submit">
              Submit
            </Button>
            <Button style={{ flex: 1 }} variant="secondary">
              Cancel
            </Button>
          </Flex>
        </form>
      </Box>
    </div>
  );
};

export default EventForm;
