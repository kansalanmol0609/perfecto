//libs
import {memo, useCallback} from 'react';
import {useRouter} from 'next/router';
import Dinero from 'dinero.js';

//components
import {Box, Button, Image, Stack} from '@chakra-ui/react';

//icons
import {DeleteIcon, EditIcon} from '@chakra-ui/icons';

//hooks
import {MODAL_TYPES, useGlobalModalContext} from '@/contexts/globalModalContext';
import {useDeleteFoodItem} from '@/hooks/useDeleteFoodItem';

//types
import {Food} from '@prisma/client';

// eslint-disable-next-line react/display-name
const FoodItemCard = memo(({item}: {item: Food}): JSX.Element => {
  const {openModal} = useGlobalModalContext();
  const router = useRouter();

  const {deleteFoodItem, loading: isDeleting} = useDeleteFoodItem();

  const handleEditFoodItem = useCallback(
    () => router.push(`/admin/editFood/${item.id}`),
    [item.id, router],
  );

  const openDeleteConfirmationModal = useCallback(
    () =>
      openModal({
        type: MODAL_TYPES.CONFIRMATION_MODAL,
        payload: {
          props: {
            primaryButtonLabel: 'Delete',
            handleConfirmation: () =>
              deleteFoodItem({
                variables: {
                  foodItemId: item.id,
                },
              }),
            confirmationLabel:
              'Are you sure you want to delete this? This is an irreversible action.',
            isConfirmationInProgress: isDeleting,
          },
        },
      }),
    [deleteFoodItem, isDeleting, item.id, openModal],
  );

  return (
    <Box display="flex" borderWidth={1} borderStyle="solid" borderColor="black.400" width="full">
      <Image
        src={`https://preview.colorlib.com/theme/feliciano/images/${item.category.toLowerCase()}-${
          (+item.name.length % 5) + 1
        }.jpg.webp`}
        alt={item.name}
        width="50%"
        objectFit="cover"
        _hover={{
          scale: 1.2,
        }}
      />

      <Box
        width="50%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap={2}
        p={4}
        flex={1}
        backgroundColor="white"
      >
        <Box display="flex" flexDirection="column" gap={2} backgroundColor="white">
          <Box display="flex" gap={2} justifyContent="space-between">
            <Box fontWeight="bold" fontSize="lg">
              {item.name}
            </Box>
            <Box color="brand.500" mt="0.5" fontWeight="semibold">
              {Dinero({
                //@ts-ignore
                amount: +item.price?.amount * 100,
                //@ts-ignore
                currency: item.price?.currency,
              }).toFormat()}
            </Box>
          </Box>

          <Box>{item.description}</Box>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            leftIcon={<EditIcon />}
            colorScheme="brand"
            variant="outline"
            onClick={handleEditFoodItem}
          >
            Edit
          </Button>

          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="brand"
            variant="solid"
            onClick={openDeleteConfirmationModal}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Box>
  );
});

export default memo(FoodItemCard);
