import { firestore } from "../utils/firebase";
import { collectIdsAndDocs } from "../utils/utilities";

export async function fetchEmployees(language) {
  const snapshot = await firestore.collection("employees").get();
  const posts = snapshot.docs.map(collectIdsAndDocs);

  return posts;

  /*snapshot.forEach(doc => {
    const id = doc.id;
    const data = doc.data();

    console.log({ id, data });
  });*/
}
