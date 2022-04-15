import React from 'react';

import { Layout } from 'antd';

const { Footer } = Layout;

const getYear = new Date().getFullYear();

function FooterSection() {
  return (
    <Footer className='footerSection'>
      <p>&copy; {getYear} All rights reserved</p>
      <p>Powered by Ant Design</p>
    </Footer>
  );
}

export default FooterSection;
