import { Link, useNavigate } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

// Context
import { usePhotoContext } from 'context/photoContext';

// function handleMenuClick(e) {
//   console.log('click', e);
// }

function DropdownMenu() {
  const {
    unsetIsAuth,
    unsetLoginSuccess,
    unsetRegisterSuccess,
    unsetUser,
    setPage,
    setLimitPhotos,
  } = usePhotoContext();

  const navigate = useNavigate();

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

  const menu = (
    <Menu
      // onClick={handleMenuClick}
      style={{ fontSize: '30px' }}
    >
      <Menu.Item
        key='1'
        icon={<HomeOutlined style={{ fontSize: '20px' }} />}
        style={{
          fontSize: '16px',
          width: '148px',
          height: '40px',
        }}
      >
        <Link to={'/'}>Home</Link>
      </Menu.Item>

      <Menu.Item
        key='2'
        icon={<PlusCircleOutlined style={{ fontSize: '20px' }} />}
        style={{
          fontSize: '16px',
          width: '148px',
          height: '40px',
        }}
      >
        <Link to='/photo-add'>Add Photo</Link>
      </Menu.Item>
      <Menu.Item
        key='3'
        icon={<LogoutOutlined style={{ fontSize: '20px' }} />}
        onClick={handleLogout}
        style={{
          fontSize: '16px',
          width: '148px',
          height: '40px',
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown
        trigger={['click']}
        overlay={menu}
        placement='bottomLeft'
        arrow
        style={{
          fontSize: '50px',
        }}
      >
        <MenuOutlined style={{ fontSize: '30px', display: 'block' }} />
      </Dropdown>
    </>
  );
}

export default DropdownMenu;
