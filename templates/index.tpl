<!DOCTYPE html>
<html {% if(o.htmlWebpackPlugin.files.manifest) { %} manifest="{%= o.htmlWebpackPlugin.files.manifest %}" {% } %} lang="{%= o.htmlWebpackPlugin.options.lang %}">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{%= o.htmlWebpackPlugin.options.description %}">
    <link rel="apple-touch-icon" href="">
    <link rel="shortcut icon" href="{% if (o.htmlWebpackPlugin.files.favicon) { %}{%= o.htmlWebpackPlugin.files.favicon %}{% } %}">
    {% for (var css in o.htmlWebpackPlugin.files.css) { %}
    <link rel="stylesheet" href="{%= o.htmlWebpackPlugin.files.css[css] %}">
    {% } %}
    <title>{%= o.htmlWebpackPlugin.options.title %}</title>
  </head>
  <body>
    <div id="app"></div>
    {% for (var chunk in o.htmlWebpackPlugin.files.chunks) { %}
    <script src="{%= o.htmlWebpackPlugin.files.chunks[chunk].entry %}"></script>
    {% } %}
  </body>
</html>