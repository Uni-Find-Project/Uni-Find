<?php
include 'db.php'; 

header('Content-Type: application/json');

$q = isset($_GET['query']) ? $_GET['query'] : '';
$searchTerm = "%" . $q . "%";

$sql = "SELECT * FROM items WHERE name LIKE ? OR location LIKE ? OR category LIKE ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $searchTerm, $searchTerm, $searchTerm);
$stmt->execute();
$result = $stmt->get_result();

$items = array();
while ($row = $result->fetch_assoc()) {
    $items[] = array(
        'id' => $row['id'],
        'name' => $row['name'], 
        'type' => $row['type'],
        'location' => $row['location'],
        'date' => $row['item_date'], // Database එකේ ඇති item_date
        'category' => $row['category'],
        'desc' => $row['description'], 
        'img' => isset($row['image']) ? $row['image'] : '' // Database එකේ ඇති image
    );
}

echo json_encode($items);

$stmt->close();
$conn->close();
?>