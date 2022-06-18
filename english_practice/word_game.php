<?php
  $conn= new mysqli('localhost','root','as898989','dictionary');

  function show_word($result){
    while($row = mysqli_fetch_assoc($result)){
      $en=$row['en_word'];
      $kor=$row['kor_word'];
      echo "<div class='list1'><div class='leftborder'>".$en."</div></div><div class='list2'>".$kor."</div><div>
        <form action='delete.php' method='get'>
          <input type='hidden' name='en' value='".$en."'>
          <button class='delete_button'><i class='fa-solid fa-x' style=''></i></button>
        </form>
      </div>";
    }
  }

  function create_word($conn,$en){
    $sql = "INSERT INTO word_dic (en_word, kor_word, score) VALUES ('".$en."','뜻','0')";
    mysqli_query($conn,$sql);
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="dictionary_style.css?6">
    <script src="https://kit.fontawesome.com/f7adf773fa.js" crossorigin="anonymous"></script>
    <title>퀴즈</title>
  </head>
  <body>
    <!-- 제목   -->

    <!-- 목록 -->
    <form class="" action="word_game.php" method="get">
      <div class="word_container">
          <?php
          $num = 1;
            $result = mysqli_query($conn,'SELECT * FROM word_dic ORDER BY RAND() LIMIT 5');
            while($row = mysqli_fetch_assoc($result)){
              $en=$row['en_word'];
              $kor=$row['kor_word'];
              echo "<div class='list1'><div class='leftborder'>".$en."</div></div>
              <div class='list2'>".
              '<input class="meaning_input_box" type="text" name="'.$num.'" placeholder="뜻" >'
              ."</div><div></div>";
              $num = $num + 1;
            }
          ?>
          <input type="submit" name="exem" value="score">
      </div>
    </form>
    <!-- 메뉴 -->
    <div class="menu_bar">
      <div class="menubox">
        <button type="button" class="menu_button"><a href="dictionary.php"><i class="fa-solid fa-book-bookmark"></i></a></button>
      </div>
      <div class="menubox">
        <button type="button" class="menu_button"><a href="index_en.php"><i class="fa-solid fa-q"></i></a></button>
      </div>
      <div class="menubox">
        <button type="button" class="menu_button"><a href="http://www.google.com"><i class="fa-solid fa-bars"></i></a></button>
      </div>
    </div>
  </body>
</html>
