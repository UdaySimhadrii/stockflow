import productService from '../services/productService.js';
import asyncHandler from '../utils/asyncHandler.js';
import HTTP_STATUS from '../constants/httpStatus.js';

export const listProducts = asyncHandler(async (req, res) => {
  const { organizationId } = req.user;
  const { search, page, pageSize } = req.query;
  const result = await productService.list(organizationId, { search, page, pageSize });
  res.status(HTTP_STATUS.OK).json({ success: true, data: result });
});

export const getProduct = asyncHandler(async (req, res) => {
  const { organizationId } = req.user;
  const product = await productService.getById(organizationId, req.params.id);
  res.status(HTTP_STATUS.OK).json({ success: true, data: { product } });
});

export const createProduct = asyncHandler(async (req, res) => {
  const { organizationId, userId } = req.user;
  const product = await productService.create(organizationId, userId, req.body);
  res.status(HTTP_STATUS.CREATED).json({ success: true, data: { product } });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { organizationId, userId } = req.user;
  const product = await productService.update(organizationId, userId, req.params.id, req.body);
  res.status(HTTP_STATUS.OK).json({ success: true, data: { product } });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { organizationId } = req.user;
  await productService.remove(organizationId, req.params.id);
  res.status(HTTP_STATUS.OK).json({ success: true, data: { id: req.params.id } });
});

export default { listProducts, getProduct, createProduct, updateProduct, deleteProduct };
