import React from 'react';
import PropTypes from 'prop-types';
import UserItem from '../../components/UserItem';
import Form from '../../components/Form';
import Layout from '../../layout';

SelectedContacts.prototypes = {
  selectedContactsforConvo: PropTypes.arrayOf({
    id: PropTypes.number,
    title: PropTypes.number,
    description: PropTypes.number,
  }),
  selectedUser: PropTypes.objectOf({
    id: PropTypes.number,
    title: PropTypes.number,
    description: PropTypes.number,
  }),
  setConversations: PropTypes.func,
  setScreenCount: PropTypes.number,
};

export default function SelectedContacts({
  selectedContactsforConvo,
  setConversations,
  setScreenCount,
  selectedUser,
}) {
  return (
    <Layout
      title={`Welcome ${selectedUser.title.split(' ')[0]}!`}
      subTitle={`Give title to start a new conversation with  ${
        selectedContactsforConvo.length === 1
          ? selectedContactsforConvo.length + ' participant'
          : selectedContactsforConvo.length + ' participants'
      }`}
      showBackButton
      onHandleBackBtnClick={() => setScreenCount(2)}
    >
      <div className="flex flex-col items-center mt-20">
        <div className="grid grid-cols-2 gap-8 pt-12">
          {selectedContactsforConvo.map((contact) => (
            <UserItem
              onClick={() => console.log('hello')}
              isSelected
              title={contact.title}
              description={contact.description}
            />
          ))}
        </div>
        <div className="pt-80 ml-48">
          <Form
            fieldName="title"
            defaultValues={{ title: '' }}
            onSubmit={(values) => {
              setConversations({
                title: values.title,
                contact_ids: 1,
              });
              setScreenCount(4);
            }}
            submitButtonText="Start Conversation"
          />
        </div>
      </div>
    </Layout>
  );
}
