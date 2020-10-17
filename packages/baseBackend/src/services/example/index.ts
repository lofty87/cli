import { example } from '@models/index';

export const add = async (source: any) => {
  const data = await example.add(source);

  return data;
};

export const getAll = async () => {
  const data = await example.findAll();

  return data;
};

export const getOneById = async (id: number) => {
  const data = await example.findOneById(id);

  return data;
};

export const updateById = async (id: number, source: any) => {
  const data = await example.updateById(id, source);

  return data;
};

export const removeById = async (id: number) => {
  const data = await example.removeById(id);

  return data;
};

export const getCount = async () => {
  const data = await example.getCount();

  return data;
};
