import React, { Suspense } from "react";
import {fetch} from "cross-fetch";
// @ts-ignore
const Profile = React.lazy(() => import("profilemf/Profile"));
// import {Profile} from 'profilemf/Profile';

const isServer = typeof window === "undefined";
interface FragmentLoaderProps {
  url: string;
}

export const FragmentLoader: React.FC<FragmentLoaderProps> = (props) => {
  console.info("in the fragment loader", isServer)
  if (!isServer) {
    console.info("hello")
    return (
      <Suspense>
        <Profile name="Max Pillmott"/>
      </Suspense>
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
