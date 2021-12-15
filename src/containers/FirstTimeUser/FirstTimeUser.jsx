import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import TextItem from '../../components/TextItem';
import UserItem from '../../components/UserItem';

FirstTimeUser.prototypes = {
  setSelectedUser: PropTypes.func.isRequired,
};

const contactList = [
  {
    id: 1,
    title: 'Amanda Nano',
    description: 'Hey there! I’m using Jur chat',
  },
  {
    id: 2,
    title: 'Rama Jr',
    description: 'Busy',
  },
  {
    id: 3,
    title: 'George Silva',
    description: 'Call if urgent',
  },
  {
    id: 4,
    title: 'Fu Shang',
    description: 'New day, new challenges',
  },
  {
    id: 5,
    title: 'Person Name',
    description: 'Chat only',
  },
  {
    id: 6,
    title: 'Person Name',
    description: 'Hey there! I’m using Jur chat',
  },
];

export default function FirstTimeUser({ setSelectedUser }) {
  const [selectedContactId, setSelectedContactId] = useState(0);
  return (
    <div>
      <div className="flex flex-col items-center mt-20">
        <TextItem
          text="Let us know who you are"
          className="pt-4 text-5xl leading-10 font-normal"
        />
        <ul className="mt-20">
          {contactList.map((contact) => (
            <li key={contact.id}>
              <UserItem
                onClick={() => setSelectedContactId(contact.id)}
                isSelected={selectedContactId === contact.id}
                className="mt-5"
                title={contact.title}
                description={contact.description}
              />
            </li>
          ))}
        </ul>
      </div>
      {!!selectedContactId && (
        <Button
          onClick={() => setSelectedUser(selectedContactId)}
          className="absolute right-0 mt-8 md:p-5 mr-80"
          shouldShowBorder
          shouldShowShadow
        >
          Continue
        </Button>
      )}
    </div>
  );
}
