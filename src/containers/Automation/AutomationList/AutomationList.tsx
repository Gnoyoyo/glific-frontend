import React from 'react';
import styles from './AutomationList.module.css';
import { ReactComponent as AutomationIcon } from '../../../assets/images/icons/Automations/Dark.svg';
import { ReactComponent as ConfigureIcon } from '../../../assets/images/icons/Configure/UnselectedDark.svg';
import { List } from '../../List/List';
import {
  FILTER_AUTOMATION,
  GET_AUTOMATIONS,
  GET_AUTOMATION_COUNT,
} from '../../../graphql/queries/Automation';
import { DELETE_AUTOMATION } from '../../../graphql/mutations/Automation';
import { setVariables } from '../../../common/constants';

export interface AutomationListProps {}

const getColumns = ({ name }: any) => ({
  name: getName(name),
});

const getName = (text: string) => <p className={styles.TableText}>{text}</p>;

const columnNames = ['NAME', 'ACTIONS'];
const dialogMessage = "You won't be able to use this automation.";
const columnStyles = [styles.Name, styles.Actions];
const automationIcon = <AutomationIcon className={styles.AutomationIcon} />;

const queries = {
  countQuery: GET_AUTOMATION_COUNT,
  filterItemsQuery: FILTER_AUTOMATION,
  deleteItemQuery: DELETE_AUTOMATION,
};

const columnAttributes = {
  columnNames: columnNames,
  columns: getColumns,
  columnStyles: columnStyles,
};
const configureIcon = <ConfigureIcon></ConfigureIcon>;

const additionalAction = {
  label: 'Configure',
  icon: configureIcon,
  parameter: 'uuid',
  link: '/automation/configure',
};

export const AutomationList: React.SFC<AutomationListProps> = (props) => (
  <List
    title="Automations"
    listItem="flows"
    listItemName="automation"
    pageLink="automation"
    listIcon={automationIcon}
    dialogMessage={dialogMessage}
    refetchQueries={{ query: GET_AUTOMATIONS, variables: setVariables() }}
    {...queries}
    {...columnAttributes}
    searchParameter="name"
    additionalAction={additionalAction}
    button={{ show: true, label: '+ CREATE AUTOMATION' }}
  />
);
