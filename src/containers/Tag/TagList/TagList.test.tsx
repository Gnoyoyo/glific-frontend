import React from 'react';
import { render, wait } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { TagList } from './TagList';
import { LIST_MOCKS } from '../../List/List.test.helper';
import { setUserRole } from '../../../context/role';

const mocks = LIST_MOCKS;
setUserRole(['Admin']);

const tagList = (
  <MockedProvider mocks={mocks} addTypename={false}>
    <Router>
      <TagList />
    </Router>
  </MockedProvider>
);

test('edit button for a tag should redirect to edit tag page', async () => {
  const { container } = render(tagList);
  await wait();
  expect(container.querySelector('tbody tr a').getAttribute('href')).toBe('/tag/87/edit');
});
