import fs from 'fs';

import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

interface IKafkaConnectionConfig {
  transport: Transport.KAFKA;
  options: {
    client: IKafkaClientConfig;
  };
}

interface IKafkaClientConfig {
  clientId: string;
  brokers: string[];
  ssl?: {
    rejectUnauthorized: boolean;
    ca: string[];
    key: string;
    cert: string;
  };
}

export const getKafkaConnectionConfig = (
  config: ConfigService
): IKafkaConnectionConfig => {
  const client: IKafkaClientConfig = {
    brokers: config.getOrThrow<string>('KAFKA_BROKERS').split(' '),
    clientId: config.getOrThrow<string>('KAFKA_CLIENT_ID')
  };

  const sslEnabled = config.get('KAFKA_SSL') === 'true';

  if (sslEnabled) {
    client.ssl = {
      ca: [fs.readFileSync('KAFKA_SSL_CA', 'utf-8')],
      cert: fs.readFileSync(
        config.getOrThrow('KAFKA_SSL_CLIENT_CERT'),
        'utf-8'
      ),
      key: fs.readFileSync(config.getOrThrow('KAFKA_SSL_CLIENT_KEY'), 'utf-8'),
      rejectUnauthorized: false
    };
  }

  return {
    options: {
      client
    },
    transport: Transport.KAFKA
  };
};
