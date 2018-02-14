# WhiteStuff content module framework

This framework forms the basis for all the content modules on whitestuff.com.

## Quick links

- [Component reference](/docs/components.html)
- [Gulp commands](/docs/gulp.html)
- [Usage guidelines](/docs/usage.html)

## Requirements

- `nodejs`. If you do not have nodejs installed, [follow the instructions here](https://docs.npmjs.com/getting-started/installing-node)
- `npm`. Installed along with nodejs
- `gulp` command line interface. From a command prompt run `npm install --global gulp-cli`

## Directory structure

`/build` - is generated on running `gulp`, contains html ready to copy to site

`/docs` - documentation, gets generated into build at runtime

`/src/base/` - shared assets and code

`/src/components/core/` - source code for all the core modules 

`/src/components/custom/` - source code for your custom modules 

`/src/templates/` - master layout templates

## Features

- Sass 
- CommonJS module support via Browserify
- Sourcemapping for easy debugging
- CSS autoprefixing
- SVG sprite symbol generation
- Asset minification
- HTML templating using Swig

## Getting started

Navigate to the project folder on the command line and run `npm install` to download required dependencies.

In the project directory, run:

    gulp

This starts up the development server and allows previewing of the modules in the browser at [http://localhost:3000](http://localhost:3000)

**For a full list of available commands, [see here](/docs/gulp.html)**

## Usage

For usage instruction, see [Usage](/docs/usage.html)


