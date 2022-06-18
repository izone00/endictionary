<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style media="screen">
      li {
        font-size: 20px;
        margin: 0 50px;
      }
    </style>
  </head>
  <body>
    <ol>
      <?php
        echo file_get_contents('dictionary_list');
      ?>
    </ol>

  </body>
</html>
