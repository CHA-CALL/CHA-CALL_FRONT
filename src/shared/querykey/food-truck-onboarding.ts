export const ONBOARDING_QUERY_KEY = {
  ALL: ['food-truck-onboarding'],
  CREATE: () => [...ONBOARDING_QUERY_KEY.ALL, 'create'],
  UPLOAD_FILES: () => [...ONBOARDING_QUERY_KEY.ALL, 'upload-files'],
} as const;
