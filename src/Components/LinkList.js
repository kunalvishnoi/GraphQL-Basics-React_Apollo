import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import {FEED_QUERY} from '../graphql/queries/feeds'

class LinkList extends Component {

    render() {
        return (
          <Query query={FEED_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const linksToRender = data.feed.links
              
              return (
                <div>
                  {linksToRender.map(link => <Link key={link.id} url={link.url} description={link.description} />)}
                </div>
              );
            }}
          </Query>
         
          
          );
    }

}
export default LinkList;
