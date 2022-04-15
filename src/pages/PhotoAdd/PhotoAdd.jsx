import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Row, Col, Button, Form, Input, Select } from 'antd';

// Context
import { usePhotoContext } from 'context/photoContext';

// Components
import Spinner from 'components/Spinner';

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18, offset: 3 },
    md: { span: 16, offset: 4 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 18,
      offset: 3,
    },
    md: {
      span: 16,
      offset: 4,
    },
  },
};

const { Option } = Select;

function PhotoAdd() {
  // Global
  const {
    isLoading,
    addPhoto,
    addSuccess,
    unsetAddSuccess,
    // setCurrentPagePath,
  } = usePhotoContext();

  const navigate = useNavigate();
  // const location = useLocation();
  // const addPhotoPathName = location.pathname;
  // console.log('location add: ', addPhotoPathName);

  // For form
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // console.log('Received values of form: ', values);
    const submitedData = values;
    const token = sessionStorage.getItem('token');
    // console.log('submit add: ', submitedData);
    // console.log('submit add token: ', token);

    addPhoto(token, submitedData);
  };

  useEffect(() => {
    if (addSuccess) {
      setTimeout(() => {
        navigate('/');
        unsetAddSuccess();
      }, 500);
    }
  }, [addSuccess, navigate, unsetAddSuccess]);

  // useEffect(() => {
  //   console.log('this is add photo path');
  //   setCurrentPagePath(addPhotoPathName);
  // }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row
        justify='center'
        align='middle'
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Col
          xs={24}
          sm={20}
          md={16}
          justify='center'
          align='middle'
          style={{
            padding: '32px',
            width: '100%',
            margin: '52px 0',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        >
          <Row
            className='header'
            justify='center'
            align='middle'
            style={{
              marginBottom: '24px',
            }}
          >
            <Col xs={24} md={20} lg={14} justify='center' align='middle'>
              <h2 className='title'>Add New Photo</h2>
              <p className='shortDesc'>
                Create your new photo with details below
              </p>
            </Col>
          </Row>
          <Row justify='center' align='middle'>
            <Col
              span={24}
              justify='center'
              align='middle'
              style={{
                maxWidth: '100%',
              }}
            >
              <Form
                {...formItemLayout}
                form={form}
                name='login'
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item
                  className=''
                  name='category'
                  rules={[
                    { required: true, message: 'Please select a category!' },
                  ]}
                >
                  <Select
                    className='selectAddFormCustom'
                    placeholder='Select a category...'
                    size='large'
                  >
                    <Option value='nature'>Nature</Option>
                    <Option value='sport'>Sport</Option>
                    <Option value='fashion'>Fashion</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name='title'
                  rules={[
                    { required: true, message: `Please input image's title` },
                  ]}
                >
                  <Input
                    placeholder='Name of image'
                    size='large'
                    style={{
                      height: '48px',
                      borderRadius: '60px',
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name='image'
                  rules={[
                    { required: true, message: `Please input image's url` },
                  ]}
                >
                  <Input
                    placeholder='Url of image'
                    size='large'
                    style={{
                      height: '48px',
                      borderRadius: '60px',
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name='description'
                  rules={[
                    {
                      required: true,
                      message: `Please input image's description`,
                    },
                  ]}
                >
                  <Input
                    placeholder='Description of image'
                    size='large'
                    style={{
                      height: '48px',
                      borderRadius: '60px',
                    }}
                  />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button
                    id='submitBtn'
                    type='primary'
                    htmlType='submit'
                    block
                    size={'large'}
                    style={{
                      height: '56px',
                      borderRadius: '60px',
                    }}
                  >
                    Add New Photo
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default PhotoAdd;
