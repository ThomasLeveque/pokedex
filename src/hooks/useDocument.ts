import useSWR, { ConfigInterface, responseInterface } from 'swr';

import { Document } from '@libs/firebase/firebase-types';
import { fetchDocument } from '@libs/firebase/fetchers';

const useDocument = <Data>(
  documenPath: string,
  swrOptions?: ConfigInterface<Document<Data>>
): responseInterface<Document<Data>, unknown> => {
  return useSWR<Document<Data>>(documenPath, fetchDocument, swrOptions);
};

export default useDocument;
