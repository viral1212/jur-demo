import React, { useCallback, useEffect } from 'react';
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

export default function NewConversation() {
  const dispatch = useDispatch();
  const Conversation = useSelector((state) => state.Conversation);
  const { addNewconversationsData, conversations } = Conversation;
  const { recent_messages } = conversations;
  const Screen = useSelector((state) => state.Screen);
  const { queryState } = Screen;
  const { selectedConversation = {} } = queryState;

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
      showBackButton
    >
      <div className="flex flex-col items-start mt-20">
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
      <div className="fixed bottom-0 py-10">
        <Form
          fieldName="content"
          defaultValues={{ content: '' }}
          onSubmit={handleOnSubmit}
          formGrid={6}
          submitButtonText="Send"
        />
      </div>
    </Layout>
  );
}
