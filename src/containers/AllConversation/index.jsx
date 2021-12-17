import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import UserItem from '../../components/UserItem';
import Layout from '../../layout';
import { SCREEN_NAME } from '../../utils/screens';
import { useDispatch, useSelector } from 'react-redux';
import { getConversationsListAction } from '../../store/actions/conversations';
import { setCurrentScreenAction } from '../../store/actions/screen';
import Skeleton from '../../components/Skeleton';
import { showPopup } from '../../utils/toast-notification';
import { truncate } from '../../utils/utility';

AllConversation.propTypes = {
  message: PropTypes.object,
};

export default function AllConversation({ messages }) {
  const dispatch = useDispatch();
  const Contact = useSelector((state) => state.Contact);
  const { selectedUser } = Contact;
  const Conversation = useSelector((state) => state.Conversation);
  const { isLoading, conversationList } = Conversation;

  useEffect(() => {
    if (messages?.sender_id && selectedUser.id !== messages?.sender_id) {
      const truncatedString = truncate(messages.content, 25);
      const conversation = conversationList.find(
        (c) => c.id === messages.conversation_id
      );
      showPopup(
        <UserItem
          title={messages.sender_name}
          subtitle={conversation.title}
          description={truncatedString}
          isShowSentIcon
        />
      );
    }
  }, [conversationList, messages, selectedUser.id]);

  useEffect(() => {
    dispatch(getConversationsListAction.request());
  }, [dispatch]);

  return (
    <Layout title="Your Conversations" contentAlignment="left">
      <div className="flex flex-col items-start mt-20">
        <Skeleton visible={isLoading} />
        <ul className="w-full h-64 xl:h-72 2xl:h-80 max-h-64 xl:max-h-72 2xl:max-h-80 overflow-y-auto">
          {!!conversationList?.length &&
            conversationList.map((cont, index) => {
              const { title, last_message } = cont;
              const subtitle = last_message[0]?.sender_name || '';
              const description = last_message[0]?.content || '';

              return (
                <li key={index}>
                  <UserItem
                    onClick={() =>
                      dispatch(
                        setCurrentScreenAction.request({
                          screenName: SCREEN_NAME.newConversation,
                          queryState: { selectedConversation: cont },
                        })
                      )
                    }
                    className="py-2.5 pl-2.5 hover:bg-cyan-150 focus:bg-gray-150"
                    title={title}
                    subtitle={subtitle}
                    description={description}
                  />
                </li>
              );
            })}
        </ul>
        {!isLoading && (
          <div className="w-full flex justify-end pt-10">
            <Button
              onClick={() =>
                dispatch(
                  setCurrentScreenAction.request({
                    screenName: SCREEN_NAME.noExistingConversation,
                    queryState: { isCreateNewConversation: true },
                  })
                )
              }
              className="md:p-5"
              shouldShowBorder
              shouldShowShadow
            >
              Create New Conversation
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
