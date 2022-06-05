import { useState } from "react";
import { Modal, Form, Input, Button, Upload, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {createItems} from "../../features/Item/item.reducer";

const AddWithImage = ({ isOpen, onClose }) => {

  const dispatch = useDispatch();
  //======================  image preview ======================
  const [preview, setPreview] = useState({
    previewModalVisible: false,
    previewImage: "",
    previewTitle: "",
  });
  const [loading, setLoading]= useState(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreview({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  //======================= Image Form =============
  const [form, setForm] = useState({
    file: null,
    fileList: [],
  });


  const handleImageChange = ({ fileList, file }) => setForm({ ...form, file, fileList });



  const handleSubmit = (values) => {
    const formData = new FormData();
    if (!form.file) {
      message.error("Book cover photo is required");
    } else if (!isJpgOrPng(form.file)) {
      message.error("Book cover can only be JPG/PNG file!");
    } else {
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append('imageCover', form.file);
      form.fileList.forEach(file => {
        formData.append('images[]', file);
      });


      dispatch(createItems(formData))
    }
  };


  // const uploadButton = ( <div>
  //                     <PlusOutlined />
  //                     <div style={{ marginTop: 8 }}>Upload</div>
  //                   </div>);

  const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
  );
  return (
    <>
      <Modal
        title="Create Book"
        visible={isOpen}
        onOk={handleSubmit}
        onCancel={onClose}
        footer={[]}
      >
        <Form initialValues={{}} onFinish={handleSubmit}>
          {/*------------------   =======  name  ========== --------------------*/}
          <Form.Item name="name" rules={[{ required: true, message: "Please input book name!" }]}          >
            <Input size="large" placeholder="Book Name" />
          </Form.Item>

          {/*   ------------------      *description ------------------------------*/}
          <Form.Item name="description"
            rules={[
              { required: true, message: "Please input book description!" },
            ]}
          >
            <Input.TextArea rows={5} placeholder="Description" />
          </Form.Item>

          {/*     ---------- ----------- ============== image ===================== ----------------*/}

          <Form.Item>
            <Typography.Text>Cover Photo</Typography.Text>
            <Upload
              listType="picture-card"
              fileList={form.fileList}
              onPreview={handlePreview}
              onChange={handleImageChange}
              beforeUpload={beforeUpload}
            >
              {form.fileList.length === 1 ? null : uploadButton}
            </Upload>

            <Upload

                listType="picture"
                maxCount={3}
                multiple
            >

            </Upload>

          </Form.Item>
          {/* ----------  ====================== Submit Button ````````````````````````````````````*/}
          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "150px" }}
              >
                Submit
              </Button>
            </div>
          </Form.Item>

        </Form>
      </Modal>
      {/* ------------------   =========== image modal when Displaying Image ============== -----------------*/}

      <Modal  visible={preview.previewModalVisible}
        title={preview.previewTitle}
        footer={null}
        onCancel={() => {
          setPreview({ previewModalVisible: false })
          // setForm({...form, file: null})

        }} >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={preview.previewImage}
        />

      </Modal>

    </>
  );
};

export default AddWithImage;


const isJpgOrPng = (file) => {
  return (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
  );
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function beforeUpload(file) {
  // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng(file)) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!');
  }
  return (isJpgOrPng && isLt2M) ||Upload.LIST_IGNORE;
}

// const beforeUpload = (file) => {
//   if (!isJpgOrPng(file)) {
//     message.error("Book cover can only be JPG/PNG file!");
//   }
//   return false;
// };


function addWaterMark(file){
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = 'red';
        ctx.textBaseline = 'middle';
        ctx.font = '33px Arial';
        ctx.fillText('Ant Design', 20, 20);
        canvas.toBlob(resolve);
      };
    };
  });
}
// const props = {
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   listType: 'picture',
//   beforeUpload(file) {
//     return new Promise(resolve => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         const img = document.createElement('img');
//         img.src = reader.result;
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           canvas.width = img.naturalWidth;
//           canvas.height = img.naturalHeight;
//           const ctx = canvas.getContext('2d');
//           ctx.drawImage(img, 0, 0);
//           ctx.fillStyle = 'red';
//           ctx.textBaseline = 'middle';
//           ctx.font = '33px Arial';
//           ctx.fillText('Ant Design', 20, 20);
//           canvas.toBlob(resolve);
//         };
//       };
//     });
//   },
// };