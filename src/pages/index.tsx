import router from "next/router";
import { useEffect } from "react";

export default function Start() {
  useEffect(() => {
    // @ts-ignore
    const user_uid =
      typeof window !== "undefined" && localStorage?.getItem("user_uid");

    if (user_uid === null) {
      router.push("/login");
      return;
    } else {
      router.push("/home");
    }
  });
  return <></>;
}
