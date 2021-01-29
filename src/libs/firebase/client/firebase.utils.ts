import {
  DocumentSnapshot,
  CollectionReference,
  DocumentReference,
  Query,
} from '@firebase/firestore-types';
import { Document, Options } from '@libs/firebase/firebase-types';

const formatDoc = <Data>(doc: DocumentSnapshot): Document<Data> => ({
  id: doc.id,
  exists: doc.exists,
  ...(doc.data() as Data),
});

const handleCollectionOptions = (ref: CollectionReference | Query, options: Options): Query => {
  if (!options) {
    return ref;
  }

  if (options.orderBy) {
    ref = ref.orderBy(...options.orderBy);
  }
  if (options.where) {
    ref = ref.where(...options.where);
  }

  if (options.limit) {
    ref = ref.limit(options.limit);
  }

  return ref;
};

export const handleCollectionData = async <Data>(
  ref: CollectionReference | Query,
  options?: Options
): Promise<Document<Data>[]> => {
  if (options) {
    ref = handleCollectionOptions(ref, options);
  }
  const snapshot = await ref.get();
  const data = snapshot.docs.map((doc: DocumentSnapshot) => formatDoc<Data>(doc));
  return data;
};

export const handleDocumentData = async <Data>(ref: DocumentReference): Promise<Document<Data>> => {
  const doc = await ref.get();
  const data = formatDoc<Data>(doc);
  return data;
};
