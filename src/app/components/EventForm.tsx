"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  Flex,
  Box,
  Button,
  AlertDialog,
  Inset,
  Text,
  TextField,
  TextArea,
  Callout,
  Select,
  Skeleton,
  IconButton,
  Grid,
} from "@radix-ui/themes";
import { useDropzone } from "react-dropzone";
import {
  InfoCircledIcon,
  Cross2Icon,
  TrashIcon,
  GlobeIcon,
  SunIcon,
  MoonIcon,
  ClockIcon,
  Link2Icon,
  CalendarIcon,
} from "@radix-ui/react-icons"; // Import Cross2Icon for delete action
import * as Toast from "@radix-ui/react-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



interface FormData {
  eventName: string;
  eventDate: any;
  timeZone: string;
  startTime: string;
  endTime: string;
  description: string;
  videoUrl: any;
  bannerImage:any;
  bannerImageUrl : any;
}

// Define your timezoneOptions array
const timezoneOptions = [
  { value: "Eastern", label: "Eastern" },
  { value: "Central", label: "Central" },
  { value: "Mountain", label: "Mountain" },
  { value: "Pacific", label: "Pacific" },
  { value: "Alaskan", label: "Alaskan" },
  { value: "Hawaiian", label: "Hawaiian" },
  // Add more timezone options as needed
];

const EventForm = ({ focusable = true, onNewEvent }) => {

  const [formData, setFormData] = useState<FormData>({
    eventName: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    timeZone: "",
    description: "",
    videoUrl: "",
    bannerImage: null,
    bannerImageUrl : '',
    bannerImageSize:''
   
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);

  const [validationMessage, setValidationMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState();
  const [uploadedImage, setUploadedImage] = useState("");
  const [todayEvents, setTodayEvents] = useState([]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Simulate data loading completion after 2 seconds
    }, 1000);

    return () => clearTimeout(timer); // Cleanup on unmount or dependency change
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationMessage("");
  };

  const handleSelectChange = (value: any, name: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        eventDate: date,
      }));
    }
    setShowDatePicker(false); // Always close DatePicker after date selection
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "8px",
  };

  const dropzoneStyle = {
    border: "2px dashed #0070f3",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "16px",
  };

  const iconStyle = {
    marginRight: "10px",
    width: "20px",
    height: "20px",
    cursor: "pointer", // Add cursor pointer for clickable icon
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]; 
      const previewUrl = URL.createObjectURL(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        bannerImage: file,
        bannerImageUrl: previewUrl,
        bannerImageSize: file.size // Update bannerImage in formData
      }));
      setUploadedImage({
        file: file,
        previewUrl: previewUrl,
      });
    },
  });

  const clearUploadedImage = () => {
    if (uploadedImage) {
    //  URL.revokeObjectURL(uploadedImage.previewUrl); // Revoke object URL to prevent memory leaks
      setUploadedImage(null);
    }
  };

  const clearImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage.previewUrl); // Revoke object URL to prevent memory leaks
      setUploadedImage(null); // Clear the uploaded image state
      // Optionally, clear any other related form data state if needed
      setFormData({
        ...formData,
        bannerImage: null, // Clear the banner image data in form data state
        bannerImageUrl: '', // Clear the banner image URL in form data state
        bannerImageSize: 0, // Clear the banner image size in form data state
      });
    }
  };

  const validateForm = () => {
    const missingFields = [];
    // Check for empty fields
    if (!formData.eventName.trim()) {
      missingFields.push("Event Name");
    }

    if (!formData.eventDate) {
      missingFields.push("Date & Time");
    }

    if (!formData.startTime.trim()) {
      missingFields.push("Start Time");
    }

    if (!formData.endTime.trim()) {
      missingFields.push("End Time");
    }

    if (!formData.timeZone.trim()) {
      missingFields.push("Time Zone");
    }

    // Perform format validations if fields are not empty
    if (
      formData.eventName.trim() &&
      !formData.eventName.trim().match(/^[a-zA-Z0-9\-]+$/)
    ) {
      missingFields.push("Event Name (only characters, numbers, or hyphens)");
    }

    // if (formData.eventDate.trim() && !formData.eventDate.trim().match(/^\d{4}-\d{2}-\d{2}$/)) {
    //   missingFields.push('Date & Time (YYYY-MM-DD format)');
    // }

    if (formData.description.trim() && formData.description.length <= 15) {
      missingFields.push("Description (must be more than 15 characters)");
    }

    if (formData.videoUrl.trim() && !isValidUrl(formData.videoUrl)) {
      missingFields.push("Valid Video URL (must be a valid HTTPS link)");
    }

    if (
      uploadedImage &&
      !["image/jpeg", "image/png"].includes(uploadedImage.file.type)
    ) {
      missingFields.push(
        "Valid Banner Image (Only JPG and PNG images are allowed)"
      );
    }

    if (missingFields.length > 0) {
      setValidationMessage(
        `Missing or incorrect data in ${missingFields.join(", ")}.`
      );
      return false;
    }

    setValidationMessage("");
    return true;
  };

  const isValidUrl = (url: any) => {
    // Basic check for HTTPS URL
    return /^https:\/\//.test(url);
  };

  const getTimeZoneLabel = (value: string | undefined) => {
    const timeZone = timezoneOptions.find((tz) => tz.value === value);
    return timeZone ? timeZone.label : "Select time zone";
  };

  const generateTimeOptions = () => {
    let options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        let hour12 = hour % 12 || 12; // Convert hour to 12-hour format
        let period = hour < 12 ? "AM" : "PM"; // Determine AM/PM
        let time = `${hour12.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${period}`;
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
    const [hour, minute] = time.split(":");
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format

    return `${formattedHour}:${minute}  `;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await fetch("../../api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          
          setSavedData(data.eventData); 
          onNewEvent(data.eventData); 
          setFormSubmitted(true);
          setShowSuccessMessage(true); // Show success message
          setFormData({
            eventName: "",
            eventDate: null,
            startTime: "",
            endTime: "",
            timeZone: "",
            description: "",
            videoUrl: "",
            bannerImage: null,
            bannerImageUrl:'',
            bannerImageSize:''
          });
          clearUploadedImage();
     
          // Set timeout to hide success message after 7 seconds
          const id: any = setTimeout(() => {
            setShowSuccessMessage(false);
          }, 7000);
          setTimeoutId(id);
        } else {
          console.error("Failed to save event data");
          setValidationMessage("Failed to save event data");
        }
      } catch (error) {
        console.error("Error saving event data:", error);
        setValidationMessage("Error saving event data");
      }
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch("/api/events");
      if (response.ok) {
        const data = await response.json(); 
        setFormData(data); // Populate form fields with retrieved data
        setSavedData(null); // Clear saved data state after editing
        setFormSubmitted(false); // Reset form submission state
      } else {
        console.error("Failed to retrieve event data");
      }
    } catch (error) {
      console.error("Error retrieving event data:", error);
    }
  };

  const handleCloseSuccessMessage = () => {
    // Clear timeout and hide success message
    clearTimeout(timeoutId);
    setShowSuccessMessage(false);
  };

  const clearFormData = () => {
    setFormData({
      eventName: "",
      eventDate: null,
      startTime: "",
      endTime: "",
      timeZone: "",
      description: "",
      videoUrl: "",
      bannerImage:null,
      bannerImageUrl:'',
      bannerImageSize:''
    });
    clearUploadedImage();
  };
  return (
    <Flex
      className="mainContainer"
      direction="column"
      gap="64px"
      width="1166px"
      right="0"
      top="0"
      ml="346px"
    >
      <Header />

      <form onSubmit={handleSubmit}>
        <Flex className="form" direction="column" gap="64px" width="570px">
          {validationMessage && (
            <Callout.Root color="red" role="alert">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{validationMessage}</Callout.Text>
            </Callout.Root>
          )}
          {showSuccessMessage && (
            <Box
              position="absolute"
              top="20px"
              right="20px"
              p="10px"
              width="auto"
            >
              <Toast.Provider>
                <Toast.Root>
                  <Toast.Title />
                  <Toast.Description>
                    Event data saved successfully.
                  </Toast.Description>
                  <Toast.Action
                    className="[grid-area:_action]"
                    asChild
                    altText="Goto schedule to undo"
                  >
                    <Button
                      onClick={handleEdit}
                      className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8"
                    >
                      Edit
                    </Button>
                  </Toast.Action>
                  <Toast.Close>
                    <Cross2Icon
                      style={iconStyle}
                      onClick={handleCloseSuccessMessage}
                    />
                  </Toast.Close>
                </Toast.Root>

                <Toast.Viewport />
              </Toast.Provider>
            </Box>
          )}

          {loading ? (
            <>
              <Flex direction="column" gap="16px">
                <Text size="6" weight="medium" highContrast>
                  <Skeleton loading={true}>Create an event</Skeleton>
                </Text>
                <Skeleton loading={true}>
                  <Text as="div" size="2" weight="light" color="gray">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore
                  </Text>
                </Skeleton>
              </Flex>

              <Skeleton loading={true}>
                <Flex direction="column" gap="16px">
                  <Text className="text-[16px] font-medium leading-[24px]">
                    Event Name
                  </Text>

                  <TextField.Root
                    color="gray"
                    variant="soft"
                    size="3"
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    placeholder="Youoloret name"
                  />
                </Flex>
              </Skeleton>

              <Skeleton loading={true}>
                <Flex direction="column" gap="8px">
                  <Text className="text-[16px] font-medium leading-[24px]">
                    Date & Time
                  </Text>

                  <Flex gap="8px">
                    <Flex width="281px" flexGrow="1">
                      <Select.Root
                        size="3"
                        value={formData.eventDate}
                        onValueChange={(value) =>
                          handleSelectChange(value, "eventDate")
                        }
                      >
                        <Select.Trigger
                          color="gray"
                          name="eventDate"
                          placeholder="Select date(s)..."
                          className="w-full"
                          variant="soft"
                        >
                          <Flex as="span" align="center" gap="2">
                            <CalendarIcon width="18px" height="18px" />
                            <Text>
                              {formData.eventDate
                                ? formData.eventDate.toLocaleDateString()
                                : "Select date"}
                            </Text>
                          </Flex>
                        </Select.Trigger>
                        <Select.Content position="popper">
                          {showDatePicker && (
                            <DatePicker
                              selected={formData.eventDate}
                              onChange={handleDateChange}
                              onClickOutside={() => setShowDatePicker(false)}
                              inline
                            />
                          )}
                        </Select.Content>
                      </Select.Root>
                    </Flex>
                    <Flex width="281px">
                      <Select.Root
                        size="3"
                        value={formData.timeZone}
                        onValueChange={(value) =>
                          handleSelectChange(value, "timeZone")
                        }
                      >
                        <Select.Trigger
                          color="gray"
                          name="timeZone"
                          placeholder="Time Zone"
                          className="w-full"
                          variant="soft"
                        >
                          <Flex as="span" align="center" gap="2">
                            <GlobeIcon width="18px" height="18px" />
                            <Text>
                              {formData.timeZone
                                ? getTimeZoneLabel(formData.timeZone)
                                : "Select time zone"}
                            </Text>
                          </Flex>
                        </Select.Trigger>
                        <Select.Content position="popper">
                          {timezoneOptions.map((tz) => (
                            <Select.Item key={tz.value} value={tz.value}>
                              <Flex as="span" align="center" gap="2">
                                <Text>{tz.label}</Text>
                              </Flex>
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>
                    </Flex>
                  </Flex>

                  <Flex gap="8px">
                    <Box width="281px">
                      <Select.Root
                        size="3"
                        value={formData.startTime}
                        onValueChange={(value) =>
                          handleSelectChange(value, "startTime")
                        }
                      >
                        <Select.Trigger
                          color="gray"
                          name="startTime"
                          placeholder="Start Time"
                          className="w-full"
                          variant="soft"
                        >
                          <Flex as="span" align="center" gap="2">
                            <ClockIcon width="18px" height="18px" />
                            <Text>
                              {formData.startTime
                                ? formData.startTime
                                : "Start Time"}
                            </Text>
                          </Flex>
                        </Select.Trigger>
                        <Select.Content position="popper">
                          {generateTimeOptions().map((time) => (
                            <Select.Item
                              key={time.props.value}
                              value={time.props.value}
                            >
                              <Text> {time.props.children}</Text>
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>
                    </Box>

                    <Box width="281px">
                      <Select.Root
                        size="3"
                        value={formData.endTime}
                        onValueChange={(value) =>
                          handleSelectChange(value, "endTime")
                        }
                      >
                        <Select.Trigger
                          color="gray"
                          name="endTime"
                          placeholder="End Time"
                          className="w-full"
                          variant="soft"
                        >
                          <Flex as="span" align="center" gap="2">
                            <ClockIcon width="18px" height="18px" />
                            <Text>
                              {formData.endTime ? formData.endTime : "End Time"}
                            </Text>
                          </Flex>
                        </Select.Trigger>
                        <Select.Content position="popper">
                          {generateTimeOptions().map((time) => (
                            <Select.Item
                              key={time.props.value}
                              value={time.props.value}
                            >
                              <Text> {time.props.children}</Text>
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>
                    </Box>
                  </Flex>
                </Flex>
              </Skeleton>
              {/* <Grid>
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
          </Grid> */}

              <Skeleton loading={true}>
                <Flex direction="column" gap="16px">
                  <Text className="text-[16px] font-medium leading-[24px]">
                    Description
                  </Text>

                  <TextArea
                    color="gray"
                    variant="soft"
                    size="3"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Add event description...."
                    resize="both"
                  />
                </Flex>
              </Skeleton>

              <Flex direction="column" gap="16px">
                <Skeleton loading={true}>
                  <Text className="text-[16px] font-medium leading-[24px]">
                    Video
                  </Text>

                  <TextField.Root
                    color="gray"
                    variant="soft"
                    size="3"
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    placeholder="Add video link..."
                  >
                    <TextField.Slot>
                      <Link2Icon height="16" width="16" />
                    </TextField.Slot>
                  </TextField.Root>
                </Skeleton>

                <Skeleton loading={true}>
                  <Text className="text-[16px] font-medium leading-[24px]">
                    Banner Image
                  </Text>

                  {uploadedImage ? (
                    <Flex>
                      <Box height="120px">
                        <img
                          src={uploadedImage.previewUrl}
                          alt={uploadedImage.file.name}
                          style={{
                            display: "block",
                            objectFit: "cover",
                            width: "222px",
                            height: "120px",
                            borderRadius: "4px",
                            backgroundColor: "var(--gray-5)",
                          }}
                        />
                      </Box>
                      <Box height="76px" ml="8">
                        <Button
                          variant="ghost"
                          onClick={clearUploadedImage}
                          mt="2"
                        >
                          <TrashIcon color="red" />
                        </Button>
                        <Text as="p" size="1" weight="medium" mt="2">
                          {uploadedImage.file.name}
                        </Text>
                        <Text as="p" size="1" weight="regular" mt="2">
                          {Math.round(uploadedImage.file.size / 1024)} KB
                        </Text>
                      </Box>
                    </Flex>
                  ) : (
                    <Box
                      p="20px"
                      {...getRootProps({ style: dropzoneStyle })}
                      height="120px"
                    >
                      <TextField.Root
                        variant="soft"
                        size="3"
                        {...getInputProps()}
                        placeholder="Click to upload or drag and drop SVG, PNG, JPG or GIF (recommended size 1024x1024px) "
                      />
                      <input {...getInputProps()} />
                      <Text align="center">
                        Click to upload or drag and drop SVG, PNG, JPG or GIF
                        (recommended size 1024x1024px){" "}
                      </Text>
                    </Box>
                  )}
                </Skeleton>
              </Flex>
              {/*  

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
          </Form.Field> */}

              <Flex gap="4">
                <Skeleton loading={true}>
                  <Button
                    size="3"
                    variant="soft"
                    type="submit"
                    onSubmit={handleSubmit}
                  >
                    Create Event
                  </Button>

                  <AlertDialog.Root>
                    <AlertDialog.Trigger>
                      <Skeleton loading={true}>
                        <Button color="gray" size="3" mt="2" variant="ghost">
                          Cancel
                        </Button>
                      </Skeleton>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content maxWidth="450px">
                      <AlertDialog.Title>Delete Event</AlertDialog.Title>
                      <AlertDialog.Description size="2">
                        You are about to permanently delete this event. This
                        action can&apos;t be undone.
                      </AlertDialog.Description>
                      <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                          <Button
                            variant="solid"
                            color="red"
                            onClick={clearFormData}
                          >
                            Delete
                          </Button>
                        </AlertDialog.Action>
                      </Flex>
                    </AlertDialog.Content>
                  </AlertDialog.Root>
                </Skeleton>
              </Flex>
            </>
          )  : (<>
            <Flex direction="column" gap="16px">
              <Text size="6" weight="medium" highContrast>
                Create an event
              </Text>

              <Text as="div" size="2" weight="light" color="gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore
              </Text>

            </Flex>


            <Flex direction="column" gap="8px">
              <Text className="text-[16px] font-medium leading-[24px]">
                Event Name
              </Text>

              <TextField.Root
                color="gray"
                variant="soft"
                size="3"
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                placeholder="Your Event name"
              />
            </Flex>



            <Flex direction="column" gap="8px">
              <Text className="text-[16px] font-medium leading-[24px]">
                Date & Time
              </Text>

              <Flex gap="8px">
                <Flex width="281px" flexGrow="1">
                  <TextField.Root
                    color="gray"
                    variant="soft"
                    size="3"
                    type="date"
                    name="eventDate"
                    style={inputStyle}
                    placeholder="Select date"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                  />
                  
                </Flex>
                <Flex width="281px">
                  <Select.Root
                    size="3"
                    value={formData.timeZone}
                    onValueChange={(value) =>
                      handleSelectChange(value, "timeZone")
                    }
                  >
                    <Select.Trigger
                      color="gray"
                      name="timeZone"
                      placeholder="Time Zone"
                      className="w-full"
                      variant="soft"
                    >
                      <Flex as="span" align="center" gap="2">
                        <GlobeIcon width="18px" height="18px" />
                        <Text>
                          {formData.timeZone
                            ? getTimeZoneLabel(formData.timeZone)
                            : "Select time zone"}
                        </Text>
                      </Flex>
                    </Select.Trigger>
                    <Select.Content position="popper">
                      {timezoneOptions.map((tz) => (
                        <Select.Item key={tz.value} value={tz.value}>
                          <Flex as="span" align="center" gap="2">
                            <Text>{tz.label}</Text>
                          </Flex>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </Flex>

              <Flex gap="8px">
                <Box width="281px">
                  <Select.Root
                    size="3"
                    value={formData.startTime}
                    onValueChange={(value) =>
                      handleSelectChange(value, "startTime")
                    }
                  >
                    <Select.Trigger
                      color="gray"
                      name="startTime"
                      placeholder="Start Time"
                      className="w-full"
                      variant="soft"
                    >
                      <Flex as="span" align="center" gap="2">
                        <ClockIcon width="18px" height="18px" />
                        <Text>
                          {formData.startTime
                            ? formData.startTime
                            : "Start Time"}
                        </Text>
                      </Flex>
                    </Select.Trigger>
                    <Select.Content position="popper">
                      {generateTimeOptions().map((time) => (
                        <Select.Item
                          key={time.props.value}
                          value={time.props.value}
                        >
                          <Text> {time.props.children}</Text>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Box>

                <Box width="281px">
                  <Select.Root
                    size="3"
                    value={formData.endTime}
                    onValueChange={(value) =>
                      handleSelectChange(value, "endTime")
                    }
                  >
                    <Select.Trigger
                      color="gray"
                      name="endTime"
                      placeholder="End Time"
                      className="w-full"
                      variant="soft"
                    >
                      <Flex as="span" align="center" gap="2">
                        <ClockIcon width="18px" height="18px" />
                        <Text>
                          {formData.endTime ? formData.endTime : "End Time"}
                        </Text>
                      </Flex>
                    </Select.Trigger>
                    <Select.Content position="popper">
                      {generateTimeOptions().map((time) => (
                        <Select.Item
                          key={time.props.value}
                          value={time.props.value}
                        >
                          <Text> {time.props.children}</Text>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Box>
              </Flex>
            </Flex>

           
            <Flex direction="column" gap="8px">
              <Text className="text-[16px] font-medium leading-[24px]">
                Description
              </Text>

              <TextArea
                color="gray"
                variant="soft"
                size="3"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add event description...."
                resize="both"
              />
            </Flex>


            <Flex direction="column" gap="16px">
              <Flex direction="column" gap="8px">
                <Text className="text-[16px] font-medium leading-[24px]">
                  Video
                </Text>

                <TextField.Root
                  color="gray"
                  variant="soft"
                  size="3"
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  placeholder="Add video link..."
                >
                  <TextField.Slot>
                    <Link2Icon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Flex>

              <Flex direction="column" gap="8px">
                <Text className="text-[16px] font-medium leading-[24px]">
                  Banner Image
                </Text>

                {(uploadedImage || formData.bannerImage) ? (
                  <Flex>
                    <Box height="120px">
                      <img
                        src={uploadedImage ? uploadedImage.previewUrl : formData.bannerImageUrl}
                        alt={uploadedImage ? uploadedImage.file.name : 'Banner Image'}
                        style={{
                          display: "block",
                          objectFit: "cover",
                          width: "222px",
                          height: "120px",
                          borderRadius: "4px",
                          backgroundColor: "var(--gray-5)",
                        }}
                      />
                    </Box>
                    <Box height="76px" ml="8">
                   
                    <Button variant="ghost" onClick={clearImage} mt="2">
                      <TrashIcon color="red" /> 
                    </Button>
                
                  <Text as="p" size="1" weight="medium" mt="2">
                    {uploadedImage ? uploadedImage.file.name : formData.bannerImage.path}
                  </Text>
                  <Text as="p" size="1" weight="regular" mt="2">
                    {uploadedImage ? `${Math.round(uploadedImage.file.size / 1024)} KB` : `${Math.round(formData.bannerImageSize / 1024)} KB`}
                  </Text>
                    </Box>
                  </Flex>
                ) : (
                  <Box
                    p="20px"
                    {...getRootProps({ style: dropzoneStyle })}
                    height="120px"
                  >
                    <TextField.Root
                      variant="soft"
                      size="3"
                      {...getInputProps()}
                      placeholder="Click to upload or drag and drop SVG, PNG, JPG or GIF (recommended size 1024x1024px) "
                    />
                    <input {...getInputProps()} />
                    <Text align="center">
                      Click to upload or drag and drop SVG, PNG, JPG or GIF
                      (recommended size 1024x1024px){" "}
                    </Text>
                  </Box>
                )}
              </Flex>
            </Flex>
            
            <Flex gap="4">

              <Button
                size="3"
                variant="soft"
                type="submit"
                onSubmit={handleSubmit}
              >
                Create Event
              </Button>

              <AlertDialog.Root>
                <AlertDialog.Trigger>

                  <Button color="gray" size="3" mt="2" variant="ghost">
                    Cancel
                  </Button>

                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                  <AlertDialog.Title>Delete Event</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    You are about to permanently delete this event. This action
                    can't be undone.
                  </AlertDialog.Description>
                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">
                        Cancel
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Button
                        variant="solid"
                        color="red"
                        onClick={clearFormData}
                      >
                        Delete
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>

            </Flex>
          </>)}

        </Flex>
      </form>
    </Flex>
  );
};

export default EventForm;
