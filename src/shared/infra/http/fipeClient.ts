import axios from 'axios';

const FIPE_SITE = 'https://veiculos.fipe.org.br';

/**
 * Cliente HTTP da FIPE oficial. Os cabeçalhos imitam a consulta feita pelo
 * site da FIPE: sem eles, a proteção do site recusa (403) chamadas vindas de
 * IPs de nuvem, como as funções do Vercel.
 */
export const fipeClient = axios.create({
  timeout: 15_000,
  headers: {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
    Origin: FIPE_SITE,
    Referer: `${FIPE_SITE}/`,
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Diagnóstico de recusa: registra só o status e o servidor que respondeu
// (ex.: o WAF), sem dados da consulta.
fipeClient.interceptors.response.use(undefined, error => {
  if (axios.isAxiosError(error) && error.response?.status === 403) {
    // eslint-disable-next-line no-console -- diagnóstico de bloqueio da FIPE
    console.warn(
      'FIPE recusou (403): server=%s cf-ray=%s',
      error.response.headers?.server ?? '-',
      error.response.headers?.['cf-ray'] ?? '-',
    );
  }
  return Promise.reject(error);
});
