import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const PreferenceExtraction = z.object({
  max_article_nb: z.number(),
  periodicity: z.number(),
  themes: z.array(z.string()),
  links: z.array(z.string()),
});

export async function runStructuredRequest(openai : any, userMail : string) {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert at structured data extraction. You will be given unstructured text from a user mail and should convert it into the given structure. The periodicity must be converted in seconds for the periodicity field. For instance 'every week' would be 604800 seconds. If no links are included in the request, add links to newsletters related to the themes. If no themes are specified return null. Default value for article number is 5 if no value is specified" },
      { role: "user", content: userMail },
    ],
    response_format: zodResponseFormat(PreferenceExtraction, "preference_extraction"),
  });
  
  const preferences_completion = completion.choices[0].message.parsed;
  
  console.log(preferences_completion)
}

