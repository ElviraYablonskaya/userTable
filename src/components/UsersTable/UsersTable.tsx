import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest, setFilters } from '../../redux/reducers/userSlice';
import { RootState } from '../../redux/store';

const UsersTable: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredUsers, loading, filters } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  return (
    <div>
      <h1>User Management Table</h1>

      {loading ? <p>Loading...</p> : null}

      <table>
        <thead>
          <tr>
            <th>
              Name
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              Username
              <input
                type="text"
                name="username"
                value={filters.username}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              Email
              <input
                type="text"
                name="email"
                value={filters.email}
                onChange={handleFilterChange}
              />
            </th>
            <th>
              Phone
              <input
                type="text"
                name="phone"
                value={filters.phone}
                onChange={handleFilterChange}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
