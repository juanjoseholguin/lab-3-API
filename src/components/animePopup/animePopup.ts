class AnimePopup extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute("title") || "";
        const score = this.getAttribute("score") || "";
        const synopsis = this.getAttribute("synopsis") || "";
        const episodes = this.getAttribute("episodes") || "";
        const year = this.getAttribute("year") || "";
        const season = this.getAttribute("season") || "";
        const genres = JSON.parse(this.getAttribute("genres") || "[]");

        this.shadowRoot!.innerHTML = `
            <style>
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.6);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 999;
                    animation: fadeIn 0.3s ease-in-out;
                }

                .anime-popup {
                    background-color: #fff;
                    border-radius: 10px;
                    padding: 2rem;
                    max-width: 600px;
                    width: 90%;
                    font-family: "Noto Sans JP", sans-serif;
                    position: relative;
                    box-shadow: 0 0 20px rgba(0,0,0,0.3);
                    animation: slideIn 0.3s ease-in-out;
                    overflow-y: auto;
                    max-height: 80vh;
                }

                .close-btn {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    font-size: 1.5rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #ff4081;
                }

                .anime-title {
                    margin-top: 0;
                    color: #333;
                }

                .anime-score {
                    color: #888;
                    font-weight: normal;
                    margin-top: 0.3rem;
                }

                .anime-synopsis {
                    margin-top: 0.5rem;
                    line-height: 1.5;
                    color: #444;
                }

                .anime-genres {
                    margin: 1rem 0;
                }

                .genres-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .genre-tag {
                    background-color: #ffebf0;
                    color: #ff4081;
                    padding: 0.3rem 0.6rem;
                    border-radius: 999px;
                    font-size: 0.85rem;
                }

                .anime-episodes,
                .anime-meta {
                    margin-top: 0.75rem;
                    font-weight: 500;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideIn {
                    from { transform: translateY(-10px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            </style>

            <div class="popup-overlay">
                <div class="anime-popup">
                    <button class="close-btn">&times;</button>
                    <h2 class="anime-title">${title}</h2>
                    <h4 class="anime-score">Score: ${score}</h4>
                    <p class="anime-synopsis">${synopsis}</p>
                    <div class="anime-genres">
                        <h3>Genres:</h3>
                        <div class="genres-container">
                            ${genres.map((genre: string) => `<span class="genre-tag">${genre}</span>`).join("")}
                        </div>
                    </div>
                    <h3 class="anime-episodes">Episodes: ${episodes}</h3>
                    <div class="anime-meta">
                        <h3>Year: ${year}, Season: ${season}</h3>
                    </div>
                </div>
            </div>
        `;

        
        this.shadowRoot!.querySelector(".close-btn")?.addEventListener("click", () => {
            this.remove();
        });

        this.shadowRoot!.querySelector(".popup-overlay")?.addEventListener("click", (e) => {
            if ((e.target as HTMLElement).classList.contains("popup-overlay")) {
                this.remove();
            }
        });
    }
}

customElements.define("anime-popup", AnimePopup);
export default AnimePopup;
