type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestProps {
  endPoint: string;
  method?: RequestMethod;
  data?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}

const SERVER_API_BASE_URL = import.meta.env.VITE_API_SERVER_URL;

class ApiRequestError extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.code = code;
  }
}

export const apiRequest = async <T = unknown>({
  endPoint,
  method = 'GET',
  data,
  headers,
  params,
}: ApiRequestProps): Promise<T> => {
  if (!SERVER_API_BASE_URL) {
    throw new ApiRequestError(
      'API 서버 URL이 설정되지 않았습니다.',
      500,
      'MISSING_API_URL'
    );
  }
  //TODO: 회원가입, 로그인 api 연동 시 수정
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  console.info('accessToken', accessToken);

  try {
    let requestUrl = `${SERVER_API_BASE_URL}${endPoint}`;
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
      requestUrl += `?${searchParams.toString()}`;
    }

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (accessToken) {
      console.info('accessToken', accessToken);
      requestHeaders.Authorization = `Bearer ${accessToken}`;
    }

    const fetchOptions: globalThis.RequestInit = {
      method,
      headers: requestHeaders,
    };
    if (data && method !== 'GET') {
      fetchOptions.body = JSON.stringify(data);
    }

    const response = await fetch(requestUrl, fetchOptions);

    //TODO: 회원가입, 로그인 api 연동 시 수정
    if (response.status === 401) {
      const refreshResponse = await refreshToken();
      if (refreshResponse) {
        //TODO: 회원가입, 로그인 api 연동 시 수정
        const newAccessToken = import.meta.env.VITE_ACCESS_TOKEN;
        if (newAccessToken) {
          requestHeaders.Authorization = `Bearer ${newAccessToken}`;
          const retryResponse = await fetch(requestUrl, {
            ...fetchOptions,
            headers: requestHeaders,
          });
          if (retryResponse.ok) {
            return await retryResponse.json();
          }
        }
      }
    }
    if (response.status === 403) {
      //TODO: 회원가입, 로그인 api 연동 시 수정
      throw new ApiRequestError('토큰이 만료되었습니다.', 403, 'TOKEN_EXPIRED');
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiRequestError(
        errorText || 'API 요청에 실패했습니다.',
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiRequestError) {
      throw error;
    }
    throw new ApiRequestError(
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.',
      0,
      'NETWORK_ERROR'
    );
  }
};

// 토큰 갱신 함수
const refreshToken = async (): Promise<boolean> => {
  try {
    //TODO: 회원가입, 로그인 api 연동 시 수정
    const refreshTokenValue = import.meta.env.VITE_REFRESH_TOKEN;
    if (!refreshTokenValue) {
      return false;
    }

    const response = await fetch(`${SERVER_API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshTokenValue}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.accessToken) {
        //TODO: 회원가입, 로그인 api 연동 시 수정
        import.meta.env.VITE_ACCESS_TOKEN = data.accessToken;
      }
      if (data.refreshToken) {
        //TODO: 회원가입, 로그인 api 연동 시 수정
        import.meta.env.VITE_REFRESH_TOKEN = data.refreshToken;
      }
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export { ApiRequestError };
