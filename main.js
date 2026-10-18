const stories = [
  {
    id: "comunidade",
    category: "Comunidade",
    title: "Espaços compartilhados criam novas formas de encontro",
    summary:
      "Como iniciativas locais podem transformar a maneira de viver uma cidade.",
    tone: "teal",
  },
  {
    id: "cultura",
    category: "Cultura",
    title: "Uma agenda cultural pensada para todos",
    summary:
      "Eventos acessíveis ajudam diferentes públicos a descobrir novas experiências.",
    tone: "orange",
  },
  {
    id: "ideias",
    category: "Ideias",
    title: "Projetos simples, impacto duradouro",
    summary: "Pequenas soluções ganham força quando são bem comunicadas.",
    tone: "purple",
  },
  {
    id: "mobilidade",
    category: "Comunidade",
    title: "Novos caminhos para circular pela cidade",
    summary:
      "Pensar nos trajetos cotidianos pode tornar espaços mais acolhedores.",
    tone: "blue",
  },
  {
    id: "leitura",
    category: "Cultura",
    title: "A leitura como ponto de encontro",
    summary:
      "Uma biblioteca pode ser muito mais do que um lugar para encontrar livros.",
    tone: "rose",
  },
  {
    id: "digital",
    category: "Ideias",
    title: "Tecnologia útil começa pela simplicidade",
    summary:
      "Interfaces claras ajudam mais pessoas a participar da vida digital.",
    tone: "green",
  },
];

let activeFilter = "Todos";
const search = document.querySelector("#search");
const grid = document.querySelector("#story-grid");
const dialog = document.querySelector("#story-dialog");

function openStory(id) {
  const story = stories.find((item) => item.id === id);
  if (!story) return;
  document.querySelector("#dialog-category").textContent = story.category;
  document.querySelector("#dialog-title").textContent = story.title;
  document.querySelector("#dialog-summary").textContent = story.summary;
  dialog.showModal();
}

function renderStories() {
  const term = search.value.trim().toLocaleLowerCase("pt-BR");
  const matches = stories.filter(
    (story) =>
      (activeFilter === "Todos" || story.category === activeFilter) &&
      `${story.title} ${story.summary} ${story.category}`
        .toLocaleLowerCase("pt-BR")
        .includes(term),
  );
  grid.replaceChildren();
  for (const story of matches) {
    const article = document.createElement("article");
    article.className = "story-card";
    const visual = document.createElement("div");
    visual.className = `story-visual ${story.tone}`;
    visual.setAttribute("aria-hidden", "true");
    visual.textContent = story.category.toUpperCase();
    const body = document.createElement("div");
    body.className = "story-card-body";
    const category = document.createElement("span");
    category.className = "meta";
    category.textContent = story.category;
    const title = document.createElement("h3");
    title.textContent = story.title;
    const summary = document.createElement("p");
    summary.textContent = story.summary;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Ler história →";
    button.addEventListener("click", () => openStory(story.id));
    body.append(category, title, summary, button);
    article.append(visual, body);
    grid.append(article);
  }
  document.querySelector("#empty").hidden = matches.length !== 0;
}

document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    renderStories();
  }),
);
document
  .querySelectorAll("[data-story]")
  .forEach((button) =>
    button.addEventListener("click", () => openStory(button.dataset.story)),
  );
search.addEventListener("input", renderStories);
document
  .querySelector("#close-dialog")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const menu = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#main-nav");
menu.addEventListener("click", () => {
  const expanded = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!expanded));
  navigation.classList.toggle("open", !expanded);
});
navigation.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
  }),
);
renderStories();
