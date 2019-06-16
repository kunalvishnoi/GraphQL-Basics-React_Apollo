import React ,{Component} from 'react'
import { Mutation } from 'react-apollo'
import {POST_MUTATION} from '../graphql/mutations/createpost'
import {FEED_QUERY} from '../graphql/queries/feeds'


class CreateLink extends Component {

    state = {
        description: '',
        url: ''
    }

    handleChange = (event) => {

    	const elem = event.target;

    	this.setState({
    		[elem.name] : elem.value
     	})
    	
    }

    render() {
        const {description , url} = this.state;
        return (
        	<React.Fragment>
        		<div className="flex flex-column mt3">
        			<input 
        			 	value={description} 
        			 	onChange={this.handleChange}
        			 	className="mb2" 
        			 	placeholder="Enter Description"
        			 	name="description"
        			 	 />
        			<input type="text"
        			  onChange={this.handleChange}
        			  className="mb2"
        			  placeholder="Enter Url"
        			  name="url" 
        			  value={url} />
        		</div>
    			<Mutation
            mutation={POST_MUTATION}
            variables={{ description, url }}
            onCompleted={() => this.props.history.push('/')}
            update={(store, { data: { post } }) => {
              const data = store.readQuery({ query: FEED_QUERY })
              data.feed.links.unshift(post)
              store.writeQuery({
                query: FEED_QUERY,
                data
              })
            }}
          >
            {postMutation => <button onClick={postMutation}>Submit</button>}
          </Mutation>
        	</React.Fragment>

        )
    }

}
export default CreateLink;
