import { useContext, useEffect, useState } from 'react';
import { ActionCableContext } from '../context/actionCableContext';

export default function useActionCable() {
  const cable = useContext(ActionCableContext);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const channel = cable.subscriptions.create(
      {
        channel: 'NotificationsChannel',
      },
      {
        connected: () => {
          console.log('connected');
        },
        received: (data) => {
          setReceivedMessage(data);
        },
        disconnected: () => {
          console.log('disconnected');
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, [cable.subscriptions, receivedMessage]);

  return receivedMessage;
}
