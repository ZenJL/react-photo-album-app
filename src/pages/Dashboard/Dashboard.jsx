import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Antd
import { Row, Col, Button, Card, Pagination, BackTop, Modal } from 'antd';
import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

// Context
import { usePhotoContext } from 'context/photoContext';

// Components
import Spinner from 'components/Spinner';

//// Variables & functions
const { Meta } = Card;
const { confirm } = Modal;

function itemRender(page, type, originalElement) {
  if (type === 'prev') {
    return <Link to={''}>Previous</Link>;
  }
  if (type === 'next') {
    return <Link to={''}>Next</Link>;
  }
  // return originalElement;
  return page;
}

function Dashboard() {
  const {
    page,
    limitPhotos,
    getAllPhotos,
    photos,
    totalPhotos,
    isLoading,
    // hideLoading,
    // showLoading,
    setPage,
    currentPagePath,
    setPhoto,
    deletePhoto,
  } = usePhotoContext();

  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');
  // console.log('page dc giu: ', page);

  function showDeleteConfirm(photoId) {
    confirm({
      title: 'Are you sure delete this photo?',
      icon: <ExclamationCircleOutlined />,
      content: 'WARNING! This action can not be undo!',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // console.log(' click nut OK: ', photoId);
        // console.log(' click nut OK token: ', token);
        deletePhoto(token, photoId);
      },
      onCancel() {
        // console.log('Cancel cancer: ', photoId);
        return;
      },
    });
  }

  // const useQueryString = () => {
  //   return new URLSearchParams(useLocation().search);
  // };

  // const queryString = useQueryString();

  const onChangePage = (page) => {
    // setCurrentPage(page);
    setPage(page);
    // console.log('page ne: ', page);
  };

  useEffect(() => {
    // if (currentPagePath) return navigate({ pathName: currentPagePath });

    try {
      navigate({
        pathname: '/',
        search: `page=${page}&limit=${limitPhotos}`,
      });

      getAllPhotos(token, page, limitPhotos);
      setPhoto();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, [page, limitPhotos, currentPagePath, token, navigate]);

  if (isLoading) return <Spinner />;
  // if (photos.length === 0) return <Spinner />;

  return (
    <>
      <Row
        justify='center'
        align='middle'
        style={{
          marginTop: '24px',
        }}
      >
        <Col xs={24} sm={24} md={16} lg={10} justify='center' align='middle'>
          <h2 className='title'>Welcome to Photo Album App</h2>
          <p className='shortDesc'>
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don’t simply skip over it entirely.
          </p>
        </Col>
      </Row>
      <Row
        justify='end'
        align='middle'
        style={{
          marginTop: '24px',
        }}
      >
        <Col flex={'108px'} align='center'>
          <Button
            type='primary'
            size='large'
            onClick={() => navigate('/photo-add')}
          >
            Add Photo
          </Button>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col
          span={24}
          justify='center'
          align='middle'
          style={{
            maxWidth: '100%',
          }}
        >
          <Row gutter={[16, 16]}>
            {photos.length === 0 ? (
              <Col flex={'auto'}>
                <h3>There no photos yet!</h3>
              </Col>
            ) : (
              photos.map((photo) => (
                <Col
                  key={photo._id}
                  xs={24}
                  // sm={8}
                  md={12}
                  lg={8}
                  style={{ display: 'flex', flexDirection: 'column' }}
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
                        alt='photoImage'
                        src={photo.image}
                        height={'266px'}
                        className='cardImg'
                      />
                    }
                    actions={[
                      <EyeOutlined
                        key='view'
                        onClick={() => navigate(`/photo-detail/${photo._id}`)}
                      />,
                      <EditOutlined
                        key='edit'
                        onClick={() => navigate(`/photo-edit/${photo._id}`)}
                      />,
                      <DeleteOutlined
                        key='delete'
                        onClick={() => showDeleteConfirm(photo._id)}
                      />,
                    ]}
                    extra={`${new Date(photo.date).getMinutes()} minutes ago`}
                  >
                    <Meta title={photo.title} description={photo.description} />
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>

      <Row
        align='middle'
        justify='end'
        style={{
          marginTop: '24px',
          marginBottom: '24px',
        }}
      >
        <Pagination
          // need total items (from context) DONE
          total={totalPhotos}
          // need limit here (get from URL) DONE
          pageSize={limitPhotos}
          current={page}
          onChange={onChangePage}
          itemRender={itemRender}
          showTitle={false}
        />
        <BackTop />
      </Row>
    </>
  );
}

export default Dashboard;
