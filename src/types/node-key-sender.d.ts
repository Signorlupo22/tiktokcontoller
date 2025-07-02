declare module 'node-key-sender' {
  export function sendCombination(keys: string[]): void;
  export function sendKey(key: string): void;
  export function sendKeys(text: string): void;
  export default {
    sendCombination,
    sendKey,
    sendKeys
  };
} 