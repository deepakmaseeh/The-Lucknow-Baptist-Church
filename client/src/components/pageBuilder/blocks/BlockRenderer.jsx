import React from 'react';
import Section from './Section';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Image from './Image';
import Button from './Button';
import Spacer from './Spacer';
import Divider from './Divider';
import Columns from './Columns';
import Form from './Form';

function BlockRenderer({ block, onUpdateProps }) {
  const components = {
    section: Section,
    heading: Heading,
    paragraph: Paragraph,
    image: Image,
    button: Button,
    spacer: Spacer,
    divider: Divider,
    columns: Columns,
    form: Form
  };

  const Component = components[block.type];

  if (!Component) {
    return <div style={{ padding: '20px', background: '#ffebee', color: '#c62828' }}>
      Unknown block type: {block.type}
    </div>;
  }

  return <Component {...block.props} styles={block.styles} onUpdateProps={onUpdateProps} />;
}

export default BlockRenderer;

