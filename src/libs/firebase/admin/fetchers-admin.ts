import { Document, Options } from '@libs/firebase/firebase-types';
import { adminDB } from './firebase-admin';
import { handleCollectionData, handleDocumentData } from './firebase-admin.utils';

export const fetchCollection = async <Data>(
  path: string,
  options: Options
): Promise<Document<Data>[]> => {
  const ref = adminDB.collection(path);
  return handleCollectionData<Data>(ref, options);
};

export const fetchDocument = async <Data>(path: string): Promise<Document<Data>> => {
  const ref = adminDB.doc(path);
  return handleDocumentData<Data>(ref);
};
