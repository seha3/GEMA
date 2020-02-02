import React from 'react'

class searchEpisode extends React.Component {

    state = {
        page: 1,
        totalPages: 1,
        searchTerm: '',
        searching: false,
        searched: false,
        episodes: []
    }

    firstEpisodeRef = React.createRef(); // createRef, debounce

    handleSearchInput = debounce(searchTerm => this.setState({ page: 1, searchTerm, searching: true }, this.fetchEpisodes));

    fetchEpisodes = () => {
        fetch(`https://rickandmortyapi.com/api/episode/?page=${this.state.page}&name=${this.state.searchTerm}`)
            .then(res => res.json())
            .then(data => this.setState({
                totalPages: data.info.pages,
                episodes: data.results,
                searching: false,
                searched: true
            }))
            .then(() => this.firstEpisodeRef.current.focus())
            .catch(() => this.setState({
                page: 1,
                totalPages: 1,
                episodes: [],
                searching: false,
                searched: true
            }));
    }

    changePage = e => {
        Array.from(e.target.classList).includes('page-btn-next') ?
            this.setState(prevState => ({ page: prevState.page + 1 }), this.fetchEpisodes) :
            this.setState(prevState => ({ page: prevState.page - 1 }), this.fetchEpisodes);
    }

    render() {
        return (
            <React.Fragment>
                <main>
                    <SearchInput handleSearchInput={ e => this.handleSearchInput(e.target.value.replace(" ", "+")) } />
                    { this.state.searching ? <div className="search-loader" /> : null }
                    { this.state.searched && !this.state.searching ? <SearchOutput episodes={ this.state.episodes } firstEpisodeRef={ this.firstEpisodeRef } /> : null }
                    { this.state.totalPages > 1 && !this.state.searching ? <PageNavigation page={ this.state.page } totalPages={ this.state.totalPages } changePage={ this.changePage } /> : null }
                </main>
            </React.Fragment>
        );
    }
}

function SearchInput({ handleSearchInput }) {
    return (
        <div className="search">
            <label htmlFor="search-input" className="search-input-label">Episode Search:</label>
            <input type="text" id="search-input" className="search-input" placeholder="e.g. 'Pilot'" spellCheck="false" onChange={ handleSearchInput } />
        </div>
    );
}

function SearchOutput({ episodes, firstEpisodeRef }) {
    return (
        <div className="search-output">
            {
                episodes.length > 0 ?
                    episodes.map((episode, index) => <Episode episode={ episode } key={ episode.id } index={ index } firstEpisodeRef={ firstEpisodeRef } />) :
                    <p className="no-results">No Results Found</p>
            }
        </div>
    );
}

function Episode({ episode, firstEpisodeRef, index }) {
    return (
        <details className="character-details" >

            <summary className="character-summary" ref={ index === 0 ? firstEpisodeRef : null }>{ episode.name }</summary>

            <div className="character-container">

                <div className="character-info">

                    <details className="character-info-item" open>
                        <summary className="character-info-item-summary">Name</summary>
                        <p className="character-info-item-data">{ episode.name }</p>
                    </details>

                    <details className="character-info-item" open>
                        <summary className="character-info-item-summary">Air Date</summary>
                        <p className="character-info-item-data">{ episode.air_date }</p>
                    </details>

                    <details className="character-info-item" open>
                        <summary className="character-info-item-summary">Episode</summary>
                        <p className="character-info-item-data">{ episode.episode }</p>
                    </details>

                </div>

            </div>

        </details>
    );
}

function PageNavigation({ page, totalPages, changePage }) {
    return (
        <div className="page-navigation">
            { page > 1 ? <button className="page-btn page-btn-prev" onClick={ changePage }>Prev Page</button> : null }
            { page < totalPages ? <button className="page-btn page-btn-next" onClick={ changePage }>Next Page</button> : null }
        </div>
    );
}

function debounce(func, wait = 800) {

    let timeout;

    return function () {

        const context = this,
            args = arguments;

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            timeout = null;

            func.apply(context, args);

        }, wait);
    };
}


export default searchEpisode