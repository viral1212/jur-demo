import React from 'react';
import UserItem from '../../components/UserItem';
import Form from '../../components/Form';
import Layout from '../../layout';

export default function SelectedContacts() {
  return (
    <Layout
      title="Welcome George!"
      subTitle="Give title to start a new conversation with 2 participants"
      showBackButton
    >
      <div className="flex flex-col items-center mt-20">
        <div className="grid grid-cols-2 gap-8 pt-12">
          <UserItem
            onClick={() => console.log('hello')}
            isSelected
            title="Rama Jr"
            description="New day, new challenges"
          />
          <UserItem
            onClick={() => console.log('hello')}
            isSelected
            title="Rama Jr"
            description="New day, new challenges"
          />
        </div>
        <div className="pt-80 ml-48">
          <Form
            fieldName="title"
            defaultValues={{ title: '' }}
            onSubmit={(values) => console.log(values, 'values')}
            submitButtonText="Start Conversation"
          />
        </div>
      </div>
    </Layout>
  );
}
