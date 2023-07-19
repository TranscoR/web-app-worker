import { db } from "../../firebase";

export const getStudentList = () => {
  return new Promise((resolve, reject) => {
    db.collection("students")
      .get()
      .then((response: any) => {
        const docSnapshots = response.docs;
        let result = [];
        for (let snapShot of docSnapshots) {
          const doc = snapShot.data();
          result.push(doc);
        }
        resolve(result);
      })
      .catch((error: any) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getStudentInfo = (uid: string) => {
  return new Promise((resolve, reject) => {
    db.collection("students")
      // @ts-ignore
      .doc(uid)
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

export const getSchoolCycleByStudent = (uid: string) => {
  return new Promise((resolve, reject) => {
    db.collection("students")
      // @ts-ignore
      .doc(uid)
      .collection("school_cycle")
      .get()
      .then((response: any) => {
        const docSnapshots = response.docs;
        let result = [];
        for (let snapShot of docSnapshots) {
          const doc = snapShot.data();
          result.push(doc);
        }
        resolve(result);
      })
      .catch((error: any) => {
        console.log(error);
        reject(error);
      });
  });
};

export const updateStudentInfo = (uid: any, info: any) => {
  return new Promise((resolve, reject) => {
    db.collection("students")
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

export const updateStudentSchoolCycle = (
  uid: any,
  info: any,
  cicle_id: string
) => {
  const docRef = db
    .collection("students")
    .doc(uid)
    .collection("school_cycle")
    .doc(cicle_id);

  return new Promise((resolve, reject) => {
    docRef
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
