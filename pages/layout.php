<!DOCTYPE html>
<html>
<head>
	<?php
		$staticDomain = '/dev';
		$page = $_GET['page'].'.php'
	?>
    <meta charset="utf-8">
	<title>搞定</title>
	<meta name="keywords" content="专业人士 商务社交" />
	<meta name="description" content="人和网-全球最大中文商务社交网络。" />
	<script type="text/javascript">
	window.HEALTH = {
		assetsPath : "<?php echo $staticDomain ?>"
	}
	</script>
	<script type="text/javascript" src="<?php echo $staticDomain?>/lib/Qmik-debug.all.js"></script>
	<script type="text/javascript" src="<?php echo $staticDomain?>/config/config.js"></script>
</head>
<body>
	<?php include_once $page ?>
</body>
</html>