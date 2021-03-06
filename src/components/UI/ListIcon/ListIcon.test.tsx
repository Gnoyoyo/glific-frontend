import React from 'react';
import { ListIcon } from './ListIcon';
import { shallow, mount } from 'enzyme';

import chatIcon from '../../../assets/images/icons/Chat/Unselected.svg';
import tagIcon from '../../../assets/images/icons/Tags/Unselected.svg';
import broadcastIcon from '../../../assets/images/icons/Broadcast/Unselected.svg';
import automationIcon from '../../../assets/images/icons/Automations/Unselected.svg';
import collectionsIcon from '../../../assets/images/icons/Collections/Unselected.svg';
import goalsIcon from '../../../assets/images/icons/Goals/Unselected.svg';
import analyticsIcon from '../../../assets/images/icons/Analytics/Unselected.svg';
import { MemoryRouter } from 'react-router';

describe('list icon tests', () => {
  const iconList: { [iconName: string]: string } = {
    chat: chatIcon,
    tag: tagIcon,
    broadcast: broadcastIcon,
    automation: automationIcon,
    collection: collectionsIcon,
    goal: goalsIcon,
    analytics: analyticsIcon,
  };
  const createIcon = (type: string, selected: boolean) => {
    return (
      <MemoryRouter>
        <ListIcon icon={type} />
      </MemoryRouter>
    );
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  it('renders an object', () => {
    const wrapper = shallow(createIcon('chat', false));
    expect(wrapper).toBeTruthy();
  });

  it('renders appropriate icons', () => {
    let keys = Object.keys(iconList);
    for (let i = 0; i < keys.length; i++) {
      const wrapper = mount(createIcon(keys[i], false));
      expect(wrapper.find('img').props().src).toEqual('Unselected.svg');
    }
  });
});
