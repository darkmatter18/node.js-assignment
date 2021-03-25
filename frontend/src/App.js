import { CssBaseline } from '@material-ui/core';
import { AuthProvider } from 'react-auth-kit';
import RouteComponent from './Components/RouteComponent';

const App = () => {
  return (
    <AuthProvider
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"} refreshTokenName={"refresh"}>
      <CssBaseline />
      <RouteComponent />
    </AuthProvider>
  );
}

export default App;
