import { DEPEI_PROVIDER_BASE_URL } from '../types/model';
import { getModelById, getProviderById } from './modelRegistry';

export const API_PROXY_PATH = '/api-proxy';

export const normalizeApiBaseUrl = (url: string): string => {
  const trimmed = (url || '').trim().replace(/\/+$/, '');
  return trimmed || DEPEI_PROVIDER_BASE_URL;
};

export const isHttpApiBaseUrl = (url: string): boolean => /^https?:\/\//i.test((url || '').trim());

export const getApiTargetBaseUrlForModel = (modelId?: string): string => {
  if (!modelId) return DEPEI_PROVIDER_BASE_URL;
  const model = getModelById(modelId);
  const provider = model ? getProviderById(model.providerId) : undefined;
  return normalizeApiBaseUrl(provider?.baseUrl || DEPEI_PROVIDER_BASE_URL);
};

export const getApiRequestBaseUrlForModel = (modelId?: string): string => {
  const targetBaseUrl = getApiTargetBaseUrlForModel(modelId);
  return isHttpApiBaseUrl(targetBaseUrl) ? API_PROXY_PATH : targetBaseUrl;
};

export const getApiProxyHeadersForModel = (modelId?: string): Record<string, string> => {
  const targetBaseUrl = getApiTargetBaseUrlForModel(modelId);
  if (!isHttpApiBaseUrl(targetBaseUrl)) return {};
  return { 'X-Api-Base-Url': targetBaseUrl };
};

export const getProxyHeadersForBaseUrl = (baseUrl: string): Record<string, string> => {
  const normalizedBase = normalizeApiBaseUrl(baseUrl);
  if (!isHttpApiBaseUrl(normalizedBase)) return {};
  return { 'X-Api-Base-Url': normalizedBase };
};

export const buildApiUrl = (apiBase: string, endpoint: string): string => {
  const normalizedBase = normalizeApiBaseUrl(apiBase);
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${normalizedBase}${normalizedEndpoint}`;
};
