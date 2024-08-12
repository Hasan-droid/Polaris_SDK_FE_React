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
  Grid,
} from "@chakra-ui/react";
import { useState } from "react";
import WarningsCard from "./WarningsCard";
import Stepper from "./Stepper";
import axios from "axios";
import { EventSourcePolyfill } from "event-source-polyfill";
import FileUpload from "./FileUpload";
import { ITaskCode, IEventSourceError } from "../types/processApplication.types";
import { TaskCode } from "../utils/enums";

function ProcessApplication() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemClicked, setItemClicked] = useState(false);
  const [showStepper, setShowStepper] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [file, setFile] = useState<File | null>(null);

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
        const [, eventType, , eventData] = event.data.split(":");
        if (eventType === "info") {
          setCurrentStep(eventData);
          if (eventData.toLowerCase() === "service completed") {
            setItemClicked(false);
          }
        } else if (event.data === "ping") {
          console.log("Ping Received");
          //received error event
        } else {
          console.log("Error Event Received", event);
        }
      };
      eventSource.onerror = (error) => {
        const eventError = error as IEventSourceError;
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

  const handleClean = async (TaskCode: ITaskCode): Promise<void> => {
    if (!file) {
      console.log("No File Selected");
      return;
    }
    setItemClicked(true);
    setCurrentStep("verifying user");
    setShowStepper(true);
    const formData = new FormData();
    formData.append(
      "pat",
      "7Tsbdz362meSQVE8YzfKp3FaL4XHNgappmih8KSXWxXHi9h2AfsCvLSY537WwTJAFqJ1WPzMXXXjLQfmLLjC6f2wrEvpDrVzkZkV"
    );
    formData.append("appId", "163b0cee-8f29-452a-84d1-8b986db9fcde");
    formData.append("sdkTask", "warning");
    formData.append("taskCode", TaskCode.warningCode?.toString() || "");
    formData.append("errorFile", file);
    try {
      const serverResponse = await axios.post(import.meta.env.VITE_SERVER_URL + "/services/", formData);
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
              <FileUpload setFile={setFile} />
              <Text fontSize={"xl"} fontWeight="bold" textAlign="left" mb={"4"}>
                Found Warnings
              </Text>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <WarningsCard
                  itemClicked={itemClicked}
                  handleClick={() => handleClean({ warningCode: TaskCode.cw0080 })}
                  taskCode={TaskCode.cw0080}
                  description="turn off event handlers of widgets for non editable data views"
                  warningsNumber={10}
                />
                <WarningsCard
                  itemClicked={itemClicked}
                  handleClick={() => handleClean({ warningCode: TaskCode.cw0114 })}
                  taskCode={TaskCode.cw0114}
                  description="remove module rules that used in microflows that don't used in navigation items"
                  warningsNumber={20}
                />
                <WarningsCard
                  itemClicked={itemClicked}
                  handleClick={() => handleClean({ warningCode: TaskCode.cw0029 })}
                  taskCode={TaskCode.cw0029}
                  description="delete unused module roles"
                  warningsNumber={70}
                />
                <WarningsCard
                  itemClicked={itemClicked}
                  handleClick={() => handleClean({ warningCode: TaskCode.cw0263 })}
                  taskCode={TaskCode.cw0263}
                  description="add english text to empty captions and pages title's"
                  warningsNumber={250}
                />
              </Grid>
              {showStepper && (
                <>
                  <Text fontSize={"xl"} fontWeight="bold" textAlign="left" mb={"4"} mt={"4"}>
                    Processing...
                  </Text>
                  <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                    <Stepper currentStep={currentStep} />
                  </Grid>
                </>
              )}
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
