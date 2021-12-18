import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import UserItem from '../../components/UserItem';
import Layout from '../../layout';
import {
  getContactsListAction,
  setSelectedContactAction,
} from '../../store/actions/contacts';
import Skeleton from '../../components/Skeleton';

export default function FirstTimeUser() {
  const dispatch = useDispatch();
  const Contact = useSelector((state) => state.Contact);
  const { contactList, isLoading } = Contact;
  const [selectedContact, setSelectedContact] = useState({});

  useEffect(() => {
    dispatch(getContactsListAction.request());
  }, [dispatch]);

  const handleSelectedUserContact = useCallback(() => {
    dispatch(setSelectedContactAction.request(selectedContact));
  }, [dispatch, selectedContact]);

  return (
    <Layout
      className="xl:large-container mx-0 my-20"
      title="Let us know who you are"
    >
      <div className="flex flex-col items-center mt-20 h-64 max-h-64 lg:h-80 lg:max-h-80 xl:h-96 xl:max-h-96 overflow-y-auto">
        <ul className="w-64">
          <Skeleton visible={isLoading} />
          <Skeleton visible={isLoading} />
          <Skeleton visible={isLoading} />
          {contactList?.length > 0 &&
            contactList.map((cont) => (
              <li key={cont.id} className="grid grid-cols-1">
                <UserItem
                  onClick={() => setSelectedContact(cont)}
                  isSelected={selectedContact?.id === cont.id}
                  className="py-2.5 pl-2.5"
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
