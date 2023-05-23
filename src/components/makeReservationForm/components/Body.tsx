//components
import {Box, FormControl, FormLabel, Input, Select} from '@chakra-ui/react';

export const Body = (): JSX.Element => (
  <Box display="grid" gridTemplateColumns={{md: 'repeat(2, 1fr)', sm: '1fr'}} gap={4} py={4}>
    <FormControl>
      <FormLabel>Your Name</FormLabel>
      <Input placeholder="Your Name" type="text" variant="outline" />
    </FormControl>

    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input placeholder="Email" type="email" variant="outline" />
    </FormControl>

    <FormControl>
      <FormLabel>Phone</FormLabel>
      <Input placeholder="Phone" type="number" variant="outline" />
    </FormControl>

    <FormControl>
      <FormLabel>Date</FormLabel>
      <Input placeholder="Date" type="date" variant="outline" />
    </FormControl>

    <FormControl>
      <FormLabel>Time</FormLabel>
      <Input placeholder="Time" type="time" variant="outline" />
    </FormControl>

    <FormControl>
      <FormLabel>Number of Persons</FormLabel>
      <Select placeholder="Number of Persons">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </Select>
    </FormControl>
  </Box>
);
