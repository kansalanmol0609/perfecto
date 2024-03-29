//libs
import {useCallback, useState} from 'react';
import Head from 'next/head';
import {useQuery, gql} from '@apollo/client';
import _range from 'lodash/range';

//components
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Checkbox,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import {SendEmailToSubscribersForm} from '@/components/sendEmailToSubscribersForm';

//hocs
import {withAuthentication} from '@/decorators/withAuthentication';

//constants
import {ROUTE_TYPE} from '@/decorators/withAuthentication/withAuthentication';

//icons
import {WarningTwoIcon} from '@chakra-ui/icons';

//types
import {NewsLetterSubscriber} from '@prisma/client';

const GET_NEWS_LETTER_SUBSCRIBERS = gql`
  query GetNewsLetterSubscribers {
    getNewsLetterSubscribers: readNewsLetterSubscribers {
      email
      createdAt
    }
  }
`;

const NewsLetterPageBody = withAuthentication({
  routeType: ROUTE_TYPE.ADMIN,
})(() => {
  const {data, loading, error, refetch} = useQuery<{
    getNewsLetterSubscribers: NewsLetterSubscriber[];
  }>(GET_NEWS_LETTER_SUBSCRIBERS);

  const [emailAddressesToExclude, setEmailAddressesToExclude] = useState<string[]>([]);

  const allChecked = emailAddressesToExclude.length === 0;
  const isIndeterminate =
    !allChecked && emailAddressesToExclude.length !== data?.getNewsLetterSubscribers?.length;

  const handleRefetch = useCallback(() => refetch(), [refetch]);

  const renderBody = useCallback((): JSX.Element => {
    if (loading) {
      return (
        <>
          <Skeleton width="full" height={6} />

          <Box pl={6}>
            {_range(10).map((idx: number) => (
              <Skeleton width="full" height={6} key={idx} my={2} />
            ))}
          </Box>
        </>
      );
    }

    if (error) {
      return (
        <Box mx="auto" textAlign="center">
          <WarningTwoIcon color="brand.500" boxSize={20} />
          <Box fontWeight="bold" my={4}>
            Oops! An Error Occurred!
          </Box>
          <Button colorScheme="brand" variant="outline" onClick={handleRefetch}>
            Retry
          </Button>
        </Box>
      );
    }

    return (
      <>
        <Checkbox
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          colorScheme="brand"
          onChange={(e) =>
            allChecked && !!data?.getNewsLetterSubscribers
              ? setEmailAddressesToExclude(data.getNewsLetterSubscribers.map((sub) => sub.email))
              : setEmailAddressesToExclude([])
          }
          fontWeight="bold"
        >
          Select All
        </Checkbox>

        <Stack pl={6} mt={2} spacing={2}>
          {data?.getNewsLetterSubscribers.map((subscriber: NewsLetterSubscriber) => (
            <Checkbox
              colorScheme="brand"
              key={subscriber.email}
              isChecked={!emailAddressesToExclude.includes(subscriber.email)}
              onChange={(e) =>
                setEmailAddressesToExclude((prevValue) =>
                  prevValue.includes(subscriber.email)
                    ? prevValue.filter((email) => email !== subscriber.email)
                    : [...prevValue, subscriber.email],
                )
              }
            >
              {subscriber.email}
            </Checkbox>
          ))}
        </Stack>
      </>
    );
  }, [
    allChecked,
    data?.getNewsLetterSubscribers,
    error,
    handleRefetch,
    isIndeterminate,
    loading,
    emailAddressesToExclude,
  ]);

  return (
    <Box py={16} px={4} maxWidth={1100} mx="auto">
      <Box display="flex" flexDirection={{sm: 'column', md: 'row'}} gap={8}>
        <Box flex={2}>
          <SendEmailToSubscribersForm
            emailAddressesToExclude={emailAddressesToExclude}
            subscribers={data?.getNewsLetterSubscribers!}
          />
        </Box>

        <Box flex={1}>
          <Box fontWeight="bold" fontSize="xl">
            Select Email Addresses
          </Box>

          <Box py={8} maxHeight="md" overflow="auto">
            <Box display="flex" flexDirection="column" gap={2}>
              {renderBody()}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

function NewsLetterPage() {
  return (
    <>
      <Head>
        <title>Newsletter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <Box
          height="400px"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundImage="https://preview.colorlib.com/theme/feliciano/images/bg_3.jpg.webp"
          backgroundAttachment="fixed"
          width="full"
          display="flex"
          alignItems="center"
        >
          <Stack
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="flex-end"
            height="full"
            width="full"
            backgroundColor="blackAlpha.700"
            pb={8}
          >
            <Box fontSize="4xl" fontWeight="extrabold" color="white">
              Manage Newsletter
            </Box>

            <Breadcrumb fontSize="xs" color="white" textTransform="uppercase">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/newsletter">Newsletter</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>
        </Box>

        <NewsLetterPageBody />
      </Box>
    </>
  );
}

export default NewsLetterPage;
