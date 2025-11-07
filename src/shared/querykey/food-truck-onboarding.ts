export const ONBOARDING_QUERY_KEY = {
  ALL: ['food-truck-onboarding'],
  CHECK_NAME_DUPLICATE: (name?: string) =>
    [...ONBOARDING_QUERY_KEY.ALL, 'check-name-duplicate', name],
  CREATE: () => [...ONBOARDING_QUERY_KEY.ALL, 'create'],
  UPLOAD_FILES: () => [...ONBOARDING_QUERY_KEY.ALL, 'upload-files'],
  GET_PRESIGNED_URLS: () => [...ONBOARDING_QUERY_KEY.ALL, 'get-presigned-urls'],
} as const;
