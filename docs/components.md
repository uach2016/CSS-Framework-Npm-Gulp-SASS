# Components

## Box

This is the most flexable component, and forms the basis for most core components.

### Usage:

    box.base(<options>)

### Options:

**title**

* Type: `String`
* Default: `'This is a box module'`

Heading text

**btnText**

* Type: `String`
* Default: `'Shop category'`

Button text.

**modifier**

* Type: `String`
* Default: `null`

Modifier class(es) that will be applied to component.

**video**

* Type: `Object`
* Default: `null`

Video options:
* `src` (String) - Path to video.
* `useIframe` (Boolean) - embed via iframe (default is video tag)

**image**

* Type: `Object`
* Default: `{}`

Image options, see image component for details.

---

## Large

Portrait box.

### Usage:

    box.large(<options>)

### Options:

**title**

* Type: `String`
* Default: `'This is a box module'`

Heading text

**btnText**

* Type: `String`
* Default: `'Shop category'`

Button text.

**imageSrc**

* Type: `String`
* Default: `http://via.placeholder.com/{width}x{height}`

Image url, `{width}` and `{height}` are replaced dynamically using the prespecified srcset.

**imageAlt**

* Type: `String`
* Default: `null`

Image alternative text.

### Image srcset sizes

    [
        { "width": 355, "height": 386 },
        { "width": 465, "height": 506 },
        { "width": 580, "height": 630 },
        { "width": 752, "height": 818 }
    ]

---

## Large Wide

Landscape box that fills container width.

### Usage:

    box.largeWide(<options>)

### Options:

Same as Large component, along with the following:

**video**

* Type: `Object`
* Default: `null`

Enables video background, see base box component for reference.

### Image srcset sizes

    [
        { "width": 720, "height": 387 },
        { "width": 940, "height": 505 },
        { "width": 1170, "height": 629 }
    ]

---

## Offset Primary

Landscape box that goes edge to edge in browser.

### Usage:

    box.offsetPrimary(<options>)

### Options:

Same as Large component, along with the following:

**video**

* Type: `Object`
* Default: `null`

Enables video background, see base box component for reference.

### Image srcset sizes

    [
        { "width": 480, "height": 244 },
        { "width": 768, "height": 390 },
        { "width": 1024, "height": 520 },
        { "width": 1280, "height": 650 },
        { "width": 1440, "height": 731 },
        { "width": 1600, "height": 813 },
        { "width": 1920, "height": 975 }
    ]

---

## Large Wide Offset

Landscape box that fills container width, with text offset left.

### Usage:

    box.offsetLarge(<options>)

### Options:

Same as Large component, along with the following:

**video**

* Type: `Object`
* Default: `null`

Enables video background, see base box component for reference.

### Image srcset sizes

    [
        { "width": 720, "height": 387 },
        { "width": 940, "height": 505 },
        { "width": 1170, "height": 629 }
    ]

---

## Inset

Box inset on all edges, with vertical title.

### Usage:

    box.inset(<options>)

### Options:

Same as Large component.

### Image srcset sizes

    [
        { "width": 366, "height": 332 },
        { "width": 468, "height": 424 },
        { "width": 767, "height": 695 }
    ]

---

## Inset Alternative

Box inset on horizontal edges only, with vertical title.

### Usage:

    box.insetAlt(<options>)

### Options:

Same as Large component.

---

## Stacked

Image stacked above title (optional) and button.

### Usage:

    stacked.base(<options>)

### Options:

**title**

* Type: `String`
* Default: `null`

Optional heading text

**btnText**

* Type: `String`
* Default: `'Shop category'`

Button text.

**imageSrc**

* Type: `String`
* Default: `http://via.placeholder.com/{width}x{height}`

Image url, `{width}` and `{height}` are replaced dynamically using the prespecified srcset.

**imageAlt**

* Type: `String`
* Default: `null`

Image alternative text.

**modifier**

* Type: `String`
* Default: `null`

Modifier class(es) that will be applied to component.

### Image srcset sizes

    [
        { "width": 366, "height": 414 },
        { "width": 468, "height": 535 },
        { "width": 767, "height": 877 }
    ]

---

## Banner

Generates a letterbox banner image, with different dimensions on mobile.

### Usage:

    banner.base(<options>)

### Options:

**src**

* Type: `String`
* Default: `http://via.placeholder.com/{width}x{height}`

Image url, `{width}` and `{height}` are replaced dynamically using the prespecified srcset.

#### mobileSrc

* Type: `String`
* Default: `'http://via.placeholder.com/767x767'`

Mobile image needs to be 767x767 pixels square.

**altText**

* Type: `String`
* Default: `null`

Image alternative text.

**modifier**

* Type: `String`
* Default: `null`

Modifier class(es) that will be applied to component.

---

## Image

Generates responsive image code.

### Usage:

    img.responsive(<options>)

### Options:

**src**

* Type: `String`
* Default: `http://via.placeholder.com/{width}x{height}`

Required image url, `{width}` and `{height}` are replaced dynamically using the prespecified srcset. If specified, will override the global imageSrc attribute.

**sizes**

* Type: `String`
* Default: `auto`

Value of sizes attribute. Can be left as auto unless lazyload is disabled.

**srcset**

* Type: `Array`
* Default:

        [
            { "width": 355, "height": 355 },
            { "width": 465, "height": 465 },
            { "width": 580, "height": 580 },
            { "width": 752, "height": 752 }
        ]

These sizes are combined with `src` to generate the required string.

**altText**

* Type: `String`
* Default: `null`

Image alternative text.

**classname**

* Type: `String`
* Default: `null`

Class name to add to image.

**lazyload**

* Type: `Boolean`
* Default: `true`

Whether to lazyload the image or not.