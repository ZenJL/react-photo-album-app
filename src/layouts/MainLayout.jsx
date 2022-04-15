//// Css Antd
import { Layout } from 'antd';

// Context
import { usePhotoContext } from 'context/photoContext';

// Components
import HeaderSection from 'components/HeaderSection';
import FooterSection from 'components/FooterSection';
import Spinner from 'components/Spinner';

//// Variables
const { Content } = Layout;

function MainLayout({ children }) {
  const { isLoading } = usePhotoContext();

  if (isLoading) return <Spinner />;

  return (
    <>
      {/* {isLoading && <Spinner />} */}

      <div className='mainLayout'>
        <Layout
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '100vh',
          }}
        >
          <HeaderSection />
          <Content className='contentSection'>{children}</Content>
          <FooterSection />
        </Layout>
      </div>
    </>
  );
}

export default MainLayout;
