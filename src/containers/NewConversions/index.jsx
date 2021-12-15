import React from 'react';
import TextItem from '../../components/TextItem';
import UserItem from '../../components/UserItem';
import Form from '../../components/Form';

export default function NewConversions() {
  return (
    <div>
      <div className="flex flex-col items-center mt-20">
        <TextItem
          text="Welcome George!"
          className="pt-4 text-5xl leading-10 font-normal"
        />
        <TextItem
          text="Give title to start a new conversation with 2 participants"
          className="pt-4 text-3xl text-gray-350 leading-8 font-normal"
        />
        <div className="grid grid-cols-2 gap-8 pt-12">
          <UserItem
            onClick={() => console.log('hello')}
            isSelected
            title="Rama Jr"
            description="New day, new challenges"
          />
          <UserItem
            onClick={() => console.log('hello')}
            isSelected
            title="Rama Jr"
            description="New day, new challenges"
          />
        </div>
        <div className="pt-80 ml-48">
          <Form
            fieldName="title"
            defaultValues={{ title: '' }}
            onSubmit={(values) => console.log(values, 'values')}
            submitButtonText="Start Conversation"
          />
        </div>
      </div>
    </div>
  );
}
