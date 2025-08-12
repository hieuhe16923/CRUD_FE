import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './AppRouter';
import { AuthProvider } from './contexts/AuthProvider';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
