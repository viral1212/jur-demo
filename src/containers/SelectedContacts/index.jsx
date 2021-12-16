import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserItem from '../../components/UserItem';
import Form from '../../components/Form';
import Layout from '../../layout';
import { SCREEN_NAME } from '../../utils/screens';
import { addConversationAction } from '../../store/actions/conversations';
import { setCurrentScreenAction } from '../../store/actions/screen';

export default function SelectedContacts() {
  const dispatch = useDispatch();
  const Contact = useSelector((state) => state.Contact);
  const { selectedUser, conversationContacts } = Contact;

  const layoutTitle = `Welcome ${
    selectedUser && selectedUser?.name?.split(' ')[0]
  }!`;
  const layoutSubTitle = `Give title to start a new conversation with  ${
    conversationContacts.length === 1
      ? conversationContacts.length + ' participant'
      : conversationContacts.length + ' participants'
  }`;
  const conversationContactsIDS = conversationContacts.map((c) => c.id);

  const handleOnSubmit = (values) => {
    const { title } = values;
    dispatch(
      addConversationAction.request({
        title,
        contact_ids: conversationContactsIDS,
      })
    );
    dispatch(
      setCurrentScreenAction.request({
        screenName: SCREEN_NAME.newConversation,
      })
    );
  };

  return (
    <Layout
      title={layoutTitle}
      subTitle={layoutSubTitle}
      showBackButton
      onHandleBackBtnClick={() =>
        dispatch(
          setCurrentScreenAction.request({
            screenName: SCREEN_NAME.noExistingConversation,
          })
        )
      }
    >
      <div className="flex flex-col items-center mt-20">
        <div className="grid grid-cols-2 gap-8 pt-12">
          {!!conversationContacts.length &&
            conversationContacts.map((cont, index) => (
              <UserItem key={index} isSelected title={cont.name} />
            ))}
        </div>
        <div className="pt-80 ml-48">
          <Form
            fieldName="title"
            defaultValues={{ title: '' }}
            onSubmit={handleOnSubmit}
            submitButtonText="Start Conversation"
          />
        </div>
      </div>
    </Layout>
  );
}
