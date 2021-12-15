import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import UserItem from '../../components/UserItem';
import Layout from '../../layout';

FirstTimeUser.prototypes = {
  setSelectedUser: PropTypes.func.isRequired,
  contactList: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.number,
    description: PropTypes.number,
  }).isRequired,
  setScreenCount: PropTypes.number,
};

export default function FirstTimeUser({
  contactList,
  setSelectedUser,
  setScreenCount,
}) {
  const [selectedContact, setSelectedContact] = useState(null);
  return (
    <Layout title="Let us know who you are">
      <div className="flex flex-col items-center mt-20">
        <ul>
          {contactList.map((contact) => (
            <li key={contact.id}>
              <UserItem
                onClick={() => setSelectedContact(contact)}
                isSelected={selectedContact?.id === contact.id}
                className="mt-5"
                title={contact.title}
                description={contact.description}
              />
            </li>
          ))}
        </ul>
      </div>
      {!!selectedContact && (
        <div className="flex justify-end w-full mt-8">
          <Button
            onClick={() => {
              setSelectedUser(selectedContact);
              setScreenCount(2);
            }}
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
