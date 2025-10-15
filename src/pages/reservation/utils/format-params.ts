import type { ParamValue } from '@api/apiRequest';

// api의 params에 들어갈 데이터 중 중첩 객체가 포함되어 있을 때
export const formatParams = (obj?: Record<string, ParamValue>) =>
  obj
    ? (Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v != null)
      ) as Record<string, ParamValue>)
    : {};
