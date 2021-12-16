import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import UserItem from '../../components/UserItem';
import Layout from '../../layout';
import { SCREEN_NAME } from '../../utils/screens';
import {
  getContactsListAction,
  setSelectedContactAction,
} from '../../store/actions/contacts';
import { setCurrentScreenAction } from '../../store/actions/screen';
import Skeleton from '../../components/Skeleton';

export default function FirstTimeUser() {
  const dispatch = useDispatch();
  const Contact = useSelector((state) => state.Contact);
  const { contactList, isLoading } = Contact;
  const Conversation = useSelector((state) => state.Conversation);
  const { conversationList } = Conversation;
  const [selectedContact, setSelectedContact] = useState({});

  useEffect(() => {
    dispatch(getContactsListAction.request());
  }, [dispatch]);

  const haveConversations = useMemo(
    () =>
      conversationList.some((con) => {
        return (
          !!con.last_message?.length &&
          con.last_message[0]?.sender_id === selectedContact.id
        );
      }),
    [conversationList, selectedContact.id]
  );

  const handleSelectedUserContact = useCallback(() => {
    dispatch(setSelectedContactAction.request(selectedContact));

    if (haveConversations) {
      dispatch(
        setCurrentScreenAction.request({
          screenName: SCREEN_NAME.allConversation,
        })
      );
    } else {
      dispatch(
        setCurrentScreenAction.request({
          screenName: SCREEN_NAME.noExistingConversation,
        })
      );
    }
  }, [dispatch, haveConversations, selectedContact]);

  return (
    <Layout title="Let us know who you are">
      <div className="flex flex-col items-center mt-20">
        <ul className="w-64 h-64 xl:h-72 2xl:h-80 max-h-64 xl:max-h-72 2xl:max-h-80 overflow-y-auto">
          <Skeleton visible={isLoading} />
          {contactList?.length > 0 &&
            contactList.map((cont) => (
              <li key={cont.id}>
                <UserItem
                  onClick={() => setSelectedContact(cont)}
                  isSelected={selectedContact?.id === cont.id}
                  className="mt-5"
                  title={cont.name}
                />
              </li>
            ))}
        </ul>
      </div>
      {!!Object.keys(selectedContact).length && !isLoading && (
        <div className="flex justify-end w-full mt-8">
          <Button
            onClick={handleSelectedUserContact}
            className="md:p-5 mr-28"
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
