// Formats the preferences in markdown 
// preferences : string
// 
// return preferencesEmail : String

function formatPreferencesMarkdown(preferences: string) {

    // Retreiving the infos
    let preferencesJSON = JSON.parse(preferences);
    let email = preferencesJSON.uid;
    let interval = preferencesJSON.interval;
    let next_timestamp = preferencesJSON.next_timestamp;
    let max_article_nb = preferencesJSON.max_article_nb;
    let summary_length = preferencesJSON.summary_length;
    let links: string[] = preferencesJSON.links;
    let themes: string[] = preferencesJSON.themes;

    // Newletter's header

    let preferencesEmail = 'Preferences MARKDOWN\n\n';
    preferencesEmail += "Hello! Here are your preferences!\n\n";
    preferencesEmail += `Your email is ${email}.\n`;
    preferencesEmail += `You receive your newsletter every ${interval} s.\n`;
    preferencesEmail += `The next email you will receive will be the ${next_timestamp}.\n`;
    preferencesEmail += `You will receive ${max_article_nb} articles maximum for each newsletter.\n`;
    preferencesEmail += `Your summaries will be ${summary_length} words long.\n`;
    preferencesEmail += `Here the links you want to follow :\n`;

    // Returning each link

    links.forEach(link => {
        preferencesEmail += ` - ${link}\n`;
    });

    preferencesEmail += `Here the themes you want to follow :\n`;

    // Returning each theme

    themes.forEach(theme => {
        preferencesEmail += ` - ${theme}\n`;
    });

    // Footer

    preferencesEmail += "\nThat's all! If you want to change something, just answer this email with your new preferences!\n";
    // Link for unsubscription
    preferencesEmail += "\n\nIf you no longer want to receive our email, you can unsubscribe wih : " + process.env.WEBPAGELINK + "/en/signOut.html"

    return preferencesEmail;
}

// Formats the preferences in html (no style) 
// preferences : string
// 
// return preferencesEmail : String

function formatPreferencesHtml(preferences: string) {
    // Retreiving the infos
    let preferencesJSON = JSON.parse(preferences);
    let email = preferencesJSON.uid;
    let interval = preferencesJSON.interval;
    let next_timestamp = preferencesJSON.next_timestamp;
    let max_article_nb = preferencesJSON.max_article_nb;
    let summary_length = preferencesJSON.summary_length;
    let links: string[] = preferencesJSON.links;
    let themes: string[] = preferencesJSON.themes;

    // Header

    let htmlPreferencesEmail = '<div style="font-family: Arial, sans-serif;">';
    htmlPreferencesEmail += '<h1>Preferences HTML</h1>';
    htmlPreferencesEmail += '<p>Hello! Here are your preferences!</p>';
    htmlPreferencesEmail += `<p>Your email is ${email}.</p>`;
    htmlPreferencesEmail += `<p>You receive your newsletter every ${interval} s.</p>`;
    htmlPreferencesEmail += `<p>The next email you will receive will be the ${next_timestamp}.</p>`;
    htmlPreferencesEmail += `<p>You will receive ${max_article_nb} articles maximum for each newsletter.</p>`;
    htmlPreferencesEmail += `<p>Your summaries will be ${summary_length} words long.</p>`;
    htmlPreferencesEmail += `<p>Here the links you want to follow :</p><ul>`;

    // Returning each link

    links.forEach(link => {
        htmlPreferencesEmail += `<li> - ${link}</li>`;
    });
    htmlPreferencesEmail += `</ul></p>`;

    htmlPreferencesEmail += `<p>Here the themes you want to follow :<ul>`;

    // Returning each theme

    themes.forEach(theme => {
        htmlPreferencesEmail += `<li> - ${theme}</li>`;
    });
    htmlPreferencesEmail += `</ul></p>`;

    htmlPreferencesEmail += "<p>That's all! If you want to change something, just answer this email with your new preferences!</p>";
    // Link for unsubscription

    // Link for unsubscription
    htmlPreferencesEmail += "<p>If you no longer want to receive our email, you can <a href=\"" + process.env.WEBPAGELINK + "/en/signOut.html\">unsubscribe</a> from our newsletter.</p>"

    return htmlPreferencesEmail;
}

// Formats the newsletter in html with style
// articles : Summary[]
// 
// return newsletter : String

function formatPreferencesHtmlWithCSS(preferecesJSON: string) {

    // Header

    let htmlNewsletter = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px; border-radius: 10px; max-width: 800px; margin: 0 auto;">
        <h1 style="color: #4CAF50; text-align: center; font-size: 32px;">Newsletter HTML</h1>
        <p style="font-size: 18px; text-align: center;">Hello everyone! Here are the latest news!</p>
    `;

    // Formatting each article

    articles.forEach(article => {
        const title = article.title || "Title not available";
        const author = article.author || "Unknown author";
        const summary = article.summary || "Summary not available.";
        const link = article.link || "#";

        htmlNewsletter += `
        <div style="margin-bottom: 30px; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h3 style="color: #FF5722; font-size: 24px;">${title}</h3>
            <p style="font-size: 16px; font-weight: bold; color: #555;">by ${author}</p>
            <p style="font-size: 16px;"><a href="${link}" style="color: #1E88E5; text-decoration: none; font-weight: bold;">Read the full article</a></p>
            <blockquote style="font-size: 16px; color: #777; border-left: 4px solid #ddd; padding-left: 15px;">${summary}</blockquote>
        </div>
        `;
    });

    // Link for unsubscription
    htmlNewsletter += "<p>If you no longer want to receive our email, you can <a href=\"" + process.env.WEBPAGELINK + "/en/signOut.html\">unsubscribe</a> from our newsletter.</p>"

    htmlNewsletter += '</div>';
    return htmlNewsletter;
}

// Uses the curate function to generate newsletter data and formats output to be used in mail
// TODO : add parameters based on user (links,interests?,maxArticles?,maxContentSize?)


export function curateAndGenerateNewsletter(): Promise<{ preferences: string, markdown: string, html: string }> {
    return getPreferences()
        .then(preferences => {
            // Generate the formatted string when promise completed
            const markdown = formatPreferencesMarkdown(preferences);
            const html = formatPreferencesHtmlWithCSS(preferences);
            // Returns raw json and formatted newletters
            return { preferences, markdown, html };
        })
        .catch(err => {
            // Will most likely be instance of Error TODO : check if there are different error cases
            if (err instanceof Error) {
                console.error("Error during preferences retrieval: ", err.message);
            } else {
                console.error("Unknown error occurred during preferences retrieval");
            }
            throw new Error("Failed to generate preferences.");
        });
}
