import { Col, Row, Spin, Table, Typography,} from "antd";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Container from "../../common/container/Container";
import api from "../../../api/api";
import { useSelector,useDispatch} from "react-redux";
import { useGetUserId } from "../auth/Auth";
const Historysend = () => {
  const [data, senddata] = useState([]);
  const [isLoading, setIsLoading] =  useState(true);
  const [error, setError] = useState(false);
  const id = useGetUserId()
  console.log(id)
  const [columns,setcolums] = useState([
    { title: 'id', dataIndex: '_id', key: '_id' },
    { title: 'Firstname', dataIndex: 'firstname', key: 'firstname' },
    { title: 'Lastname', dataIndex: 'lastname', key: 'last  name' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Zipcode', dataIndex: 'zipcode', key: 'zipcode' },
    { title: 'Country', dataIndex: 'country', key: "country" },
    { title: 'Address', dataIndex: 'address', key: "address" },
  ])
  const getProducts = async () => { 
    try {
      setIsLoading(true);
      const response = await api.get(`/order/userorder/${id}/`,{
      });
     senddata(response.data)

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
          <Title level={2}>Order  History</Title>
        </Col>
        <Col span={24}>
          <Spin style={{ position: "absolute" }} spinning={isLoading}>
            <h1>Rejected</h1>
          <Table columns={columns} dataSource={data.filter(item => item.status == "reject")}/>
          <h1>ProcessDaata</h1>
          <Table columns={columns} dataSource={data.filter((item) => item.status === "process")}/>
          <h1>Pending</h1>
          <Table columns={columns} dataSource={data.filter((item) => item.status === "pending")}></Table>
          </Spin>
        </Col>
      </Row>
      <Outlet/>
  
      </Container>
     
      </div>
  );
};
export default Historysend;