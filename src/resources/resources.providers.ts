
import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, DOCUMENT_MODEL } from '../constants';
import { ResourceSchema } from '../db/schemas/resource.schema';

export const resourcesProviders = [
  {
    provide: DOCUMENT_MODEL,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    useFactory: (connection: Connection) => connection.model('Resource', ResourceSchema),
    inject: [DATABASE_CONNECTION],
  },
];