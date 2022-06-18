<?php
  $conn = new mysqli('localhost','root','as898989','dictionary');
  $sql = "DELETE FROM word_dic WHERE en_word='".$_GET['en']."'";
  mysqli_query($conn,$sql);
  header('Location: dictionary.php');
?>
