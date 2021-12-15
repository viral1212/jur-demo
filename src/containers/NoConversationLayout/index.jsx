import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextItem from '../../components/TextItem';
import UserItem from '../../components/UserItem';
import Button from '../../components/Button';
import Layout from '../../layout';

NoConversationLayout.prototypes = {
  selectedUser: PropTypes.objectOf({
    id: PropTypes.number,
    title: PropTypes.number,
    description: PropTypes.number,
  }).isRequired,
  contactList: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.number,
    description: PropTypes.number,
  }).isRequired,
  setSelectedContactsforConv: PropTypes.func,
  setScreenCount: PropTypes.number,
};

export default function NoConversationLayout({
  contactList,
  selectedUser,
  setSelectedContactsforConv,
  setScreenCount,
}) {
  const [selectedContacts, setSelectedContacts] = useState([]);

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
  return (
    <Layout
      title={`Welcome ${selectedUser.title.split(' ')[0]}!`}
      subTitle="You don’t have any conversations"
    >
      <TextItem
        text="Select contacts to message"
        className="mt-20 pt-4 text-5xl leading-10 font-normal"
      />
      <div className="flex flex-col items-center mt-11">
        <ul>
          {contactList
            .filter((contact) => contact.id !== selectedUser.id)
            .map((contact) => (
              <li key={contact.id}>
                <UserItem
                  onClick={() => handleContactClick(contact)}
                  isSelected={
                    !!selectedContacts.find((val) => contact.id === val.id)
                  }
                  className="mt-5"
                  title={contact.title}
                  description={contact.description}
                />
              </li>
            ))}
        </ul>
      </div>
      {!!selectedContacts.length && (
        <Button
          onClick={() => {
            setSelectedContactsforConv(selectedContacts);
            setScreenCount(3);
          }}
          className="absolute right-0 mt-8 md:p-5 mr-80"
          shouldShowBorder
          shouldShowShadow
        >
          Continue
        </Button>
      )}
    </Layout>
  );
}
