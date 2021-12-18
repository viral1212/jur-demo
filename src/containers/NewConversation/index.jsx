import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Form from '../../components/Form';
import UserItem from '../../components/UserItem';
import Layout from '../../layout';
import { SCREEN_NAME } from '../../utils/screens';
import { useDispatch, useSelector } from 'react-redux';
import {
  addConversationsMessagesAction,
  getConversationAction,
  getConversationsMessageAction,
  getConversationsMessageListAction,
} from '../../store/actions/conversations';
import { setCurrentScreenAction } from '../../store/actions/screen';
import Skeleton from '../../components/Skeleton';
import { showPopup } from '../../utils/toast-notification';
import { truncate } from '../../utils/utility';

NewConversation.propTypes = {
  newMessages: PropTypes.object,
};

export default function NewConversation({ newMessages }) {
  const chatRef = useRef(null);
  const dispatch = useDispatch();
  const Contact = useSelector((state) => state.Contact);
  const { selectedUser } = Contact;
  const Conversation = useSelector((state) => state.Conversation);
  const { addNewconversationsData, conversations, isLoading, messageList } =
    Conversation;
  const Screen = useSelector((state) => state.Screen);
  const { queryState } = Screen;
  const { selectedConversation = {} } = queryState;

  useEffect(() => {
    if (
      newMessages?.sender_id &&
      selectedUser.id !== newMessages?.sender_id &&
      conversations?.id !== newMessages?.conversation_id
    ) {
      const successCB = (conversation_id, sender_name, title, content) => {
        const truncatedString = truncate(content, 25);
        const handleOnClick = () => {
          dispatch(
            setCurrentScreenAction.request({
              screenName: SCREEN_NAME.newConversation,
              queryState: {
                selectedConversation: { id: conversation_id, title },
              },
            })
          );
        };
        showPopup(
          <UserItem
            title={sender_name}
            subtitle={title}
            description={truncatedString}
            isShowSentIcon
            onClick={handleOnClick}
          />
        );
      };
      dispatch(
        getConversationsMessageAction.request({
          id: newMessages.conversation_id,
          messageId: newMessages.id,
          successCB,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, newMessages]);

  const getConversationMessages = useCallback(
    (id) => {
      dispatch(getConversationAction.request(id));
      dispatch(getConversationsMessageListAction.request(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (
      addNewconversationsData &&
      Object.keys(addNewconversationsData)?.length > 0
    ) {
      getConversationMessages(addNewconversationsData?.id);
    }
  }, [addNewconversationsData, getConversationMessages]);

  useEffect(() => {
    if (
      Object.keys(selectedConversation)?.length > 0 &&
      selectedConversation?.id
    ) {
      getConversationMessages(selectedConversation?.id);
    }
  }, [getConversationMessages, selectedConversation]);

  const executeScroll = () => {
    chatRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOnSubmit = (values) => {
    const { content } = values;
    const successCB = () =>
      dispatch(
        getConversationsMessageListAction.request(
          addNewconversationsData?.id || selectedConversation?.id
        )
      );

    dispatch(
      addConversationsMessagesAction.request({
        body: { content },
        successCB,
      })
    );

    executeScroll();
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
      className="mt-7 mb-0"
      showBackButton
    >
      <div className="flex items-start mt-10 pb-14">
        <ul className="w-full flex flex-col-reverse h-64 max-h-64 lg:h-80 lg:max-h-80 xl:h-96 xl:max-h-96 overflow-y-auto">
          <Skeleton visible={isLoading} />
          {!!messageList?.length &&
            messageList.map((message) => (
              <li key={message.id}>
                <UserItem
                  className="cursor-default py-2.5 pl-2.5 hover:bg-cyan-150 focus:bg-gray-150"
                  title={message.sender_name}
                  description={message.content}
                />
                <div ref={chatRef} />
              </li>
            ))}
        </ul>
      </div>
      <div>
        <Form
          fieldName="content"
          defaultValues={{ content: '' }}
          onSubmit={handleOnSubmit}
          formGrid={3}
          submitButtonText="Send"
          disabled={isLoading}
        />
      </div>
    </Layout>
  );
}
