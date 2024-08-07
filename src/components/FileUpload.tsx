import React, { useRef } from "react";
import { Box, Button, Image, Stack, Text } from "@chakra-ui/react";
import uploadCloud from "../assets/uploadCloud.png";

interface FileUploadProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

function FileUpload({ setFile }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      console.log("event.target.files[0] ", event.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form>
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
            <Button colorScheme="teal" variant="outline" color={"orange"} onClick={handleButtonClick}>
              Select File
            </Button>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              ref={fileInputRef}
              accept=".json,.csv"
            />
          </Stack>
        </Box>
        <Button colorScheme="teal" variant="outline" color={"orange"} mb={"4"}>
          Analysis
        </Button>
      </Stack>
    </form>
  );
}

export default FileUpload;
