import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import * as Yup from 'yup';

import { ReactComponent as ProfileIcon } from '../../assets/images/icons/Contact/Profile.svg';
import { CONTACT_STATUS, PROVIDER_STATUS } from '../../common/constants';
import { FormLayout } from '../Form/FormLayout';
import { Dropdown } from '../../components/UI/Form/Dropdown/Dropdown';
import { Input } from '../../components/UI/Form/Input/Input';
import { Loading } from '../../components/UI/Layout/Loading/Loading';
import { GET_CONTACT } from '../../graphql/queries/Contact';
import { CREATE_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from '../../graphql/mutations/Contact';
import { GET_CURRENT_USER } from '../../graphql/queries/User';

const dialogMessage = "You won't be able to send the messages to this contact.";

const profileIcon = <ProfileIcon />;

const queries = {
  getItemQuery: GET_CONTACT,
  createItemQuery: CREATE_CONTACT,
  updateItemQuery: UPDATE_CONTACT,
  deleteItemQuery: DELETE_CONTACT,
};

export interface ProfileProps {
  match?: any;
  profileType: string;
  redirectionLink: string;
  afterDelete?: any;
}

export const Profile: React.SFC<ProfileProps> = ({
  match,
  profileType,
  redirectionLink,
  afterDelete,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [providerStatus, setProviderStatus] = useState('');

  const { data, loading } = useQuery(GET_CURRENT_USER);
  if (loading) return <Loading />;

  const loggedInUserContactId = data.currentUser.user.contact.id;

  let currentContactId;
  if (!match) {
    // let's manually set the contact id in the match object in case of user profile
    match = { params: { id: loggedInUserContactId } };
    currentContactId = loggedInUserContactId;
  } else {
    currentContactId = match.params.id;
  }

  const states = { name, phone, status, providerStatus };
  const setStates = ({ name, phone, status, providerStatus }: any) => {
    setName(name);
    setPhone(phone);
    setStatus(status);
    setProviderStatus(providerStatus);
  };

  const FormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
  });

  const formFields = [
    {
      component: Input,
      name: 'name',
      type: 'text',
      placeholder: 'Name',
    },
    {
      component: Input,
      name: 'phone',
      placeholder: 'Phone Number',
      disabled: true,
      skipPayload: true,
    },
    {
      component: Dropdown,
      name: 'status',
      placeholder: 'Status',
      options: CONTACT_STATUS,
      disabled: true,
      skipPayload: true,
    },

    {
      component: Dropdown,
      name: 'providerStatus',
      placeholder: 'Provider status',
      options: PROVIDER_STATUS,
      disabled: true,
      skipPayload: true,
    },
  ];

  let type: any;
  if (profileType === 'User' || loggedInUserContactId === currentContactId) {
    type = 'UserProfile';
  }

  return (
    <FormLayout
      {...queries}
      match={match}
      states={states}
      setStates={setStates}
      validationSchema={FormSchema}
      listItemName="contact"
      dialogMessage={dialogMessage}
      formFields={formFields}
      redirectionLink={redirectionLink}
      listItem="contact"
      icon={profileIcon}
      afterDelete={afterDelete}
      type={type}
    />
  );
};