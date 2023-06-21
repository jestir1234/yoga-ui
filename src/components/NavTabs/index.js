import React, { useEffect } from 'react';
import { Tab } from '@rneui/themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { isTeacher } from '@app/utils';
import { useNavigate } from 'react-router-dom';

const ROUTE_MAP_NORMAL = {
  0: '/home',
  1: '/explore',
  2: '/profile'
};
const ROUTE_MAP_TEACHER = {
  0: '/home',
  1: '/explore',
  2: '/create',
  3: '/profile'
};

export default function () {
  const loggedInUser = useSelector((state) => state.user);
  console.log('loggedInUser', loggedInUser)
  const navigate = useNavigate();
  const [index, setIndex] = React.useState(0);

  const buttonContainerStyle = (active) => ({
    backgroundColor: active ? '#41536E' : '#2F4858',
  })

  useEffect(() => {
    navigate(isTeacher(loggedInUser) ? ROUTE_MAP_TEACHER[index] : ROUTE_MAP_NORMAL[index]);
  }, [index])

  return (
    <Tab
      containerStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      style={{
        width: '100%',
        height: '10vh',
      }}
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'white',
        height: 3,
        width: '33.333%',
      }}
      disableIndicator
      variant="primary"
    >
      <Tab.Item
        title="Home"
        titleStyle={{ fontSize: 12 }}
        containerStyle={buttonContainerStyle}
        buttonStyle={{
          height: '10vh',
        }}
      >
        <FontAwesome name="home" size={30} color="white" />
        Home
      </Tab.Item>
      <Tab.Item
        title="Explore"
        titleStyle={{ fontSize: 12 }}
        containerStyle={buttonContainerStyle}
        buttonStyle={{
          height: '10vh',
        }}
      >
        <FontAwesome name="wpexplorer" size={30} color="white" />
        Explore
      </Tab.Item>
      {isTeacher(loggedInUser) && <Tab.Item
        title="Create"
        titleStyle={{ fontSize: 12 }}
        containerStyle={buttonContainerStyle}
        buttonStyle={{
          height: '10vh',
        }}
      >
        <MaterialIcon name="lightbulb" size={30} color="white" />
        Create
      </Tab.Item>}
      <Tab.Item
        title="Profile"
        titleStyle={{ fontSize: 12 }}
        containerStyle={buttonContainerStyle}
        buttonStyle={{
          height: '10vh',
        }}
      >
        <FontAwesome name="user" size={30} color="white" />
        Profile
      </Tab.Item>
    </Tab>
  );
}
