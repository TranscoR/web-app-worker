import { db } from "../../firebase";

export const getUserInfo = () => {
  // @ts-ignore
  const user_uid =
    typeof window !== "undefined" && localStorage?.getItem("user_uid");

  return new Promise((resolve, reject) => {
    db.collection("workers")
      // @ts-ignore
      .doc(user_uid)
      .get()
      .then((response: any) => {
        resolve(response?.data());
      })
      .catch((error: any) => {
        console.log(error);
        reject(error);
      });
  });
};
