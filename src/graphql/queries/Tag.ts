import { gql } from '@apollo/client';

export const GET_TAGS = gql`
  query tags($filter: TagFilter, $opts: Opts) {
    tags(filter: $filter, opts: $opts) {
      id
      label
      description
      colorCode
      parent {
        id
      }
      language {
        id
        label
      }
    }
  }
`;

export const GET_TAG = gql`
  query getTag($id: ID!) {
    tag(id: $id) {
      tag {
        id
        label
        description
        keywords
        colorCode
        parent {
          id
        }
        language {
          id
        }
      }
    }
  }
`;

export const GET_TAGS_COUNT = gql`
  query countTags($filter: TagFilter!) {
    countTags(filter: $filter)
  }
`;

export const FILTER_TAGS = gql`
  query tags($filter: TagFilter!, $opts: Opts!) {
    tags(filter: $filter, opts: $opts) {
      id
      label
      description
      keywords
      isReserved
      colorCode
      parent {
        id
      }
    }
  }
`;

export const FILTER_TAGS_NAME = gql`
  query tags($filter: TagFilter!, $opts: Opts!) {
    tags(filter: $filter, opts: $opts) {
      id
      label
    }
  }
`;
