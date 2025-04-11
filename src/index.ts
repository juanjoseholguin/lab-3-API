import "./components/animeCard/animeCard";
import "./components/animePopup/animePopup";
import getData from "./services/getDataService";

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        this.shadowRoot!.innerHTML = `
            <style>
                h1 {
                    text-align: center;
                    font-family: sans-serif;
                    margin-bottom: 1rem;
                }

                #app {
                    display: flex;
                    justify-content: center;
                }

                #anime-list {
                    display: flex;
                    flex-wrap: wrap;
                    max-width: 100%;
                    gap: 1rem;
                }
            </style>

            <h1>Lista de los mejores Animes de Holguín!</h1>
            <section id="app">
                <ul id="anime-list"></ul>
            </section>
        `;

        const data = await getData("https://api.jikan.moe/v4/anime?limit=15&status=complete");
        const animeData = data.data;

        const animeList = this.shadowRoot!.getElementById("anime-list");

        animeData.forEach((anime: any) => {
            const anicard = document.createElement("anime-card");

            anicard.setAttribute("anititle", anime.title);
            anicard.setAttribute("image", anime.images.jpg.image_url);

            anicard.addEventListener("click", () => {
                const popup = document.createElement("anime-popup");

                popup.setAttribute("title", anime.title);
                popup.setAttribute("score", anime.score);
                popup.setAttribute("synopsis", anime.synopsis);
                popup.setAttribute("episodes", anime.episodes);
                popup.setAttribute("year", anime.year);
                popup.setAttribute("season", anime.season);
                popup.setAttribute("genres", JSON.stringify(anime.genres.map((g: any) => g.name)));

                this.shadowRoot!.appendChild(popup);
            });

            animeList!.appendChild(anicard);
        });
    }
}

customElements.define("app-container", AppContainer);

