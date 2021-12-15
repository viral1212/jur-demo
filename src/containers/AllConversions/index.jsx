import React from 'react';
import Button from '../../components/Button';
import UserItem from '../../components/UserItem';
import Layout from '../../layout';

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

export default function AllConversions() {
  return (
    <Layout title="Your Conversations" contentAlignment="left">
      <div className="flex flex-col items-start mt-20">
        <ul className="w-full">
          {contactList.map((contact) => (
            <li key={contact.id}>
              <UserItem
                onClick={() => console.log(contact.id)}
                // isSelected={selectedContactId === contact.id}
                className="py-2.5 pl-2.5 hover:bg-cyan-150"
                title={contact.title}
                description={contact.description}
              />
            </li>
          ))}
        </ul>
        <div className="w-full flex justify-end pt-20">
          <Button
            onClick={() => console.log('Create New Conversation')}
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
