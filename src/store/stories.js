/***
 * @author Shiming Chen <chen@lemontv.me>
 */

import { handleResponse, queryBuilder } from './uitls';

const FETCH_STORIES_SUCCESSFUL = 'FETCH_STORIES_SUCCESSFUL';
const FETCH_ITEM_SUCCESSFUL = 'FETCH_ITEM_SUCCESSFUL';

export function fetchTop10Stories() {
  return (dispatch) => {
    const url = queryBuilder(['topstories.json']);
    return fetch(url).then(handleResponse).then(json => {
      const ids = json.slice(0, 10);
      dispatch({
        type: FETCH_STORIES_SUCCESSFUL,
        ids
      });
      for(let id of ids) {
        fetchItem(id)(dispatch);
      }
    });
  }
}

function fetchItem(id) {
  return (dispatch) => {
    const url = queryBuilder(['item', `${id}.json`]);
    return fetch(url).then(handleResponse).then(json => {
      dispatch({
        type: FETCH_ITEM_SUCCESSFUL,
        item: json
      });

      /* fetch story top 20 comments */
      if (json.type === 'story' && json.kids) {
        for( let kid of json.kids.slice(0, 20) ) {
          fetchItem(kid)(dispatch);
        }
      }
    });
  }
}

const initState = {
  ids: [],
  entries: {}
};

export default function reducer (state = initState, action) {
  switch(action.type) {
    case FETCH_STORIES_SUCCESSFUL:
      return Object.assign({}, state, { ids: action.ids, entries: {} });
    case FETCH_ITEM_SUCCESSFUL:
      return Object.assign({}, state, {
        entries: {
          ...state.entries,
          [action.item.id]: action.item
        }
      });
    default:
      return state;
  }
}
