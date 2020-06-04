import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, DOCUMENT_MODEL, RESOURCE_MODEL } from '../constants';
import { ResourceSchema } from '../db/schemas/resource.schema';
import { DocumentSchema } from '../db/schemas/document.schema';

export const resourcesProviders = [
  {
    provide: RESOURCE_MODEL,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    useFactory: (connection: Connection) => connection.model('Resource', ResourceSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: DOCUMENT_MODEL,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    useFactory: (connection: Connection) => connection.model('Document', DocumentSchema),
    inject: [DATABASE_CONNECTION],
  },
];