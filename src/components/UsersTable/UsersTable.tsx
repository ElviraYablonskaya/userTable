import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserSelector, fetchUsersRequest, setFilters } from '../../redux/reducers/userSlice';
import Loader from '../Loader/Loader';

const UsersTable: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredUsers, loading, filters } = useSelector(UserSelector.getAllUsers);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex justify-center text-2xl font-bold mb-4 mt-4">User Management Table</h1>
      <div className='flex justify-center mb-5'>
        {loading ? <Loader /> : null}
      </div>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-cyan-600">
            <th className="px-4 py-2 w-1/4v text-white">
              Name
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                className="text-gray-700 mt-2 block w-full border border-gray-300 rounded-md p-1 font-normal hover:bg-slate-50 focus:outline-none"
                placeholder="Filter by name"
              />
            </th>
            <th className="px-4 py-2 w-1/4 text-white">
              Username
              <input
                type="text"
                name="username"
                value={filters.username}
                onChange={handleFilterChange}
                className="text-gray-700 mt-2 block w-full border border-gray-300 rounded-md p-1 font-normal hover:bg-slate-50 focus:outline-none"
                placeholder="Filter by username"
              />
            </th>
            <th className="px-4 py-2 w-1/4 text-white">
              Email
              <input
                type="text"
                name="email"
                value={filters.email}
                onChange={handleFilterChange}
                className="text-gray-700 mt-2 block w-full border border-gray-300 rounded-md p-1 font-normal hover:bg-slate-50 focus:outline-none"
                placeholder="Filter by email"
              />
            </th>
            <th className="px-4 py-2 w-1/4 text-white">
              Phone
              <input
                type="text"
                name="phone"
                value={filters.phone}
                onChange={handleFilterChange}
                className="text-gray-700 mt-2 block w-full border border-gray-300 rounded-md p-1 font-normal hover:bg-slate-50 focus:outline-none"
                placeholder="Filter by phone"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-gray-200 hover:bg-slate-50">
                <td className="px-4 py-2 h-12">{user.name}</td>
                <td className="px-4 py-2 h-12">{user.username}</td>
                <td className="px-4 py-2 h-12">{user.email}</td>
                <td className="px-4 py-2 h-12">{user.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
