import "./AdminProducts.css";
import { Col, Empty, Result, Row, Spin, Typography,} from "antd";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSet from "./AdminSet/AdminSet";
import api from "../../../api/api";
import Container from "../../../components/common/container/Container";
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [edit, setedit] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const getProducts = async () => { 
    try {
      setIsLoading(true);
      const response = await api.get('/food/allproduct/',{
        headers: {
          Authorization: `Bearer `
        }
      });
      setProducts(response.data);
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
  const handleProductDelete = (productId) =>{
    setProducts(products.filter((eachProduct)=> eachProduct._id !== productId
    ))
  }
  const getJsx = () => {
    if (products.length > 0) {
      return (
        <Row gutter={[20, 30]}>
          {products.map(
            ({ _id,id, title, description, thumbnail, price, rating }) => (
              <Col xs={24} sm={12} md={8} lg={6} key={id}>
                <AdminSet
                  id={id}
                  _id={_id}
                  title={title}
                  imageUrl={thumbnail}
                  price={price}
                  toppings={description}
                  rate={rating}
                  loading={isLoading}
                  onDeletProduct={handleProductDelete}    
                />
              </Col>
            )
          )}
        </Row>
      );
    } else if (!products.length) {
      <Empty />;
    } else {
      return <Result status="warning" title={error} />;
    }
  }
  return (
    <div>
        <Container>
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>Products</Title>
        </Col>
        <Col span={24}>
          <Spin style={{ position: "absolute" }} spinning={isLoading}>
            {getJsx()}
          </Spin>
        </Col>
      </Row>
      <Outlet/>
      </Container>
      </div>
  );
};
export default AdminProducts;