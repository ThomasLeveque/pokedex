import useSWR, { ConfigInterface, responseInterface } from 'swr';

import { Document } from '@libs/firebase-types';
import { fetchDocument } from '@libs/client/fetchers';

const useDocument = <Data>(
  documenPath: string,
  swrOptions?: ConfigInterface<Document<Data>>
): responseInterface<Document<Data>, any> => {
  return useSWR<Document<Data>>(documenPath, fetchDocument, swrOptions);
};

export default useDocument;