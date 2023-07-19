import router from "next/router";
import { useEffect } from "react";

export default function Start() {
  useEffect(() => {
    router.push("/login");
  });
  return <></>;
}
