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

const handleCollectionOptions = (
  ref: CollectionReference | Query,
  options: string | Options
): Query => {
  let parsedOptions = options as Options;
  if (typeof options === 'string') {
    parsedOptions = JSON.parse(options) as Options;
  }

  if (parsedOptions.orderBy) {
    ref = ref.orderBy(...parsedOptions.orderBy);
  }
  if (parsedOptions.where) {
    ref = ref.where(...parsedOptions.where);
  }

  if (parsedOptions.limit) {
    ref = ref.limit(parsedOptions.limit);
  }

  return ref;
};

export const handleCollectionData = async <Data>(
  ref: CollectionReference | Query,
  options: string | Options
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
