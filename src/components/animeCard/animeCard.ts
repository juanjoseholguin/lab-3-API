enum AnimeCardProps {
    "anititle" = "anititle",
    "image" = "image",
};

class AnimeCard extends HTMLElement {
    anititle?: string;
    image?: string;
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return Object.values(AnimeCardProps);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>
                #anime-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 200px;
                    border-radius: 12px;
                    background-color: #fff;
                    border: 1px solid #ff4081;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    transition: transform 0.2s ease, box-shadow 0.3s ease;
                    cursor: pointer;
                    font-family: sans-serif;
                }

                #anime-card:hover {
                    transform: scale(1.03);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                }

                img {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                    border-bottom: 1px solid #ff4081;
                }

                .anime-title {
                    padding: 0.8rem;
                    text-align: center;
                    color: #333;
                    font-weight: bold;
                    font-size: 1rem;
                }
            </style>

            <div id="anime-card">
                <img src="${this.getAttribute("image")}" alt="${this.getAttribute("anititle")}">
                <div class="anime-title">${this.getAttribute("anititle")}</div>
            </div>
        `;
    }
}

customElements.define("anime-card", AnimeCard);
export default AnimeCard;
