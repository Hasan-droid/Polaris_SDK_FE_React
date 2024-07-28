import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { extendTheme } from "@chakra-ui/react";
const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.200",
        color: "gray.800",
        fontFamily: "Roboto",
        fontSize: "20px",
      },
    },
  },
  components: {
    Button: {
      variants: {
        brand: {
          borderRadius: "full",
          colorScheme: "teal",
          variant: "solid",
          bg: "#28264E",
          color: "white",
          _hover: { bg: "#434082" },
          _active: { bg: "#1e1c3a" },
        },
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
