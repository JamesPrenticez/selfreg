import React, { useEffect, useState, type ReactElement } from 'react';
import { Button } from '../common';

// Define the type for the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
}

function InstallPWAButton(): ReactElement {
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const beforeInstallPromptListener = (event: Event) => {
      // Cast the event to the BeforeInstallPromptEvent type
      const typedEvent = event as BeforeInstallPromptEvent;

      // Prevent Chrome <= 67 from automatically showing the prompt
      typedEvent.preventDefault();

      // Store the event for later use
      setInstallPromptEvent(typedEvent);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', beforeInstallPromptListener);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptListener);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPromptEvent) return;

    // Hide the install button (you can also do this by setting state)
    setInstallPromptEvent(null);

    // Show the install prompt
    installPromptEvent.prompt();

    // Wait for the user to respond to the prompt
    void installPromptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  return (
    <div>
      {installPromptEvent && (
        <Button
          variant="success"
          onClick={handleInstallClick}
          csx="w-full mt-4"
        >
          Install App
        </Button>
      )}
    </div>
  );
};

export default InstallPWAButton;
