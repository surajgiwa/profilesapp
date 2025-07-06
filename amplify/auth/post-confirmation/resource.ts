import { defineFunction } from '@aws-amplify/backend';

export const postConfirmation = defineFunction({
  name: 'post-confirmation',
  entry: './handler.ts', // <- IMPORTANT: point to the handler file
});
export default postConfirmation;