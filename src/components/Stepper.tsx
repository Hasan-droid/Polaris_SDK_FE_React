import { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";

function Stepper({ currentStep }: { currentStep: string }) {
  const [steps, setSteps] = useState<string[]>([]);
  useEffect(() => {
    setSteps((prevSteps) => [...prevSteps, currentStep]);
  }, [currentStep]);

  return (
    <>
      {steps.map((step, index) => (
        <Box
          key={index}
          border={"2px"}
          borderColor="gray.200"
          borderRadius={18}
          p={5}
          mb={5}
          boxShadow="lg"
          background="white"
        >
          <Text fontSize={"xl"} fontWeight="bold" textAlign="left" mb={"4"}>
            {step}
          </Text>
        </Box>
      ))}
    </>
  );
}

export default Stepper;
