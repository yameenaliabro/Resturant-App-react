import Meta from "antd/es/card/Meta";
import { Button, Card,  Rate, theme, Typography } from "antd";
import "./AdminSet.css";
import { Link } from "react-router-dom";
import AdmindeleteProduct from "../../admindeleteproducts/AdminDeleteProducr";
const AdminSet = ({
  _id,
  title,
  imageUrl,
  price,
  toppings,
  rate,
  unit = "$",
  loading,
  onDeletProduct,
}) => {
  const { Text } = Typography;
  const { token } = theme.useToken()
  return (
    <Card
      className="product-card-item"
      bordered={false}
      cover={<img alt={title} src={imageUrl} />}
      loading={loading}
    >
      <div>
        <Rate disabled defaultValue={rate} />
        <Meta title={title} description={toppings} />
      </div>
      <div className="action">
       <AdmindeleteProduct
        productId={_id}
        onDelete={onDeletProduct}
       />
        <Link to={"/add/product/admin/update/Product/" + _id}><Button type="primary">Edit</Button></Link>
        <Text style={{ color: token.colorPrimary }}>
          {unit}
          {price}
        </Text>
      </div>
    </Card>
  );
};
export default AdminSet;