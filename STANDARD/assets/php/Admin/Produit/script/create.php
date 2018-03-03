<?php

// $data = json_decode(file_get_contents('php://input'), TRUE);

// if (isset($data['produit'])) {

//     require __DIR__ . '/library.php';

//     $designation = (isset($data['produit']['DESIGNATION']) ? $data['produit']['DESIGNATION'] : NULL);
//     $prix = (isset($data['produit']['PRIX']) ? $data['produit']['PRIX'] : NULL);
//     $categorie = (isset($data['produit']['MyCatg']) ? $data['produit']['MyCatg'] : NULL);
//     // $categorie_name = (isset($data['produit']['DESGINATION_CAT']) ? $data['produit']['DESGINATION_CAT'] : NULL);
    


    
//     // validated the request
//     if ($designation == NULL) {
//         http_response_code(400);
//         echo json_encode(['errors' => ["Name Field is required"]]);

//     } else {
//         // echo 'Myname is  '.$designation.' '.$prix.' '.$categorieid;
//         // Add the produit
//         $produit = new Produit();

//         echo $produit->Create($designation,$categorie,$prix);
        
//     }
// }


$conn = mysqli_connect("localhost", "root", "root", "Pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$Designation_Product     = mysqli_real_escape_string($conn, $info->Designation_Product);
$ID_Categorie    = mysqli_real_escape_string($conn, $info->ID_Categorie);
$Prix      = mysqli_real_escape_string($conn, $info->Prix);
//$btn_name = $info->btnName;

//$query = "INSERT INTO users(name, email, age) VALUES ('$name', '$email', '$age')";
$query  ="INSERT INTO `PRODUIT` (`ID_PRODUIT`, `DESIGNATION`, `ID_CATEGORIE`, `PRIX`, `Image`) VALUES (NULL, '$Designation_Product', '$ID_Categorie', '$Prix', NULL)";
if (mysqli_query($conn, $query)) {
echo "Data Inserted Successfully...";
} else {
echo 'Failed'.mysqli_error($conn);;
}
}


?>