import React, { useState } from 'react';
import { Drawer, Button, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import './styles.sass';

const { Meta } = Card;

const EvaluationForm = ({ formType, visible, onClose }) => {
  const [evaluationData, setEvaluationData] = useState({
    candidateName: '',
    technicalSkills: 0,
    communicationSkills: 0,
    problemSolving: 0,
    teamwork: 0,
    overallImpression: '',
  });

  const handleInputChange = (name, value) => {
    setEvaluationData({
      ...evaluationData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Evaluation Data:', evaluationData);
    onClose();
  };

  const renderForm = () => {
    switch (formType) {
      case 'react':
        return (
          <>
            <label>
              Technical Skills (out of 10):
              <input
                type="number"
                name="technicalSkills"
                value={evaluationData.technicalSkills}
                onChange={(e) => handleInputChange('technicalSkills', e.target.value)}
                min="0"
                max="10"
                required
              />
            </label>
            {/* Add React-specific fields as needed */}
          </>
        );

      case 'c++':
        return (
          <>
            <label>
              Coding Skills (out of 10):
              <input
                type="number"
                name="codingSkills"
                value={evaluationData.codingSkills}
                onChange={(e) => handleInputChange('codingSkills', e.target.value)}
                min="0"
                max="10"
                required
              />
            </label>
            {/* Add C++-specific fields as needed */}
          </>
        );

      case 'rubyonrails':
        return (
          <>
            <label>
              Ruby on Rails Skills (out of 10):
              <input
                type="number"
                name="railsSkills"
                value={evaluationData.railsSkills}
                onChange={(e) => handleInputChange('railsSkills', e.target.value)}
                min="0"
                max="10"
                required
              />
            </label>
            {/* Add Ruby on Rails-specific fields as needed */}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Drawer
      title={`Candidate Evaluation - ${formType.toUpperCase()}`}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={400}
    >
      <form onSubmit={handleSubmit}>
        <label>
          Candidate Name:
          <input
            type="text"
            name="candidateName"
            value={evaluationData.candidateName}
            onChange={(e) => handleInputChange('candidateName', e.target.value)}
            required
          />
        </label>
        <br />

        {renderForm()}

        <label>
          Overall Impression:
          <textarea
            name="overallImpression"
            value={evaluationData.overallImpression}
            onChange={(e) => handleInputChange('overallImpression', e.target.value)}
            required
          />
        </label>
        <br />

        <Button type="primary" htmlType="submit">
          Submit Evaluation
        </Button>
      </form>
    </Drawer>
  );
};

const CandidateEvaluationApp = () => {
    const [visible, setVisible] = useState(false);
    const [formType, setFormType] = useState('');
  
    const showDrawer = (type) => {
      setFormType(type);
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };
  
    const getCardTitle = () => {
      switch (formType) {
        case 'react':
          return 'React Evaluation Form';
  
        case 'c++':
          return 'C++ Evaluation Form';
  
        case 'rubyonrails':
          return 'Ruby on Rails Evaluation Form';
  
        default:
          return '';
      }
    };
  
    const handleCardClick = (type) => {
      showDrawer(type);
    };
  
    return (
      <div>
        <Button>Create Evaluation Form</Button>
        <div className='evaluaton-form'>
          <Card
            style={{ width: 300, marginTop: 16, cursor: 'pointer' }}
            onClick={() => handleCardClick('react')}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://cdn.iconscout.com/icon/free/png-512/free-react-1-282599.png?f=webp&w=512" />}
              title="React Evaluation Form"
              description="Click to open the evaluation form."
            />
          </Card>
          <Card
            style={{ width: 300, marginTop: 16, cursor: 'pointer' }}
            onClick={() => handleCardClick('c++')}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://user-images.githubusercontent.com/42747200/46140125-da084900-c26d-11e8-8ea7-c45ae6306309.png" />}
              title="C++ Evaluation Form"
              description="Click to open the evaluation form."
            />
          </Card>
          <Card
            style={{ width: 300, marginTop: 16, cursor: 'pointer' }}
            onClick={() => handleCardClick('rubyonrails')}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://icon-library.com/images/ruby-on-rails-icon/ruby-on-rails-icon-29.jpg" />}
              title="Ruby on Rails Evaluation Form"
              description="Click to open the evaluation form."
            />
          </Card>
        </div>
        <EvaluationForm formType={formType} visible={visible} onClose={onClose} />
      </div>
    );
  };

export default CandidateEvaluationApp;
