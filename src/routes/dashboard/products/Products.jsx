import { useState, useEffect } from 'react';

import { Table, Input, Spin, Button, Modal } from 'antd';

import { useGetProductsQuery } from "../../../redux/api/productsApi";

import CreateProducts from "../../../components/create-products/CreateProducts"

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useGetProductsQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (data && data.payload) {
      setProducts(data.payload);
      setFilteredProducts(data.payload);
    }
  }, [data]);

  useEffect(() => {
    if (products.length) {
      const results = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [searchTerm, products]);

  const showModal = () => {
    setIsModalVisible(true);  // Modalni ochish funksiyasi
  };

  const handleCancel = () => {
    setIsModalVisible(false);  // Modalni yopish funksiyasi
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Image',
      dataIndex: 'product_images',
      key: 'product_images',
      render: (images) => <img src={images[0]} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />,
    },
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Price',
      dataIndex: 'original_price',
      key: 'original_price',
      render: (text) => `${text}$`,
    },
    {
      title: 'Category',
      dataIndex: 'product_type',
      key: 'product_type',
    },
  ];

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search by name or category"
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/2"
        />
        <Button type="primary" onClick={showModal} className="text-white bg-blue-500 hover:bg-blue-700">Create Product</Button>
      </div>

      {isLoading ? (<Spin size="large" className="flex justify-center items-center" />) : (
        <>
          <Table
            columns={columns}
            dataSource={filteredProducts}
            rowKey="_id"
            pagination={{pageSize: 4}}
            scroll={{ y: 400 }}
          />
        </>
      )}

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <CreateProducts />
      </Modal>
    </div>
  );
};

export default Products;