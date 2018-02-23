<?php


$conn = mysqli_connect("localhost", "root", "root", "Pressing");
$info = json_decode(file_get_contents("php://input"));
if (count($info) > 0) {
$Designation_Product     = mysqli_real_escape_string($conn, $info->Designation_Product);
$IDPROD     = mysqli_real_escape_string($conn, $info->IDPROD);
$ID_Categorie    = mysqli_real_escape_string($conn, $info->ID_Categorie);
$Prix      = mysqli_real_escape_string($conn, $info->Prix);


echo $Designation_Product;
echo $IDPROD;
echo $ID_Categorie;
echo $Prix;


if($Designation_Product != "" && $ID_Categorie != null && $Prix != null)
{
    $query  ="UPDATE `PRODUIT` SET `DESIGNATION` = '$Designation_Product', `ID_CATEGORIE` = '$ID_Categorie', `PRIX` = '$Prix' WHERE `PRODUIT`.`ID_PRODUIT` = '$IDPROD'";
if (mysqli_query($conn, $query)) {
echo "Data Inserted Successfully...";
} else {
echo 'Failed';
}
}
else if ($Designation_Product != "" && $ID_Categorie != null && $Prix == null  )
{
        $query  ="UPDATE `PRODUIT` SET `DESIGNATION` = '$Designation_Product', `ID_CATEGORIE` = '$ID_Categorie' WHERE `PRODUIT`.`ID_PRODUIT` = '$IDPROD'";
        if (mysqli_query($conn, $query)) {
        echo "Data Inserted Successfully...";
        } else {
        echo 'Failed';
        }
}
else if ($Designation_Product != "" && $Prix != null && $ID_Categorie == null )
{   
    $query  ="UPDATE `PRODUIT` SET `DESIGNATION` = '$Designation_Product', `PRIX` = '$Prix'  WHERE `PRODUIT`.`ID_PRODUIT` = '$IDPROD'";
        if (mysqli_query($conn, $query)) {
        echo "Data Inserted Successfully...";
        } else {
        echo 'Failed';
        }

}
else if ($Prix != null && $ID_Categorie != null && $Designation_Product == "" )
{
   $query  ="UPDATE `PRODUIT` SET `PRIX` = '$PRIX', `ID_CATEGORIE` = '$ID_Categorie'  WHERE `PRODUIT`.`ID_PRODUIT` = '$IDPROD'";
        if (mysqli_query($conn, $query)) {
        echo "Data Inserted Successfully...";
        } else {
        echo 'Failed';
        } 
}
else if ($Prix != null && $ID_Categorie == null && $Designation_Product == "" )
{
   $query  ="UPDATE `PRODUIT` SET `PRIX` = '$Prix'   WHERE `PRODUIT`.`ID_PRODUIT` = '$IDPROD'";
        if (mysqli_query($conn, $query)) {
        echo "Data Inserted Successfully...";
        } else {
        echo 'Failed';
        } 
}
else if ($Prix == null && $ID_Categorie != null && $Designation_Product == "" )
{
   $query  ="UPDATE `PRODUIT` SET  `ID_CATEGORIE` = '$ID_Categorie'  WHERE `PRODUIT`.`ID_PRODUIT` = '$IDPROD'";
        if (mysqli_query($conn, $query)) {
        echo "Data Inserted Successfully...";
        } else {
        echo 'Failed';
        } 
}
else if ($Prix == null && $ID_Categorie == null && $Designation_Product != "" )
{
   $query  ="UPDATE `PRODUIT` SET `DESIGNATION` = '$Designation_Product'   WHERE `PRODUIT`.`ID_PRODUIT` = '$IDPROD'";
        if (mysqli_query($conn, $query)) {
        echo "Data Inserted Successfully...";
        } else {
        echo 'Failed';
        } 
}





}



// $query = "INSERT INTO users(name, email, age) VALUES ('$name', '$email', '$age')";


// $data = json_decode(file_get_contents('php://input'), TRUE);

// if (isset($data['produit'])) {

//     require __DIR__ .'/library.php';

//     $designation = (isset($data['produit']['DESIGNATION']) ? $data['produit']['DESIGNATION'] : NULL);
//     $prix = (isset($data['produit']['PRIX']) ? $data['produit']['PRIX'] : NULL);
//     $categorie = (isset($data['produit']['CATEGORIE']) ? $data['produit']['CATEGORIE'] : NULL);
//     $produit_id = (isset($data['produit']['ID_PRODUIT']) ? $data['produit']['ID_PRODUIT'] : NULL);
//     // echo ' '.$nom.' '.$prenom.' '.$phone.' '.$sexe.' '.$cnss.' '.$ddembauche.' '.$contrat.' '.$poste.' '.$pass.' '. $personnel_id;
//     // validations
//     if ($produit_id == NULL) {
//         http_response_code(400);
//         echo json_encode(['errors' => ["Name Field is required"]]);

//     } else {

//         // Update the Task
//         $produit = new Produit();

//         $produit->Update($designation,$categorie,$prix,$produit_id);
//     }
// }else{
//     echo "Aucune Data";
// }

?>