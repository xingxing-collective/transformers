# Transformers TUI

A Terminal User Interface (TUI) for running Hugging Face Transformers models directly in your terminal using Transformers.js.

## Features

- Interactive TUI experience inspired by opencode
- Support for various Hugging Face tasks:
  - Translation
  - Text Generation
  - Summarization
  - Question Answering
  - And more...
- Choose from a wide selection of pre-trained models
- Run AI models locally in your browser/terminal with Transformers.js

## Installation

```bash
bun install
```

## Usage

```bash
bun run index.ts
```

## How It Works

This project leverages [Transformers.js](https://huggingface.co/docs/transformers.js) to run transformer models directly in JavaScript/TypeScript. The TUI interface provides an intuitive way to:

1. Select a task (e.g., Translation, Text Generation)
2. Choose a model from Hugging Face Hub
3. Input your text or query
4. Get instant results

## Libraries

- [Transformers.js](https://huggingface.co/docs/transformers.js) - Run 🤗 Transformers directly in the browser

## License

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
