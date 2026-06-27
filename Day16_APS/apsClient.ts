export interface AccessTokenResponse {
  accessToken: string;
  expiresIn: number;
  tokenType: "Bearer";
}

export interface UploadResult {
  objectId: string;
  objectKey: string;
}

export interface TranslateResult {
  urn: string;
}

export interface ManifestStatus {
  status: "pending" | "inprogress" | "success" | "failed";
  progress: string;
}

export interface ViewerTokenResponse {
  accessToken: string;
  expiresIn: number;
}

//  Authentication
/*
 * Gets a 3-legged OAuth access token.
 *
 * APS Endpoint:
 * POST /authentication/v2/token
 *
 * Required OAuth Scope:
 * data:read data:write data:create bucket:create bucket:read
 *
 * Returns:
 * Promise<AccessTokenResponse>
 *
 * Retrieves an OAuth access token used for authenticated APS requests.
 */
export async function getAccessToken(): Promise<AccessTokenResponse> {
  throw new Error("Not implemented");
}

//   Object Storage Service (OSS)
/*
 * Uploads a model file into an APS OSS bucket.
 *
 * APS Endpoint:
 * PUT /oss/v2/buckets/{bucketKey}/objects/{objectName}
 *
 * Required OAuth Scope:
 * data:write
 *
 * Returns:
 * Promise<UploadResult>
 *
 * Uploads the specified CAD/BIM model into cloud storage.
 */
export async function uploadModel(
  filePath: string,
  bucketKey: string,
): Promise<UploadResult> {
  throw new Error("Not implemented");
}

//   Model Derivative API
/*
 * Starts translation of an uploaded model.
 *
 * APS Endpoint:
 * POST /modelderivative/v2/designdata/job
 *
 * Required OAuth Scope:
 * data:read
 *
 * Returns:
 * Promise<TranslateResult>
 *
 * Requests APS to convert the uploaded model into a viewable format.
 */
export async function translateModel(urn: string): Promise<TranslateResult> {
  throw new Error("Not implemented");
}

/*
 * Checks translation progress.
 *
 * APS Endpoint:
 * GET /modelderivative/v2/designdata/{urn}/manifest
 *
 * Required OAuth Scope:
 * data:read
 *
 * Returns:
 * Promise<ManifestStatus>
 *
 * Retrieves the translation status of a model.
 */
export async function pollManifest(urn: string): Promise<ManifestStatus> {
  throw new Error("Not implemented");
}

//   Viewer
/**
 * Retrieves a Viewer access token.
 *
 * APS Endpoint:
 * POST /authentication/v2/token
 *
 * Required OAuth Scope:
 * viewables:read
 *
 * Returns:
 * Promise<ViewerTokenResponse>
 *
 * Provides an access token used by the APS Viewer SDK.
 */
export async function getViewerToken(): Promise<ViewerTokenResponse> {
  throw new Error("Not implemented");
}

//   Workflow
/**
 * Complete APS workflow.
 *
 * Steps:
 * 1. Authenticate
 * 2. Upload model
 * 3. Translate model
 * 4. Poll translation manifest
 * 5. Obtain Viewer token
 */
export async function workflow(): Promise<void> {
  try {
    const auth = await getAccessToken();

    const upload = await uploadModel("./sample-model.dwg", "demo-bucket");

    const translation = await translateModel(upload.objectId);

    const manifest = await pollManifest(translation.urn);

    const viewerToken = await getViewerToken();

    console.log(auth);
    console.log(upload);
    console.log(translation);
    console.log(manifest);
    console.log(viewerToken);
  } catch (error) {
    console.error("APS workflow failed:", error);
  }
}
