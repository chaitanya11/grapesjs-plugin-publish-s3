import grapesjs from 'grapesjs';
import S3 from 'aws-sdk/clients/s3';
import AWS from 'aws-sdk';


export default grapesjs.plugins.add('gjs-plugin-publish-s3', (editor, opts = {}) => {
  let c = opts;
  let config = editor.getConfig();
  let pfx = config.stylePrefix || '';
  let panelManager = editor.Panels;
  const htmlContentType = "text/html";
  const cssContentType = "text/css";

  let defaults = {

    // Custom button element which triggers s3 modal
    btnEl: '',

    // Text for the button in case the custom one is not provided
    btnText: 'Publish',
    bucketName: '',
    prefix: '',
    accessKeyId: undefined,
    secretAccessKey: undefined,
    sessionToken: undefined,

    icon: 'fa fa-paper-plane',

    preHtml: '<!doctype html><html lang="en"><head><meta charset="utf-8"><link rel="stylesheet" href="./css/style.css"></head><body>',
    postHtml: '</body><html>',
    preCss: '',
    postCss: ''
  };

  if ([c.secretAccessKey, c.accessKeyId, c.sessionToken].some(
    (configuration) => (configuration == undefined) | (configuration == null))
  ) {
    console.log('coming');
    throw new Error('Aws configuration is missing');
  }

  if (!c.bucketName) {
    c.bucketName = "bodylesscms";
  }

  if (!c.prefix) {
    c.prefix = "";
  }

  // Load defaults
  for (let name in defaults) {
    if (!(name in c))
      c[name] = defaults[name];
  }


  AWS.config.update({
    accessKeyId: c.accessKeyId,
    secretAccessKey: c.secretAccessKey,
    sessionToken: c.sessionToken
  });

  var newButton = panelManager.addButton('options', {
    id: c.btnText,
    className: c.icon,
    command: 'publishToS3',
    attributes: { title: c.btnText },
    active: false,
  });

  editor.Commands.add('publishToS3', {
    run: (editor, sender) => {
      // get html and css
      const htmlFileBody = c.preHtml + editor.getHtml() + c.postHtml;
      const styleFileBody = c.preCss + editor.getCss() + c.postCss;

      // upload to s3
      const s3 = new S3();
      [{
        body: htmlFileBody,
        key: 'index.html',
        mimeType: htmlContentType
      },
      {
        body: styleFileBody,
        key: 'style.css',
        mimeType: cssContentType
      }].forEach(file => {
        const s3Params = {
          Bucket: c.bucketName,
          Body: file.body,
          Key: file.key,
          ContentType: file.mimeType
        };

        s3.putObject(s3Params, (err, data) => {
          if (err) {
            console.error(err);
            throw new Error(err);
          } else {
            console.log(data);
          }
        });
      });

      // trigger stop command
      let command = editor.Commands.get('publishToS3');
      command.stop();
    },
    stop: (editor, sender) => {
      // TODO cleanup
      console.log('cleaning up');
      newButton.set('active', false);
    }
  });

});
