## WP Boilerplate - M9 Digital

This is a boilerplate based on Vinka's Wordplate Repo. We use this to spin up full Wordpress based
dev environments

### Dependencies

- PHP 8.1 +
- MAMP / WAMP 
- NODE / NPM
- Composer
- ACF PRO 

### IMPORTANT

You need an ACF Pro licence to be able to use the flexible content field types in the default .php templates.  
I have installed standard ACF for you with Composer - if you prefer not to purchase a licence for ACF Pro you can use the standard
but will need to adapt page.php and index.php

If you do purchase ACF pro, uninstall standard ACF from the plugins setup in WP once you are installed.

If you fork this repo and want to have ACF pro installed via composer - these are the steps :

https://www.advancedcustomfields.com/resources/installing-acf-pro-with-composer/


### How to Create a project from this repository

Use this Repo as a Template - At the top right of your github.com UI there is a green button with
the words ' use this template' - click and then use 'create a new repository'. Name your repo based on 
the project you need to create

Once you have created a new repo, you can then clone the new repo down to your machine and begin set up

## Setup Guidance

- run 'composer install at the root in terminal'
- run 'npm install at the root in terminal' - suggest you check package.json prior to ensure in has the f-e pre-requisites you need  

I include :

Vue - need to uncomment the vue-plugin for vite in vite.config - see the comments
GSAP - Used for Animation
AOS - Also used for animation - may want either gsap or aos
Splide - Great carousel

- Create an empty database in phpmyadmin via MAMP / WAMP - Use 'utf8mb4_unicode_ci' as the encoding
- Add a user for that database with full privileges to the newly created database. Use strong passwords.
- Set up your local dev site in MAMP / WAMP - the root directory needs to be the 'public' directory of this repo
- Find the theme directory in this boilerplate - named 'wp-boilerplate' - rename it to something relevant for your project
 
### You now need set up an .env file :

Find the .env.example file - may a copy of this in the root folder. Rename it .env

Within your new env file you need to update the following lines :

The DB_ lines relate the database you created in PHPmyAdmin and the user you also created

```env
DB_HOST=localhost
DB_NAME=database
DB_USER=username
DB_PASSWORD=password
DB_TABLE_PREFIX=wp_
```

You will also need to configure these lines in .env

- Set WP_DEFAULT_THEME to the theme name that you renamed the theme folder to in earlier steps
- THE WP_LOCAL_DEV_PATH is set to the URL that you chose in MAMP / WAMP / XAMMP

```env
WP_DEFAULT_THEME=wp-boilerplate
WP_LOCAL_DEV_PATH=http://wpbptest.local:8888/
```

Also set the SALTS in the .env file using this random generator

https://vinkla.github.io/salts/

## DEV / Build Setup Guidance

 #### There are a few steps you may wish to take to tailor the build to your project :

- Change the theme details in style.css
- Add a different 'screenshot.png'

### USE Branches

Feature branch with GIT - it's a good approach to avoid having to unpick work and 
minimising conflicts in multi developer teams.

### SCSS Setup

- Setup your theme colours in _colors.scss
- Setup your variables in _variables.scss - recommend to use css vars, or scss vars then interpolated into css vars
- Take a look at the heading font sizes in the typography partial
- Take a moment to look at the mixins and functions available - use them as you wish, or add others
- Take a look at the pre-defined spacing vars - choose whether to include that partial  
- Take a look at these variables - I set them to allow for font's / bg images to run in both dev and prod  

Note the use of the @@staticAssetPath alias - this comes from vite.config.js

`$font-path : "@@staticAssetPath/fonts" !default;`
`$image-path : "@@staticAssetPath/images" !default;`

### Static Assets

Fonts and Static Images can be added in /fe-src/static.

Fonts wise - Google's Montserrat is already included, but replace as you wish..

They will be referenced in the css correctly via rollup / node aliases.

You will need to run npm run build to get static assets across into build folder.  

### JS Setup

- A base JS setup is in place for you to use - this has a DOM selector library, tools for debouncing, adding / removing / checking for classes.  

- There are some commonly used scripts in the ui-scripts folder  

- Please take a look through the utility scripts directory and make use of those for consistency.  

- If you need to write new JS, suggest add to the appropriate folder and create a module / function for
each - I try to keep JS modular and with separation of concerns.  

- Functions can be run on either dom ready or load events - defer if not critical for dom ready.  

- There is also a WP specific piece of JS for ajax loading of more posts / content - see loadMorePosts.js. The mark-up in home.php reflects this - if you change the markup in that php file, be sure to check the js dom selectors still operate.  

### Build Tool

Vite is in place to build out and develop with - the config is in vite.config.js - This should not need
to be changed. 

HMR is working for F-E code and any PHP changes you make.


### Wordpress Specifics

The following are installed as plugins :

#### We install in standard plugin directory so that the WP update repo can flag plugin updates

- ACF Pro
- Classic Editor
- Updraft Plus ( for cloning  / WP instance copying)

#### Activate the plugins after install

You will need to add a licence key for ACF Pro if you wish to have pro features within the plugin after install.

Flexible content blocks are generally what I use for projects. I have left this repo as un-opinionated as possible in terms of content.  

There is a sample component named text-block added for your use, and well as some global acf field that I use to clone to other components
You will need to sync the ACF fields once ACF pro is installed to get those.

#### Note the use of the acf-json folder for better performance and version control of ACF work

##### Functions.php

There are some sensible defaults in functions.php including nav menus, custom thumbnails and custom logo.

I also remove a lot of the extra css WP adds for blocks / emojis etc.

SVG upload to media library is supported via a custom function. 

Tiny MCE has the custom colours restricted in a function named override_MCE_options
This is so we can provide a colour picker within a wysiwyg with just brand defined
colours for text. Adjust the $custom_colors var to suit the theme you are working on  ( or remove that function if you need to )

### Theme Conventions

I place components partials in the components folder.  
Static partials are placed in the partials folder.  

### Deployment 

Please read the deployment guide in this REPO - I tend to run a clean install on any prod
servers then just upload  theme, uploads, plugins and mu-plugins. This has broader host support than trying to
maintain the local dev structure.

FE-Assets for deployment - I compile to a dist folder - anything in the static folder is added, as well as a css
file and js file. 

Updraft is a great migration / copying tool - BEST NOT TO MIGRATE OR INCLUDE THE THEME THOUGH - THATS UNDER
SOURCE CONTROL IN YOUR REPO. 

## THAT'S THE LOT - HAPPY BUILDING!










