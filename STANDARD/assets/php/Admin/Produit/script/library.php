<?php

require __DIR__ .'/database_connection.php';

/**
 * Class Task
 */
class Produit
{

    /**
     * @var mysqli|PDO|string
     */
    protected $db;

    /**
     * Task constructor.
     */
    public function __construct()
    {
        $this->db = DB();
    }

    /**
     * Add new Task
     *
     * @param $name
     * @param $description
     *
     * @return string
     */
    public function Create($designation,$categorie,$prix)
    {
        $query = $this->db->prepare("INSERT INTO produit( DESIGNATION, ID_CATEGORIE, PRIX) 
         VALUES (:designation,:categorie,:prix)");
   
        $query->bindParam("designation", $designation, PDO::PARAM_STR);
        $query->bindParam("ID_CATEGORIE", $categorie, PDO::PARAM_STR);
        $query->bindParam("prix", $prix, PDO::PARAM_INT);
        
        $query->execute();
        
        return json_encode(['produit' => [
            'ID_PRODUIT'          => $this->db->lastInsertId(),
            'DESIGNATION'        => $designation,
            'ID_CATEGORIE'        => $categorie,
            // 'DESGINATION_CAT'        => $categorie_name,
            'PRIX'        => $prix
        
        ]]);
        
    }

    /**
     * List Tasks
     *
     * @return string
     */
    public function Read()
    {
        
        $query = $this->db->prepare("select produit.ID_PRODUIT,produit.DESIGNATION,produit.PRIX,produit.ID_CATEGORIE from produit");
        $query->execute();
        $data = array();
        
        while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row;
            // $data['produit']['ID_PRODUIT']= $row['ID_PRODUIT'];
            // $data['produit']['DESIGNATION']= $row['DESIGNATION'];
            // $data['produit']['PRIX']= $row['PRIX'];
            // // $data['categorie']['ID_CATEGORIE']= $row['ID_CATEGORIE'];
            // // $data['categorie']['DESGINATION_CAT']= $row['DESGINATION_CAT'];
            // $data['produit']['categorie']['ID_CATEGORIE']= $row['ID_CATEGORIE'];
            // $data['produit']['categorie']['DESGINATION_CAT']= $row['DESGINATION_CAT'];
            // $data['produit'] = $row;

            
            
            
            }

        return json_encode(['produits' => $data]);
        
         
    }


    /**
     * Update Task
     *
     * @param $name
     * @param $description
     * @param $task_id
     */
    public function Update($designation,$categorie,$prix , $produit_id)
    {
        $query = $this->db->prepare("UPDATE produit SET DESIGNATION= :designation,ID_CATEGORIE=:categorie ,PRIX= :prix WHERE ID_PRODUIT = :idproduit ");
    
        $query->bindParam("designation", $designation, PDO::PARAM_STR);
        $query->bindParam("categorie", $categorie, PDO::PARAM_STR);
        $query->bindParam("prix", $prix, PDO::PARAM_INT);
        $query->bindParam("idproduit", $produit_id, PDO::PARAM_INT);
        $query->execute();
    }

    /**
     * Delete Task
     *
     * @param $task_id
     */
    public function Delete($produit_id)
    {
        $query = $this->db->prepare("DELETE FROM produit WHERE ID_PRODUIT =:id");
        $query->bindParam("id", $produit_id, PDO::PARAM_STR);
        $query->execute();
    }
}