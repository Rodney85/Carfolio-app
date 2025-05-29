declare module 'backblaze-b2' {
  export class B2 {
    constructor(options: { applicationKeyId: string; applicationKey: string });
    authorize(): Promise<any>;
    getUploadUrl(options: { bucketId: string }): Promise<{
      data: {
        uploadUrl: string;
        authorizationToken: string;
      }
    }>;
    // Add other methods as needed
  }
}
