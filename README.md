# SupaTest

The first two commits are only for testing purpose, and have been completely removed from the project, which does not affect the project in any way.

## Deployment
[SupaTest](https://supatest-eight.vercel.app)


https://github.com/vincent0426/supatest/assets/68840528/15708943-00a5-4374-9e08-12d90eae2011


## Motivation
Generating realistic and meaningful fake data based on a predefined schema can be a challenging task. This becomes even more complex when large datasets, say over 1000 rows, are required.

Our aim with "SupaTest" is to address this gap by creating a solution that not only abides by the given schema but also ensures that the resulting data aligns with real-world scenarios.

We do found that Supabase anounced an similar idea in launch week 8 https://www.youtube.com/watch?v=51tCMQPiitQ, but we start this project before the announcement, which makes us believe that this is a good idea.

## Usage
1. Create a new project in supabase
2. Create a new table with schema
3. Go to Supabase project settings -> API -> Copy the Project URL and Project API keys with anon public role
4. Go to Supatest and click "Connect" button
5. Paste the Project URL and Project API keys
6. Go to OpenAI (https://platform.openai.com/account/api-keys) and create a new API key
7. Paste the OpenAI API key to Supatest
8. Click "Connect" button
9. Select the table you want to generate data
10. Click "Generate" button
11. Wait for the data to be generated
12. Click "Publish" button to publish the data to your supabase project
13. Head to your supabase project and check the data
14. Voila!
15. Give us a star if you like it!

## Documentation

### Tech Stack
- [Supabase](https://supabase.io/) - Database
- [Transformers.js](https://huggingface.co/docs/transformers.js/index) - Classification
- [OpenAI](https://openai.com/) - Text Generation
- [Next.js](https://nextjs.org/) - Frontend
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [PostgREST](https://postgrest.org/en/stable/) - REST API for Postgres
- [Vercel](https://vercel.com/) - Deployment
### Natural Language Processing

Our initial strategy involves generating an entire column within the target table using the language model (in our case, ChatGPT), and we can furnish the schema of the table through a prompt. However, as we intend to execute the same prompt multiple times to obtain various sets of synthetic data, we desire a degree of randomness in our language model's outputs. Yet, incrementing the temperature setting to achieve this randomness leads to unstable outputs from the language model. Consequently, we have adopted an alternative approach.

#### First Step: Column Classification

Given the inherent instability in generating substantial amounts of data from the language model (LLM), our approach aims to enhance stability. We begin by dissecting the intended purpose of the column, categorizing it into recognized types such as usernames or locations using zero-shot classification with the  `transformer` library. Those columns with clearly defined purposes can then be efficiently created using the `faker.js` library. However, for more intricate columns like paragraph content, we leverage the capabilities of a more-powerful prompt-based LLM to generate such data.

#### Second Step: Complex Data Generation

Beginning with the initial step, our approach involves providing the schema of the table along with the contents of the incomplete column to our prompt-based language model (LLM). This enables the model to discern the context and generate appropriate content accordingly. To illustrate, in a trial run, we utilize the `faker.js` library to generate the values for columns such as `sender_name` (Jorge) and `receiver_name` (Marie), while the column message_content is crafted by ChatGPT, yielding the desired result: *Hey Marie, how have you been?* This process effectively fulfills our intended objective.

## Roadmap

<!-- checkbox -->
- [x] 1. Fetch schema data from supabase sql.
- [x] 2. Auto data generation with LLM (chatgpt/llama2)
- [x] 3. Insert the fake data into user's db
- [x] 4. Web based interface
- [ ] 5. Allow user to customize the prompt for LLM
- [ ] 6. Allow cross table reference
- [ ] 7. Fine tune the LLM with user's data for faster generation and better quality

## Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
yarn install

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authors

- [Vincent](https://github.com/vincent0426)
- [Andre](https://github.com/namwoam)
