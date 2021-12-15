import Button from './components/Button';
import Form from './components/Form';
import InputField from './components/InputField';
import TextItem from './components/TextItem';
import UserItem from './components/UserItem';

function App() {
  return (
    <div className="App p-4">
      <InputField />
      <UserItem
        className="mt-5"
        onclick={() => console.log('click me')}
        title="Here is what I propose. Let me know if suits you folks. Then we can finalize"
        subtitle="You"
        description="I’m in for tomorrwo morning 🚲"
      />
      <UserItem
        onclick={() => console.log('click me')}
        className="mt-5"
        title="Morning Cyclists"
        subtitle="You"
        description="I’m in for tomorrwo morning 🚲"
        isShowSentIcon
      />
      <UserItem
        onclick={() => console.log('click me')}
        title="Morning Cyclists"
        description="I’m in for tomorrwo morning 🚲"
        isSelected
        className="mt-5"
      />
      <TextItem
        text="Let us know who you are"
        className="pt-4 text-5xl leading-10 font-normal"
      />
      <TextItem
        text="You don’t have any conversations"
        className="pt-4 text-3xl leading-7 font-normal text-gray-350"
      />
      <Button
        onclick={() => console.log('button click')}
        className="my-5 md:p-5"
        shouldShowBorder
        shouldShowShadow
      >
        Continue
      </Button>

      {/* Form */}
      <Form
        fieldName="title"
        defaultValues={{ title: '' }}
        onSubmit={(values) => console.log(values, 'values')}
        submitButtonText="Start Conversation"
      />
      <Form
        fieldName="content"
        defaultValues={{ content: '' }}
        onSubmit={(values) => console.log(values, 'values')}
        submitButtonText="Send"
      />
    </div>
  );
}

export default App;
