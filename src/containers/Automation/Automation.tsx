import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Input } from '../../components/UI/Form/Input/Input';
import { FormLayout } from '../Form/FormLayout';
import { ReactComponent as AutomationIcon } from '../../assets/images/icons/Automations/Selected.svg';
import styles from './Automation.module.css';
import {
  CREATE_AUTOMATION,
  UPDATE_AUTOMATION,
  DELETE_AUTOMATION,
} from '../../graphql/mutations/Automation';
import { GET_AUTOMATION, FILTER_AUTOMATION } from '../../graphql/queries/Automation';
import { Checkbox } from '../../components/UI/Form/Checkbox/Checkbox';
import { useLazyQuery } from '@apollo/client';

export interface AutomationProps {
  match: any;
}

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
});

const dialogMessage = "You won't be able to use this automation again.";

const automationIcon = <AutomationIcon className={styles.AutomationIcon} />;

const queries = {
  getItemQuery: GET_AUTOMATION,
  createItemQuery: CREATE_AUTOMATION,
  updateItemQuery: UPDATE_AUTOMATION,
  deleteItemQuery: DELETE_AUTOMATION,
};

export const Automation: React.SFC<AutomationProps> = ({ match }) => {
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [ignoreKeywords, setIgnoreKeywords] = useState(false);
  const [filterKeywords, setFilterKeywords] = useState<any>();

  const states = { name, keywords, ignoreKeywords };

  const setStates = ({ name, keywords, ignoreKeywords }: any) => {
    setName(name);

    // we are recieving keywords as an array object
    if (keywords.length > 0) {
      // lets display it comma separated
      setKeywords(keywords.join(','));
    }
    setIgnoreKeywords(ignoreKeywords);
  };

  const additionalAction = { label: 'Configure', link: '/automation/configure' };

  const [getAutomations, { data: automation }] = useLazyQuery<any>(FILTER_AUTOMATION, {
    variables: {
      filter: filterKeywords,
      opts: {
        order: 'ASC',
        limit: null,
        offset: 0,
      },
    },
  });

  useEffect(() => {
    if (filterKeywords) getAutomations();
  }, [filterKeywords, getAutomations]);

  const validateName = (value: string) => {
    if (value) {
      setFilterKeywords({ name: value });
      return validateFields(value, 'name', 'Name already exists.', false);
    }
  };

  const validateKeywords = (value: string) => {
    if (value) {
      setFilterKeywords({ keyword: value });
      return validateFields(value, 'keywords', 'Keyword already exists.', true);
    }
  };

  const validateFields = (value: string, key: string, errorMsg: string, deepFilter: boolean) => {
    let found = [];
    let error;
    if (automation) {
      // need to check exact keywords
      if (deepFilter) {
        found = automation.flows.filter((search: any) =>
          search.keywords.filter((keyword: any) => keyword === value)
        );
      } else {
        found = automation.flows.filter((search: any) => search[key] === value);
      }

      if (match.params.id && found.length > 0) {
        found = found.filter((search: any) => search.id !== match.params.id);
      }
    }
    if (found.length > 0) {
      error = errorMsg;
    }
    return error;
  };

  const formFields = [
    {
      component: Input,
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      validate: validateName,
    },
    {
      component: Input,
      name: 'keywords',
      type: 'text',
      placeholder: 'Keywords',
      helperText: 'Enter comma separated keywords that trigger this automation',
      validate: validateKeywords,
    },

    {
      component: Checkbox,
      name: 'ignoreKeywords',
      title: 'Ignore Keywords',
    },
  ];

  const setPayload = (payload: any) => {
    let formattedKeywords;
    if (payload.keywords) {
      // remove white spaces
      const keywords = payload.keywords.replace(/[\s]+/g, '');
      // conver to array
      formattedKeywords = keywords.split(',');
    }

    // return modified payload
    return {
      ...payload,
      keywords: formattedKeywords,
    };
  };

  return (
    <FormLayout
      {...queries}
      match={match}
      states={states}
      setStates={setStates}
      setPayload={setPayload}
      validationSchema={FormSchema}
      listItemName="automation"
      dialogMessage={dialogMessage}
      formFields={formFields}
      redirectionLink="automation"
      cancelLink="automation"
      linkParameter="uuid"
      listItem="flow"
      icon={automationIcon}
      additionalAction={additionalAction}
      languageSupport={false}
    />
  );
};
