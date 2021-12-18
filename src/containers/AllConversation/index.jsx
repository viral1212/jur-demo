import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import UserItem from '../../components/UserItem';
import Layout from '../../layout';
import { SCREEN_NAME } from '../../utils/screens';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConversationsListAction,
  getConversationsMessageAction,
} from '../../store/actions/conversations';
import { setCurrentScreenAction } from '../../store/actions/screen';
import Skeleton from '../../components/Skeleton';
import { showPopup } from '../../utils/toast-notification';
import { truncate } from '../../utils/utility';

AllConversation.propTypes = {
  newMessages: PropTypes.object,
};

export default function AllConversation({ newMessages }) {
  const dispatch = useDispatch();
  const Contact = useSelector((state) => state.Contact);
  const { selectedUser } = Contact;
  const Conversation = useSelector((state) => state.Conversation);
  const { isLoading, conversationList } = Conversation;

  useEffect(() => {
    if (newMessages?.sender_id && selectedUser.id !== newMessages?.sender_id) {
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
                title && (
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
                )
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
