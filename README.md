# Supatest

## Documentation

### Natural Language Processing

Our initial strategy involves generating an entire column within the target table using the language model (in our case, ChatGPT), and we can furnish the schema of the table through a prompt. However, as we intend to execute the same prompt multiple times to obtain various sets of synthetic data, we desire a degree of randomness in our language model's outputs. Yet, incrementing the temperature setting to achieve this randomness leads to unstable outputs from the language model. Consequently, we have adopted an alternative approach.

#### First Step: Column Classification

Given the inherent instability in generating substantial amounts of data from the language model (LLM), our approach aims to enhance stability. We begin by dissecting the intended purpose of the column, categorizing it into recognized types such as usernames or locations using zero-shot classification with the  `transformer` library. Those columns with clearly defined purposes can then be efficiently created using the `faker.js` library. However, for more intricate columns like paragraph content, we leverage the capabilities of a more-powerful prompt-based LLM to generate such data.

#### Second Step: Complex Data Generation

Beginning with the initial step, our approach involves providing the schema of the table along with the contents of the incomplete column to our prompt-based language model (LLM). This enables the model to discern the context and generate appropriate content accordingly. To illustrate, in a trial run, we utilize the `faker.js` library to generate the values for columns such as `sender_name` (Jorge) and `receiver_name` (Marie), while the column message_content is crafted by ChatGPT, yielding the desired result: *Hey Marie, how have you been?* This process effectively fulfills our intended objective.

## Roadmap

1. Fetch schema data from supabase sql.
2. Auto data generation with LLM (chatgpt/llama2) might encounter problem with linking data across multiple table?
3. Optionally insert the fake data into user's db with tag (indicates it's fake)
4. Web based interface

## Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.