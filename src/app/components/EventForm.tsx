"use client";
import React, { useState } from "react";
import Header from "./Header";
import { Flex, Box, Button, Text } from "@radix-ui/themes";
import { useDropzone } from "react-dropzone";
import { InfoCircledIcon, Cross2Icon } from "@radix-ui/react-icons"; // Import Cross2Icon for delete action

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

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    timeZone: "",
    description: "",
    videoUrl: "",
  });

  const [validationMessage, setValidationMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationMessage("");
  };

  const pagestyle = {
    width: "calc(100% - 346px)", // Fixed width
    height: "100%", // Hug height
    // backgroundColor: "#fff", // Background color
    marginLeft: "auto", // Space from the left side
    opacity: "1", // Set opacity to 1 to make it visible
  };

  const formStyle = {
    width: "570px", // Fixed width
    height: "990px", // Hug height
    gap: "var(--Spacing9)", // Gap
    opacity: "1", // Set opacity to 1 to make it visible
    padding: "0px 0px", // Add some padding
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    color: "#1D211C",
    fontWeight: "500",
    FontFamily: "inter",
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    backgroundColor: "#00200010",
  };

  const dropzoneStyle = {
    borderRadius: "4px",
    padding: "39px",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "16px",
    backgroundColor: "#00200010",
    display: "flex",
    justifyContent: "center",
  };

  const validationBoxStyle = {
    backgroundColor: "rgb(253 207 210)",
    color: "#d90007",
    padding: "10px",
    marginBottom: "20px",
    width: "570px",
  };

  const successBoxStyle = {
    backgroundColor: "rgb(207 253 210)",
    color: "#008000",
    padding: "10px",
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const iconStyle = {
    marginRight: "10px",
    width: "20px",
    height: "20px",
    cursor: "pointer", // Add cursor pointer for clickable icon
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });

  const validateForm = () => {
    const missingFields = [];

    if (!formData.eventName.trim()) {
      missingFields.push("Event Name");
    }

    if (!formData.eventDate.trim()) {
      missingFields.push("Date & Time");
    }

    if (!formData.startTime.trim() || !formData.endTime.trim()) {
      missingFields.push("Start Time and End Time");
    }

    if (formData.description.trim() && formData.description.length <= 15) {
      missingFields.push("Description (must be more than 15 characters)");
    }

    if (formData.videoUrl.trim() && !isValidUrl(formData.videoUrl)) {
      missingFields.push("Valid Video URL (must be a valid HTTPS link)");
    }

    if (missingFields.length > 0) {
      setValidationMessage(`Missing ${missingFields.join(" and ")}.`);
      return false;
    }

    setValidationMessage("");
    return true;
  };

  const isValidUrl = (url: any) => {
    // Basic check for HTTPS URL
    return /^https:\/\//.test(url);
  };

  const generateTimeOptions = () => {
    let options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        let time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(
          <option key={time} value={time}>
            {formatTime(time)}
          </option>
        );
      }
    }
    return options;
  };

  const formatTime = (time: any) => {
    const [hour, minute] = time.split(":");
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    const period = hour >= 12 ? "PM" : "AM"; // Determine AM/PM
    return `${formattedHour}:${minute} ${period}`; // Include space before AM/PM
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
          setFormSubmitted(true);
          setShowSuccessMessage(true); // Show success message
          setFormData({
            eventName: "",
            eventDate: "",
            startTime: "",
            endTime: "",
            timeZone: "",
            description: "",
            videoUrl: "",
          });

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
      {showSuccessMessage && (
        <Box style={successBoxStyle}>
          <Flex>
            <InfoCircledIcon style={iconStyle} />
            <p>Event data saved successfully.</p>
            <Button onClick={handleEdit}>Edit</Button> {/* Edit button */}
            <Cross2Icon
              style={iconStyle}
              onClick={handleCloseSuccessMessage}
            />{" "}
            {/* Cross icon for deleting */}
          </Flex>
        </Box>
      )}
      <Box style={formStyle}>
        <div className="form-sec">
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

        <form onSubmit={handleSubmit}>
          <div className="form-sec">
            <Text as="label" size="3" weight="medium" mb="2">
              Event Name
            </Text>
            <input
              type="text"
              name="eventName"
              style={inputStyle}
              placeholder="Your event name"
              value={formData.eventName}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div className="form-sec">
            <Text as="label" size="3" weight="medium" mb="2">
              Date & Time
            </Text>

            <Flex gap="16px" className="mt-2">
              <input
                type="date"
                name="eventDate"
                style={inputStyle}
                placeholder="Select date(S)..."
                value={formData.eventDate}
                onChange={handleInputChange}
              />
              <select
                name="timeZone"
                style={inputStyle}
                value={formData.timeZone}
                onChange={handleInputChange}
                
              >
                <option value="">Time zone</option>
                {timezoneOptions.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </Flex>
            <div className="mt-2">
              <Flex gap="16px">
                <select
                  name="startTime"
                  style={inputStyle}
                  value={formData.startTime}
                  onChange={handleInputChange}
                >
                  <ul className="Select-dropdown">
                  <option value="">Start time</option>
                  </ul>
                  {generateTimeOptions()}
                </select>

              
                <select
                  name="endTime"
                  style={inputStyle}
                  value={formData.endTime}
                  onChange={handleInputChange}
                  id="selector"
                >
                  <option value="">End time</option>
                  {generateTimeOptions()}
                </select>

              </Flex>
            </div>
          </div>

          <div className="form-sec">
            <Text as="label" size="3" weight="medium" mb="2">
              Description
            </Text>
            <textarea
              name="description"
              style={inputStyle}
              placeholder="Add event description..."
              value={formData.description}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
          <div className="form-sec">
            <Text as="label" size="3" weight="medium">
              Video
            </Text>
            <input
              type="text"
              name="videoUrl"
              style={inputStyle}
              placeholder="Add video link"
              value={formData.videoUrl}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div className="banner-sec">
            <Text as="label" size="3" weight="medium" mb="2">
              Banner Image
            </Text>
            <Box {...getRootProps({ style: dropzoneStyle })} className="mt-2">
              <input {...getInputProps()} />
              <p>
                <a href="#" className="">
                  <b>Click to upload</b>
                </a>{" "}
                or drag and drop SVG, PNG, JPG or GIF (recommended size 1024
                <span>&times;</span>1024px)
              </p>
            </Box>
          </div>

          <Flex gap="var(--Spacing9)" className="form-button">
            <Button  color="blue" type="submit" className="create-btn" size="3">
              Create event
            </Button>
            <Button  color="gray" className="cancel-btn" size="3">
              Cancel
            </Button>
          </Flex>
        </form>
      </Box>
    </div>
  );
};

export default EventForm;
