import { Card, CardBody, Stack, Text, Divider, Button, Box } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { IWarningsCardProps } from "../types/warningCard.types";

const extendedStyles = css`
  &:hover:disabled {
    background-color: #4a5568; /* Change the background color to red */
    color: white;
    cursor: not-allowed;
  }
`;

function WarningsCard({ itemClicked, handleClick, taskCode, description, warningsNumber }: IWarningsCardProps) {
  return (
    <Card maxW="xs" boxShadow={"lg"} border={"1px"} borderColor={"gray.200"}>
      <CardBody m={"-3"}>
        <Text fontSize={"2xl"} fontWeight="bold" textAlign="center" mb={4} mt={4}>
          {warningsNumber}
        </Text>
        <Divider borderWidth={"1.5px"} borderColor={"gray.300"} />
        <Stack direction="row" alignItems="center" spacing={"3"}>
          <Box w="xs" h="min-content">
            <Stack direction="column" alignItems="left">
              <Text fontSize={"xs"} fontWeight="bold" textAlign="left" mt={4}>
                Code: {taskCode}
              </Text>
              <Text fontSize={"xs"} fontWeight="bold" textAlign="left" mt={0.5}>
                Description: {description}
              </Text>
            </Stack>
          </Box>
          <Button css={extendedStyles} variant="brand" isDisabled={itemClicked} onClick={() => handleClick()}>
            <Text m={"20"} fontSize={"xs"} fontWeight="bold">
              Clean
            </Text>
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default WarningsCard;
