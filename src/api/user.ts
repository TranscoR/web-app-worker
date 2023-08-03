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

export const updateUserInfo = (uid: any, info: any) => {
  // console.log("info", info);
  return new Promise((resolve, reject) => {
    db.collection("workers")
      .doc(uid)
      .update({
        ...info,
      })
      .then(() => {
        resolve(uid);
      })
      .catch((error: any) => {
        console.log(error);
        reject(error);
      });
  });
};

export const addCharger = (uid: any, charger: any, charger_id: any) => {
  return new Promise((resolve, reject) => {
    const docRef = db
      .collection("workers")
      .doc(uid)
      .collection("chargers")
      .doc(charger_id);

    docRef
      .set(charger)
      .then(() => {
        resolve(charger_id);
      })
      .catch((error) => error);
  });
};

export const getRangeChargers = (uid: any, star_date: any, end_date: any) => {
  return new Promise((resolve, reject) => {
    db.collection("workers")
      .doc(uid)
      .collection("chargers")
      .where("created_at", ">", star_date)
      .where("created_at", "<", end_date)
      .onSnapshot((snap) => {
        let response: any = [];
        snap.forEach((doc) => {
          response.push({ ...doc.data() });
        });
        resolve(response);
      });
  });
};
