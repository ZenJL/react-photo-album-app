import React from 'react';
import { useNavigate } from 'react-router-dom';

// Antd
import { Row, Col, Button, Result } from 'antd';

function NotFound() {
  const navigate = useNavigate();

  const handleToHomeBtn = () => {
    navigate('/');
  };

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
          span={14}
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
          <Result
            style={{
              fontSize: '28px',
              fontWeight: '700',
            }}
            status='404'
            title='Oops! - 404'
            subTitle='Sorry, the page you visited does not exist.'
            extra={
              <Button type='primary' size='large' onClick={handleToHomeBtn}>
                Back Home
              </Button>
            }
          />
        </Col>
      </Row>
    </>
  );
}

export default NotFound;
