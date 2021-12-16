import React, { useCallback, useEffect, useState } from 'react';
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

export default function FirstTimeUser() {
  const dispatch = useDispatch();
  const Contact = useSelector((state) => state.Contact);
  const [selectedContact, setSelectedContact] = useState({});

  useEffect(() => {
    dispatch(getContactsListAction.request());
  }, [dispatch]);

  const handleSelectedUserContact = useCallback(() => {
    dispatch(setSelectedContactAction.request(selectedContact));
    dispatch(
      setCurrentScreenAction.request({
        screenName: SCREEN_NAME.noExistingConversation,
      })
    );
  }, [dispatch, selectedContact]);

  return (
    <Layout title="Let us know who you are">
      <div className="flex flex-col items-center mt-20">
        <ul>
          {Contact.contactList.length > 0 &&
            Contact.contactList.map((cont) => (
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
      {!!Object.keys(selectedContact).length && (
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
