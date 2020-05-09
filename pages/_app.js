import { ThemeProvider, CSSReset, Flex } from "@chakra-ui/core";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CSSReset />
      <Flex margin="16px" direction="column" justifyContent="space-between">
        <Component {...pageProps} />
      </Flex >
    </ThemeProvider>
  )
}


