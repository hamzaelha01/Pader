<?php  
 //load_categories.php  
 $connect = mysqli_connect("localhost", "root", "root", "Pressing");  
 $output = array();  
 $query = "SELECT DISTINCT ID_CATEGORIE FROM produit WHERE categorie not like ''";  
 $result = mysqli_query($connect, $query);  
 while($row = mysqli_fetch_array($result))  
 {  
      $output[] = $row;  
 }  
 echo json_encode($output);  
// return json_encode(['categories' => $output]);
 ?> 