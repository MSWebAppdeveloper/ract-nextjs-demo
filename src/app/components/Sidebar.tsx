"use client";
import {
  Avatar,
  Box,
  Link,
  Flex,
  Switch,
  Text,
  IconButton,
  Card,
} from "@radix-ui/themes";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

type Props = {};

const Sidebar = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  const handleThemeChange = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  return (
    <>
      <div id="sidebar">
        <div id="top">
          <Box className="logo">
            <Text size="6">ShowOps</Text>
          </Box>

          <Box className="navigationMenu">
            <Link href="#" underline="none" color="gray" className="Nav-items">
              <Flex className="navigation-link Active">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    fill-opacity="0.01"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.98667 1.06667L2.93298 1.06663C2.6893 1.0664 2.47925 1.0662 2.29315 1.11088C1.70812 1.25133 1.25133 1.70812 1.11088 2.29315C1.0662 2.47924 1.06641 2.6893 1.06664 2.93298L1.06667 2.98667V5.54667L1.06664 5.60035C1.06641 5.84403 1.0662 6.0541 1.11088 6.24018C1.25133 6.82521 1.70812 7.282 2.29315 7.42246C2.47925 7.46713 2.6893 7.46693 2.93298 7.4667L2.98667 7.46667H5.54667L5.60035 7.4667C5.84403 7.46693 6.0541 7.46713 6.24018 7.42246C6.82522 7.282 7.28201 6.82521 7.42247 6.24018C7.46714 6.0541 7.46694 5.84403 7.4667 5.60035L7.46667 5.54667V2.98667L7.4667 2.93298C7.46694 2.6893 7.46714 2.47924 7.42247 2.29315C7.28201 1.70812 6.82522 1.25133 6.24018 1.11088C6.0541 1.0662 5.84403 1.0664 5.60035 1.06663L5.54667 1.06667H2.98667ZM2.54217 2.14807C2.58808 2.13704 2.65837 2.13333 2.98667 2.13333H5.54667C5.87498 2.13333 5.94527 2.13704 5.99117 2.14807C6.18619 2.19489 6.33845 2.34715 6.38527 2.54216C6.39629 2.58807 6.4 2.65837 6.4 2.98667V5.54667C6.4 5.87497 6.39629 5.94527 6.38527 5.99117C6.33845 6.18619 6.18619 6.33844 5.99117 6.38527C5.94527 6.39629 5.87498 6.4 5.54667 6.4H2.98667C2.65837 6.4 2.58808 6.39629 2.54217 6.38527C2.34715 6.33844 2.19489 6.18619 2.14808 5.99117C2.13705 5.94527 2.13334 5.87497 2.13334 5.54667V2.98667C2.13334 2.65837 2.13705 2.58807 2.14808 2.54216C2.19489 2.34715 2.34715 2.19489 2.54217 2.14807ZM10.4533 1.06667L10.3997 1.06663C10.156 1.0664 9.94591 1.0662 9.75982 1.11088C9.17479 1.25133 8.718 1.70812 8.57755 2.29315C8.53287 2.47924 8.53307 2.6893 8.5333 2.93298L8.53334 2.98667V5.54667L8.5333 5.60035C8.53307 5.84403 8.53287 6.0541 8.57755 6.24018C8.718 6.82521 9.17479 7.282 9.75982 7.42246C9.94591 7.46713 10.156 7.46693 10.3997 7.4667L10.4533 7.46667H13.0133L13.067 7.4667C13.3107 7.46693 13.5207 7.46713 13.7069 7.42246C14.2918 7.282 14.7487 6.82521 14.8892 6.24018C14.9338 6.0541 14.9337 5.84403 14.9333 5.60035V5.54667V2.98667V2.93298C14.9337 2.6893 14.9338 2.47924 14.8892 2.29315C14.7487 1.70812 14.2918 1.25133 13.7069 1.11088C13.5207 1.0662 13.3107 1.0664 13.067 1.06663L13.0133 1.06667H10.4533ZM10.0088 2.14807C10.0547 2.13704 10.125 2.13333 10.4533 2.13333H13.0133C13.3417 2.13333 13.4119 2.13704 13.4578 2.14807C13.6528 2.19489 13.8051 2.34715 13.8519 2.54216C13.8629 2.58807 13.8667 2.65837 13.8667 2.98667V5.54667C13.8667 5.87497 13.8629 5.94527 13.8519 5.99117C13.8051 6.18619 13.6528 6.33844 13.4578 6.38527C13.4119 6.39629 13.3417 6.4 13.0133 6.4H10.4533C10.125 6.4 10.0547 6.39629 10.0088 6.38527C9.81382 6.33844 9.66156 6.18619 9.61474 5.99117C9.60371 5.94527 9.6 5.87497 9.6 5.54667V2.98667C9.6 2.65837 9.60371 2.58807 9.61474 2.54216C9.66156 2.34715 9.81382 2.19489 10.0088 2.14807ZM2.93298 8.5333L2.98667 8.53333H5.54667L5.60035 8.5333C5.84403 8.53307 6.0541 8.53286 6.24018 8.57755C6.82522 8.71799 7.28201 9.17478 7.42247 9.75982C7.46714 9.94591 7.46694 10.156 7.4667 10.3996L7.46667 10.4533V13.0133L7.4667 13.067C7.46694 13.3107 7.46714 13.5207 7.42247 13.7069C7.28201 14.2918 6.82522 14.7487 6.24018 14.8892C6.0541 14.9338 5.84403 14.9337 5.60035 14.9333H5.54667H2.98667H2.93298C2.6893 14.9337 2.47925 14.9338 2.29315 14.8892C1.70812 14.7487 1.25133 14.2918 1.11088 13.7069C1.0662 13.5207 1.06641 13.3107 1.06664 13.067L1.06667 13.0133V10.4533L1.06664 10.3996C1.06641 10.156 1.0662 9.94591 1.11088 9.75982C1.25133 9.17478 1.70812 8.71799 2.29315 8.57755C2.47925 8.53286 2.6893 8.53307 2.93298 8.5333ZM2.98667 9.6C2.65837 9.6 2.58808 9.60371 2.54217 9.61474C2.34715 9.66156 2.19489 9.81381 2.14808 10.0088C2.13705 10.0547 2.13334 10.125 2.13334 10.4533V13.0133C2.13334 13.3417 2.13705 13.4119 2.14808 13.4578C2.19489 13.6528 2.34715 13.8051 2.54217 13.8519C2.58808 13.8629 2.65837 13.8667 2.98667 13.8667H5.54667C5.87498 13.8667 5.94527 13.8629 5.99117 13.8519C6.18619 13.8051 6.33845 13.6528 6.38527 13.4578C6.39629 13.4119 6.4 13.3417 6.4 13.0133V10.4533C6.4 10.125 6.39629 10.0547 6.38527 10.0088C6.33845 9.81381 6.18619 9.66156 5.99117 9.61474C5.94527 9.60371 5.87498 9.6 5.54667 9.6H2.98667ZM10.4533 8.53333L10.3997 8.5333C10.156 8.53307 9.94591 8.53286 9.75982 8.57755C9.17479 8.71799 8.718 9.17478 8.57755 9.75982C8.53287 9.94591 8.53307 10.156 8.5333 10.3996L8.53334 10.4533V13.0133L8.5333 13.067C8.53307 13.3107 8.53287 13.5207 8.57755 13.7069C8.718 14.2918 9.17479 14.7487 9.75982 14.8892C9.94591 14.9338 10.156 14.9337 10.3997 14.9333H10.4533H13.0133H13.067C13.3107 14.9337 13.5207 14.9338 13.7069 14.8892C14.2918 14.7487 14.7487 14.2918 14.8892 13.7069C14.9338 13.5207 14.9337 13.3107 14.9333 13.067V13.0133V10.4533V10.3996C14.9337 10.156 14.9338 9.94591 14.8892 9.75982C14.7487 9.17478 14.2918 8.71799 13.7069 8.57755C13.5207 8.53286 13.3107 8.53307 13.067 8.5333L13.0133 8.53333H10.4533ZM10.0088 9.61474C10.0547 9.60371 10.125 9.6 10.4533 9.6H13.0133C13.3417 9.6 13.4119 9.60371 13.4578 9.61474C13.6528 9.66156 13.8051 9.81381 13.8519 10.0088C13.8629 10.0547 13.8667 10.125 13.8667 10.4533V13.0133C13.8667 13.3417 13.8629 13.4119 13.8519 13.4578C13.8051 13.6528 13.6528 13.8051 13.4578 13.8519C13.4119 13.8629 13.3417 13.8667 13.0133 13.8667H10.4533C10.125 13.8667 10.0547 13.8629 10.0088 13.8519C9.81382 13.8051 9.66156 13.6528 9.61474 13.4578C9.60371 13.4119 9.6 13.3417 9.6 13.0133V10.4533C9.6 10.125 9.60371 10.0547 9.61474 10.0088C9.66156 9.81381 9.81382 9.66156 10.0088 9.61474Z"
                    fill="#1D211C"
                  />
                </svg>
                <Text as="label" size="3" weight="medium">
                  Dashboard
                </Text>
              </Flex>
            </Link>
            <Link href="#" underline="none" color="gray">
              <Flex className="navigation-link">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    fill-opacity="0.01"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.8 1.06667C5.09455 1.06667 5.33333 1.30545 5.33333 1.6V2.13333H10.6667V1.6C10.6667 1.30545 10.9055 1.06667 11.2 1.06667C11.4945 1.06667 11.7333 1.30545 11.7333 1.6V2.13333H13.3333C14.217 2.13333 14.9333 2.84967 14.9333 3.73333V13.3333C14.9333 14.217 14.217 14.9333 13.3333 14.9333H2.66667C1.78301 14.9333 1.06667 14.217 1.06667 13.3333V3.73333C1.06667 2.84967 1.78301 2.13333 2.66667 2.13333H4.26667V1.6C4.26667 1.30545 4.50545 1.06667 4.8 1.06667ZM10.6667 3.2V3.73333C10.6667 4.02788 10.9055 4.26667 11.2 4.26667C11.4945 4.26667 11.7333 4.02788 11.7333 3.73333V3.2H13.3333C13.6278 3.2 13.8667 3.43878 13.8667 3.73333V5.33333H2.13333V3.73333C2.13333 3.43878 2.37212 3.2 2.66667 3.2H4.26667V3.73333C4.26667 4.02788 4.50545 4.26667 4.8 4.26667C5.09455 4.26667 5.33333 4.02788 5.33333 3.73333V3.2H10.6667ZM2.13333 6.4V13.3333C2.13333 13.6278 2.37212 13.8667 2.66667 13.8667H13.3333C13.6278 13.8667 13.8667 13.6278 13.8667 13.3333V6.4H2.13333ZM7.46667 8C7.46667 7.70545 7.70545 7.46667 8 7.46667C8.29455 7.46667 8.53333 7.70545 8.53333 8C8.53333 8.29455 8.29455 8.53333 8 8.53333C7.70545 8.53333 7.46667 8.29455 7.46667 8ZM10.1333 7.46667C9.83878 7.46667 9.6 7.70545 9.6 8C9.6 8.29455 9.83878 8.53333 10.1333 8.53333C10.4279 8.53333 10.6667 8.29455 10.6667 8C10.6667 7.70545 10.4279 7.46667 10.1333 7.46667ZM11.7333 8C11.7333 7.70545 11.9722 7.46667 12.2667 7.46667C12.5612 7.46667 12.8 7.70545 12.8 8C12.8 8.29455 12.5612 8.53333 12.2667 8.53333C11.9722 8.53333 11.7333 8.29455 11.7333 8ZM12.2667 9.6C11.9722 9.6 11.7333 9.83878 11.7333 10.1333C11.7333 10.4279 11.9722 10.6667 12.2667 10.6667C12.5612 10.6667 12.8 10.4279 12.8 10.1333C12.8 9.83878 12.5612 9.6 12.2667 9.6ZM9.6 10.1333C9.6 9.83878 9.83878 9.6 10.1333 9.6C10.4279 9.6 10.6667 9.83878 10.6667 10.1333C10.6667 10.4279 10.4279 10.6667 10.1333 10.6667C9.83878 10.6667 9.6 10.4279 9.6 10.1333ZM8 9.6C7.70545 9.6 7.46667 9.83878 7.46667 10.1333C7.46667 10.4279 7.70545 10.6667 8 10.6667C8.29455 10.6667 8.53333 10.4279 8.53333 10.1333C8.53333 9.83878 8.29455 9.6 8 9.6ZM5.33333 10.1333C5.33333 9.83878 5.57212 9.6 5.86667 9.6C6.16122 9.6 6.4 9.83878 6.4 10.1333C6.4 10.4279 6.16122 10.6667 5.86667 10.6667C5.57212 10.6667 5.33333 10.4279 5.33333 10.1333ZM3.73333 9.6C3.43878 9.6 3.2 9.83878 3.2 10.1333C3.2 10.4279 3.43878 10.6667 3.73333 10.6667C4.02788 10.6667 4.26667 10.4279 4.26667 10.1333C4.26667 9.83878 4.02788 9.6 3.73333 9.6ZM3.2 12.2667C3.2 11.9722 3.43878 11.7333 3.73333 11.7333C4.02788 11.7333 4.26667 11.9722 4.26667 12.2667C4.26667 12.5612 4.02788 12.8 3.73333 12.8C3.43878 12.8 3.2 12.5612 3.2 12.2667ZM5.86667 11.7333C5.57212 11.7333 5.33333 11.9722 5.33333 12.2667C5.33333 12.5612 5.57212 12.8 5.86667 12.8C6.16122 12.8 6.4 12.5612 6.4 12.2667C6.4 11.9722 6.16122 11.7333 5.86667 11.7333ZM7.46667 12.2667C7.46667 11.9722 7.70545 11.7333 8 11.7333C8.29455 11.7333 8.53333 11.9722 8.53333 12.2667C8.53333 12.5612 8.29455 12.8 8 12.8C7.70545 12.8 7.46667 12.5612 7.46667 12.2667ZM10.1333 11.7333C9.83878 11.7333 9.6 11.9722 9.6 12.2667C9.6 12.5612 9.83878 12.8 10.1333 12.8C10.4279 12.8 10.6667 12.5612 10.6667 12.2667C10.6667 11.9722 10.4279 11.7333 10.1333 11.7333Z"
                    fill="#1D211C"
                  />
                </svg>
                <Text as="label" size="3" weight="medium">
                  Calendar
                </Text>
              </Flex>
            </Link>

            <Link href="#" underline="none" color="gray">
              <Flex className="navigation-link">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    fill-opacity="0.01"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.2 2.66666C3.2 2.37212 3.43878 2.13333 3.73333 2.13333H12.2667C12.5612 2.13333 12.8 2.37212 12.8 2.66666V14.4C12.8 14.5939 12.6948 14.7725 12.5252 14.8665C12.3556 14.9604 12.1484 14.955 11.984 14.8523L8 12.3622L4.016 14.8523C3.8516 14.955 3.64436 14.9604 3.4748 14.8665C3.30522 14.7725 3.2 14.5939 3.2 14.4V2.66666ZM4.26667 3.2V13.4378L7.43467 11.4577C7.78056 11.2416 8.21945 11.2416 8.56533 11.4577L11.7333 13.4378V3.2H4.26667Z"
                    fill="#1D211C"
                  />
                </svg>
                <Text as="label" size="3" weight="medium">
                  Events
                </Text>
              </Flex>
            </Link>
            <Link href="#" underline="none" color="gray">
              <Flex className="navigation-link">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    fill-opacity="0.01"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.33333 1.06667C5.33333 0.477563 5.8109 0 6.4 0H9.6C10.1891 0 10.6667 0.477563 10.6667 1.06667V2.13333H14.9333C15.5225 2.13333 16 2.6109 16 3.2V6.4C16 7.34805 15.5873 8.19983 14.9333 8.78515V12.2667C14.9333 13.1503 14.217 13.8667 13.3333 13.8667H2.66667C1.78301 13.8667 1.06667 13.1503 1.06667 12.2667V8.78496C0.412768 8.19969 0 7.34809 0 6.4V3.2C0 2.6109 0.477564 2.13333 1.06667 2.13333H5.33333V1.06667ZM9.6 1.06667V2.13333H6.4V1.06667H9.6ZM1.06667 3.2H5.33333H5.86667H10.1333H10.6667H14.9333V6.4C14.9333 7.0976 14.599 7.71698 14.0797 8.10709C13.7232 8.37487 13.2809 8.53333 12.8 8.53333H8.53333V8C8.53333 7.70545 8.29455 7.46667 8 7.46667C7.70545 7.46667 7.46667 7.70545 7.46667 8V8.53333H3.2C2.71925 8.53333 2.27691 8.37475 1.92031 8.1069C1.40091 7.71676 1.06667 7.09756 1.06667 6.4V3.2ZM7.46667 9.6H3.2C2.82625 9.6 2.46711 9.5357 2.13333 9.41765V12.2667C2.13333 12.5612 2.37212 12.8 2.66667 12.8H13.3333C13.6278 12.8 13.8667 12.5612 13.8667 12.2667V9.41776C13.5329 9.53577 13.1738 9.6 12.8 9.6H8.53333V10.1333C8.53333 10.4279 8.29455 10.6667 8 10.6667C7.70545 10.6667 7.46667 10.4279 7.46667 10.1333V9.6Z"
                    fill="#1D211C"
                  />
                </svg>
                <Text as="label" size="3" weight="medium">
                  Offers & Deals
                </Text>
              </Flex>
            </Link>
            <Link href="#" underline="none" color="gray">
              <Flex className="navigation-link">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    fill-opacity="0.01"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.86667 3.2C4.98301 3.2 4.26667 3.91634 4.26667 4.8C4.26667 5.68366 4.98301 6.4 5.86667 6.4C6.75032 6.4 7.46667 5.68366 7.46667 4.8C7.46667 3.91634 6.75032 3.2 5.86667 3.2ZM3.2 5.33333C3.21782 5.33333 3.23544 5.33246 3.25282 5.33075C3.4989 6.54922 4.57565 7.46666 5.86667 7.46666C7.15768 7.46666 8.23443 6.54922 8.48051 5.33075C8.49789 5.33246 8.51551 5.33333 8.53333 5.33333H14.4C14.6945 5.33333 14.9333 5.09455 14.9333 4.8C14.9333 4.50545 14.6945 4.26666 14.4 4.26666H8.53333C8.51551 4.26666 8.49789 4.26754 8.48051 4.26925C8.23443 3.05076 7.15768 2.13333 5.86667 2.13333C4.57565 2.13333 3.4989 3.05076 3.25282 4.26925C3.23544 4.26754 3.21782 4.26666 3.2 4.26666H1.6C1.30545 4.26666 1.06667 4.50545 1.06667 4.8C1.06667 5.09455 1.30545 5.33333 1.6 5.33333H3.2ZM12.7472 11.7308C12.5011 12.9492 11.4243 13.8667 10.1333 13.8667C8.84231 13.8667 7.76557 12.9492 7.51949 11.7308C7.50211 11.7325 7.48449 11.7333 7.46667 11.7333H1.6C1.30545 11.7333 1.06667 11.4945 1.06667 11.2C1.06667 10.9055 1.30545 10.6667 1.6 10.6667H7.46667C7.48449 10.6667 7.50211 10.6675 7.51949 10.6692C7.76557 9.45077 8.84231 8.53333 10.1333 8.53333C11.4243 8.53333 12.5011 9.45077 12.7472 10.6692C12.7646 10.6675 12.7822 10.6667 12.8 10.6667H14.4C14.6945 10.6667 14.9333 10.9055 14.9333 11.2C14.9333 11.4945 14.6945 11.7333 14.4 11.7333H12.8C12.7822 11.7333 12.7646 11.7325 12.7472 11.7308ZM8.53333 11.2C8.53333 10.3163 9.24967 9.6 10.1333 9.6C11.017 9.6 11.7333 10.3163 11.7333 11.2C11.7333 12.0836 11.017 12.8 10.1333 12.8C9.24967 12.8 8.53333 12.0836 8.53333 11.2Z"
                    fill="#1D211C"
                  />
                </svg>
                <Text as="label" size="3" weight="medium">
                  Settings
                </Text>
              </Flex>
            </Link>
          </Box>

          <Box className="events">
            <Text as="label" className="eventLabel" weight="bold" size="1">
              {" "}
              Today's Event
            </Text>
            <Card className="card-items">
              {" "}
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src="Avatar (2).png"
                  radius="medium"
                  fallback="T"
                />
                <Box>
                  <Text as="div" size="1" color="gray">
                    Tourist
                  </Text>
                  <Text as="div" size="2" weight="bold">
                    The Viper Room
                  </Text>
                </Box>
              </Flex>
            </Card>
            <Card>
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src="Avatar.png"
                  radius="medium"
                  fallback="T"
                />
                <Box>
                  <Text as="div" size="1" color="gray">
                    Jason Isbell
                  </Text>
                  <Text as="div" size="2" weight="bold">
                    The Wiltern
                  </Text>
                </Box>
              </Flex>
            </Card>
            <Card>
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src="Avatar (1).png"
                  radius="medium"
                  fallback="T"
                />
                <Box>
                  <Text as="div" size="1" color="gray">
                    Brenn!
                  </Text>
                  <Text as="div" size="2" weight="bold">
                    The Troubadour
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
        </div>

        <div id="bottom">
          <div className="tertiaryLinks">
            <Text as="label" size="2">
              <Flex gap="2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onClick={handleThemeChange}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                  <Text>Dark Mode</Text>
                </label>
              </Flex>
            </Text>
            <Flex direction="column" gap="2">
              <Link
                href="#"
                size="1"
                underline="none"
                weight="regular"
                color="cyan"
              >
                Terms of Use
              </Link>
              <Link
                href="#"
                size="1"
                underline="none"
                weight="regular"
                color="cyan"
              >
                Privacy Policy
              </Link>
            </Flex>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
