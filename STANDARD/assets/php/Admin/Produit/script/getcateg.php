<?php  
header('Access-Control-Allow-Origin: *');

 //load_categories.php  
 $connect = mysqli_connect("localhost", "root", "root", "Pressing");  
 $output = array();  
 $query = "SELECT * FROM CATEGORIE ";  
 $result = mysqli_query($connect, $query);  
 while($row = mysqli_fetch_array($result))  
 {  
      $output[] = $row;  
 }  
 echo json_encode($output);  
// return json_encode(['categories' => $output]);
 ?> 
