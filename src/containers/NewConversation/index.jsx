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
          {!!messageList?.length &&
            messageList.map((message) => (
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
