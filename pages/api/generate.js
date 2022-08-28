import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const prompt = `Provide a bold answer to the question "${req.body.question}" for my job interview at ${req.body.companyName} as a ${req.body.roleTitle}: \n\n
    ${req.body.companyDescription} \n\n
    This is the role description: ${req.body.roleDescription}`;
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  res
    .status(200)
    .json({ result: completion.data.choices[0].text });
}