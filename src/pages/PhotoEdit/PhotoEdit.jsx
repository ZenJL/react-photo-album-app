import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Antd
import { Row, Col, Button, Form, Input, Select } from 'antd';

// Context
import { usePhotoContext } from 'context/photoContext';

// Components
import Spinner from 'components/Spinner';

// Helpers
import { getTokenFromSession } from 'helpers/tokenHelper';

// Antd form variables
const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14, offset: 5 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 5,
    },
  },
};
const { Option } = Select;

// Main
function PhotoEdit() {
  const {
    isLoading,
    photo,
    getPhoto,
    editPhoto,
    editSuccess,
    unsetEditSuccess,
  } = usePhotoContext();

  // For form
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const { photoId } = useParams();

  const token = getTokenFromSession();

  // console.log('params edit: ', photoId);
  // console.log('token edit: ', token);

  useEffect(() => {
    getPhoto(token, photoId);
    // eslint-disable-next-line
  }, [token, photoId]);

  useEffect(() => {
    if (editSuccess) {
      setTimeout(() => {
        navigate('/');
        unsetEditSuccess();
      }, 500);
    }
  }, [editSuccess, navigate, unsetEditSuccess]);

  const onFinish = async (values) => {
    // console.log('Received values of form: ', values);
    const submitedData = values;

    // console.log('submit add: ', submitedData);

    editPhoto(token, photoId, submitedData);
  };

  if (
    isLoading
    // || Object.keys(photo).length === 0
  )
    return <Spinner />;

  return (
    <>
      {Object.keys(photo).length === 0 ? (
        <Spinner />
      ) : (
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
            xs={20}
            xl={18}
            justify='center'
            align='middle'
            style={{
              padding: '32px',
              minWidth: '300px',
              width: '100%',
              margin: '52px 0',
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
              <Col span={24} justify='center' align='middle'>
                <h2 className='title'>Edit Photo</h2>
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
                  initialValues={{
                    category: photo.category,
                    title: photo.title,
                    image: photo.image,
                    description: photo.description,
                  }}
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
                      { required: true, message: `Please input photo's title` },
                    ]}
                  >
                    <Input
                      placeholder='Title of photo'
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
                      { required: true, message: `Please input photo's url` },
                    ]}
                  >
                    <Input
                      placeholder='Url of photo'
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
                        message: `Please input photo's description`,
                      },
                    ]}
                  >
                    <Input
                      placeholder='Description of photo'
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
                      Edit photo
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default PhotoEdit;
