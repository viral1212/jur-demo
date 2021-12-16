import React, { useEffect } from 'react';
import Button from '../../components/Button';
import UserItem from '../../components/UserItem';
import Layout from '../../layout';
import { SCREEN_NAME } from '../../utils/screens';
import { useDispatch, useSelector } from 'react-redux';
import { getConversationsListAction } from '../../store/actions/conversations';
import { setCurrentScreenAction } from '../../store/actions/screen';

export default function AllConversation() {
  const dispatch = useDispatch();
  const Conversation = useSelector((state) => state.Conversation);
  const { conversationList } = Conversation;

  useEffect(() => {
    dispatch(getConversationsListAction.request());
  }, [dispatch]);

  return (
    <Layout title="Your Conversations" contentAlignment="left">
      <div className="flex flex-col items-start mt-20">
        <ul className="w-full h-64 xl:h-72 2xl:h-80 max-h-64 xl:max-h-72 2xl:max-h-80 overflow-y-auto">
          {!!conversationList?.length &&
            conversationList.map((cont) => {
              const { title, last_message } = cont;
              const subtitle = last_message[0]?.sender_name || '';
              const description = last_message[0]?.content || '';

              return (
                <li key={cont.id}>
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
      </div>
    </Layout>
  );
}
