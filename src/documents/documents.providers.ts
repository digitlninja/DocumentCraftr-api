
import { Connection } from 'mongoose';
import { DocumentSchema } from '../db/schemas/document.schema';
import { DATABASE_CONNECTION, DOCUMENT_MODEL } from '../constants';

export const documentsProviders = [
  {
    provide: DOCUMENT_MODEL,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    useFactory: (connection: Connection) => connection.model('Document', DocumentSchema),
    inject: [DATABASE_CONNECTION],
  },
];