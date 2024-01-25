import { updateProducts } from "../controler/products";

test("updateProducts", async () => {
  const result = await updateProducts();
  expect(result).toEqual(result);
});
