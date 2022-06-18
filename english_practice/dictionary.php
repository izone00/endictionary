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
    <title>사전</title>
  </head>
  <body>
    <!-- 검색 -->
    <div class="search_bar">
      <form class="write" action="dictionary.php" method="get">
        <input class="searchbox" type="text" name="word" placeholder="write a word" <?php if(!isset($_GET['word'])) {echo "autofocus";}?>>
      </form>
    </div>
    <!-- 조건 -->
    <div class="nav_bar">
      <div class="navbox"><input type="checkbox" class="checkbox" name="">all</div>
      <div class="navbox"><input type="checkbox" class="checkbox" name="">know</div>
      <div class="navbox"><input type="checkbox" class="checkbox" name="">unknown</div>
    </div>
    <!-- 목록 -->
    <div class="word_container">
        <?php
          if(!isset($_GET['word'])){
            $result = mysqli_query($conn,'SELECT * FROM word_dic ORDER BY en_word ASC');
            show_word($result);
          } else {
            $result = mysqli_query($conn,'SELECT * FROM word_dic WHERE en_word="'.$_GET['word'].'"');
            if (mysqli_num_rows($result)){
              show_word($result);
            } else {
              $en=$_GET['word'];
              create_word($conn,$en);
              echo "<div class='list1'>".$en.'</div>
              <div class="list2">
              <form class="new_word_meaning_form" action="update.php" method="get">
                <input type="hidden" name="en" value="'.$en.'">
                <input class="meaning_input_box" type="text" name="kor" placeholder="뜻을 입력하세요" autofocus>
              </form>
              </div>'."
              <div>
              <form action='delete.php' method='get'>
                <input type='hidden' name='en' value='".$en."'>
                <button class='delete_button'><i class='fa-sdsolid fa-x' style=''></i></button>
              </form>
              </div>";
              $result = mysqli_query($conn,'SELECT * FROM word_dic ORDER BY en_word ASC');
              show_word($result);
            }
          }
        ?>
    </div>
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
