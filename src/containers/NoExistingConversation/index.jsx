import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '../../components/Typography';
import UserItem from '../../components/UserItem';
import Button from '../../components/Button';
import Layout from '../../layout';
import { SCREEN_NAME } from '../../utils/screens';
import { setSelectedContactForConversationAction } from '../../store/actions/contacts';
import { getConversationsListAction } from '../../store/actions/conversations';
import { setCurrentScreenAction } from '../../store/actions/screen';
import Skeleton from '../../components/Skeleton';

export default function NoExistingConversation() {
  const dispatch = useDispatch();
  const Contact = useSelector((state) => state.Contact);
  const { selectedUser, contactList, isLoading } = Contact;
  const Conversation = useSelector((state) => state.Conversation);
  const { conversationList } = Conversation;
  const Screen = useSelector((state) => state.Screen);
  const { queryState } = Screen;
  const { isCreateNewConversation = false } = queryState;

  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    dispatch(getConversationsListAction.request());
  }, [dispatch]);

  const haveConversations = useMemo(
    () =>
      conversationList.some((con) => {
        return (
          !!con.last_message?.length &&
          con.last_message[0]?.sender_id === selectedUser.id
        );
      }),
    [conversationList, selectedUser.id]
  );

  useEffect(() => {
    if (haveConversations && !isCreateNewConversation) {
      dispatch(
        setCurrentScreenAction.request({
          screenName: SCREEN_NAME.allConversation,
        })
      );
    }
  }, [dispatch, haveConversations, isCreateNewConversation]);

  const handleContactClick = (contact) => {
    const isSelectedContact = selectedContacts.find(
      (val) => val.id === contact.id
    );
    if (!!isSelectedContact) {
      selectedContacts.splice(selectedContacts.indexOf(isSelectedContact), 1);
      setSelectedContacts([...selectedContacts]);
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleSelectedContactsConversation = useCallback(() => {
    dispatch(setSelectedContactForConversationAction.request(selectedContacts));
    dispatch(
      setCurrentScreenAction.request({
        screenName: SCREEN_NAME.selectedContacts,
      })
    );
  }, [dispatch, selectedContacts]);

  return (
    <Layout
      title={`Welcome ${selectedUser && selectedUser?.name?.split(' ')[0]}!`}
      subTitle={!haveConversations ? 'You don’t have any conversations' : ''}
      className="xl:large-container mx-0 mt-10"
    >
      <Typography
        text="Select contacts to message"
        className="mt-16 pt-4 text-5xl leading-10 font-normal"
      />
      <div className="flex flex-col items-center mt-11 h-64 max-h-64 lg:h-80 lg:max-h-80 xl:h-96 xl:max-h-96 overflow-y-auto">
        <Skeleton visible={isLoading} />
        <ul className="w-64">
          {contactList?.length > 0 &&
            contactList
              .filter((c) => c.id !== selectedUser.id)
              .map((con) => (
                <li key={con.id} className="grid grid-cols-1">
                  <UserItem
                    onClick={() => handleContactClick(con)}
                    isSelected={
                      !!selectedContacts.find((sel) => con.id === sel.id)
                    }
                    className="py-2.5 pl-2.5"
                    title={con.name}
                  />
                </li>
              ))}
        </ul>
      </div>
      {!!selectedContacts.length && !isLoading && (
        <div className="flex justify-end w-full -mt-8 relative z-20">
          <Button
            onClick={handleSelectedContactsConversation}
            className="md:p-5 mr-40"
            shouldShowBorder
            shouldShowShadow
          >
            Continue
          </Button>
        </div>
      )}
    </Layout>
  );
}
