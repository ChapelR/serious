# Serious (serious-fiction)

Serious is a framework for building episodic (or serialized) fiction for the web. It takes a number of source files, written in markdown format, and compiles these files into a simple, sructured single-page web app for you to deploy to your webhost.

[See the example story.](https://twinelab.net/serious/example)

[Home page.](https://twinelab.net/serious)

MIT license.

## Features

- Write in markdown.  
- Designed for (and only for) episodic content, from the ground up.  
- Users can easily access the episode list, view the most recent episodes, or start at the beginning.  
- Support for custom CSS themes.  
- Comments via Disqus. Just plug in a shortname and go.  
- Highly configurable.  
- Designed for authors who may not be experienced in web development (like me!).  
- Generates a simple static web page--host it anywhere.  
- A single page app, but episodes still have unique URLs, Disqus threads, history/navigation entries, etc.

## Installation and Getting Started

Install via NPM: `npm install -g serious-fiction`

Installing Serious gives you access to a simple CLI to build your stories with. I'm new at writing CLIs, so it may not be as fully-featured an experience as you might expect.

You should ideally create your story in an empty directory. Run `serious init` in the directory to get started.

Run `serious build` to rebuild your story, and `serious serve` to view it locally. You can combine these two commands (eg `serious build serve` or `serious serve build`) to quickly build and view the story. You can also run `serious build` and refresh your browser tab (may need to hard refresh sometimes, which is `Ctrl + F5`) to see updates without needing to serve the web site again.

Serious uses AJAX, so you need to serve it via localhost, you can't just open the `index.html` file.

## Configuration

When you run `serious init`, a `config.json` file will be added to your directory. In the future, I hope to make this part of the CLI, but for now, you'll need to edit it by hand. It looks like this by default:

```json
{
    "title": "The Title of Your Story",
    "displayTitle": "",
    "subtitle": "",
    "description": "A description of your website (for web searches) goes here.",
    "copyright": "&copy; [year] [your name]. All rights reserved.",
    "posts": "episodes",
    "input": "./src",
    "output": "./publish",
    "links": [
        { "text": "Website", "url": "https://twinelab.net", "label": "Learn more about Serious." },
        { "text": "Blog", "url": "https://twinelab.net/blog", "label": "Visit my blog." }
    ],
    "recentMax": 5,
    "recentsExcerpts": 1,
    "episodesExcerpts": 3,
    "debug": false,
    "disqusShortname": ""
}
```

|Option|Default|Description|
|---|---|---|
|`title`|`"The Title of Your Story"`|This is the name of your story. It appears on the recent episodes page and the episode list page, and in the browser tab. Disqus comments are keyed to the title, so you likely won't want to change it.|
|`displayTitle`|`""`|If you put something in here between the quotes, it will replace you title everywhere in your story escept for with the Disqus comments.|
|`subtitle`|`""`|This appears below the main story title on some pages. You could use it as a byline, a subtitle, or a really short description.|
|`description`|`"A description of your website (for web searches) goes here.`|What you put in here doesn't appear in any pages, but is instead listed on some websites, like search engines or social media sites, alongside links to the story.|
|`copyright`|`"&copy; [year] [your name]. All rights reserved."`|A copyright notice can be displayed at the very bottom of every page, just above where the `"Powered by Serious."` message is. You don't necessarily have to use this for copyright information. `&copy;` is the html code for &copy; (the copyright symbol).|
|`posts`|`"episodes"`|This option can be used to change the word used to refer to your episode posts, so you could change this to something else, like `"chapters"` or `"verses"`, based on your needs.|
|`input`|`"./src"`|This tells Serious where to look for your posts, relative to `config.json`. Pass it a folder and it will recursively search it for markdown files (which have the `.md` extension) to turn into posts. Generally, you shouldn't need to change this, just place all your posts in the `src` folder.|
|`output`|`"./publish"`|Similar to the above, this tells Serious where to place your *built* web page, and where to run it from. Again, you generally don't need to change this.|
|`links`|`...`|You can add links to the sidebar menu using this option. Each link should look like this: `{ "text": "Click here", "url": "www.somesite.com", "label": "this is a tooltip!" }`. The `text` property controls the link's display text, and the `url` is where the link goes when clicked. The `label` propery appears as a tooltip when a user hovers their mouse over the link (using the `title` html attribute). You can use this to create links to you personal blog, main website, Patreon, etc.|
|`recentMax`|`5`|This controls how many episodes Serious shows on the recents page (and the landing page).|
|`recentsExcerpts`|`1`|This controls how many episodes in the recents list have their content shown. Those that aren't shown show an ellipse instead (&helli;). If you want all the content to be shown, set this equal to (or higher than) `recentMax`.|
|`episodesExcerpts`|`3`|This controls how many episodes on the episode list have their content shown, similar to `recentsExcerpts`.|
|`debug`|`false`|This turns on debug features, including console logs and other stuff. Generally not needed for most users. Probably make sure it's false before deploying.|
|`disqusShortname`|`""`|You can set up comments through [Disqus](https://disqus.com/). A comment thread will be added to every episode, but not to meta posts, lists, etc. Just add your shortname here, no further configuration is necessary!|

## Writing Episodes

You can write episodes using [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/). At the top of each episode, you should have YAML front matter to describe the episode:

```
---
title: Example Episode
subtitle: Serious Examples for Serious People
episode: 1
description: Welcome to Serious!
---
This is an **example episode**!

Welcome to Serious. To create episodes, you create a heading block like the one at the top of this file, then write your *markdown format content* after that.
``` 

|Parameter|Description|
|---|---|
|title|The episode's title. Required.|
|subtitle|The episode's subtitle. Optional.|
|episode|The episode's number. Required. See more below.|
|description|A brief description of the episode (not an excerpt). Not required but recommended.|

When numbering your episodes, **start at 1** (don't start at 0, it will cause an error), and make sure to not double up on any numbers (will also cause an error). Episodes should also *never* be sparse. If there's an episode 1 and an episode 3, there should be an episode 2; this won't cause an error, but will probably break the generated website.

## Meta Posts

"Meta" posts are special posts that exist outside of the normal episode structure. Things like an About page, recaps, etc. Meta posts are automatically added to the sidebar as links; clicking these links renders the meta episode. To create one, make sure the `episode` parameter in the front matter is `meta` rather than a number. There is also an additional `link` parameter that can be used to label the sidebar link; if a `link` parameter isn't provided, the `title` is used instead.

```
---
title: About My Story
link: About
subtitle: This is a meta post!
episode: meta
description: Meta posts are awesome!
---
By creating a post and making it's episode property in the header `meta` instead of a number, you can create a *meta post*, which will automatically appear as a link in the sidebar.
```

The parameters of a meta post are otherwise the same as a normal episode. Note that the titles of meta posts should be unique; episodes don't have this limitation (though it is wise).

## Deploying

Everything in the output folder (`publish` by default) is required to deploy the website. Copy all the files over to your hosting solution to deploy.

## Themes

I'm working on themes (pure CSS for now) to deploy for Serious in the future. Templates are not out of the question either, but I didn't design with that in mind, so we'll see. Some clean-up of the CSS will also come later. For now, though, you can write custom style rules in the `theme.css` file in your output directory to edit the styles.