import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from '../../components/Form';
import UserItem from '../../components/UserItem';
import Layout from '../../layout';

Conversions.prototypes = {
  conversations: PropTypes.arrayOf({
    title: PropTypes.string,
    contact_ids: PropTypes.arrayOf(PropTypes.number),
  }),
  setConversations: PropTypes.func,
  setScreenCount: PropTypes.number,
};

export default function Conversions({ conversations, setScreenCount }) {
  const [chats, setChats] = useState([]);

  const formatTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };
  return (
    <Layout
      title={conversations.title}
      contentAlignment="left"
      onHandleBackBtnClick={() => setScreenCount(5)}
      showBackButton
    >
      <div className="flex flex-col items-start mt-20">
        <ul>
          {!!chats.length &&
            chats.map((chat) => (
              <li key={chat.id}>
                <UserItem
                  onClick={() => console.log(chat.id)}
                  // isSelected={selectedContactId === contact.id}
                  className="mt-5"
                  title={chat.title}
                  description={chat.description}
                />
              </li>
            ))}
        </ul>
      </div>
      <div className="fixed bottom-0 py-20">
        <Form
          fieldName="title"
          defaultValues={{ title: '' }}
          onSubmit={(values) => {
            setChats([
              ...chats,
              {
                title: values.title,
                description: `You at ${formatTime(new Date())}`,
              },
            ]);
          }}
          formGrid={6}
          submitButtonText="Send"
        />
      </div>
    </Layout>
  );
}
