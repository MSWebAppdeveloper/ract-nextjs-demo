"use client"
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Flex, Link, Switch, Text, } from '@radix-ui/themes';
import { BackpackIcon, BookmarkIcon, CalendarIcon, DashboardIcon, GearIcon, MixerHorizontalIcon, } from '@radix-ui/react-icons';

const navigation = [
  { icon: DashboardIcon, label: 'Dashboard' },
  { icon: CalendarIcon, label: 'Calendar' },
  { icon: BookmarkIcon, label: 'Events' },
  { icon: BackpackIcon, label: 'Offers & Deals' },
  { icon: MixerHorizontalIcon, label: 'Settings' },
]
const events = [
  { name: 'Tourist', venue: 'The Viper Room', avatar: 'Avatar (2).png' },
  { name: 'Jason Isbell', venue: 'The Wiltern', avatar: 'Avatar.png' },
  { name: 'Brenn!', venue: 'The Troubadour', avatar: 'Avatar (1).png' },
]

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  const handleThemeChange = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  return (
    <Box
    //  display={{ initial: 'none', md: 'block' }} 
     style={{ width: 250, flexShrink: 0 }}>
      <Box position="fixed" left="0" bottom="0" style={{ zIndex: 1, top: 'var(--header-height)', overflowX: 'hidden', width: 'inherit', }}      >
        <Flex className="navigationBar" width="250px" direction="column" justify="between" p="16px 24px 32px" gap="84px" position="fixed" left="0" top="0"        >
          <Flex className="top" direction="column" gap="6" m="0px auto" width="202px" flexGrow='0'>
            <Flex className="logo" direction="column" justify="center" p="10px" gap="10px">
              <Flex direction="row" gap="10px">
                <GearIcon width="28px" height="28px" />
                <Text as="span" size="6">
                  ShowOps
                </Text>
              </Flex>
            </Flex>

            <Flex className="NavigationMenu" direction="column" p="0px" gap="2">
              <Flex direction='column' align='start' p='0px' flexGrow='0'>
                {navigation.map((item, index) => (
                  <Box key={index} asChild width="202px">
                    <Link href="/" >
                      <Flex direction="row" align="center" p="8px 16px" gap="16px">
                        <item.icon height="16px" width="16px" />
                        <Text as="div" size="3" color="gray" weight="medium">
                          {item.label}
                        </Text>
                      </Flex>
                    </Link>
                  </Box>
                ))}
              </Flex>
            </Flex>

            <Flex className="events" direction="column" p="0px" gap="2">
              <Flex direction="column" p="4px 16px" gap="10px">
                <Text as="div" color="gray" weight="bold" size="1" align="left">
                  Today&apos;s Event
                </Text>
              </Flex>

              {events.map((event, index) => (
                <Flex key={index} direction="row" align="center" p="12px 16px" gap="16px">
                  <Box asChild width="202px">
                    <a href="#">
                      <Flex gap="3" align="center">
                        <Avatar size="3" src={event.avatar} radius="medium" fallback="T" />
                        <Box>
                          <Text as="div" size="1" weight="light">
                            {event.name}
                          </Text>
                          <Text as="div" size="2" weight="medium">
                            {event.venue}
                          </Text>
                        </Box>
                      </Flex>
                    </a>
                  </Box>
                </Flex>
              ))}
            </Flex>
          </Flex>

          <Flex className="bottom" direction="column" gap="6" m="0 auto" width="202px" flexGrow='0'>
            <Flex direction="column" gap="2" m="0 auto" width="full" >
              <Flex gap="4">
                <Switch size="1" variant="classic" type="button" checked={isDarkMode} onClick={handleThemeChange} />
                <Text size="1" weight="regular">
                  Dark Mode
                </Text>
              </Flex>

              {['Terms of Use', 'Privacy Policy'].map((link, index) => (
                <Link key={index} href="#" size="1" underline="none" weight="regular">
                  {link}
                </Link>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Sidebar;
