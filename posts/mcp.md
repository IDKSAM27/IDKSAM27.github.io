---
title: 'MCP (Model Context Protocol)'
date: '2025-11-2'
excerpt: ' MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems.'
---

# Forget "Chatbots." Let's Build "Agents": A Deep-Dive into MCP

**Tags:** `AI`, `LLM`, `Tech`, `Engineering`, `MCP`, `Anthropic`

---

Hey everyone! So, you've probably spent the last year playing with AI chatbots. You ask a question, it gives you an answer. It's cool, but it's also a bit... *contained*. The AI is stuck inside its "brain," only knowing what it was trained on.

But what if you could give that brain **arms and legs**? What if it could check your email, query your company's database, or read your local files *for real*?

That's not science fiction anymore. That's **agentic AI**, and the new technology making it all possible (and standardized) is the **Model Context Protocol**, or **MCP**.

Since you'll be hearing this acronym *everywhere*, let's break down what it is, how it works, and why it's about to change how we build software.

## So, What *is* MCP?


Think of MCP as the **USB-C port for AI**.

Before USB-C, we had a nightmare of different connectors: HDMI for video, a different plug for power, USB-A for data, and 37 other random cables from 2005. Now, one port can do it all: power, video, and data.

That's *exactly* what MCP is.

* **The Old Way:** If you wanted your AI (like Claude) to talk to your tools (like Google Drive, Slack, and GitHub), you had to build a separate, custom-made, brittle "connector" for *each one*. If you then wanted to swap to a different AI (like ChatGPT), you had to rebuild *all* those connectors. This is the **"N x M" problem** (N models x M tools = a million headaches).
* **The MCP Way:** MCP is an **open standard** (introduced by Anthropic in late 2024) that says, "Hey, all tools and all AI models, let's just agree to talk to each other in *one* standard way."

Now, an AI application just needs to speak "MCP," and it can instantly connect to *any* tool that also speaks "MCP." It's a universal adapter that turns chatbots into do-bots.

## How It Works: The Cast of Characters 

MCP's architecture is pretty simple. It's a classic **client-server** model.

1.  **The MCP Host:** This is the main AI application you're interacting with. Think of **Claude Desktop** or an **AI-powered code editor** (like Zed or Cursor). The Host is the "stage" where everything happens.
2.  **The MCP Client:** This is a little component that lives *inside* the Host. The Host can spin up *multiple* clients. Each client has one job: to connect to a single MCP server.
3.  **The MCP Server:** This is the *tool* or *data source* you want to connect to. It's a separate program that "serves" context. You could have a `GoogleDriveServer`, a `SlackServer`, or a `MyLocalFilesServer` all running at the same time.



The **Host** (your app) manages all its **Clients**, and each **Client** holds a one-on-one conversation with its **Server** (your tool).

## The "What Can It Do?" Part: The 3 Core Capabilities

When a Client connects to a Server, the Server tells the client what it's capable of. These capabilities fall into three main categories:

* **Resources:** This is for *data*. The server tells the Host, "I can give you file-like data." This could be the content of a local file, a row from a database, or a message from Slack.
* **Tools:** This is for *actions*. The server says, "I have functions the LLM can use." This is the exciting part! The LLM can then *ask* to run these functions. For example:
    * `search_database(query: str)`
    * `send_email(to: str, subject: str, body: str)`
    * `get_weather_forecast(location: str)`
* **Prompts:** These are pre-written prompt templates the server can offer the user to help them get started with a specific task.

So, when you ask your AI, "Summarize the sales doc and email it to my boss," the LLM (inside the Host) sees all the tools available from its clients. It says, "Aha! I'll use the `read_resource` tool from the Google Drive server and then the `send_email` tool from the Gmail server."

## Under the Hood: The "Protocols and Stuff" 

This is the really cool engineering part. How does this "conversation" actually happen?

MCP is brilliantly "unoriginal"—it's built on top of other battle-tested, open protocols.

1.  **The "Language": JSON-RPC 2.0**
    All communication between the Client and Server is just a series of JSON messages. This is **JSON-RPC 2.0**, a super-lightweight "Remote Procedure Call" protocol.

    A client (the AI) sends a `request` message:
    ```json
    {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "tool/execute",
      "params": {
        "name": "get_weather_forecast",
        "parameters": { "location": "San Francisco" }
      }
    }
    ```
    The server (the tool) does the work and sends back a `response` message:
    ```json
    {
      "jsonrpc": "2.0",
      "id": 1,
      "result": {
        "content": [
          {
            "type": "text",
            "text": "The weather in San Francisco is 65°F and sunny."
          }
        ]
      }
    }
    ```
    This simplicity is what makes it so easy to implement.

2.  **The "Transport": How the Messages Travel**
    The JSON-RPC messages can be sent over two main "transports":
    * **Standard I/O (stdio):** For local servers (like reading your own files), the Host can just run the server program and talk to it directly through its standard input and output. It's incredibly fast and simple.
    * **HTTP (with Server-Sent Events - SSE):** For remote servers (like a web API), it just uses standard HTTP. For real-time updates (like a Slack server telling the AI about a *new* message), it can use **SSE** to stream data efficiently.

3.  **The "Inspiration": LSP**
    The whole idea is heavily inspired by the **Language Server Protocol (LSP)**. LSP is what lets your code editor (like VS Code) talk to a "language server" (like the Python server) to get features like autocompletion and error-checking. MCP is just applying that same brilliant idea to AI.

## Why You Should Care

* **It's the Future:** You're not just learning about a random library; you're learning the *new standard* for how all AI applications will be built.
* **It's Not Just for Big Models:** You can build your *own* MCP servers. Got a project with a custom database? Build a simple MCP server for it (in Python, TypeScript, C#—SDKs are available!) and *boom*, your project is now AI-ready.
* **It Solves Real Problems:** This protocol directly tackles the biggest limitations of LLMs: **hallucinations** (by grounding them in real, live data) and **usability** (by letting them take action).

This is a *massive* shift. We're moving from AI that just *knows* things to AI that can *do* things. And now, thanks to MCP, you have a standard blueprint for building them.

Go build something awesome.

---