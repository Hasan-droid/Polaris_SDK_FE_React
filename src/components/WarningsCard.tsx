import { Card, CardBody, Stack, Text, Divider, Button } from "@chakra-ui/react";

function WarningsCard() {
  return (
    <Card maxW="xs" boxShadow={"lg"} border={"1px"} borderColor={"gray.200"}>
      <CardBody m={"-3"}>
        <Text fontSize={"2xl"} fontWeight="bold" textAlign="center" mb={4} mt={4}>
          200
        </Text>
        <Divider borderWidth={"1.5px"} borderColor={"gray.300"} />
        <Stack direction="row" alignItems="center" spacing={"3"}>
          <Stack direction="column" alignItems="left">
            <Text fontSize={"xs"} fontWeight="bold" textAlign="left" mt={4}>
              Code: CW0080
            </Text>
            <Text fontSize={"xs"} fontWeight="bold" textAlign="left" mt={0.5}>
              Description: This Warning Comes when there's a widget with event handler within not editable data
              view.
            </Text>
          </Stack>
          <Button variant={"brand"}>
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
