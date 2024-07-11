"use client"
import React, { useState } from 'react';
import Header from './Header';
import { Flex, Box, Button, VisuallyHidden } from '@radix-ui/themes';
import { useDropzone } from 'react-dropzone';
import { InfoCircledIcon, Cross2Icon } from '@radix-ui/react-icons'; // Import Cross2Icon for delete action
import { Dialog, DialogContent } from '@radix-ui/react-dialog'; // Import Dialog and DialogContent

// Define your timezoneOptions array
const timezoneOptions = [
  { value: 'Eastern', label: 'Eastern' },
  { value: 'Central', label: 'Central' },
  { value: 'Mountain', label: 'Mountain' },
  { value: 'Pacific', label: 'Pacific' },
  { value: 'Alaskan', label: 'Alaskan' },
  { value: 'Hawaiian', label: 'Hawaiian' },
  // Add more timezone options as needed
];

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    timeZone: '',
    description: '',
    videoUrl: ''
  });

  const [validationMessage, setValidationMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for showing delete confirmation dialog

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setValidationMessage('');
  };

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

  const validationBoxStyle = {
    backgroundColor: 'rgb(253 207 210)',
    color: '#d90007',
    padding: '10px',
    marginBottom: '20px',
    width: '570px'
  };

  const successBoxStyle = {
    backgroundColor: 'rgb(207 253 210)',
    color: '#008000',
    padding: '10px',
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  };

  const iconStyle = {
    marginRight: '10px',
    width: '20px',
    height: '20px',
    cursor: 'pointer' // Add cursor pointer for clickable icon
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });

  const validateForm = () => {
    const missingFields = [];

    if (!formData.eventName.trim()) {
      missingFields.push('Event Name');
    }

    if (!formData.eventDate.trim()) {
      missingFields.push('Date & Time');
    }

    if (!formData.startTime.trim() || !formData.endTime.trim()) {
      missingFields.push('Start Time and End Time');
    }

    if (formData.description.trim() && formData.description.length <= 15) {
      missingFields.push('Description (must be more than 15 characters)');
    }

    if (formData.videoUrl.trim() && !isValidUrl(formData.videoUrl)) {
      missingFields.push('Valid Video URL (must be a valid HTTPS link)');
    }

    if (missingFields.length > 0) {
      setValidationMessage(`Missing ${missingFields.join(' and ')}.`);
      return false;
    }

    setValidationMessage('');
    return true;
  };

  const isValidUrl = (url) => {
    // Basic check for HTTPS URL
    return /^https:\/\//.test(url);
  };

  const generateTimeOptions = () => {
    let options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        let time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(
          <option key={time} value={time}>
            {formatTime(time)}
          </option>
        );
      }
    }
    return options;
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    const period = hour >= 12 ? 'PM' : 'AM'; // Determine AM/PM
    return `${formattedHour}:${minute} ${period}`; // Include space before AM/PM
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await fetch('../../api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          setSavedData(data.eventData);
          setFormSubmitted(true);
          setFormData({
            eventName: '',
            eventDate: '',
            startTime: '',
            endTime: '',
            timeZone: '',
            description: '',
            videoUrl:''
          });
        } else {
          console.error('Failed to save event data');
          setValidationMessage('Failed to save event data');
        }
      } catch (error) {
        console.error('Error saving event data:', error);
        setValidationMessage('Error saving event data');
      }
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setFormData(data); // Populate form fields with retrieved data
        setSavedData(null); // Clear saved data state after editing
        setFormSubmitted(false); // Reset form submission state
      } else {
        console.error('Failed to retrieve event data');
      }
    } catch (error) {
      console.error('Error retrieving event data:', error);
    }
  };

  const handleDelete = () => {
    setShowConfirmation(true); // Show confirmation dialog on delete
  };

  const handleDeleteConfirm = () => {
    // Handle delete action here
    console.log('Deleting event...');
    setShowConfirmation(false); // Close confirmation dialog after delete
  };

  return (
    <div style={pagestyle}>
      <Header />
      {validationMessage && (
        <Box style={validationBoxStyle}>
          <Flex>
            <InfoCircledIcon style={iconStyle} />
            <p>{validationMessage}</p>
          </Flex>
        </Box>
      )}
      {formSubmitted && savedData && (
        <Box style={successBoxStyle}>
          <Flex>
            <InfoCircledIcon style={iconStyle} />
            <p>Event data saved successfully.</p>
            <Button onClick={handleEdit}>Edit</Button> {/* Edit button */}
            <Cross2Icon style={iconStyle} onClick={handleDelete} /> {/* Cross icon for deleting */}
          </Flex>
        </Box>
      )}
      <Box style={formStyle}>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Event Name</label>
          <input
            type="text"
            name="eventName"
            style={inputStyle}
            placeholder="Enter event name"
            value={formData.eventName}
            onChange={handleInputChange}
          />

          <label style={labelStyle}>Date & Time</label>
          <Flex gap="16px">
            <input
              type="date"
              name="eventDate"
              style={inputStyle}
              placeholder="Select date"
              value={formData.eventDate}
              onChange={handleInputChange}
            />
            <select
              name="timeZone"
              style={inputStyle}
              value={formData.timeZone}
              onChange={handleInputChange}
            >
              <option value="">Select time zone</option>
              {timezoneOptions.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </Flex>

          <Flex gap="16px">
            <select
              name="startTime"
              style={inputStyle}
              value={formData.startTime}
              onChange={handleInputChange}
            >
              <option value="">Select start time</option>
              {generateTimeOptions()}
            </select>
            <select
              name="endTime"
              style={inputStyle}
              value={formData.endTime}
              onChange={handleInputChange}
            >
              <option value="">Select end time</option>
              {generateTimeOptions()}
            </select>
          </Flex>

          <label style={labelStyle}>Description</label>
          <textarea
            name="description"
            style={inputStyle}
            placeholder="Enter description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <label style={labelStyle}>Video</label>
          <input
            type="text"
            name="videoUrl"
            style={inputStyle}
            placeholder="Enter video URL"
            value={formData.videoUrl}
            onChange={handleInputChange}
          />

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

      {/* Delete Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={(isOpen) => setShowConfirmation(isOpen)}>
        <DialogContent>
          <VisuallyHidden>Delete Event</VisuallyHidden>
          <h3>Delete Event</h3>
          <p>You are about to permanently delete this event. This action can't be undone.</p>
          <Flex gap="10px">
            <Button variant="primary" onClick={handleDeleteConfirm}>
              Delete
            </Button>
            <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
          </Flex>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventForm;
