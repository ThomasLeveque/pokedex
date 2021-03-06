import useSWR, { ConfigInterface, responseInterface } from 'swr';

import { Document, Options } from '@libs/firebase/firebase-types';
import { fetchCollection } from '@libs/firebase/fetchers';

const useCollection = <Data>(
  collectionPath: string,
  dbOptions?: Options,
  swrOptions?: ConfigInterface<Document<Data>[]>
): responseInterface<Document<Data>[], unknown> => {
  return useSWR<Document<Data>[]>(
    collectionPath,
    (path: string) => fetchCollection(path, dbOptions),
    swrOptions
  );
};

export default useCollection;
