import { useEffect, useState } from 'react';

import { Table, notification, Button } from 'antd';

import { useGetUsersQuery, useDeleteUserMutation, usePromoteUserMutation } from '../../../redux/api/userApi';

import { Loading } from '../../../utils';

const Users = () => {
  const [userData, setUserData] = useState([]);
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [promoteUser] = usePromoteUserMutation();

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Date Registered',
      dataIndex: 'registeredAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      render: (user) => 
        <div className='flex gap-4'>
          <Button onClick={() => {promoteUser({username: user.username})}}  type='primary'>Promote</Button>
          <Button onClick={() => {deleteUser({id: user._id})}} danger type='primary'>Delete</Button>
        </div>
    }
  ];

  useEffect(() => {
    if (users?.payload) {
      setUserData(users.payload);
    } 
    else if (!isLoading && !users) {
      notification.warning({
        message: 'No Users Found',
        description: 'There are no users available to display.',
      });
    }

    if (error) {
      notification.error({
        message: 'Error Fetching Users',
        description: error?.message || 'Failed to load user data.',
      });
    }
  }, [users, isLoading, error]);

  return (
    <>
      {isLoading ? (<Loading />) : (
        <Table
          columns={columns}
          dataSource={userData}
          rowKey={(row) => row._id}
          pagination={{ pageSize: 7 }}
        />
      )}
    </>
  );
};

export default Users;