export interface EncryptedStringPayload {
  encryptedValue: string;
  iv: string;
  authTag: string;
}
