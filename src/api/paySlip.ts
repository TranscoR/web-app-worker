import { db } from "../../firebase";
import { type Student } from "@/types";

export const createPaymentCardsUsers = (students: any, school_cycle: any) => {
  const promises = students.map((student: Student) => {
    const info = {
      first_year: school_cycle.first_year,
      end_year: school_cycle.end_year,
      weeks: [...school_cycle.weeks],
    };

    const docRef = db
      .collection("students")
      .doc(student.uid)
      .collection("school_cycle")
      .doc(`${school_cycle.first_year}${school_cycle.end_year}`);

    return docRef.get().then((doc) => {
      if (doc.exists) {
        // Update
        let docRef = db
          .collection("students")
          .doc(student.uid)
          .collection("school_cycle")
          .doc(`${school_cycle.first_year}${school_cycle.end_year}`);

        db.runTransaction(function (transaction) {
          return transaction.get(docRef).then(function (doc) {
            const weeks_updated = [
              ...school_cycle.weeks,
              // @ts-ignore
              ...doc.data().weeks,
            ];
            transaction.update(docRef, { weeks: weeks_updated });
          });
        })
          .then(function () {
            console.log("Transaction successfully committed!");
          })
          .catch(function (error) {
            console.log("Transaction failed: ", error);
          });
      } else {
        // Set
        db.collection("students")
          .doc(student.uid)
          .collection("school_cycle")
          .doc(`${school_cycle.first_year}${school_cycle.end_year}`)
          .set({
            ...info,
          });
      }
    });
  });

  return Promise.allSettled([promises])
    .then((results) => console.log(results))
    .catch((error) => console.log(error));
};
