import { AppRoutes } from './routes/AppRoutes';
import {BrowserRouter} from 'react-router-dom';
import { DrawerProvider } from './shared/contexts';

export const App = () => {
  return (
    <div className="App">
      
      <DrawerProvider>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
      </DrawerProvider>
      
    </div>
  );
}
