import data from "data/global.json";

export function withGlobalProps(pageProps: any) {
  return {
    globalProps: data,
    ...pageProps,
  };
}
