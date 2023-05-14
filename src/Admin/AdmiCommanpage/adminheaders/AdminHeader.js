import { Col, Row, Menu, } from "antd";
import { Link, Outlet,} from "react-router-dom";
import Container from "../../../components/common/container/Container";
const loggedInHeaderMenu = [
  { label: <Link to="/admin">Home</Link>, key: "" },
  { label: <Link to="/add/product" >AddProduct</Link>,key : "add"},
  { label: <Link to="/check/status">CheckStatus</Link>, key: "CheckStatus" },
];
const AdminHeader = () => {
  return (
    <div>
    <header style={{ background:"#29323C" }}>
      <Container>
        <Row justify="center" align="middle">
          <Col
            xs={12}
            lg={6}
            style={{
              textAlign: "center",
            }}
          >
          </Col>
          <Col xs={11} lg={17}>
            <Menu
              mode="horizontal"
              items={ loggedInHeaderMenu}
              style={{
                backgroundColor: "transparent",
                color: "white",
                justifyContent: "center",
              }}
            />
          </Col>
        </Row>
      </Container>
    </header>
    <Outlet/>
    </div>
  );
};

export default AdminHeader;