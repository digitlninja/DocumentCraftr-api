import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION, ENVIRONMENT } from '../constants';
import { config } from '../config';
const environment = config[ENVIRONMENT];

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    name: 'mongoose',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(environment.database.url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }),
  },
];

