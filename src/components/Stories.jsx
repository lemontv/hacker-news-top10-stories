import React from 'react';
import moment from 'moment';
import './Stories.css';

export default class Stories extends React.Component {
  constructor(props) {
    super(props);
    const { fetchTop10Stories } = props;
    fetchTop10Stories();
  }

  render() {
    const { stories } = this.props;
    const StoryList = stories.ids.map( id => stories.entries[id] ).map( story => (
      story && <Story key={story.id} story={story} comments={story.kids && story.kids.map(kid => stories.entries[kid])} />
    ));

    return (
      <div className='stories'>
        {StoryList}
      </div>
    )
  }
}

const Story = ({story, comments}) => (
  <div className='story'>
    <h3>
      {story.title}
      {
        story.url &&
        <span>(<a rel='noopener noreferrer' href={story.url} target='_blank'>{new URL(story.url).host}</a>)</span>
      }
    </h3>

    <div className='summary'>
      <span>{moment().to(story.time * 1000)}</span> | <span>{story.kids ? story.kids.length : 0} comments</span>
    </div>

    <div className='comments'>
      {
        comments && comments
          .filter(comment => comment && !comment.deleted)
          .map(comment => comment && <Comment key={comment.id} comment={comment} />)
      }
    </div>
  </div>
)

const Comment = ({comment}) => (
  <div className='comment'>
    <div className='comment-by'> {comment.by} {moment().to(comment.time * 1000)} </div>
    <div className='comment-content' dangerouslySetInnerHTML={{__html: comment.text}} />
  </div>
)
