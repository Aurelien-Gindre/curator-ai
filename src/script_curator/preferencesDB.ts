function getPreferences(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const preferences = {
                uid: "personne@mail.com",
                interval: "5 days",
                next_timestamp: "5 Avril 2025",
                max_article_nb: "5",
                summary_length: "15",
                links: [
                    "link1",
                    "link2"
                ],
                themes: [
                    "theme1",
                    "theme2"
                ]
            }

            return preferences;
        }, 1000);
    });
}