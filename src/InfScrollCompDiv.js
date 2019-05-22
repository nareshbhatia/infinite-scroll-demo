import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CompanyService } from './CompanyService';
import { Chart } from './Chart';
import { CompanyProfileView } from './CompanyProfileView';

export class InfScrollCompDiv extends React.Component {
    state = {
        nextIndex: 0,
        hasMore: true,
        profiles: []
    };

    fetchMoreData = async () => {
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
                <h1>Infinite Scroll Component</h1>
                <h2>{companies.length} Companies</h2>
                <Chart />
                <Chart />
                <InfiniteScroll
                    dataLength={profiles.length}
                    next={this.fetchMoreData}
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
