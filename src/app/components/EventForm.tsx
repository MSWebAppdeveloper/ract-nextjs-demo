"use client"
import React, { useState } from 'react';
import Header from './Header';
import { Flex, Box, Button, AlertDialog, Inset, Text, Strong, Card, Heading, TextField, Link, Grid, Select, } from '@radix-ui/themes';
import { useDropzone } from 'react-dropzone';
import { InfoCircledIcon, Cross2Icon, TrashIcon, GlobeIcon, SunIcon, MoonIcon, ClockIcon } from '@radix-ui/react-icons'; // Import Cross2Icon for delete action
import * as Form from '@radix-ui/react-form';
type ExampleLayoutProps = React.ComponentPropsWithoutRef<typeof Flex> & {
  focusable?: boolean;
};
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

const EventForm = ({ focusable = true, ...props }: ExampleLayoutProps) => {
  const tabIndex = focusable ? undefined : -1;
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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);
  // const [uploadedImage, setUploadedImage] = useState({
  //   name:'',
  //   size:'',
  //   preview:'',
  // });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setValidationMessage('');
  };



  const handleSelectChange = (value: any, name: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const pagestyle = {
    width: '1166px', // Fixed width
    height: '100%', // Hug height
    // backgroundColor: '#f0f0f0', // Background color
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
      const file:any = acceptedFiles[0];
      const previewUrl:any = URL.createObjectURL(file); // Create object URL for the dropped file
      setUploadedImage({
        file: file,
        previewUrl: previewUrl
      });
    }
  });

  const clearUploadedImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage.previewUrl); // Revoke object URL to prevent memory leaks
      setUploadedImage(null);
    }
  };

  const validateForm = () => {
    const missingFields = [];

  // Check for empty fields
  if (!formData.eventName.trim()) {
    missingFields.push('Event Name');
  }

  if (!formData.eventDate.trim()) {
    missingFields.push('Date & Time');
  }

  if (!formData.startTime.trim() || !formData.endTime.trim()) {
    missingFields.push('Start Time and End Time');
  }

  if (!formData.timeZone.trim()) {
    missingFields.push('Time Zone');
  }

  // Perform format validations if fields are not empty
  // if (formData.eventName.trim() && !formData.eventName.trim().match(/^[a-zA-Z0-9\-]+$/)) {
  //   missingFields.push('Event Name (only characters, numbers, or hyphens)');
  // }

  // if (formData.eventDate.trim() && !formData.eventDate.trim().match(/^\d{4}-\d{2}-\d{2}$/)) {
  //   missingFields.push('Date & Time (YYYY-MM-DD format)');
  // }

  // if (formData.startTime.trim() && formData.endTime.trim() &&
  //     (!formData.startTime.trim().match(/^\d{2}:\d{2}$/) || !formData.endTime.trim().match(/^\d{2}:\d{2}$/))) {
  //   missingFields.push('Start Time and End Time (HH:MM format)');
  // }

  // if (formData.timeZone.trim() && !formData.timeZone.trim().match(/^[a-zA-Z\s]+$/)) {
  //   missingFields.push('Time Zone (only characters)');
  // }

  

    if (formData.description.trim() && formData.description.length <= 15) {
      missingFields.push('Description (must be more than 15 characters)');
    }

    if (formData.videoUrl.trim() && !isValidUrl(formData.videoUrl)) {
      missingFields.push('Valid Video URL (must be a valid HTTPS link)');
    }

    if (uploadedImage && (!['image/jpeg', 'image/png'].includes(uploadedImage.file.type))) {
      missingFields.push('Valid Banner Image (Only JPG and PNG images are allowed)');
    }

    if (missingFields.length > 0) {
      setValidationMessage(`Missing or incorrect data in ${missingFields.join(', ')}.`);
      return false;
    }

    setValidationMessage('');
    return true;
  };

  const isValidUrl = (url: any) => {
    // Basic check for HTTPS URL
    return /^https:\/\//.test(url);
  };

  const getTimeZoneLabel = (value: string | undefined) => {
    const timeZone = timezoneOptions.find(tz => tz.value === value);
    return timeZone ? timeZone.label : "Select time zone";
  };

  const generateTimeOptions = () => {
    let options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        let hour12 = (hour % 12) || 12; // Convert hour to 12-hour format
        let period = hour < 12 ? 'AM' : 'PM'; // Determine AM/PM
        let time = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
        options.push(
          <option key={time} value={time}>
            {formatTime(time)} {/* Assuming you have a formatTime function */}
          </option>
        );
      }
    }
    return options;
  };

  const formatTime = (time: any) => {
    const [hour, minute] = time.split(':');
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format

    return `${formattedHour}:${minute}  `
  };

  const handleSubmit = async (event: any) => { alert("hjhjhj");
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
          setShowSuccessMessage(true); // Show success message
          setFormData({
            eventName: '',
            eventDate: '',
            startTime: '',
            endTime: '',
            timeZone: '',
            description: '',
            videoUrl: ''
          });

          // Set timeout to hide success message after 7 seconds
          const id: any = setTimeout(() => {
            setShowSuccessMessage(false);
          }, 7000);
          setTimeoutId(id);
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


  const handleCloseSuccessMessage = () => {
    // Clear timeout and hide success message
    clearTimeout(timeoutId);
    setShowSuccessMessage(false);
  };

  const clearFormData = () => {
    
    setFormData({
      eventName: '',
      eventDate: '',
      startTime: '',
      endTime: '',
      timeZone: '',
      description: '',
      videoUrl: ''
    });
    clearUploadedImage();
  };
  return (
    <Box style={pagestyle}>
      <Header />
      {validationMessage && (
        <Box style={validationBoxStyle}>
          <Flex>
            <InfoCircledIcon style={iconStyle} />
            <p>{validationMessage}</p>
          </Flex>
        </Box>
      )}
      {showSuccessMessage && (
        <Box style={successBoxStyle}>
          <Flex>
            <InfoCircledIcon style={iconStyle} />
            <p>Event data saved successfully.</p>
            <Button onClick={handleEdit}>Edit</Button> {/* Edit button */}
            <Cross2Icon style={iconStyle} onClick={handleCloseSuccessMessage} /> {/* Cross icon for deleting */}
          </Flex>
        </Box>
      )}

      <Box style={formStyle}>
        {/* <form onSubmit={handleSubmit}>
          <div className="form-sec mb-5">
            <div className="mb-0">
              <Flex direction="column">
                <Text size="6" className="mb-2 heading">
                  Create an Event
                </Text>
                <Text size="2" className="mt-2 header-p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore
                </Text>
              </Flex>
            </div>
          </div>
          <label style={labelStyle}>Event Name</label>
          <input
            type="text"
            name="eventName"
            style={inputStyle}
            placeholder="Your event name"
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
          <Box height="120px">
            {uploadedImage ? (

              <Flex>
                <Inset side="top" >
                  <img
                    src={uploadedImage.previewUrl} // Set src to the previewUrl of uploadedImage
                    alt={uploadedImage.file.name} // Use alt attribute with file name for accessibility
                    style={{
                      display: 'block',
                      objectFit: 'cover',
                      width: '222px',
                      height: '120px',
                      borderRadius: "4px",
                      backgroundColor: 'var(--gray-5)',

                    }}
                  />
                </Inset>
                <Box height="76px" ml='8'>

                  <Button variant="ghost" onClick={clearUploadedImage} mt='2' >
                    <TrashIcon color="red" />
                  </Button>
                  <Text as="p" size="1" weight='medium' mt='2'>
                    {uploadedImage.file.name}
                  </Text>
                  <Text as="p" size="1" weight='regular' mt='2'>
                    {Math.round(uploadedImage.file.size / 1024)} KB
                  </Text>
                  <Text>
                  </Text>
                </Box>
              </Flex>


            ) : (
              <Box {...getRootProps({ style: dropzoneStyle })} height="120px">
                <input {...getInputProps()} />
                <p>Drag 'n' drop a file here, or click to select a file</p>
              </Box>
            )}
          </Box>

          <Flex gap="var(--Spacing9)" mt="2">
            <Button color="grass" variant="soft" type="submit">
              Submit
            </Button>

            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button ml="2" color='gray' variant="soft">Cancel</Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete Event</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  You are about to permanently delete this event. This action can't be undone.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button variant="solid" color="red">
                      Delete
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </Flex>
        </form> */}

        <Box width='570px'>
          <Flex direction='column' gap='64px' p='0' align='start'>
            <Form.Root className="w-[570px]" onSubmit={handleSubmit}>
              <Heading as="h3" size="6" trim="start" mb="5">Create an event</Heading>
              <Text as="p" size="2" mb="6" color="gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              </Text>

              <Form.Field className="grid mb-[10px]" name="eventName">
                <div className="flex items-baseline justify-between">
                  <Form.Label className="text-[16px] font-medium leading-[35px]">Event Name</Form.Label>
                </div>
                <Form.Control asChild>
                  <input
                    className=" w-full inline-flex h-[40px] appearance-none items-center justify-center rounded-[4px] px-[8px] text-[16px] leading-none shadow-[0_0_0_1px]"
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    placeholder='Your Event Name'
                  />
                </Form.Control>
              </Form.Field>

              <Grid>
                <Form.Field className="grid mb-[10px]" name="eventDate">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[16px] font-medium leading-[35px]">Date & Time</Form.Label>
                  </div>
                  <Grid columns={{ initial: '1', md: '2' }} gap="3" width="auto">
                    <Box height="64px">
                      <Form.Control asChild>
                        <input
                          type="date"
                          name="eventDate"
                          style={inputStyle}
                          placeholder="Select date"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                        />
                      </Form.Control>
                    </Box>
                    <Box height="64px" width='100%'>
                      <Form.Control width='100%' asChild>
                        <Select.Root
                          value={formData.timeZone}
                          onValueChange={(value) => handleSelectChange(value, 'timeZone')}
                        >
                          <Select.Trigger name="timeZone" placeholder="Time Zone" className='w-full'>
                            <Flex as="span" align="center" gap="2">
                              <GlobeIcon />
                              <Text>{formData.timeZone ? getTimeZoneLabel(formData.timeZone) : "Select time zone"}</Text>
                            </Flex>
                          </Select.Trigger>
                          <Select.Content position='popper'>
                            {timezoneOptions.map((tz) => (
                              <Select.Item key={tz.value} value={tz.value}>
                                <Flex as="span" align="center" gap="2">
                                  <Text>{tz.label}</Text>
                                </Flex>
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
                      </Form.Control>
                    </Box>

                    <Box height="64px" width='100%'>
                      <Form.Control width="100%" asChild>
                        <Select.Root
                          value={formData.startTime}
                          onValueChange={(value) => handleSelectChange(value, 'startTime')}
                        >
                          <Select.Trigger name="startTime" placeholder="Start Time" className="w-full">
                            <Flex as="span" align="center" gap="2">
                              <ClockIcon />
                              <Text>{formData.startTime ? formData.startTime : "Start Time"}</Text>
                            </Flex>
                          </Select.Trigger>
                          <Select.Content position="popper">
                            {generateTimeOptions().map((time) => (
                              <Select.Item key={time.props.value} value={time.props.value}>
                                <Text> {time.props.children}</Text></Select.Item>
                            ))}
                          </Select.Content>

                        </Select.Root>
                      </Form.Control>
                    </Box>

                    <Box height="64px" width='100%'>
                      <Form.Control width="100%" asChild>
                        <Select.Root
                          value={formData.endTime}
                          onValueChange={(value) => handleSelectChange(value, 'endTime')}
                        >
                          <Select.Trigger name="endTime" placeholder="End Time" className="w-full">
                            <Flex as="span" align="center" gap="2">
                              <ClockIcon />
                              <Text>{formData.endTime ? formData.endTime : "End Time"}</Text>
                            </Flex>
                          </Select.Trigger>
                          <Select.Content position="popper">
                            {generateTimeOptions().map((time) => (
                              <Select.Item key={time.props.value} value={time.props.value}>
                                <Text> {time.props.children}</Text></Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
                      </Form.Control>
                    </Box>
                  </Grid>
                </Form.Field>
              </Grid>



              <Form.Field className="grid mb-[10px]" name="description">
                <Form.Label className="text-[16px] font-medium leading-[35px]">Description</Form.Label>
                <Form.Control asChild>
                  <textarea
                    className=" w-full inline-flex h-[80px] appearance-none items-center justify-center rounded-[4px] px-[8px] text-[16px] leading-none shadow-[0_0_0_1px]"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter description"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field className="grid mb-[10px]" name="videoUrl">
                <Form.Label className="text-[16px] font-medium leading-[35px]">Video</Form.Label>
                <Form.Control asChild>
                  <input
                    className=" w-full inline-flex h-[40px] appearance-none items-center justify-center rounded-[4px] px-[8px] text-[16px] leading-none shadow-[0_0_0_1px]"
                    type="text"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    placeholder="Enter video URL"
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field className="grid mb-[10px]" name="bannerImage">
                <Form.Label className="text-[16px] font-medium leading-[35px]">Banner Image</Form.Label>
                <Box height="120px">
                  {uploadedImage ? (
                    <Flex>
                      <Box height="120px">
                        <img
                          src={uploadedImage.previewUrl}
                          alt={uploadedImage.file.name}
                          style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '222px',
                            height: '120px',
                            borderRadius: "4px",
                            backgroundColor: 'var(--gray-5)',
                          }}
                        />
                      </Box>
                      <Box height="76px" ml='8'>
                        <Button variant="ghost" onClick={clearUploadedImage} mt='2'>
                          <TrashIcon color="red" />
                        </Button>
                        <Text as="p" size="1" weight='medium' mt='2'>{uploadedImage.file.name}</Text>
                        <Text as="p" size="1" weight='regular' mt='2'>{Math.round(uploadedImage.file.size / 1024)} KB</Text>
                      </Box>
                    </Flex>
                  ) : (
                    <Box {...getRootProps({ style: dropzoneStyle })} height="120px">
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop a file here, or click to select a file</p>
                    </Box>
                  )}
                </Box>
              </Form.Field>

              <Flex gap="var(--Spacing9)" mt="2">
                <Button color="grass" variant="soft" type="submit" onSubmit={handleSubmit}>Submit</Button>
                <AlertDialog.Root>
                  <AlertDialog.Trigger>
                    <Button ml="2" color='gray' variant="soft">Cancel</Button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Delete Event</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                      You are about to permanently delete this event. This action can't be undone.
                    </AlertDialog.Description>
                    <Flex gap="3" mt="4" justify="end">
                      <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">Cancel</Button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={clearFormData}>Delete</Button>
                      </AlertDialog.Action>
                    </Flex>
                  </AlertDialog.Content>
                </AlertDialog.Root>
              </Flex>
            </Form.Root>
          </Flex>
        </Box>
      </Box>

    </Box>
  );
};

export default EventForm;
