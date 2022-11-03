import React, { Suspense } from "react";
import {fetch} from "cross-fetch";
// @ts-ignore
import { Profile } from "profilemf/Profile";

const isServer = typeof window === "undefined";
interface FragmentLoaderProps {
  url: string;
}

export const FragmentLoader: React.FC<FragmentLoaderProps> = (props) => {
  if (!isServer) {
    return (
      <Profile name="Max Willmott"/>
    )
  }

  const Fragment = renderFragment(props.url);

  return (
    <Suspense>
      <Fragment />
    </Suspense>
  );
};

function renderFragment(url: string) {
  return React.lazy(async () => {
    const fragment = (await fetchFragment(url));
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
  const res = await fetch(url)
  return await res.text();
}
