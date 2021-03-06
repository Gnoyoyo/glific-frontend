import { savedSearchQuery } from '../../../mocks/Chat';
import { SEARCH_QUERY } from '../../../graphql/queries/Search';

const withResult = {
  data: {
    search: [
      {
        __typename: 'Conversation',
        contact: {
          id: '6',
          name: 'Red Sparrow',
          phone: '919520285543',
          lastMessageAt: '2020-08-03T07:01:36Z',
          status: 'VALID',
          bspStatus: 'SESSION_AND_HSM',
        },
        messages: [
          {
            id: '34',
            body: 'Hi',
            insertedAt: '2020-08-03T07:01:36Z',
            receiver: {
              id: '2',
            },
            sender: {
              id: '6',
            },
            tags: [
              {
                id: '8',
                label: 'Not working',
                colorCode: '#00d084',
                parent: null,
              },
            ],
            type: 'TEXT',
            media: null,
          },
        ],
      },
    ],
  },
};

const noResult = { data: { search: [] } };

const searchQuery = (
  messageLimit: number,
  contactLimit: number,
  filter: any,
  showResult: boolean = true
) => {
  return {
    request: {
      query: SEARCH_QUERY,
      variables: {
        filter: filter,
        messageOpts: { limit: messageLimit },
        contactOpts: { limit: contactLimit },
      },
    },
    result: showResult ? withResult : noResult,
  };
};

export const chatConversationsMocks = [
  searchQuery(50, 50, {}),
  searchQuery(50, 50, { term: 'a' }, false),
  searchQuery(50, 50, { term: '' }),
  searchQuery(5, 10, { includeTags: ['12'] }, false),
];

export const ChatConversationMocks = [
  ...chatConversationsMocks,
  ...chatConversationsMocks,
  savedSearchQuery,
];

export const searchQueryMock = searchQuery(50, 50, { term: '' });
export const searchQueryEmptyMock = searchQuery(50, 50, {});
