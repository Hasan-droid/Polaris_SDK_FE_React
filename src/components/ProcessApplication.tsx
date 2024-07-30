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
import { useEffect, useState } from "react";
import uploadCloud from "../assets/uploadCloud.png";
import WarningsCard from "./WarningsCard";
import Stepper from "./Stepper";
import axios from "axios";
import { EventSourcePolyfill } from "event-source-polyfill";

interface EventSourceError extends Event {
  error: {
    message: string;
    stack: string;
  };
}

function ProcessApplication() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemClicked, setItemClicked] = useState(false);
  const [showStepper, setShowStepper] = useState(false);
  const [currentStep, setCurrentStep] = useState("");

  const setupEventSourceConnection = async (token: string) => {
    try {
      const eventSource = new EventSourcePolyfill(import.meta.env.VITE_SERVER_URL + "/services/sse", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      eventSource.onopen = (event) => {
        console.log("event", event);
      };
      eventSource.onmessage = (event) => {
        console.log("event", event);
        const eventType = event.data.split(":")[1];
        if (eventType === "info") {
          const eventData = event.data.split(":")[3];
          console.log("eventData", eventData);
          setCurrentStep(eventData);
        } else {
          //received error event
          console.log("Error Event", event.data);
        }
      };
      eventSource.onerror = (error) => {
        const eventError = error as EventSourceError;
        if (eventError.error.message.includes("No activity within 45000 milliseconds")) {
          console.log("EventSource Connection Closed due to inactivity");
          eventSource.close();
        } else {
          console.error("EventSource failed:", error);
          eventSource.close();
        }
      };
    } catch (err) {
      console.log("Error setting up EventSource Connection", err);
    }
  };

  const handleClick = async () => {
    // setItemClicked(true);
    setCurrentStep("verifying user");
    setShowStepper(true);
    const bodyData = {
      pat: "7Tsbdz362meSQVE8YzfKp3FaL4XHNgappmih8KSXWxXHi9h2AfsCvLSY537WwTJAFqJ1WPzMXXXjLQfmLLjC6f2wrEvpDrVzkZkV",
      appId: "163b0cee-8f29-452a-84d1-8b986db9fcde",
      sdkTask: "warning",
      taskCode: "cw0080",
    };
    try {
      const serverResponse = await axios.post(import.meta.env.VITE_SERVER_URL + "/services/", bodyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (serverResponse.status === 200) {
        console.log("Data Posted Successfully", serverResponse.data);
        setCurrentStep("user verified");
        setupEventSourceConnection(serverResponse.data.token);
      }
    } catch (err) {
      console.log("Error posting Data", err);
    }
  };
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
                <WarningsCard itemClicked={itemClicked} handleClick={handleClick} />
                <WarningsCard itemClicked={itemClicked} handleClick={handleClick} />
              </Grid>
              {showStepper && (
                <>
                  <Text fontSize={"xl"} fontWeight="bold" textAlign="left" mb={"4"} mt={"4"}>
                    Processing...
                  </Text>
                  <Stepper currentStep={currentStep} />
                </>
              )}
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
