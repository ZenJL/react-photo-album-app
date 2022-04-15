import { Link, useNavigate } from 'react-router-dom';

//// Css Antd
import { Layout, Space, Button } from 'antd';
import { HomeTwoTone } from '@ant-design/icons';

// Context
import { usePhotoContext } from 'context/photoContext';

// Hooks
import useIsOnSmallScreen from 'hooks/isOnSmallScreen';

// Components
import ImageComponent from 'components/ImageComponent';
import DropdownMenu from './DropdownMenu';

const { Header } = Layout;

function HeaderSection() {
  const {
    unsetIsAuth,
    unsetUser,
    unsetLoginSuccess,
    unsetRegisterSuccess,
    isAuth,
    user,
    setPage,
    setLimitPhotos,
  } = usePhotoContext();

  const navigate = useNavigate();
  const onSmallScreen = useIsOnSmallScreen();

  // console.log('test screen header: ', onSmallScreen);
  // console.log('user o head: ', user);
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    unsetIsAuth();
    unsetLoginSuccess();
    unsetRegisterSuccess();
    unsetUser();
    setPage();
    setLimitPhotos();
    navigate('/login');
  };

  const toOriginHome = () => {
    setPage();
    setLimitPhotos();
  };

  return (
    <Header className='headerSection'>
      <Space align='center' size={'middle'} className='headerGroup'>
        {onSmallScreen ? (
          <DropdownMenu />
        ) : (
          <>
            <Link to={'/'} className='logoLink' onClick={toOriginHome}>
              <HomeTwoTone />
            </Link>

            <Link to='/photo-add' className='addPhotoNav'>
              Add Photo
            </Link>
          </>
        )}
      </Space>

      <Space className='headerGroup' align='center' size={'middle'}>
        {isAuth && Object.keys(user).length > 0 && (
          <>
            <div className='userProfile'>
              <div className='avatarDiv'>
                <ImageComponent
                  className='userAvatar'
                  ownStyle={{
                    borderRadius: '50%',
                    border: '1px solid #ccc',
                    display: 'flex',
                  }}
                  width={50}
                  height={50}
                  src={user.avatar}
                />
              </div>
              <div className='userInfo'>Hello, {user.firstName}</div>
            </div>

            {!onSmallScreen && (
              <Button
                danger
                size='large'
                className='logoutBtn'
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </>
        )}
      </Space>
    </Header>
  );
}

export default HeaderSection;
