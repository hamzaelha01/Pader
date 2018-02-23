<?php
try {
	//Connect to the Database
	$dbo = new PDO('mysql:host=localhost;dbname=pressing', 'root', 'root');
	$dbo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$dbo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

	//Set up the queries
	// $areaSQL = "SELECT produit.ID_PRODUIT ,produit.DESIGNATION,produit.PRIX,produit.ID_CATEGORIE from produit";
	// $plotSQL = "SELECT categorie.ID_CATEGORIE , categorie.DESGINATION_CAT from categorie where categorie.ID_CATEGORIE = :catID";
	
	// //Prepare the Plots query (using named parameters)
	// $plotData = $dbo->prepare($plotSQL);
	
	// //prepare some storage for the data
	// $data = array();
	$myquery = "SELECT PRODUIT.ID_PRODUIT,PRODUIT.DESIGNATION,PRODUIT.PRIX,CATEGORIE.ID_CATEGORIE,CATEGORIE.DESGINATION_CAT
	FROM PRODUIT,CATEGORIE
	WHERE PRODUIT.ID_CATEGORIE=CATEGORIE.ID_CATEGORIE";
	$results       = $dbo->query($myquery);
	// $myquery->execute();
	// $results = $dbo->fetchAll($myquery);
	$list = $results->fetchAll();
	// $data = array();
	// foreach($list as $row) {
	// 	foreach($row['produits'] as $k) {
	// 		  echo $k['categories']['ID_CATEGORIE'];
	// 		  echo $k['categories']['DESGINATION_CAT'];
	// 	}
 	// }


	//loop through the area records
	// foreach ($dbo->query($areaSQL) as $row):
	// 	//get the plots for this area
	// 	$plotData->execute(array('catID' => $row->ID_CATEGORIE));
	// 	$plotInfo = $plotData->fetchAll(PDO::FETCH_ASSOC);

		
	// 	//add the info to the data array
	// 	$data['produit'] = array(
    //         'ID_PRODUIT' => $row->ID_PRODUIT,
    //         'DESIGNATION'=> $row->DESIGNATION,
    //         'PRIX' => $row->PRIX,
	// 		'categorie' => $plotInfo
	// 	);
	// endforeach;

	//output the whole lot as JSON
	echo json_encode(array('success' => $list));

} catch (PDOException $e) {
    print "Error: " . $e->getMessage();
}
?>