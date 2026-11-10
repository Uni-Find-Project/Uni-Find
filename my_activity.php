<?php
require 'db.php';
session_start();

// පරිශීලකයාගේ ඊමේල් එක ලබා ගැනීම (URL එකෙන් හෝ Session එකෙන්)
$user_email = isset($_GET['email']) ? $_GET['email'] : (isset($_SESSION['user_email']) ? $_SESSION['user_email'] : '');

// 1. Database එකෙන් අදාළ User ගේ Claims ලබා ගැනීම
$claims_list = array();
if (!empty($user_email)) {
    $claims_sql = "SELECT * FROM claims WHERE email = ? ORDER BY id DESC";
    $stmt_claims = $conn->prepare($claims_sql);
    $stmt_claims->bind_param("s", $user_email);
    $stmt_claims->execute();
    $claims_result = $stmt_claims->get_result();
    while ($row = $claims_result->fetch_assoc()) {
        $claims_list[] = $row;
    }
    $stmt_claims->close();
}

// 2. Database එකෙන් අයිතම (Reports / Items) ලබා ගැනීම
$reports_sql = "SELECT * FROM items ORDER BY id DESC";
$reports_result = $conn->query($reports_sql);
$reports_list = array();
if ($reports_result) {
    while ($row = $reports_result->fetch_assoc()) {
        $reports_list[] = $row;
    }
}

$conn->close();
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>My Activity — UniFind</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<header class="topbar">
    <a class="brand" href="index.html#home"><span class="brandmark">◈</span> UniFind</a>
    <nav>
        <a href="index.html#home">Home</a>
        <a href="index.html#browse">Lost & Found</a>
        <a href="index.html#how">How It Works</a>
        <a href="my_activity.php">My Activity</a>
    </nav>
    <div class="navright">
        <a href="index.html#login" id="profileLink">Logout</a>
    </div>
</header>

<main class="container" style="padding-top: 40px; padding-bottom: 40px;">
    <div class="pagehead">
        <h1>My Activity</h1>
        <p>Your reports, claims and campus updates, all in one place.</p>
    </div>

    <div class="activitygrid">
        <!-- My Reports Section -->
        <div>
            <div class="sectionhead">
                <h2>Campus Reports</h2>
                <span class="meta"><?php echo count($reports_list); ?> active</span>
            </div>
            <?php if (count($reports_list) > 0): ?>
                <?php foreach ($reports_list as $rep): ?>
                    <div class="activityitem">
                        <img src="<?php echo !empty($rep['image']) ? $rep['image'] : 'https://placehold.co/100x80/eaf1fb/2459d3?text=Item'; ?>" alt="Item" onerror="this.src='https://placehold.co/100x80/eaf1fb/2459d3?text=Item'">
                        <div>
                            <span class="badge <?php echo strtolower($rep['type']); ?>"><?php echo $rep['type']; ?></span>
                            <h3><?php echo htmlspecialchars($rep['name']); ?></h3>
                            <p><?php echo htmlspecialchars($rep['location']); ?> · <?php echo $rep['item_date']; ?></p>
                            <a class="textlink" href="index.html#item/db_<?php echo $rep['id']; ?>">View report →</a>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p class="meta">No reports found in the database.</p>
            <?php endif; ?>
        </div>

        <!-- Claims Section -->
        <div>
            <div class="sectionhead">
                <h2>My Claims</h2>
                <span class="meta"><?php echo count($claims_list); ?> claims</span>
            </div>
            
            <?php if (count($claims_list) > 0): ?>
                <?php foreach ($claims_list as $clm): ?>
                    <div class="activityitem">
                        <div>◈</div>
                        <div>
                            <h3>Claim for: <?php echo htmlspecialchars($clm['item_name']); ?></h3>
                            <p><b>Identification Details:</b> <?php echo htmlspecialchars($clm['identification_details']); ?></p>
                            <p><b>Lost Location:</b> <?php echo htmlspecialchars($clm['lost_location']); ?></p>
                            <p class="meta">Submitted on: <?php echo $clm['created_at']; ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <div class="notice">
                    <p>You haven't submitted any claims yet, or you need to pass your email in the URL (e.g., <code>my_activity.php?email=your@email.com</code>).</p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</main>

<footer>
    <div>
        <b>◈ UniFind</b>
        <p>Find what you lost. Return what you found.</p>
    </div>
    <div class="footlinks">
        <a href="#">Campus support</a>
        <a href="#">Privacy</a>
        <span>© 2026 UniFind</span>
    </div>
</footer>
</body>
</html>