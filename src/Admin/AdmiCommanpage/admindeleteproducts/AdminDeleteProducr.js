import { Button, Popconfirm } from "antd"
import axios from "axios";
import { useState } from "react";
function AdmindeleteProduct({ onDelete, productId }) {
    const [backgroundcolor, setbackgroundcolor] = useState("#a83248");
    let deletehandler = async () => {
        setbackgroundcolor("#154c79")
        try {
            const response = await axios.post("http://localhost:2000/food/delete/", {
                productId,
            });
            if (onDelete) {
                onDelete(productId)
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <Popconfirm 
            title="Are you sure you want to delete  the product"
            cancelText="cancel"
            okText="ok"
            onConfirm={deletehandler}
            >
            <Button type="primary" style={{
                backgroundColor: backgroundcolor
            }}>Delete</Button>
            </Popconfirm>
        </div>
    )
}
export default AdmindeleteProduct
