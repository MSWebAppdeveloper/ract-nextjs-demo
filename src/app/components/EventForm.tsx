"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
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





// Define your timezoneOptions array
const timezoneOptions = [
  { value: "Eastern", label: "Eastern" },
  { value: "Central", label: "Central" },
  { value: "Mountain", label: "Mountain" },
  { value: "Pacific", label: "Pacific" },
  { value: "Alaskan", label: "Alaskan" },
  { value: "Hawaiian", label: "Hawaiian" },
];

const EventForm = ({ focusable = true, onNewEvent }) => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    timeZone: '',
    description: '',
    videoUrl: '',
    bannerImage: null,
    bannerImageUrl: '',
    bannerImageSize: ''
  });

  // Get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState();
  const [uploadedImage, setUploadedImage] = useState("");

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
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "16px",
    backgroundColor: "#00200010",
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
      setUploadedImage(null);
    }
  };

  const clearImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage.previewUrl); // Revoke object URL to prevent memory leaks
      setUploadedImage(null); // Clear the uploaded image state
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

    if (
      formData.eventName.trim() &&
      !formData.eventName.trim().match(/^[a-zA-Z0-9\-]+$/)
    ) {
      missingFields.push("Event Name (only characters, numbers, or hyphens)");
    }

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
    return /^https:\/\//.test(url);  // Basic check for HTTPS URL
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
        options.push(time);
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
            eventName: '',
            eventDate: '',
            startTime: '',
            endTime: '',
            timeZone: '',
            description: '',
            videoUrl: '',
            bannerImage: null,
            bannerImageUrl: '',
            bannerImageSize: ''
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

  // Clear timeout and hide success message
  const handleCloseSuccessMessage = () => {
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
      videoUrl: '',
      bannerImage: null,
      bannerImageUrl: '',
      bannerImageSize: ''
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
              top="96px"
              right="32px"
              p="0px"
              min-width="480px"
              borderradius="6px"
            >
              <Box>
                <Flex align="center" style={{ width: '480px' }} className="bg-white border-gray-300 border justify-between items-center rounded-md p-[11px] title_action'_'description_action'] grid-cols-[auto_max-content] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut flex">
                  <Box>
                    <Text size="3">Event created on {formattedDate}!</Text>
                  </Box>

                  <Flex direction="row" align="center">
                    <Box
                      className="[grid-area:_action]"
                      asChild
                      altText="Goto schedule to undo"
                    >
                      <Text size="3">
                        <a
                          onClick={handleEdit}
                          href="#"
                          className="inline-flex items-center justify-center rounded font-medium text-md me-4 leading-[25px] bg-green2 text-green-500 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8"
                        >
                          Edit event
                        </a>
                      </Text>
                    </Box>
                    <Box>
                      <Cross2Icon
                        style={iconStyle}
                        onClick={handleCloseSuccessMessage}
                      />
                    </Box>
                  </Flex>
                </Flex>
              </Box>
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
                <Flex direction="column" gap="8px">
                  <Text className="text-[16px] font-medium leading-[24px]">
                    Event Name
                  </Text>
                  <TextField.Root
                    color="gray"
                    variant="soft"
                    size="3"
                    type="text"
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
                      >
                        <Select.Trigger
                          color="gray"
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
                            <DatePicker inline />
                          )}
                        </Select.Content>
                      </Select.Root>
                    </Flex>
                    <Flex width="281px">
                      <Select.Root
                        size="3"
                      >
                        <Select.Trigger
                          color="gray"
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
                          <Select.Item>
                            <Flex as="span" align="center" gap="2">
                              <Text>labell</Text>
                            </Flex>
                          </Select.Item>

                        </Select.Content>
                      </Select.Root>
                    </Flex>
                  </Flex>
                  <Flex gap="8px">
                    <Box width="281px">
                      <Select.Root
                        size="3"
                      >
                        <Select.Trigger
                          color="gray"
                          placeholder="Start Time"
                          className="w-full"
                          variant="soft"
                        >
                          <Flex as="span" align="center" gap="2">
                            <ClockIcon width="18px" height="18px" />
                            <Text>Start Time</Text>
                          </Flex>
                        </Select.Trigger>
                        <Select.Content position="popper">
                          <Select.Item >
                            <Text>Time</Text>
                          </Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </Box>
                    <Box width="281px">
                      <Select.Root
                        size="3"
                      >
                        <Select.Trigger
                          color="gray"
                          placeholder="End Time"
                          className="w-full"
                          variant="soft"
                        >
                          <Flex as="span" align="center" gap="2">
                            <ClockIcon width="18px" height="18px" />
                            <Text>
                              End Time
                            </Text>
                          </Flex>
                        </Select.Trigger>
                        <Select.Content position="popper">
                          <Select.Item>
                            <Text>Time</Text>
                          </Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </Box>
                  </Flex>
                </Flex>
              </Skeleton>
              <Skeleton loading={true}>
                <Flex direction="column" gap="8px">
                  <Text className="text-[16px] font-medium leading-[24px]">
                    Description
                  </Text>
                  <TextArea
                    color="gray"
                    variant="soft"
                    size="3"
                    placeholder="Add event description...."
                    resize="both"
                  />
                </Flex>
              </Skeleton>

              <Flex direction="column" gap="8px">
                <Skeleton loading={true}>
                  <Text className="text-[16px] font-medium leading-[24px]">
                    Video
                  </Text>
                  <TextField.Root
                    color="gray"
                    variant="soft"
                    size="3"
                    type="url"
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
                  <Flex>
                    <Box
                      p="20px"
                      height="120px"
                    >
                      <TextField.Root
                        variant="soft"
                        size="3"
                        placeholder="Click to upload or drag and drop SVG, PNG, JPG or GIF (recommended size 1024x1024px) "
                      />
                      <input />
                      <Text align="center">
                        Click to upload or drag and drop SVG, PNG, JPG or GIF
                        (recommended size 1024x1024px){" "}
                      </Text>
                    </Box>
                  </Flex>
                </Skeleton>
              </Flex>
              <Flex gap="4">
                <Skeleton loading={true}>
                  <Button
                    size="3"
                    variant="soft"
                    type="submit"
                  >
                    Create Event
                  </Button>
                  <Skeleton loading={true}>
                    <Button color="gray" size="3" mt="2" variant="ghost">
                      Cancel
                    </Button>
                  </Skeleton>
                </Skeleton>
              </Flex>
            </>
          ) : (
            <>

              <Flex direction="row" justify="between" className="mobile-menu">
                <Box>
                  <IconButton size="3" color="gray" variant="soft" >
                    <a href="#">
                      <ChevronLeftIcon height={18} width={18} />
                    </a>
                  </IconButton>
                </Box>

                <Box>
                  <IconButton size="3" color="green" variant="soft" >
                    <a href="#">
                      <HamburgerMenuIcon height={18} width={18} />
                    </a>
                  </IconButton>
                </Box>
              </Flex>

              <Flex direction="column" gap="16px">
                <Text size="6" weight="medium" highContrast>
                  Create an event
                </Text>

                <Text as="div" size="2" weight="light" color="gray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore
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

              <Flex direction="column" gap="8px" className='sm-date'>
                <Text className="text-[16px] font-medium leading-[24px]">
                  Date & Time
                </Text>

                <Flex gap="8px" className='sm-date'>
                  <Box width="281px" flexGrow="1">
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

                  </Box>
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
                            key={time}
                            value={time}
                          >
                            <Text> {time}</Text>
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
                            key={time}
                            value={time}
                          >
                            <Text> {time}</Text>
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
                    <Flex width="473px" height="120px" gap="4px">
                      <Box width="318px">
                        <Grid columns="120px 1fr" gap="32px">
                          <Flex width="120px" height="120px" p="0">
                            <Inset
                              side="left"
                              pr="current"
                              style={{ border: "1px", borderRadius: "4px" }}
                            >
                              <img
                                src={uploadedImage ? uploadedImage.previewUrl : formData.bannerImageUrl}
                                alt={uploadedImage ? uploadedImage.file.name : 'Banner Image'}
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </Inset>
                          </Flex>
                          <Flex
                            direction="column"
                            width="166px"
                            gap="8px"
                            style={{ justifyContent: "center" }}
                          >
                            <IconButton
                              onClick={clearImage}
                              color="crimson"
                              variant="soft"
                            >
                              <TrashIcon width="18px" height="18px" />
                            </IconButton>
                            <Flex direction="column" gap="1">
                              <Text size="1" weight="medium">
                                {uploadedImage ? uploadedImage.file.name : formData.bannerImage.path}
                              </Text>
                              <Text size="1" weight="light">
                                {uploadedImage ? `${Math.round(uploadedImage.file.size / 1024)} KB` : `${Math.round(formData.bannerImageSize / 1024)} KB`}
                              </Text>
                            </Flex>
                          </Flex>
                        </Grid>
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

              <Flex gap="4" align="center">
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
                    <Button color="gray" size="3" mt="" variant="ghost">
                      Cancel
                    </Button>
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
              </Flex>
            </>)}
        </Flex>
      </form >
    </Flex >
  );
};

export default EventForm;
