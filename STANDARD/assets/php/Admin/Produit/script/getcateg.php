<?php  



// require __DIR__ . '/library.php';

// $produit = new Produit();

// echo $produit->getCat();

//  load_categories.php  
 $connect = mysqli_connect("localhost", "root", "root", "Pressing");  
 $output = array();  
 $query = "SELECT DISTINCT ID_CATEGORIE, DESGINATION_CAT FROM CATEGORIE ";  
 $result = mysqli_query($connect, $query);  
 while($row = mysqli_fetch_array($result))  
 {  
      $output[] = $row;  
 }  
 echo json_encode($output);  
return json_encode(['categories' => $output]);
 ?> 
