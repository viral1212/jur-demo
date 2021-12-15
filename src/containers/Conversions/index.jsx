import React from 'react';
import Form from '../../components/Form';
import UserItem from '../../components/UserItem';
import Layout from '../../layout';

const contactList = [
  {
    id: 1,
    title: 'Amanda Nano',
    description: 'Hey there! I’m using Jur chat',
  },
  {
    id: 2,
    title: 'Rama Jr',
    description: 'Busy',
  },
  {
    id: 3,
    title: 'George Silva',
    description: 'Call if urgent',
  },
  {
    id: 4,
    title: 'Fu Shang',
    description: 'New day, new challenges',
  },
  {
    id: 5,
    title: 'Person Name',
    description: 'Chat only',
  },
  {
    id: 6,
    title: 'Person Name',
    description: 'Hey there! I’m using Jur chat',
  },
];

export default function Conversions() {
  return (
    <Layout
      title="Furniture Shopping Together"
      contentAlignment="left"
      onHandleBackBtnClick={() => console.log('clicked')}
      showBackButton
    >
      <div className="flex flex-col items-start mt-20">
        <ul>
          {contactList.map((contact) => (
            <li key={contact.id}>
              <UserItem
                onClick={() => console.log(contact.id)}
                // isSelected={selectedContactId === contact.id}
                className="mt-5"
                title={contact.title}
                description={contact.description}
              />
            </li>
          ))}
        </ul>
        <div className="pt-32">
          <Form
            fieldName="title"
            defaultValues={{ title: '' }}
            onSubmit={(values) => console.log(values, 'values')}
            formGrid={6}
            submitButtonText="Send"
          />
        </div>
      </div>
    </Layout>
  );
}
