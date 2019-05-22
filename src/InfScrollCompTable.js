import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CompanyService } from './CompanyService';
import { Chart } from './Chart';
import { CompanyProfileRow } from './CompanyProfileRow';

export class InfScrollCompTable extends React.Component {
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
                    <table class="pure-table pure-table-bordered">
                        <thead>
                            <tr>
                                <th>Ticker</th>
                                <th>Name</th>
                                <th>Sector</th>
                                <th>Industry</th>
                                <th>CEO</th>
                                <th>Market Cap</th>
                                <th>Price</th>
                                <th>Change</th>
                                <th>%</th>
                                <th>Beta</th>
                                <th>52 Week Range</th>
                                <th>Avg. Volume</th>
                                <th>Last Dividend</th>
                            </tr>
                        </thead>

                        <tbody>
                            {profiles.map(profile => (
                                <CompanyProfileRow
                                    key={profile.ticker}
                                    profile={profile}
                                />
                            ))}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>
        );
    }
}
