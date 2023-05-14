import { Button, Col,  Row, Spin, Table, Typography,message,Popconfirm} from "antd";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import api from "../../../api/api";
import Container from "../../../components/common/container/Container";
const AdminCheckStatus = () => {
  let handleaccept = (record) =>{
    api.put(`order/accepted/${record}`, { status: 'process' })
    console.log(true)
    .then(response => {
       const updatedOrders = orders.filter(o => (o.orderId ===  record ? 
        { ...o, status: 'process' } : o));
      setOrders(updatedOrders);
    })
    .catch(error => {
      console.error('Error accepting order:', error.response.data);
    });
  }
  let handleDelete = (record)=>{
    api.put(`order/rejected/${record}`, { status: 'rejected' })
    .then(response => {
       const updatedOrders = orders.filter(o => (o.orderId ===  record ? 
        { ...o, status: 'reject' } : o));
      setOrders(updatedOrders);
    })
    .catch(error => {
      console.error('Error accepting order:', error.response.data);
    });
  }
  const [data, senddata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const [columns, setcolums] = useState([
    { title: 'id', dataIndex: '_id', key: '_id' },
    { title: 'Firstname', dataIndex: 'firstname', key: 'firstname' },
    { title: 'Lastname', dataIndex: 'lastname', key: 'last  name' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'TotalPrice', dataIndex: 'price', key: 'price' },
    { title: 'Country', dataIndex: 'country', key: "country" },
    { title: 'Address', dataIndex: 'address', key: "address" },
    {
      title: 'Action',
      key: "status",
      render: (_, order) => (
        <span>
            <div>
            <Button
              type="primary" danger
              onClick={() => handleDelete(order._id)}
              disabled={order.status === "reject" ? true:false}
            >
              Reject
            </Button>
          
            <Button
              type="primary" 
              onClick={() => handleaccept(order._id)}
              disabled={order.status === "process" ? true : false}
            >
              accept
            </Button>
            </div>
        </span>
      ),
    },
  ])
  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/order/allorder/', {
      });
      senddata(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      await getProducts();
    })();
  }, []); 
  const { Title } = Typography;
  return (
    <div>
      <Container>
        <Row justify="center" className="center">
          <Col span={24}>
            <Title level={2}>Check Status</Title>
          </Col>
          <Col span={24}>
            <Spin style={{ position: "absolute" }} spinning={isLoading}>
              <Table
                columns={columns} dataSource={data}/>
            </Spin>
          </Col>
        </Row>
        <Outlet />
      </Container>    
    </div>
  );
};
export default AdminCheckStatus;