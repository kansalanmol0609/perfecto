//libs
import {ComponentType, memo, useCallback, useMemo, useState} from 'react';

//components
import {As, Box, Flex, Icon} from '@chakra-ui/react';

type Props = {
  config: Record<
    string,
    {
      title: string;
      icon: As;
      component: ComponentType;
    }
  >;
};

const SideBar = ({config}: Props): JSX.Element => {
  const itemIds = useMemo(() => Object.keys(config), [config]);

  const [activeItemId, setActiveItemId] = useState(itemIds[0]);

  const handleItemClick = useCallback((itemId: string) => setActiveItemId(itemId), []);

  const ActiveComponent = config[activeItemId].component;

  return (
    <Box display="flex" flexDirection="row" gap={4}>
      <Flex
        direction="column"
        fontSize="sm"
        color="gray.600"
        backgroundColor="brand.500"
        py={4}
        pl={2}
      >
        {itemIds.map((itemId: string) => (
          <Flex
            align="center"
            px="8"
            ml="2"
            py="3"
            cursor="pointer"
            color="whiteAlpha.700"
            _hover={{
              bg: 'blackAlpha.300',
              color: 'whiteAlpha.900',
            }}
            {...(activeItemId === itemId && {
              bg: 'blackAlpha.400',
              color: 'whiteAlpha.900',
            })}
            as="button"
            onClick={handleItemClick.bind(null, itemId)}
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            key={itemId}
          >
            <Icon
              mr="2"
              boxSize="4"
              _groupHover={{
                color: 'gray.300',
              }}
              as={config[itemId].icon}
            />
            {config[itemId].title}
          </Flex>
        ))}
      </Flex>

      <Box py={6} minHeight="80vh" flex={1}>
        <Box fontSize="xl" fontWeight="bold" alignSelf="flex-start" mb={8} as="h2">
          {config[activeItemId].title}
        </Box>

        <ActiveComponent />
      </Box>
    </Box>
  );
};

const MemoizedSideBar = memo(SideBar);
export {MemoizedSideBar as SideBar};
