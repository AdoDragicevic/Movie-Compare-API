class MovieSearch {
    
    constructor( root, summary, onOptionClb ) {        
    
        this.root = root;
        this.onOptionSelect = this.onOptionSelect.bind(this, summary, onOptionClb);
        
    };


    fetchIndex = async searchTerm => {
        const response = await axios.get("http://www.omdbapi.com/",
        {
            params: {
                apikey: "afd6b738",
                s: searchTerm      
            }
        });
        return response.data.Error ? [] : response.data.Search;
    };

    fetchShow = async movie => {
        return await axios.get("http://www.omdbapi.com/", {
            params: {
                apikey: "afd6b738",
                i: movie.imdbID
            }        
        });
    };

    onOptionSelect = async (summaryElement, callback, movie) => {
        const response = await this.fetchShow(movie);
        const stats = this.extractStats(response);
        summaryElement.innerHTML = this.renderSummary(response, stats);
        callback(movie);
        document.querySelector(".tutorial").classList.add("is-hidden");
    };

    setInputValue = movie => {
        return movie.Title
    };

    extractStats = response => {
        return {
            dollars: parseInt(response.data.BoxOffice.replace(/\$/g, "").replace(/,/g, "")),
            metascore: parseInt(response.data.Metascore),
            imdbScore: parseFloat(response.data.imdbRating),
            imdbVotes: parseInt(response.data.imdbVotes.replace(/,/g, "")),
            awards: response.data.Awards.split(" ").reduce( (acc, curr) => {
                let currVal = parseInt(curr);
                return !Number.isNaN(currVal) ? acc += currVal : acc;
            }, 0)
        };
    };

    renderOption = movie => {
        const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
        return `
            <img src="${imgSrc}">
            ${movie.Title} (${movie.Year})
        `;
    };

    renderSummary = (response, stats) => {
        return `
            <article class="media">
                <figure class="media-left">
                <p class="image">
                    <img src="${response.data.Poster}"/>
                </p>
                </figure>
                <div class="media-content>
                    <div class="content">
                        <h1>${response.data.Title}</h1>
                        <h4>${response.data.Genre}</h4>
                        <p>${response.data.Plot}</p>
                    </div>
                </div>
            </article>
            <article data-value=${stats.awards} class="notification is-primary">
                <p class="title">${response.data.Awards}</p>
                <p class="subtitle">Awards</p>
            </article>
            <article data-value=${stats.dollars} class="notification is-primary">
                <p class="title">${response.data.BoxOffice}</p>
                <p class="subtitle">Box Office</p>
            </article>
            <article data-value=${stats.metascore} class="notification is-primary">
                <p class="title">${response.data.Metascore}</p>
                <p class="subtitle">Metascore</p>
            </article>
            <article data-value=${stats.imdbScore} class="notification is-primary">
                <p class="title">${response.data.imdbRating}</p>
                <p class="subtitle">IMDB RATING</p>
            </article>
            <article data-value=${stats.imdbVotes} class="notification is-primary">
                <p class="title">${response.data.imdbVotes}</p>
                <p class="subtitle">IMDB Votes</p>
            </article>
        `;
    };

};



