
import { Provider } from 'react-redux';
import store from './redux/store';
import UsersTable from './components/UsersTable/UsersTable';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <UsersTable />
      </div>
    </Provider>
  );
};

export default App;
