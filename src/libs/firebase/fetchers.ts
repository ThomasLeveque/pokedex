import { db } from './firebase';
import { Document, Options } from './firebase-types';
import { handleCollectionData, handleDocumentData } from './firebase.utils';

export const fetchCollection = async <Data>(
  path: string,
  options?: Options
): Promise<Document<Data>[]> => {
  const ref = db.collection(path);
  return handleCollectionData<Data>(ref, options);
};

export const fetchDocument = async <Data>(path: string): Promise<Document<Data>> => {
  const ref = db.doc(path);
  return handleDocumentData<Data>(ref);
};
