type Environment = 'development' | 'production';

interface ApiConfig {
  baseURL: string;
}

interface ApiConfigs {
  development: ApiConfig;
  production: ApiConfig;
}

export const API_CONFIG: ApiConfigs = {
  development: {
    baseURL: 'https://pay-pulse-backend.where-pizza.ru/api',
  },
  production: {
    baseURL: 'https://pay-pulse-backend.where-pizza.ru/api',
  },
};

export const getApiConfig = (): ApiConfig => {
  const env = (process.env.NODE_ENV || 'development') as Environment;
  return API_CONFIG[env];
};
