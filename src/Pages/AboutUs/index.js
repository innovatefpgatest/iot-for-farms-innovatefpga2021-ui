import React from 'react';
import './index.less';
import {Card, Typography, Col, Row} from 'antd';

const {Title} = Typography

const AboutUs = () => {
  return (<>
    <Title>About Us</Title>
    <div className="site-card-border-less-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Andrew Dao" bordered={false}>
            <p>
              <i>Student, Master of Engineering (Electrical)</i><br/>
              <b>The University of Melbourne</b>
            </p>
            <p>ttntram2496@gmail.com</p>
            <p>+61 0413123939</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="David" bordered={false}>
            <p>
              <i>PhD Student</i><br/>
              <b>The University of Melbourne</b>
            </p>
            <p>ttntram2496@gmail.com</p>
            <p>+61 0413123939</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Tram Tran" bordered={false}>
            <p>
              <i>Student, Master of Computer Science</i><br/>
              <b>The University of Melbourne</b>
            </p>
            <p>ttntram2496@gmail.com</p>
            <p>+61 0413123939</p>
          </Card>
        </Col>
      </Row>
    </div>
  </>)
}

export default AboutUs