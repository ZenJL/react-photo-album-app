import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Antd
import { Row, Col, Card } from 'antd';

// Context
import { usePhotoContext } from 'context/photoContext';

// Helper
import { getTokenFromSession } from 'helpers/tokenHelper';

// Components
import Spinner from 'components/Spinner';

// Variables from Antd
const { Meta } = Card;

//// Main
function PhotoDetail() {
  const { photo, getPhoto, isLoading } = usePhotoContext();

  // const navigate = useNavigate();
  const { photoId } = useParams();
  // console.log('params detail: ', photoId);

  const token = getTokenFromSession();
  // console.log('photo from detail: ', photo);

  useEffect(() => {
    getPhoto(token, photoId);
    // eslint-disable-next-line
  }, [token, photoId]);

  if (isLoading || Object.keys(photo).length === 0) return <Spinner />;

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
          xs={22}
          sm={20}
          justify='center'
          align='middle'
          style={{
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
              <h2 className='title'>Photo detail</h2>
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
              <Card
                className='card'
                style={{
                  flex: '1',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
                cover={
                  <img
                    alt='example'
                    src={photo.image}
                    height={'266px'}
                    className='cardImg'
                  />
                }
                extra={`${new Date(photo.date).getMinutes()} minutes ago`}
              >
                <Meta
                  style={{ textAlign: 'start' }}
                  title={photo.title}
                  description={photo.description}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default PhotoDetail;
