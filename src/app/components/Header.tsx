import React from 'react';
import { Flex, Avatar, TextField, Kbd, IconButton, Text } from '@radix-ui/themes';
import { BellIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

const Header = () => {
  return (
    <Flex className="header" justify="between" p="24px 32px 24px 0" width="1166px" height="88px" gap="552px" flexGrow='0'>
      <Flex direction="column" gap="8px" width="393px" height="40px">
        <TextField.Root placeholder="Search ShowOps" size="3">
          <TextField.Slot>
            <MagnifyingGlassIcon height={16} width={16} />
          </TextField.Slot>
          <TextField.Slot>
            <IconButton size="1" variant="ghost">
              <Kbd size="3" style={{ boxShadow: 'none' }}>
                <Text size="3" weight="regular">
                  ⌘ S
                </Text>
              </Kbd>
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex gap="16px" width="96px" height="40">
        
        <IconButton size="3" color="gray" variant="soft">
          <a href="#">
            <BellIcon height={18} width={18} />
          </a>
        </IconButton>
        <Avatar
          size="3"
          src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          fallback="A"
          variant="solid"
        />

      </Flex>
    </Flex>
  );
};

export default Header;
