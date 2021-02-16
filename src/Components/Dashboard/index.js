import React from 'react';
import * as cron from 'node-cron';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { DashboardWrap } from '../../Elements/DashboardWrap';
import { FavesPanelWrap } from '../../Elements/FavesPanelWrap';
import { NewsFeedWrap } from '../../Elements/NewsFeedWrap';

import SubHeader from '../SubHeader';
import NewsItem from '../NewsItem';

class Dashboard extends React.Component {
    state = {
        articles: [],
        faves: [],
        showFavourites: true
    };

    callAPI = async () => {
        await fetch('http://localhost:9000/news')
          .then(res => res.text())
          .then(res => {
              const articles = JSON.parse(res).results;
              this.setState({ articles });
            })
    };

    _isMounted = false; 

    task = cron.schedule('5 * * * * *', () => {
        this.callAPI();
    });

    componentDidMount = () => {
        this._isMounted = true;
        this.callAPI();
        this.task.start();
    }

    componentWillUnmount = () => {
        this.task.stop();
        this._isMounted = false;
    }

    toggleFavourites = () => {
            this.setState({
                showFavourites: !this.state.showFavourites
            }) ;
    };

    favesSet = new Set();

    addFave = (index) => {
        let faveArticle = this.state.articles[index];
        this.favesSet.add(faveArticle);
        
        let faves = [...this.favesSet];
        this.setState({ faves })
        
    };

    deleteFave = (index) => {
        let goneArticle = this.state.faves[index];
        this.favesSet.delete(goneArticle);

        let faves = [...this.favesSet];
        this.setState({ faves })
    };

    render() {
        const { articles, faves, showFavourites } = this.state;

        return (
            <DashboardWrap>
                <FavesPanelWrap>
                    <SubHeader 
                        text="Favourites"
                        count={faves.length}
                        toggleMethod={this.toggleFavourites.bind(this)}
                        className={showFavourites ? "pivot" : ""}
                        icon={faChevronDown}
                    />
                    <div className={showFavourites ? "show" : "hide"}>
                        {faves.map((fave, i) => 
                            <NewsItem 
                                index={i}
                                key={fave.title}
                                image={fave.thumbnail_standard}
                                title={fave.title} 
                                description={fave.abstract}
                                url={fave.url}
                                date={fave.published_date}
                                icon={faTrash} 
                                onClick={this.deleteFave.bind(this, i)}
                            />
                        )}
                    </div>
                </FavesPanelWrap>
                <NewsFeedWrap>
                    <h2>News Feed</h2>
                    {articles.map((article, i) => 
                        <NewsItem 
                            index={i}
                            key={article.title}
                            image={article.thumbnail_standard}
                            title={article.title} 
                            description={article.abstract}
                            url={article.url}
                            date={article.published_date}
                            icon={faHeart}
                            onClick={this.addFave.bind(this, i)}
                        />
                    )}
                </NewsFeedWrap>
            </DashboardWrap>
        )  
    } 
}

export default Dashboard;