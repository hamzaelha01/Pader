<?php

header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost","root","root","Pressing");
$info = json_decode(file_get_contents("php://input"));
$response= [];
$Numero   = mysqli_real_escape_string($conn, $info->Numero);

// echo $Numero;
// $output = array();
// $query  = "SELECT * FROM `COMMANDE`";
$query  ="SELECT * FROM CLIENT WHERE  CLIENT.TELEPHONE_CLIENT = '$Numero'";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {

    while($row = $result->fetch_assoc()){

        $response['status']='exists';
    
    }

}
else
{
        $response['status']='no exists';
}
echo json_encode($response);



?> 

