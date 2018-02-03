<?php 
header('Access-Control-Allow-Origin: *');
// header('Content-Type:application/json');


session_start();


$response= [];
if(count($_POST)>0) {
    $conn = mysqli_connect("localhost", "root", "", "Pressing");
	$result = mysqli_query($conn,"SELECT * FROM CLIENT WHERE CLIENT.TELEPHONE_CLIENT ='" . $_POST["number"] . "' and CLIENT.Password = '". $_POST["pass"]."'");
     $res = mysqli_query($conn,"SELECT * FROM PERSONNEL WHERE PERSONNEL.NOM_PERSONNEL = '" . $_POST["number"] . "' AND PERSONNEL.PASS_PERSO = '". $_POST["pass"]."'");

    if(mysqli_num_rows($result)>0){
    while($row = $result->fetch_assoc()){
         $response['status']= "loggedin";   
         $response['id']=$row['ID_CLIENT'];
        //  $reponse['TELEPHONE_CLIENT']= $row['TELEPHONE_CLIENT'];
         $response['name']=$row['PRENOM_CLIENT'];
         $response['nom'] = $row['NOM_CLIENT'];
         $response['role'] = $row['Role'];
         $response['ID_LOCALISATION'] = $row['ID_LOCALISATION'];
         $response['uniqueid'] = md5(uniqid());
         $_SESSION['uniqueud'] = $response['uniqueid'];

         $response['username']=$row['TELEPHONE_CLIENT'];

        //  $_SESSION['']= $row['TELEPHONE_CLIENT'];
    //      echo "connected";
    // echo $row['ID_CLIENT'];
   
    }
    // echo $message;
    $response['STATUS'] = 'ERROR';
    }
    else if (mysqli_num_rows($result)==0)
    {
        
        while($row = $res->fetch_assoc()){
         $response['status']= "loggedin";   
         $response['id']=$row['ID_PERSONNEL'];
        //  $reponse['TELEPHONE_CLIENT']= $row['TELEPHONE_CLIENT'];
         $response['name']=$row['PRENOM_PERSONNEL'];
         $response['nom'] = $row['NOM_PERSONNEL'];
         $response['role'] = $row['ROLE_PERSONNEL'];
         $response['uniqueid'] = md5(uniqid());
         $_SESSION['uniqueud'] = $response['uniqueid'];

         $response['username']=$row['TELEPHONE_PERSONNEL'];


   
    }
     // echo $message;
    $response['STATUS'] = 'ERROR';  
    }
    }
    
echo json_encode($response);
?>

