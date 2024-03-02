import md5 from 'md5';
import axios from 'axios';
import { PRODUCTS_PER_PAGE, API_URL, PASS } from '../constants/env';

// Функция для получения хэша
const getHash = () => {
  const timestamp = new Date().toISOString().substring(0, 10).replace(/-/g, '');
  return md5(`${PASS}_${timestamp}`);
};

// Функция для удаления дубликатов
const removeDuplicates = (arr) => {
  return arr.filter((current, index, self) => {
    return index === self.findIndex((element) => element.id === current.id);
  });
};

// Создание экземпляра axios
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Auth': getHash(),
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { config, response } = error;
    if (response && response.status === 500) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(instance(config));
        }, 3000);
      });
    }
    return Promise.reject(error);
  }
);

// Функция для получения всех продуктов
export const getAllProducts = async () => {
  try {
    const response = await instance.post('', {
      action: 'get_ids',
    });

    const { result } = response.data;
    return result.length;
  } catch (error) {
    console.log(error);
  }
};

// Функция для получения отфильтрованных продуктов
export const getFilteredProducts = async (page, filter, value) => {
  console.log(filter);
  const body = {
    byName: {
      action: 'filter',
      params: { product: value },
    },
    byBrand: {
      action: 'filter',
      params: { brand: value },
    },
    byPrice: {
      action: 'filter',
      params: { price: Number(value) },
    },
    default: {
      action: 'get_ids',
      params: {
        offset: page ? page - 1 : 0,
        limit: PRODUCTS_PER_PAGE,
      },
    },
  };

  try {
    const response = await instance.post('', filter ? body[filter] : body.default);
    const { result } = response.data;

    return await getProducts(result);
  } catch (error) {
    console.log(error);
  }
};

// Функция для получения продуктов по их идентификаторам
export const getProducts = async (ids) => {
  try {
    const response = await instance.post('', {
      action: 'get_items',
      params: { ids },
    });

    const { result } = response.data;
    return removeDuplicates(result);
  } catch (err) {
    console.log(err);
  }
};
