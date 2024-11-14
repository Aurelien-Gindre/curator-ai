import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { runStructuredRequest } from './structured_data';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

var userMail = "I would like my newsletter to be every 2 days, I have an interest in data engineering and LLMs"


runStructuredRequest(openai, userMail)