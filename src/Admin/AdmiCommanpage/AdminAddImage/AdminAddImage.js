import React, { useState } from 'react';
import { Upload,} from 'antd';
const AdminAddimage = ({onImageSelect}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleUpload = ({ file }) => {
    onImageSelect(file);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Upload
      name="image"
      listType="picture-card"
      className="image-uploader"
      showUploadList={false}
      customRequest={handleUpload}
    >
      {selectedImage ? <img src={selectedImage} alt="image" style={{ width: '100%' }} /> : (
        <div>
          <div className="ant-upload-text">Upload</div>
        </div>
      )}
    </Upload>
  );
};

export default AdminAddimage


