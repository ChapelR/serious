# Introduction

Serious is a framework for building episodic (or serialized) fiction for the web. It takes a number of source files, written in markdown format, and compiles these episodes into a simple single-page web app for you to deploy to your webhost.

[See the example story.](https://twinelab.net/serious/example)

## Features

- Write in markdown.  
- Designed for (and only for) episodic content, from the ground up.  
- Users can easily access the episode list, view the most recent episodes, or start at the beginning.  
- Supports custom CSS themes and custom scripts.  
- Comments via Disqus. Just plug in a shortname and go.  
- Highly configurable.  
- Designed for people new at building websites.  
- Generates a simple static web page--host in anywhere.  

## Is Serious Right for Me?

**Assuming you're new to web development, are you willing to learn some programming?**

Serious is not meant to be advanced, or complicated, but it does use a lot of programming tools that most professional web developers use to make websites. These tools are built to be fast, effective, and efficient, not easy to use. If you can learn to program a VCR, you can learn this stuff, but it does take time and willingness. It can be rewarding though, and Serious may be a good way to get started.

This documentation also comes with [a number of guides](#additional-guides-and-information) intended to get non-programmers started.

**Are you looking specifically for a tool to help you make episodic content?**

Serious does *one* thing. It is not for blogs, personal web sites, portfolios, or presskits. There's probably some interesting use cases for Serious, but it is what it is.

**Are you sure you wouldn't be better served by another platform?**

Websites like https://www.fictionpress.com/ and https://archiveofourown.org/ allow authors to make episodic content, too. You should choose Serious instead if you want to create your own site and host it--you don't want to be boxed into someone else's platform, or if the concept of building it yourself seems interesting.

## Licensing

Serious is licensed under the [MIT license](https://en.wikipedia.org/wiki/MIT_License). That means that you can do whatever you want with it as long as you provide attribution (the `Powered by Serious.` message is for this, but you can move it somewhere else if you want).

Serious is completely free, gratis and libre.

# Getting Started

The following sections will help you install and set up Serious, and give you a brief overview of the software.

## Installation 

Download and install the latest LTS version of [NodeJS](https://nodejs.org/en/). 

Download the [Serious author package](https://github.com/ChapelR/serious/releases), and a theme if you want, from the releases page. [Read more about themes.](#using-themes)

Unzip the author package and run `npm install` in the directory from the command line. [Read more if that freaks you out or doesn't make sense to you.](#guide-using-the-command-line)

## Setting Up

The `config.json` file holds all the basic settings you can alter, like the name of your story, its basic information, and external links and such. You'll probably want to change a lot of these.

Open the file in a text editor (important: not a word processor) when you edit it.

[Read more about the configuration settings here.](#configuration-settings)

The only other thing you'll need to consider is how exactly you plan to deploy your story to the web. If you want a free option, [neocities](https://neocities.org/) and [GitHub pages](https://pages.github.com/) are both good options to start out, though you may need to migrate to a different host if your story *really* takes off.

Look for any web host that allows you to upload arbitrary files through FTP or similar. Your Serious story is a "static site", meaning it doesn't need any server logic to work, just a web host. Websites that have their own "builders" usually won't work.

Here's some guides to get you cracking, though I'd save this for later unless you feel like you just wouldn't be able to manage it.

* [A guide to publishing to GitHub pages.](#guide-publishing-to-github-pages)  
* [A guide to publishing to Neocities.](#guide-publishing-to-neocities)

## Writing

There are three types of posts you can write: meta posts, special posts, and episode posts. Everything you write in Serious will be written in markdown format, in a text editor. I recommend finding an editor you like with spell check and some font options. Here's a short list of some I use: [Sublime](https://www.sublimetext.com/), [VSCode](https://code.visualstudio.com), [Notepad++](https://notepad-plus-plus.org/).

[More about markdown.](#guide-markdown-formatting)

Meta posts are added to the sidebar, and users can click here to read them. For example, you may create an "about" meta post with information about the story for newcomers. 

[Read more about meta posts.](#posts-meta)

[Coming soon.] Special posts are optional things you can use to fine tune some elements of your Serious story, for example, you can display a custom message before and after each episode, or at the top of the episodes list.

[Read more about special posts.](#posts-special)

Episode posts are your story, a series of episodes that the user reads through. These are the main attraction here, and the user can view recent episodes on your home page, or see a chronological list of episodes, start at the beginning, or jump to the latest episode from the side bar. Users can link to episodes using a URL query. 

[Read more about episodes.](#posts-episodes)

## Testing and Deploying

To compile your story, open a command prompt, `cd` to the directory, and run `npm run build`. This will compile your project to a directory as indicated in the `config.json` file (`publish`, by default). You can then upload this file to your web server or host, but it would be wise to test it out first. Unfortunately, just going in and clicking on `index.html` won't work.

Because Serious generates AJAX to load episode data from JSON files, you'll need to host the app on the web or using localhost to run it. That is, you can't just open the html file to view it, you'll need to run the command `npm run serve` in the terminal.

To deploy your Serious story, you need to send everything in your output directory to your webhost. How you do that will depend on your webhost, but I've got guides for using GitHub pages and Neocities:

* [A guide to publishing to GitHub pages.](#guide-publishing-to-github-pages)  
* [A guide to publishing to Neocities.](#guide-publishing-to-neocities)

When I say everything in the output directory, that should be:

* One `index.html` file.  
* One `theme.css` file, even if it's blank!  
* One `content` folder.  
* One `index.json` file, inside the `content` folder.  
* Up to three additional folders: `episodes`, `meta`, and `special`, each containing any number of `.json` files.

# Detailed Documentation

The following sections will go into great detail on how everything in Serious works, and how to use it.

## Configuration Settings

When you start up your new Serious project, the first thing you will probably want to do is edit the configuration options. These options are in a format called JSON. To edit them, carefully change their values without losing any quotation marks or commas. If you need to out a double quote inside any of these options, use `\"`; that is, a blackslash followed by the double quote. Do not put line breaks (e.g. hit enter/return) in the options. 

[More about JSON format](#guide-json-format)

A `config.json` file looks like this:

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
        { "text": "About", "url": "https://twinelab.net", "label": "Learn more about Serious." },
        { "text": "Blog", "url": "https://twinelab.net/blog", "label": "Visit my blog." }
    ],
    "recentMax": 5,
    "recentsExcerpts": 1,
    "episodesExcerpts": 3,
    "debug": false,
    "disqusShortname": "",
    "refetch": {
        "main": 7200000,
        "perEpisode": 86400000
    }
}
```

Let's go over what some of that means.

|Option|Default|Description|
|---|---|---|
|`title`|`"The Title of Your Story"`|This is the name of your story. It appears on the recent episodes page and the episode list page, and in the browser tab. The story name is also used by your Disqus comments, if you have them enabled. You shouldn't change the name of your story as it will mess up your comments.|
|`displayTitle`|`""`|If you put something in here between the quotes, it will replace you title everywhere in your story except for the parts that mess up Disqus comments. Use this option if you need to change the name of a story you've already published.|
|`subtitle`|`""`|This appears below the title on some pages. You could use it as a byline, a subtitle, or a really short description.|
|`description`|`"A description of your website (for web searches) goes here.`|What you put in here doesn't appear in any pages, but is instead listed on some websites, like search engines, alongside links to the story.|
|`copyright`|`"&copy; [year] [your name]. All rights reserved."`|A copyright notice can be displayed at the very bottom of every page, just above where the `"Powered by Serious."` message is. You don't necessarily have to use this for copyright information. `&copy;` is the html code for &copy; (the copyright symbol).|
|`posts`|`"episodes"`|This option can be used to change the word used to refer to your episode posts, so you could change this to something else, like `"chapters"` or `"verses"`, based on your needs.|
|`input`|`"./src"`|This tells Serious where to look for your posts. Pass it a folder and it will recursively search it for markdown files (which have the `.md` extension) to turn into posts. Generally, you shouldn't need to change this, just place all your posts in the `src` folder in the author package.|
|`output`|`"./publish"`|Similar to the above, this tells Serious where to place your *built* web page, and where to run it from. Again, you generally don't need to change this.|
|`links`|`...`|You can add links to the sidebar menu in Serious using this option. Each link should look like this: `{ "text": "Click here", "url": "www.somesite.com", "label": "this is a tooltip!" }`. The `text` property controls the link's display text, and the `url` is where the link goes when clicked. The `label` propery appears as a tooltip when a user hovers their mouse over the link. You can use this to create links to you personal blog, main website, Patreon, etc. Be careful: when adding links, there should be a comma **between** each one, but not after the last one!|
|`recentMax`|`5`|This controls how many episodes Serious shows on the recents page and the landing page.|
|`recentsExcerpts`|`1`|This controls how many episodes in the recents list have their content shown. Those that aren't shown show an ellipse instead (&helli;). If you want all the content to be shown, set this equal to (or higher than) `recentMax`.|
|`episodesExcerpts`|`3`|This controls how many episodes in the episode list have their content shown, similar to `recentsExcerpts`.|
|`debug`|`false`|This turns on debug features, including console logs and other stuff. Generally not needed for most users. Make sure it's false before deploying.|
|`disqusShortname`|`""`|You can set up comments through [Disqus](https://disqus.com/). A comment thread will be added to every episode, but not to meta posts, lists, etc. Setting up Disqus is pretty simple. [Read more.](#guide-disqus-comments)|
|`refetch`|`...`|This can help alleviate performance problems for some users. You can set these values to times (in milliseconds). Your Serious story's data will be cached on the user's machine and only update that data when the indicated amount of time has elapsed. You can set these options both to `0` to prevent this entirely.|

## Writing Posts

### Posts: Episodes

### Posts: Meta

### Posts: Special

## Building

## Testing

## Publishing

# Additional Guides and Information

Here are some things you'll probably need to know to use Serious. They aren't necessarily a part of Serious itself, but will probably be useful if you're new to this sort of thing.

## Guide: Using the Command Line

## Guide: NodeJS

## Guide: JSON Format

## Guide: Markdown Formatting

## Guide: Disqus Comments

## Guide: Publishing to GitHub Pages

## Guide: Publishing to Neocities

# Advanced Options

You don't necessarily have to rebuild Serious from source to make fairly major changes. You can add CSS themes, alter the HTML template, and add some JavaScript pretty easily, and Serious itself has a number of APIs and events for you to use.

## Creating Themes

## Editing the HTML Structure

## Scripting

## The Serious API