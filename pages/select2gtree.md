---
layout: empty
permalink: /select2gtree/
title: "Select2 Google Tree"
show_meta: false
published: true
description: "Select2 Google Style Tree"
comments: false
mathjax: false
noindex: false
sitemap:
    priorit: 0.5
    changefreq: 'monthly'
    lastmod: 2016-02-13
tags:
  - "select2 google tree"
  - "select2 tree"
---
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="favicon.ico">

    <title>Select2 Google Style Tree</title>

    <!-- Bootstrap core CSS -->
    <link href="/public/vendor/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="/public/vendor/bootstrap/3.3.7/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="/public/vendor/bootstrap/3.3.7/css/jumbotron.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="/public/vendor/bootstrap/3.3.7/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!--<script src="/public/vendor/jquery/js/1.12.4/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js//public/vendor/jquery.min.js"><\/script>')</script>
    <script src="/public/vendor/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    -->
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="/public/vendor/bootstrap/3.3.7/js/ie10-viewport-bug-workaround.js"></script>

    <!-- Select2 Tree View Components
    ================================================== -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2-bootstrap-theme/0.1.0-beta.6/select2-bootstrap.min.css" rel="stylesheet" />
    <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>-->
    <script src="/public/vendor/select2gtree/js/select2/4.0.3/select2.js"></script>
    <script src="/public/vendor/select2gtree/js/select2/4.0.3/i18n/en.js"></script>
    <script src="/public/vendor/select2gtree/js/select2gtree.js"></script>
    <!--<script src="assets/js/select2gtree.js"></script>-->

    <!-- highlight.js code highlighting
    ================================================== -->
    <link rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
    <link href="/public/vendor/highlight.js/css/atelier-forest-light.css" rel="stylesheet" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>


  </head>

  <body>

<script>
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
</script>
<!--
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <form class="navbar-form navbar-right">
            <div class="form-group">
              <input type="text" placeholder="Email" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" class="form-control">
            </div>
            <button type="submit" class="btn btn-success">Sign in</button>
          </form>
        </div>
      </div>
    </nav>
-->

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container">
        <h1>Select2 Google Tree</h1>
        <p>This is a jquery plugin which complements select2 by providing a tree view inspired by google drive. Basically the navigation window that pops up when you move a document.</p>
        <p><a class="btn btn-primary btn-lg" href="https://github.com/charljmert/select2gtree" role="button">Checkout Source on Github &raquo;</a></p>
      </div>
    </div>

    <div class="container">
      <!-- Example row of columns -->
      <div class="row">
        <div class="col-md-4">
      <div class="form-group" id="timezone-group" style="margin-bottom: 5px;">
        <div class="col-sm-12 col-md-12 col-lg-12">
          <h2>Default Tree</h2>
          <p>
<pre><code class="javascript">$("#timezone1").select2gtree();


</code></pre>
          </p>
          <p>
<select id='timezone1' class='select2-gtree1' style="width:100%" name="timezone1">

    <option value='1' parent='0' selected> Africa </option>
    <option value='2' parent='0'> America </option>
    <option value='3' parent='0'> Antarctica </option>
    <option value='4' parent='0'> Arctic </option>
    <option value='5' parent='0'> Asia </option>
    <option value='6' parent='0'> Atlantic </option>
    <option value='7' parent='0'> Australia </option>
    <option value='8' parent='0'> Europe </option>
    <option value='9' parent='0'> Indian </option>
    <option value='10' parent='0'> Pacific </option>
    <option value='11' parent='0'> Others </option>

    <option value='12' parent='1'>Abidjan</option>
    <option value='13' parent='1'>Accra</option>
    <option value='14' parent='1'>Addis_Ababa</option>
    <option value='15' parent='1'>Algiers</option>
    <option value='16' parent='1'>Asmara</option>
    <option value='17' parent='1'>Bamako</option>
    <option value='18' parent='1'>Bangui</option>
    <option value='19' parent='1'>Banjul</option>
    <option value='20' parent='1'>Bissau</option>
    <option value='21' parent='1'>Blantyre</option>
    <option value='22' parent='1'>Brazzaville</option>
    <option value='23' parent='1'>Bujumbura</option>
    <option value='24' parent='1'>Cairo</option>
    <option value='25' parent='1'>Casablanca</option>
    <option value='26' parent='1'>Ceuta</option>
    <option value='27' parent='1'>Conakry</option>
    <option value='28' parent='1'>Dakar</option>
    <option value='29' parent='1'>Dar_es_Salaam</option>
    <option value='30' parent='1'>Djibouti</option>
    <option value='31' parent='1'>Douala</option>
    <option value='32' parent='1'>El_Aaiun</option>
    <option value='33' parent='1'>Freetown</option>
    <option value='34' parent='1'>Gaborone</option>
    <option value='35' parent='1'>Harare</option>
    <option value='36' parent='1'>Johannesburg</option>
    <option value='37' parent='1'>Juba</option>
    <option value='38' parent='1'>Kampala</option>
    <option value='39' parent='1'>Khartoum</option>
    <option value='40' parent='1'>Kigali</option>
    <option value='41' parent='1'>Kinshasa</option>
    <option value='42' parent='1'>Lagos</option>
    <option value='43' parent='1'>Libreville</option>
    <option value='44' parent='1'>Lome</option>
    <option value='45' parent='1'>Luanda</option>
    <option value='46' parent='1'>Lubumbashi</option>
    <option value='47' parent='1'>Lusaka</option>
    <option value='48' parent='1'>Malabo</option>
    <option value='49' parent='1'>Maputo</option>
    <option value='50' parent='1'>Maseru</option>
    <option value='51' parent='1'>Mbabane</option>
    <option value='52' parent='1'>Mogadishu</option>
    <option value='53' parent='1'>Monrovia</option>
    <option value='54' parent='1'>Nairobi</option>
    <option value='55' parent='1'>Ndjamena</option>
    <option value='56' parent='1'>Niamey</option>
    <option value='57' parent='1'>Nouakchott</option>
    <option value='58' parent='1'>Ouagadougou</option>
    <option value='59' parent='1'>Porto-Novo</option>
    <option value='60' parent='1'>Sao_Tome</option>
    <option value='61' parent='1'>Tripoli</option>
    <option value='62' parent='1'>Tunis</option>
    <option value='63' parent='1'>Windhoek</option>


    <option value='64' parent='2'>Adak</option>
    <option value='65' parent='2'>Anchorage</option>
    <option value='66' parent='2'>Anguilla</option>
    <option value='67' parent='2'>Antigua</option>
    <option value='68' parent='2'>Araguaina</option>
    <option value='69' parent='2'>Argentina</option>
    <option value='81' parent='2'>Aruba</option>
    <option value='82' parent='2'>Asuncion</option>
    <option value='83' parent='2'>Atikokan</option>
    <option value='84' parent='2'>Bahia</option>
    <option value='85' parent='2'>Bahia_Banderas</option>
    <option value='86' parent='2'>Barbados</option>
    <option value='87' parent='2'>Belem</option>
    <option value='88' parent='2'>Belize</option>
    <option value='89' parent='2'>Blanc-Sablon</option>
    <option value='90' parent='2'>Boa_Vista</option>
    <option value='91' parent='2'>Bogota</option>
    <option value='92' parent='2'>Boise</option>
    <option value='93' parent='2'>Cambridge_Bay</option>
    <option value='94' parent='2'>Campo_Grande</option>
    <option value='95' parent='2'>Cancun</option>
    <option value='96' parent='2'>Caracas</option>
    <option value='97' parent='2'>Cayenne</option>
    <option value='98' parent='2'>Cayman</option>
    <option value='99' parent='2'>Chicago</option>
    <option value='100' parent='2'>Chihuahua</option>
    <option value='101' parent='2'>Costa_Rica</option>
    <option value='102' parent='2'>Creston</option>
    <option value='103' parent='2'>Cuiaba</option>
    <option value='104' parent='2'>Curacao</option>
    <option value='105' parent='2'>Danmarkshavn</option>
    <option value='106' parent='2'>Dawson</option>
    <option value='107' parent='2'>Dawson_Creek</option>
    <option value='108' parent='2'>Denver</option>
    <option value='109' parent='2'>Detroit</option>
    <option value='2110' parent='2'>Dominica</option>
    <option value='2121' parent='2'>Edmonton</option>
    <option value='2132' parent='2'>Eirunepe</option>
    <option value='2143' parent='2'>El_Salvador</option>
    <option value='2154' parent='2'>Fort_Nelson</option>
    <option value='2165' parent='2'>Fortaleza</option>
    <option value='2176' parent='2'>Glace_Bay</option>
    <option value='2187' parent='2'>Godthab</option>
    <option value='2198' parent='2'>Goose_Bay</option>
    <option value='2209' parent='2'>Grand_Turk</option>
    <option value='120' parent='2'>Grenada</option>
    <option value='121' parent='2'>Guadeloupe</option>
    <option value='122' parent='2'>Guatemala</option>
    <option value='123' parent='2'>Guayaquil</option>
    <option value='124' parent='2'>Guyana</option>
    <option value='125' parent='2'>Halifax</option>
    <option value='126' parent='2'>Havana</option>
    <option value='127' parent='2'>Hermosillo</option>
    <option value='128' parent='2'>Indiana</option>
    <option value='136' parent='2'>Inuvik</option>
    <option value='137' parent='2'>Iqaluit</option>
    <option value='138' parent='2'>Jamaica</option>
    <option value='139' parent='2'>Juneau</option>
    <option value='140' parent='2'>Kentucky</option>
    <option value='142' parent='2'>Kralendijk</option>
    <option value='143' parent='2'>La_Paz</option>
    <option value='144' parent='2'>Lima</option>
    <option value='145' parent='2'>Los_Angeles</option>
    <option value='146' parent='2'>Lower_Princes</option>
    <option value='147' parent='2'>Maceio</option>
    <option value='148' parent='2'>Managua</option>
    <option value='149' parent='2'>Manaus</option>
    <option value='150' parent='2'>Marigot</option>
    <option value='151' parent='2'>Martinique</option>
    <option value='152' parent='2'>Matamoros</option>
    <option value='153' parent='2'>Mazatlan</option>
    <option value='154' parent='2'>Menominee</option>
    <option value='155' parent='2'>Merida</option>
    <option value='156' parent='2'>Metlakatla</option>
    <option value='157' parent='2'>Mexico_City</option>
    <option value='158' parent='2'>Miquelon</option>
    <option value='159' parent='2'>Moncton</option>
    <option value='160' parent='2'>Monterrey</option>
    <option value='161' parent='2'>Montevideo</option>
    <option value='162' parent='2'>Montserrat</option>
    <option value='163' parent='2'>Nassau</option>
    <option value='164' parent='2'>New_York</option>
    <option value='165' parent='2'>Nipigon</option>
    <option value='166' parent='2'>Nome</option>
    <option value='167' parent='2'>Noronha</option>
    <option value='168' parent='2'>North_Dakota/Beulah</option>
    <option value='169' parent='2'>North_Dakota/Center</option>
    <option value='170' parent='2'>North_Dakota/New_Salem</option>
    <option value='171' parent='2'>Ojinaga</option>
    <option value='172' parent='2'>Panama</option>
    <option value='173' parent='2'>Pangnirtung</option>
    <option value='174' parent='2'>Paramaribo</option>
    <option value='175' parent='2'>Phoenix</option>
    <option value='176' parent='2'>Port-au-Prince</option>
    <option value='177' parent='2'>Port_of_Spain</option>
    <option value='178' parent='2'>Porto_Velho</option>
    <option value='179' parent='2'>Puerto_Rico</option>
    <option value='180' parent='2'>Punta_Arenas</option>
    <option value='181' parent='2'>Rainy_River</option>
    <option value='182' parent='2'>Rankin_Inlet</option>
    <option value='183' parent='2'>Recife</option>
    <option value='184' parent='2'>Regina</option>
    <option value='185' parent='2'>Resolute</option>
    <option value='186' parent='2'>Rio_Branco</option>
    <option value='187' parent='2'>Santarem</option>
    <option value='188' parent='2'>Santiago</option>
    <option value='189' parent='2'>Santo_Domingo</option>
    <option value='190' parent='2'>Sao_Paulo</option>
    <option value='191' parent='2'>Scoresbysund</option>
    <option value='192' parent='2'>Sitka</option>
    <option value='193' parent='2'>St_Barthelemy</option>
    <option value='194' parent='2'>St_Johns</option>
    <option value='195' parent='2'>St_Kitts</option>
    <option value='196' parent='2'>St_Lucia</option>
    <option value='197' parent='2'>St_Thomas</option>
    <option value='198' parent='2'>St_Vincent</option>
    <option value='199' parent='2'>Swift_Current</option>
    <option value='200' parent='2'>Tegucigalpa</option>
    <option value='201' parent='2'>Thule</option>
    <option value='202' parent='2'>Thunder_Bay</option>
    <option value='203' parent='2'>Tijuana</option>
    <option value='204' parent='2'>Toronto</option>
    <option value='205' parent='2'>Tortola</option>
    <option value='206' parent='2'>Vancouver</option>
    <option value='207' parent='2'>Whitehorse</option>
    <option value='208' parent='2'>Winnipeg</option>
    <option value='209' parent='2'>Yakutat</option>
    <option value='210' parent='2'>Yellowknife</option>


    <option value='221' parent='3'>Casey</option>
    <option value='222' parent='3'>Davis</option>
    <option value='223' parent='3'>DumontDUrville</option>
    <option value='224' parent='3'>Macquarie</option>
    <option value='225' parent='3'>Mawson</option>
    <option value='226' parent='3'>McMurdo</option>
    <option value='227' parent='3'>Palmer</option>
    <option value='228' parent='3'>Rothera</option>
    <option value='229' parent='3'>Syowa</option>
    <option value='230' parent='3'>Troll</option>
    <option value='231' parent='3'>Vostok</option>

    <option value='232' parent='69'>Buenos_Aires</option>
    <option value='233' parent='69'>Catamarca</option>
    <option value='234' parent='69'>Cordoba</option>
    <option value='235' parent='69'>Jujuy</option>
    <option value='236' parent='69'>La_Rioja</option>
    <option value='237' parent='69'>Mendoza</option>
    <option value='238' parent='69'>Rio_Gallegos</option>
    <option value='239' parent='69'>Salta</option>
    <option value='240' parent='69'>San_Juan</option>
    <option value='241' parent='69'>San_Luis</option>
    <option value='242' parent='69'>Tucuman</option>
    <option value='243' parent='69'>Ushuaia</option>

    <option value='244' parent='128'>Indianapolis</option>
    <option value='245' parent='128'>Knox</option>
    <option value='246' parent='128'>Marengo</option>
    <option value='247' parent='128'>Petersburg</option>
    <option value='248' parent='128'>Tell_City</option>
    <option value='249' parent='128'>Vevay</option>
    <option value='250' parent='128'>Vincennes</option>
    <option value='251' parent='128'>Winamac</option>

    <option value='252' parent='140'>Louisville</option>
    <option value='253' parent='140'>Monticello</option>

</select>

          </p>
        </div>
      </div>

<br/>
        <script type="text/javascript">
            $(".select2-gtree1").select2gtree({
                showUseButton: true
            });
        </script>

        </div>
        <div class="col-md-4">
      <div class="form-group" id="timezone2-group" style="margin-bottom: 5px;">
        <div class="col-sm-12 col-md-12 col-lg-12">
          <h2>Without "Use" Button</h2>
          <p>
<pre><code class="javascript">$("#timezone2").select2gtree({
    showUseButton: false
});</code></pre>
          </p>
          <p>

<select id='timezone2' class='select2-gtree2' style="width:100%" name="timezone2">

    <option value='1' parent='0'> Africa </option>
    <option value='2' parent='0'> America </option>
    <option value='3' parent='0'> Antarctica </option>
    <option value='4' parent='0'> Arctic </option>
    <option value='5' parent='0'> Asia </option>
    <option value='6' parent='0'> Atlantic </option>
    <option value='7' parent='0' selected> Australia </option>
    <option value='8' parent='0'> Europe </option>
    <option value='9' parent='0'> Indian </option>
    <option value='10' parent='0'> Pacific </option>
    <option value='11' parent='0'> Others </option>

    <option value='12' parent='1'>Abidjan</option>
    <option value='13' parent='1'>Accra</option>
    <option value='14' parent='1'>Addis_Ababa</option>
    <option value='15' parent='1'>Algiers</option>
    <option value='16' parent='1'>Asmara</option>
    <option value='17' parent='1'>Bamako</option>
    <option value='18' parent='1'>Bangui</option>
    <option value='19' parent='1'>Banjul</option>
    <option value='20' parent='1'>Bissau</option>
    <option value='21' parent='1'>Blantyre</option>
    <option value='22' parent='1'>Brazzaville</option>
    <option value='23' parent='1'>Bujumbura</option>
    <option value='24' parent='1'>Cairo</option>
    <option value='25' parent='1'>Casablanca</option>
    <option value='26' parent='1'>Ceuta</option>
    <option value='27' parent='1'>Conakry</option>
    <option value='28' parent='1'>Dakar</option>
    <option value='29' parent='1'>Dar_es_Salaam</option>
    <option value='30' parent='1'>Djibouti</option>
    <option value='31' parent='1'>Douala</option>
    <option value='32' parent='1'>El_Aaiun</option>
    <option value='33' parent='1'>Freetown</option>
    <option value='34' parent='1'>Gaborone</option>
    <option value='35' parent='1'>Harare</option>
    <option value='36' parent='1'>Johannesburg</option>
    <option value='37' parent='1'>Juba</option>
    <option value='38' parent='1'>Kampala</option>
    <option value='39' parent='1'>Khartoum</option>
    <option value='40' parent='1'>Kigali</option>
    <option value='41' parent='1'>Kinshasa</option>
    <option value='42' parent='1'>Lagos</option>
    <option value='43' parent='1'>Libreville</option>
    <option value='44' parent='1'>Lome</option>
    <option value='45' parent='1'>Luanda</option>
    <option value='46' parent='1'>Lubumbashi</option>
    <option value='47' parent='1'>Lusaka</option>
    <option value='48' parent='1'>Malabo</option>
    <option value='49' parent='1'>Maputo</option>
    <option value='50' parent='1'>Maseru</option>
    <option value='51' parent='1'>Mbabane</option>
    <option value='52' parent='1'>Mogadishu</option>
    <option value='53' parent='1'>Monrovia</option>
    <option value='54' parent='1'>Nairobi</option>
    <option value='55' parent='1'>Ndjamena</option>
    <option value='56' parent='1'>Niamey</option>
    <option value='57' parent='1'>Nouakchott</option>
    <option value='58' parent='1'>Ouagadougou</option>
    <option value='59' parent='1'>Porto-Novo</option>
    <option value='60' parent='1'>Sao_Tome</option>
    <option value='61' parent='1'>Tripoli</option>
    <option value='62' parent='1'>Tunis</option>
    <option value='63' parent='1'>Windhoek</option>


    <option value='64' parent='2'>Adak</option>
    <option value='65' parent='2'>Anchorage</option>
    <option value='66' parent='2'>Anguilla</option>
    <option value='67' parent='2'>Antigua</option>
    <option value='68' parent='2'>Araguaina</option>
    <option value='69' parent='2'>Argentina</option>
    <option value='81' parent='2'>Aruba</option>
    <option value='82' parent='2'>Asuncion</option>
    <option value='83' parent='2'>Atikokan</option>
    <option value='84' parent='2'>Bahia</option>
    <option value='85' parent='2'>Bahia_Banderas</option>
    <option value='86' parent='2'>Barbados</option>
    <option value='87' parent='2'>Belem</option>
    <option value='88' parent='2'>Belize</option>
    <option value='89' parent='2'>Blanc-Sablon</option>
    <option value='90' parent='2'>Boa_Vista</option>
    <option value='91' parent='2'>Bogota</option>
    <option value='92' parent='2'>Boise</option>
    <option value='93' parent='2'>Cambridge_Bay</option>
    <option value='94' parent='2'>Campo_Grande</option>
    <option value='95' parent='2'>Cancun</option>
    <option value='96' parent='2'>Caracas</option>
    <option value='97' parent='2'>Cayenne</option>
    <option value='98' parent='2'>Cayman</option>
    <option value='99' parent='2'>Chicago</option>
    <option value='100' parent='2'>Chihuahua</option>
    <option value='101' parent='2'>Costa_Rica</option>
    <option value='102' parent='2'>Creston</option>
    <option value='103' parent='2'>Cuiaba</option>
    <option value='104' parent='2'>Curacao</option>
    <option value='105' parent='2'>Danmarkshavn</option>
    <option value='106' parent='2'>Dawson</option>
    <option value='107' parent='2'>Dawson_Creek</option>
    <option value='108' parent='2'>Denver</option>
    <option value='109' parent='2'>Detroit</option>
    <option value='2110' parent='2'>Dominica</option>
    <option value='2121' parent='2'>Edmonton</option>
    <option value='2132' parent='2'>Eirunepe</option>
    <option value='2143' parent='2'>El_Salvador</option>
    <option value='2154' parent='2'>Fort_Nelson</option>
    <option value='2165' parent='2'>Fortaleza</option>
    <option value='2176' parent='2'>Glace_Bay</option>
    <option value='2187' parent='2'>Godthab</option>
    <option value='2198' parent='2'>Goose_Bay</option>
    <option value='2209' parent='2'>Grand_Turk</option>
    <option value='120' parent='2'>Grenada</option>
    <option value='121' parent='2'>Guadeloupe</option>
    <option value='122' parent='2'>Guatemala</option>
    <option value='123' parent='2'>Guayaquil</option>
    <option value='124' parent='2'>Guyana</option>
    <option value='125' parent='2'>Halifax</option>
    <option value='126' parent='2'>Havana</option>
    <option value='127' parent='2'>Hermosillo</option>
    <option value='128' parent='2'>Indiana</option>
    <option value='136' parent='2'>Inuvik</option>
    <option value='137' parent='2'>Iqaluit</option>
    <option value='138' parent='2'>Jamaica</option>
    <option value='139' parent='2'>Juneau</option>
    <option value='140' parent='2'>Kentucky</option>
    <option value='142' parent='2'>Kralendijk</option>
    <option value='143' parent='2'>La_Paz</option>
    <option value='144' parent='2'>Lima</option>
    <option value='145' parent='2'>Los_Angeles</option>
    <option value='146' parent='2'>Lower_Princes</option>
    <option value='147' parent='2'>Maceio</option>
    <option value='148' parent='2'>Managua</option>
    <option value='149' parent='2'>Manaus</option>
    <option value='150' parent='2'>Marigot</option>
    <option value='151' parent='2'>Martinique</option>
    <option value='152' parent='2'>Matamoros</option>
    <option value='153' parent='2'>Mazatlan</option>
    <option value='154' parent='2'>Menominee</option>
    <option value='155' parent='2'>Merida</option>
    <option value='156' parent='2'>Metlakatla</option>
    <option value='157' parent='2'>Mexico_City</option>
    <option value='158' parent='2'>Miquelon</option>
    <option value='159' parent='2'>Moncton</option>
    <option value='160' parent='2'>Monterrey</option>
    <option value='161' parent='2'>Montevideo</option>
    <option value='162' parent='2'>Montserrat</option>
    <option value='163' parent='2'>Nassau</option>
    <option value='164' parent='2'>New_York</option>
    <option value='165' parent='2'>Nipigon</option>
    <option value='166' parent='2'>Nome</option>
    <option value='167' parent='2'>Noronha</option>
    <option value='168' parent='2'>North_Dakota/Beulah</option>
    <option value='169' parent='2'>North_Dakota/Center</option>
    <option value='170' parent='2'>North_Dakota/New_Salem</option>
    <option value='171' parent='2'>Ojinaga</option>
    <option value='172' parent='2'>Panama</option>
    <option value='173' parent='2'>Pangnirtung</option>
    <option value='174' parent='2'>Paramaribo</option>
    <option value='175' parent='2'>Phoenix</option>
    <option value='176' parent='2'>Port-au-Prince</option>
    <option value='177' parent='2'>Port_of_Spain</option>
    <option value='178' parent='2'>Porto_Velho</option>
    <option value='179' parent='2'>Puerto_Rico</option>
    <option value='180' parent='2'>Punta_Arenas</option>
    <option value='181' parent='2'>Rainy_River</option>
    <option value='182' parent='2'>Rankin_Inlet</option>
    <option value='183' parent='2'>Recife</option>
    <option value='184' parent='2'>Regina</option>
    <option value='185' parent='2'>Resolute</option>
    <option value='186' parent='2'>Rio_Branco</option>
    <option value='187' parent='2'>Santarem</option>
    <option value='188' parent='2'>Santiago</option>
    <option value='189' parent='2'>Santo_Domingo</option>
    <option value='190' parent='2'>Sao_Paulo</option>
    <option value='191' parent='2'>Scoresbysund</option>
    <option value='192' parent='2'>Sitka</option>
    <option value='193' parent='2'>St_Barthelemy</option>
    <option value='194' parent='2'>St_Johns</option>
    <option value='195' parent='2'>St_Kitts</option>
    <option value='196' parent='2'>St_Lucia</option>
    <option value='197' parent='2'>St_Thomas</option>
    <option value='198' parent='2'>St_Vincent</option>
    <option value='199' parent='2'>Swift_Current</option>
    <option value='200' parent='2'>Tegucigalpa</option>
    <option value='201' parent='2'>Thule</option>
    <option value='202' parent='2'>Thunder_Bay</option>
    <option value='203' parent='2'>Tijuana</option>
    <option value='204' parent='2'>Toronto</option>
    <option value='205' parent='2'>Tortola</option>
    <option value='206' parent='2'>Vancouver</option>
    <option value='207' parent='2'>Whitehorse</option>
    <option value='208' parent='2'>Winnipeg</option>
    <option value='209' parent='2'>Yakutat</option>
    <option value='210' parent='2'>Yellowknife</option>


    <option value='221' parent='3'>Casey</option>
    <option value='222' parent='3'>Davis</option>
    <option value='223' parent='3'>DumontDUrville</option>
    <option value='224' parent='3'>Macquarie</option>
    <option value='225' parent='3'>Mawson</option>
    <option value='226' parent='3'>McMurdo</option>
    <option value='227' parent='3'>Palmer</option>
    <option value='228' parent='3'>Rothera</option>
    <option value='229' parent='3'>Syowa</option>
    <option value='230' parent='3'>Troll</option>
    <option value='231' parent='3'>Vostok</option>

    <option value='232' parent='69'>Buenos_Aires</option>
    <option value='233' parent='69'>Catamarca</option>
    <option value='234' parent='69'>Cordoba</option>
    <option value='235' parent='69'>Jujuy</option>
    <option value='236' parent='69'>La_Rioja</option>
    <option value='237' parent='69'>Mendoza</option>
    <option value='238' parent='69'>Rio_Gallegos</option>
    <option value='239' parent='69'>Salta</option>
    <option value='240' parent='69'>San_Juan</option>
    <option value='241' parent='69'>San_Luis</option>
    <option value='242' parent='69'>Tucuman</option>
    <option value='243' parent='69'>Ushuaia</option>

    <option value='244' parent='128'>Indianapolis</option>
    <option value='245' parent='128'>Knox</option>
    <option value='246' parent='128'>Marengo</option>
    <option value='247' parent='128'>Petersburg</option>
    <option value='248' parent='128'>Tell_City</option>
    <option value='249' parent='128'>Vevay</option>
    <option value='250' parent='128'>Vincennes</option>
    <option value='251' parent='128'>Winamac</option>

    <option value='252' parent='140'>Louisville</option>
    <option value='253' parent='140'>Monticello</option>

</select>

          </p>
        </div>
      </div>

<br/>

        <script type="text/javascript">
            $(".select2-gtree2").select2gtree({
                showUseButton: false
            });
        </script>

       </div>
        <div class="col-md-4">
      <div class="form-group" id="timezone-group" style="margin-bottom: 5px;">
        <div class="col-sm-12 col-md-12 col-lg-12">
          <h2>Without Breadcrumbs</h2>
          <p>
<pre><code class="javascript">$('#timezone3').select2gtree({
    showBreadcrumbs: false
});
</code></pre>

          </p>
          <p>
<select id="timezone3" class='select2-gtree' style="width:100%" name="timezone3">

    <option value='1' parent='0'> Africa </option>
    <option value='2' parent='0'> America </option>
    <option value='3' parent='0'> Antarctica </option>
    <option value='4' parent='0'> Arctic </option>
    <option value='5' parent='0'> Asia </option>
    <option value='6' parent='0'> Atlantic </option>
    <option value='7' parent='0'> Australia </option>
    <option value='8' parent='0'> Europe </option>
    <option value='9' parent='0'> Indian </option>
    <option value='10' parent='0'> Pacific </option>
    <option value='11' parent='0'> Others </option>

    <option parent='1'>Abidjan</option>
    <option value='13' parent='1'>Accra</option>
    <option value='14' parent='1'>Addis_Ababa</option>
    <option value='15' parent='1'>Algiers</option>
    <option value='16' parent='1'>Asmara</option>
    <option value='17' parent='1'>Bamako</option>
    <option value='18' parent='1'>Bangui</option>
    <option value='19' parent='1'>Banjul</option>
    <option value='20' parent='1'>Bissau</option>
    <option value='21' parent='1'>Blantyre</option>
    <option value='22' parent='1'>Brazzaville</option>
    <option value='23' parent='1'>Bujumbura</option>
    <option value='24' parent='1'>Cairo</option>
    <option value='25' parent='1'>Casablanca</option>
    <option value='26' parent='1'>Ceuta</option>
    <option value='27' parent='1'>Conakry</option>
    <option value='28' parent='1'>Dakar</option>
    <option value='29' parent='1'>Dar_es_Salaam</option>
    <option value='30' parent='1'>Djibouti</option>
    <option value='31' parent='1'>Douala</option>
    <option value='32' parent='1'>El_Aaiun</option>
    <option value='33' parent='1'>Freetown</option>
    <option value='34' parent='1'>Gaborone</option>
    <option value='35' parent='1'>Harare</option>
    <option value='36' parent='1' selected>Johannesburg</option>
    <option value='37' parent='1'>Juba</option>
    <option value='38' parent='1'>Kampala</option>
    <option value='39' parent='1'>Khartoum</option>
    <option value='40' parent='1'>Kigali</option>
    <option value='41' parent='1'>Kinshasa</option>
    <option value='42' parent='1'>Lagos</option>
    <option value='43' parent='1'>Libreville</option>
    <option value='44' parent='1'>Lome</option>
    <option value='45' parent='1'>Luanda</option>
    <option value='46' parent='1'>Lubumbashi</option>
    <option value='47' parent='1'>Lusaka</option>
    <option value='48' parent='1'>Malabo</option>
    <option value='49' parent='1'>Maputo</option>
    <option value='50' parent='1'>Maseru</option>
    <option value='51' parent='1'>Mbabane</option>
    <option value='52' parent='1'>Mogadishu</option>
    <option value='53' parent='1'>Monrovia</option>
    <option value='54' parent='1'>Nairobi</option>
    <option value='55' parent='1'>Ndjamena</option>
    <option value='56' parent='1'>Niamey</option>
    <option value='57' parent='1'>Nouakchott</option>
    <option value='58' parent='1'>Ouagadougou</option>
    <option value='59' parent='1'>Porto-Novo</option>
    <option value='60' parent='1'>Sao_Tome</option>
    <option value='61' parent='1'>Tripoli</option>
    <option value='62' parent='1'>Tunis</option>
    <option value='63' parent='1'>Windhoek</option>


    <option value='64' parent='2'>Adak</option>
    <option value='65' parent='2'>Anchorage</option>
    <option value='66' parent='2'>Anguilla</option>
    <option value='67' parent='2'>Antigua</option>
    <option value='68' parent='2'>Araguaina</option>
    <option value='69' parent='2'>Argentina</option>
    <option value='81' parent='2'>Aruba</option>
    <option value='82' parent='2'>Asuncion</option>
    <option value='83' parent='2'>Atikokan</option>
    <option value='84' parent='2'>Bahia</option>
    <option value='85' parent='2'>Bahia_Banderas</option>
    <option value='86' parent='2'>Barbados</option>
    <option value='87' parent='2'>Belem</option>
    <option value='88' parent='2'>Belize</option>
    <option value='89' parent='2'>Blanc-Sablon</option>
    <option value='90' parent='2'>Boa_Vista</option>
    <option value='91' parent='2'>Bogota</option>
    <option value='92' parent='2'>Boise</option>
    <option value='93' parent='2'>Cambridge_Bay</option>
    <option value='94' parent='2'>Campo_Grande</option>
    <option value='95' parent='2'>Cancun</option>
    <option value='96' parent='2'>Caracas</option>
    <option value='97' parent='2'>Cayenne</option>
    <option value='98' parent='2'>Cayman</option>
    <option value='99' parent='2'>Chicago</option>
    <option value='100' parent='2'>Chihuahua</option>
    <option value='101' parent='2'>Costa_Rica</option>
    <option value='102' parent='2'>Creston</option>
    <option value='103' parent='2'>Cuiaba</option>
    <option value='104' parent='2'>Curacao</option>
    <option value='105' parent='2'>Danmarkshavn</option>
    <option value='106' parent='2'>Dawson</option>
    <option value='107' parent='2'>Dawson_Creek</option>
    <option value='108' parent='2'>Denver</option>
    <option value='109' parent='2'>Detroit</option>
    <option value='2110' parent='2'>Dominica</option>
    <option value='2121' parent='2'>Edmonton</option>
    <option value='2132' parent='2'>Eirunepe</option>
    <option value='2143' parent='2'>El_Salvador</option>
    <option value='2154' parent='2'>Fort_Nelson</option>
    <option value='2165' parent='2'>Fortaleza</option>
    <option value='2176' parent='2'>Glace_Bay</option>
    <option value='2187' parent='2'>Godthab</option>
    <option value='2198' parent='2'>Goose_Bay</option>
    <option value='2209' parent='2'>Grand_Turk</option>
    <option value='120' parent='2'>Grenada</option>
    <option value='121' parent='2'>Guadeloupe</option>
    <option value='122' parent='2'>Guatemala</option>
    <option value='123' parent='2'>Guayaquil</option>
    <option value='124' parent='2'>Guyana</option>
    <option value='125' parent='2'>Halifax</option>
    <option value='126' parent='2'>Havana</option>
    <option value='127' parent='2'>Hermosillo</option>
    <option value='128' parent='2'>Indiana</option>
    <option value='136' parent='2'>Inuvik</option>
    <option value='137' parent='2'>Iqaluit</option>
    <option value='138' parent='2'>Jamaica</option>
    <option value='139' parent='2'>Juneau</option>
    <option value='140' parent='2'>Kentucky</option>
    <option value='142' parent='2'>Kralendijk</option>
    <option value='143' parent='2'>La_Paz</option>
    <option value='144' parent='2'>Lima</option>
    <option value='145' parent='2'>Los_Angeles</option>
    <option value='146' parent='2'>Lower_Princes</option>
    <option value='147' parent='2'>Maceio</option>
    <option value='148' parent='2'>Managua</option>
    <option value='149' parent='2'>Manaus</option>
    <option value='150' parent='2'>Marigot</option>
    <option value='151' parent='2'>Martinique</option>
    <option value='152' parent='2'>Matamoros</option>
    <option value='153' parent='2'>Mazatlan</option>
    <option value='154' parent='2'>Menominee</option>
    <option value='155' parent='2'>Merida</option>
    <option value='156' parent='2'>Metlakatla</option>
    <option value='157' parent='2'>Mexico_City</option>
    <option value='158' parent='2'>Miquelon</option>
    <option value='159' parent='2'>Moncton</option>
    <option value='160' parent='2'>Monterrey</option>
    <option value='161' parent='2'>Montevideo</option>
    <option value='162' parent='2'>Montserrat</option>
    <option value='163' parent='2'>Nassau</option>
    <option value='164' parent='2'>New_York</option>
    <option value='165' parent='2'>Nipigon</option>
    <option value='166' parent='2'>Nome</option>
    <option value='167' parent='2'>Noronha</option>
    <option value='168' parent='2'>North_Dakota/Beulah</option>
    <option value='169' parent='2'>North_Dakota/Center</option>
    <option value='170' parent='2'>North_Dakota/New_Salem</option>
    <option value='171' parent='2'>Ojinaga</option>
    <option value='172' parent='2'>Panama</option>
    <option value='173' parent='2'>Pangnirtung</option>
    <option value='174' parent='2'>Paramaribo</option>
    <option value='175' parent='2'>Phoenix</option>
    <option value='176' parent='2'>Port-au-Prince</option>
    <option value='177' parent='2'>Port_of_Spain</option>
    <option value='178' parent='2'>Porto_Velho</option>
    <option value='179' parent='2'>Puerto_Rico</option>
    <option value='180' parent='2'>Punta_Arenas</option>
    <option value='181' parent='2'>Rainy_River</option>
    <option value='182' parent='2'>Rankin_Inlet</option>
    <option value='183' parent='2'>Recife</option>
    <option value='184' parent='2'>Regina</option>
    <option value='185' parent='2'>Resolute</option>
    <option value='186' parent='2'>Rio_Branco</option>
    <option value='187' parent='2'>Santarem</option>
    <option value='188' parent='2'>Santiago</option>
    <option value='189' parent='2'>Santo_Domingo</option>
    <option value='190' parent='2'>Sao_Paulo</option>
    <option value='191' parent='2'>Scoresbysund</option>
    <option value='192' parent='2'>Sitka</option>
    <option value='193' parent='2'>St_Barthelemy</option>
    <option value='194' parent='2'>St_Johns</option>
    <option value='195' parent='2'>St_Kitts</option>
    <option value='196' parent='2'>St_Lucia</option>
    <option value='197' parent='2'>St_Thomas</option>
    <option value='198' parent='2'>St_Vincent</option>
    <option value='199' parent='2'>Swift_Current</option>
    <option value='200' parent='2'>Tegucigalpa</option>
    <option value='201' parent='2'>Thule</option>
    <option value='202' parent='2'>Thunder_Bay</option>
    <option value='203' parent='2'>Tijuana</option>
    <option value='204' parent='2'>Toronto</option>
    <option value='205' parent='2'>Tortola</option>
    <option value='206' parent='2'>Vancouver</option>
    <option value='207' parent='2'>Whitehorse</option>
    <option value='208' parent='2'>Winnipeg</option>
    <option value='209' parent='2'>Yakutat</option>
    <option value='210' parent='2'>Yellowknife</option>


    <option value='221' parent='3'>Casey</option>
    <option value='222' parent='3'>Davis</option>
    <option value='223' parent='3'>DumontDUrville</option>
    <option value='224' parent='3'>Macquarie</option>
    <option value='225' parent='3'>Mawson</option>
    <option value='226' parent='3'>McMurdo</option>
    <option value='227' parent='3'>Palmer</option>
    <option value='228' parent='3'>Rothera</option>
    <option value='229' parent='3'>Syowa</option>
    <option value='230' parent='3'>Troll</option>
    <option value='231' parent='3'>Vostok</option>

    <option value='232' parent='69'>Buenos_Aires</option>
    <option value='233' parent='69'>Catamarca</option>
    <option value='234' parent='69'>Cordoba</option>
    <option value='235' parent='69'>Jujuy</option>
    <option value='236' parent='69'>La_Rioja</option>
    <option value='237' parent='69'>Mendoza</option>
    <option value='238' parent='69'>Rio_Gallegos</option>
    <option value='239' parent='69'>Salta</option>
    <option value='240' parent='69'>San_Juan</option>
    <option value='241' parent='69'>San_Luis</option>
    <option value='242' parent='69'>Tucuman</option>
    <option value='243' parent='69'>Ushuaia</option>

    <option value='244' parent='128'>Indianapolis</option>
    <option value='245' parent='128'>Knox</option>
    <option value='246' parent='128'>Marengo</option>
    <option value='247' parent='128'>Petersburg</option>
    <option value='248' parent='128'>Tell_City</option>
    <option value='249' parent='128'>Vevay</option>
    <option value='250' parent='128'>Vincennes</option>
    <option value='251' parent='128'>Winamac</option>

    <option value='252' parent='140'>Louisville</option>
    <option value='253' parent='140'>Monticello</option>

</select>

          </p>
        </div>
      </div>

            <script type="text/javascript">
                $('#timezone3').select2gtree({
                    showBreadcrumbs: false
                });
            </script>

          <!--<p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>-->
        </div>
      </div>

      <hr>

      <footer>
        <!--<p>&copy; 2016 Company, Inc.</p>-->
      </footer>
    </div> <!-- /container -->


  </body>
</html>
