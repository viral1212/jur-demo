import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from '../../components/Form';
import UserItem from '../../components/UserItem';
import Layout from '../../layout';
import { SCREEN_NAME } from '../../utils/screens';
import { useDispatch, useSelector } from 'react-redux';
import {
  addConversationsMessagesAction,
  getConversationAction,
} from '../../store/actions/conversations';
import { setCurrentScreenAction } from '../../store/actions/screen';
import Skeleton from '../../components/Skeleton';
import { showPopup } from '../../utils/toast-notification';

NewConversation.propTypes = {
  message: PropTypes.object,
};

export default function NewConversation({ messages }) {
  const dispatch = useDispatch();
  const Contact = useSelector((state) => state.Contact);
  const { selectedUser } = Contact;
  const Conversation = useSelector((state) => state.Conversation);
  const { addNewconversationsData, conversations, isLoading } = Conversation;
  const { recent_messages } = conversations;
  const Screen = useSelector((state) => state.Screen);
  const { queryState } = Screen;
  const { selectedConversation = {} } = queryState;

  useEffect(() => {
    if (selectedUser.id !== messages?.sender_id) {
      showPopup(messages.content);
    }
  }, [messages, selectedUser.id]);

  const getConversation = useCallback(
    (id) => {
      dispatch(getConversationAction.request(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (
      addNewconversationsData &&
      Object.keys(addNewconversationsData)?.length > 0
    ) {
      getConversation(addNewconversationsData?.id);
    }
  }, [addNewconversationsData, getConversation]);

  useEffect(() => {
    if (
      Object.keys(selectedConversation)?.length > 0 &&
      selectedConversation?.id
    ) {
      getConversation(selectedConversation?.id);
    }
  }, [getConversation, selectedConversation]);

  const handleOnSubmit = (values) => {
    const { content } = values;

    dispatch(
      addConversationsMessagesAction.request({
        body: { content },
        successCB: () =>
          dispatch(
            getConversationAction.request(
              addNewconversationsData?.id || selectedConversation?.id
            )
          ),
      })
    );
  };

  return (
    <Layout
      title={addNewconversationsData?.title || selectedConversation?.title}
      contentAlignment="left"
      onHandleBackBtnClick={() =>
        dispatch(
          setCurrentScreenAction.request({
            screenName: SCREEN_NAME.allConversation,
          })
        )
      }
      className="mb-0"
      showBackButton
    >
      <div className="flex flex-col items-start mt-20">
        <Skeleton visible={isLoading} />
        <ul className="w-full h-64 xl:h-72 2xl:h-80 max-h-64 xl:max-h-72 2xl:max-h-80 overflow-y-auto">
          {!!recent_messages?.length &&
            recent_messages.map((message) => (
              <li key={message.id}>
                <UserItem
                  className="cursor-default py-2.5 pl-2.5 hover:bg-cyan-150 focus:bg-gray-150"
                  title={message.sender_name}
                  description={message.content}
                />
              </li>
            ))}
        </ul>
      </div>
      {!isLoading && (
        <div className="pt-14">
          <Form
            fieldName="content"
            defaultValues={{ content: '' }}
            onSubmit={handleOnSubmit}
            formGrid={6}
            submitButtonText="Send"
          />
        </div>
      )}
    </Layout>
  );
}
