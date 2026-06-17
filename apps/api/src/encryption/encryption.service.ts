import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EncryptedStringPayload } from './types';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH_BYTES = 12;
const KEY_LENGTH_BYTES = 32;
const ENCODING = 'base64';

@Injectable()
export class EncryptionService {
  private readonly key: Buffer;

  constructor(private readonly configService: ConfigService) {
    const rawKey = this.configService.get<string>('LORECRAFT_ENCRYPTION_KEY');

    if (!rawKey) {
      throw new Error('LORECRAFT_ENCRYPTION_KEY is not provided in .env');
    }

    const key = Buffer.from(rawKey, ENCODING);

    if (key.length !== KEY_LENGTH_BYTES) {
      throw new Error(
        'LORECRAFT_ENCRYPTION_KEY must be a base64 encoded 32-byte key',
      );
    }

    this.key = key;
  }

  encryptString(value: string): EncryptedStringPayload {
    const iv = randomBytes(IV_LENGTH_BYTES);
    const cipher = createCipheriv(ALGORITHM, this.key, iv);

    const encrypted = Buffer.concat([
      cipher.update(value, 'utf8'),
      cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();

    return {
      encryptedValue: encrypted.toString(ENCODING),
      iv: iv.toString(ENCODING),
      authTag: authTag.toString(ENCODING),
    };
  }

  decryptString(payload: EncryptedStringPayload): string {
    const iv = Buffer.from(payload.iv, ENCODING);
    const encryptedValue = Buffer.from(payload.encryptedValue, ENCODING);
    const authTag = Buffer.from(payload.authTag, ENCODING);

    const decipher = createDecipheriv(ALGORITHM, this.key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(encryptedValue),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }
}
