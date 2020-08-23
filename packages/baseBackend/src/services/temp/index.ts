import { temp } from '@models/index';

export const add = async (partialDoc: any) => {
  const savedDoc = await temp.add(partialDoc);

  return savedDoc;
};

export const getDocs = async () => {
  const docs = await temp.find();

  return docs;
};

export const getDocById = async (id: number) => {
  const doc = await temp.findById(id);

  return doc;
};

export const updateById = async (id: number, partialModel: any) => {
  const result = await temp.updateById(id, partialModel);

  return result;
};

export const removeById = async (id: number) => {
  const result = await temp.removeById(id);

  return result;
};

export const count = async () => {
  const docCount = await temp.count();

  return docCount;
};
