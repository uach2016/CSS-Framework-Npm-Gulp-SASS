
# Using the framework

We use the Swig template engine to allow us to modularise html and encourage code reuse. Full documentation on syntax can be [found here](http://node-swig.github.io/swig-templates/docs/)

## Templates

Each template extends from the base document. We then override blocks that been declared in the parent template.

You can use the bootstrap grid here for layout.

All core components are imported in document.html so are available for inclusion in all child templates. Please see `src/templates` for examples.

## Components

Components can be found in `src/components/`. All code and assets unique to a component are stored under a directory with the component name.

The build script takes all static assets (images etc), processes them and move them into the build directory. CSS and JS are referenced via `content.scss` and `content.js` in the root of `src` and bundled.

### Core
Core components can be found in `src/components/core/`. For guidance on core components and the types available, see [Core Components](/docs/components-core.html)

### Custom

**Please read the core component and Swig docs linked above before attempting to create a custom component, as you may not need to create a new html file.**

To create a custom component, create a new directory within `src/components/custom/`, eg. `src/components/custom/mycomponent`. Within this directory create an html file that will contain your custom component. Copy base markup from a core component, or write your own. Like the core components, you should use macros if you have a few custom components to create with minor differences. Macros allow you to pass parameters unique to an component instance, eg. text, images and classnames.

Any custom CSS or JS should be placed in the same directory and referenced from `content.scss` and `content.js`.

#### Styling

We use Sass to modularise our CSS. To import your Sass file from a new component, import it by specifing the relative path in `content.scss` like the following:

    @import "components/custom/example/example";

This framework (like the site itself) follows the [BEM methodology](http://getbem.com/) to allow fully modular layouts. A good explanation of BEM can be found on [CSS Wizardry](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).

We are using the following BEM syntax:

    .block{} // represents the higher level of an abstraction or component.
    .block__element{} // represents a descendent of .block that helps form the .block object.
    .block--modifier{} // represents a different state or version of .block.

If extending a core component, add a modifier class to the component and override, and add extra elements using BEM as necessary. See `/src/components/custom/example/` for reference. 

**IMPORTANT** Under no circumstance override the base css module definitions, ALWAYS apply styles through a modifier class!

#### Images

There is a core image component that will make insertion of images easier. [View details](/docs/components.html#image)

All image urls are by default constructed via a global `imageSrc` attribute specified in `gulpfile.js`. This can be changed to point to cloudimage.io, just insert the appropriate {width} and optionally {height} tags for replacement.

#### Background images

To use responsive background images, first add the `data-responsive-background-image` attribute to the element that you want the background image on. Then add your required `<img>` (with or without lazyload markup or srcset) to the element as the first child. See examples for code samples.

#### Javascript

We use browserify to modularise code. To import JS from new component, require it by specifing the relative path in `content.js` like the following:

    var example = require('./components/custom/example/example');

In the above example, we are reading a function from the required module.

### Legacy code

If your component is no longer needed, make sure you remove or comment out the import and require statements from `content.scss` and `content.js`. This will prevent these files from becoming bloated with redundant code.

## Transfering to live site

Upload the `content.css` and `content.js` found in the `/build/static/` directory to the site, and apply to the content pages.

Then copy the required html from the `build` directory.