import React from "react";
import { ChakraProvider, Container, Text, VStack, Box, Select, Image, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import { FaMonument, FaBuilding, FaLandmark } from "react-icons/fa";

// Define a dark theme
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

const countries = [
  {
    name: "Moldova",
    facts: "Moldova is a landlocked country in Eastern Europe, bordered by Romania to the west and Ukraine to the north, east, and south.",
    sights: [
      { type: "statue", name: "Stephen the Great Monument", image: "https://images.unsplash.com/photo-1618284918939-418c2e038cec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxTdGVwaGVuJTIwdGhlJTIwR3JlYXQlMjBNb251bWVudCUyME1vbGRvdmF8ZW58MHx8fHwxNzE4MTQ3NDU4fDA&ixlib=rb-4.0.3&q=80&w=1080" },
      { type: "building", name: "National Museum of History", image: "https://images.unsplash.com/photo-1541726156-b8aff4dcce65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxOYXRpb25hbCUyME11c2V1bSUyMG9mJTIwSGlzdG9yeSUyME1vbGRvdmF8ZW58MHx8fHwxNzE4MTQ3NDU4fDA&ixlib=rb-4.0.3&q=80&w=1080" },
      { type: "landmark", name: "Old Orhei", image: "https://images.unsplash.com/photo-1628172686514-694600d03ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxPbGQlMjBPcmhlaSUyME1vbGRvdmF8ZW58MHx8fHwxNzE4MTQ3NDU5fDA&ixlib=rb-4.0.3&q=80&w=1080" },
    ],
  },
  // Add more countries here
];

const CountryPage = () => {
  const { countryName } = useParams();
  const country = countries.find((c) => c.name === countryName);
  const [filter, setFilter] = React.useState("");

  if (!country) {
    return <Text>Country not found</Text>;
  }

  const filteredSights = filter ? country.sights.filter((sight) => sight.type === filter) : country.sights;

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} align="start">
        <Text fontSize="3xl">{country.name}</Text>
        <Text>{country.facts}</Text>
        <Select placeholder="Filter sights" onChange={(e) => setFilter(e.target.value)}>
          <option value="statue">Statues</option>
          <option value="building">Buildings</option>
          <option value="landmark">Landmarks</option>
        </Select>
        {filteredSights.map((sight, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} w="100%">
            <Text fontSize="xl">{sight.name}</Text>
            <Image src={sight.image} alt={sight.name} />
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

const HomePage = () => {
  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Text fontSize="3xl">Sights from the Former Soviet Union</Text>
        {countries.map((country, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} w="100%">
            <Link to={`/country/${country.name}`}>
              <Text fontSize="2xl">{country.name}</Text>
            </Link>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:countryName" element={<CountryPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
