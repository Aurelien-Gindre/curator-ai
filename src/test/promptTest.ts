// The purpose of this file is to test the prompts of chatgpt
import { config } from 'dotenv';
import { getCompletion } from '../getCompletion';

config();

const Q = "You are an expert at structured data extraction. You will be given unstructured text from a user mail. Retrieve the periodicity in seconds for the periodicity field. Retrieve the themes. If no links are included in the request, add links related to the themes. If no themes are specified return null" 
const T_base = "You are a expert at test verification. If the test is successful, answer Successful. Your test : "


main();

function main(){
    test1();
}

async function test1(){
    const P = "I would like to have news every week. I want news on astronomy and bakery";
    const T = "The answer must contain the semantic equivalent themes: space and bakery. The frequency must be weekly."
    const completion = await getCompletion ({messages :[{role: "system",content : Q},{role: "user", content : P},{role : "system",content : T_base+T,}]});
    console.log(completion.message.content);
    if (completion.message.content === "Successful"){
        console.log(`\x1b[1m\x1b[32mThe test ${test1.name} was successful\x1b[0m`);
    }
    else {
        console.log(`\x1b[1m\x1b[31mThe test ${test1.name} was not successful\x1b[0m`);
        console.log(`\t\x1b[1mQuery\x1b[0m : ${P}`)
        console.log(`\t\x1b[1mTest\x1b[0m : ${T}`)
        console.log(`\t\x1b[1mAPI answer\x1b[0m : ${completion.message.content}`)
    }
}

