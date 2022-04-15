import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Css Antd
import { Row, Col } from 'antd';
import { Form, Input, Button } from 'antd';

// Context
import { usePhotoContext } from 'context/photoContext';

// Components
import Spinner from 'components/Spinner';

// FormLayout variables =======
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
//// =======

function Login() {
  const {
    // limitPhotos,
    login,
    loginSuccess,
    showLoading,
    hideLoading,
    isAuth,
    isLoading,
    unsetLoginSuccess,
    // currentPagePath,
  } = usePhotoContext();

  // For form
  const [form] = Form.useForm();

  const navigate = useNavigate();

  // If logged in, can't access to login till logout
  useEffect(() => {
    if (isAuth && !loginSuccess) navigate(`/`);

    if (isAuth && loginSuccess) {
      setTimeout(() => {
        navigate(`/`);
      }, 1500);
    }
  }, [isAuth, loginSuccess, navigate]);

  //// Loading reRender
  useEffect(() => {
    showLoading();

    setTimeout(() => {
      hideLoading();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirect successful login
  useEffect(() => {
    if (loginSuccess)
      setTimeout(() => {
        navigate(`/`);
        unsetLoginSuccess();
      }, 1500);
  }, [loginSuccess, navigate, unsetLoginSuccess]);

  //// Submit
  const onFinish = async (values) => {
    // console.log('Received values of form: ', values);

    const submitedData = values;
    // console.log('data 111: ', submitedData);

    login(submitedData);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row
        justify='center'
        align='middle'
        style={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#F1F3F8',
        }}
      >
        <Col
          xs={20}
          sm={16}
          md={12}
          lg={10}
          xl={8}
          justify='center'
          align='middle'
          style={{
            backgroundColor: '#fff',
            padding: '32px',
            minWidth: '300px',
            margin: '52px 0',
            borderRadius: '12px',
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
              <h2 className='title'>Login</h2>
              <p className='shortDesc'>Ready to login and go</p>
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
                  name='email'
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input
                    placeholder='Email'
                    size='large'
                    style={{
                      height: '48px',
                      borderRadius: '60px',
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder='Password'
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
                    Login
                  </Button>
                </Form.Item>
              </Form>

              <Row className='header' justify='center' align='middle'>
                <Col
                  xs={24}
                  sm={16}
                  // md={15}
                  lg={15}
                  // xl={15}
                  justify='center'
                  align='middle'
                >
                  <p className='haveAccountSection'>
                    Do not have an accout?
                    <br />
                    <Link to='/register' className='loginLink'>
                      Register
                    </Link>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Login;
