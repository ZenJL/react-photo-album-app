import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Css Ant design
import { Row, Col } from 'antd';
import { Form, Input, Button } from 'antd';

// Context
import { usePhotoContext } from 'context/photoContext';

// Components
import Spinner from 'components/Spinner';
import ImageComponent from 'components/ImageComponent';

//// Form layout variables =======
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

function Register() {
  const {
    register,
    registerSuccess,
    showLoading,
    hideLoading,
    isAuth,
    isLoading,
    unsetRegisterSuccess,
  } = usePhotoContext();

  // For form
  const [form] = Form.useForm();

  const [randomAvatar, setRandomAvatar] = useState(
    'https://joeschmoe.io/api/v1/random'
  );

  const navigate = useNavigate();

  // Redirect when register successful
  useEffect(() => {
    if (registerSuccess)
      setTimeout(() => {
        navigate('/login');
        unsetRegisterSuccess();
      }, 2000);
  }, [registerSuccess, navigate, unsetRegisterSuccess]);

  // Loading reRender
  useEffect(() => {
    showLoading();
    setTimeout(() => {
      hideLoading();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If logged in, can't access to register till logout
  useEffect(() => {
    // console.log('run useEffect regis isAuth');
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  // Get random avatar
  const changeRandomAvatar = () => {
    let randomNumber = Math.floor(Math.random() * 101);

    // console.log('change avatar');
    setRandomAvatar(`https://joeschmoe.io/api/v1/random${randomNumber}`);
  };

  // Submit
  const onFinish = async (values) => {
    // console.log('Received values of form: ', values);

    const submitedData = {
      ...values,
      avatar: randomAvatar,
      role: 'operator',
    };

    // console.log('data here1: ', submitedData);

    register(submitedData);
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
          sm={18}
          md={16}
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
              <h2 className='title'>Register</h2>
              <p className='shortDesc'>It would takes only a few step</p>
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
                name='register'
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item
                  className='avatar'
                  name='avatar'
                  style={{ marginBottom: '12px' }}
                >
                  <ImageComponent
                    id='avatar'
                    name='avatar'
                    ownStyle={{
                      borderRadius: '50%',
                      border: '1px solid #ccc',
                    }}
                    width={80}
                    height={80}
                    src={randomAvatar}
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    id='randomBtn'
                    type='primary'
                    htmlType='button'
                    size='large'
                    style={{
                      marginBottom: '24px',
                      borderRadius: '60px',
                    }}
                    onClick={changeRandomAvatar}
                  >
                    Random Avatar
                  </Button>
                </Form.Item>

                <Form.Item
                  name='firstName'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your First Name!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    size='large'
                    placeholder='First Name'
                    style={{
                      borderRadius: '60px',
                      height: '48px',
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name='lastName'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Last Name!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    size='large'
                    placeholder='Last Name'
                    style={{
                      height: '48px',
                      borderRadius: '60px',
                    }}
                  />
                </Form.Item>

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
                    Register
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
                    Already a member?
                    <br />
                    <Link to='/login' className='loginLink'>
                      Login
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

export default Register;
