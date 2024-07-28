import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  TabIndicator,
  Box,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Image,
  Button,
  Grid,
} from "@chakra-ui/react";
import { useState } from "react";
import uploadCloud from "../assets/uploadCloud.png";
import WarningsCard from "./WarningsCard";
import Stepper from "./Stepper";

function ProcessApplication() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <Box
        border={"0.5px"}
        borderColor="gray.400"
        borderRadius={18}
        p={5}
        mb={5}
        boxShadow="xl"
        background="white"
      >
        <Text fontSize={"xl"} fontWeight="bold" textAlign="left" mb={4} mt={4}>
          Process Application
        </Text>
        <Tabs variant="unstyled">
          <TabList as={HStack} spacing={40}>
            <Tab color={activeIndex === 0 ? "#F08C00" : "#E0BA85"} onClick={() => setActiveIndex(0)}>
              Warnings
            </Tab>
            <Tab color={activeIndex === 1 ? "#3689C9" : "#5cb8ff"} onClick={() => setActiveIndex(1)} isDisabled>
              Performance
            </Tab>
            <Tab color={activeIndex === 2 ? "###" : "##3bde51"} isDisabled>
              Maintainability
            </Tab>
            <Tab color={activeIndex === 3 ? "####" : "#f985b0"} isDisabled>
              Applications Status
            </Tab>
          </TabList>
          <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
          <TabPanels>
            <TabPanel>
              <Stack direction="row" alignItems="center" spacing={"6"} mb="sm">
                <Text fontSize={"md"} fontWeight="bold" textAlign="left" mb={4} mt={4}>
                  File Type:
                </Text>
                <RadioGroup>
                  <Stack direction="row">
                    <Radio value="1">CSV</Radio>
                    <Radio value="2">JSON</Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={"6"} mb="sm">
                <Box
                  borderStyle={"dashed"}
                  borderColor={"#ffbb5c"}
                  borderWidth={"1px"}
                  borderRadius={"md"}
                  p={4}
                  mb={4}
                  width={"fit-content"}
                >
                  <Stack direction="row" alignItems="center" spacing={"6"} mb="sm">
                    <Image src={uploadCloud} />
                    <Stack direction="column" alignItems="center" mb="sm" spacing={"-0.5"}>
                      <Text fontSize={"md"} fontWeight="bold" textAlign="left">
                        Select a file or drag and drop here
                      </Text>
                      <Text color={"gray"} fontSize={"sm"} textAlign="left">
                        Json, or Csv, file size no more than 10MB
                      </Text>
                    </Stack>
                    <Button colorScheme="teal" variant="outline" color={"orange"}>
                      Select File
                    </Button>
                  </Stack>
                </Box>
                <Button colorScheme="teal" variant="outline" color={"orange"} mb={"4"}>
                  Analysis
                </Button>
              </Stack>
              <Text fontSize={"xl"} fontWeight="bold" textAlign="left" mb={"4"}>
                Found Warnings
              </Text>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <WarningsCard />
                <WarningsCard />
              </Grid>
              <Text fontSize={"xl"} fontWeight="bold" textAlign="left" mb={"4"} mt={"4"}>
                Processing...
              </Text>
              <Stepper currentStep="start processing" />
              <p>Warnings!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>Application Status</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default ProcessApplication;
