import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { CompanyService } from './CompanyService';
import { Chart } from './Chart';
import { CompanyProfileView } from './CompanyProfileView';

export class InfScrollDiv extends React.Component {
    state = {
        nextIndex: 0,
        hasMore: true,
        profiles: []
    };

    loadMore = async () => {
        const { nextIndex, profiles } = this.state;
        const { companies } = this.props;
        if (profiles.length >= companies.length) {
            this.setState({ hasMore: false });
            return;
        }

        const profile = await CompanyService.fetchCompanyProfile(
            companies[nextIndex].ticker
        );
        this.setState({
            nextIndex: nextIndex + 1,
            profiles: profiles.concat(profile)
        });
    };

    render() {
        const { hasMore, profiles } = this.state;
        const { companies } = this.props;
        return (
            <div className="content">
                <h1>Infinite Scroller</h1>
                <h2>{companies.length} Companies</h2>
                <Chart />
                <Chart />
                <InfiniteScroll
                    loadMore={this.loadMore}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    {profiles.map(profile => (
                        <CompanyProfileView
                            key={profile.ticker}
                            profile={profile}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}
