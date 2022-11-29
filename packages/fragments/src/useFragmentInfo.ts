import { useEffect } from "react"

export const useFragmentInfo = (namespace: string, data: any) => {
  useEffect(() => {
    console.info(`${namespace}::mount`, data);
    return () => {
      console.info(`${namespace}::unmount`, data)
    }
  }, [])
  useEffect(() => {
    console.info(`${namespace}::render`, data);
  });
}