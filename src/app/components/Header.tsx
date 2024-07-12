import React from 'react';
import { Flex, Box, Avatar } from '@radix-ui/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { BellIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

const Header = () => {
  const headerStyle = {
    height: '88px',
    padding: 'var(--Spacing5) var(--Spacing6) var(--Spacing5) 0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '0 10px',
  };

  const searchIconStyle = {
    marginRight: '10px',
  };

  const searchInputStyle = {
    border: 'none',
    outline: 'none',
    padding: '10px 0',
    backgroundColor: 'transparent',
  };

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  };

  return (
    <Flex style={headerStyle}>
      <Box style={searchContainerStyle}>
        <MagnifyingGlassIcon />
        <input type="text" placeholder="Search" style={searchInputStyle} />
      </Box>
      <Flex gap="2">

        <Avatar color='gray'
          fallback={
            <Box width="24px" height="24px">

              <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.60124 1.25086C8.60124 1.75459 8.26278 2.17927 7.80087 2.30989C10.1459 2.4647 12 4.41582 12 6.79999V10.25C12 11.0563 12.0329 11.7074 12.7236 12.0528C12.931 12.1565 13.0399 12.3892 12.9866 12.6149C12.9333 12.8406 12.7319 13 12.5 13H8.16144C8.36904 13.1832 8.49997 13.4513 8.49997 13.75C8.49997 14.3023 8.05226 14.75 7.49997 14.75C6.94769 14.75 6.49997 14.3023 6.49997 13.75C6.49997 13.4513 6.63091 13.1832 6.83851 13H2.49999C2.2681 13 2.06664 12.8406 2.01336 12.6149C1.96009 12.3892 2.06897 12.1565 2.27638 12.0528C2.96708 11.7074 2.99999 11.0563 2.99999 10.25V6.79999C2.99999 4.41537 4.85481 2.46396 7.20042 2.3098C6.73867 2.17908 6.40036 1.75448 6.40036 1.25086C6.40036 0.643104 6.89304 0.150421 7.5008 0.150421C8.10855 0.150421 8.60124 0.643104 8.60124 1.25086ZM7.49999 3.29999C5.56699 3.29999 3.99999 4.86699 3.99999 6.79999V10.25L4.00002 10.3009C4.0005 10.7463 4.00121 11.4084 3.69929 12H11.3007C10.9988 11.4084 10.9995 10.7463 11 10.3009L11 10.25V6.79999C11 4.86699 9.43299 3.29999 7.49999 3.29999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </Box>
          }
        />
        <Avatar
          size="3"
          src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          fallback="A"
        />
      </Flex>
    </Flex>
  );
};

export default Header;
