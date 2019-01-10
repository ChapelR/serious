Serious is a framework for building episodic (or serialized) fiction for the web. It takes a number of source files, written in markdown format, and compiles these episodes into a simple single-page web app for you to deploy to your webhost.

[See the example story.](./example/)

# Getting Started

## Installation. 

Download and install the latest LTS version of [NodeJS](https://nodejs.org/en/). 

Download the [Serious author package](https://github.com/ChapelR/serious/releases), and a theme if you want, from the releases page. [Read more about themes.](#using-themes)

Unzip the author package and run `npm install` in the directory from the command line. 

## Setting up. 

The `config.json` file holds all the basic settings you can alter, like the name of your story, its basic information, and external links and such. 

[Read more here.](#configuration-settings)

## Writing. 

There are three types of posts you can write: meta posts, special posts, and episode posts. 

Meta posts are added to the sidebar, and users can click here to read them. For example, you may create an "about" meta post with information about the story for newcomers. 

[Read more about meta posts.](#meta-posts)

Speical posts are optional things you can use to fine tune some elements of your Serious story, for example, you can display a custom message before and after each episode, list your copyright information at the bottom of every page, and present other custom messages.

[Read more about meta posts.](#special-posts)

Episode posts are your story, a series of episodes that the user reads through. These are the main attraction here, and the user can view recent episodes on your home page, or see a chronological list of episodes, start at the beginning, or jump to the latest episode from the side bar. Users can link to episodes using a URL query. 

[Read more about episodes.](#episode-posts)

## Testing and deploying. 

To compile your story, open a command prompt, `cd` to the directory, and run `npm run build`. This will compile your project to a directory as indicated in the `config.json` file (`publish`, by default). You can then upload this file to your web server or host, but it would be wise to test it out first. Unfortunately, just going in and clicking on `index.html` won't work.

Because Serious generates AJAX to load episode data from JSON files, you'll need to host the app on the web or using localhost to run it. That is, you can't just open the html file to view it, you'll need to run the command `npm run serve` in the terminal.

# Detailed Documentation