import { Text, Box } from "@chakra-ui/react";

function Stepper({ currentStep }: { currentStep: string }) {
  return (
    <>
      <Box border={"2px"} borderColor="gray.200" borderRadius={18} p={5} mb={5} boxShadow="lg" background="white">
        <Text fontSize={"xl"} fontWeight="bold" textAlign="left" mb={"4"}>
          {currentStep}
        </Text>
      </Box>
    </>
  );
}

export default Stepper;
