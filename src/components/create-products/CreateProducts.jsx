import { useState, useEffect } from "react";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Form, Input, InputNumber, Select, notification } from "antd";

import { useGetCategoriesQuery, useGetProductTypeQuery } from "../../redux/api/categoryApi";
import { useCreateProductMutation } from "../../redux/api/productsApi";

const { TextArea } = Input;

const CreateProducts = () => {
   const [productsImages, setProductsImages] = useState([]);
   const [create, { data: createData, error, isError, isLoading }] = useCreateProductMutation();
   const { data: categoryData } = useGetCategoriesQuery();
   const { data: productTypeData } = useGetProductTypeQuery();
   const [form] = Form.useForm();


   useEffect(() => {
      if (isError) {
         console.log("Xatolik yuz berdi:", error);
         notification.error({ message: error?.data?.message || "Failed to create product!" });
      }
   }, [isError, error]);

   const onFinish = async (values) => {
      const formData = new FormData();
      formData.append("product_name", values.product_name);
      formData.append("sale_price", values.sale_price);
      formData.append("original_price", values.original_price);
      formData.append("number_in_stock", values.number_in_stock);
      formData.append("description", values.description);
      formData.append("product_type", values.product_type[0]);
      formData.append("category", values.category[0]);
   
      for (let i = 0; i < productsImages.length; i++) {
         formData.append("product_images", productsImages[i]);
      }
   
      try {
         const result = await create(formData).unwrap();
         console.log("Zapros muvaffaqiyatli:", result);
         notification.success({ message: "Product created successfully!" });
      } catch (error) {
         console.log("Xatolik yuz berdi:", error);
         notification.error({ message: error?.data?.message || "Failed to create product!" });
      }
   };

   const onFinishFailed = (error) => {
      console.log(error);
   };

   return (
      <div className="p-4 max-w-lg mx-auto">
         <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
         >
            <Form.Item
               label="Product Name"
               name="product_name"
               rules={[{ required: true, message: "Please enter product name!" }]}
            >
               <Input />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Form.Item
                  label="Category"
                  name="category"
                  rules={[{ required: true, message: "Please select a category!" }]}
               >
                  <Select
                  mode="tags"
                  maxCount={1}
                  options={categoryData?.payload?.map((category) => ({
                     key: category,
                     label: category,
                     value: category,
                  }))}
                  />
               </Form.Item>

               <Form.Item
                  label="Product Type"
                  name="product_type"
                  rules={[{ required: true, message: "Please select a product type!" }]}
               >
                  <Select
                  mode="tags"
                  maxCount={1}
                  options={productTypeData?.payload?.map((type) => ({
                     key: type,
                     label: type,
                     value: type,
                  }))}
                  />
               </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <Form.Item
                  label="Original Price"
                  name="original_price"
                  rules={[{ required: true, message: "Please enter the original price!" }]}
               >
                  <InputNumber min={1} className="w-full" />
               </Form.Item>

               <Form.Item
                  label="Sale Price"
                  name="sale_price"
                  rules={[{ required: true, message: "Please enter the sale price!" }]}
               >
                  <InputNumber min={1} className="w-full" />
               </Form.Item>

               <Form.Item
                  label="Stock"
                  name="number_in_stock"
                  rules={[{ required: true, message: "Please enter stock quantity!" }]}
               >
                  <InputNumber min={1} className="w-full" />
               </Form.Item>
            </div>

            <Form.Item
               label="Description"
               name="description"
               rules={[{ required: true, message: "Please enter a description!" }]}
            >
               <TextArea rows={4} style={{ resize: "none" }} />
            </Form.Item>

            <Form.Item
               label="Product Images"
               name="product_images"
               rules={[{ required: true, message: "Please upload product images!" }]}
            >
               <div className="flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-lg py-6">
                  <AiOutlineCloudUpload className="text-5xl text-sky-500" />
                  <p className="text-lg">Click or drag file to this area to upload</p>
                  <p className="text-sm text-gray-400">PNG, JPG, JPEG, GIF, WEBP, MP4 formats accepted</p>
                  <input
                     type="file"
                     multiple
                     accept="image/jpeg,image/webp,image/png,image/jpg,video/mp4"
                     className="mt-2"
                     onChange={(e) => setProductsImages(Array.from(e.target.files))}
                     />
               </div>
            </Form.Item>

            <Form.Item>
               <Button disabled={isLoading} type="primary" htmlType="submit" className="w-full">
                  {isLoading ? "Saving..." : "Save"}
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
};

export default CreateProducts;