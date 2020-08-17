import { model } from '@models/index';

export const add = async (partialDoc: any) => {
  const savedDoc = await model.add(partialDoc);

  return savedDoc;
};

export const getDocs = async () => {
  const docs = await model.find();

  return docs;
};

export const getDocById = async (id: number) => {
  const doc = await model.findById(id);

  return doc;
};

export const updateById = async (id: number, partialModel: any) => {
  const result = await model.updateById(id, partialModel);

  return result;
};

export const removeById = async (id: number) => {
  const result = await model.removeById(id);

  return result;
};

export const count = async () => {
  const docCount = await model.count();

  return docCount;
};
