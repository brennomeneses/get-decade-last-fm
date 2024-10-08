const languages: Readonly<Record<string, any>> = {
  en: {
    subtitle: "Find your music generations by your Last.FM",
    placeHolder: "Last.FM Username",
    submit: "Search",
    loading: "Loading Statistics...",
    liked: "Liked? Please",
    supportMe: "Give me a star",
    share: "Share",
  },
  pt: {
    subtitle: "Encontre as suas gerações musicais pelo seu Last.FM",
    placeHolder: "Nome de Usuário do Last.FM",
    submit: "Procurar",
    loading: "Carregando estatísticas...",
    liked: "Gostou? Por favor",
    supportMe: "Me dê uma estrela",
    share: "Compartilhar",
  },
  de: {
    subtitle: "Finde deine Music-generationen durch deine Last.FM",
    placeHolder: "Last.FM Benutzername",
    submit: "Suchen",
    loading: "Statistiken werden geladen...",
    liked: "Geschenkt? Bitte",
    supportMe: "Gib mir einen Stern",
    share: "Teilen",
  }
};

const languagesAvailable = Object.keys(languages);

type Languages = typeof languagesAvailable[number];

export { languages }
export type { Languages }