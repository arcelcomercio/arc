<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script type="text/javascript">
        var queryString = window.location.search
        var url = '<?php echo $_GET['source']?>'
//        var url = queryString.split('source=')[1]
        var audio = document.createElement('audio')
        audio.setAttribute('controls', true)
        var source = document.createElement('source')
        source.setAttribute('src', url)
        source.setAttribute('type', 'audio/mpeg')
        audio.appendChild(source)
        document.querySelector('body').appendChild(audio)
    </script>
</body>
</html>