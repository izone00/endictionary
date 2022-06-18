<?php
  $conn= new mysqli('localhost','root','as898989','dictionary');
  $sql = "UPDATE word_dic SET kor_word='".$_GET['kor']."' WHERE en_word='".$_GET['en']."'";
  mysqli_query($conn,$sql);
  header('Location: dictionary.php');
?>
