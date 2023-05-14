import {  Form, Input, Button, Typography, message, Spin, Select } from "antd";
import "./Productstyle.css"
import axios from "axios";
import { useState } from "react";
import AdminAddImage from "./AdminAddImage";
import {useNavigate } from "react-router-dom";
import api from "../../../api/api";
function AdminAdd() {
  let navigate = useNavigate(null)
  let { Title } = Typography
  const [spin, setspin] = useState(false);
  const [productImage, setProductImage] = useState(null);
  let addproduct = async (values) => {
    setspin(true)
    try {
      const newValues = new FormData();
      Object.keys(values).forEach((eachKey) => {
        newValues.append(eachKey, values[eachKey]);
      })
      newValues.append("thumbnail", productImage);
      api.post('/food/add/product', newValues).then((response) => {
        console.log(response.data);
        console.log("sucess data")
        setspin(false)
        console.log(values)   
        navigate("/admin")
        message.success("product add sucess")
      });
      
    } catch (error) {
      console.log(error.data);
      setspin(false)
      message.error(error)
    }
  }
  const handleImageSelect = (image) => {
    setProductImage(image);
  }
  return (
    <div className="add-product">
      <Spin spinning={spin}>
        <Title level={2}>Add Product</Title>
        <Form style={{
          maxWidth: 1000
        }}
          onFinish={addproduct}>
          <AdminAddImage onImageSelect={handleImageSelect} />
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input placeholder="Enter a Product Title" size="large" />
          </Form.Item>
          <Form.Item
            name="brand"
            rules={[{ required: true, message: 'Please input the product brand!' }]}
          >
            <Input placeholder="Enter a Product brand" size="large" />
          </Form.Item>
          <Form.Item name="rating">
            <Select placeholder="Enter Rating" options={[
          {value:1,label:1},
          {value:2,label:2},
          {value:3,label:3},
          {value:4,label:4},
          {value:5,label:5},
            ]}>

            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: 'Please input the product price!' }]}
          >
            <Input placeholder="enter a product price " size="large" type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Please input the product description!' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter a product description" />
          </Form.Item>
          <Form.Item>
           <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  )
}
export default AdminAdd;