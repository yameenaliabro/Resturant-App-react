import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button,Typography, Spin, Select} from "antd";
import "./update.css"
import api from "../../../api/api";
const AdminUpdateProduct = () => {
  let navigate = useNavigate()
  const [form] = Form.useForm();
  const [product, setProduct] = useState(false);
  const [loading,setloading] = useState(false)
    const { id } = useParams();
    useEffect(() => {
      const fetchProduct = async () => {
        const { data } = await api.get(`/${id}`);
        setProduct(data);
        form.setFieldsValue(data);
      };
      fetchProduct();
    }, [id, form]);
  const onFinish = (values) => {
  setloading(true)
    setProduct(true);
    api.put(`/food//${id}`,values)
      .then((res) => {
        console.log(res.data);
        form.resetFields();
        setProduct(false);
        setloading(false)
        navigate("/admin")
      })
      .catch((err) => {
        console.error(err);
        setProduct(false);
      });
  };
let {Title} = Typography 
  return (
    <div className="update-css">
      <Spin spinning={false}>
    <Title level={2}>UpdateProduct</Title>
    <Form form={form} onFinish={onFinish}
    style={{
        maxWidth: 500,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignContent:"center",
        textAlign:"center",
        marginLeft:"40%",
        marginTop:"10%"
      }}>
      <Form.Item
        name="title"
        rules={[{ required: true }]}
      >
        <Input placeholder="Enter a Title" size="large"/>
      </Form.Item>
      <Form.Item
            name="brand"
            rules={[{ required: true, message: 'Please input the product brand!' }]}
          >
            <Input placeholder="Enter a Product brand" size="large" />
          </Form.Item>
      <Form.Item
            name="rating"
            rules={[{ required: true, message: 'Please input the product rating!' }]}
          >
             <Select placeholder="Enter Rating" options={[
          {value:1,label:1},
          {value:2,label:2},
          {value:3,label:3},
          {value:4,label:4},
          {value:5,label:5},
            ]}>

            </Select>
          </Form.Item>
      <Form.Item name="price"  rules={[{ required: true }]}>
        <Input  placeholder="Enter A product Price" size="large"/>
      </Form.Item>
      <Form.Item
            name="description"
            rules={[{ required: true, message: 'Please input the product description!' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter a product description" />
          </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={product}>
          Update
        </Button>    
      </Form.Item>
      <Form.Item>
      <Link to="/admin"><Button type="primary" danger>Cancel</Button></Link>
      </Form.Item>
    </Form>
    </Spin>
    </div>
  
  );
};

export default AdminUpdateProduct;
