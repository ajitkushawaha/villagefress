import { BrowserRouter } from 'react-router-dom';
import AppRoutes  from './routes/AppRoutes';
import { SimpleToast } from './utils/SimpleToast';
import { useSimpleToast } from './hooks/useSimpleToast';
import { useCartStore } from './store/cartStore';
import { useEffect } from 'react';
import { InstallPrompt } from './utils/InstallPrompt';

function App() {
   const { message, visible, showToast } = useSimpleToast();
  const setToastHandler = useCartStore((state) => state.setToastHandler);
 useEffect(() => {
    setToastHandler(showToast);
  }, [setToastHandler, showToast]);

  return (
    <BrowserRouter>
      <AppRoutes />
       <SimpleToast message={message} visible={visible} />
       <InstallPrompt />
    </BrowserRouter>
  );
}

export default App;
