<?php

$data = json_decode(file_get_contents('php://input'), TRUE);
$conn = mysqli_connect("localhost", "root", "root", "pressing");
if (isset($data['categorie'])) {

    require __DIR__ . '/library.php';

    // $categorieid = (isset($data['produit']['ID_CATEGORIE']) ? $data['produit']['ID_CATEGORIE'] : NULL);
    $categorie_name = (isset($data['categorie']['DESGINATION_CAT']) ? $data['categorie']['DESGINATION_CAT'] : NULL);
    


    
    // validated the request
    if ($categorie_name == NULL) {
        http_response_code(400);
        echo json_encode(['errors' => ["Name Field is required"]]);

    } else {
        
        $query = "INSERT INTO categorie(DESGINATION_CAT)  VALUES ('$categorie_name')";
   
        
        // $query->bindParam("categorie", $categorie_name, PDO::PARAM_STR);
        // $query->bindParam("prix", $prix, PDO::PARAM_INT);
        
        if (mysqli_query($conn, $query)) {
            echo 'Bienvenue! Tu t\'es Bien Inscrit  ...';
            }else {
                echo 'Erreur';
            }
        
        // return json_encode(['categorie' => [
        //     'ID_CATEGORIE'          => $this->db->lastInsertId(),
        //     'DESGINATION_CAT'        => $categorie_name
        
        
        // ]]);
        
    }
}
?>