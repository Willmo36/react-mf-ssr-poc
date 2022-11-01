import React, { Suspense } from "react";
import axios from "axios"

const isServer = typeof window === "undefined";
interface FragmentLoaderProps {
  url: string;
}

export const FragmentLoader: React.FC<FragmentLoaderProps> = (props) => {
  if (!isServer) return null;

  const Fragment = renderFragment(props.url);

  return (
    <Suspense>
      <Fragment />
    </Suspense>
  );
};

function renderFragment(url: string) {
  return React.lazy(async () => {
    const fragment = (await fetchFragment(url)).data
    const component = () => (
      <div dangerouslySetInnerHTML={{ __html: fragment }} />
    );
    return {
      default: component,
    };
  });
}

async function fetchFragment(url: string) {
  console.log("fetching fragment ", url);
  return axios.get(url);
}
