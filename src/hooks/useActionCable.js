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
        received: (data) => {
          setReceivedMessage(data);
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, [cable.subscriptions]);

  return receivedMessage;
}
