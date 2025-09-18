import useAuthContext from '../hooks/useAuthContext';
const Users = () => {
    const {allUsers} = useAuthContext();
    
    
    return (
        <div className='overflow-x-auto md:mt-25 lg:mt-25 lg:mx-25 mt-5 md:mx-10 mx-5 flex justify-items-center'>
            <div className='md:w-100 lg:w-full'>
            <div className="p-4">
            <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
                <tr className="bg-gray-100 text-left text-pink-500 font-semibold">
                <th className="py-3 px-4 border-b">User ID</th>
                <th className="py-3 px-4 border-b">Email</th>
                </tr>
            </thead>
            <tbody>
                {allUsers.map((user) => (
                <tr
                    key={user.id}
                    className="hover:bg-gray-50 text-gray-700"
                >
                    <td className="py-3 px-4 border-b">{user.id}</td>
                    <td className="py-3 px-4 border-b">{user.email}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
        </div>
        </div>
        
    );
};

export default Users;