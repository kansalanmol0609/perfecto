//types
import {Feedback} from '@prisma/client';

//components
import {Box, Image} from '@chakra-ui/react';

export const FeedbackCard = ({feedback}: {feedback: Feedback}): JSX.Element => (
  <Box
    key={feedback.id}
    display="flex"
    borderWidth={1}
    borderStyle="solid"
    borderColor="black.400"
    alignItems="start"
    width="full"
    height={56}
    p={4}
    gap={2}
  >
    <Image
      src={`https://ui-avatars.com/api/?background=AA8F66&color=fff&name=${feedback.name}`}
      rounded="full"
      alt={`${feedback.name}'s profile picture`}
    />

    <Box display="flex" flexDirection="column">
      <Box mb={4}>
        <Box fontWeight="extrabold" fontSize="lg">
          {feedback.name}
        </Box>
        <Box fontWeight="light" fontSize="sm">
          {feedback.email}
        </Box>
      </Box>
      <Box flex={1}>
        <Box fontWeight="semibold" fontSize="sm">
          {feedback.subject}
        </Box>
        <Box fontSize="sm">{feedback.message}</Box>
      </Box>
    </Box>
  </Box>
);
