# [GrapesJS Plublish S3]

This enables you to publish rendered html from grapesJs to S3.



## Summary

* Plugin
  * Name: `grapesjs-plugin-publish-s3`
  * Options:
      * accessKeyId: `<AWS Access key Id>`,
      * secretAccessKey: `<Aws secret access key>`,
      * sessionToken: `<AWS Sessions Token>`



## Download

* `npm i grapesjs-plugin-publish-s3`



## Usage

```html
<link href="path/to/grapes.min.css" rel="stylesheet"/>
<link href="path/to/grapesjs-plugin-publish-s3.css" rel="stylesheet"/>

<script src="path/to/grapes.min.js"></script>
<script src="path/to/grapesjs-plugin-publish-s3.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      plugins: ['gjs-plugin-publish-s3'],
      pluginsOpts: {
        'gjs-plugin-publish-s3': {/* ...options */}
      }
  });
</script>
```



## Development

Clone the repository

```sh
$ git clone https://github.com/chaitanya11/grapesjs-plugin-publish-s3.git
$ cd grapesjs-plugin-publish-s3
```

Install it

```sh
$ npm i
```

The plugin relies on GrapesJS via `peerDependencies` so you have to install it manually (without adding it to package.json)

```sh
$ npm i grapesjs --no-save
```

Start the dev server

```sh
$ npm start
```



## License

BSD 3-Clause
