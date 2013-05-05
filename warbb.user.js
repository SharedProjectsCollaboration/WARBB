// ==UserScript==
// @name      WarBB - Warez-BB Links Checker
// @description   Automatically checks for dead links from various file hosting services.
// @details     Based on popular W.A.R. Links Checker, this script automatically checks links from 1000 + unique filehostings. For Firefox, Chrome, Safari. 
// @version     1.6.0
// @license     Please do not modify yourself, contact authors with any problems
// @author      iKickback & thecodingdude / Original by dkitty
// @include     *warez-bb.org*
// @include     *safelinking.net/p/*
// @include     *keeplinks.me/p/*
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_xmlhttpRequest
// @grant     GM_log
// @grant     GM_addStyle
// @grant     GM_registerMenuCommand
// @grant     GM_getResourceText

// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js
// @resource    jQueryUICSS https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/smoothness/jquery-ui.css
// @usoscript   153759
// ==/UserScript==

var WarBB_version = "1.6.0";

//separate alternative domains with "|" char (first name is considered being main)
var allHostNames = ["1fichier.com|dl4free.com", "2download.de", "2shared.com", "4fastfile.com", "adrive.com",
"bayfiles.com", "bezvadata.cz", "bitshare.com", "burnupload.com|burnupload.ihiphop.com", "filebeam.com",
"cramit.in|cramitin.net", "czshare.com", "dataport.cz", "datei.to|sharebase.to", "daten-hoster.de|filehosting.org|xtraupload.de",
"divxden.com|vidbux.com", "easy-share.com|crocko.com", "easybytez.com", "edisk.cz", "enigmashare.com", "erofly.cz", "euroshare.eu",
"eyesfile.net|eyesfile.com|eyesfile.co|eyesfile.org", "ezyfile.net", "fastshare.cz", "fiberupload.net", "filefactory.com",
"fileflyer.com", "filerio.com|filekeen.com", "filemonster.net", "pigsonic.com", "nosupload.com", "fileking.co", "upsto.re", "box.com",
"files.mail.ru", "files.to", "filepost.com|fp.io", "filesend.net", "filesflash.com", "upafile.com", "secureupload.eu", "aavg.net|aa.vg|downdone.com",
"fileshare.in.ua", "filesmonster.com", "filestore.to", "filezpro.com", "freakshare.net", "filedwon.com", "4share.ws", "ukfilehost.com",
"free.fr", "free-uploading.com", "gettyfile.ru", "gigapeta.com", "gigasize.com", "gigaup.fr", "videopremium.net",
"goldfile.eu", "good.com", "hipfile.com", "hostuje.net", "gbitfiles.com", "vidup.me", "dizzcloud.com", "filehost.ro", "gorillavid.in",
"hotfile.com", "hulkshare.com|hu.lk", "ifolder.ru", "jumbofiles.com", "hotfiles.ws", "allmyvideos.net",
"leteckaposta.cz|sharegadget.com", "load.to", "mediafire.com", "megafileupload.com", "megashares.com", "filemaze.ws", "sharerepo.com",
"mojedata.sk", "movshare.net", "myupload.dk", "narod.ru|narod.yandex.ru", "netload.in", "ok2upload.com", "cobrashare.net",
"openfile.ru", "partage-facile.com", "putlocker.com", "ultramegabit.com", "limelinx.com", "oteupload.com", "sfshare.se", "filewe.com",
"queenshare.com|10upload.com", "quickshare.cz", "rapidgator.net", "rapidshare.com", "rapidshare.ru", "daj.to", "demo.ovh.com", "depositfiles.com|dfiles.eu",
"rapidupload.sk", "rarefile.net", "rayfile.com", "rghost.net", "sendmyway.com", "4savefile.com", "megaload.it", "filebulk.com", "videozed.net",
"sendspace.com", "share-now.net", "share-online.biz|egoshare.com", "sharingmaster.com", "fileplaneta.com", "midupload.com",
"slingfile.com", "solidfiles.com", "space4file.com", "speedfile.cz", "filenuke.com", "fileparadox.in", "creafile.net", "rapidstation.com",
"speedshare.org", "stahovanizasms.cz", "syfiles.com", "tufiles.ru", "zippyshare.com", "ryushare.com", "rodfile.com", "wikiupload.com",
"uloz.to|ulozto.cz|bagruj.cz|zachowajto.pl", "ulozisko.sk", "uloziste.com", "basicupload.com", "fileneo.com",
"upload-il.net|przeslij.net", "uploadbin.net", "uploaded.to|ul.to", "uploading.com", "uploadjet.net", "rnbload.com", "extabit.com",
"uploadspace.pl", "upnito.sk", "uptobox.com", "usaupload.net", "veehd.com", "videobb.com", "videozer.com", "uploads.bizhat.com",
"webshare.cz", "xdisk.cz", "yunfile.com|filemarkets.com|yfdisk.com", "nitrobits.com", "mega-myfile.com", "divshare.com",
"flyfiles.net", "nowdownload.eu", "asfile.com", "prefiles.com", "axifile.com", "zalil.ru", "ortofiles.com", "uploadc.com", "zalaa.com",
"sharefiles.co", "amonshare.com", "uploadorb.com", "data.hu", "filestay.com", "blitzfiles.com", "filesbowl.com", "freestorage.ro",
"netkups.com", "vreer.com", "upfile.biz", "file-speed.com", "hulkload.com", "speedshare.eu", "putshare.com", "sharedbit.net",
"uppit.com|up.ht", "ddlstorage.com", "downloadani.me", "filesabc.com", "hotuploading.com", "share.az", "upload.tc",
"sharebeast.com", "180upload.com", "verzend.be", "asixfiles.com", "zomgupload.com", "mlfat4arab.com", "ravishare.com",
"movreel.com", "4up.me|4upfiles.com", "extmatrix.com", "sendfiles.nl", "yourfilestore.com", "filebig.net", "fileupup.com", "sharesix.com", "hulkfile.eu",
"sockshare.com", "share76.com", "filebox.com", "nekaka.com", "file4safe.com", "freeuploads.fr|uploa.dk", "tusfiles.net",
"kupload.org", "filekom.com|filemac.com", "idup.in", "bitbonus.com", "speedvid.tv", "ufox.com", "clipshouse.com", "drop.st",
"luckyshare.net", "uploadic.com", "fileswap.com", "potload.com", "clouds.to", "billionuploads.com", "rockdizfile.com", "exclusivefaile.com",
"filesbb.com", "maxshare.pl", "myvdrive.com", "filesin.com", "novafile.com", "longfiles.com", "albafile.com", "saarie.com",
"lumfile.com", "toucansharing.com", "filesega.com", "uploadhero.com|uploadhero.co", "uploadbaz.com", "expressleech.com",
"stahovadlo.cz", "zooupload.com", "warserver.cz", "247upload.com", "datafilehost.com", "bitupload.com", "fileza.net",
"fileprohost.com", "files.indowebster.com", "superload.cz", "mafiastorage.com", "zenload.com", "fileband.com", "miurl.es", "filesmall.com",
"henchfile.com", "minus.com", "filesmelt.com", "hellupload.com", "packupload.com", "uploadingit.com", "stiahni.si", "filefolks.com", "ishare.bz",
"filedefend.com", "sendspace.pl", "fastshare.org", "cyberlocker.ch", "filesector.cc", "fileduct.net", "putshare.net", "divxstage.eu",
"fileuplo.de", "upaj.pl", "sinhro.net", "egofiles.com", "filestore.com.ua", "uploadcore.com", "filecloud.ws", "filesbomb.com",
"project-free-upload.com", "imzupload.com", "netuploaded.com", "multifilestorage.com", "hostingbulk.com", "speedy-share.com", "100shared.com",
"xvidstage.com", "faststream.in", "vidbull.com", "igetfile.com", "rapidfileshare.net", "filebox.ro|fbx.ro", "mixturecloud.com|mixturefile.com", "brutalsha.re",
"filefront.com|gamefront.com", "restfile.ca", "easyfilesharing.info", "yourupload.com", "file-upload.net", "upload-novalayer.com",
"fliiby.com", "datacloud.to", "cloudzer.net|clz.to", "filevice.com", "jumbofiles.org", "hotfiles.co", "ifile.ws", "rapidapk.com", "upshared.com", "vidpe.com",
"upload.ee", "putme.org", "uplly.com", "bigupload.com", "hugefiles.net", "mega.co.nz", "unlimitshare.com", "share4web.com", "uploaders.be", "epicshare.net",
"novaup.com|novamov.com", "filedropper.com", "yourfiles.to", "skydrive.live.com", "uploadboy.com", "uploking.com", "westfiles.com",
"mijnbestand.nl", "ultrashare.net", "uploadur.com", "dosya.tc", "exfile.ru", "fileshare.ro", "fshare.vn", "wikifortio.com", "wyslijto.pl", "kiwi6.com",
"localhostr.com|lh.rs", "hostfil.es", "remixshare.com", "aimini.net", "hidemyass.com", "tinyupload.com", "gigabase.com", "trainbit.com", "videobam.com",
"hyperfileshare.com", "uploads.ws", "ge.tt", "donevideo.com", "mightyupload.com", "megafiles.se", "zefile.com", "1st-files.com", "keep2share.cc",
"bitload.it", "cloud-up.be", "fiberstorage.net", "filesony.com", "uploadhunt.com", "junocloud.me", "filewinds.com", "karelia.pro", "boomupload.net",
"1-clickshare.com", "flashdrive.it", "fileopic.com", "fastupload.ro", "fujifile.me", "howfile.com", "fileden.com", "allbox4.com", "failai.lt",
"file4go.com", "almmyz.com", "hostinoo.com", "fileprohost.me", "movdivx.com", "pandamemo.com", "youwatch.org", "spicyfile.com", "m5zn.com", "upload-il.com",
"sube.me", "files2upload.net", "banashare.com", "vidto.me", "hyshare.com", "filezy.net", "arabloads.com", "allmyfiles.ca", "98file.com", "davvas.com", "filesline.com",
"filexb.com", "megacache.net", "ezzfile.it", "sanshare.com", "sendfile.su", "akafile.com", "todayfile.com", "lafiles.com", "files4up.com", "medofire.com",
"usaupload.net", "anonfiles.com", "batshare.com", "upitus.net", "medafire.net", "medoupload.com", "fastflv.com", "herosh.com", "min.us", "girlshare.ro",
"bin.ge", "nowvideo.eu", "shareplace.com", "terafiles.net", "uploadmb.com", "exfilehost.com", "cometfiles.com", "cloudnes.com", "filetug.com"];

try
{
  //iframes excluded
  if (window.top != window.self)
  {
    return;
  }
  
  //allHostNames sites excluded
  if (window.location.href.match("https?:\/\/(www\.)?[\w\.-]*(?:" + 
            allHostNames.join("|").replace(/\./g, "\\.").replace(/-/g, "\\-") + 
                                    ")"))
  {
    return;
  }
}
catch (e)
{
  return;
}

//separate alternative domains with "|" char (first name is considered being main)
var allContainerNames = ["keeplinks.me", "safelinking.net"];

//separate alternative domains with "|" char (first name is considered being main)
var allObsoleteNames = ["uloz.cz", "storage.to", "iskladka.cz", "file-rack.com", "fast-load.net", "subory.sk", "bigandfree.com",
"fileop.com", "mujsoubor.cz", "sendfile.to", "superfastfile.com", "quickyshare.com", "duckload.com", "uploadstore.net", "meinupload.com",
"dualshare.com", "2xupload.to|2xupload.de", "oxedion.com", "uploadline.com", "dll.bz", "movieshare.in", "milledrive.com", "quickupload.net",
"safelink.in", "metadivx.com", "divxlink.com", "uploadrack.com", "teradepot.com", "dataup.to", "upit.to", "driveway.com", "eatlime.com",
"a2zuploads.com", "friendlyfiles.net", "flyfile.us", "speedyshare.com|speedy.sh", "uploadspace.eu", "keepfile.com", "piggyshare.com", "share.cx",
"filecrown.com", "6giga.com", "uploadjockey.com", "bluehost.to", "filegu.ru", "filebase.to", "up-file.com", "ezyfile.net", "xvideos.com",
"filebling.com", "loaded.it", "uploadcell.com", "uploadshare.cz", "mangoshare.com", "filestab.com", "crazyupload.com", "gaiafile.com",
"sharejunky.com", "fileho.com", "bigfile.in", "bigshare.eu", "dahosting.org", "digisofts.net", "file4save.com", "uploaddot.com",
"filechip.com", "filescloud.com", "saveqube.com", "turboshare.de", "z-upload.com", "youshare.com", "jiffyupload.com", "gigeshare.com",
"datenklo.net", "upload.dj", "loadfiles.in", "upit.to", "dsfileshare.com", "sharesimple.net", "4files.net", "letitbit.net", "turbobit.net",
"odsiebie.com", "filenavi.com", "3oof.com", "meshwaar.com", "maxupload.com", "share.cx", "atserver.eu", "hellshare.com", "uploadlab.com",
"file2upload.net", "filebling.com", "turboshare.com", "rarhost.com", "isharehd.com", "i741.com", "dataup.de", "fofly.com", "shareonall.com",
"sexuploader.com", "megaupload.com|megavideo.com|megaporn.com|megarotic.com", "uploadhyper.com", "filespawn.com", "caizzii.com",
"volnyweb.cz", "usershare.net", "filescash.net", "metahyper.com", "combozip.com", "x7.to", "enterupload.com|flyupload.com",
"filepoint.de", "mystream.to", "x-fs.com", "shareator.com", "srapid.eu", "sosame.cz", "filesdump.com", "2-klicks.de", "bulletupload.com",
"silofiles.com", "filehook.com", "uploadking.com", "uploadhere.com", "kewlshare.com", "rapidable.com", "glumbo.com|glumbouploads.com",
"filesonic.com|sharingmatrix.com", "fileserve.com", "wupload.com", "skipfile.com", "smartuploader.com", "dualshare.com", "storeandserve.com",
"mountfile.com", "transitfiles.com", "uploadstation.com", "filejungle.com", "shareshared.com", "quickyshare.com", "save.am", "petandrive.com",
"file2box.com", "flyshare.cz", "yabadaba.ru", "cloudcache.cc", "yourfilehost.com", "jakfile.com", "kickload.com", "pyramidfiles.com",
"refile.net", "zshare.net", "ddlani.me|ddlanime.com", "ftp2share.com", "fooget.com", "rapidhide.com", "gotupload.com", "mooload.com",
"zupload.com", "mytempdir.com", "onionshare.com", "stahnu.to", "oron.com", "badongo.com", "filereactor.com", "filegaze.com", "megashare.com",
"sharerun.com", "1hostclick.com", "4us.to", "dinnoz.com", "restfile.net", "missupload.com", "fileud.com", "up250.com", "miurl.es",
"uploadspot.com", "upload.ae", "launchfile.com", "proddl.com", "fileape.com", "azushare.net", "maishare.net", "uploading4u.com|uploading4u.eu",
"uploadsfiles.com", "cloudnxt.net", "uploadboost.com", "filelaser.com", "filefat.com", "filedino.com", "shareupload.com", "wolfshare.com",
"4bytez.com", "anonstream.com", "bitroad.net", "brontofile.com", "cloudnator.com|shragle.com", "coolshare.cz", "seeupload.com",
"dark-uploads.com", "dotavi.com", "file-bit.net", "filecosy.com", "fileduct.com", "filemashine.com", "fileserver.cc", "filetechnology.com",
"fireuploads.net", "getzilla.net", "gigfiles.net", "hellspy.com", "holderfile.com", "ihostia.com", "isavelink.com", "k2files.com", "migahost.com",
"mojofile.com", "ovfile.com", "plunder.com", "premiuns.org", "qshare.com", "shafiles.me", "sharefilehost.com", "stahuj.to", "storage.novoro.net",
"uploadstube.de", "vidhog.com", "xfileshare.eu", "bzlink.us", "cing.be", "linksafe.me", "fileupped.com", "getthebit.com", "hackerbox.org",
"uploadmachine.com", "uploadoz.com", "upthe.net", "paid4share.net", "icefile.net", "smartsharing.net", "fxpag.com", "filebeep.com", "smartupload.net",
"timbshare.com", "iuploadfiles.com", "zizfile.com", "files-upload.com", "pointupload.com", "uploadarmy.com", "mydir.eu", "pctoworld.com", "direktload.org",
"momupload.com", "yastorage.com", "sharedzilla.com", "simpleupload.net", "quicksharing.com", "buploads.com", "uploadhut.com", "orbitfiles.com", "midload.com",
"savefile.info", "cocoshare.cc", "sharebase.de", "filehost.to", "hotelupload.com", "fileholding.com", "woofiles.com", "xuploading.com", "uploadchoice.com",
"speedshare.us", "uploadville.com", "supasic.com", "uploadpalace.com", "uploadr.com", "rapidfile.fr", "openupload.com", "miniuploads.com", "titanicshare.com",
"sharelor.com", "keepmyfile.com", "sharebigfile.com", "share.am", "sprintshare.com", "rapidupload.eu", "theonlinedatastorage.com", "ugotfile.com", "megaFTP.com",
"filevelocity.com", "dopeshare.com", "filethe.net", "6ybh-upload.com", "zetshare.net", "udic.co", "uploadables.com", "filevegas.com", "coolfilehost.com",
"pcdesignfile.hi2.ro", "kitwit.info", "filessharefg.3x.ro", "neturl.info", "megafilesharing.com", "gfxheaven.co.uk", "seed-share.com", "linkrevenue.net",
"twinupload.com", "mazzikatop.com", "saba.mehargroup.org", "themeyoou.com", "do32.com", "sharequickly.com", "downup.us.to", "gfxshare.net", "speeddsharing.info",
"sharedl.com", "bit.vc", "filestrack.com", "emodownloads.com", "fileslinks.com", "themes.pickplus.net", "mruploads.com", "warmfile.com", "adf.ly", "gptfile.com",
"uploadfloor.com", "bestsharing.com", "getfile.biz", "upload66.com", "fileshack.icraze.net", "mazupload.com", "halotemplate.free.fr", "desiload.com", "filegiant.net",
"voodoom.com", "getupload.com", "url.file.am", "dago.to", "hamstershare.com", "cinshare.com", "supashare.net", "sharepro.info", "momoshare.com", "sloveniandesigner.com",
"multidesi.com", "clonefile.com", "uploadski.com", "speedie-host.com", "turboupload.com", "weefile.com", "mykupload.freei.me", "savefile.com", "upload.ps",
"share2u.net", "appscene.org", "filestock.net", "youmirror.biz", "projectcamelot.org", "gigupload.com", "fairyshare.com", "divxcloud.com", "editandshare.com",
"hostupload.net", "fileshaker.com", "youload.to", "addat.hu", "filedeck.net", "eyvx.net", "filesnab.com", "filetitle.com", "ufliq.com", "sharebeats.com",
"yotafile.com", "xxlupload.com", "your-filehosting.com", "uploading.to", "mummyfile.com", "play-host.net", "namipam.com", "alldrives.ge|allshares.ge", "filestrum.com",
"uploadace.com", "7ups.net", "buckshare.com", "cokluupload.com", "filefaster.com", "divxme.com", "rapidmedia.net", "filerace.com", "mdj.com", "crocshare.com",
"movbay.org", "migafile.com", "dudupload.com", "fileuploadx.de", "fufox.net", "sharefiles4u.com", "fileor.com", "filedove.com", "wickedupload.com","freefilehosting.ws",
"uploadby.us", "kisalt.me", "wizzupload.com", "squillion.com", "37v.net", "xshar.net", "filemsg.com", "datafile.us", "smallfile.in", "space4upload.info", "nrgfile.com",
"okah.com", "filemojo.com", "filerose.com", "mega.huevn.com", "hitfile.net", "filecloud.io|ifile.it", "ex.ua", "filespump.com", "byethost12.com", "filezzz.com",
"uploadersite.com", "filegetty.com", "nfile.eu", "box4upload.com", "envirofile.org", "omxira.com", "evilshare.com", "sharehoster.de", "rapidoyun.com", "shareflare.net",
"monsteruploads.eu", "coraldrive.net", "files2k.eu", "kiwiload.com", "uploadjockey.com", "i-filez.com", "mylordweb.com", "edoc.com", "mooshare.net", "rapidshare.de",
"uploadbox.com", "aieshare.com", "filestock.ru", "filegag.com", "sharpfile.com", "uploadblast.com", "gbmeister.com", "ziddu.com", "db-rap.com", "venusfile.com",
"sharesystems.de", "flameupload.com", "upload.lu", "tm.gwn.ru", "odsiebie.pl", "syl.me", "fast-sharing.com", "ifilehosting.net", "filehost.ws", "netfolder.in",
"bubblefiles.com", "muchshare.net", "upgrand.com", "multiupload.com", "fileqube.com", "upshare.eu", "turbo-share.com", "uploadit.ws", "gups.in", "alexupload.com",
"littleurl.net", "rlslog.in", "faramovie4.com", "dude.ir", "dosyakaydet.com", "filescube.com", "down.uc.ae", "filebrella.com", "filerobo.com", "nnload.com",
"jamber.info", "guizmodl.net", "interupload.com", "peejeshare.com|peeje.com", "speed-download.com", "uploadtornado.com", "upshare.net", "fastyurl.info",
"ufile.eu", "flameload.com", "filevo.com", "bgdox.com", "grupload.com", "vip-file.com", "sms4file.com", "solidfile.com", "20g.info", "purples.byethost3.com",
"tvshack.net", "eufiles.net", "rs-layer.com", "archiv.to", "share.gulli.com", "sharebees.com", "uptorch.com", "filedownloads.org", "file4sharing.com", "terabit.to",
"downupload.com", "4shared.com", "cobrashare.sk", "catshare.net", "multishare.cz", "sharecash.org", "share-links.biz", "unibytes.com", "kongsifile.com", "ncrypt.in",
"linksave.in", "linkcrypt.ws", "uload.to", "filesector.cc", "groovefile.com", "upfile.in", "uploadcore.com", "kewlfile.com", "przeklej.pl", "sharebee.com",
"share2many.com", "megarapid.eu", "farmupload.com", "exzip.com", "firerapid.net", "mirrorcreator.com", "multiload.cz", "multiupload.nl", "multi-up.com", "multisiteupload.com",
"qooy.com", "megaupper.com", "embedupload.com", "splitr.net", "uploadmirrors.com", "uploadtubes.com", "mirrorafile.com", "maxmirror.com", "uploadonall.com", "mirrorupload.net",
"dl4.ru", "digzip.com", "tinypaste.com", "loombo.com", "superupl.com", "xoomshare.com", "file2011.co.cc", "unextfiles.com", "speedoshare.com", "neoupload.com", "adlee.ch",
"shareupload.net", "netkozmos.com", "tvchaty.com", "jumbodrop.com", "nukeshare.com", "filemates.com", "putbit.com", "uploadbear.com", "upload.el3lam.com", "videoal3rab.com",
"upzetta.com", "paid4download.com", "mintupload.com", "home4file.com", "fullshare.net", "down.vg", "sharehoster.com", "wootly.com", "spreadmyfiles.com"];

//start autoupdater
var update = {
 id: '153759',
 days: 1,
 name: 'WarBB - Warez-BB Links Checker',
 version: WarBB_version.replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
    url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
    onload: function(xpr) {update.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText.replace(/\./g, ''));
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
  GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
  GM_setValue('updated_'+this.id, 'off');
  GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); update.call(true);});
  alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
  GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
  init: function() {
    if (GM_getValue('updated_'+this.id, 0) == "off")
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');update.call(true)});
    else {
      if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)) {
        GM_setValue('updated_'+this.id, this.time+'');
        this.call();
      }
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');update.call(true)});
    }
  }
};
//end autoupdater

var firstRun = GM_getValue("First_run", true);

allHostNames.sort();
allContainerNames.sort();
allObsoleteNames.sort();

var RAND_STRING = "8QyvpOSsRG3QWq";
var DEBUG_MODE = false;
var ANONYMIZE_SERVICE;
var EB_LOGIN = ["WarBBLinkChecker@hmamail.com", "WmSJb4KDADLK5VC"];

var TOOLTIP_MAXWIDTH = 600; //in pixels
var TOOLTIP_THUMBWIDTH = 200;
    
var containers_processed = false;

//settings for keyboard functions start
var CHECK_ALL_LINKS_KEY = "A";
var CONFIGURATION_KEY = "C";
var copy_to_dead_key = "D";
var toggle_autocheck_key = "W";
var first_key_keycode = '17'; // 18=ALT 16=Shift 17=Ctrl 32=SPACE_BAR 9=TAB
var first_key_keycodename = 'CTRL';
var second_key_keycode = '18';
var second_key_keycodename = 'ALT';
var CHECK_ALL_LINKS_KEYCODE = CHECK_ALL_LINKS_KEY.charCodeAt(0);
var CONFIGURATION_KEYCODE = CONFIGURATION_KEY.charCodeAt(0);
var copy_to_dead_keycode = copy_to_dead_key.charCodeAt(0);
var toggle_autocheck_keycode = toggle_autocheck_key.charCodeAt(0);
//settings for keyboard functions end

//global settings start
var Show_black_background_in_DL_links, Show_line_through_in_dead_links, Color_DL_links;
var Live_links_color, Dead_links_color, Temp_unavailable_links_color;
var Do_not_linkify_DL_links, Keyboard_functions, Autocheck;
var Show_progress_stats, Display_tooltip_info, Icon_set;
var Progress_box_pos_bottom, Progress_box_pos_right, Progress_box_opacity, Progress_box_background_color, Progress_box_item_color;
var Progress_box_refresh_rate;
var Obsolete_file_hosts;

var messageBox = document.createElement('b'); // top-left message box

var cLinksTotal = 0;
var cLinksDead = 0;
var cLinksAlive = 0;
var cLinksUnava = 0;
var cLinksProcessed = 0;

var intervalId; //for updateProgress()

//icon resources
var PAW_ICON_GREEN =  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAInSURBVHjadJJdaFJxGMaf//+c4/Ec9fhBM6fTaZON2kDZF5GwWEHJlrSyQBbedLGgBRV0U3QRQVd1E7Quoq4aERRFq+hieRPrxmAUJCbDstUkyZbOj6VHPd3MYUXP5fs+Dy8vvwdoEaHE3hW2PeBNqmBzpnWKIY1DOIb/yRlsvz+lHFRGH/bXAVhMHuni5Oo+JfDGp1CODjV9tPWQfodmsFKX0TZsoIQjZ7efcp5R6TmwIgtC0fF3yAhAycdLRcoQgBBQhvh1btFAKPA9mkO90khuhjiJ9e2dG0z1nHBElp9kFtKRLDKvfqD+q/E0G83Raq6G+I1UBMBnhqf9AAjs4+Z7x5UDSrjkVwy9uhkA5wFcAADCkHO8kXsOYGJk1vslmBxVtC5hml37WC5VCzJYHYstA/r9uVjBDQKztlOYKKbWb1V+ytds/rYXrpC1Q6kpECx8L83Hi3feXl5CJVtFPlHMSN2a04Gob+XQ+92P9zwa+Mqo6UmTV/JwDIN8oojVxbUY2fhtjFHTw5zE6sdf7zoiWtWoletQGTkk767gw0yqsvN6H794KbGUns8OkVZMI7PemPNouyjna8DGRqXnMD8WfZd+mb0NYA7A8iYnY5/uij2wVZQLNYAClCUglKAhN9A95ehpBv6Aq3NrPGpJBZXEAgpQ+FRGbb0OVmQhmHk1gOF/KsQIzPS2SWvaFbJ+0zqFBQBXBQv/rCtsS2s7hZsAxKb39wDZHLK7+slpUgAAAABJRU5ErkJggg==';
var PAW_ICON_RED =    'data:image/png;base64,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';
var PAW_ICON_YELLOW = 'data:image/png;base64,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';
    
var RSLC_ICON_GREEN =   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hYFAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vyIKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSsL2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13ZpdyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaYehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQRj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk146BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noHXccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';
var RSLC_ICON_RED =   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQCY6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVksDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2NsLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmRQHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';
var RSLC_ICON_YELLOW =  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AQJDBgxYO68rwAAAZNJREFUeNptkr9LW1EcxT/3GhOTKIG8QTpm8B8IIoJTFkFwsXVyUaxFJHYoFzJYUVFHn4sKtoidCoKtIigWOtQOhRKowaFzJwcF0VeJ+fFe7nUwP57R7/S9nO+595z7PQJfGUgAsWqPaUBOC/yrHQI+QjKTXc7GQq4EhP+uKzdUcbtnelvhDzXQQHL2bCkbxhOA5GmZ24LUC73zPWE4lQYSmexynaCmjh5Nq9FdANER1uL9j7nfeUhIIFaVJNXEPrguKvPzgfD2G0iBGt8DkPG4CGiIyapZAWBvDUEoBOfnqPQxaANxC3v7Ze1hoQFpmsTbGwMQicLNNeTz2HaKYuO/4DnTauwLeC6i8wW4ZdSbA9rw/GtB6kaPmjyESATKZVZWUxAMQqnI9MTXOqdGcvRFoSw8o+0Pg1DxsD+PcFcJYH8aphSNsr71CkAH/17danAEQAGSa98zv7x4W9AIpGkRzap18cKU3vUv9lmQq6N5SH7cSZ8Uuqx205SI1rPL/6/HN1MW5GiKC84z2at6dixf9u4B/PqUtJuX27QAAAAASUVORK5CYII=';

//global settings end
if (window.opera && !window.console)
{
  window.console = {};

  function fn()
  {
    opera.postError(arguments);
  };
  ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'].forEach(function (name)
  {
    window.console[name] = fn;
  });
}

//displays colored text in message box
function sendMessage(text, color)
{
  var msgDiv = document.createElement('div');
  msgDiv.style.color = color;
  msgDiv.innerHTML = text;
  messageBox.appendChild(msgDiv);
  setTimeout(function(){messageBox.removeChild(msgDiv)}, 3000);
}

function linkify(totalourls)
{ // code from http://userscripts.org/scripts/review/2254  Linkify ting
    
  var regexy = "";
  var ikkeTilladteTags = [];
  
  if (Allow_spaces_in_DL_links)
    regexy = "(?:http:\/\/.+?\\?)?(?:https?:\/\/)?(?:www\\.)?(?:" + totalourls + ")[\\w\\–\\-\\.+$!*\\/\\(\\)\\[\\]\',~%?:@#&=\\\\\\—;\\u0020…×Ã\\_\\u0080-\\u03FF’‘]*";
  else
    regexy = "(?:http:\/\/.+?\\?)?(?:https?:\/\/)?(?:www\\.)?(?:" + totalourls + ")[\\w\\–\\-\\.+$!*\\/()\\[\\]\',~%?:@#&=\\\\\\—;…×Ã\\_\\u0080-\\u03FF’‘]*";

  if (Do_not_linkify_DL_links)
    ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea', 'span']; //tags, hvor det der stAÎžâ€™Î’ÂĄr inden i ikke skal vAÎžâ€™Î’Â¦re links
  else
    ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea']; //tags, hvor det der stAÎžâ€™Î’ÂĄr inden i ikke skal vAÎžâ€™Î’Â¦re links

  var regex = new RegExp(regexy, "g");
  var textNode, muligtLink;

  var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") + ") and contains(.,'/')]";
  var textNodes = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  var i = textNodes.snapshotLength;
  
  while (i--)
  {
    textNode = textNodes.snapshotItem(i);

    muligtLink = textNode.nodeValue; //all links on page

    var myArray = null;
    
    if (regex.test(muligtLink))
    {
      //til at holde det nye link, og teksten omkring det
      var span = document.createElement('span');
      var lastLastIndex = 0;
      regex.lastIndex = 0;
      var myArray = null;
      var ignoreImage = /(?:\.png|\.jpg|\.gif|\.jpeg|\.bmp)$/;

      while (myArray = regex.exec(muligtLink))
      {
        var link = myArray[0];
        //console.log(link);
        if (!ignoreImage.test(link)) {
          span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index))); //inds?t det der kommer for dette hit

          var $a = $("<a>" + link + "</a>")
        
          if (!link.match(/https?:\/\//))
          {
            link = 'http://' + link;
          }

          $a.attr("href", link.replace(/\[\/hide:\w+\]/,""))
            .addClass("processing_link")
            .appendTo(span);
        
        
          lastLastIndex = regex.lastIndex;  
        }
      }

      span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex))); //ins?t det der kommer efter sidste hit
      textNode.parentNode.replaceChild(span, textNode);
    }
  }
}

function add_WARLC_style()
{
  if (!(document.getElementsByTagName('WARLC')[0]))
  {
    var meta_not_to_add_more_style = document.createElement("WARLC");
    meta_not_to_add_more_style.setAttribute('content', 'war_links_checker');
    meta_not_to_add_more_style.setAttribute('name', 'description');
    document.getElementsByTagName('head')[0].appendChild(meta_not_to_add_more_style);
  
    alive_link_png = "";
    adead_link_png = "";
    unava_link_png = "";
    
    switch(Icon_set)
    {
    //no icons
    case 0: break;
    
    // cat paws
    case 1: alive_link_png = PAW_ICON_GREEN;
        adead_link_png = PAW_ICON_RED;
        unava_link_png = PAW_ICON_YELLOW;
        break;
    
    // classic RSLC look
    case 2: alive_link_png = RSLC_ICON_GREEN;
        adead_link_png = RSLC_ICON_RED;
        unava_link_png = RSLC_ICON_YELLOW;
        break;
    
    // cat paws
    default:alive_link_png = PAW_ICON_GREEN;
        adead_link_png = PAW_ICON_RED;
        unava_link_png = PAW_ICON_YELLOW;
        break;
    }
    
    processing_link_gif = 'data:image/gif;base64,' + // or temporary anavailable
    'R0lGODlhCgAKAJEDAMzMzP9mZv8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAADACwAAAAACgAKAAACF5wncgaAGgJzJ647cWua4sOBFEd62VEAACH5BAUAAAMALAEAAAAIAAMAAAIKnBM2IoMDAFMQFAAh+QQFAAADACwAAAAABgAGAAACDJwHMBGofKIRItJYAAAh+QQFAAADACwAAAEAAwAIAAACChxgOBPBvpYQYxYAIfkEBQAAAwAsAAAEAAYABgAAAgoEhmPJHOGgEGwWACH5BAUAAAMALAEABwAIAAMAAAIKBIYjYhOhRHqpAAAh+QQFAAADACwEAAQABgAGAAACDJwncqi7EQYAA0p6CgAh+QQJAAADACwHAAEAAwAIAAACCpRmoxoxvQAYchQAOw%3D%3D';

    var dead_color_css, live_color_css, unava_color_css, black_background_css;

    if (Color_DL_links)
    {
      dead_color_css = 'color:' + Dead_links_color + ' !important;';
      live_color_css = 'color:' + Live_links_color + ' !important;';
      unava_color_css = 'color:' + Temp_unavailable_links_color + ' !important;';
      container_color_css = 'color:' + Container_links_color + ' !important;';
    }
    else
    {
      dead_color_css = live_color_css = unava_color_css = container_color_css = '';
    }

    if (Show_black_background_in_DL_links)
    {
      black_background_css = 'background-color: black !important;';
    }
    else
    {
      black_background_css = '';
    }

    if (Show_line_through_in_dead_links)
    {
      line_through_css = 'text-decoration: line-through !important;';
    }
    else
    {
      line_through_css = '';
    }

    GM_addStyle(".alive_link {background:transparent url(" + alive_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;" + live_color_css + black_background_css + "}");
    GM_addStyle(".adead_link {background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;" + dead_color_css + black_background_css + line_through_css + "}");
    GM_addStyle(".obsolete_link {background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;" + dead_color_css + black_background_css + line_through_css + "}");
    GM_addStyle(".unava_link {background:transparent url(" + unava_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;" + unava_color_css + black_background_css + "}");
    GM_addStyle(".processing_link {background:transparent url(" + processing_link_gif + ") no-repeat scroll 100% 50%;padding-right:15px;" + container_color_css + black_background_css + "}");
    GM_addStyle(".container_link {background:transparent url(" + processing_link_gif + ") no-repeat scroll 100% 50%;padding-right:15px;" + container_color_css + black_background_css + "}");
    GM_addStyle(".container_list {font-size:90%; list-style-type:square; padding: 0px 5% 0px; margin: 0px}");
  }
}

var warlcTooltip = null;
var mouseoverLink = null; //link href with mouse cursor over it

var lastX = 0;
var lastY = 0;

$(document).ready(initTooltip);
  
//inits tooltip 
function initTooltip()
{ warlcTooltip = document.createElement("div");
  warlcTooltip.setAttribute("style", "background: #EAEAEA; box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);padding: 6px 6px 6px 6px; border-radius:2px; border:2px solid #6699CC; color:#000000;font-family:Verdana,sans-serif;font-size:11px;position:absolute;z-index:1000; max-width: " + TOOLTIP_MAXWIDTH + "px;");
  warlcTooltip.style.visibility = "hidden";
    
  document.body.appendChild(warlcTooltip);
} 

//"mousemove" event handler for all links
function moveTooltip(event)
{
  if ((Math.abs(lastX - event.clientX) + Math.abs(lastY - event.clientY)) < 6)
  { //no need to reflow if the cursor moved just a little
    return;
  }
  else
  {
    lastX = event.clientX;
    lastY = event.clientY;
  }

  posX = event.clientX + window.pageXOffset + 10;
  posY = event.clientY + window.pageYOffset;
  
  var ttHeight = warlcTooltip.offsetHeight;
  var ttFreeSpace = window.innerHeight - event.clientY;
  
  if (ttHeight > ttFreeSpace)
  { //prevents tooltip from getting out of the window
    posY -= (ttHeight - (ttFreeSpace)) + 10;
  }
  else
  {
    posY += 7;
  }
  
  warlcTooltip.style.top = posY + "px";
  warlcTooltip.style.left = posX + "px";  
}

//"mouseout" event handler for all links
function hideTooltip(){
  warlcTooltip.style.visibility = "hidden";
  mouseoverLink = null;
} 


//"mouseover" event handler for dead links
//displays tooltip error message on dead links 
function displayTooltipError()
{
  mouseoverLink = this.href;  
  
  this.addEventListener("mouseout", hideTooltip);
  this.addEventListener("mousemove", function(event) { moveTooltip(event); });
  
  warlcTooltip.innerHTML = '<b>LOADING...</b>';
  warlcTooltip.style.minWidth = 0;
  warlcTooltip.style.visibility = "visible";
  
  if (this.warlc_error) //an error message is already known and stored in warlc_error attribute
  {
    warlcTooltip.innerHTML = this.warlc_error;
  }
  else
  {
    loadErrorInfo(this);
  }
  
  function loadErrorInfo(link)
  {
    var href = link.href;
    
    href = href.replace(/quickshare\.cz\/.+/, "quickshare.cz/chyba");
    
    GM_xmlhttpRequest({
      method: 'GET',
      url: href.replace(ANONYMIZE_SERVICE, ""),
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/xml',
        'Referer': ""
      },
      onload: function(result) {
        var res = result.responseText;
        //console.log(res);
        //TODO: errorRegexs - 
        var errorRegexs =   [ //generic error messages follow
                    /(empty directory)/i,
                    /(soubor nebyl nalezen)/i,
                    /((?:file|page|link|folder)(?:is|not|does|has been|was| ){1,}(?:found|available|blocked|exists?|deleted|removed))/i,
                                        
                    //server specific error messages follow
                    /msg error" style="cursor: default">(.+?)<\/div>/, //sendspace
                    /color:red;font\-weight:bold;border\-style:dashed;font-size:12px;border\-width:2px;><tr><td align=center>(.+?)<\/td>/, //fastshare
                    /errorIcon">\s*<p><strong>(.+?)<br \/>/, //filefactory
                    /no_download_msg">\s*(.+?)<span/, //depositfiles
                    /(Takový soubor neexistuje. Je možné, že byl již smazán.)/, //quickshare
                    /file_info file_info_deleted">\s*<h1>(.+?)<\/h1>/, //filepost
                    /<br \/>\s*<p style="color:#000">(.+?)<\/p>\s*<\/center>/, //letitbit
                    /(?:error_div">|<\/h1><p>)<strong>(.+?)<\/strong>/, //share-rapid,quickshare
                    /class="red">(.+?)<(?:span|br)>/, //czshare, megashares
                    /class="wp640">\s*<h1 class="h1">(.+?)<\/h1>/, //uloz.to
                    /download_file">\s*<tr>\s*<td>(.+?)<\/td>/, //hotfile
                    /error\.gif" \/>\s*(.+?)\s*<\/div>/, //uploading.com
                    /not-found">\s*<p>(.+?)<\/p>/, //bayfiles
                    /(Your file could not be found. Please check the download link.)/, //stahnu.to
                    /error_msg">\s*(<h3>.+?<\/h3><ul>(.+?)<\/ul>)/, //edisk
                    /id="obsah">\s*<h2>(.+?)<\/h2>/, //euroshare
                    /error">\s*(?:<[bp]>)?\s*(.+?)<\/[bp]>/, //filesmonster, shragle, gigapeta
                    /center aC">\s*<h1>(.+?)<br \/>/, //uploaded.to
                    /icon_err">\s*<h1>(.+?)<\/h1>/, //filejungle
                    /Code: ER_NFF_\d+<\/h2>\s*(.+?)\s*<\/div>/, //netload
                    /(File has been removed due to Copyright Claim)/, //filerio
                    /<span style="color:red;" class="result-form">(.+?)<\/span>/, //safelinking
                    /(The file link that you requested is not valid.)/, //2shared
                    /#FF0000"><big>(.+?\s+.+?)<\/big>/, //jumbofiles
                    /error_msg_title">(.+?)<\/h3>/, //mediafire
                    /<span class="bold">(?:<br \/>)+(.+?)<\/span>/, //filebox
                    /err">(.+?)</, //speedy-share, will work for others
                    /message warning" style=".+?">\s+((?:.+?\s+)+?)<\/div>/, //cloudzer                   
                  ];
        var errorIdx = errorRegexs.length;
        
        var error = "Cause of error: <b>unknown</b>";
        var errorCandidate = "";
        while(errorIdx--)
        {
          var errorCandidate = res.match(errorRegexs[errorIdx]);
          if (errorCandidate != null)
          {
            error = "Cause of error: <b>" + errorCandidate[1].replace(/&nbsp;/g," ") + "</b>";
            break;
          }
        }
        
        //link attributes 
        link.warlc_error = error;       
        
        if (mouseoverLink == link.href) //mouse cursor is still over the link
        {
          warlcTooltip.innerHTML = error;
        }
      }
    });
  }
}

//"mouseover" event handler for alive links
//displays tooltip info (file size, file name,...) on alive links 
function displayTooltipInfo()
{
  mouseoverLink = this.href;
  
  //exclude direct download filehostings
  if (this.href.match(/(?:uloziste\.com|filemonster\.net|uploadbin\.net|adrive\.com|myupload\.dk|storage\.novoro\.net|ubuntuone.com)/))
  {
    return;
  }
  
  this.addEventListener("mouseout", hideTooltip);
  this.addEventListener("mousemove", function(event) { moveTooltip(event); });
  
  warlcTooltip.innerHTML = '<b>LOADING...</b>';
  warlcTooltip.style.minWidth = 0;
  warlcTooltip.style.visibility = "visible";
  
  if (this.warlc_tooltipcache) //file size is already known and stored in warlc_filename and warlc_filesize attributes
  {
    warlcTooltip.innerHTML = this.warlc_tooltipcache;
  }
  else
  {
    loadInfo(this);   
  }
  
  function loadInfo(link)
  {
    var href = link.href;
    href = href.replace(/.*rapidshare\.com\/files\/(\d+)\/(.+)/, 'http://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles&cbf=rapidshare_com&cbid=1&files=$1&filenames=$2');
    href = href.replace(/.*rapidshare\.com\/#!download\|\w+\|(\d+)\|([^|]+).*/, 'http://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles&cbf=rapidshare_com&cbid=1&files=$1&filenames=$2');
    
    GM_xmlhttpRequest({
      method: 'GET',
      url: href.replace(ANONYMIZE_SERVICE, ""),
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/xml',
        'Referer': ""
      },
      onload: function(result) {
          
        var res = result.responseText;
        //console.log(res)
        var nameRegexs =  [ /File Name: (.+?)<\/p>/, //filesmall
                    /(?:finfo|file[-_]?name)(?:"|')?>\s*?(.+?)<\/?(?:h1|a|b|div|span style|td)/, //hellshare, uploaded.to, netload, badongo, 4fastfile, luckyshare
                    /fl" title="(.+?)">/, //edisk
                    /Celý název: <a href="http:\/\/czshare.com\/\d+\/\w+\/">(.+?)<\/a>/, //czshare
                    /<title>\s*(?:Download)?\s*(.+?)\s*(?::: DataPort|\| Ulož|- Share\-Rapid|- WEBSITENAME|download Extabit|- download now for free|\| refile)/, //dataport, uloz.to, share-rapid, shragle, extabit, filefactory, refile.net
                    /<h3>Stahujete soubor: <\/h3>\s*<div class="textbox">(.+?)<\/div>/, //webshare
                    /<h3><b><span style=color:black;>(.+?)<\/b><\/h3><br>/, //fastshare
                    /title="download (.+?)">/, //sendspace
                    /Stáhnout soubor: (.+?)<\/h1>/, //quickshare
                    /fz24">Download:\s*<strong>(.+?)<\/strong>/, //crocko
                    /\w+:<\/b> (.+?)<\/h2>/, //filevelocity
                    /box_heading" style="text-align:center;">(.+?) - \d+/, //freakshare
                    /var filename = encodeURIComponent\('(.+?)'\);/, //depositfiles
                    /'file\-icon\d+ \w+'>(?:<\/span><span>)?(.+?)<\/span>/, //hitfile, turbobit
                    /d0FileName =  "(.+?)";/, //letitbit
                    /file(?:_name|-info)" title="">\w+: <span>(.+?)<\/span>/, //vip-file, shareflare
                    /download_file_title">(.+?)<\/div>/, //mediafire
                    /dl\-btn\-label"> (.+?) <\/div>/, //mediafire
                    /rapidshare_com\(1,"\d+,([^,]+)/, //rapidshare
                    /id="file_title">(.+?)<\/h1>/, //uploading.com
                    /recent-comments"><h2>(.+) &nbsp;/, //xdisk
                    /fname" value="(.+?)">/, //sharerun, syfiles, grupload, 
                    /download\-header">\s*<h2>File:<\/h2>\s*<p title="(.+?)">/, //bayfiles
                    /description">\s*<p><b>Soubor: (.+?)<\/b>/, //bezvadata
                    /Complete name                            : (.+?)<br \/>/, //bezvadata
                    /itemprop="name">(.+?)<\/span>/, //bezvadata
                    /Downloading:\s*<\/strong>\s*<a href="">\s*(.+?)\s*<\/a>/, //rapidgator
                    /(?:Downloading |<h1>)(.+?) \- \d+/, //bitshare, nitrobits
                    /Downloading:<\/strong> (.+?) <span>/, //hotfile
                    /<h1 class="black xxl" style="letter-spacing: -1px" title="(.+?)">/, //megashares
                    /Filename:<\/b>(?:<\/td><td nowrap>)?(.+?)(?:<br>|<\/td>)/, //billionuploads
                    /<span > (.+?) \(\d+.?\d+? \w+\)<\/span>/, //clipshouse
                    /File Download Area<\/center><\/h1><center><h3>(.+?)<\/h3>/, //filebeam
                    /<h2 class="float\-left">(.+?)<\/h2>/, //easyfilesharing
                    /<h1 id="file_name" class=".+?" title="(.+?)">/, //box.com
                    /file_info">\s+<h2><strong>(.+?)<\/strong>/, //fliiby
                    /dateiname'>(.+?)<\/h1>/, //file-upload.net
                    /Filename:<\/p>\s+<\/div>\s+<div class=".+?">\s+<p>\s+(.+?)\s+<\/p>/, //sharesix
                    /File Name:<\/dt>\s+<dd>(.+?)<\/dd>/, //gamefront
                    /<h2>Download File (.+?) <span id="span1">/, //jumbofiles.org
                    /dir="ltr">(.+?) <\/td>/, //unlimitshare.com
                    /nom_de_fichier">(.+?)<\/div>/, //uploadhero
                  ];
        var nameIdx = nameRegexs.length;
        
        
        //      [sizeRegexs]
        //      /    \    \?
        //   prefix (size) postfix
        //           /   \
        //          val  quant
        
        var quantRegex = '(?:M|G|K)?i?(?:B)(?:[y|i]te?s?)?';    
        var valRegex = '\\d+(?:[\\., ]\\d+){0,2}';        // 111([., ]222)?([., ]333)?
                
        var uniSizeRegex = valRegex + '(?:\\s*|&nbsp;)' + quantRegex;
        
        var preSizeRegex = '(?::|\\(|>|>, | - )';
        var postSizeRegex = '(?:\\))?';
        
        var sizeRegexs =  [  preSizeRegex + "\\s*(" + uniSizeRegex + ")\\s*" + postSizeRegex,
                    'rapidshare_com\\(1,"\\d+,[^,]+,(\\d+)', //rapidshare
                    'FileSize_master">(.+?)<\/strong>', //hellshare
                    'Velikost: <strong>(.+?)<\/strong>', //warserver
                    'File Size: (.+?)<\/p>', //filesmall
                  ];
        var sizeIdx = sizeRegexs.length;
        
        //
        //
        
        var tooltip = "File Name: <b>";
        
        var fileName = "unknown";
        var nameCandidate = "";
        while(nameIdx--)
        {
          var nameCandidate = res.match(nameRegexs[nameIdx]);
          if (nameCandidate != null)
          {
            fileName = nameCandidate[1].replace(/&nbsp;/g," ");
            break;
          }
        }
        
        tooltip += fileName + "</b><br>File Size:  <b>";
        
        var fileSize = "unknown";
        var sizeCandidate = "";
        while(sizeIdx--)
        {
          sizeCandidate = res.match(new RegExp(sizeRegexs[sizeIdx], "i"));
          if (sizeCandidate != null)
          {
            fileSize = sizeCandidate[1].replace(/&nbsp;/g," ");
            if (/^\d+$/.test(fileSize) && fileSize >= 1024)  //assume bytes
            {
              if(fileSize > (1<<30)) fileSize = Math.round(10 * fileSize / (1<<30)) / 10 + ' GB';
                else if(fileSize > (1<<20)) fileSize = Math.round(fileSize / (1<<20)) + ' MB';
                  else fileSize = Math.round(fileSize / 1024) + ' KB';
            }
            break;
          }
        }
        
        tooltip += fileSize + "</b>";
        
        // Safelinking package info
        if (href.match('safelinking.net/p/'))
        {
          var linkStatus = res.match(/<span style="color:green;" class="result-form">(.+?)<\/span>/);
          var linkTitle = res.match(/link\-title">(.+?)<\/span>/);
          var linkDesc = res.match(/description" class="result-form">(.+?)<\/span>/);
          if (linkStatus) { tooltip = "<b>Link status:</b> " + linkStatus[1].replace(/<\/?strong>/,"").replace(/<br\/>/, " "); }
          if (linkTitle) { tooltip += "<br><b>Title:</b> " + linkTitle[1]; }
          if (linkDesc) { tooltip += "<br><b>Description:</b> " + linkDesc[1]; }
        }
        
        // PROTOTYPE 
        // video thumbnails
        if (href.match('hellshare')) 
        {
          var thumbs;
          thumbs = res.match(/http:\/\/static\d+\.helldata\.com\/thumbs(?:\/\d+){1,2}\/\d{1,2}"/g);
          
          if (thumbs)
          {
            tooltip += '<br>';
            
            var j = Math.min(thumbs.length, 9);
            for (var i = 0; i < j; i++)
            {
              tooltip += '<img src="' + thumbs[i].replace('"',"") + '" width="' + TOOLTIP_THUMBWIDTH + 'px">';
            }
            
            warlcTooltip.style.minWidth = TOOLTIP_MAXWIDTH;
          }           
        }
        
        if (href.match('czshare'))
        {
          var thumbs;
          thumbs = res.match(/src="http:\/\/www(\d+)\.czshare\.com\/images_velke\/\d+\.(\d+)\.jpeg/);
          
          if (thumbs)
          {
            var thumbsServer = thumbs[1];
            var thumbsId = thumbs[2];
            
            tooltip += '<br>';
            for (var i = 1; i < 9; i++)
            {
              tooltip += '<img src="http://www' + thumbsServer + '.czshare.com/images_velke/' + i + '.' + thumbsId + '.jpeg" width="' + TOOLTIP_THUMBWIDTH + 'px">';
            }
            
            warlcTooltip.style.minWidth = TOOLTIP_MAXWIDTH;
          }           
        }
        
        if (href.match('bezvadata'))
        {
          var thumbs;
          thumbs = res.match(/http:\/\/nahledy\.bezvadata\.cz\/nahledy\/\d+\/\d+\/\d+_\d+_\d+x\d+_\w.jpg/g);
          
          if (thumbs)
          {
            tooltip += '<br>';
            
            var j = Math.min(thumbs.length, 9);
            for (var i = 0; i < j; i++)
            {
              tooltip += '<img src="' + thumbs[i] + '" width="' + TOOLTIP_THUMBWIDTH + 'px">';
            }
            
            warlcTooltip.style.minWidth = TOOLTIP_MAXWIDTH;
          }           
        }
        
        
        link.warlc_tooltipcache = tooltip;
        
        if (mouseoverLink == link.href) //mouse cursor is still over the link
        {
          warlcTooltip.innerHTML = tooltip;
        }     
      }
    });
  }
}

  function setVariables()
  {
    if (firstRun)
    {
      GM_log('First run, applying default settings...');
      
      GM_setValue("Icon_set",1);
      GM_setValue("Display_tooltip_info",false);
      GM_setValue("Show_black_background_in_DL_links",false);
      GM_setValue("Show_line_through_in_dead_links",false);
      GM_setValue("Display_full_links_in_link_containers",false);
      GM_setValue("Allow_spaces_in_DL_links",false);
      GM_setValue("Autocheck",true);
      GM_setValue("Do_not_linkify_DL_links",false);
      GM_setValue("Show_progress_stats",true);
      GM_setValue("Keyboard_functions",true);
      GM_setValue("Obsolete_file_hosts",false);
      GM_setValue("Color_DL_links",true);
      GM_setValue("Live_links_color","SpringGreen");
      GM_setValue("Dead_links_color","#FF3300");
      GM_setValue("Temp_unavailable_links_color","#F7EF09");
      GM_setValue("Container_links_color","DarkKhaki");
      GM_setValue("Ref_anonymize_service", "http://anonymz.com/?");
      
      GM_setValue("First_run", false);    
    }
    
    //hidden settings
    GM_setValue("Progress_box_pos_bottom", Progress_box_pos_bottom = GM_getValue("Progress_box_pos_bottom", 20));
    GM_setValue("Progress_box_pos_right", Progress_box_pos_right = GM_getValue("Progress_box_pos_right", 10));
    GM_setValue("Progress_box_opacity", Progress_box_opacity = GM_getValue("Progress_box_opacity", 85));
    GM_setValue("Progress_box_background_color", Progress_box_background_color = GM_getValue("Progress_box_background_color", 'DimGray'));
    GM_setValue("Progress_box_item_color", Progress_box_item_color = GM_getValue("Progress_box_item_color", '#FFFFCC'));
    GM_setValue("Progress_box_refresh_rate", Progress_box_refresh_rate = GM_getValue("Progress_box_refresh_rate", 2000));
    GM_setValue("Ref_anonymize_service", ANONYMIZE_SERVICE = GM_getValue("Ref_anonymize_service", "http://anonymz.com/?"));
    GM_setValue("Debug_mode", DEBUG_MODE = GM_getValue("Debug_mode", false));
    //hidden settings end

    Icon_set = GM_getValue("Icon_set", 1); //0 - no icons, 1 - cat paws, 2 - old RSLC style
    Display_tooltip_info = GM_getValue("Display_tooltip_info", false);
    Show_black_background_in_DL_links = GM_getValue("Show_black_background_in_DL_links", false);
    Show_line_through_in_dead_links = GM_getValue("Show_line_through_in_dead_links", false);
    Display_full_links_in_link_containers = GM_getValue("Display_full_links_in_link_containers", false);
    Allow_spaces_in_DL_links = GM_getValue("Allow_spaces_in_DL_links", false);
    Autocheck = GM_getValue("Autocheck", true);
    Do_not_linkify_DL_links = GM_getValue("Do_not_linkify_DL_links", false);
    Show_progress_stats = GM_getValue("Show_progress_stats", true);
    Keyboard_functions = GM_getValue("Keyboard_functions", true);
    Obsolete_file_hosts = GM_getValue("Obsolete_file_hosts", false);
    Color_DL_links = GM_getValue("Color_DL_links", true);
    Live_links_color = GM_getValue("Live_links_color", "SpringGreen");
    Dead_links_color = GM_getValue("Dead_links_color", "#FF3300");
    Temp_unavailable_links_color = GM_getValue("Temp_unavailable_links_color", "#F7EF09");
    Container_links_color = GM_getValue("Container_links_color", "DarkKhaki");
    Ref_anonymize_service = GM_getValue("Ref_anonymize_service", "http://anonymz.com/?");
  }


  // Delinkifies the links
  // params:
  // links -> list of links or link components (note they should be sufficiently unique to identify the link on page,
  // e.g. 'uloz.to/xs68skxl8')
  function delinkifySnapshot(snapshot)
  {
    var n = snapshot.snapshotLength;

    while (n--)
    {
      thisLink = snapshot.snapshotItem(n);

      var spanElm = document.createElement("span");
      spanElm.className = thisLink.className;
      spanElm.innerHTML = thisLink.innerHTML;

      if (Display_tooltip_info)
      {
        spanElm.href = thisLink.href;
            
        switch (thisLink.className){
        case "alive_link": spanElm.addEventListener("mouseover", displayTooltipInfo, false); break
        case "adead_link": spanElm.addEventListener("mouseover", displayTooltipError, false); break;
        case "obsolete_link": spanElm.addEventListener("mouseover", displayTooltipError, false); break;
        case "unava_link": //reserved
        default: 
        }
      }
      
      thisLink.parentNode.replaceChild(spanElm, thisLink);
    }
  }

  function processContainers()
  {
    var redirectorTypes = { "HTTP_302": 0, 
                "INNER_LINK": 1};
    
    var hostRestrictionRegex = "";

    //
    //HANDLING REDIRECTORS START
    //

    var redirectors = new Array();
    initRedirectors();

    var redirectorsCount = redirectors.length;

    if (redirectorsCount > 0)
    {
      var allRedirectorsRegex = "";

      //linkify redirector links
      for(var redirIdx = 0; redirIdx < redirectorsCount; redirIdx++)
      {
        allRedirectorsRegex += redirectors[redirIdx].linkRegex + "|";
      }
      allRedirectorsRegex = allRedirectorsRegex.replace(/\|$/, "");
      linkify(allRedirectorsRegex);
      //
      
      //process redirector links
      for(var redirIdx = 0; redirIdx < redirectorsCount; redirIdx++)
      {
        var redirectorsSnapshot = document.evaluate(redirectors[redirIdx].xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        redirectors[redirIdx].cTotal = redirectorsSnapshot.snapshotLength;

        cLinksTotal += redirectors[redirIdx].cTotal;
        var linkIdx = redirectors[redirIdx].cTotal;

        while(linkIdx--)
        {
          switch(redirectors[redirIdx].type)
          {
          case redirectorTypes.HTTP_302:      processRedirectorLink(redirectorsSnapshot.snapshotItem(linkIdx), redirIdx); break;
          case redirectorTypes.INNER_LINK:    processRedirectorLinkEx(redirectorsSnapshot.snapshotItem(linkIdx), redirIdx); break;
          default:
          }
        }
      }
      //
    }

    //HTTP_302 (Safelinking.net & keeplinks.me direct)
    var tries = 0;
    function processRedirectorLink(link, redirectorId)
    {
      link.className = 'container_link';
      if (link.href.match("safelinking")) { link.href = link.href.replace(/http:\/\//,"https://"); }
      GM_xmlhttpRequest({
        method: 'HEAD',
        url: link.href,
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'text/xml',
          'Referer': ""
        },
        onload: function(result) {
          if (result.status == 404) {
            if (result.finalUrl.match(/skydrive\.live\.com/)) return; 
            else {
            link.className = 'adead_link';
            redirectors[redirectorId].cProcessed++;
            cLinksProcessed++; cLinksDead++;
            //console.log(result);
            }
          } else if (result.finalUrl.replace("https", "http") == link.href || result.finalUrl == link.href) // service hasn't redirected anywhere
          {
            if (result.status == 404) {
              link.className = 'adead_link';
              redirectors[redirectorId].cProcessed++;
              cLinksProcessed++; cLinksDead++;
            } else if (tries < 25) {
              tries++;
              processRedirectorLink(link, redirectorId);
            } else if (tries >= 25) {
              cLinksProcessed++; cLinksUnava++;
              redirectors[redirectorId].cProcessed++;
              link.className = 'unava_link';
            }
          }         
          else
          {
            redirectors[redirectorId].cProcessed++;   
            if (Display_full_links_in_link_containers){
              link.innerHTML = result.finalUrl;
            }
            link.href = result.finalUrl;
            
            if (redirectors[redirectorId].cProcessed >= redirectors[redirectorId].cTotal){
            checkLinks('container_link');
            }
          }         
        },
        onerror: function(result) { //probably caused by unresponsive filehosting
          redirectors[redirectorId].cProcessed++;
          
          link.className = 'adead_link';
          cLinksProcessed++; cLinksDead++;
          
          if (redirectors[redirectorId].cProcessed >= redirectors[redirectorId].cTotal)
            checkLinks('container_link');
        }
      });
    }
    
    //INNER_LINK (Hotfile.com/links/)
    function processRedirectorLinkEx(link, redirectorId)
    {
      link.className = 'container_link';
          
      GM_xmlhttpRequest({
        method: 'GET',
        url: link.href,
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'text/xml',
          'Referer': ""
        },
        onload: function(result) {
          link.href = result.responseText.match(redirectors[redirectorId].innerLinkRegex)[1];
          
          redirectors[redirectorId].cProcessed++;
          
          if (redirectors[redirectorId].cProcessed >= redirectors[redirectorId].cTotal)
            checkLinks('container_link');
        }       
      });
    }

    containers_processed = true;

    function initRedirectors()
    {
      function addRedirector(linkRegex, xpathEx, redirType, innerLinkRegex)
      {
        var redirector = new Object();
        
        redirector.linkRegex = linkRegex;
        redirector.xpath = xpathEx;         //xpath expression
        redirector.cProcessed = 0;          //processed links count
        redirector.cTotal = 0;            //total links count
        redirector.type = redirType;        //redirectorTypes enum
        redirector.innerLinkRegex = innerLinkRegex; //innerLink, null if unused
        
        redirectors.push(redirector);
      }

      if (GM_getValue("Check_safelinking_dot_net_links", false))
      {
        addRedirector(
        'safelinking\\.net\/d\/\\w+',
        "//a[contains(@href,'safelinking.net/d/')]",
        redirectorTypes.HTTP_302,
        null);
      }
      
      if(GM_getValue("Check_keeplinks_dot_me_links", false))
      {
        addRedirector(
        'keeplinks\\.me\/d\/\\w+',
        "//a[contains(@href,'keeplinks.me/d/')]",
        redirectorTypes.HTTP_302,
        null);
      }
      
      if (GM_getValue("Check_hotfile_dot_com_links", false))
      {
        addRedirector(
        'hotfile\\.com\/links\/\\w+',
        "//a[contains(@href,'hotfile.com/links/')]",
        redirectorTypes.INNER_LINK,
        /id="url" class="textfield" value="(.+?)" onfocus/);
      }

    }

  }

  var bulkHosts = new Array();
  var bulkHostNames = new Array();
  
  function initBulkCheck()
  {
      
    /////////////////////////////
    // Inits filehost object
    /////////////////////////////
    // params :
    // hostName     --  [string]    host name (multiple domains separated with coma)
    // linkRegex    --  [string]    link regex 
    // xpath      --  [string]    xpath expression to detect the link objects with evaluate
    // blockSize    --  [integer]   max. number of links sent in one request, 50 if null
    // corrMatch    --  [regex]     link correction regex (match), applied prior to corrRepl
    // corrReplWhat   --  [regex]     link correction regex (replace)
    // corrReplWith   --  [string]    
    // splitSeparator --  [string]    POSTDATA links separator, "\r\n" if null
    //            
    // apiUrl     --  [string]    web linkchecker or API URL
    // postData     --  [string]    POSTDATA of xmlhttprequest
    // resLinkRegex   --  [regex]   
    // resLiveRegex   --  [regex]     matches substrings containing live links in the request response
    // resDeadRegex   --  [regex]     matches substrings containing dead links in the request response
    // resUnavaRegex  --  [regex]     matches substrings containing unava links in the request response
    // func       --  [function]    bulkcheck handler, genBulkCheck if null
    //
    //////////////////////////////
    function addHost(hostName, linkRegex, xpath, blockSize, corrMatch, corrReplWhat, corrReplWith, splitSeparator, 
              apiUrl, postData, resLinkRegex, resLiveRegex, resDeadRegex, resUnavaRegex, func)
    {
      var fileHost = new Object();

      fileHost.linkRegex = linkRegex;
      fileHost.linkRegexObject = new RegExp(linkRegex, "");
      fileHost.xpath = xpath;
      fileHost.cFound = 0; //found links counter
      fileHost.links = new Array(); //found links
      
      if (blockSize == null) 
      { 
        fileHost.blockSize = 50;  
      }
      else
      {
        fileHost.blockSize = blockSize;
      }
      
      fileHost.corrMatch = corrMatch; 
      fileHost.corrReplWhat = corrReplWhat; 
      fileHost.corrReplWith = corrReplWith;
      
      if (splitSeparator == null) 
      {
        fileHost.splitSeparator = "\r\n"; 
      }
      else
      {
        fileHost.splitSeparator = splitSeparator;
      }
      
      fileHost.apiUrl = apiUrl;
      fileHost.postData = postData;
      fileHost.resLinkRegex = resLinkRegex;
      fileHost.resLiveRegex = resLiveRegex;
      fileHost.resDeadRegex = resDeadRegex;
      fileHost.resUnavaRegex = resUnavaRegex;
      
      if (func == null)
      {
        fileHost.func = genBulkCheck;
      }
      else
      {
        fileHost.func = func;
      }
      
      bulkHosts.push(fileHost);
      
      var names = hostName.split(',');
      var i = names.length;
      while(i--)
      {
        bulkHostNames[names[i]] = fileHost;     
      }
      
    }
    
    var genType1 = [  "rodfile.com",    "downloadani.me", "filezpro.com",   "failai.lt",
              "ok2upload.com",  "rarefile.net",   "ovfile.com",   "faststream.in",
              "goldfile.eu",    "space4file.com", "vreer.com",    "uploadic.com", 
              "ddlstorage.com",   "filesabc.com",   "sharebeast.com", "uploadbaz.com",
              "180upload.com",  "filesbb.com",    "exfilehost.com", "ravishare.com",
              "asixfiles.com",  "zomgupload.com", "mlfat4arab.com", "movreel.com",
              "fileupup.com",   "share76.com",    "filemaze.ws",    "allbox4.com",
              "file4safe.com",  "upafile.com",    "rapidapk.com",   "davvas.com",
              "idup.in",      "novafile.com",   "longfiles.com",  "youwatch.org",
              "bitupload.com",  "fileband.com",   "speedvid.tv",    "sharerepo.com",
              "putshare.com",   "freestorage.ro", "sfshare.se",   "share.az",
              "imzupload.com",  "allmyvideos.net",  "movdivx.com",    "gorillavid.in",
              "banashare.com",  "vidto.me",     "filesline.com",  "upitus.net",
              "fastflv.com"];
            
    var genType2 = [  "prefiles.com",   "ufox.com",     "donevideo.com",  "upload-novalayer.com",
              "lumfile.com",    "filesega.com",   "mightyupload.com", "megafiles.se",
              "filestay.com",   "4savefile.com",  "daj.to",     "filesbomb.com",
              "upfile.biz",   "kupload.org",    "filedwon.com",   "filewinds.com",
              "uploadjet.net",  "zooupload.com",  "247upload.com",  "vidup.me",
              "fileza.net",   "verzend.be",   "arabloads.com",  "sharefilehost.com",
              "amonshare.com",  "filewe.com",   "zefile.com",   "medoupload.com",
              "filefolks.com",  "filedefend.com", "file-speed.com", "1st-files.com",
              "cyberlocker.ch", "fileduct.net",   "secureupload.eu",  "cometfiles.com",
              "uploading4u.eu", "fileuplo.de",    "rockdizfile.com",  "cloudnes.com",
              "upaj.pl",      "sinhro.net",   "fileking.co",    "hotfiles.ws",
              "ortofiles.com",  "blitzfiles.com", "hulkload.com",   "sharingmaster.com",
              "albafile.com",   "expressleech.com", "upshared.com",   "multifilestorage.com",
              "gbitfiles.com",  "zenload.com",    "filetug.com",    "exclusivefaile.com",
              "videozed.net",   "basicupload.com",  "sharesix.com",   "rapidfileshare.net",
              "saarie.com",   "netuploaded.com",  "igetfile.com",   "project-free-upload.com",
              "brutalsha.re",   "ifile.ws",     "vidbull.com",    "filecloud.ws",
              "putme.org",    "uplly.com",    "sendmyway.com",  "creafile.net",
              "unlimitshare.com", "speedshare.eu",  "uploadboy.com",  "bitload.it",
              "fiberstorage.net", "filesony.com",   "uploadhunt.com",
              "epicshare.net",  "clouds.to",    "boomupload.net", "fujifile.me",
              "fileopic.com",   "almmyz.com",
              "pandamemo.com",  "spicyfile.com",  "hugefiles.net",  "98file.com",
              "hyshare.com",    "filezy.net",   "filexb.com",
              "megacache.net",  "ezzfile.it",   "todayfile.com",  "lafiles.com",
              "megaload.it"];
    
    //xfilesharing 1.0
    function addGenericType1()
    {
      var i = genType1.length;
      
      while(i--)
      {
        if (GM_getValue("Check_" + genType1[i].replace(/\./g, "_dot_").replace(/-/g, "_dash_") + "_links", false))
        {
          var regexSafe = genType1[i].replace(/\./g, "\\.").replace(/-/g, "\\-");
          
          addHost(
            genType1[i].match(/[\w-]+/)[0], //hostname
            regexSafe + "\/\\w+", //linkregex
            "//a[contains(@href,'" + genType1[i] + "/')]", //xpath
            null, //blocksize
            new RegExp("(http:\/\/(?:|www\\.)" + regexSafe + "\/\\w+)",""), //corrmatch
            null, //corrreplwhat
            null, //corrreplwith
            null, //separator
            "http://www." + genType1[i] + "/checkfiles.html", //api url
            "op=checkfiles&process=Check+URLs&list=", //postdata
            new RegExp("(" + regexSafe + "\/\\w+)",""), //linkregex
            new RegExp("green'>http:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //liveregex
            new RegExp("red'>http:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //deadregex
            new RegExp("orange'>http:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //unavaregex
            null //function delegate
          )
        }
      }
    }
    
    //xfilesharing 2.0
    function addGenericType2()
    {
      var i = genType2.length;
      
      while(i--)
      {
        if (GM_getValue("Check_" + genType2[i].replace(/\./g, "_dot_").replace(/-/g, "_dash_") + "_links", false))
        {
          var regexSafe = genType2[i].replace(/\./g, "\\.").replace(/-/g, "\\-");
          
          addHost(
            genType2[i].match(/[\w-]+/)[0], //hostname
            regexSafe + "\/\\w+", //linkregex
            "//a[contains(@href,'" + genType2[i] + "/')]", //xpath
            null, //blocksize
            new RegExp("(http:\/\/(?:|www\\.)" + regexSafe + "\/\\w+)",""), //corrmatch
            null, //corrreplwhat
            null, //corrreplwith
            null, //separator
            "http://www." + genType2[i] + "/?op=checkfiles", //api url
            "op=checkfiles&process=Check+URLs&list=", //postdata
            new RegExp("(" + regexSafe + "\/\\w+)",""), //linkregex
            new RegExp(regexSafe + "\/\\w+.*?<\/td>\\s*<td style=\"color:green;","g"), //liveregex
            new RegExp(regexSafe + "\/\\w+.*?<\/td>\\s*<td style=\"color:red;","g"), //deadregex
            new RegExp(regexSafe + "\/\\w+.*?<\/td>\\s*<td style=\"color:orange;","g"), //unavaregex
            null //function delegate
          )
        }
      }
    }
    
    // TEMPLATE
    // if (GM_getValue("Check__dot_com_links", false))
    // {      
      // addHost(
        // "", //hostname
        // "", //linkregex
        // "//a[contains(@href,'.com/')]", //xpath
        // null, //blocksize
        // null, //corrmatch
        // null, //corrreplwhat
        // null, //corrreplwith
        // null, //separator
        // "", //api url
        // "", //postdata
        // /()/, //linkregex
        // //liveregex
        // //deadregex
        // //unavaregex
        // null //function delegate
      // )      
    // }  
    
    
    addGenericType1();
    addGenericType2();
    
    /*if (GM_getValue("Check_i_dash_filez_dot_com_links", false))
    { 
      addHost(
        "i-filez", //hostname
        "i-filez\\.com\/downloads\/i\/\\d+\/f\/", //linkregex
        "//a[contains(@href,'i-filez.com/downloads')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        "http://i-filez.com/checkfiles", //api url
        "send=Check&files=", //postdata
        /(downloads\/i\/\d+)/, //linkregex
        /http:\/\/i-filez\.com\/downloads\/i\/\d+\/f\/[\w\(\)\.]+<\/td><td><span class='active/g, //liveregex
        /http:\/\/i-filez\.com\/downloads\/i\/\d+\/f\/[\w\(\)\.]+<\/td><td><span class='notfound/g, //deadregex
        null, //unavaregex
        null //function delegate
      )       
    }*/
    
    if (GM_getValue("Check_myvdrive_dot_com_links", false))
    { 
      addHost(
        "myvdrive,fileserving", //hostname
        "(?:fileserving|myvdrive)\\.com\/files\/[\\w-]+", //linkregex
        "//a[contains(@href,'fileserving.com/files') or contains(@href,'myvdrive.com/files')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        "http://www.myvdrive.com/Public/linkchecker", //api url
        "links=", //postdata
        /(?:fileserving|myvdrive)\.com\/(files\/[\w-]+)/, //linkregex
        /icon_file_check_valid"><\/span>\s*http:\/\/www\.(?:fileserving|myvdrive)\.com\/files\/[\w-]+/g, //liveregex
        /icon_file_check_(?:removed|notvalid)"><\/span>\s*http:\/\/www\.(?:fileserving|myvdrive)\.com\/files\/[\w-]+/g, //deadregex
        null, //unavaregex
        null //function delegate
      )       
    }
    
    if (GM_getValue("Check_billionuploads_dot_com_links", false))
    { 
      addHost(
        "billionuploads,BillionUploads", //hostname
        "(?:billionuploads|BillionUploads)\\.com\/\\w+", //linkregex
        "//a[contains(@href,'billionuploads.com/') or contains(@href,'BillionUploads.com/')]", //xpath
        null, //blocksize
        /(http:\/\/(?:|www\.)billionuploads\.com\/\w+)/i, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        "http://billionuploads.com/checkfiles.html", //api url
        "op=checkfiles&process=Check+URLs&list=", //postdata
        /billionuploads\.com\/(\w+)/i, //linkregex
        /green'>http:\/\/(?:|www\.)billionuploads\.com\/\w+/gi, //liveregex
        /red'>http:\/\/(?:|www\.)billionuploads\.com\/\w+/gi, //deadregex
        /orange'>http:\/\/(?:|www\.)billionuploads\.com\/\w+/gi, //unavaregex
        null //function delegate
      )       
    }

    if (GM_getValue("Check_henchfile_dot_com_links", false))
    { 
      addHost(
        "henchfile,HenchFile", //hostname
        "(?:henchfile|HenchFile)\\.com\/\\w+", //linkregex
        "//a[contains(@href,'henchfile.com/') or contains (@href,'HenchFile.com/')]", //xpath
        null, //blocksize
        /(http:\/\/(?:|www\.)henchfile\.com\/\w+)/i, //corrmatch
        null, //corrreplwhat
        null, //corrreplwhit
        null, //separator
        "http://www.henchfile.com/?op=checkfiles", //api url
        "op=checkfiles&process=Check+URLs&list=", //postdata
        /henchfile\.com\/(\w+)/i, //linkregex
        /henchfile\.com\/\w+.*?<\/td><td style="color:green;">/g, //liveregex
        /henchfile\.com\/\w+.*?<\/td><td style="color:red;">/g, //deadregex
        /henchfile\.com\/\w+.*?<\/td><td style="color:orange;">/g, //unavaregex
        null //function delegate
      )       
    }
    
    if (GM_getValue("Check_sharefiles_dot_co_links", false))
    { 
      addHost(
        "sharefiles", //hostname
        "sharefiles\\.co\/\\w+", //linkregex
        "//a[contains(@href,'sharefiles.co/')]", //xpath
        null, //blocksize
        /(https?:\/\/(?:|www\.)sharefiles\.co\/\w+)/, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        "http://sharefiles.co/?op=checkfiles", //api url
        "op=checkfiles&process=Check+URLs&list=", //postdata
        /(sharefiles\.co\/\w+)/, //linkregex
        /green'>https?:\/\/(?:|www\.)sharefiles\.co\/\w+/g, //liveregex
        /red'>https?:\/\/(?:|www\.)sharefiles\.co\/\w+/g, //deadregex
        /orange'>https?:\/\/(?:|www\.)sharefiles\.co\/\w+/g, //unavaregex
        null //function delegate
      )       
    }
    
    if (GM_getValue("Check_ryushare_dot_com_links", false))
    { 
      addHost(
        "ryushare", //hostname
        "ryushare\\.com\/\\w+", //linkregex
        "//a[contains(@href,'ryushare.com/')]", //xpath
        null, //blocksize
        /(http:\/\/(?:|www\.)ryushare\.com\/\w+)/, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        "http://ryushare.com/checkfiles.python", //api url
        "op=checkfiles&process=Check+URLs&list=", //postdata
        /(ryushare\.com\/\w+)/, //linkregex
        /green'>http:\/\/(?:|www\.)ryushare\.com\/\w+/g, //liveregex
        /red'>http:\/\/(?:|www\.)ryushare\.com\/\w+/g, //deadregex
        /orange'>http:\/\/(?:|www\.)ryushare\.com\/\w+/g, //unavaregex
        null //function delegate
      )       
    }
    
    if (GM_getValue("Check_filepost_dot_com_links", false))
    {     
      addHost(
        "filepost,fp", //hostname
        "(?:filepost\\.com\/files|fp\\.io)\/\\w+", //linkregex
        "//a[contains(@href,'filepost.com/files/') or contains(@href,'fp.io/')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        "\n", //separator
        'http://filepost.com/files/checker/?JsHttpRequest=0-xml',
        'urls=',
        /\\\/files\\\/(\w+)/,
        />http:\\\/\\\/filepost\.com\\\/files\\\/\w+(?:[^>]+>){5}(?:\\n|\\t)+<span class=\\"v\\"/g,
        />http:\\\/\\\/filepost\.com\\\/files\\\/\w+(?:[^>]+>){5}(?:\\n|\\t)+<span class=\\"x\\"/g,
        null,
        null //function delegate
      )     
    }
    
    if (GM_getValue("Check_syfiles_dot_com_links", false))
    {     
      addHost(
        "syfiles,nutfile", //hostname
        "(?:syfiles|nutfile)\\.com\/\\w+", //linkregex
        "//a[contains(@href,'syfiles.com/') or contains(@href,'nutfile.com/')]", //xpath
        null, //blocksize
        /(http:\/\/(?:|www\.)(?:nutfile|syfiles)\.com\/\w+)/, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        'http://nutfile.com/?op=checkfiles',
        'op=checkfiles&process=&list=',
        /((?:nutfile|syfiles)\.com\/\w+)/,
        /\/(?:nutfile|syfiles)\.com\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
        /\/(?:nutfile|syfiles)\.com\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
        /\/(?:nutfile|syfiles)\.com\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
        null //function delegate
      )     
    }
    
    if (GM_getValue("Check_fiberupload_dot_net_links", false))
    {     
      addHost(
        "fiberupload", //hostname
        "fiberupload\\.(?:com|net)\/\\w+", //linkregex
        "//a[contains(@href,'fiberupload.')]", //xpath
        null, //blocksize
        /(http:\/\/(?:www\.|)fiberupload\.(?:com|net)\/\w+)/, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        'http://fiberupload.net/?op=checkfiles',
        'op=checkfiles&list=',
        /(fiberupload\.(?:com|net)\/\w+)/,
        /'green'>http:\/\/(?:www\.|)fiberupload\.(?:com|net)\/\w+/g,
        /'red'>http:\/\/(?:www\.|)fiberupload\.(?:com|net)\/\w+/g,
        /'orange'>http:\/\/(?:www\.|)fiberupload\.(?:com|net)\/\w+/g,
        null //function delegate
      )
    }
    
    if (GM_getValue("Check_filesflash_dot_com_links", false))
    {     
      addHost(
        "filesflash", //hostname
        "filesflash\\.com\/\\w+", //linkregex
        "//a[contains(@href,'filesflash.com')]", //xpath
        null, //blocksize
        null, //corrmatch
        /http:\/\//, //corrreplwhat
        '', //corrreplwith
        null, //separator
        'http://filesflash.com/checklinks.php',
        'submit=Go&links=',
        /(filesflash\.com\/\w+)/,
        /<td>filesflash\.com\/\w+<\/td>\s*<td>Available/g,
        /<td>filesflash\.com\/\w+<\/td>\s*<td>(?:Invalid|Deleted|Expired|Banned)?<\/td>/g,
        null,
        null //function delegate
      )     
    }
    
    if (GM_getValue("Check_jumbofiles_dot_com_links", false))
    { 
      addHost(
        "jumbofiles", //hostname
        "jumbofiles\\.com\/\\w+", //linkregex
        "//a[contains(@href,'jumbofiles.com/')]", //xpath
        null, //blocksize
        /(http:\/\/(?:|www\.)jumbofiles\.com\/\w+)/, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        "http://jumbofiles.com/checkfiles.html", //api url
        "op=checkfiles&process=Check+URLs&list=", //postdata
        /(jumbofiles\.com\/\w+)/, //linkregex
        /blue'>http:\/\/(?:|www\.)jumbofiles\.com\/\w+/g, //liveregex
        /red'>http:\/\/(?:|www\.)jumbofiles\.com\/\w+/g, //deadregex
        /orange'>http:\/\/(?:|www\.)jumbofiles\.com\/\w+/g, //unavaregex
        null //function delegate
      )       
    }
    
    if (GM_getValue("Check_edisk_dot_cz_links", false))
    {     
      addHost(
        "edisk", //hostname
        "(?:(?:muj|data)\\d*\\.|)edisk\\.(?:cz|sk|eu)\/(?:|(?:cz|sk|en|pl)\/)", //linkregex
        "//a[contains(@href,'edisk.')]", //xpath
        null, //blocksize
        null, //corrmatch
        /edisk\.\w{2}\/(?:|\w{2}\/)stahni/, //corrreplwhat
        'edisk.cz/stahni', //corrreplwith
        null, //separator
        'http://www.edisk.cz/zkontrolovat-odkazy',
        'submitBtn=Zkontrolovat&checkFiles=',
        /((?:download|stahn(?:i|out-soubor))\/\d+)/,
        /"ano"\/>\s*<\/td>\s*<td>\s*http:\/\/.+/g,
        /"ne"\/>\s*<\/td>\s*<td>\s*http:\/\/.+/g,
        null,
        null //function delegate
      )     
    }
    
    if (GM_getValue("Check_bezvadata_dot_cz_links", false))
    {     
      addHost(
        "bezvadata", //hostname
        "(?:beta\\.|)bezvadata\.cz\/stahnout\/\\d+\\w+", //linkregex
        "//a[contains(@href,'bezvadata.cz')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        'http://bezvadata.cz/nastroje/kontrola-odkazu?do=kontrolaOdkazuForm-submit',
        'zkontrolovat=Zkontrolovat&odkazy=',
        /(bezvadata\.cz\/stahnout\/\d+)/,
        /bezvadata\.cz\/stahnout\/.+?<\/td>\s*<td style="background-color: #d9ffb2/g,
        /bezvadata\.cz\/stahnout\/.+?<\/td>\s*<td style="background-color: #ffb2b2/g,
        null,
        null //function delegate
      )     
    }
    
    if (GM_getValue("Check_depositfiles_dot_com_links", false))
    {     
      addHost(
        "depositfiles,dfiles", //hostname
        "(?:depositfiles\\.com|dfiles\\.eu)\/(?:en\/|ru\/|de\/|es\/|pt\/|)files\/\\w+", //linkregex
        "//a[contains(@href,'depositfiles.com/') and contains(@href,'files') or contains(@href,'dfiles.eu/files/')]", //xpath
        100000, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        null,
        null,
        null,
        null,
        null,
        null,
        depositfilesBulkCheck //function delegate
      )     
    }
    
    if (GM_getValue("Check_videobb_dot_com_links", false))
    {     
      addHost(
        "videobb", //hostname
        "videobb\\.com\/(?:video\/|watch_video\\.php\\?v=)\\w+", //linkregex
        "//a[contains(@href,'videobb.com')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        'http://www.videobb.com/link_checker.php',
        'links=',
        /(videobb\.com\/(?:watch_video\.php\?v?=|video\/)\w+)/,
        /<td>http:\/\/(?:www\.|)videobb.com\/(?:watch_video\.php\?v?=|video\/)\w+<\/td>\s+<td>.+?<\/td>\s+<td>\d+:\d+<\/td>\s+<td>Available/g,
        /<td>http:\/\/(?:www\.|)videobb.com\/(?:watch_video\.php\?v?=|video\/)\w+<\/td>\s+<td>(?:|.+?)<\/td>\s+<td>N\/A<\/td>\s+<td>Not Available/g,
        null,
        null //function delegate
      )     
    }
    
    if (GM_getValue("Check_queenshare_dot_com_links", false))
    {
      addHost(
        "queenshare,10upload", //hostname
        "(?:queenshare|10upload)\\.com\/\\w+", //linkregex
        "//a[contains(@href,'queenshare.com/') or contains(@href,'10upload.com/')]", //xpath
        null, //blocksize
        /(http:\/\/(?:www\.|)(?:queenshare|10upload)\.com\/\w+)/, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        'http://www.queenshare.com/?op=checkfiles', //api url
        'op=checkfiles&process=Check+URLs&list=', //postdata
        /((?:queenshare|10upload)\.com\/\w+)/, //linkregex
        /(?:queenshare|10upload)\.com\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
        /(?:queenshare|10upload)\.com\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
        /(?:queenshare|10upload)\.com\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
        null //function delegate
      )
    }
    
    if (GM_getValue("Check_bitshare_dot_com_links", false))
    {       
      addHost(
        "bitshare", //hostname
        "bitshare\\.com\/(?:files\/|\\?f=)\\w+", //linkregex
        "//a[contains(@href,'bitshare.com')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        'http://bitshare.com/linkcheck.html',
        'submit=Check&links=',
        /(bitshare\.com\/(?:files\/|\?f=)\w+)/,
        /ru_2\.gif" \/>\s*<\/div>\s*<span style="font-size:14px;font-weight:bold;">.*?<\/span>\s*<\/p>\s*<p>\s*<a href="http:\/\/(?:www\.|)bitshare\.com\/(?:files\/|\?f=)\w+/g,
        /ru_3\.gif" \/>\s*<\/div>\s*<span style="font-size:14px;font-weight:bold;">.*?<\/span>\s*<\/p>\s*<p>\s*<a href="http:\/\/(?:www\.|)bitshare\.com\/(?:files\/|\?f=)\w+/g,
        /ru_1\.gif" \/>\s*<\/div>\s*<span style="font-size:14px;font-weight:bold;">.*?<\/span>\s*<\/p>\s*<p>\s*<a href="http:\/\/(?:www\.|)bitshare\.com\/(?:files\/|\?f=)\w+/g,
        null //function delegate
      )     
    }

    if (GM_getValue("Check_cramit_dot_in_links", false))
    {     
      addHost(
        "cramit,cramitin", //hostname
        "cramit(?:\\.in|in\\.(?:net|eu|us))\/", //linkregex
        "//a[contains(@href,'cramitin.') or contains(@href,'cramit.in')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        'http://cramit.in/checkfiles.html',
        'op=checkfiles&process=CHECK+URL%27S&list=',
        /(cramit(?:\.in|in\.(?:net|eu|us))\/\w+)/,
        /green>http:\/\/(?:www\.|)cramit(?:\.in|in\.(?:net|eu|us))\/\w+/g,
        /red'>http:\/\/(?:www\.|)cramit(?:\.in|in\.(?:net|eu|us))\/\w+/g,
        /orange'>http:\/\/(?:www\.|)cramit(?:\.in|in\.(?:net|eu|us))\/\w+/g,
        null //function delegate
      )     
    }
    
    if (GM_getValue("Check_filerio_dot_com_links", false))
    {     
      addHost(
        "filekeen,filerio", //hostname
        "file(?:keen|rio)\\.(?:com|in)\/\\w+", //linkregex
        "//a[contains(@href,'filekeen.com') or contains(@href,'filerio.')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        "\n", //separator
        'http://filerio.in/checkfiles.html',
        'op=checkfiles&process=Check+URLs&list=',
        /(file(?:keen|rio)\.(?:com|in)\/\w+)/,
        /green'>http:\/\/(?:www\.|)file(?:keen|rio)\.(?:com|in)\/\w+/g,
        /red'>http:\/\/(?:www\.|)file(?:keen|rio)\.(?:com|in)\/\w+/g,
        /orange'>http:\/\/(?:www\.|)file(?:keen|rio)\.(?:com|in)\/\w+/g,
        null //function delegate
      )     
    }
    
    if (GM_getValue("Check_share_dash_online_dot_biz_links", false))
    {     
      addHost(
        "share-online,egoshare", //hostname
        "(?:share-online\\.biz|egoshare\\.com)\/(?:dl\/|download\\.php\\?id=|\\?d=)\\w+", //linkregex
        "//a[contains(@href,'share-online.biz') or contains(@href,'egoshare.com')]", //xpath
        100, //blocksize
        /http:\/\/(?:www\.|)(?:share-online\.biz|egoshare\.com)\/(?:d(?:l\/|ownload\.php\?id=)|\?d=)(?:\d{1}\/|)(\w+)/, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        "\n", //separator
        'http://api.share-online.biz/linkcheck.php',
        'links=',
        /(\w+);(?:OK|NOTFOUND|DELETED)/,
        /(\w+);OK/g,
        /(\w+);(?:DELETED|NOTFOUND)/g, 
        null,
        null //function delegate
      )     
    }
        
    if (GM_getValue("Check_quickshare_dot_cz_links", false))
    {     
      addHost(
        "quickshare", //hostname
        "quickshare\\.cz\/stahnout-soubor\/\\d+", //linkregex
        "//a[contains(@href,'quickshare.cz')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        'http://www.quickshare.cz/nastroje/link-checker',
        'linky=',
        /quickshare\.cz\/stahnout-soubor\/(\d+(?::\w+)?)/,
        /quickshare\.cz\/stahnout-soubor\/\d+(?::[\w\-.+$!*\/()\[\]\',~%?:@#&=\\]+)?\s*<\/a><\/td><td><img src="\/img\/ok\.gif/g,
        /quickshare\.cz\/stahnout-soubor\/\d+(?::[\w\-.+$!*\/()\[\]\',~%?:@#&=\\]+)?\s*<\/td><td><img src="\/img\/nenalezeno\.gif/g, 
        null,
        null //function delegate
      )     
    }
    
    if (GM_getValue("Check_netload_dot_in_links", false))
    {     
      addHost(
        "netload", //hostname
        "netload\\.in\/datei\\w{10}", //linkregex
        "//a[contains(@href,'netload.in')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        "\n", //separator
        "http://api.netload.in/index.php?id=2", //api url
        "send=Absenden&links=", //postdata
        /(\w+);/, //linkregex
        /\w{10,};.+?;.+?;online/g, //liveregex
        /\w{10,};.+?;.+?;offline/g, //deadregex
        null, //unavaregex
        netloadBulkCheck //function delegate
      )     
    }
    
    if (GM_getValue("Check_hotfile_dot_com_links", false))
    {     
      addHost(
        "hotfile", //hostname
        "hotfile\\.com\/dl\/\\d+\/", //linkregex
        "//a[contains(@href,'hotfile.com')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        "\n", //separator
        "http://api.hotfile.com/?action=checklinks", //api url
        null, //postdata
        null, //linkregex
        null, //liveregex
        null, //deadregex
        null, //unavaregex
        hotfileBulkCheck //function delegate
      )     
    }
    
    if (GM_getValue("Check_rapidshare_dot_com_links", false))
    {     
      addHost(
        "rapidshare", //hostname
        "(?:|rs\\w*\\.)rapidshare\\.com\/(?:files\/\\d+\/|#!download\\|\\w+\\|\\d+\\|.+?\\|\\d+\\|\\d\\|\\d)", //linkregex
        "//a[contains(@href,'rapidshare.com/files') or contains(@href,'rapidshare.com/#!download|')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        "\n", //separator
        null, //api url
        null, //postdata
        null, //linkregex
        null, //liveregex
        null, //deadregex
        null, //unavaregex
        rapidshareBulkCheck //function delegate
      )     
    }
    
    if (GM_getValue("Check_filefactory_dot_com_links", false))
    {     
      addHost(
        "filefactory", //hostname
        "filefactory\\.com\/+file\/[a-z0-9]", //linkregex
        "//a[contains(@href,'filefactory.com')]", //xpath
        null, //blocksize
        null, //corrmatch
        /(?:www\.|)filefactory\.com\/+file/, //corrreplwhat
        'www.filefactory.com/file', //corrreplwith
        "\n", //separator
        "http://www.filefactory.com/tool/links.php", //api url
        "func=links&links=", //postdata
        /filefactory\.com\/(file\/\w+)/, //linkregex
        /<p>http:\/\/www\.filefactory\.com\/file\/\w+.+?<\/p>\s*<p class="hidden size">/g, //liveregex
        /<p>http:\/\/www\.filefactory\.com\/file\/\w+.+?<\/p>\s*<p class="errorResponse">/g, //deadregex
        null, //unavaregex
        null //function delegate
      )     
    }
    
    if (GM_getValue("Check_aavg_dot_net_links", false))
    {
      addHost(
        "aavg,aa,downdone", //hostname
        "(?:aavg\\.net|aa\\.vg|downdone\\.com)\/\\w+", //linkregex
        "//a[contains(@href,'aavg.net/') or contains(@href,'aa.vg/') or contains(@href,'downdone.com/')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        'http://downdone.com/?op=checkfiles',
        'op=checkfiles&process=Check+URLs&list=',
        /((?:aa\.vg|aavg\.net|downdone\.com)\/\w+)/,
        /(?:aa\.vg|aavg\.net|downdone\.com)\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
        /(?:aa\.vg|aavg\.net|downdone\.com)\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
        /(?:aa\.vg|aavg\.net|downdone\.com)\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
        null //function delegate
      )
    }
    
    if (GM_getValue("Check_videopremium_dot_net_links", false))
    {
      addHost(
        "videopremium", //hostname
        "videopremium\\.net\/\\w+", //linkregex
        "//a[contains(@href,'videopremium.net/')]", //xpath
        null, //blocksize
        /(http:\/\/(?:www\.|)videopremium\.net\/\w+)/, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        'http://videopremium.net/?op=checkfiles',
        'op=checkfiles&process=Check+URLs&list=',
        /(videopremium\.net\/\w+)/,
        /videopremium\.net\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
        /videopremium\.net\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
        /videopremium\.net\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
        null //function delegate
        
      )
    }
    
    if (GM_getValue("Check_eyesfile_dot_net_links", false))
    {     
      addHost(
        "eyesfile", //hostname
        "eyesfile\\.(?:c\\w{1,2}|net|org)\/\\w+", //linkregex
        "//a[contains(@href,'eyesfile.c') or contains(@href,'eyesfile.net/') or contains(@href,'eyesfile.org/')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        'http://www.eyesfile.ca/checkfiles.html',
        'op=checkfiles&process=Check+URLs&list=',
        /(eyesfile\.(?:c\w{1,2}|net|org)\/\w+)/,
        /green'>http:\/\/(?:www\.|)eyesfile\.(?:c\w{1,2}|net|org)\/\w+/g,
        /red'>http:\/\/(?:www\.|)eyesfile\.(?:c\w{1,2}|net|org)\/\w+/g,
        /orange'>http:\/\/(?:www\.|)eyesfile\.(?:c\w{1,2}|net|org)\/\w+/g,
        null //function delegate
      )     
    }
    
    if (GM_getValue("Check_restfile_dot_ca_links", false))
    { 
      addHost(
        "restfile,restfiles", //hostname
        "restfiles?\\.(?:\\w{2}|com)\/\\w+", //linkregex
        "//a[contains(@href,'restfile.') or contains(@href,'restfiles.com')]", //xpath
        null, //blocksize
        null, //corrmatch
        null, //corrreplwhat
        null, //corrreplwith
        null, //separator
        "http://www.restfiles.com/?op=checkfiles", //api url
        "op=checkfiles&process=Check+URLs&list=", //postdata
        /(restfiles?\.\w{2,3}\/\w+)/, //linkregex
        /green'>http:\/\/(?:|www\.)restfiles?\.\w{2,3}\/\w+/g, //liveregex
        /red'>http:\/\/(?:|www\.)restfiles?\.\w{2,3}\/\w+/g, //deadregex
        /orange'>http:\/\/(?:|www\.)restfiles?\.\w{2,3}\/\w+/g, //unavaregex
        null //function delegate
      )       
    }
      
    if (GM_getValue("Check_filekom_dot_com_links", false))
      { 
        addHost(
          "filekom,filemac", //hostname
          "file(?:kom|mac)\\.com\/\\w+", //linkregex
          "//a[contains(@href,'filekom.com/') or contains(@href,'filemac.com/')]", //xpath
          null, //blocksize
          /(http:\/\/(?:|www\.)file(?:kom|mac)\.com\/\w+)/, //corrmatch
          null, //corrreplwhat
          null, //corrreplwith
          null, //separator
          "http://filekom.com/checkfiles.html", //api url
          "op=checkfiles&process=Check+URLs&list=", //postdata
          /(file(?:kom|mac)\.com\/\w+)/, //linkregex
          /green'>http:\/\/(?:|www\.)file(?:kom|mac)\.com\/\w+/g, //liveregex
          /red'>http:\/\/(?:|www\.)file(?:kom|mac)\.com\/\w+/g, //deadregex
          /orange'>http:\/\/(?:|www\.)file(?:kom|mac)\.com\/\w+/g, //unavaregex
          null //function delegate
        )       
      }
      
      if (GM_getValue("Check_putshare_dot_net_links", false))
      {
        addHost(
          "putshare.net",
          "putshare\\.net\/files\/\\w+",
          "//a[contains(@href,'putshare.net/files/')]",
          null, //blocksize
          null, //corrmatch
          null, //corrreplwhat
          null, //corrreplwith
          null, //separator
          "http://www.putshare.net/tools/link-checker",
          "submit=Check+Links&task=doCheck&urls=",
          /(putshare\.net\/files\/\w+)/,
          /putshare\.net\/files\/\w+.*?<\/a>\s*\-\s*<font color="green"/g, //liveregex
          /putshare\.net\/files\/\w+.*?<\/a>\s*\-\s*<font color="red">/g, //deadregex
          /putshare\.net\/files\/\w+.*?<\/a>\s*\-\s*<font color="(?:orange|yellow)">/g, //unavaregex
          null
        )
      }
      
      if (GM_getValue("Check_nitrobits_dot_com_links", false))
      {
        addHost(
          "nitrobits",
          "nitrobits\\.com\/file\/\\w+",
          "//a[contains(@href,'nitrobits.com/file/')]",
          null, //blocksize
          null, //corrmatch
          null, //corrreplwhat
          null, //corrreplwith
          null, //separator
          "http://nitrobits.com/linkchecker.php",
          "submit=Check+Links&links=",
          /(nitrobits\.com\/file\/\w+)/,
          /nitrobits\.com\/file\/\w+.*?\s*<\/td>\s*<\w+.*?>\s*<span class="available/g, //liveregex
          /nitrobits\.com\/file\/\w+.*?\s*<\/td>\s*<\w+.*?>\s*<span class="dead/g, //deadregex
          /nitrobits\.com\/file\/\w+.*?\s*<\/td>\s*<\w+.*?>\s*<span class="unavailable/g, //unavaregex
          null
        )
      }
      
      if (GM_getValue("Check_uploading_dot_com_links", false))
      {
        addHost(
          "uploading",
          "http:\/\/(?:www\\.|)uploading\\.com\/(?:files\/)?\\w+",
          "//a[contains(@href,'/uploading.com/') or contains(@href,'www.uploading.com')]",
          500, //blocksize
          null, //corrmatch
          null, //corrreplwhat
          null, //corrreplwith
          null, //separator
          "http://uploading.com/filechecker?ajax",
          "urls=",
          /uploading\.com\\\/(\w+)/,
          /ok\\">\\n\\t\\t<span class=\\"num\\">\d+<\\\/span>\\n\\t\\t<i><\\\/i>\\n\\t\\t<div>\\n\\t\\t\\t<a href=\\"http:\\\/\\\/(?:www\.|)uploading\.com\\\/\w+/g,
          /failed\\">\\n\\t\\t<span class=\\"num\\">\d+<\\\/span>\\n\\t\\t<i><\\\/i>\\n\\t\\t<div>\\n\\t\\t\\t<a href=\\"http:\\\/\\\/(?:www\.|)uploading\.com\\\/\w+/g,
          null,
          uploadingBulkCheck
        )
      }
      
      if (GM_getValue("Check_extabit_dot_com_links", false))
      {
        addHost(
          "extabit",
          "(?:u\\d+\\.)?extabit\\.com\/file(?:\/|\_)\\w+",
          "//a[contains(@href,'extabit.com/')]",
          100, //blocksize
          null, //corrmatch
          /\?upld=1/, //corrreplwhat
          "", //corrreplwith
          null, //separator
          null,
          null,
          null,
          null,
          null,
          null,
          extabitBulkCheck
        )
      }
      
      if (GM_getValue("Check_megashares_dot_com_links", false))
      {
        var xpath = "//a[contains(@href,'megashares.com/')]";
        if (GM_getValue("Ignore_MS_samples", false)) {
          xpath = "//a[contains(@href,'megashares.com/') and not(contains(@href,'sample'))]";
        }
        addHost(
          "megashares",
          "(?:d\\d+\.|)megashares\.com\/(?:dl\/|(?:index\\.php\\?d\\d+|\\?d\\d+)=)\\w+",
          xpath,
          null, //blocksize
          null, //corrmatch
          null, //corrreplwhat
          null, //corrreplwith
          null, //separator
          "http://d01.megashares.com/checkit.php",
          "submit_links=Check+Links&check_links=",
          /(?:d\d+\.|)megashares\.com\/(?:dl\/|(?:index\.php\?d\d+|\?d\d+)=)(\w+)/,
          /(?:d\d+\.|)megashares\.com\/(?:dl\/|(?:index\.php\?d\d+|\?d\d+)=)\w+.*?\s*-\s*ok/g,
          /(?:d\d+\.|)megashares\.com\/(?:dl\/|(?:index\.php\?d\d+|\?d\d+)=)\w+.*?\s*-\s*invalid/g,
          null,
          null
        )
      }
      
      if (GM_getValue("Check_mega_dot_co_dot_nz_links", false))
      {
        addHost(
          "mega",
          "mega\\.co\\.nz\/#!\\w+",
          "//a[contains(@href,'mega.co.nz/')]",
          100000, //blocksize
          null, //corrmatch
          null, //corrreplwhat
          null, //corrreplwith
          null, //separator
          null,
          null,
          null,
          null,
          null,
          null,
          megaBulkCheck //function delegate
        )     
      }
      
      if (GM_getValue("Check_4up_dot_me_links", false))
      {
        addHost(
          "4up,4upfiles",
          "(?:4upfiles\\.com|4up\\.(?:me|im))\/\\w+",
          "//a[contains(@href,'4up.') or contains(@href,'4upfiles.com/')]",
          null, //blocksize
          null, //corrmatch
          null, //corrreplwhat
          null, //corrreplwith
          null, //separator
          "http://4upfiles.com/?op=checkfiles", //api url
          "op=checkfiles&process=Check+URLs&list=", //postdata
          /(4up(?:files)?\.(?:com|me|im)\/\w+)/, //linkregex
          /4up(?:files)?\.(?:com|me|im)\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
          /4up(?:files)?\.(?:com|me|im)\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
          /4up(?:files)?\.(?:com|me|im)\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
          null //function delegate
        )
      }
      
      if (GM_getValue("Check_fileparadox_dot_in_links", false))
      { 
        addHost(
          "fileparadox", //hostname
          "fileparadox\\.in\/\\w+", //linkregex
          "//a[contains(@href,'fileparadox.in/')]", //xpath
          null, //blocksize
          null, //corrmatch
          null, //corrreplwhat
          null, //corrreplwhit
          null, //separator
          "https://fileparadox.in/?op=checkfiles", //api url
          "op=checkfiles&process=Check+URLs&list=", //postdata
          /(fileparadox\.in\/\w+)/, //linkregex
          /fileparadox\.in\/\w+.*?<\/td><td style="color:green;">/g, //liveregex
          /fileparadox\.in\/\w+.*?<\/td><td style="color:red;">/g, //deadregex
          /fileparadox\.in\/\w+.*?<\/td><td style="color:orange;">/g, //unavaregex
          null //function delegate
        )       
      }
      
      if (GM_getValue("Check_uploadur_dot_com_links", false))
      {
        addHost(
          "uploadur",
          "uploadur\\.com\/files\/\\w+",
          "//a[contains(@href,'uploadur.com/')]",
          null, //blocksize
          null, //corrmatch
          null, //corrreplwhat
          null, //corrreplwith
          null, //separator
          "http://uploadur.com/link_checker",
          "task=doCheck&submit=Check+Links&urls=",
          /(uploadur\.com\/files\/\w+)/,
          /green">http:\/\/(?:|www\.)uploadur\.com\/files\/\w+/g, //liveregex
          /red">http:\/\/(?:|www\.)uploadur\.com\/files\/\w+/g, //deadregex
          /orange">http:\/\/(?:|www\.)uploadur\.com\/files\/\w+/g,
          null
        )
      }
      
      if (GM_getValue("Check_oteupload_dot_com_links", false))
      {
        addHost(
          "oteupload",
          "oteupload\\.com\/\\w+",
          "//a[contains(@href,'oteupload.com/')]",
          null,
          /(https?:\/\/(?:www\.)?oteupload\.com\/\w+)/,
          null,
          null,
          null,
          "https://www.oteupload.com/link-checker.php",
          "op=checkfiles&process=Check+URLs&list=",
          /(oteupload\.com\/\w+)/,
          /oteupload\.com\/\w+.*?<\/td><td style="color:green;">/g,
          /oteupload\.com\/\w+.*?<\/td><td style="color:red;">/g,
          /oteupload\.com\/\w+.*?<\/td><td style="color:orange;">/g,
          null //function delegate
        )
      }
      
      if (GM_getValue("Check_uploaded_dot_to_links", false))
      {
        addHost(
          "uploaded,ul",
          '(?:uploaded|ul)\\.(?:to|net)\/(?:files?\/|\\?(?:lang=\\w{2}&)?id=|folder\/)?(?!img|coupon)\\w+',
          "//a[contains(@href,'uploaded.net/') or contains(@href,'uploaded.to/') or contains(@href,'ul.to/')]",
          100000,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          uploadedBulkCheck
        )
      }
      
      if (GM_getValue("Check_cloudzer_dot_net_links", false))
      {
        addHost(
          "cloudzer,clz",
          '(?:cloudzer\\.net\/(?:file|\\d+)|clz\\.to)\/\\w+',
          "//a[contains(@href,'cloudzer.net/') or contains(@href,'clz.to/')]",
          100000,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          cloudzerBulkCheck
        )
      }
      
      if (GM_getValue("Check_tusfiles_dot_net_links", false))
      {     
        addHost(
          "tusfiles", //hostname
          "tusfiles\\.(?:com|net)\/\\w+", //linkregex
          "//a[contains(@href,'tusfiles.com/') or contains(@href,'tusfiles.net/')]", //xpath
          null, //blocksize
          /(http:\/\/(?:www\.|)tusfiles\.(?:com|net)\/\w+)/, //corrmatch
          null, //corrreplwhat
          null, //corrreplwith
          null, //separator
          'http://www.tusfiles.net/?op=checkfiles',
          'op=checkfiles&process=Check+URLs&list=',
          /(tusfiles\.(?:net|com)\/\w+)/,
          /tusfiles\.(?:net|com)\/\w+.*?<\/td>\s*<td style="color:green;">/g, //liveregex
          /tusfiles\.(?:net|com)\/\w+.*?<\/td>\s*<td style="color:red;">/g, //deadregex
          /tusfiles\.(?:net|com)\/\w+.*?<\/td>\s*<td style="color:orange;">/g, //unavaregex
          null //function delegate
        )     
      }
      
      if (GM_getValue("Check_junocloud_dot_me_links", false))
      {
        addHost(
          "junocloud",
          "junocloud\\.me\/\\w+",
          "//a[contains(@href,'junocloud.me/')]",
          null,
          null,
          null,
          null,
          null,
          "http://junocloud.me/checkfiles.html",
          "op=checkfiles&process=Check+URLs&list=",
          /(junocloud\.me\/\w+)/,
          /junocloud\.me\/\w+.*?<span style="color: green;/g,
          /junocloud\.me\/\w+.*?<span style="color: red;/g,
          /junocloud\.me\/\w+.*?<span style="color: orange;/g,
          null //function delegate
        )
      }
      
      if (GM_getValue("Check_flashdrive_dot_it_links", false))
      {
        addHost(
          "flashdrive",
          "flashdrive\\.(?:it|uk\\.com)\/\\w+",
          "//a[contains(@href,'flashdrive.it') or contains(@href,'flashdrive.uk.com/')]",
          null,
          null,
          null,
          null,
          null,
          "http://flashdrive.uk.com/?op=checkfiles",
          "op=checkfiles&process=Check+URLs&list=",
          /(flashdrive\.(?:it|uk\.com)\/\w+)/,
          /flashdrive\.(?:it|uk\.com)\/\w+.*?<\/td><td style="color:green;">/g,
          /flashdrive\.(?:it|uk\.com)\/\w+.*?<\/td><td style="color:red;">/g,
          /flashdrive\.(?:it|uk\.com)\/\w+.*?<\/td><td style="color:orange;">/g,
          null //function delegate
        )
      }
      
      if (GM_getValue("Check_rapidstation_dot_com_links", false))
      {
        addHost(
          "rapidstation",
          "rapidstation\\.com\/\\w+",
          "//a[contains(@href,'rapidstation.com/')]",
          null,
          null,
          null,
          null,
          null,
          "http://rapidstation.com/?op=checkfiles",
          "op=checkfiles&process=Check+URLs&list=",
          /(rapidstation\.com\/\w+)/,
          /rapidstation\.com\/\w+.*?<\/td><td style="color:green;">/g,
          /rapidstation\.com\/\w+.*?<\/td><td style="color:red;">/g,
          /rapidstation\.com\/\w+.*?<\/td><td style="color:orange;">/g,
          null //function delegate
        )
      }
      
      if (GM_getValue("Check_fileprohost_dot_com_links", false))
      {
        addHost(
          "fileprohost",
          "fileprohost\\.(?:com|me)\/\\w+",
          "//a[contains(@href,'fileprohost.me/') or contains(@href,'fileprohost.com/')]",
          null, //blocksize
          null, //corrmatch
          null, //corrreplwhat
          null, //corrreplwith
          null, //separator
          "http://www.fileprohost.me/?op=checkfiles", //api url
          "op=checkfiles&process=Check+URLs&list=", //postdata
          /(fileprohost\.(?:me|com)\/\w+)/, //linkregex
          /fileprohost\.(?:me|com)\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
          /fileprohost\.(?:me|com)\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
          /fileprohost\.(?:me|com)\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
          null //function delegate
        )
      }
      
      if (GM_getValue("Check_potload_dot_com_links", false))
      {
        addHost(
          "potload",
          "potload\\.com\/\\w+",
          "//a[contains(@href,'potload.com/')]",
          null,
          null,
          null,
          null,
          null,
          "http://potload.com/?op=checkfiles",
          "op=checkfiles&process=Check+URLs&list=",
          /(potload\.com\/\w+)/,
          /potload\.com\/\w+.*?<\/td><td style="color:green;">/g,
          /potload\.com\/\w+.*?<\/td><td style="color:red;">/g,
          /potload\.com\/\w+.*?<\/td><td style="color:orange;">/g,
          null //function delegate
        )
      }
      
      if (GM_getValue("Check_sube_dot_me_links", false))
      {
        addHost(
          "sube",
          "sube\\.me\/\\w+",
          "//a[contains(@href,'sube.me/')]",
          null,
          null,
          null,
          null,
          null,
          "http://sube.me/?op=checkfiles",
          "op=checkfiles&process=Check+URLs&list=",
          /(sube\.me\/\w+)/,
          /sube\.me\/\w+.*?<\/td><td style="color:green;">/g,
          /sube\.me\/\w+.*?<\/td><td style="color:red;">/g,
          /sube\.me\/\w+.*?<\/td><td style="color:orange;">/g,
          null //function delegate
        )
      }
      
      if (GM_getValue("Check_filewinds_dot_com_links", false))
      {
        addHost(
          "filewinds",
          "filewinds\\.com\/\\w+",
          "//a[contains(@href,'filewinds.com/')]",
          null,
          null,
          null,
          null,
          null,
          "http://filewinds.com/?op=checkfiles",
          "op=checkfiles&process=Check+URLs&list=",
          /(filewinds\.com\/\w+)/,
          /filewinds\.com\/\w+.*?<\/td><td style="color:green;">/g,
          /filewinds\.com\/\w+.*?<\/td><td style="color:red;">/g,
          /filewinds\.com\/\w+.*?<\/td><td style="color:orange;">/g,
          null //function delegate
        )
      }
      
      if (GM_getValue("Check_datei_dot_to_links", false))
      {
        addHost(
          "datei,sharebase",
          "(?:datei|sharebase)\\.to\/(?:datei\/|files\/|1,|\\?)\\w+",
          "//a[contains(@href,'datei.to/') or contains(@href,'sharebase.to/')]",
          100000,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          dateiToBulk
        )
      }
      
      if (GM_getValue("Check_akafile_dot_com_links", false))
      {
        addHost(
          "akafile",
          "akafile\\.com\/\\w+",
          "//a[contains(@href,'akafile.com/')]",
          null,
          null,
          null,
          null,
          null,
          "http://akafile.com/?op=checkfiles",
          "op=checkfiles&process=Check+URLs&list=",
          /(akafile\.com\/\w+)/,
          /akafile\.com\/\w+.*?<\/td><td style="color:green;">/g,
          /akafile\.com\/\w+.*?<\/td><td style="color:red;">/g,
          /akafile\.com\/\w+.*?<\/td><td style="color:orange;">/g,
          null //function delegate
        )
      }
      
      if (GM_getValue("Check_allmyfiles_dot_ca_links", false))
      {
        addHost(
          "allmyfiles",
          "allmyfiles\\.ca\/\\w+",
          "//a[contains(@href,'allmyfiles.ca/')]",
          null,
          null,
          null,
          null,
          null,
          "http://allmyfiles.ca/?op=checkfiles",
          "op=checkfiles&process=Check+URLs&list=",
          /(allmyfiles\.ca\/\w+)/,
          /allmyfiles\.ca\/\w+.*?<\/td><td style="color:green;">/g,
          /allmyfiles\.ca\/\w+.*?<\/td><td style="color:red;">/g,
          /allmyfiles\.ca\/\w+.*?<\/td><td style="color:orange;">/g,
          null //function delegate
        )
      }
      
      if (GM_getValue("Check_files2upload_dot_net_links", false))
      {
        addHost(
          "files2upload",
          "files2upload\\.net\/\\w+",
          "//a[contains(@href,'files2upload.net/')]",
          null,
          null,
          null,
          null,
          null,
          "http://files2upload.net/?op=checkfiles",
          "op=checkfiles&process=Check+URLs&list=",
          /(files2upload\.net\/\w+)/,
          /files2upload\.net\/\w+.*?<\/td><td style="color:green;">/g,
          /files2upload\.net\/\w+.*?<\/td><td style="color:red;">/g,
          /files2upload\.net\/\w+.*?<\/td><td style="color:orange;">/g,
          null //function delegate
        )
      }
      
      if (GM_getValue("Check_medafire_dot_net_links", false))
      {
        addHost(
          "medafire",
          "medafire\\.net\/(?:up\/)?\\w+",
          "//a[contains(@href,'medafire.net/')]",
          null,
          null,
          null,
          null,
          null,
          "http://medafire.net/?op=checkfiles",
          "op=checkfiles&process=Check+URLs&list=",
          /(medafire\.net\/(?:up\/)?\w+)/,
          /medafire\.net\/(?:up\/)?\w+.*?<\/td><td style="color:green;">/g,
          /medafire\.net\/(?:up\/)?\w+.*?<\/td><td style="color:red;">/g,
          /medafire\.net\/(?:up\/)?\w+.*?<\/td><td style="color:orange;">/g,
          null //function delegate
        )
      }
      if (GM_getValue("Check_batshare_dot_com_links", false))
      {
        addHost(
          "batshare",
          "batshare\\.com\/\\w+",
          "//a[contains(@href,'batshare.com/')]",
          null,
          null,
          null,
          null,
          null,
          "http://batshare.com/?op=checkfiles",
          "op=checkfiles&process=Check+URLs&list=",
          /(batshare\.com\/\w+)/,
          /green'>(?:<a target='_new' href=')?http:\/\/(?:www\.|)batshare\.com\/\w+/g,
          /red'>(?:<a target='_new' href=')?http:\/\/(?:www\.|)batshare\.com\/\w+/g,
          /orange'>(?:<a target='_new' href=')?http:\/\/(?:www\.|)batshare\.com\/\w+/g,
          null
        )
      }
      
    /////////////////////////////
    // Common function delegate to send links to get checked by host linkchecker
    /////////////////////////////
    // If you define a new delegate, you may use following properties
    // this.links       [array] array of strings (link blocks). The links in each block separated with host.splitSeparator.
    // this.apiUrl      [string] API or web linkchecker URL
    // this.postData    [string] POSTDATA for POST request
    // this.resLiveRegex  [regex] matches live substrings in the request response
    // this.resDeadRegex  [regex] matches dead substrings in the request response
    // this.resUnavaRegex   [regex] matches unava substrings in the request response (the regex is often null!)
    // 
    // this.resLinkRegex  [regex] matches links further passed to DisplayTheCheckedLinks
    //
    // See the code below for standard bulkcheck handling reference.
    //////////////////////////////
    function genBulkCheck()
    {
      var blockIdx = this.links.length;
      
      while (blockIdx--)
      {
        postRequest(this.apiUrl, this.postData, this.links[blockIdx], 
          this.resLinkRegex, this.resLiveRegex, this.resDeadRegex, this.resUnavaRegex);     
        
      }
      
      function postRequest(api, postData, links, linkRegex, liveRegex, deadRegex, unavaRegex)
      {
        GM_xmlhttpRequest(
        {
          method: 'POST',
          url: api,
          headers: {
            'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
            'Content-type': 'application/x-www-form-urlencoded',
            'Referer': api,
            'X-Requested-With': 'XMLHttpRequest'            
          },
          data: postData + encodeURIComponent(links),
          onload: function (result)
          {
            var res = result.responseText;
            
            //console.log(res);
            
            var i;

            var livelinks = res.match(liveRegex);
            var deadlinks = res.match(deadRegex);
            
            //console.log(livelinks);
            //console.log(deadlinks);
            
            if (livelinks != null)
            {
              i = livelinks.length - 1;
              do
              {
                livelinks[i] = livelinks[i].match(linkRegex)[1];
              }
              while (i--);
              DisplayTheCheckedLinks(livelinks, 'alive_link');
            }

            if (deadlinks != null)
            {
              i = deadlinks.length - 1;
              do
              {
                deadlinks[i] = deadlinks[i].match(linkRegex)[1];
              }
              while (i--);
              DisplayTheCheckedLinks(deadlinks, 'adead_link');
            }

            if (unavaRegex != null)
            {
              var unavalinks = res.match(unavaRegex)
              if (unavalinks)
              {
                i = unavalinks.length - 1;
                do
                {
                  unavalinks[i] = unavalinks[i].match(linkRegex)[1];
                }
                while (i--);
                DisplayTheCheckedLinks(unavalinks, 'unava_link');
              }
            }
          }
        });
        
      }
    }
    
    //specialized bulkchecking handlers follow
    function extabitBulkCheck()
    {
      var blockIdx = this.links.length;
      
      while (blockIdx--)
      {
        postRequest(this.links[blockIdx]);      
        
      }
      function postRequest(links)
      {
        GM_xmlhttpRequest(
        {
          method: 'POST',
          url: "http://extabit.com/linkchecker.jsp",
          headers: {
            'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
            'Content-type': 'application/x-www-form-urlencoded',
            'Referer': "http://extabit.com/linkchecker.jsp",
            'X-Requested-With': 'XMLHttpRequest'            
          },
          data: "url=" + encodeURIComponent(links),
          onload: function (result)
          {
            var res = result.responseText;
            
            if (res.match(/login_block">/)) {
              GM_xmlhttpRequest({
                method: 'POST',
                url: 'http://extabit.com/login.jsp',
                headers: {
                  'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
                  'Content-type': 'application/x-www-form-urlencoded',
                  'Referer': "http://extabit.com/linkchecker.jsp",
                  'X-Requested-With': 'XMLHttpRequest'            
                },
                data: 'remember=1&email=' + encodeURIComponent(EB_LOGIN[0]) + '&pass=' + encodeURIComponent(EB_LOGIN[1]),
                onload: function (result) {
                  postRequest(links);
                }
              });
            } else {
              var i;

              var livelinks = res.match(/extabit.com\/(?:file\/|)\w+.*?">\w+.*?<\/a><\/td>\s*<td class="status"><span class="status_green">OK<\/span>/g);
              var deadlinks = res.match(/extabit.com\/(?:file\/|)\w+.*?">\w+.*?<\/a><\/td>\s*<td class="status"><span class="status_red">(?:Removed|Deleted|Hidden)/g);
              var linkRegex = /extabit.com\/(?:file\/|)(\w+)/;
            
              if (livelinks != null)
              {
                i = livelinks.length - 1;
                do
                {
                  livelinks[i] = livelinks[i].match(linkRegex)[1];
                }
                while (i--);
                DisplayTheCheckedLinks(livelinks, 'alive_link');
              }

              if (deadlinks != null)
              {
                i = deadlinks.length - 1;
                do
                {
                  deadlinks[i] = deadlinks[i].match(linkRegex)[1];
                }
                while (i--);
                DisplayTheCheckedLinks(deadlinks, 'adead_link');
              }

              var unavalinks = res.match(/extabit.com\/(?:file\/|)\w+.*?">\w+.*?<\/a><\/td>\s*<td class="status"><span class="status_red">Unavailable<\/span>/g)
              if (unavalinks)
              {
                i = unavalinks.length - 1;
                do
                {
                  unavalinks[i] = unavalinks[i].match(linkRegex)[1];
                }
                while (i--);
              DisplayTheCheckedLinks(unavalinks, 'unava_link');
              }
            }
          }
        });
        
      }
    }
    
    function uploadingBulkCheck()
    {
      var blockIdx = this.links.length;
      
      while (blockIdx--)
      {
        postRequest(this.apiUrl, this.postData, this.links[blockIdx], 
          this.resLinkRegex, this.resLiveRegex, this.resDeadRegex, this.resUnavaRegex);     
        
      }
      
      function postRequest(api, postData, links, linkRegex, liveRegex, deadRegex, unavaRegex)
      {
        GM_xmlhttpRequest(
        {
          method: 'POST',
          url: api,
          headers: {
            'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
            'Content-type': 'application/x-www-form-urlencoded',
            'Referer': api,
            'X-Requested-With': 'XMLHttpRequest'            
          },
          data: postData + encodeURIComponent(links),
          onload: function (result)
          {
            var res = result.responseText;
            
            var i;

            var livelinks = res.match(liveRegex);
            var deadlinks = res.match(deadRegex);
            var allLinks = links.split("\r\n");
            for(i=0;i<allLinks.length;i++) {
              allLinks[i] = allLinks[i].match(/uploading\.com\/(?:files\/)?(\w+)/)[1];
            }
            
            if (livelinks != null)
            {
              i = livelinks.length - 1;
              do
              {
                livelinks[i] = livelinks[i].match(linkRegex)[1];
                allLinks.splice($.inArray(livelinks[i], allLinks), 1);
              }
              while (i--);
              DisplayTheCheckedLinks(livelinks, 'alive_link');
            }

            if (deadlinks != null)
            {
              i = deadlinks.length - 1;
              do
              {
                deadlinks[i] = deadlinks[i].match(linkRegex)[1];
                allLinks.splice($.inArray(deadlinks[i], allLinks), 1);
              }
              while (i--);
              DisplayTheCheckedLinks(deadlinks, 'adead_link');
            }
            
            if (allLinks.length > 0)
            {
              i = allLinks.length - 1;
              do
              {
                websiteCheck(allLinks[i]);
              }
              while (i--);
            }
          }
        });
        
      }
      
      function websiteCheck(link) {
        var realLink = "http://uploading.com/files/" + link;
        GM_xmlhttpRequest({
          method: 'GET',
          url: realLink,
          headers: {
            'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
            'Content-type': 'application/x-www-form-urlencoded',
            'Referer': realLink,
            'X-Requested-With': 'XMLHttpRequest'            
          },
          onload: function (result) {
            if (result.status == 503) websiteCheck(link);
            res = result.responseText;
            if (res.match(/file_error">/)) {
              DisplayTheCheckedLinks([link], 'adead_link');
            }
          }
        });
      }
    }
    
    function dateiToBulk()
    {
      var arr = this.links[0].split("\r\n");
      var data = "key=YYMHGBR9SFQA0ZWA&info=STATUS&datei=";
      var i = arr.length;
      
      while(i--)
      {
        var token = arr[i].match(/\.to\/(?:datei\/|files\/|1,|\?)(\w+)/)[1];
        postRequest(token);
      }
      
      function postRequest(token) {
        data += token;
        GM_xmlhttpRequest({
          method:"POST",
          url:"http://api.datei.to/",
          data:data,
          headers: {
            'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
            'Content-type': 'application/x-www-form-urlencoded',
            'Referer': ""
          },
          onload: function(result) {
            var res = result.responseText;
            if (res.indexOf("offline") > -1) {
              DisplayTheCheckedLinks([token],'adead_link');
            }
            else if (res.indexOf("online") > -1) {
              DisplayTheCheckedLinks([token], 'alive_link');
            }
          }
        });
      }
    }
    
    function uploadedBulkCheck()
    {
      var arr = this.links[0].split("\r\n");
      var data = "apikey=lhF2IeeprweDfu9ccWlxXVVypA5nA3EL";
      
      for (var i=0;i<arr.length;i++)
      {
        try {
          arr[i] = arr[i].match(/(?:uploaded|ul)\.(?:to|net)\/(?:files?\/|\?(?:lang=\w{2}&)?id=|folder)?(?!img|coupon)(\w+)/)[1];
        } catch (e) {
          console.log("Error in checking Uploaded: " + arr[i]);
        }
        data += "&id_"+i+"="+arr[i]; 
      }
      
      GM_xmlhttpRequest(
        {
          method: "POST",
          url: "http://uploaded.net/api/filemultiple",
          data: data,
          headers: {
            'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
            'Content-type': 'application/x-www-form-urlencoded',
            'Referer': ""
          },
          onload: function (result)
          {
            var res = result.responseText;
            
            var i;
            
            var livelinks = res.match(/online,\w+,/g);
            var deadlinks = res.match(/offline,\w+,/g);
            
            if (livelinks)
            {
              var i = livelinks.length - 1;
              do
              {
                livelinks[i] = livelinks[i].match(/,(\w+),/)[1];
              }
              while (i--);
              DisplayTheCheckedLinks(livelinks, 'alive_link');
            }
            
            if (deadlinks)
            {
              var i = deadlinks.length - 1;
              do
              {
                deadlinks[i] = deadlinks[i].match(/,(\w+),/)[1];
              }
              while (i--);
              DisplayTheCheckedLinks(deadlinks, 'adead_link');
            }
          }
        });
    }
    
    function cloudzerBulkCheck()
    {
      var arr = this.links[0].split("\r\n");
      var data = "apikey=mai1EN4Zieghey1QueGie7fei4eeh5ne";
      
      for (var i=0;i<arr.length;i++)
      {
        try {
          arr[i] = arr[i].match(/https?:\/\/(?:www\.)?(?:cloudzer\.net|clz\.to)\/(?:file\/)?(\w+)/)[1];
        } catch(e) {
          console.log("Error in checking cloudzer: ", arr[i]);
        }
        data += "&id_"+i+"="+arr[i]; 
      }
      
      GM_xmlhttpRequest(
        {
          method: "POST",
          url: "http://cloudzer.net/api/filemultiple",
          data: data,
          headers: {
            'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
            'Content-type': 'application/x-www-form-urlencoded',
            'Referer': ""
          },
          onload: function (result)
          {
            var res = result.responseText;
            //console.log(res);
            
            var i;
            
            var livelinks = res.match(/online,\w+,/g);
            var deadlinks = res.match(/offline,\w+,/g);
            
            if (livelinks)
            {
              var i = livelinks.length - 1;
              do
              {
                livelinks[i] = livelinks[i].match(/,(\w+),/)[1];
              }
              while (i--);
              DisplayTheCheckedLinks(livelinks, 'alive_link');
            }
            
            if (deadlinks)
            {
              var i = deadlinks.length - 1;
              do
              {
                deadlinks[i] = deadlinks[i].match(/,(\w+),/)[1];
              }
              while (i--);
              DisplayTheCheckedLinks(deadlinks, 'adead_link');
            }
          }
        });
    }
    
    function megaBulkCheck()
    {
      var arr = this.links[0].split("\r\n");
      var i = arr.length;
      var seqno = Math.floor(Math.random()*1000000000);
      
      while(i--)
      { 
        postRequest(arr[i]);        
      }
      
      function postRequest(megaLink)
      {   
        var id = megaLink.match(/mega\.co\.nz\/#!(\w+)!\w+/)[1];

        GM_xmlhttpRequest(
        {
          method: "POST",
          url: 'https://g.api.mega.co.nz/cs?id=' + seqno++,
          data: '[{"a":"g","p":"' + id + '","ssl": "1"}]',
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-Type': 'application/xml',
            'Referer': "https://mega.co.nz/"
          },
          onload: function (result)
          {
            var res = $.parseJSON(result.responseText.match(/\[(.+?)\]/)[1]);
            
            if ((typeof res == "number" && (res == -9 || res == -16 || res == -6)) || res.d) {
              DisplayTheCheckedLinks([id], 'adead_link');
            } else if (res.e == "ETEMPUNAVAIL") {
              DisplayTheCheckedLinks([id], 'unava_link');
            } else if (res.at) {
              DisplayTheCheckedLinks([id], 'alive_link');
            } else {
              console.log("Error in checking Mega.co.nz! Please notify devs.\r\nError code: " + result.responseText);
            }
          }
        });
      }
    }
    
    
    function netloadBulkCheck()
    {
      var blockIdx = this.links.length;

      while (blockIdx--)
      {
        postRequest(this.apiUrl, this.postData, this.links[blockIdx], 
          this.resLinkRegex, this.resLiveRegex, this.resDeadRegex, this.unavaRegex);      
        
      }
      
      function postRequest(api, postData, links, linkRegex, liveRegex, deadRegex, unavaRegex)
      {
        GM_xmlhttpRequest(
        {
          method: 'POST',
          url: api,
          headers: {
            'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
            'Content-type': 'application/x-www-form-urlencoded',
            'Referer': ""           
          },
          data: postData + encodeURIComponent(links),
          onload: function (result)
          {
            var res = result.responseText;
            
            //console.log(res);
            
            var i;

            var livelinks = res.match(liveRegex);
            var deadlinks = res.match(deadRegex);
            
            //console.log(livelinks);
            //console.log(deadlinks);
            
            if (livelinks != null)
            {
              i = livelinks.length - 1;
              do
              {
                recheckLink(livelinks[i].match(linkRegex)[1]);
              }
              while(i--);
            }

            if (deadlinks != null)
            {
              i = deadlinks.length - 1;
              do
              {
                deadlinks[i] = deadlinks[i].match(linkRegex)[1];
              }
              while (i--);
              DisplayTheCheckedLinks(deadlinks, 'adead_link');
            }
          }
        });       
      }
      
      function recheckLink(link)
      {
        var link = link;
        
        GM_xmlhttpRequest(
        {
          method: 'GET',
          url: 'http://netload.in/datei' + link + '.htm',
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Charset': 'windows-1250,utf-8;q=0.7,*;q=0.7',
            'Referer': ""
          },
          onload: function (result)
          {
            var res = result.responseText;

            if (res.match(/dl_first_file_download">|download_limit\.gif/))
            {
              DisplayTheCheckedLinks([link], 'alive_link');
              return;
            }

            if (res.match(/achtung\.jpg"/))
            {
              DisplayTheCheckedLinks([link], 'adead_link');
            }
          },
          onerror: function ()
          {
            displayTheCheckedLink(link, 'unava_link');
          }
        });
      }
    }
    
    function rapidshareBulkCheck()
    {
      var rsBlock = this.links.length - 1;
      do //while(allLength--);
      {
        var LinksTodo = this.links[rsBlock].split("\n");

        if (LinksTodo.length < 1)
        {
          return false;
        }

        var fileids = "";
        var filenames = "";
        for (x in LinksTodo)
        {
          var eintrag = LinksTodo[x];
          var logregex;
          if (eintrag.indexOf("#!download") > -1) {
            logregex = /#!download\|\w+\|(\d+)\|(.*?)\|/;
          } else {
            logregex = /files\/(\d{5,})\/(\S*)/;
          }
          var teile = logregex.exec(eintrag);
          if ((null != teile) && (null != teile[1]) && (null != teile[2]) && (teile[1] != '') && (teile[2] != ''))
          {
            fileids += "," + teile[1];
            filenames += "," + teile[2];
          }
        }
        fileids = fileids.substr(1);
        filenames = filenames.substr(1);
        filenames = filenames.replace(/\&/g, '%26');
        
        var apirapidshareurl = "https://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles&files=" + fileids + "&filenames=" + filenames + "&cbf=RSAPIDispatcher&cbid=3";
        
        
        GM_xmlhttpRequest(
        {
          method: "GET",
          url: apirapidshareurl,
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'text/html',
            'Referer': ""           
          },
          onload: function (result)
          {
            var res = result.responseText;
                        
            res = res.replace(/\\n/g, "\n");

            var i;
            var rsRegex = /(fileid|\d{5,}),/;
            var fileRegex = /\d{5,},(.*?),\d+/;

            var livelinks = res.match(/\d{5,},.*?,\d+,\w*,(?:1|3|51),/g);
            var deadlinks = res.match(/\d{5,},.*?,\d+,\w*,(?:0|4|5|59),/g)

            if (deadlinks)
            {
              i = deadlinks.length - 1;
              do
              {
                deadlinks[i] = deadlinks[i].match(rsRegex)[1];
              }
              while (i--);

              DisplayTheCheckedLinks(deadlinks, 'adead_link');
            }
            if (livelinks)
            {
              //var filenames = [];
              i = livelinks.length - 1;
              do
              {
                //filenames[i] = livelinks[i].match(fileRegex)[1];
                livelinks[i] = livelinks[i].match(rsRegex)[1];
                //recheckLink(livelinks[i], filenames[i]);
              }
              while (i--);
              
              DisplayTheCheckedLinks(livelinks, 'alive_link');
            }
          }
        });
      }
      while (rsBlock--);
      
      function recheckLink(link, file)
      {
        url = "https://rapidshare.com/files/" + link + "/" + file;
        GM_xmlhttpRequest(
        {
          method: 'GET',
          url: url,
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Charset': 'windows-1250,utf-8;q=0.7,*;q=0.7',
            'Referer': ""
          },
          onload: function (result)
          {
            var res = result.responseText;

            if (res.match(/ERROR: (?:Download permission denied by uploader\. \(0b67c2f5\)|This file can't be downloaded, because it has been deleted by the owner\. \(30e16ccf\))/))
            {
              DisplayTheCheckedLinks([link], 'adead_link');
              return;
            } else {
              DisplayTheCheckedLinks([link], 'alive_link');
            }
          },
          onerror: function ()
          {
            displayTheCheckedLink(link, 'unava_link');
          }
        });
      }
    }
    
    function hotfileBulkCheck()
    {
      var blockIdx = this.links.length;
      
      while (blockIdx--)
      {
        var arr = this.links[blockIdx].split("\n");
        var i = arr.length;
        var tokens;
        
        var ids = new Array();
        var keys = new Array();
        
        while (i--)
        {
          tokens = arr[i].match(/hotfile\.com\/dl\/(\d+)\/(\w+)/);
          
          if (tokens)
          {
            ids.push(tokens[1]);
            keys.push(tokens[2]);
          }
        }
        
        //submit urlencoded links to get checked by linkchecking service
        GM_xmlhttpRequest(
        {
          method: 'POST',
          url: this.apiUrl,
          headers: {
            'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
            'Content-type': 'application/x-www-form-urlencoded',
            'Referer': ""
          },
          data: 'ids=' + ids.join(',') + '&keys=' + keys.join(','),
          onload: function (result)
          {
            var res = result.responseText;

            var i;

            var livelinks = res.match(/\d+,[12],/g);
            var deadlinks = res.match(/\d+,0,/g);

            if (livelinks != null)
            {
              i = livelinks.length - 1;
              do
              {
                livelinks[i] = "/dl/" + livelinks[i].match(/\d+/);
              }
              while (i--);
              DisplayTheCheckedLinks(livelinks, 'alive_link');
            }

            if (deadlinks != null)
            {
              i = deadlinks.length - 1;
              do
              {
                deadlinks[i] = "/dl/" + deadlinks[i].match(/\d+/);
              }
              while (i--);
              DisplayTheCheckedLinks(deadlinks, 'adead_link');
            }
          }
        });
      }
    }

    function depositfilesBulkCheck()
    {
      var arr = this.links[0].split("\r\n");
      var i = arr.length;
      
      while(i--)
      { 
        postRequest(arr[i]);        
      }
      
      function postRequest(dfLink)
      {   
        var id = dfLink.match(/(?:depositfiles\.com|dfiles\.eu)\/(?:en\/|ru\/|de\/|es\/|pt\/|)files\/(\w+)/)[1];

        GM_xmlhttpRequest(
        {
          method: "POST",
          url: 'http://depositfiles.com/api/get_download_info.php?id=' + id + "&format=json",
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': ""
          },
          onload: function (result)
          {
            var res = result.responseText;
            
            if (res == "") {
              postRequest(dfLink);
            }
            
            if (res.match(/"(?:no_file|file_ban)"/))
            {
              DisplayTheCheckedLinks(["files/" + id], 'adead_link');
              return;
            }

            if (res.match('"download_li(?:nk|mit)|password_check"'))
            {
              DisplayTheCheckedLinks(["files/" + id], 'alive_link');
            }
          }
        });
      }
    }
        
    
    /**
     * Displays check result
     * @param {Array} Array of links or link fragments.
     * @param {String} Check result status -> ['alive_link'|'adead_link'|'unava_link'|'obsolete_link']
     */
    function DisplayTheCheckedLinks(links, resultStatus)
    {
      //(a[href*=link_1], a[href*=link_2], ..., a[href*=link_n])
      
      //console.log(links);
      
      var $links = $('a[href*="' + links.join('"], a[href*="') + '"]');
      
      //console.log($links);
      
      if (Do_not_linkify_DL_links)
      { //TODO into separate jQuery function
        $links.replaceWith(function(){
          return '<span href="' + this.href + '">' + $(this).text() + '</span>';
        });
        
        $links = $('span[href*="' + links.join('"], span[href*="') + '"]');
      }
      
      $links.removeClass().addClass(resultStatus);
      if (ANONYMIZE_SERVICE == "NoRed") { ANONYMIZE_SERVICE = ""; }
      $links.each(function() {
        this.href = ANONYMIZE_SERVICE + $(this).attr("href");
      });
      
      switch(resultStatus)
      {
        case "alive_link":    cLinksAlive += $links.length; 
                    if (Display_tooltip_info) $links.mouseover(displayTooltipInfo);
                    break;
        case "adead_link":    cLinksDead += $links.length; 
                    if (Display_tooltip_info) $links.mouseover(displayTooltipError);
                    break;
        case "obsolete_link": cLinksDead += $links.length;
                    if (Display_tooltip_info) $links.mouseover(displayTooltipError);
                    break;
        case "unava_link":    cLinksUnava += $links.length; break;
        default: 
      }   
      
      cLinksProcessed += $links.length;
    }
  }
  
  // starts bulkchecking
  //
  // params
  // filterId   [string] restricts link detection with passed id attribute
  function startBulkCheck(filterId)
  {
    var cHosts = bulkHosts.length;
    
    if (cHosts == 0) //no filehostings selected
      return;   
    
    // STEP 1 linkify the links
    var linkifyRegex = '';
    var hostIdx = cHosts;
    while(hostIdx--)
    {
      linkifyRegex += bulkHosts[hostIdx].linkRegex + "|";
    }
    linkifyRegex = linkifyRegex.replace(/\|$/, '');
    linkify(linkifyRegex);
    //    
    
    //STEP 2 detect link objects
    var xpathAll = '';
    
    var hostIdx = cHosts;
    while(hostIdx--)
    {
      xpathAll += bulkHosts[hostIdx].xpath + "|";
    } 
    
    xpathAll = xpathAll.replace(/\]\|\/\/a\[/g, " or ");
    xpathAll = xpathAll.replace(/\]\|/, ')]');
        
    if (filterId != null) //insert id restriction in the xpath
    {
      xpathAll = xpathAll.replace(/\[/, "[@class='" + filterId + "' and (");
    }     
    else
    {
      xpathAll = xpathAll.replace(/\[/, "[((not(@class)) or (@class!='alive_link' and @class!='adead_link' and @class!='unava_link' and @class!='obsolete_link')) and (");
    }
    
    // GM_log(filterId);
    // GM_log(xpathAll);
    
    var links = document.evaluate(xpathAll, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    if (filterId == null)
    {
      cLinksTotal += links.snapshotLength;
    }   
    //
    
    //STEP 3 bind links with hostings 
    var linkIdx = links.snapshotLength;
    var href = null;
    
    if (linkIdx == 0) // no links found
      return;
    
    var name;
    while (linkIdx--)
    {
      href = links.snapshotItem(linkIdx).href; 
      
      try // DO NOT REMOVE, filters crap that went through xpath detection
      {
        name = gimmeHostName(href);
        if (href.match(bulkHostNames[name].linkRegexObject) != null)
          bulkHostNames[name].links.push(href);
      }
      catch(e)
      {
        // GM_log(href);
        // GM_log(gimmeHostName(href));
        // GM_log(e.message);
      }
    }
    //
    
    
    //STEP 4 process the links for each filehosting
    var hostIdx = cHosts;
    var host;
    var m,n;
    var arr;
        
    while (hostIdx--)
    {
      host = bulkHosts[hostIdx];
      arr = host.links;
      
      if (arr.length == 0) //no links for this hosting, skip
      {
        continue;
      }
      
      //links match corrections
      if (host.corrMatch != null)
      {
        //console.log(host.corrMatch)
        var idx = arr.length;
        while (idx--)
        {
          arr[idx] = arr[idx].match(host.corrMatch)[1];         
        }
      }
      
      //links replace corrections
      if ((host.corrReplWhat != null) && (host.corrReplWith != null))
      {
        var idx = arr.length;
        while (idx--)
        {
          arr[idx] = arr[idx].replace(host.corrReplWhat, host.corrReplWith);
        }
      }     
      
      m = arr.length;
      n = host.blockSize;
      if (m > n)
      {
        //insert block separators (RAND_STRING) into the array
        for(var i = n; i < m; i += n + 1)
        {
          arr.splice(i, 0, RAND_STRING);
        }
      } 
      
      // GM_log(arr.join(host.splitSeparator).split(RAND_STRING));
      // GM_log(host.func.toString());
      
      host.func.call({  links:      arr.join(host.splitSeparator).split(RAND_STRING),
                apiUrl:     host.apiUrl, 
                postData:     host.postData, 
                resLinkRegex: host.resLinkRegex, 
                resLiveRegex: host.resLiveRegex, 
                resDeadRegex: host.resDeadRegex, 
                resUnavaRegex:  host.resUnavaRegex
              });   
      
      
      //clean up
      arr.length = 0;             
    }   
    //  

    function gimmeHostName(link)
    {
      if (link.match(/putshare\.net/) > null) {
        return "putshare.net";
      } else if (link.match("checkfiles") != null) {
        return "checkfiles";
      } else { 
        return link.replace(/https?:\/\/.*?http(s)?:\/\//, "http$1://").match(/https?:\/\/(?:www\.|[\w\.])*?([\w-]+)\.(?:co\.(?:uk|nz)|\w+)\//)[1];
      }
    }
    
  }
  
  
  function checkLinks(filterId)
  {
    startBulkCheck(filterId);
    start(filterId);
  }

  /**
   * Initialises progress box including event binding and CSS 
   */
  function initProgressBox()
  {
    if ($("#warlc-progressbox").length > 0)
      return;
    
    //progressbox css
    GM_addStyle("#warlc-progressbox  {position:fixed; background:" + Progress_box_background_color +
          "; opacity:" + (Progress_box_opacity / 100) + 
          "; bottom:" + Progress_box_pos_bottom +
          "px; right:" + Progress_box_pos_right +
          "px; padding:5px; font-size:10px; font-weight:bold; cursor:default;}\
          \
          .warlc-progressbar {text-align:center; color: dimGrey; height:2px; margin-bottom:2px;}\
          \
          .warlc-progressitem {}\
          \
          .alive {color: " + Live_links_color + 
          "; background:transparent url(" + alive_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;} .dead {color:" + Dead_links_color +
          "; background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;} .unava {color: " + Temp_unavailable_links_color + 
          "; background:transparent url(" + unava_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;} .processing {color: " + Container_links_color + 
          "; background:transparent url(" + processing_link_gif + ") no-repeat scroll 100% 50%;padding-right:15px;}"
          );
    //
        
    $('body').append('  <div id="warlc-progressbox">\
              <div class="warlc-progressbar"></div>\
              <span class="warlc-progressitem alive"></span> - \
              <span class="warlc-progressitem dead"></span> - \
              <span class="warlc-progressitem unava"></span> - \
              <span class="warlc-progressitem processing"></span>\
              </div>'); 
    
    $('#warlc-progressbox').hide().click(function(){
                        clearInterval(intervalId); 
                        $(this).hide(); 
                        return false;
                      });
    
    $(".warlc-progressbar").progressbar({complete: function(){
                        $(this).fadeOut();
                        clearInterval(intervalId); //stop refreshing the stats
                        } 
                      })
                .one('progressbarchange', function(){$('#warlc-progressbox').show();});
    
  }
  
  /**
   * Updates progress data in progress box
   */
  function updateProgress()
  {
    if (cLinksTotal) // some links were detected on page
    {
      var percProgress = Math.round(((100 / cLinksTotal) * cLinksProcessed));
      var $progressItems = $('#warlc-progressbox > .warlc-progressitem');
      
      $(".warlc-progressbar").progressbar('option', 'value', percProgress);
        
      $progressItems.first().text(cLinksAlive)
              .next().text(cLinksDead)
              .next().text(cLinksUnava)
              .next().text(cLinksTotal - cLinksProcessed);      
    } 
  }
  
  

  function check_all_links()
  {
    add_WARLC_style();

    if (Show_progress_stats)
    {
      initProgressBox();      
      intervalId = setInterval(function(){updateProgress();}, Progress_box_refresh_rate);
    }

    startBulkCheck(null);
    start(null);

    if (!containers_processed)
    {
      processContainers();
    }
    
  }

  //Copies all found dead links to clipboard - right now for Scriptish only
  function copy_dead_to_clipboard()
  {
    initClipBoardTools();

    var deadlinksxpath = "//.[@class='adead_link']";

    var foundlinks = document.evaluate(deadlinksxpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var foundlinkstext = '';

    var foundlinkIdx = foundlinks.snapshotLength;

    while(foundlinkIdx--)
    {
      if (foundlinks.snapshotItem(foundlinkIdx).innerHTML != ' x')
        foundlinkstext += foundlinks.snapshotItem(foundlinkIdx).innerHTML.replace(/\[\/hide:\w+\]/,"") + '\n';
    }

    unsafeWindow.copyToClipboard(foundlinkstext);
  }

  function toggle_autocheck()
  {
    var currentState = GM_getValue("Autocheck", false);
    GM_setValue("Autocheck", !currentState);

    if (currentState == true)
    {
      sendMessage('Autocheck disabled', 'red');
    }
    else
    {
      sendMessage('Autocheck enabled', 'SpringGreen');
    }
  }

  function KeyDownHandler(event)
  {
    var kcode = (event.keyCode) ? event.keyCode : event.which;
    if (event.ctrlKey && event.altKey)
    {
      switch(kcode)
      {
        case 65 : check_all_links(); break;
        case 67 : configuration(); break;
        case 68 : copy_dead_to_clipboard(); break;
        case 87 : toggle_autocheck(); break;      
      }
    }
  }

  //
  //
  //   SCRIPT EXECUTION START POINT
  //
  //
  
  // Safari specific GM_getResourceText override
  if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) 
  {
    GM_getResourceText = function(res) {
      var $cssText = GM_getValue("jquery_css", "");
      
      if ($cssText == "")
      {
        GM_xmlhttpRequest(
        {
          method: 'GET',
          url: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css',
          onload: function (result)
          {
            GM_setValue("jquery_css", result.responseText);
            window.location.reload();
          }
        });
      }
      else
      {
        return $cssText;
      } 
    }
  }
  
  var jQueryUICSS = GM_getResourceText("jQueryUICSS");
  GM_addStyle(jQueryUICSS);
  
  //init the stuff
  setVariables();
  initBulkCheck();
  
  //init info boxes
  messageBox.style.position = 'fixed';
  messageBox.style.top = '20px';
  messageBox.style.left = '10px';
  messageBox.style.opacity = '0.85';
  messageBox.style.background = 'DimGray';
  messageBox.style.fontSize = '10px';
  document.body.appendChild(messageBox);

  //register GM menu commands & keyboard shortcut event handler
  if (Keyboard_functions)
  {
    $(document).keydown(KeyDownHandler);
    GM_registerMenuCommand("[WarBB - Warez-BB Links Checker] Configuration  (" + first_key_keycodename + "+" + second_key_keycodename + "+" + String.fromCharCode(CONFIGURATION_KEYCODE) + ")", configuration);
    GM_registerMenuCommand("[WarBB - Warez-BB Links Checker] Check The Links In This Page (" + first_key_keycodename + "+" + second_key_keycodename + "+" + String.fromCharCode(CHECK_ALL_LINKS_KEYCODE) + ")", check_all_links);
  }
  else
  {
    GM_registerMenuCommand("[WarBB - Warez-BB Links Checker] Configuration", configuration);
    GM_registerMenuCommand("[WarBB - Warez-BB Links Checker] Check The Links In This Page", check_all_links);
  }

  //start linkchecking
  if (Autocheck)
  {
    $(document).ready(check_all_links);
  }

  //
  //
  //   SCRIPT EXECUTION END POINT
  //
  //

  //shows configuration box
  function configuration()
  {

    //prevent multiple creating of config window
    if ($("#hideshow").length)
    {
      $("#hideshow").show();
      return;
    }

    var configcss = '\
    .popup_block .popup fieldset{\
       padding: 1%;\
       border-style: solid;\
       border-width: 1px;\
       border-color: gray;\
       margin-bottom: 1px;\
    }\
    #h3hideshowtitle{\
     font-size: 2em;\
    }\
    #h3hideshow{\
     font-size: 1.5em;\
    }\
    #imghideshow {\
     border: none;\
    }\
    #plusimage{\
      display:inline;\
      }\
    #hideshow {\
     position: fixed;\
     width: 100%;\
     height: 100%;\
     top: 0;\
     left: 0;\
     font-size:12px;\
     z-index:2147483647;\
     text-align:left;\
    }\
    #fade {\
     background: #000;\
     position: fixed;\
     width: 100%;\
     height: 100%;\
     opacity: .80;\
     -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";\
     left: 0;\
     z-index: 10;\
    }\
    .popup_block {\
     font-family:verdana;\
     color:black;\
     background: #ddd;\
     padding: 10px 20px;\
     border: 2px solid DarkOrange;\
     float: left;\
     width: 700px;\
     position: absolute;\
     top: 7%;\
     left: 50%;\
     bottom: 7%;\
     margin: 0 0 0 -350px;\
     -moz-border-radius:10px;\
     z-index: 100;\
    \
    }\
    .popup_block .popup {\
     float: left;\
     width: 100%;\
     background: #fff;\
     margin: 10px 0;\
     padding: 0px 0 0px;\
     border-left: 1px solid #bbb;\
     border-top: 1px solid #bbb;\
     border-right: 1px solid #bbb;\
    }\
    #h3hideshow{\
     margin: 1px 0 0px;\
     padding: 1px 10px;\
     border-bottom: 1px solid #bbb;\
     font-size: 1.5em;\
     font-weight: normal;\
     cursor:pointer;\
     background:#DDDDDD none repeat scroll 0 0;\
    }\
    #h3hideshow:hover{\
    background:#C0BEBE none repeat scroll 0 0;\
    }\
    #h3hideshowtitle{\
     margin: 2px 0 0px;\
     padding: 7px 10px;\
     border-bottom: 1px solid #bbb;\
     font-size: 1.5em;\
     font-weight: normal;\
    }\
    .popup_block .popup a {\
     color:DarkSkyBlue;\
     text-decoration:none;\
    }\
    .popup p {\
     padding: 1px 10px;\
     margin: 0px 0;\
     -x-system-font:none;\
     font-family:verdana,geneva,lucida,"lucida grande",arial,helvetica,sans-serif;\
     font-size:10pt;\
     font-size-adjust:none;\
     font-stretch:normal;\
     font-style:normal;\
     font-variant:normal;\
     font-weight:normal;\
     line-height:normal;\
    }\
    #sites {\
     padding: 1px 10px;\
     margin: 0px 0;display:inline-block;width:16em;\
    }\
    #dev_ver {\
     color: #00FF00;\
     background: Black;\
     text-align: right;\
    }\
    #sites_suspended {\
     padding: 1px 10px;\
     margin: 0px 0;display:inline-block;width:16em;\
     text-decoration: line-through;\
    }\
    .popup img.cntrl {\
     position: absolute;\
     right: -15px;\
     top: -15px;\
    }\
    #bulk {\
      font-size:8pt;\
      color:orange;\
      padding: 1px 10px;\
      margin: 0px 0;\
      display:inline-block;\
      width:100px;\
    }\
    #note {\
      font-size:7pt;\
      color:gray;\
      padding: 1px 10px;\
      margin: 0px 0;display:inline-block;\
      min-width:100px;\
    }\
    #rednote {\
      font-size:7pt;\
      color:red;\
      padding: 1px 10px;\
      margin: 0px 0;display:inline-block;\
    }\
    #configinfo {\
      font-size:8pt;\
      color:gray;\
      padding: 1px 10px;\
      margin: 0px 0;display:inline-block;width:60em;\
    }\
    #inputColorLive, #hostSearchBox2, #hostSearchBox, #inputColorDead, #inputColorTemp, #inputColorCont, #selectAllButton, #selectNoneButton, #invertButton, #selectAllButton2, #selectNoneButton2, #invertButton2 {\
      color:black;\
      border-style: solid;\
      border-width: 1px;\
      border-color: gray;\
    }\
    #h3hideshowcontent {\
    min-height:220px;\
    max-height:220px;\
overflow:auto;\
     display: none;\
     padding: 10px 10px;\
    }\
    #specinfo{\
    font-size:14px;\
    }\
    .warlc-ui-tab {\
    height:300px;\
    overflow:auto;\
    }\
    #warlcsitelist2, #warlcsitelist1 {\
    height:220px;\
    border-top: 1px solid #ddd;\
    padding-top: 5px;\
    overflow:auto;\
    }\
    input:hover+label {\
    background:#F1F77C;\
    font-size:110%;\
    }\
    ';

    GM_addStyle(configcss);

    //close image and css taken from = http://www.sohtanaka.com/web-design/examples/css-popup    icon_close.png;
    var configurationinnerHTML = 
    '<div id="fade"></div>\
    <div class="popup_block">\
      <div class="popup">\
        <a href="#"><img id="imghideshow" title="Close" class="cntrl" src="data:image/png;base64,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%3D%3D"/></a>\
      <div id="h3hideshowtitle"><img style="height:1.2em;" src="data:image/png;base64,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"></img>&nbsp;W.A.R. Links Checker Configuration</div>\
      <div id="warlc-conf-tabs">\
        <ul>\
          <li><a href="#tabs-1">Filehostings</a></li>\
          <li><a href="#tabs-2">Containers</a></li>\
          <li><a href="#tabs-3">Settings</a></li>\
          <li><a href="#tabs-4">About</a></li>\
        </ul>\
        <div id="tabs-1" class="warlc-ui-tab">\
          <div class="warlc-ui-buttonset">\
            <input type="button" class="warlc-ui-select-all" value="Select All">\
            <input type="button" class="warlc-ui-select-none" value="Select None">\
            <input type="button" class="warlc-ui-select-invert" value="Invert">\
          </div><br>\
          <div>Search: <input type="textbox" id="hostSearchBox" value=""></div><br>\
          <div id="warlcsitelist1"><span>Empty</span></div>\
        </div>\
        <div id="tabs-2" class="warlc-ui-tab">\
          <div class="warlc-ui-buttonset">\
            <input type="button" class="warlc-ui-select-all" value="Select All">\
            <input type="button" class="warlc-ui-select-none" value="Select None">\
            <input type="button" class="warlc-ui-select-invert" value="Invert">\
          </div><br>\
          <div>Search: <input type="textbox" id="hostSearchBox2" value=""></div><br>\
          <div id="warlcsitelist2"><span>Empty</span></div>\
        </div>\
        <div id="tabs-3" class="warlc-ui-tab">\
          <div id="warlcsettings">\
          <fieldset>\
          <p><input type="checkbox" id="Keyboard_functions"> Enable keyboard shortcuts</p>\
          <div id="configinfo">' + first_key_keycodename + '+' + second_key_keycodename + '+' + CONFIGURATION_KEY + ' = Configuration <br/>' + first_key_keycodename + '+' + second_key_keycodename + '+' + CHECK_ALL_LINKS_KEY + ' = Check all the links' + '<br/>' + first_key_keycodename + '+' + second_key_keycodename + '+' + copy_to_dead_key + ' = Copy found dead links to clipboard' + '<br/>' + first_key_keycodename + '+' + second_key_keycodename + '+' + toggle_autocheck_key + ' = Autocheck ON/OFF' + '</div>\
          </fieldset>\
          <fieldset>\
          <p><input type="checkbox" id="Color_DL_links"> Color DL links</p>\
          <div id="sites">Live links color<input type="text" id="inputColorLive" style="background:' + Live_links_color + ';" value="' + Live_links_color + '"></div>\
          <div id="sites">Dead links color<input type="text" id="inputColorDead" style="background:' + Dead_links_color + ';" value="' + Dead_links_color + '"></div><br>\
          <div id="sites">Temp. unavailable<input type="text" id="inputColorTemp" style="background:' + Temp_unavailable_links_color + ';" value="' + Temp_unavailable_links_color + '"></div>\
          <div id="sites">Container links color<input type="text" id="inputColorCont" style="background:' + Container_links_color + ';" value="' + Container_links_color + '"></div><br>\
          <div id="configinfo">For no color leave a field blank.<br>Standard HTML color names are supported. See <a href="http://www.w3schools.com/html/html_colornames.asp">w3schools.com</a> for more info.</div><br>\
          <p><input type="checkbox" id="Show_line_through_in_dead_links"> Show line through in dead links</p>\
          <p><input type="checkbox" id="Show_black_background_in_DL_links"> Show black background in DL links</p>\
          <p><input type="checkbox" id="Do_not_linkify_DL_links"> Do NOT linkify DL links</p>\
          <p><input type="checkbox" id="Allow_spaces_in_DL_links"> Allow spaces in DL links<br><div id="configinfo">Note: All links must end with a new line!</div></p>\
          <p><input type="checkbox" id="Display_full_links_in_link_containers"> Display full links in link containers</p><br>\
          <fieldset>\
          <p><input type="radio" name="warlciconset" value="0"> No icons</p>\
          <p><input type="radio" name="warlciconset" value="1"> <img src=" ' + PAW_ICON_GREEN + '"> <img src=" ' + PAW_ICON_RED + '"> <img src=" ' + PAW_ICON_YELLOW + '"></p>\
          <p><input type="radio" name="warlciconset" value="2"> <img src=" ' + RSLC_ICON_GREEN + '"> <img src=" ' + RSLC_ICON_RED + '"> <img src=" ' + RSLC_ICON_YELLOW + '"></p>\
          </fieldset>\
          </fieldset>\
          <fieldset>\
          <div id="sites"><input type="checkbox" id="Autocheck"> Autocheck</div><br><div id="configinfo">Script starts check automatically.</div><br>\
          </fieldset>\
          <fieldset>\
          <div id="sites"><input type="checkbox" id="Show_progress_stats"> Show progress stats</div><br>\
          </fieldset>\
          <fieldset>\
          <div id="sites"><input type="checkbox" id="Display_tooltip_info"> Display tooltip info</div><div id="bulk">EXPERIMENTAL</div><br><div id="configinfo">Note: File name, file size, error messages etc.</div><br>\
          </fieldset>\
          <fieldset>\
          <div id="sites"><input type="checkbox" id="Check_censors">Check censored hosts</div><div id="configinfo">Enable checking of censors on third party services, multi upload sites, etc</div><br>\
          </fieldset>\
          <fieldset>\
          <div id="sites">Anonymizer<select id="redirector">\
          <option value="http://anonymz.com/?" id="http://anonymz.com/?">anonymz.com</option>\
          <option value="http://anonym.to/?" id="http://anonym.to/?">anonym.to</option>\
          <option value="http://blankrefer.com/?" id="http://blankrefer.com/?">blankrefer.com</option>\
          <option value="" id="NoRed">No redirector</option></select></div>\
          </fieldset>\
          </div>\
        </div>\
        <div id="tabs-4" class="warlc-ui-tab">\
          <p><b>WarBB - Warez-BB Link Checker v' + WarBB_version + '</b> by iKickback (<a href="http://www.warez-bb.org/profile.php?mode=viewprofile&u=2348347">Warez-BB</a> | <a href="http://userscripts.org/users/476129">Userscripts</a>) & thecodingdude (<a href="http://www.warez-bb.org/profile.php?mode=viewprofile&u=2089048">Warez-BB</a> | <a href="http://userscripts.org/users/437232">Userscripts</a>)</p>\
          <p><b>Based on:</b> <a href="http://userscripts.org/scripts/show/125631">W.A.R. Links Checker - Dev</a></p>\
          <p><b>Original by:</b> <a href="http://userscripts.org/users/302353">dkitty</a></p>\
          <br />\
          <p><b>Currently supported:</b><br>\
          Filehostings: ' + allHostNames.length + '<br />\
          Containers: ' + allContainerNames.length + '<br />\
          Obsolete sites: ' + allObsoleteNames.length + '<br /></p>\
          <br />\
          <p><b>Uses:</b></p>\
          <p>adam_3\'s <a href="http://userscripts.org/scripts/show/2254">Linkify ting</a> (modified)</p>\
          <p>sizzlemctwizzle\'s <a href="http://userscripts.org/scripts/show/38017">Another Auto Update Script</a> (slightly modified)</p>\
          <p><a href="http://jquery.com/">jQuery</a> JavaScript Library</p>\
          <br />\
          <p>License: GPL version 3 or any later version (<a href="http://www.gnu.org/copyleft/gpl.html">http://www.gnu.org/copyleft/gpl.html</a>)</p>\
        </div>\
      </div>\
    </div>\
    </div>';
    
    $('body').append('<div id="hideshow">' + configurationinnerHTML + '</div>');
    
    $("#warlc-conf-tabs").tabs({ fx: { opacity: 'toggle', duration: 'fast' } });
    
    $("#imghideshow").click(function(event){$("#hideshow").hide(); event.preventDefault();});
        
    var elmHostList = document.getElementById("warlcsitelist1");
    var elmContainerList = document.getElementById("warlcsitelist2");
    
    buildSettings();
    buildSitelist("", allHostNames, elmHostList);
    buildSitelist("", allContainerNames, elmContainerList);
    appendObsolete("", allObsoleteNames, elmHostList);
      
    if (DEBUG_MODE)
    {
      //log all sites availability status
      diagSites();
    }
      
    //handler for checkbox state change
    function changeConfiguration(e)
    {
      var element = e.target;

      if (element.type == 'checkbox')
      {
        if (element.checked == 1)
        {
          GM_setValue(element.id, true);
        }
        else
        {
          GM_setValue(element.id, false);
        }

      }
      setVariables();
    }

    //Selects all filehosting checkboxes
    function selectAll()
    {
      $(":checkbox:visible:not(:checked)").prop("checked",true)
             .each(function(index, element){GM_setValue(this.id, true)});
    }

    //Deselects all filehosting checkboxes
    function selectNone()
    {
      $(":checkbox:visible:checked").prop("checked",false)
             .each(function(index, element){GM_setValue(this.id, false)});
    }

    //Inverts filehosting checkboxes selection
    function selectInvert()
    {
      var $checked = $(":checkbox:visible:checked");
      var $unchecked = $(":checkbox:visible:not(:checked)");
      
      $unchecked.prop("checked",true)
             .each(function(index, element){GM_setValue(this.id, true)});
      $checked.prop("checked",false)
             .each(function(index, element){GM_setValue(this.id, false)});
    }
    
    //Sets anonymizer setting
    function changeAnonymizer()
    {
      var redir = document.getElementById("redirector").value;
      if (redir == "") { redir = "NoRed"; }
      GM_setValue("Ref_anonymize_service", redir);
      document.getElementById(redir).selected=true;
    }
    
    //Sets selected redirector option
    var redir = GM_getValue("Ref_anonymize_service");
    if (redir == "") { redir = "NoRed"; }
    document.getElementById(redir).selected=true;

    //Sets live links color
    function changeColorLive()
    {
      var inColorLive = document.getElementById("inputColorLive");
      inColorLive.style.background = inColorLive.value;
      GM_setValue("Live_links_color", inColorLive.value);
    }

    //Sets dead links color
    function changeColorDead()
    {
      var inColorDead = document.getElementById("inputColorDead");
      inColorDead.style.background = inColorDead.value;
      GM_setValue("Dead_links_color", inColorDead.value);
    }

    //Sets temp. unavailable links color
    function changeColorTemp()
    {
      var inColorTemp = document.getElementById("inputColorTemp");
      inColorTemp.style.background = inColorTemp.value;
      GM_setValue("Temp_unavailable_links_color", inColorTemp.value);
    }

    //Sets temp. unavailable links color
    function changeColorCont()
    {
      var inColorCont = document.getElementById("inputColorCont");
      inColorCont.style.background = inColorCont.value;
      GM_setValue("Container_links_color", inColorCont.value);
    }

    //Diagnose sites for availability
    function diagSites()
    {
      var boxes = document.getElementById("warlcsitelist1").getElementsByTagName("input");

      for (var i = 0, n = boxes.length - 1; i < n; i++)
      {
        if (boxes[i].type == "checkbox")
        {
          checkAvailability(boxes[i]);
        }
      }

      boxes = document.getElementById("warlcsitelist2").getElementsByTagName("input");

      for (var i = 0, n = boxes.length - 1; i < n; i++)
      {
        if (boxes[i].type == "checkbox")
        {
          checkAvailability(boxes[i]);
        }
      }

      function checkAvailability(cbElm)
      {
        var cb = cbElm;       
        
        GM_xmlhttpRequest(
        {
          method: 'HEAD',
          url: 'http://' + cb.nextSibling.textContent.replace(' ', ''),
          headers: {
            'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
            'Accept': 'text/xml',
            'Referer': ""
          },
          onload: function (result)
          {
            if (result.status != 200)
            {
              console.log(cb.nextSibling.textContent + ' --- status: [' + result.status + '] ' + result.statusText + ', final url: ' + result.finalUrl);
            }
          },
          onerror: function (result)
          {
            if (result.status != 200)
            {
              console.log(cb.nextSibling.textContent + ' --- status: [' + result.status + '] ' + result.statusText + ', final url: ' + result.finalUrl);  
            }
          }
        });
      }
    }
    
    function buildSettings()
    {
      $("#warlcsettings :checkbox").each(function(){
        $(this).prop("checked", GM_getValue($(this).attr("id")))
          .click(function(e){
            GM_setValue($(this).attr("id"), $(this).prop("checked"));
            setVariables();
          });       
      })
    }
    
    //Dynamic build of host list
    //param search    [string]  searches for hostnames matching search substring 
    //param siteNames   [array]   array of site names
    //param targetNode  [DOM Node]  where the list should be built
    //                first child node is replaced
    function buildSitelist(search, siteNames, targetNode)
    {
      var searchRegex = new RegExp("\\|?([\\w\\.-]*" + search.replace(/\./g,"\\.").replace(/-/g, "\\-") + "[\\w\\.-]*)\\|?", "i");
      
      var $targetNode = $(targetNode).empty();
      
      var searchedSite = "";
      $.each(siteNames, function(i, site){
        if (searchedSite = site.match(searchRegex))
        {
          var baseSite = site.replace(/\|.+/, ""); //filehosting main domain
          
          //ensuring backward compatibility with the rest of code, to be refactored later
          var oldRSLCvalue = "Check_" + baseSite.replace(/\|.+/, "").replace(/\./g,"_dot_").replace(/-/g, "_dash_") + "_links";
          //
                    
          $targetNode.append('<input type="checkbox" id="' + oldRSLCvalue +'" />\
            <label for="' + oldRSLCvalue + '">' + searchedSite[1] + '</label>' +
            ((searchedSite[1] != baseSite) ? ('<div id="note"> ( ~ ' + baseSite + ' )</div>') : (""))
            );
          
          $("#" + oldRSLCvalue).prop("checked", GM_getValue(oldRSLCvalue, false))
                    .change(changeConfiguration);
                    
          $targetNode.append('<br />');
        }
      });
      
      $targetNode.append("<hr>");
    }
    
    //obsolete hosts checkbox
    function appendObsolete(search, siteNames, targetNode) {
      var $targetNode = $(targetNode);
      var searchRegex = new RegExp("\\|?([\\w\\.-]*" + search.replace(/\./g,"\\.").replace(/-/g, "\\-") + "[\\w\\.-]*)\\|?", "i");
      $targetNode.append('<input type="checkbox" id="Obsolete_file_hosts" /><label for="Obsolete_file_hosts">Obsolete file hosts</label>');   
      $("#Obsolete_file_hosts").prop("checked", GM_getValue("Obsolete_file_hosts", false))
                  .change(changeConfiguration);
      
                $targetNode.append('<br />');
      
      var foundName = "";
      $.each(siteNames, function(i, site){
        if (foundName = siteNames[i].match(searchRegex))
        {
          $targetNode.append('<div id="note">' + foundName[1] + '</div>');
        }
      })
    }
      
    // if (elmSpan.children.length == 1) // no matches
    // {
      // elmSpan.innerHTML = "";
      // elmSpan.appendChild(document.createTextNode('No matches'));
    // }
    
    var hostSearchBox = document.getElementById("hostSearchBox");
    hostSearchBox.addEventListener('keyup', function(){buildSitelist(hostSearchBox.value, allHostNames, elmHostList); appendObsolete(hostSearchBox.value, allObsoleteNames, elmHostList);}, false);   
    
    var hostSearchBox2 = document.getElementById("hostSearchBox2");
    hostSearchBox2.addEventListener('keyup', function(){buildSitelist(hostSearchBox2.value, allContainerNames, elmContainerList);}, false);   
        
    $(".warlc-ui-select-all").click(selectAll).button();
    $(".warlc-ui-select-none").click(selectNone).button();
    $(".warlc-ui-select-invert").click(selectInvert).button();
    
    $(".warlc-ui-buttonset").buttonset();
    
    var anonymizer = document.getElementById("redirector");
    anonymizer.addEventListener("change", changeAnonymizer, false);
    
    var inColorLive = document.getElementById("inputColorLive");
    inColorLive.addEventListener('keyup', changeColorLive, false);

    var inColorDead = document.getElementById("inputColorDead");
    inColorDead.addEventListener('keyup', changeColorDead, false);

    var inColorTemp = document.getElementById("inputColorTemp");
    inColorTemp.addEventListener('keyup', changeColorTemp, false);

    var inColorCont = document.getElementById("inputColorCont");
    inColorCont.addEventListener('keyup', changeColorCont, false);
    //buttons and edit boxes init end

    //icon sets radio buttons
    var radioButtons = document.getElementsByName("warlciconset");
    radioButtons[Icon_set].checked = "checked";

    radioButtons[0].addEventListener("change", updateIconSet);
    radioButtons[1].addEventListener("change", updateIconSet);
    radioButtons[2].addEventListener("change", updateIconSet);
    
    function updateIconSet()
    {
      GM_setValue("Icon_set", this.value * 1);
    }
    //    
  }

//begin standard link checking algorithm
function start(filterId)
{
  var doNotLinkify = Do_not_linkify_DL_links;

  // USER SELECTED FILE HOSTS INITIALIZATION START
  var http_file_hosts = new Array(); //standard hostings
  var http_file_hosts_coded = new Array(); //hostings which has to be decoded to obtain real checkable link
  var http_file_hosts_obsolete = new Array(); //dead hostings
  var http_file_hosts_headers_only = new Array(); //hostings with direct download, must be handled via headers only

  initFileHosts();
  initFileHostsCoded();
  initFileHostsHeadersOnly();
  // USER SELECTED FILE HOSTS INITIALIZATION END

  // LINKIFICATION START
  var totalxpath = '';
  var totalxpathcoded = '';
  var totalxpathobsolete = '';
  var totalxpathheadersonly = '';
  var totalourls = '';

  var filehostLen = http_file_hosts.length;
  var filehostCodedLen = http_file_hosts_coded.length;
  var filehostObsoleteLen = http_file_hosts_obsolete.length;
  var filehostHeadersOnlyLen = http_file_hosts_headers_only.length;

  var filehostIdx = filehostLen;
  var filehostCodedIdx = filehostCodedLen;
  var filehostObsoleteIdx = filehostObsoleteLen;
  var filehostHeadersOnlyIdx = filehostHeadersOnlyLen;

  if ((filehostIdx == 0) && (filehostCodedIdx == 0) && (filehostHeadersOnlyIdx == 0) && (filehostObsoleteIdx == 0))
    return;

  while (filehostIdx--)
  {
    totalourls += http_file_hosts[filehostIdx][0] + '|';
    totalxpath += http_file_hosts[filehostIdx][4] + '|';
  }

  while (filehostCodedIdx--)
  {
    totalourls += http_file_hosts_coded[filehostCodedIdx][0] + '|';
    totalxpathcoded += http_file_hosts_coded[filehostCodedIdx][3] + '|';
  }

  while (filehostObsoleteIdx--)
  {
    totalourls += http_file_hosts_obsolete[filehostObsoleteIdx][0] + '|';
    totalxpathobsolete += http_file_hosts_obsolete[filehostObsoleteIdx][1] + '|';
  }

  while (filehostHeadersOnlyIdx--)
  {
    totalourls += http_file_hosts_headers_only[filehostHeadersOnlyIdx][0] + '|';
    totalxpathheadersonly += http_file_hosts_headers_only[filehostHeadersOnlyIdx][3] + '|';
  }

  totalourls = totalourls.replace(/\|$/g, "");
  
  //TODO: further refactoring needed
  
  totalxpath = totalxpath.replace(/\]\|\/\/a\[/g, " or ");
  totalxpath = totalxpath.replace(/\]\|/, ')]');
  totalxpathcoded = totalxpathcoded.replace(/\]\|\/\/a\[/g, " or ");
  totalxpathcoded = totalxpathcoded.replace(/\]\|/, ')]');
  totalxpathobsolete = totalxpathobsolete.replace(/\]\|\/\/a\[/g, " or ");
  totalxpathobsolete = totalxpathobsolete.replace(/\]\|/, ')]');
  totalxpathheadersonly = totalxpathheadersonly.replace(/\]\|\/\/a\[/g, " or ");
  totalxpathheadersonly = totalxpathheadersonly.replace(/\]\|/, ')]');
        
  if (filterId != null) //insert id restriction in the xpath
  {
    totalxpath = totalxpath.replace(/\[/g, "[@class='" + filterId + "' and (");
    totalxpathcoded = totalxpathcoded.replace(/\[/g, "[@class='" + filterId + "' and (");
    totalxpathobsolete = totalxpathobsolete.replace(/\[/g, "[@class='" + filterId + "' and (");
    totalxpathheadersonly = totalxpathheadersonly.replace(/\[/g, "[@class='" + filterId + "' and (");
  }
  else
  {
    totalxpath = totalxpath.replace(/\[/, "[((not(@class)) or (@class!='alive_link' and @class!='adead_link' and @class!='unava_link' and @class!='obsolete_link')) and (");
    totalxpathcoded = totalxpathcoded.replace(/\[/, "[((not(@class)) or (@class!='alive_link' and @class!='adead_link' and @class!='unava_link' and @class!='obsolete_link')) and (");
    totalxpathobsolete = totalxpathobsolete.replace(/\[/, "[((not(@class)) or (@class!='alive_link' and @class!='adead_link' and @class!='unava_link' and @class!='obsolete_link')) and (");
    totalxpathheadersonly = totalxpathheadersonly.replace(/\[/, "[((not(@class)) or (@class!='alive_link' and @class!='adead_link' and @class!='unava_link' and @class!='obsolete_link')) and (");
  }
  
  linkify(totalourls);
  //LINKIFICATION END
  
  //ENCRYPTED LINKS PROCESSING START
  if (http_file_hosts_coded.length > 0)
  {
    var linksCoded = document.evaluate(totalxpathcoded, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    // decrypt coded links (redirects, link protectors etc.)
    if (linksCoded.snapshotLength > 0)
    {
      var link;
      var reallinkreg;
      var reallinkcorrection;

      if (filterId == null)
      {
        cLinksTotal += linksCoded.snapshotLength;
      }

      var y = linksCoded.snapshotLength - 1;
      do
      {
        // linksCoded.snapshotItem(y).id = 'processing_link';
        link = linksCoded.snapshotItem(y);
        
        filehostIdx = filehostCodedLen;
        while (filehostIdx--)
        {
          if (link.href.match(http_file_hosts_coded[filehostIdx][0]))
          {

            link.href = link.href.replace(/http:\/\/.*?(?:\?|=)http:\/\//, 'http://');
            reallinkreg = http_file_hosts_coded[filehostIdx][1];
            reallinkcorrection = http_file_hosts_coded[filehostIdx][2];

            decurl(link, reallinkreg, reallinkcorrection);
            break;
          }
        }
      }
      while (y--);
    }
  }
  //ENCRYPTED LINKS PROCESSING END

  //STANDARD LINKCHECKING START
  if (http_file_hosts.length > 0)
  {
    var lianks = document.evaluate(totalxpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (filterId == null)
    {
      cLinksTotal += lianks.snapshotLength;
    }

    if (lianks.snapshotLength > 0)
    {
      var link;

      var URL = "";
      var name = "";
      var isAliveRegex = "";
      var isDeadRegex = "";
      var isUnavaRegex = "";
      var tryLoop = false;

      var y = lianks.snapshotLength;

      while (y--)
      {
        link = lianks.snapshotItem(y);

        filehostIdx = filehostLen;
        while (filehostIdx--)
        {
          if (link.href.match(http_file_hosts[filehostIdx][0]))
          {

            link.href = link.href.replace(/http:\/\/.*?http:\/\//, 'http://'); //anonymizers
            isAliveRegex = http_file_hosts[filehostIdx][1];
            isDeadRegex = http_file_hosts[filehostIdx][2];
            isUnavaRegex = http_file_hosts[filehostIdx][3];
            tryLoop = http_file_hosts[filehostIdx][5];

            geturl(link, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop);

            break;
          }
        }
      }
    } 
  }
  //STANDARD LINKCHECKING END
  
  //OBSOLETE FILE HOSTS PROCESSING START
  if (filehostObsoleteLen > 0)
  {
    var obsoletelinks = document.evaluate(totalxpathobsolete, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    var obsoleteLink;

    //check links
    if (obsoletelinks.snapshotLength > 0)
    {
      var y = obsoletelinks.snapshotLength;

      if (filterId == null)
      {
        cLinksTotal += y;
      }

      while (y--)
      {
        obsoleteLink = obsoletelinks.snapshotItem(y);

        if (Display_tooltip_info)
        {
          obsoleteLink.warlc_error = 'Cause of error: <b>Obsolete filehosting.</b>';
        }
        
        displayTheCheckedLink(obsoleteLink, 'obsolete_link');
      }
    }
  }
  //OBSOLETE FILE HOSTS PROCESSING END

  //DIRECT LINKCHECKING START
  if (http_file_hosts_headers_only.length > 0)
  {
    var links = document.evaluate(totalxpathheadersonly, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    //check links
    if (links.snapshotLength > 0)
    {
      var link;
      var isAliveRegex;
      var isDeadRegex;

      var y = links.snapshotLength;


      if (filterId == null)
      {
        cLinksTotal += y;
      }

      while (y--)
      {
        // links.snapshotItem(y).id = 'processing_link';
        link = links.snapshotItem(y);
        
        filehostIdx = filehostHeadersOnlyLen;
        while (filehostIdx--)
        {
          if (link.href.match(http_file_hosts_headers_only[filehostIdx][0]))
          {
            link.href = link.href.replace(/http:\/\/.*?(?:\?|=)http:\/\//, 'http://');
            isAliveRegex = http_file_hosts_headers_only[filehostIdx][1];
            isDeadRegex = http_file_hosts_headers_only[filehostIdx][2];

            geturlHeader(link, isAliveRegex, isDeadRegex);

            break;
          }
        }
      }

    }
  }
  //DIRECT LINKCHECKING END


  //finds the real url on the page, replaces link.href with it and calls geturl
  function decurl(link, reallinkreg, reallinkcorrection)
  {

    GM_xmlhttpRequest(
    {
      method: 'GET',
      url: link.href,
      headers: {
        'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
        'Accept': 'text/xml',
        'Referer': ""
      },
      onload: function (result)
      {
        // cLinksProcessed++;

        var reallink = result.responseText.match(reallinkreg)[0];
        reallink = reallink.replace(new RegExp(reallinkcorrection, "g"), "");

        link.href = reallink;

        var i = http_file_hosts.length - 1;
        do
        {
          if ((reallink.match(http_file_hosts[i][0])))
          {
            link.href = link.href.replace(/http:\/\/.*?\?http:\/\//, 'http://');
            var isAliveRegex = http_file_hosts[i][1];
            var isDeadRegex = http_file_hosts[i][2];
            var isUnavaRegex = http_file_hosts[i][3];

            geturl(link, isAliveRegex, isDeadRegex, isUnavaRegex, 50);

            break;
          }
        }
        while (i--);
        }
    });
  }

  function randUA()
  {
    //TODO
  }
  
  //Processes link
  //
  // [string]   link      link URL
  // [string]   isAliveRegex  alive link regex
  // [string]   isDeadRegex   dead link regex
  // [string]   isUnavaRegex  unavailable link regex
  // [boolean]  tryLoop     repeats request until succeeded 
  function geturl(link, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop)
  {
    GM_xmlhttpRequest(
    {
      method: 'GET',
      url: link.href,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Charset': 'windows-1250,utf-8;q=0.7,*;q=0.7',
        'Referer': ""
      },
      onload: function (result)
      {
        var res = result.responseText;
        
        //console.log(res);

        if (res.match(isAliveRegex))
        {
          displayTheCheckedLink(link, 'alive_link');
          return;
        }

        if (res.match(isDeadRegex))
        {
          displayTheCheckedLink(link, 'adead_link');
          return;
        }

        if (res.match(isUnavaRegex))
        {
          displayTheCheckedLink(link, 'unava_link');
          return;
        }

        var resStatus = result.status;

        if (resStatus == 404)
        {
          displayTheCheckedLink(link, 'adead_link');
        }
        
        if (resStatus == 500 || resStatus == 503 || resStatus == 403) //not found/available/temp. unava
        {
          if (tryLoop)
          {
            //wait 1-5 seconds and repeat the request
            setTimeout(function(){geturl(link, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop)}, 1000 + (Math.random() * 4000));
          }
          else
          {
            displayTheCheckedLink(link, 'unava_link');
          }

          return;
        }
      },
      onerror: function ()
      {
        displayTheCheckedLink(link, 'unava_link');
      }
    });
  }

  function geturlHeader(link, isAliveRegex, isDeadRegex)
  {
    GM_xmlhttpRequest(
    {
      method: 'HEAD',
      url: link.href,
      headers: {
        'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Charset': 'windows-1250,utf-8;q=0.7,*;q=0.7',
        'Referer': ""
      },
      onload: function (result)
      {
        var resStatus = result.status;
        var resHeaders = "";
        
        if (resStatus == 403 || resStatus == 404 || resStatus == 500) //not found/available
        {
          displayTheCheckedLink(link, 'adead_link');
          return;
        }

        resHeaders = result.responseHeaders;
        //console.log(resHeaders);

        if (resHeaders.match(isDeadRegex))
        {
          displayTheCheckedLink(link, 'adead_link');
          return;
        }

        if (resHeaders.match(isAliveRegex))
        {
          displayTheCheckedLink(link, 'alive_link');
          return;
        }
      },
      onerror: function ()
      {
        displayTheCheckedLink(link, 'unava_link');
      }
    });
  }

  //Delinkfifies the <a> element object
  function delinkifyLink(link)
  {
    var spanElm = document.createElement("span");
    spanElm.className = link.className;
    spanElm.innerHTML = link.innerHTML;

    if (Display_tooltip_info)
    {
      spanElm.href = link.href;
      spanElm.warlc_error = link.warlc_error;
      
      switch (link.className){
      case "alive_link": spanElm.addEventListener("mouseover", displayTooltipInfo, false); break
      case "adead_link": spanElm.addEventListener("mouseover", displayTooltipError, false); break;
      case "unava_link": //reserved
      default: 
      }
    }
    
    link.parentNode.replaceChild(spanElm, link);
  }

  //Assigns result status to the <a> element object and calls delinkifying eventually
  //Possible result states: adead_link, alive_link, unava_link
  function displayTheCheckedLink(link, resultStatus)
  {
    //console.log(link);
    link.className = resultStatus;
    if (ANONYMIZE_SERVICE == "NoRed") { ANONYMIZE_SERVICE = ""; }
    link.href = ANONYMIZE_SERVICE + link.href;
    
    if (Display_tooltip_info)
    {
      switch (resultStatus){
      case "alive_link": link.addEventListener("mouseover", displayTooltipInfo, false); break
      case "adead_link": link.addEventListener("mouseover", displayTooltipError, false); break;
      case "obsolete_link": link.addEventListener("mouseover", displayTooltipError, false); break;
      case "unava_link": //reserved
      default: 
      }
    }
    
    if (doNotLinkify)
    {
      delinkifyLink(link);
    }
    
    cLinksProcessed++;

    if (resultStatus == "alive_link")
    {
      cLinksAlive++;
      return;
    }

    if (resultStatus == "adead_link")
    {
      cLinksDead++;
      return;
    }
    
    if (resultStatus == "obsolete_link")
    {
      cLinksDead++;
      return;
    }

    if (resultStatus == "unava_link")
    {
      cLinksUnava++;
    }
  }


  function initFileHosts()
  {

    function addObsoleteHost(linkRegex, xpathEx)
    {
      var host = new Array(2);
      host[0] = linkRegex;
      host[1] = xpathEx;
      http_file_hosts_obsolete.push(host);
    }

    //obsolete file hosts init start
    if (Obsolete_file_hosts)
    {
      addObsoleteHost("uloz\.cz\/show\/file","//a[contains(@href,'uloz.cz')]");
      addObsoleteHost("storage\\.to\/get","//a[contains(@href,'storage.to')]");
      addObsoleteHost("iskladka\\.cz\/download","//a[contains(@href,'iskladka.cz')]");
      addObsoleteHost("file-rack\\.com\/files","//a[contains(@href,'file-rack.com')]");
      addObsoleteHost("fast-load\\.net\/(\/)?index","//a[contains(@href,'fast-load.net')]");
      addObsoleteHost("subory\\.sk\/download","//a[contains(@href,'subory.sk')]");
      addObsoleteHost("fileop\\.com\/\\w+","//a[contains(@href,'fileop.com')]");
      addObsoleteHost("mujsoubor\\.cz\/file\/","//a[contains(@href,'mujsoubor.cz')]");
      addObsoleteHost("sendfile\\.to\/\\w+","//a[contains(@href,'sendfile.to')]");
      addObsoleteHost("superfastfile\\.com\/\\w+","//a[contains(@href,'superfastfile.com')]");
      addObsoleteHost("quickyshare\\.com\/\\w+","//a[contains(@href,'quickyshare.com/')]");
      addObsoleteHost("duckload\\.com\/\\w+","//a[contains(@href,'duckload.com')]");
      addObsoleteHost("uploadstore\\.net\/\\w+","//a[contains(@href,'uploadstore.net')]");
      addObsoleteHost("meinupload\\.com\/dl\/\\d+","//a[contains(@href,'meinupload.com/dl')]");
      addObsoleteHost("dualshare\\.com\/\\w+","//a[contains(@href,'dualshare.com')]");
      addObsoleteHost("2xupload\\.(?:to|de)\/file\/\\w+","//a[contains(@href,'2xupload.to') or contains(@href,'2xupload.de')]");
      addObsoleteHost("oxedion\\.com\/index\\.php\/download\/\\w+","//a[contains(@href,'oxedion.com/index')]");
      addObsoleteHost("uploadline\\.com\/\\d+","//a[contains(@href,'uploadline.com')]");
      addObsoleteHost("dll\\.bz\/file\/\\d+","//a[contains(@href,'dll.bz/file')]");
      addObsoleteHost("movieshare\\.in\/\\w+","//a[contains(@href,'movieshare.in')]");
      addObsoleteHost("milledrive\\.com\/\\w+","//a[contains(@href,'milledrive.com')]");
      addObsoleteHost("quickupload\\.net\/\\w+","//a[contains(@href,'quickupload.net')]");
      addObsoleteHost("safelink\\.in\/\\w+","//a[contains(@href,'safelink.in')]");
      addObsoleteHost("pyramidfiles\\.com\/\\w+","//a[contains(@href,'pyramidfiles.com/')]");
      addObsoleteHost("metadivx\\.com\/\\w+\/","//a[contains(@href,'metadivx.com')]");
      addObsoleteHost("divxlink\\.com\/\\w+\/","//a[contains(@href,'divxlink.com')]");
      addObsoleteHost("uploadrack\\.com\/\\w+\/","//a[contains(@href,'uploadrack.com')]");
      addObsoleteHost("teradepot\\.com\/\\w+\/","//a[contains(@href,'teradepot.com')]");
      addObsoleteHost("dataup\\.to\/\\d+\/","//a[contains(@href,'dataup.to')]");
      addObsoleteHost("upit\\.to\/file:\\d+","//a[contains(@href,'upit.to/file')]");
      addObsoleteHost("badongo\\.(?:com|net)\/\\w+","//a[contains(@href,'badongo.com') or contains(@href,'badongo.net')]");
      addObsoleteHost("driveway\\.com\/\\w+","//a[contains(@href,'driveway.com')]");
      addObsoleteHost("eatlime\\.com\/\\w+","//a[contains(@href,'eatlime.com/')]");
      addObsoleteHost("a2zuploads\\.com\/id\\w+","//a[contains(@href,'a2zuploads.com/id')]");
      addObsoleteHost("friendlyfiles\\.net\/download\/\\w+\/","//a[contains(@href,'friendlyfiles.net/download')]");
      addObsoleteHost("flyfile\\.us\/\\w+","//a[contains(@href,'flyfile.us')]");
      addObsoleteHost("(?:speedy\\.sh|speedyshare\\.com)\/\\w+","//a[contains(@href,'speedyshare.com') or contains(@href,'speedy.sh/')]");
      addObsoleteHost("uploadspace\\.eu\/\\w+","//a[contains(@href,'uploadspace.eu')]");
      addObsoleteHost("fooget\\.com\/\\w+","//a[contains(@href,'fooget.com/')]");
      addObsoleteHost("keepfile\\.com\/\\w+","//a[contains(@href,'keepfile.com')]");
      addObsoleteHost("piggyshare\\.com\/file\/\\w+","//a[contains(@href,'piggyshare.com')]");
      addObsoleteHost("filecrown\\.com\/\\w+","//a[contains(@href,'filecrown.com')]");
      addObsoleteHost("6giga\\.com\/\\w+","//a[contains(@href,'6giga.com')]");
      addObsoleteHost("uploadjockey\\.com\/download\/\\w+","//a[contains(@href,'uploadjockey.com/download')]");
      addObsoleteHost("bluehost\\.to\/dl=\\w+","//a[contains(@href,'bluehost.to')]");
      addObsoleteHost("filegu\\.ru\/f\/\\w+","//a[contains(@href,'filegu.ru/f')]");
      addObsoleteHost("filebase\\.to\/files\/\\d+\/","//a[contains(@href,'filebase.to/files')]");
      addObsoleteHost("kickload\\.com\/file\/","//a[contains(@href,'kickload.com/file')]");
      addObsoleteHost("up-file\\.com\/\\w+\/","//a[contains(@href,'up-file.com/')]");
      addObsoleteHost("ezyfile\\.net\/\\w+","//a[contains(@href,'ezyfile.net/')]");
      addObsoleteHost("aiotool\\.net\/\\w+","//a[contains(@href,'aiotool.net/')]");
      addObsoleteHost("xvideos\\.com\/files\/\\d+\/\\w+","//a[contains(@href,'xvideos.com/files')]");
      addObsoleteHost("filebling\\.com\/dl\/\\d+\/\\d+\/\\w+","//a[contains(@href,'filebling.com/dl')]");
      addObsoleteHost("loaded\\.it\/divx\/\\w+","//a[contains(@href,'loaded.it/divx')]");
      addObsoleteHost("uploadcell\\.com\/\\w+\/\\w+","//a[contains(@href,'uploadcell.com')]");
      addObsoleteHost("jakfile\\.com\/\\w+","//a[contains(@href,'jakfile.com/')]");
      addObsoleteHost("uploadshare\\.cz\/download\/\\w+\/\\w+","//a[contains(@href,'uploadshare.cz/download')]");
      addObsoleteHost("mangoshare\\.com\/\\w+","//a[contains(@href,'mangoshare.com')]");
      addObsoleteHost("ugotfile\\.com\/file\/\\d+\/\\w+","//a[contains(@href,'ugotfile.com/file')]");
      addObsoleteHost("filestab\\.com\/\\w+","//a[contains(@href,'filestab.com')]");
      addObsoleteHost("crazyupload\\.com\/\\w+","//a[contains(@href,'crazyupload.com')]");
      addObsoleteHost("gaiafile\\.com\/\\w+","//a[contains(@href,'gaiafile.com')]");
      addObsoleteHost("sharejunky\\.com\/\\w+","//a[contains(@href,'sharejunky.com')]");
      addObsoleteHost("fileho\\.com\/download\/\\d+","//a[contains(@href,'fileho.com/download')]");
      addObsoleteHost("(?:bigandfree|BigAndFree)\\.com\/\\d+","//a[contains(@href,'bigandfree.com') or contains(@href,'BigAndFree.com')]");
      addObsoleteHost("bigfile\\.in\/\\w+","//a[contains(@href,'bigfile.in')]");
      addObsoleteHost("bigshare\\.eu\/download\\.php\\?id=","//a[contains(@href,'bigshare.eu/download.php')]");
      addObsoleteHost("dahosting\\.org\/dl\/\\w+","//a[contains(@href,'dahosting.org/dl')]");
      addObsoleteHost("digisofts\\.net\/\\w+","//a[contains(@href,'digisofts.net')]");
      addObsoleteHost("file4save\\.com\/\\w+\/\\w+","//a[contains(@href,'file4save.com')]");
      addObsoleteHost("filereactor\\.com\/\\w+","//a[contains(@href,'filereactor.com/')]");
      addObsoleteHost("filechip\\.com\/\\w+","//a[contains(@href,'filechip.com')]");
      addObsoleteHost("filescloud\\.com\/\\w+\/\\w+","//a[contains(@href,'filescloud.com')]");
      addObsoleteHost("saveqube\\.com\/getfile\/\\w+","//a[contains(@href,'saveqube.com/getfile')]");
      addObsoleteHost("www2\\.turboshare\\.de\/v\/\\d+","//a[contains(@href,'turboshare.de/v')]");
      addObsoleteHost("z-upload\\.com\/\\w+","//a[contains(@href,'z-upload.com')]");
      addObsoleteHost("youshare\\.com\/view\\.php","//a[contains(@href,'youshare.com/view')]");
      addObsoleteHost("jiffyupload\\.com\/\\w+","//a[contains(@href,'jiffyupload.com')]");
      addObsoleteHost("gigeshare\\.com\/preview\/\\w+","//a[contains(@href,'gigeshare.com')]");
      addObsoleteHost("datenklo\\.net\/dl","//a[contains(@href,'datenklo.net')]");
      addObsoleteHost("upload\\.dj\/download\\.php\\?id=\\w+","//a[contains(@href,'upload.dj/download.php')]");
      addObsoleteHost("loadfiles\\.in\/\\w+\/","//a[contains(@href,'loadfiles.in')]");
      addObsoleteHost("upit\\.to\/file:\\w+\/","//a[contains(@href,'upit.to/file')]");
      addObsoleteHost("zshare\\.net\/(?:download|video|audio)\/\\w+","//a[contains(@href,'zshare.net/')]");
      addObsoleteHost("refile\\.net\/f\/\\?\\w+","//a[contains(@href,'refile.net/f/')]");
      addObsoleteHost("dsfileshare\\.com\/download","//a[contains(@href,'dsfileshare.com/download')]");
      addObsoleteHost("sharesimple\\.net\/\\w{2}\/download","//a[contains(@href,'sharesimple.net')]");
      addObsoleteHost("(?:s\\d+\\.|)4files\\.net\/\\d+","//a[contains(@href,'4files.net')]");
      addObsoleteHost("odsiebie\\.com\/pokaz\/\\d+","//a[contains(@href,'odsiebie.com/pokaz')]");
      addObsoleteHost("filenavi\\.com\/direct\/\\w+","//a[contains(@href,'filenavi.com/direct')]");
      addObsoleteHost("3oof\\.com\/\\w+","//a[contains(@href,'3oof.com/')]");
      addObsoleteHost("meshwaar\\.com\/\\w+","//a[contains(@href,'meshwaar.com')]");
      addObsoleteHost("maxupload\\.com\/files\/\\w+","//a[contains(@href,'maxupload.com/files')]");
      addObsoleteHost("share\\.cx\/videos\/\\d+","//a[contains(@href,'share.cx/videos')]");
      addObsoleteHost("atserver\\.eu\/(?:\\w{2}\/|)download\/\\d+","//a[contains(@href,'atserver.eu')]");
      addObsoleteHost("file2upload\\.net\/download\/\\d+","//a[contains(@href,'file2upload.net/download')]");
      addObsoleteHost("filebling\\.com\/\\w+","//a[contains(@href,'filebling.com')]");
      addObsoleteHost("turboshare\\.(?:eu|com)\/files","//a[contains(@href,'turboshare.') and contains(@href,'/files')]");
      addObsoleteHost("rarhost\\.com\/download","//a[contains(@href,'rarhost.com/download')]");
      addObsoleteHost("isharehd\\.com\/\\w+","//a[contains(@href,'isharehd.com')]");
      addObsoleteHost("datenklo\\.net\/file\\.php\\?id=\\w+","//a[contains(@href,'datenklo.net/file.php')]");
      addObsoleteHost("file2share\\.biz\/download\\.php\\?id=\\w+","//a[contains(@href,'file2share.biz/download.php')]");
      addObsoleteHost("savefiles\\.net\/d\/\\w+\\.html","//a[contains(@href,'savefiles.net/d')]");
      addObsoleteHost("bestsharing\\.com\/files\/\\w+","//a[contains(@href,'bestsharing.com/files')]");
      addObsoleteHost("filecache\\.de\/\\d+","//a[contains(@href,'filecache.de/')]");
      addObsoleteHost("i741\\.com\/files\/\\w+","//a[contains(@href,'i741.com/files')]");
      addObsoleteHost("dataup\\.de\/\\d+","//a[contains(@href,'dataup.de')]");
      addObsoleteHost("fofly\\.com\/\\w+","//a[contains(@href,'fofly.com')]");
      addObsoleteHost("shareonall\\.com\/\\w+","//a[contains(@href,'shareonall.com')]");
      addObsoleteHost("sexuploader\\.com\/(?:|..\/)\\?[d|v]=\\w{8}","//a[contains(@href,'sexuploader.com')]");
      addObsoleteHost("mega(upload|video|rotic|porn)\\.com\/(?:|..\/)\\?[d|v|f]=\\w+","//a[contains(@href,'megaupload.com') or contains(@href,'megavideo.com') or contains(@href,'megaporn.com') or contains(@href,'megarotic.com')]");
      addObsoleteHost("uploadhyper\\.com\/file\/","//a[contains(@href,'uploadhyper.com')]");
      addObsoleteHost("filespawn\\.com\/file\/","//a[contains(@href,'filespawn.com')]");
      addObsoleteHost("caizzii\\.com\/(?:download|\\?file=)","//a[contains(@href,'caizzii.com')]");
      addObsoleteHost("volnyweb\\.cz\/files\/get\/[\\w-_]+","//a[contains(@href,'volnyweb.cz/files')]");
      addObsoleteHost("gotupload\\.com\/\\w+","//a[contains(@href,'gotupload.com/')]");
      addObsoleteHost("mooload\\.com\/new\/file\\.php\\?file=files\/\\d+\/\\d+","//a[contains(@href,'mooload.com/new/file')]");
      addObsoleteHost("z\\d+\\.zupload\\.com\/download\\.php\\?file=getfile&filepath=\\d+","//a[contains(@href,'zupload.com/download')]");
      addObsoleteHost("mytempdir\\.com\/\\d+","//a[contains(@href,'mytempdir.com/')]");
      addObsoleteHost("usershare\\.net\/\\w+","//a[contains(@href,'usershare.net/')]");
      addObsoleteHost("filescash\\.net\/file\/\\d+","//a[contains(@href,'filescash.net/file')]");
      addObsoleteHost("metahyper\\.com\/\\w+","//a[contains(@href,'metahyper.com/')]");
      addObsoleteHost("combozip\\.com\/\\w+","//a[contains(@href,'combozip.com/')]");
      addObsoleteHost("x7\\.to\/\\w+","//a[contains(@href,'x7.to/')]");
      addObsoleteHost("(?:flyupload\\.)?(?:enterupload|flyupload)\\.com\/[\\?\\w]+","//a[contains(@href,'enterupload.com/') or contains(@href,'flyupload.com/')]");
      addObsoleteHost("filepoint\\.de\/dl\/\\w+","//a[contains(@href,'filepoint.de/dl')]");
      addObsoleteHost("icushare\\.com\/\\w+","//a[contains(@href,'icushare.com/')]");
      addObsoleteHost("oron\\.com\/\\w+","//a[contains(@href,'oron.com/')]");
      addObsoleteHost("mystream\\.to\/file\\-\\d+","//a[contains(@href,'mystream.to/file')]");
      addObsoleteHost("x-fs\\.com\/download\\.php\\?id=\\w+","//a[contains(@href,'x-fs.com/download')]");
      addObsoleteHost("srapid\\.eu\/\\w+","//a[contains(@href,'srapid.eu/')]");
      addObsoleteHost("shareshared\\.com\/\\w+","//a[contains(@href,'shareshared.com/')]");
      addObsoleteHost("sosame\\.cz\/\\w+","//a[contains(@href,'sosame.cz/')]");
      addObsoleteHost("s\\d+\\.filesdump\\.com\/file\/\\w+","//a[contains(@href,'filesdump.com/file')]");
      addObsoleteHost("2-klicks\\.de\/\\?d=\\w+","//a[contains(@href,'2-klicks.de/?d=')]");
      addObsoleteHost("silofiles\\.com\/file\/\\d+","//a[contains(@href,'silofiles.com/file')]");
      addObsoleteHost("filehook\\.com\/\\w+","//a[contains(@href,'filehook.com/')]");
      addObsoleteHost("cloudcache\\.cc\/\\w+","//a[contains(@href,'cloudcache.cc/')]");
      addObsoleteHost("uploadking\\.com\/\\w+","//a[contains(@href,'uploadking.com/')]");
      addObsoleteHost("nahraj\\.cz\/(?:content|down)\/\\w+","//a[contains(@href,'nahraj.cz/')]");
      addObsoleteHost("megarapid\\.eu\/files\/\\d+","//a[contains(@href,'megarapid.eu/files')]");
      addObsoleteHost("(?:fileserve|uploadstation)\\.com\/(?:file|list)\/\\w+","//a[contains(@href,'fileserve.com/') or contains(@href,'uploadstation.com/')]");
      addObsoleteHost("uploadhere\\.com\/\\w+","//a[contains(@href,'uploadhere.com/')]");
      addObsoleteHost("dualshare\\.com\/\\w+","//a[contains(@href,'dualshare.com/')]");
      addObsoleteHost("yourfilehost\\.com\/media","//a[contains(@href,'yourfilehost.com/media')]");
      addObsoleteHost("ftp2share\\.com\/file\/\\w+","//a[contains(@href,'ftp2share.com/file')]");
      addObsoleteHost("storeandserve\\.com\/download\/\\d+","//a[contains(@href,'storeandserve.com/download')]");
      addObsoleteHost("mountfile\\.com\/file(?:\/\\w+){2}","//a[contains(@href,'mountfile.com/file')]");
      addObsoleteHost("save\\.am\/files\/\\w+","//a[contains(@href,'save.am/files')]");
      addObsoleteHost("transitfiles\\.com\/dl\/\\w+","//a[contains(@href,'transitfiles.com/dl')]");
      addObsoleteHost("smartuploader\\.com\/file\\.php\\?f=\\d+","//a[contains(@href,'smartuploader.com/file.php?=')]");
      addObsoleteHost("skipfile\\.com\/\\w+","//a[contains(@href,'skipfile.com/')]");
      addObsoleteHost("stahnu\\.to\/[\\w\\?]+","//a[contains(@href,'stahnu.to/')]");
      addObsoleteHost("flyshare\.cz\/(?:stahni\/|)\\d+","//a[contains(@href,'flyshare.cz/')]");
      addObsoleteHost("(?:ddlani\\.me|ddlanime\\.com)\/\\w+","//a[contains(@href,'ddlani.me/') or contains(@href,'ddlanime.com/')]");
      addObsoleteHost("loadly\\.com\/\\w+","//a[contains(@href,'loadly.com/')]");
      addObsoleteHost("groovefile\\.com\/\\w+","//a[contains(@href,'groovefile.com/')]");
      addObsoleteHost("filezlot\\.com\/\\w+","//a[contains(@href,'filezlot.com/')]");
      addObsoleteHost("shareator\\.(?:net|com)\/\\w+","//a[contains(@href,'shareator.')]");
      addObsoleteHost("yabadaba\\.ru\/files\/","//a[contains(@href,'yabadaba.ru/files/')]");
      addObsoleteHost("rapidhide\\.com\/download\\.php\\?file=\\w+","//a[contains(@href,'rapidhide.com/download.php')]");
      addObsoleteHost("filejungle\\.com\/[fl]\/\\w+","//a[contains(@href,'filejungle.com/')]");
      addObsoleteHost("kewlshare\\.com\/dl\/\\w+","//a[contains(@href,'kewlshare.com/dl')]");
      addObsoleteHost("petandrive\\.com\/file\/\\w+","//a[contains(@href,'petandrive.com/file')]");
      addObsoleteHost("onionshare\\.com\/\\w+","//a[contains(@href,'onionshare.com/')]");
      addObsoleteHost("rapidable\\.com\/\\w+\/download\\.php\\?id=","//a[contains(@href,'rapidable.com/')]");
      addObsoleteHost("filesdump\\.com\/file\/\\w+\/\\d+","//a[contains(@href,'filesdump.com/file')]");
      addObsoleteHost("file2box\\.(?:net|com)\/\\w+","//a[contains(@href,'file2box.')]");
      addObsoleteHost("(?:filesonic|sharingmatrix|wupload|fsc)(?:\\.\\w+){1,2}\/\\w+","//a[contains(@href,'filesonic.') or contains(@href,'sharingmatrix.com') or contains(@href,'wupload.') or contains(@href,'fsc.')]");
      addObsoleteHost("(?:megashare|MegaShare)\\.com\/\\d+","//a[contains(@href,'megashare.com') or contains(@href,'MegaShare.com')]");
      addObsoleteHost("sharerun\\.com\/\\w+","//a[contains(@href,'sharerun.com/')]");
      addObsoleteHost("1hostclick\\.com\/\\w+","//a[contains(@href,'1hostclick.com/')]");
      addObsoleteHost("4us\\.to\/download\\.php\\?id=\\w+","//a[contains(@href,'4us.to/')]");
      addObsoleteHost("dinnoz\\.com\/\\w+","//a[contains(@href,'dinnoz.com/')]");
      addObsoleteHost("filegaze\\.com\/\\w+","//a[contains(@href,'filegaze.com/')]");
      addObsoleteHost("restfile\\.net\/\\w+","//a[contains(@href,'restfile.net/')]");
      addObsoleteHost("missupload\\.com\/\\w+","//a[contains(@href,'missupload.com/')]");
      addObsoleteHost("fileud\\.com\/\\?d=\\w+","//a[contains(@href,'fileud.com/')]");
      addObsoleteHost("up250\\.com\/\\w+","//a[contains(@href,'up250.com/')]");
      addObsoleteHost("uploadchoice\\.com\/\\w+","//a[contains(@href,'uploadchoice.com/')]");
      addObsoleteHost("uploadspot\\.com\/\\w+","//a[contains(@href,'uploadspot.com/')]");
      addObsoleteHost("upload\\.ae\/file\/\\w+","//a[contains(@href,'upload.ae/')]");
      addObsoleteHost("launchfile\\.com\/\\w+","//a[contains(@href,'launchfile.com/')]");
      addObsoleteHost("proddl\\.com\/\\w+","//a[contains(@href,'proddl.com/')]");
      addObsoleteHost("fileape\\.com\/\\w+","//a[contains(@href,'fileape.com/')]");
      addObsoleteHost("azushare\\.net\/\\w+","//a[contains(@href,'azushare.net/')]");
      addObsoleteHost("maishare\\.net\/\\w+","//a[contains(@href,'maishare.net/')]");
      addObsoleteHost("uploading4u\\.com\/\\w+","//a[contains(@href,'uploading4u.com/')]");
      addObsoleteHost("uploadsfiles\\.com\/\\w+","//a[contains(@href,'uploadsfiles.com/')]");
      addObsoleteHost("cloudnxt\\.net\/\\w+","//a[contains(@href,'cloudnxt.net/')]");
      addObsoleteHost("uploadboost\\.com\/\\w+","//a[contains(@href,'uploadboost.com/')]");
      addObsoleteHost("filelaser\\.com\/\\w+","//a[contains(@href,'filelaser.com/')]");
      addObsoleteHost("filefat\\.com\/\\w+","//a[contains(@href,'filefat.com/')]");
      addObsoleteHost("filedino\\.com\/\\w+","//a[contains(@href,'filedino.com/')]");
      addObsoleteHost("shareupload\\.com\/\\w+","//a[contains(@href,'shareupload.com/')]");
      addObsoleteHost("wolfshare\\.com\/\\w+","//a[contains(@href,'wolfshare.com/')]");
      addObsoleteHost("(?:download\\.(?:cz\\.|en\\.|sk\\.|)|u\\d+\\.|http:\/\/(?:www\\.)?)\~\\s?(?:(?:[dD]is|Not\\s)[aA]llowed|Forbidden)\\.?\\s?\~","//a[contains(@href,'~') and contains(@href,'isallowed') or contains(@href,'Allowed') or contains(@href,'Forbidden')]");
      addObsoleteHost("4bytez\\.com\/\\w+","//a[contains(@href,'4bytez.com/')]");
      addObsoleteHost("anonstream\\.com\/\\w+","//a[contains(@href,'anonstream.com/')]");
      addObsoleteHost("bitroad\\.net","//a[contains(@href,'bitroad.net')]");
      addObsoleteHost("brontofile\\.com","//a[contains(@href,'brontofile.com')]");
      addObsoleteHost("(?:cloudnator|shragle)\\.com","//a[contains(@href,'cloudnator.com') or contains(@href,'shragle.com/')]");
      addObsoleteHost("coolshare\\.cz","//a[contains(@href,'coolshare.cz')]");
      addObsoleteHost("dark-uploads\\.com","//a[contains(@href,'dark-uploads.com')]");
      addObsoleteHost("dotavi\\.com","//a[contains(@href,'dotavi.com')]");
      addObsoleteHost("file-bit\\.net","//a[contains(@href,'file-bit.net')]");
      addObsoleteHost("filecosy\\.com","//a[contains(@href,'filecosy.com')]");
      addObsoleteHost("fileduct\\.com","//a[contains(@href,'fileduct.com')]");
      addObsoleteHost("filemashine\\.com","//a[contains(@href,'filemashine.com')]");
      addObsoleteHost("fileserver\\.cc","//a[contains(@href,'fileserver.cc')]");
      addObsoleteHost("filetechnology\\.com","//a[contains(@href,'filetechnology.com')]");
      addObsoleteHost("fireuploads\\.net","//a[contains(@href,'fireuploads.net')]");
      addObsoleteHost("getzilla\\.net","//a[contains(@href,'getzilla.net')]");
      addObsoleteHost("gigfiles\\.net","//a[contains(@href,'gigfiles.net')]");
      addObsoleteHost("hellspy\\.com","//a[contains(@href,'hellspy.com')]");
      addObsoleteHost("holderfile\\.com","//a[contains(@href,'holderfile.com')]");
      addObsoleteHost("ihostia\\.com","//a[contains(@href,'ihostia.com')]");
      addObsoleteHost("isavelink\\.com","//a[contains(@href,'isavelink.com')]");
      addObsoleteHost("k2files\\.com","//a[contains(@href,'k2files.com')]");
      addObsoleteHost("migahost\\.com","//a[contains(@href,'migahost.com')]");
      addObsoleteHost("mojofile\\.com","//a[contains(@href,'mojofile.com')]");
      addObsoleteHost("ovfile\\.com","//a[contains(@href,'ovfile.com')]");
      addObsoleteHost("plunder\\.com","//a[contains(@href,'plunder.com')]");
      addObsoleteHost("premiuns\\.org","//a[contains(@href,'premiuns.org')]");
      addObsoleteHost("qshare\\.com","//a[contains(@href,'qshare.com')]");
      addObsoleteHost("shafiles\\.me","//a[contains(@href,'shafiles.me')]");
      addObsoleteHost("sharefilehost\\.com","//a[contains(@href,'sharefilehost.com')]");
      addObsoleteHost("stahuj\\.to","//a[contains(@href,'stahuj.to')]");
      addObsoleteHost("storage\\.novoro\\.net","//a[contains(@href,'novoro.net')]");
      addObsoleteHost("uploadstube\\.de","//a[contains(@href,'uploadstube.de')]");
      addObsoleteHost("vidhog\\.com","//a[contains(@href,'vidhog.com')]");
      addObsoleteHost("xfileshare\\.eu","//a[contains(@href,'xfileshare.eu')]");
      addObsoleteHost("bzlink\\.us","//a[contains(@href,'bzlink.us')]");
      addObsoleteHost("cing\\.be","//a[contains(@href,'cing.be')]");
      addObsoleteHost("linksafe\\.me","//a[contains(@href,'linksafe.me')]");
      addObsoleteHost("fileupped\\.com","//a[contains(@href,'fileupped.com')]");
      addObsoleteHost("getthebit\\.com","//a[contains(@href,'getthebit.com')]");
      addObsoleteHost("hackerbox\\.org","//a[contains(@href,'hackerbox.org')]");
      addObsoleteHost("uploadmachine\\.com","//a[contains(@href,'uploadmachine.com')]");
      addObsoleteHost("uploadoz\\.com","//a[contains(@href,'uploadoz.com')]");
      addObsoleteHost("upthe\\.net","//a[contains(@href,'upthe.net')]");
      addObsoleteHost("paid4share\\.(?:com|net)","//a[contains(@href,'paid4share.net') or contains(@href,'paid4share.com')]");
      addObsoleteHost("icefile\\.net","//a[contains(@href,'icefile.net')]");
      addObsoleteHost("smartsharing\\.net","//a[contains(@href,'smartsharing.net')]");
      addObsoleteHost("fxpag\\.com","//a[contains(@href,'fxpag.com')]");
      addObsoleteHost("filebeep\\.com","//a[contains(@href,'filebeep.com')]");
      addObsoleteHost("smartupload\\.net","//a[contains(@href,'smartupload.net')]");
      addObsoleteHost("timbshare\\.com","//a[contains(@href,'timbshare.com')]");
      addObsoleteHost("iuploadfiles\\.com","//a[contains(@href,'iuploadfiles.com')]");
      addObsoleteHost("zizfile\\.com","//a[contains(@href,'zizfile.com')]");
      addObsoleteHost("files-upload\\.com","//a[contains(@href,'files-upload.com')]");
      addObsoleteHost("pointupload\\.com","//a[contains(@href,'pointupload.com')]");
      addObsoleteHost("uploadarmy\\.com","//a[contains(@href,'uploadarmy.com')]");
      addObsoleteHost("mydir\\.eu","//a[contains(@href,'mydir.eu')]");
      addObsoleteHost("pctoworld\\.com","//a[contains(@href,'pctoworld.com')]");
      addObsoleteHost("direktload\\.org","//a[contains(@href,'direktload.org')]");
      addObsoleteHost("momupload\\.com","//a[contains(@href,'momupload.com')]");
      addObsoleteHost("yastorage\\.com","//a[contains(@href,'yastorage.com')]");
      addObsoleteHost("sharedzilla\\.com","//a[contains(@href,'sharedzilla.com')]");
      addObsoleteHost("simpleupload\\.net","//a[contains(@href,'simpleupload.net')]");
      addObsoleteHost("(?:s\\d+\.|)quicksharing\\.com","//a[contains(@href,'quicksharing.com')]");
      addObsoleteHost("buploads\\.com","//a[contains(@href,'buploads.com')]");
      addObsoleteHost("uploadhut\\.com","//a[contains(@href,'uploadhut.com')]");
      addObsoleteHost("orbitfiles\\.com","//a[contains(@href,'orbitfiles.com')]");
      addObsoleteHost("midload\\.com","//a[contains(@href,'midload.com')]");
      addObsoleteHost("savefile\\.info","//a[contains(@href,'savefile.info')]");
      addObsoleteHost("cocoshare\\.cc","//a[contains(@href,'cocoshare.cc')]");
      addObsoleteHost("sharebase\\.de","//a[contains(@href,'sharebase.de')]");
      addObsoleteHost("filehost\\.to","//a[contains(@href,'filehost.to')]");
      addObsoleteHost("hotelupload\\.com","//a[contains(@href,'hotelupload.com')]");
      addObsoleteHost("fileholding\\.com","//a[contains(@href,'fileholding.com')]");
      addObsoleteHost("woofiles\\.com","//a[contains(@href,'woofiles.com')]");
      addObsoleteHost("xuploading\\.com","//a[contains(@href,'xuploading.com')]");
      addObsoleteHost("speedshare\\.us","//a[contains(@href,'speedshare.us')]");
      addObsoleteHost("uploadville\\.com","//a[contains(@href,'uploadville.com')]");
      addObsoleteHost("supasic\\.com","//a[contains(@href,'supasic.com')]");
      addObsoleteHost("uploadpalace\\.com","//a[contains(@href,'uploadpalace.com')]");
      addObsoleteHost("(?:|file\\.)uploadr\\.com","//a[contains(@href,'uploadr.com')]");
      addObsoleteHost("rapidfile\\.fr","//a[contains(@href,'rapidfile.fr')]");
      addObsoleteHost("openupload\\.com","//a[contains(@href,'openupload.com')]");
      addObsoleteHost("miniuploads\\.com","//a[contains(@href,'miniuploads.com')]");
      addObsoleteHost("titanicshare\\.com","//a[contains(@href,'titanicshare.com')]");
      addObsoleteHost("sharelor\\.com","//a[contains(@href,'sharelor.com')]");
      addObsoleteHost("keepmyfile\\.com","//a[contains(@href,'keepmyfile.com')]");
      addObsoleteHost("sharebigfile\\.com","//a[contains(@href,'sharebigfile.com')]");
      addObsoleteHost("share\\.am","//a[contains(@href,'share.am')]");
      addObsoleteHost("sprintshare\\.com","//a[contains(@href,'sprintshare.com')]");
      addObsoleteHost("rapidupload\\.eu","//a[contains(@href,'rapidupload.eu')]");
      addObsoleteHost("theonlinedatastorage\\.com","//a[contains(@href,'theonlinedatastorage.com')]");
      addObsoleteHost("bulletupload\\.com","//a[contains(@href,'bulletupload.com')]");
      addObsoleteHost("(?:|download\\.(?:cz\\.|en\\.|sk\\.|)|www\\.)hellshare\\.(?:com|sk|cz|pl|hu)\/[\\w-\\.]+\/(?:[\\w-\\.]+\/|)\\d{5,}","//a[contains(@href,'hellshare.')]");
      addObsoleteHost("(?:uploads\\.glumbo|glumbouploads)\\.com\/\\w+","//a[contains(@href,'uploads.glumbo.com') or contains(@href,'glumbouploads.com')]");
      addObsoleteHost("files\\.uploadlab\\.com\/\\w+","//a[contains(@href,'files.uploadlab.com/')]");
      addObsoleteHost("letitbit\\.net\/download\/\\w+","//a[contains(@href,'letitbit.net/download')]");
      addObsoleteHost("turbobit\\.(?:net|pl)\/\\w+","//a[contains(@href,'turbobit.net/') or contains(@href,'turbobit.pl')]");
      addObsoleteHost("share\\.cx\/files\/\\w+","//a[contains(@href,'share.cx/files/')]");
      addObsoleteHost("uploaddot.com\/\\w+","//a[contains(@href,'uploaddot.com/')]");
      addObsoleteHost("(?:MegaFTP|megaftp)\\.com","//a[contains(@href,'MegaFTP.com/') or contains(@href,'megaftp.com/')]");
      addObsoleteHost("seeupload\\.com","//a[contains(@href,'seeupload.com/')]");
      addObsoleteHost("rapidshare\\.com\/users\/\\w+","//a[contains(@href,'rapidshare.com/users/')]");
      addObsoleteHost("filevelocity\\.com\/\\w+","//a[contains(@href,'filevelocity.com/')]");
      addObsoleteHost("dopeshare\\.com\/\\w+","//a[contains(@href,'dopeshare.com/')]");
      addObsoleteHost("filethe\\.net\/\\w+","//a[contains(@href,'filethe.net/')]");
      addObsoleteHost("6ybh\\-upload\\.com\/\\w+","//a[contains(@href,'6ybh-upload.com')]");
      addObsoleteHost("zetshare\\.net\/\\w+","//a[contains(@href,'zetshare.net/')]");
      addObsoleteHost("udic\\.co\/\\w+","//a[contains(@href,'udic.co/')]");
      addObsoleteHost("uploadables\\.com\/\\w+","//a[contains(@href,'uploadables.com/')]");
      addObsoleteHost("filevegas\\.com\/\\w+","//a[contains(@href,'filevegas.com/')]");
      addObsoleteHost("coolfilehost\\.com\/\\w+","//a[contains(@href,'coolfilehost.com/')]");
      addObsoleteHost("pcdesignfiles\\.hi2\\.ro\/\\w+","//a[contains(@href,'pcdesignfiles.hi2.ro/')]");
      addObsoleteHost("kitwit\\.info\/\\w+","//a[contains(@href,'kitwit.info/')]");
      addObsoleteHost("filessharefg\\.3x\\.ro\/\\w+","//a[contains(@href,'filessharefg.3x.ro/')]");
      addObsoleteHost("neturl\\.info\/\\w+","//a[contains(@href,'neturl.info/')]");
      addObsoleteHost("megafilesharing\\.com\/\\w+","//a[contains(@href,'megafilesharing.com/')]");
      addObsoleteHost("gfxheaven\\.co\\.uk\/\\w+","//a[contains(@href,'gfxheaven.co.uk/')]");
      addObsoleteHost("linkrevenue\\.net\/\\w+","//a[contains(@href,'linkrevenue.net/')]");
      addObsoleteHost("twinupload\\.com\/\\w+","//a[contains(@href,'twinupload.com/')]");
      addObsoleteHost("seed\\-share\\.com\/\\w+","//a[contains(@href,'seed-share.com/')]");
      addObsoleteHost("mazzikatop\\.com\/\\w+","//a[contains(@href,'mazzikatop.com/')]");
      addObsoleteHost("saba\\.mehargroup\\.org\/\\w+","//a[contains(@href,'saba.mehargroup.org/')]");
      addObsoleteHost("themeyoou\\.com\/\\w+","//a[contains(@href,'themeyoou.com/')]");
      addObsoleteHost("do32\\.com\/\\w+","//a[contains(@href,'do32.com/')]");
      addObsoleteHost("sharequickly\\.com\/\\w+","//a[contains(@href,'sharequickly.com/')]");
      addObsoleteHost("speeddsharing\\.info\/\\w+","//a[contains(@href,'speeddsharing.info/')]");
      addObsoleteHost("downup\\.us\\.to\/\\w+","//a[contains(@href,'downup.us.to/')]");
      addObsoleteHost("gfxshare\\.net\/\\w+","//a[contains(@href,'gfxshare.net/')]");
      addObsoleteHost("sharedl\\.com\/\\w+","//a[contains(@href,'sharedl.com/')]");
      addObsoleteHost("bit\\.vc\/\\w+","//a[contains(@href,'bit.vc/')]");
      addObsoleteHost("filestrack\\.com\/\\w+","//a[contains(@href,'filestrack.com/')]");
      addObsoleteHost("emodownloads\.com\/\\w+","//a[contains(@href,'emodownloads.com/')]");
      addObsoleteHost("fileslinks\\.com\/\\w+","//a[contains(@href,'fileslinks.com/')]");
      addObsoleteHost("themes\\.pickplus\\.net\/\\w+","//a[contains(@href,'themes.pickplus.net/')]");
      addObsoleteHost("mruploads\\.com\/\\w+","//a[contains(@href,'mruploads.com/')]");
      addObsoleteHost("warmfile\\.com\/\\w+","//a[contains(@href,'warmfile.com/')]");
      addObsoleteHost("adf\\.ly\/\\w+","//a[contains(@href,'adf.ly/')]");
      addObsoleteHost("gptfile\\.com\/\\w+","//a[contains(@href,'gptfile.com/')]");
      addObsoleteHost("uploadfloor\\.com\/\\w+","//a[contains(@href,'uploadfloor.com/')]");
      addObsoleteHost("bestsharing\\.com\/\\w+","//a[contains(@href,'bestsharing.com/')]");
      addObsoleteHost("getfile\\.biz\/\\w+","//a[contains(@href,'getfile.biz/')]");
      addObsoleteHost("upload66\\.com\/\\w+","//a[contains(@href,'upload66.com/')]");
      addObsoleteHost("fileshack\\.icraze\\.net\/\\w+","//a[contains(@href,'fileshack.icraze.net/')]");
      addObsoleteHost("mazupload\\.com\/\\w+","//a[contains(@href,'mazupload.com/')]");
      addObsoleteHost("halotemplate\\.free\\.fr\/\\w+","//a[contains(@href,'halotemplate.free.fr/')]");
      addObsoleteHost("desiload\\.com\/\\w+","//a[contains(@href,'desiload.com/')]");
      addObsoleteHost("filegiant\\.net\/\\w+","//a[contains(@href,'filegiant.net/')]");
      addObsoleteHost("voodoom\\.com\/\\w+","//a[contains(@href,'voodoom.com/')]");
      addObsoleteHost("getupload\\.com\/\\w+","//a[contains(@href,'getupload.com/')]");
      addObsoleteHost("(?:url\\.|)file\\.am\/\\?\\w+","//a[contains(@href,'url.file.am/')]");
      addObsoleteHost("dago\\.to\/\\w+","//a[contains(@href,'dago.to/')]");
      addObsoleteHost("hamstershare\\.com\/\\w+","//a[contains(@href,'hamstershare.com/')]");
      addObsoleteHost("cinshare\\.com\/\\w+","//a[contains(@href,'cinshare.com/')]");
      addObsoleteHost("supashare\\.net\/\\w+","//a[contains(@href,'supashare.net/')]");
      addObsoleteHost("sharepro\\.info\/\\w+","//a[contains(@href,'sharepro.info/')]");
      addObsoleteHost("momoshare\\.com\/\\w+","//a[contains(@href,'momoshare.com/')]");
      addObsoleteHost("sloveniandesigner\\.com\/\\w+","//a[contains(@href,'sloveniandesigner.com/')]");
      addObsoleteHost("multidesi\\.com\/\\w+","//a[contains(@href,'multidesi.com/')]");
      addObsoleteHost("clonefile\\.com\/\\w+","//a[contains(@href,'clonefile.com/')]");
      addObsoleteHost("uploadski\\.com\/\\w+","//a[contains(@href,'uploadski.com/')]");
      addObsoleteHost("uploads\\.speedie\\-host\\.com\/\\w+","//a[contains(@href,'uploads.speedie-host.com/')]");
      addObsoleteHost("(?:d\\.|)turboupload\\.com\/\\w+","//a[contains(@href,'turboupload.com/')]");
      addObsoleteHost("weefile\\.com\/\\?d\\=\\w+","//a[contains(@href,'weefile.com/')]");
      addObsoleteHost("mykupload\\.freei\\.me\/\\w+","//a[contains(@href,'mykupload.freei.me/')]");
      addObsoleteHost("dl\\.share2u\\.net\/\\w+","//a[contains(@href,'dl.share2u.net/')]");
      addObsoleteHost("appscene\\.org\/\\w+","//a[contains(@href,'appscene.org/')]");
      addObsoleteHost("(?:download\\.)?filestock\\.(?:net|ru)\/\\w+","//a[contains(@href,'filestock.net/') or contains (@href,'filestock.ru/')]");
      addObsoleteHost("youmirror\\.biz\/file\/\\w+","//a[contains(@href,'youmirror.biz/file/')]");
      addObsoleteHost("projectcamelot\\.org\/\\w+","//a[contains(@href,'projectcamelot.org/')]");
      addObsoleteHost("gigupload\\.com\/\\w+","//a[contains(@href,'gigupload.com/')]");
      addObsoleteHost("fairyshare\\.com\/\\w+","//a[contains(@href,'fairyshare.com/')]");
      addObsoleteHost("savefile\\.com\/\\w+","//a[contains(@href,'savefile.com/')]");
      addObsoleteHost("upload\\.ps\/\\w+","//a[contains(@href,'upload.ps/')]");
      addObsoleteHost("divxcloud\\.com\/\\w+","//a[contains(@href,'divxcloud.com/')]");
      addObsoleteHost("editandshare\\.com\/\\w+","//a[contains(@href,'editandshare.com/')]");
      addObsoleteHost("hostupload\\.net\/\\w+","//a[contains(@href,'hostupload.net/')]");
      addObsoleteHost("fileshaker\\.com\/\\w+","//a[contains(@href,'fileshaker.com/')]");
      addObsoleteHost("(?:yo)?uload\\.to\/\\w+","//a[contains(@href,'uload.to/')]");
      addObsoleteHost("addat\\.hu\/\\w+","//a[contains(@href,'addat.hu/')]");
      addObsoleteHost("eyvx\\.com\/\\w+","//a[contains(@href,'eyvx.com/')]");
      addObsoleteHost("(?:FileDeck|filedeck)\\.net\/\\w+","//a[contains(@href,'FileDeck.net/') or contains(@href,'filedeck.net/')]");
      addObsoleteHost("filesnab\\.com\/\\w+","//a[contains(@href,'filesnab.com/')]");
      addObsoleteHost("filetitle\\.com\/\\w+","//a[contains(@href,'filetitle.com/')]");
      addObsoleteHost("ufliq\\.com\/\\w+","//a[contains(@href,'ufliq.com/')]");
      addObsoleteHost("sharebeats\\.com\/\\w+","//a[contains(@href,'sharebeats.com/')]");
      addObsoleteHost("yotafile\\.com\/\\w+","//a[contains(@href,'yotafile.com/')]");
      addObsoleteHost("xxlupload\\.com\/\\w+","//a[contains(@href,'xxlupload.com/')]");
      addObsoleteHost("your\\-filehosting\\.com\/\\w+","//a[contains(@href,'your-filehosting.com/')]");
      addObsoleteHost("uploading\\.to\/\\w+","//a[contains(@href,'uploading.to/')]");
      addObsoleteHost("mummyfile\\.com\/\\w+","//a[contains(@href,'mummyfile.com/')]");
      addObsoleteHost("play\\-host\\.net\/\\w+","//a[contains(@href,'play-host.net/')]");
      addObsoleteHost("(?:d\\.|)namipan\\.com\/\\w+","//a[contains(@href,'namipan.com/')]");
      addObsoleteHost("all(?:drives|shares)\\.ge\/\\w+","//a[contains(@href,'alldrives.ge/') or contains(@href,'allshares.ge/')]");
      addObsoleteHost("uploadace\\.com\/\\w+","//a[contains(@href,'uploadace.com/')]");
      addObsoleteHost("7ups\\.net\/\\w+","//a[contains(@href,'7ups.net/')]");
      addObsoleteHost("buckshare\\.com\/\\w+","//a[contains(@href,'buckshare.com/')]");
      addObsoleteHost("cokluupload\\.com\/\\w+","//a[contains(@href,'cokluupload.com/')]");
      addObsoleteHost("filefaster\\.com\/\\w+","//a[contains(@href,'filefaster.com/')]");
      addObsoleteHost("divxme\\.com\/\\w+","//a[contains(@href,'divxme.com/')]");
      addObsoleteHost("rapidmedia\\.net\/\\w+","//a[contains(@href,'rapidmedia.net/')]");
      addObsoleteHost("filerace\\.com\/\\w+","//a[contains(@href,'filerace.com/')]");
      addObsoleteHost("mdj\\.com\/\\w+","//a[contains(@href,'mdj.com/')]");
      addObsoleteHost("crocshare\\.com\/\\w+","//a[contains(@href,'crocshare.com/')]");
      addObsoleteHost("movbay\\.org\/\\w+","//a[contains(@href,'movbay.org/')]");
      addObsoleteHost("migafile\\.com\/\\w+","//a[contains(@href,'migafile.com/')]");
      addObsoleteHost("dudupload\\.com\/\\w+","//a[contains(@href,'dudupload.com/')]");
      addObsoleteHost("fileuploadx.de\/\\w+","//a[contains(@href,'fileuploadx.de/')]");
      addObsoleteHost("fufox\\.net\/\\?d=\\w+","//a[contains(@href,'fufox.net/')]");
      addObsoleteHost("sharefiles4u\\.com\/\\w+","//a[contains(@href,'sharefiles4u.com/')]");
      addObsoleteHost("fileor\\.com\/\\w+","//a[contains(@href,'fileor.com/')]");
      addObsoleteHost("filedove\\.com\/\\w+","//a[contains(@href,'filedove.com/')]");
      addObsoleteHost("wickedupload\\.com\/\\w+","//a[contains(@href,'wickedupload.com/')]");
      addObsoleteHost("miurl\\.es\/\\w+","//a[contains(@href,'miurl.es/')]");
      addObsoleteHost("sharpfile\\.com\/\\w+","//a[contains(@href,'sharpfile.com/')]");
      addObsoleteHost("freefilehosting\\.ws\/\\w+","//a[contains(@href,'freefilehosting.ws/')]");
      addObsoleteHost("uploadby\\.us\/\\w+","//a[contains(@href,'uploadby.us/')]");
      addObsoleteHost("kisalt\\.me\/\\w+","//a[contains(@href,'kisalt.me/')]");
      addObsoleteHost("wizzupload\\.com\/\\w+","//a[contains(@href,'wizzupload.com/')]");
      addObsoleteHost("squillion\\.com\/\\w+","//a[contains(@href,'squillion.com/')]");
      addObsoleteHost("37v\\.net\/\\w+","//a[contains(@href,'37v.net/')]");
      addObsoleteHost("xshar\\.net\/download\\.php\\?file=\\w+","//a[contains(@href,'xshar.net/')]");
      addObsoleteHost("filemsg\\.com\/\\w+","//a[contains(@href,'filemsg.com/')]");
      addObsoleteHost("datafile\\.us\/\\w+","//a[contains(@href,'datafile.us/')]");
      addObsoleteHost("smallfile\\.in\/\\w+","//a[contains(@href,'smallfile.in/')]");
      addObsoleteHost("space4upload\\.info\/\\w+","//a[contains(@href,'space4upload.info/')]");
      addObsoleteHost("nrgfile\\.com\/\\w+","//a[contains(@href,'nrgfile.com/')]");
      addObsoleteHost("okah\\.com\/\\w+","//a[contains(@href,'okah.com/')]");
      addObsoleteHost("filemojo\\.com\/\\w+","//a[contains(@href,'filemojo.com/')]");
      addObsoleteHost("filerose\\.com\/\\w+","//a[contains(@href,'filerose.com/')]");
      addObsoleteHost("mega\\.huevn\\.com\/\\w+","//a[contains(@href,'mega.huevn.com/')]");
      addObsoleteHost("hitfile\\.net\/\\w+","//a[contains(@href,'hitfile.net/')]");
      addObsoleteHost("(?:ifile\\.it|filecloud\\.io)\/\\w+","//a[contains(@href,'filecloud.io/') or contains(@href,'ifile.it/')]");
      addObsoleteHost("eroshare\\.in\/\\w+","//a[contains(@href,'eroshare.in/')]");
      addObsoleteHost("useupload\\.com\/\\w+","//a[contains(@href,'useupload.com/')]");
      addObsoleteHost("seedfile\\.com\/\\w+","//a[contains(@href,'seedfile.com/')]");
      addObsoleteHost("hatlimit\\.pl\/\\w+","//a[contains(@href,'hatlimit.pl/')]");
      addObsoleteHost("(?:fs\\d{1,2}\\.)?(?:www\\.|)ex\\.ua\/(?:load|get)\/\\d+","//a[contains(@href,'ex.ua/')]");
      addObsoleteHost("filespump\\.com\/\\w+","//a[contains(@href,'filespump.com/')]");
      addObsoleteHost("filezserver\\d{1}\\.byethost12\\.com\/\\w+","//a[contains(@href,'byethost12.com/')]");
      addObsoleteHost("filezzz\\.com\/\\w+","//a[contains(@href,'filezzz.com/')]");
      addObsoleteHost("uploadersite\\.com\/\\w+","//a[contains(@href,'uploadersite.com/')]");
      addObsoleteHost("filegetty\\.com\/\\d+","//a[contains(@href,'filegetty.com/')]");
      addObsoleteHost("nfile.eu\/\\w+","//a[contains(@href,'nfile.eu/')]");
      addObsoleteHost("box4upload\\.com\/\\w+","//a[contains(@href,'box4upload.com/')]");
      addObsoleteHost("envirofile\\.org\/\\w+","//a[contains(@href,'envirofile.org/')]");
      addObsoleteHost("(?:get\\.|)omxira\\.com\/\\w+","//a[contains(@href,'omxira.com/')]");
      addObsoleteHost("evilshare\\.com\/\\w+","//a[contains(@href,'evilshare.com/')]");
      addObsoleteHost("sharehoster\\.de\/\\w+","//a[contains(@href,'sharehoster.de/')]");
      addObsoleteHost("rapidoyun\\.com\/\\w+","//a[contains(@href,'rapidoyun.com/')]");
      addObsoleteHost("shareflare\\.net\/\\w+","//a[contains(@href,'shareflare.net/')]");
      addObsoleteHost("filestrum\\.com\/\\w+","//a[contains(@href,'filestrum.com/')]");
      addObsoleteHost("monsteruploads\\.eu\/\\w+","//a[contains(@href,'monsteruploads.eu/')]");
      addObsoleteHost("coraldrive\\.net\/\\w+","//a[contains(@href,'coraldrive.net/')]");
      addObsoleteHost("files2k\\.eu\/\\w+","//a[contains(@href,'files2k.eu/')]");
      addObsoleteHost("kiwiload\\.com\/\\w+","//a[contains(@href,'kiwiload.com/')]");
      addObsoleteHost("uploadjockey\\.com\/\\w+","//a[contains(@href,'uploadjockey.com/')]");
      addObsoleteHost("i\-filez\\.com\/\\w+","//a[contains(@href,'i-filez.com/')]");
      addObsoleteHost("mylordweb\\.com\/do\\.php\\?filename=\\w+","//a[contains(@href,'mylordweb.com/')]");
      addObsoleteHost("edoc\\.com\/\\w+","//a[contains(@href,'edoc.com/')]");
      addObsoleteHost("mooshare\\.net\/\\w+","//a[contains(@href,'mooshare.net/')]");
      addObsoleteHost("uploadbox\\.com\/\\w+","//a[contains(@href,'uploadbox.com/')]");
      addObsoleteHost("aieshare\\.com\/\\w+","//a[contains(@href,'aieshare.com/')]");
      addObsoleteHost("filegag\\.com\/\\w+","//a[contains(@href,'filegag.com/')]");
      addObsoleteHost("uploadblast\\.com\/\\w+","//a[contains(@href,'uploadblast.com/')]");
      addObsoleteHost("ziddu\\.com\/\\w+","//a[contains(@href,'ziddu.com/')]");
      addObsoleteHost("gbmeister\\.com\/\\w+","//a[contains(@href,'gbmeister.com/')]");
      addObsoleteHost("db\\-rap\\.com\/do\\.php\\?id=\\d+","//a[contains(@href,'db-rap.com/')]");
      addObsoleteHost("rapidshare\\.de\/\\w+","//a[contains(@href,'rapidshare.de/')]");
      addObsoleteHost("venusfile\\.com\/\\w+","//a[contains(@href,'venusfile.com/')]");
      addObsoleteHost("sharesystems\\.de\/\\?hash=\\w+","//a[contains(@href,'sharesystems.de/')]");
      addObsoleteHost("flameupload\\.com\/\\w+","//a[contains(@href,'flameupload.com/')]");
      addObsoleteHost("upload\\.lu\/\\w+","//a[contains(@href,'upload.lu/')]");
      addObsoleteHost("syl\\.me\/\\w+","//a[contains(@href,'syl.me/')]");
      addObsoleteHost("tm\\.gwn\\.ru\/\\w+","//a[contains(@href,'tm.gwn.ru/')]");
      addObsoleteHost("odsiebie\\.pl\/\\w+","//a[contains(@href,'odsiebie.pl/')]");
      addObsoleteHost("fast\\-sharing\\.com\/\\w+","//a[contains(@href,'fast-sharing.com/')]");
      addObsoleteHost("netfolder\\.in\/\\w+","//a[contains(@href,'netfolder.in/')]");
      addObsoleteHost("ifilehosting\\.net\/\\w+","//a[contains(@href,'ifilehosting.net/')]");
      addObsoleteHost("multiupload\\.com\/\\w+","//a[contains(@href,'multiupload.com/')]");
      addObsoleteHost("filehost\\.ws\/\\w+","//a[contains(@href,'filehost.ws/')]");
      addObsoleteHost("bubblefiles\\.com\/\\w+","//a[contains(@href,'bubblefiles.com/')]");
      addObsoleteHost("muchshare\\.net\/\\w+","//a[contains(@href,'muchshare.net/')]");
      addObsoleteHost("upgrand\\.com\/\\w+","//a[contains(@href,'upgrand.com/')]");
      addObsoleteHost("filepanda\\.com\/\\w+","//a[contains(@href,'filepanda.com/')]");
      addObsoleteHost("upshare\\.eu\/\\?d=\\w+","//a[contains(@href,'upshare.eu/')]");
      addObsoleteHost("fileqube\\.com\/\\w+","//a[contains(@href,'fileqube.com/')]");
      addObsoleteHost("uploadit\\.ws\/\\w+","//a[contains(@href,'uploadit.ws/')]");
      addObsoleteHost("turbo\\-share\\.com\/\\w+","//a[contains(@href,'turbo-share.com/')]");
      addObsoleteHost("downupload\\.com\/\\w+","//a[contains(@href,'downupload.com/')]");
      addObsoleteHost("downloadng\\.info\/\\w+","//a[contains(@href,'downloadng.info/')]");
      addObsoleteHost("gups\\.in\/\\w+","//a[contains(@href,'gups.in/')]");
      addObsoleteHost("alexupload\\.com\/\\w+","//a[contains(@href,'alexupload.com/')]");
      addObsoleteHost("littleurl\\.net\/\\w+","//a[contains(@href,'littleurl.net/')]");
      addObsoleteHost("rlslog\\.in\/\\w+","//a[contains(@href,'rlslog.in/')]");
      addObsoleteHost("(?:dl\\.)?faramovie4\\.com\/\\w+","//a[contains(@href,'faramovie4.com/')]");
      addObsoleteHost("(?:dude|DUDE)\\.ir\/\\w+","//a[contains(@href,'dude.ir/') or contains(@href,'DUDE.ir/')]");
      addObsoleteHost("dosyakaydet\\.com\/\\w+","//a[contains(@href,'dosyakaydet.com/')]");
      addObsoleteHost("(?:share-?rapid|share-credit|share-central|share\\-ms|share\\-net|srapid)\.(?:com|cz|sk|biz|net|info|eu)\/stahuj\/\\w+","//a[contains(@href,'share-rapid.') or contains(@href,'sharerapid.') or contains(@href,'share-ms.') or contains(@href,'share-credit.') or contains(@href,'share-central.') or contains(@href,'share-net.') or contains(@href,'srapid.')]");
      addObsoleteHost("filescube\\.com\/\\w+","//a[contains(@href,'filescube.com/')]");
      addObsoleteHost("down\\.uc\\.ae\/\\w+","//a[contains(@href,'down.uc.ae/')]");
      addObsoleteHost("filebrella\\.com\/\\w+","//a[contains(@href,'filebrella.com/')]");
      addObsoleteHost("filerobo\\.com\/\\w+","//a[contains(@href,'filerobo.com/')]");
      addObsoleteHost("nnload\\.com\/\\w+","//a[contains(@href,'nnload.com/')]");
      addObsoleteHost("jamber\\.info\/\\w+","//a[contains(@href,'jamber.info/')]");
      addObsoleteHost("guizmodl\\.net\/\\w+","//a[contains(@href,'guizmodl.net/')]");
      addObsoleteHost("(?:interupload|InterUpload)\\.com\/\\w+","//a[contains(@href,'interupload.com/') or contains(@href,'InterUpload.com/')]");
      addObsoleteHost("peeje(?:share|)\\.com\/\\w+","//a[contains(@href,'peejeshare.com') or contains(@href,'peeje.com')]");
      addObsoleteHost("speed\\-download\\.com\/\\w+","//a[contains(@href,'speed-download.com/')]");
      addObsoleteHost("(?:\\w{2}\\.)uploadtornado\\.com\/\\w+","//a[contains(@href,'uploadtornado.com/')]");
      addObsoleteHost("upshare\\.net\/\\w+","//a[contains(@href,'upshare.net/')]");
      addObsoleteHost("fastyurl\\.info\/\\w+","//a[contains(@href,'fastyurl.info/')]");
      addObsoleteHost("ufile\\.eu\/\\w+","//a[contains(@href,'ufile.eu/')]");
      addObsoleteHost("filevo\\.com\/\\w+","//a[contains(@href,'filevo.com/')]");
      addObsoleteHost("flameload\\.com\/\\w+","//a[contains(@href,'flameload.com/')]");
      addObsoleteHost("(?:turbo\\.)?bgdox\\.com\/\\w+","//a[contains(@href,'bgdox.com/')]");
      addObsoleteHost("grupload\\.com\/\\w+","//a[contains(@href,'grupload.com/')]");
      addObsoleteHost("vip\\-file\\.com\/\\w+","//a[contains(@href,'vip-file.com/')]");
      addObsoleteHost("sms4file\\.com\/\\w+","//a[contains(@href,'sms4file.com/')]");
      addObsoleteHost("solidfile\\.com\/\\w+","//a[contains(@href,'solidfile.com/')]");
      addObsoleteHost("gator175\\.hostgator\\.com\/","//a[contains(@href,'gator175.hostgator.com/')]");
      addObsoleteHost("20g\\.info\/\\w+","//a[contains(@href,'20g.info/')]");
      addObsoleteHost("purples\\.byethost3\\.com\/\\w+","//a[contains(@href,'purples.byethost3.com/')]");
      addObsoleteHost("tvshack\\.net\/\\w+","//a[contains(@href,'tvshack.net/')]");
      addObsoleteHost("eufiles\\.net\/\\w+","//a[contains(@href,'eufiles.net/')]");
      addObsoleteHost("rs\\-layer\\.com\/\\w+","//a[contains(@href,'rs-layer.com/')]");
      addObsoleteHost("archiv\\.to\/\\?Module=Details&HashID=\\w+","//a[contains(@href,'archiv.to/')]");
      addObsoleteHost("share\\.gulli\\.com\/\\w+","//a[contains(@href,'share.gulli.com/')]");
      addObsoleteHost("sharebees\\.com\/\\w+","//a[contains(@href,'sharebees.com/')]");
      addObsoleteHost("filedownloads\\.org\/\\w+","//a[contains(@href,'filedownloads.org/')]");
      addObsoleteHost("uptorch\\.com\/\\?d=\\w+","//a[contains(@href,'uptorch.com/')]");
      addObsoleteHost("terabit\\.to\/\\w+","//a[contains(@href,'terabit.to/')]");
      addObsoleteHost("file4sharing\\.com\/\\w+","//a[contains(@href,'file4sharing.com/')]");
      addObsoleteHost("4shared\\.com\/\\w+","//a[contains(@href,'4shared.com/')]");
      addObsoleteHost("cobrashare\\.sk\/\\w+","//a[contains(@href,'cobrashare.sk/')]");
      addObsoleteHost("catshare\\.net\/\\w+","//a[contains(@href,'catshare.net/')]");
      addObsoleteHost("multishare\\.cz\/\\w+","//a[contains(@href,'multishare.cz/')]");
      addObsoleteHost("sharecash\\.org\/\\w+","//a[contains(@href,'sharecash.org/')]");
      addObsoleteHost("share\\-links\\.biz\/\\w+","//a[contains(@href,'share-links.biz/')]");
      addObsoleteHost("unibytes\\.com\/\\w+","//a[contains(@href,'unibytes.com/')]");
      addObsoleteHost("kongsifile\\.com\/\\w+","//a[contains(@href,'kongsifile.com/')]");
      addObsoleteHost("ncrypt\\.in\/\\w+","//a[contains(@href,'ncrypt.in/')]");
      addObsoleteHost("linksave\\.in\/\\w+","//a[contains(@href,'linksave.in/')]");
      addObsoleteHost("linkcrypt\\.ws\/\\w+","//a[contains(@href,'linkcrypts.ws/')]");
      addObsoleteHost("filesector\\.cc\/\\w+","//a[contains(@href,'filesector.cc/')]");
      addObsoleteHost("upfile\\.in\/\\w+","//a[contains(@href,'upfile.in/')]");
      addObsoleteHost("uploadcore\\.com\/\\w+","//a[contains(@href,'uploadcore.com/')]");
      addObsoleteHost("kewlfile\\.com\/\\w+","//a[contains(@href,'kewlfile.com/')]");
      addObsoleteHost("przeklej\\.pl\/\\w+","//a[contains(@href,'przeklej.pl/')]");
      addObsoleteHost("sharebee\\.com\/\\w+","//a[contains(@href,'sharebee.com/')]");
      addObsoleteHost("share2many\\.com\/\\w+","//a[contains(@href,'share2many.com/')]");
      addObsoleteHost("farmupload\\.com\/\\w+","//a[contains(@href,'farmupload.com/')]");
      addObsoleteHost("exzip\\.com\/\\w+","//a[contains(@href,'exzip.com/')]");
      addObsoleteHost("exoshare\\.com\/\\w+","//a[contains(@href,'exoshare.com/')]");
      addObsoleteHost("go4up\\.com\/\\w+","//a[contains(@href,'go4up.com/')]");
      addObsoleteHost("jheberg\\.net\/\\w+","//a[contains(@href,'jheberg.net/')]");
      addObsoleteHost("firerapid\\.net\/\\w+","//a[contains(@href,'firerapid.net/')]");
      addObsoleteHost("mirrorcreator\\.com\/\\w+","//a[contains(@href,'mirrorcreator.com/')]");
      addObsoleteHost("multiload\\.cz\/\\w+","//a[contains(@href,'multiload.cz/')]");
      addObsoleteHost("multiupload\\.nl\/\\w+","//a[contains(@href,'multiupload.nl/')]");
      addObsoleteHost("multi\\-up\\.com\/\\w+","//a[contains(@href,'multi-up.com/')]");
      addObsoleteHost("multisiteupload\\.com\/\\w+","//a[contains(@href,'multisiteupload.com/')]");
      addObsoleteHost("qooy\\.com\/\\w+","//a[contains(@href,'qooy.com/')]");
      addObsoleteHost("megaupper\\.com\/\\w+","//a[contains(@href,'megaupper.com/')]");
      addObsoleteHost("embedupload\\.com\/\\w+","//a[contains(@href,'embedupload.com/')]");
      addObsoleteHost("splitr\\.net\/\\w+","//a[contains(@href,'splitr.net/')]");
      addObsoleteHost("uploadmirrors\\.com\/\\w+","//a[contains(@href,'uploadmirrors.com/')]");
      addObsoleteHost("uploadtubes\\.com\/\\w+","//a[contains(@href,'uploadtubes.com/')]");
      addObsoleteHost("mirrorafile\\.com\/\\w+","//a[contains(@href,'mirrorafile.com/')]");
      addObsoleteHost("maxmirror\\.com\/\\w+","//a[contains(@href,'maxmirror.com/')]");
      addObsoleteHost("uploadonall\\.com\/\\w+","//a[contains(@href,'uploadonall.com/')]");
      addObsoleteHost("mirrorupload\\.net\/\\w+","//a[contains(@href,'mirrorupload.net/')]");
      addObsoleteHost("dl4\\.ru\/\\w+","//a[contains(@href,'dl4.ru/')]");
      addObsoleteHost("digzip\\.com\/\\w+","//a[contains(@href,'digzip.com/')]");
      addObsoleteHost("tinypaste\\.com\/\\w+","//a[contains(@href,'tinypaste.com/')]");
      addObsoleteHost("loombo\\.com\/\\w+","//a[contains(@href,'loombo.com/')]");
      addObsoleteHost("superupl\\.com\/\\w+","//a[contains(@href,'superupl.com/')]");
      addObsoleteHost("xoomshare\\.com\/\\w+","//a[contains(@href,'xoomshare.com/')]");
      addObsoleteHost("file2011\\.co\\.cc\/\/?\\w+","//a[contains(@href,'file2011.co.cc/')]");
      addObsoleteHost("speedoshare\\.com\/\\w+","//a[contains(@href,'speedoshare.com/')]");
      addObsoleteHost("unextfiles\\.com\/\\w+","//a[contains(@href,'unextfiles.com/')]");
      addObsoleteHost("neoupload\\.com\/\\w+","//a[contains(@href,'neoupload.com/')]");
      addObsoleteHost("adlee\\.ch\/\\w+","//a[contains(@href,'adlee.ch/')]");
      addObsoleteHost("shareupload\\.net\/\\w+","//a[contains(@href,'shareupload.net/')]");
      addObsoleteHost("netkozmos\\.com\/\\w+","//a[contains(@href,'netkozmos.com/')]");
      addObsoleteHost("jumbodrop\\.com\/\\w+","//a[contains(@href,'jumbodrop.com/')]");
      addObsoleteHost("nukeshare\\.com\/\\w+","//a[contains(@href,'nukeshare.com/')]");
      addObsoleteHost("tvchaty\\.com\/\\w+","//a[contains(@href,'tvchaty.com/')]");
      addObsoleteHost("filemates\\.com\/\\w+","//a[contains(@href,'filemates.com/')]");
      addObsoleteHost("putbit\\.net\/\\w+","//a[contains(@href,'putbit.net/')]");
      addObsoleteHost("upload\\.el3lam\\.com\/\\w+","//a[contains(@href,'upload.el3lam.com')]");
      addObsoleteHost("uploadbear\\.com\/\\w+","//a[contains(@href,'uploadbear.com/')]");
      addObsoleteHost("videoal3rab\\.com\/\\w+","//a[contains(@href,'videoal3rab.com/')]");
      addObsoleteHost("pigsonic\\.com\/\\w+","//a[contains(@href,'pigsonic.com/')]");
      addObsoleteHost("upzetta\\.com\/\\w+","//a[contains(@href,'upzetta.com/')]");
      addObsoleteHost("down\\.vg\/\\w+","//a[contains(@href,'down.vg/')]");
      addObsoleteHost("fullshare\\.net\/\\w+","//a[contains(@href,'fullshare.net/')]");
      addObsoleteHost("home4file\\.com\/\\w+","//a[contains(@href,'home4file.com/')]");
      addObsoleteHost("mintupload\\.com\/\\w+","//a[contains(@href,'mintupload.com/')]");
      addObsoleteHost("paid4download\\.com\/\\w+","//a[contains(@href,'paid4download.com/')]");
      addObsoleteHost("sharehoster\\.com\/\\w+","//a[contains(@href,'sharehoster.com/')]");
      addObsoleteHost("wootly\\.com\/\\w+","//a[contains(@href,'wootly.com/')]");
      addObsoleteHost("spreadmyfiles\\.com\/\\w+","//a[contains(@href,'spreadmyfiles.com/')]");
    }
    
    if (GM_getValue("Check_censors", false))
    {
      addObsoleteHost("~ Multi hosts disallowed\\. Please post direct links only\\. ~","//a[contains(@href,'~ Multi hosts')]");
      addObsoleteHost("~ Spam Site ~","//a[contains(@href,'~ Spam Site ~')]");
      addObsoleteHost("~~ Censored links, Post Direct Links! ~~","//a[contains(@href,'~~ Censored')]");
      addObsoleteHost("~[fF]olders are not allowed, please post direct links~","//a[contains(@href,'~Folders') or contains(@href,'~folders')]");
      addObsoleteHost("~ Folder links are not allowed ~","//a[contains(@href,'~ Folder')]");
      addObsoleteHost("~ Due To The Increase In Phishing We Now Disallow Protected URL's ~","//a[contains(@href,'~ Due')]");
      addObsoleteHost("~Not allowed Direct links only~","//a[contains(@href,'~Not allowed')]");
      addObsoleteHost("~ I Am A Porn Site Please Report Me To A Moderator ~","//a[contains(@href,'Report Me To A Moderator ~')]");
      addObsoleteHost("~Report Me- Direct Links Only~","//a[contains(@href,'~Report Me-')]");
      addObsoleteHost("~ Banned File Host! ~","//a[contains(@href,'~ Banned')]");
      addObsoleteHost("~ Folders are banned, report me ~","//a[contains(@href,'~ Folders')]");
      addObsoleteHost("~Direct links only~","//a[contains(@href,'~Direct')]");
      addObsoleteHost("~forbidden~","//a[contains(@href,'~forbidden~')]");
      addObsoleteHost("~ CENSORED SITE ~","//a[contains(@href,'~ CENSORED')]");
      addObsoleteHost("~not allowed, please post direct links~","//a[contains(@href,'~not allowed')]");
      addObsoleteHost("~ Link folders \\(directories\\) not allowed\\. Direct links only\\. ~","//a[contains(@href,'~ Link folders')]");
      addObsoleteHost("~ Due to the increase in Phishing, we now disallow protected URLs ~","//a[contains(@href,'~ Due')]");
      addObsoleteHost("~Spam~:38080","//a[contains(@href,'~Spam~:38080')]");
      addObsoleteHost("~ Spam ~\/download","//a[contains(@href,'~ Spam ~/download')]");
      addObsoleteHost("~If you are reading this report this SPAMMER to a moderator~","//a[contains(@href,'to a moderator~')]");
      addObsoleteHost("~The shorten url or custom links are not allowed for this site\\.~ ","//a[contains(@href,'~The shorten url')]");
      addObsoleteHost("~3rd Party links are not allowed. Direct Links Only~","//a[contains(@href,'~3rd Party')]");
      addObsoleteHost("~ If you are reading this report this SPAMMER to a moderator ~","//a[contains(@href,'to a moderator ~')]");
      addObsoleteHost("~Direct links only - please report me~","//a[contains(@href,'report me~')]");
      addObsoleteHost("~ Due to the increase in phishing, we now disallow protected URLs ~","//a[contains(@href,'protected URLs ~')]");
      addObsoleteHost("~Not allowed direct links only~","//a[contains(@href,'~Not allowed')]");
      addObsoleteHost("~ Folders Are Banned, Report Me ~","//a[contains(@href,'Report Me ~')]");
      addObsoleteHost("\\- I failed to follow the rules about Direct LINKS ONLY, Please report me! \\- ","//a[contains(@href,'report me! -')]");
      addObsoleteHost("~Spyware~","//a[contains(@href,'~Spyware~')]");
    }
    //obsolete file hosts init end
    
    function addFileHost(linkRegex, isAliveRegex, isDeadRegex, isUnavaRegex, xpathEx, tryLoop)
    {
      var host = new Array(6);
      host[0] = linkRegex;
      host[1] = isAliveRegex;
      host[2] = isDeadRegex;
      host[3] = isUnavaRegex;
      host[4] = xpathEx;
      tryLoop ? host[5] = true : host[5] = false;
      http_file_hosts.push(host);
    }

    if (GM_getValue("Check_megafileupload_dot_com_links", false))
    {
      addFileHost(
      "megafileupload\.com\/..\/file\/",
      'downloadbtn',
      'is not found',
      'optional--',
      "//a[contains(@href,'megafileupload.com')]");
    }

    if (GM_getValue("Check_demo_dot_ovh_dot_com_links", false))
    {
      addFileHost(
      "demo\\.ovh\\.(?:com|net)\/\\w+",
      'download\\.gif"',
      'p_point">',
      'optional--',
      "//a[contains(@href,'demo.ovh.com') or contains(@href,'demo.ovh.net')]");
    }

    if (GM_getValue("Check_safelinking_dot_net_links", false))
    {
      addFileHost(
      "safelinking\\.net\/p\/\\w+",
      'color:green;"',
      'color:red;"|<p>This link does not exist.',
      'color:(?:grey|orange|brown);"',
      "//a[contains(@href,'safelinking.net/p/')]",
      true);
    }

    if (GM_getValue("Check_keeplinks_dot_me_links", false))
    {
      addFileHost(
      "keeplinks\\.me\/p\/\\w+",
      'isAliveRegex', //no way of checking links inside package
      'link does not exist.<\/h1>',
      'Protected Links<\/h1>',
      "//a[contains(@href,'keeplinks.me/p/')]"
      );
    }

    if (GM_getValue("Check_ultramegabit_dot_com_links", false))
    {
      addFileHost(
      "ultramegabit\\.com\/file\/details\/[\\w+-]",
      '#download"',
      '>File (?:not found|restricted|has been deleted(?:\\.| in compliance with the DMCA))<|\/folder\/add',
      'btn-large btn-danger">|Account limitation notice',
      "//a[contains(@href,'ultramegabit.com/file')]",
      true);
    }
    
    if (GM_getValue("Check_fastshare_dot_cz_links", false))
    {
      addFileHost(
      "fastshare\\.cz\/\\d+\/\\w*",
      'dwntable">',
      'nebyla nalezena|nebola nájdená|nie została odnaleziona|color:red;font-weight:bold;border\\-style:dashed|<b>Requested page not found\\.',
      'optional--',
      "//a[contains(@href,'fastshare.cz')]");
    }
    
    if (GM_getValue("Check_fastshare_dot_org_links", false))
    {
      addFileHost(
      "[fF]ast[sS]hare\\.org\/download",
      'Download ">',
      'Diese Datei wurde wegen|wurde kein Dateiname',
      'optional--',
      "//a[contains(@href,'fastshare.org/download') or contains(@href,'FastShare.org/download')]");
    }

    if (GM_getValue("Check_partage_dash_facile_dot_com_links", false))
    {
      addFileHost(
      "partage-facile\.com\/\\w+",
      '\/dl-view\.php"',
      'Erreur 404|equiv="refresh',
      'optional--',
      "//a[contains(@href,'partage-facile.com')]");
    }
    
    if (GM_getValue("Check_uploadorb_dot_com_links", false))
    {
      addFileHost(
      "uploadorb\\.com\/\\w+",
      'op" value="download',
      'class="err">|width:500px;text-align:left;">',
      'optional--',
      "//a[contains(@href,'uploadorb.com')]");
    }
    
    if (GM_getValue("Check_1fichier_dot_com_links", false))
    {
      addFileHost(
      "\\w+\\.(?:1fichier|dl4free)\\.com\/?",
      'Download tag"|countdown">|class="form-button"',
      'errorDiv"|File not found|Fichier introuvable',
      'optional--',
      "//a[contains(@href,'1fichier.com') or contains(@href,'dl4free.com')]"
      );
    }
    
    if (GM_getValue("Check_rapidgator_dot_net_links", false))
    {
      addFileHost(
      "rapidgator\\.net\/file\/\\w+",
      'btm" style="height: \\d+px;">\\s*<p',
      'btm" style="height: \\d+px;">\\s*<\/div',
      'optional--',
      "//a[contains(@href,'rapidgator.net/file')]",
      true
      );
    }
    
    if (GM_getValue("Check_bayfiles_dot_com_links", false))
    {
      addFileHost(
      "bayfiles\\.com\/file\/\\w+\/\\w+",
      'download\\-header">',
      'class="not-found">',
      'optional--',
      "//a[contains(@href,'bayfiles.com/file')]"
      );
    }

    if (GM_getValue("Check_erofly_dot_cz_links", false))
    {
      addFileHost(
      "erofly\\.(?:cz|sk|pl)\/\\d+_\\w*",
      'down-button">',
      'dokument nebyl nalezen|nie został znaleziony|nebol nájdený',
      'optional--',
      "//a[contains(@href,'erofly.')]"
      );
    }

    if (GM_getValue("Check_relink_dot_us_links", false))
    {
      addFileHost(
      "relink\\.us\/(?:f\/\\w+|go\\.php\\?id=\\d+|view\\.php\\?id=\\d+)",
      'online_detail\\.png" alt="Status',
      '(?:offline|partially)_detail\\.png" alt="Status|File deleted',
      'unknown_detail\\.png" alt="Status',
      "//a[contains(@href,'relink.us/')]"
      );
    }
    
    if (GM_getValue("Check_flyfiles_dot_net_links", false))
    {
      addFileHost(
      "flyfiles\\.net\/\\w+",
      'download_button"|"Download file"',
      'File not found!|Файл не найден',
      'optional--',
      "//a[contains(@href,'flyfiles.net/')]"
      );
    }
    
    if (GM_getValue("Check_wikiupload_dot_com_links", false))
    {
      addFileHost(
      "wikiupload\\.com\/\\w+",
      'download-button">',
      'Sorry, File not found|theme\\-container">',
      'optional--',
      "//a[contains(@href,'wikiupload.com/')]"
      );
    }
    
    if (GM_getValue("Check_bitbonus_dot_com_links", false))
    {
      addFileHost(
      "bitbonus\\.com\/download\/\\w+",
      'icon_download\\.gif"',
      'icon_redirect\\.gif"',
      'optional--',
      "//a[contains(@href,'bitbonus.com/download')]"
      );
    }
    
    if (GM_getValue("Check_hostuje_dot_net_links", false))
    {
      addFileHost(
      "hostuje\\.net\/file\\.php\\?id=\\w+",
      'file\\.php">|Pobierz Plik',
      'Podany plik zosta. skasowany z powodu naruszania praw autorskich...|Podany plik nie zosta. odnaleziony...',
      'optional--',
      "//a[contains(@href,'hostuje.net/file')]"
      );
    }

    if (GM_getValue("Check_gettyfile_dot_ru_links", false))
    {
      addFileHost(
      "gettyfile\\.ru\/\\d+",
      'download\\.gif border',
      '<center><font size="3">',
      'optional--',
      "//a[contains(@href,'gettyfile.ru/')]"
      );
    }
    
    if (GM_getValue("Check_4fastfile_dot_com_links", false))
    {
      addFileHost(
      "4fastfile\\.com\/abv-fs\/\\d+",
      'file-download">',
      'v><div id="block',
      'optional--',
      "//a[contains(@href,'4fastfile.com/abv')]"
      );
    }
    
    if (GM_getValue("Check_slingfile_dot_com_links", false))
    {
      addFileHost(
      "slingfile\\.com\/(?:dl|file|video)\/\\w+",
      'fileinfo">',
      'errorbox">',
      'optional--',
      "//a[contains(@href,'slingfile.com/')]"
      );
    }

    if (GM_getValue("Check_tufiles_dot_ru_links", false))
    {
      addFileHost(
      "(?:tufiles|turbob1t|failoobmenik|filesmail|firebit|dlbit|files\\.china\\-gsm|3aka4aem|file\\.piratski|mnogofiles|links-free|turbo-bit|turbosfiles)\\.\\w+\/\\w+",
      'download\\-file">',
      'col-1">\\s*<h1>',
      'optional--',
      "//a[contains(@href,'tufiles.ru/') or contains(@href,'turbob1t.ru/') or contains(@href,'filesmail.ru/') or contains(@href,'failoobmenik.ru/')"+
      " or contains(@href,'firebit.in/') or contains(@href,'dlbit.net/') or contains(@href,'files.china-gsm.ru/') or contains(@href,'3aka4aem.ru/')"+
      " or contains(@href,'file.piratski.ru/') or contains(@href,'mnogofiles.com/') or contains(@href,'links-free.ru/')"+
      " or contains(@href,'turbo-bit.ru/') or contains(@href,'turbosfiles.ru/')]"
      );
    }

    if (GM_getValue("Check_fileshare_dot_in_dot_ua_links", false))
    {
      addFileHost(
      "fileshare\\.in\\.ua\/\\w+",
      '"file_name ',
      'df_content">',
      'optional--',
      "//a[contains(@href,'fileshare.in.ua')]"
      );
    }
    
    if (GM_getValue("Check_data_dot_hu_links", false))
    {
      addFileHost(
      "data\\.hu\/get\/\\d+\/",
      'download_box_button',
      'missing\\.php',
      'optional--',
      "//a[contains(@href,'data.hu/get')]",
      true
      );
    }
    
    if (GM_getValue("Check_filesmelt_dot_com_links", false))
    {
      addFileHost(
      "filesmelt\\.com\/dl\/\\w+",
      'ready">',
      'Sorry, but your',
      'optional--',
      "//a[contains(@href,'filesmelt.com/dl')]"
      );
    }
    
    if (GM_getValue("Check_packupload_dot_com_links", false))
    {
      addFileHost(
      "packupload\\.com\/\\w+",
      'buttonDelay"',
      'bold; color: #ff0000',
      'optional--',
      "//a[contains(@href,'packupload.com/')]"
      );
    }
    
    if (GM_getValue("Check_files_dot_indowebster_dot_com_links", false))
    {
      addFileHost(
      "files\\.indowebster\\.com\/download\/\\w+\/",
      'premiumBtn"',
      'errorMessage"',
      'optional--',
      "//a[contains(@href,'indowebster.com/download')]"
      );
    }
    
    if (GM_getValue("Check_superload_dot_cz_links", false))
    {
      addFileHost(
      "superload\\.cz\/dl\/\\w+",
      'icon-download">',
      'soubor nebyl nalezen',
      'optional--',
      "//a[contains(@href,'superload.cz/dl')]"
      );
    }
    
    if (GM_getValue("Check_easybytez_dot_com_links", false))
    {
      addFileHost(
      "easybytez\\.com\/\\w+",
      'op" value="download',
      'stop_error\\.gif',
      'optional--',
      "//a[contains(@href,'easybytez.com/')]"
      );
    }
    
    if (GM_getValue("Check_filestore_dot_com_dot_ua_links", false))
    {
      addFileHost(
      "filestore\\.com\\.ua\/\\?d=\\w+",
      'tdrow1>',
      'class=warn',
      'optional--',
      "//a[contains(@href,'filestore.com.ua/?d=')]"
      );
    }
    
    if (GM_getValue("Check_netkups_dot_com_links", false))
    {
      addFileHost(
      "netkups\\.com\/\\?d=\\w+",
      'submit">Continue',
      'page">File not found|deleted due to inactivity',
      'optional--',
      "//a[contains(@href,'netkups.com/?d=')]"
      );
    }

    if (GM_getValue("Check_openfile_dot_ru_links", false))
    {
      addFileHost(
      "openfile\\.ru\/(?:video\/|)\\d+",
      'videobox_left">',
      'blog_title">|not found on this server',
      'optional--',
      "//a[contains(@href,'openfile.ru/')]"
      );
    }
    
    if (GM_getValue("Check_extmatrix_dot_com_links", false))
    {
      addFileHost(
      "extmatrix\\.com\/files\/\\w+",
      'div class="success"',
      'div class="error"',
      'optional--',
      "//a[contains(@href,'extmatrix.com/files')]"
      );
    }
    
    if (GM_getValue("Check_sendfiles_dot_nl_links", false))
    {
      addFileHost(
      "sendfiles\\.nl\/download.aspx\\?ID=\\w+",
      'content_lnkDownload',
      'error\\.aspx\\?',
      'optional--',
      "//a[contains(@href,'sendfiles.nl/download.aspx')]"
      );
    }
    
    if (GM_getValue("Check_freeuploads_dot_fr_links", false))
    {
      addFileHost(
      "(?:freeuploads\\.fr|uploa\\.dk)\/\\?d=\\d+",
      'freeuploads\\.fr\/download\/',
      'text-align:left;margin:10px;">',
      'optional--',
      "//a[contains(@href,'freeuploads.fr/?d=') or contains(@href,'uploa.dk/?d=')]"
      );
    }
    
    if (GM_getValue("Check_sockshare_dot_com_links", false))
    {
      addFileHost(
      "sockshare\\.com\/file\/\\w+",
      'choose_speed">',
      'message t_0\'>|Welcome to SockShare<\/h1>',
      'optional--',
      "//a[contains(@href,'sockshare.com/file')]"
      );
    }
    
    if (GM_getValue("Check_yourfilestore_dot_com_links", false))
    {
      addFileHost(
      "yourfilestore\\.com\/download\/\\d+\/",
      'download_data">',
      'may have been deleted|<h1>Sorry!<\/h1>',
      'optional--',
      "//a[contains(@href,'yourfilestore.com/download')]"
      );
    }
    
    if (GM_getValue("Check_nekaka_dot_com_links", false))
    {
      addFileHost(
      "nekaka\\.com\/d\/[\\w-]+",
      'downloadForm">',
      'invalid file link',
      'optional--',
      "//a[contains(@href,'nekaka.com/d')]"
      );
    }
    
    if (GM_getValue("Check_filebig_dot_net_links", false))
    {
      addFileHost(
      "filebig\\.net\/files\/\\w+",
      'downloadFile">',
      '<p>File not found<\/p>',
      'optional--',
      "//a[contains(@href,'filebig.net/files')]"
      );
    }

    if (GM_getValue("Check_gamefront_dot_com_links", false))
    {
      addFileHost(
      "(?:files\\.|\\w+\\.|)(?:file|game)front\\.com\/\\w+",
      'downloadLink">|class="downloadNow"|<strong>Download',
      'File not found, you|(?:File|Page) Not Found',
      'unavailable at the moment',
      "//a[contains(@href,'filefront.com/') or contains(@href,'gamefront.com/')]"
      );
    }
    
    if (GM_getValue("Check_hellupload_dot_com_links", false))
    {
      addFileHost(
      "hellupload\\.com\/\\w+",
      'op" value="download',
      'class="err">|width:500px;text-align:left;">|file_error_info">',
      'optional--',
      "//a[contains(@href,'hellupload.com/')]"
      );
    }
    
    if (GM_getValue("Check_free_dash_uploading_dot_com_links", false))
    {
      addFileHost(
      "free\\-uploading\\.com\/\\w+",
      'op" value="download',
      'class="err">|width:500px;text-align:left;">',
      'optional--',
      "//a[contains(@href,'free-uploading.com/')]"
      );
    }
    
    if (GM_getValue("Check_toucansharing_dot_com_links", false))
    {
      addFileHost(
      "toucansharing\\.com\/\\w+",
      'op" value="download',
      'class="err">|width:500px;text-align:left;">',
      'optional--',
      "//a[contains(@href,'toucansharing.com/')]"
      );
    }

    if (GM_getValue("Check_2download_dot_de_links", false))
    {
      addFileHost(
      "2download\\.de\/download\\-",
      'button_dl\\.png',
      '"error">',
      'optional--',
      "//a[contains(@href,'2download.de/download-')]"
      );
    }
    
    if (GM_getValue("Check_uppit_dot_com_links", false))
    {
      addFileHost(
      "(?:uppit\\.com|up\\.ht)\/\\w+",
      'op" value="download',
      'class="err">|style="width:500px;text-align:left;"|fish-404\\.png"',
      'optional--',
      "//a[contains(@href,'up.ht/') or contains(@href,'uppit.com/')]",
      true
      );
    }
    
    if (GM_getValue("Check_maxshare_dot_pl_links", false))
    {
      addFileHost(
      "maxshare\\.pl\/download\\.php\\?dl=\\w+",
      'class="pobierz"',
      'class="wyszuskiwarkabg"',
      'optional--',
      "//a[contains(@href,'maxshare.pl/download.php')]",
      true
      );
    }
    
    if (GM_getValue("Check_nosupload_dot_com_links", false))
    {
      addFileHost(
      "nosupload\\.com\/(?:\\?d=)?\\w+",
      'op" value="download',
      '>File Not Found<',
      'optional--',
      "//a[contains(@href,'nosupload.com')]",
      true
      );
    }
    
    if (GM_getValue("Check_filesin_dot_com_links", false))
    {
      addFileHost(
      "filesin\\.com\/\\w+",
      'download_area">',
      'error_note">',
      'optional--',
      "//a[contains(@href,'filesin.com/')]",
      true
      );
    }
    
    if (GM_getValue("Check_nowdownload_dot_eu_links", false))
    {
      addFileHost(
      "nowdownload\\.eu\/dl\/\\w+",
      'alert-success"',
      'This file does not exist!',
      'The file is being transfered',
      "//a[contains(@href,'nowdownload.eu/dl')]"
      );
    }
    
    //do not use bulk check via http://egofiles.com/checker (false positives) 
    if (GM_getValue("Check_egofiles_dot_com_links", false))
    {
      addFileHost(
      "egofiles\\.com\/\\w+",
      'dwn-button"',
      '404 File not found',
      'optional--',
      "//a[contains(@href,'egofiles.com/')]"
      );
    }
    
    if (GM_getValue("Check_axifile_dot_com_links", false))
    {
      addFileHost(
      "axifile\\.com(?:\/\w(2))?\/\\??\\w+",
      'Dbutton_big"',
      'download\\-error\\.php',
      'optional--',
      "//a[contains(@href,'axifile.com/')]"
      );
    }
    
    if (GM_getValue("Check_asfile_dot_com_links", false))
    {
      addFileHost(
      "asfile\\.com\/file\/\\w+",
      'link_line">',
      'Page not found|(?:deleted|is not exist)<\/strong>',
      'optional--',
      "//a[contains(@href,'asfile.com/file')]"
      );
    }
    
    //do not use checkfiles.html bulk check, not working properly for all links
    if (GM_getValue("Check_hulkshare_dot_com_links", false))
    {
      addFileHost(
      "(?:hulkshare\\.com|hu\\.lk)\/\\w+",
      'download\.sam\.png|This is a private file|bigDownloadBtn basicDownload',
      'File does not exist|fingerprint protected copyright|disabled for public access|File no longer available!',
      'optional--',
      "//a[contains(@href,'hulkshare.com')]"
      );
    }
    
    if (GM_getValue("Check_hulkfile_dot_eu_links", false))
    {
      addFileHost(
      "(?:w\\.hulkfile\\.com|hulkfile\\.eu)\/\\w+",
      'op" value="download',
      'class="err">|width:500px;text-align:left;">',
      'optional--',
      "//a[contains(@href,'hulkfile.')]"
      );
    }
    
    if (GM_getValue("Check_mojedata_dot_sk_links", false))
    {
      addFileHost(
      "mojedata\\.sk\/\\w+",
      'download-button"',
      's.bor je fu.|404 Not Found',
      'optional--',
      "//a[contains(@href,'mojedata.sk')]"
      );
    }

    if (GM_getValue("Check_hotfile_dot_com_links", false))
    {
      addFileHost(
      "hotfile\\.com\/file\/\\w+",
      'optional--',
      'Not Found',
      'optional--',
      "//a[contains(@href,'hotfile.com/file/')]"
      );
      
      addFileHost(
      "hotfile\\.com\/get\/\\d+\/\\w+",
      "Download file",
      "This file is either removed due to copyright claim or is deleted by the uploader.",
      "optional--",
      "//a[contains(@href,'hotfile.com/get/')]"
      );
    }

    if (GM_getValue("Check_movshare_dot_net_links", false))
    {
      addFileHost(
      "movshare\\.net\/\\w+",
      'videoPlayer"',
      'no longer exists',
      'optional--',
      "//a[contains(@href,'movshare.net/')]"
      );
    }
    
    if (GM_getValue("Check_mafiastorage_dot_com_links", false))
    {
      addFileHost(
      "mafiastorage\\.com\/\\w+",
      'op" value="download',
      'class="err">|style="width:500px;text-align:left;"',
      'optional--',
      "//a[contains(@href,'mafiastorage.com/')]"
      );
    }

    if (GM_getValue("Check_uploadspace_dot_pl_links", false))
    {
      addFileHost(
      "uploadspace\.pl\/plik\\w+",
      'Downloading .+? \\|',
      'Downloading a file',
      'optional--',
      "//a[contains(@href,'uploadspace.pl/plik')]"
      );
    }
    
    if (GM_getValue("Check_hipfile_dot_com_links", false))
    {
      addFileHost(
      "hipfile\\.com\/\\w+",
      'op" value="download',
      'File Not Found<|removed by administrator|>Datei nicht gefunden',
      'optional--',
      "//a[contains(@href,'hipfile.com')]"
      );
    }
    
    if (GM_getValue("Check_uploadingit_dot_com_links", false))
    {
      addFileHost(
      "uploadingit\\.com\/(?:file|d)\/\\w+",
      'downloadTitle">',
      'deleteContent">',
      'optional--',
      "//a[contains(@href,'uploadingit.com/')]"
      );
    }
    
    if (GM_getValue("Check_stiahni_dot_si_links", false))
    {
      addFileHost(
      "stiahni\\.si\/download\\.php\\?id=\\d+",
      'downloadbtn',
      'exclamation\\.png',
      'optional--',
      "//a[contains(@href,'stiahni.si/download')]"
      );
    }

    if (GM_getValue("Check_rapidshare_dot_ru_links", false))
    {
      addFileHost(
      "rapidshare\\.ru\/\\d+",
      'Вы хотите скачать файл:',
      'Ошибка: Файл был',
      'optional--',
      "//a[contains(@href,'rapidshare.ru/')]"
      );
    }

    if (GM_getValue("Check_rghost_dot_net_links", false))
    {
      addFileHost(
      "rghost\.(?:net|ru)\/(?:|private\/)\\d+",
      'download_link|btn large download"',
      'file is restricted|File is deleted|503 Service Unavailable',
      'File was deleted',
      "//a[contains(@href,'rghost.')]"
      );
    }

    if (GM_getValue("Check_xdisk_dot_cz_links", false))
    {
      addFileHost(
      "xdisk\\.cz\/(?:..\/)?download\\.php\\?id=\\w+",
      '">Staženo:\\s*<\/span>',
      'Soubor, který hledáte nenalezen',
      'optional--',
      "//a[contains(@href,'xdisk.cz/')]"
      );
    }

    if (GM_getValue("Check_videozer_dot_com_links", false))
    {
      addFileHost(
      "videozer\\.com\/video\/\\w+",
      'video_player"',
      'error_404"',
      'optional--',
      "//a[contains(@href,'videozer.com/video')]"
      );
    }

    if (GM_getValue("Check_divxden_dot_com_links", false))
    {
      addFileHost(
      "(?:divxden|vidbux)\.com\/\\w+",
      'Continue to Video"',
      'No such file',
      'optional--',
      "//a[contains(@href,'divxden.com') or contains(@href,'vidbux.com/')]"
      );
    }

    if (GM_getValue("Check_share_dash_now_dot_net_links", false))
    {
      addFileHost(
      "share-now\.net\/\/?files\/\\d+",
      'Download Now"',
      'We cannot find the file',
      'optional--',
      "//a[contains(@href,'share-now.net')]"
      );
    }
    
    /*if (GM_getValue("Check_peejeshare_dot_com_links", false))
    {
      addFileHost(
      "peejeshare\\.com\/(?:files|storage)\/\\d+",
      'div id="download">|red;">All download slots|Create Download Link"',
      'red;">The file you requested',
      'red;">This file is password',
      "//a[contains(@href,'peejeshare.com/')]"
      );
    }*/

    if (GM_getValue("Check_daten_dash_hoster_dot_de_links", false))
    {
      addFileHost(
      "(?:daten-hoster\\.de\/file\/\\w+|filehosting\\.org\/file\/\\w+|xtraupload\\.de\/\\?d=\\w+)",
      'Details zur Datei|Details page',
      'Jetzt hochladen|upload now',
      'optional--',
      "//a[contains(@href,'daten-hoster.de/file') or contains(@href,'filehosting.org/file') or contains(@href,'xtraupload.de')]"
      );
    }

    if (GM_getValue("Check_upload_dash_il_dot_net_links", false))
    {
      addFileHost(
      "(?:upload-il|przeslij)\.net\/(?:en|he|ar|ru|)\/?\\w+",
      'downloadbtn"',
      'DL_FileNotFound',
      'optional--',
      "//a[contains(@href,'upload-il.net') or contains(@href,'przeslij.net')]"
      );
    }

    if (GM_getValue("Check_fileflyer_dot_com_links", false))
    {
      addFileHost(
      "fileflyer\.com\/view\/\\w+",
      'dwlbtn"',
      'error.gif"|link">Removed|removedlink">|lockedbtn">|unlockdiv">',
      'optional--',
      "//a[contains(@href,'fileflyer.com')]"
      );
    }

    if (GM_getValue("Check_rapidupload_dot_sk_links", false))
    {
      addFileHost(
      "rapidupload\.sk\/file\/\\d+\/",
      'Názov súboru',
      'súbor sa nenašiel',
      'optional--',
      "//a[contains(@href,'rapidupload.sk/file')]"
      );
    }

    if (GM_getValue("Check_filestore_dot_to_links", false))
    {
      addFileHost(
      "filestore\.to\/\\?d=\\w+",
      '"downloading"',
      'Datei wurde nicht gefunden',
      'optional--',
      "//a[contains(@href,'filestore.to')]"
      );
    }

    if (GM_getValue("Check_easy_dash_share_dot_com_links", false))
    {
      addFileHost(
      "(?:w\\d*\.|)(?:crocko|easy-share)\\.com\/\\w+",
      'fz24">Download|td class="first">',
      'msg-err"|the page you\'re looking for|1>400 Bad Request<|No files in this folder',
      'optional--',
      "//a[contains(@href,'easy-share.com') or contains(@href,'crocko.com')]"
      );
    }

    if (GM_getValue("Check_burnupload_dot_com_links", false))
    {
      addFileHost(
      "burnupload\\.(?:com\/\\?d=|ihiphop\\.com\/download\\.php\\?id=)\\w+",
      'File size:',
      'file is not found',
      'optional--',
      "//a[contains(@href,'burnupload.com') or contains(@href,'burnupload.ihiphop.com')]"
      );
    }

    /*if (GM_getValue("Check_datei_dot_to_links", false))
    {
      addFileHost(
      "sharebase\.to\/\\w+",
      'icon_downloaden\.png|DLB">',
      'Datei wurde nicht gefunden|icon_deleted\.png',
      'optional--',
      "//a[contains(@href,'datei.to')]"
      );
    }*/

    if (GM_getValue("Check_yunfile_dot_com_links", false))
    {
      addFileHost(
      "(?:yunfile|filemarkets|yfdisk)\\.com\/file\/\\w+",
      'title">.+?&nbsp;&nbsp;.+?<\/h2>',
      'title">.+?&nbsp;&nbsp;<\/h2>|Been deleted',
      'optional--',
      "//a[contains(@href,'yunfile.com/file') or contains(@href,'filemarkets.com/file') or contains(@href,'yfdisk.com/file')]"
      );
    }
    
    if (GM_getValue("Check_putlocker_dot_com_links", false))
    {
      addFileHost(
      "putlocker\\.com\/file\/\\w+",
      'as Free User',
      'Welcome to PutLocker',
      'undergoing scheduled maintenance',
      "//a[contains(@href,'putlocker.com/file')]"
      );
    }
    
    if (GM_getValue("Check_luckyshare_dot_net_links", false))
    {
      addFileHost(
      "luckyshare\\.net\/\\d+",
      'class=\'file_name\'>',
      'no such file available',
      'optional--',
      "//a[contains(@href,'luckyshare.net/')]",
      true);
    }
    
    if (GM_getValue("Check_uploadhero_dot_com_links", false))
    {
      addFileHost(
      "uploadhero\\.com?\/dl\/\\w+",
      'content-dl">',
      'men_file_lost\\.jpg"',
      'optional--',
      "//a[contains(@href,'uploadhero.co')]"
      );
    }

    if (GM_getValue("Check_load_dot_to_links", false))
    {
      addFileHost(
      '(?:www\\.|\/)load\\.to\/(?:|\\?d\\=)\\w+',
      '"download_table_left">Size',
      'Can\'t find file',
      'optional--',
      "//a[contains(@href,'/load.to/') or contains(@href,'www.load.to/')]"
      );
    }

    if (GM_getValue("Check_files_dot_to_links", false))
    {
      addFileHost(
      "files\.to\/get\/\\d+\/",
      'You requested the following',
      'requested file couldn',
      'optional--',
      "//a[contains(@href,'files.to/')]"
      );
    }

    if (GM_getValue("Check_freakshare_dot_net_links", false))
    {
      addFileHost(
      "freakshare\\.(?:net|com)\/files\/",
      'box_heading',
      '<div class="box" style',
      'optional--',
      "//a[(contains(@href,'freakshare.net') or contains(@href,'freakshare.com')) and contains(@href,'files')]",
      true
      );
    }

    if (GM_getValue("Check_divshare_dot_com_links", false))
    {
      addFileHost(
      "divshare\\.com\/download\/",
      'download_new\.png',
      'have been removed',
      'optional--',
      "//a[contains(@href,'divshare.com')]"
      );
    }
    
    if (GM_getValue("Check_stahovadlo_dot_cz_links", false))
    {
      addFileHost(
      "stahovadlo\\.cz\/soubor\/\\d+\/[\\.\\w]+",
      'download" type="submit',
      'Neplatný nebo neúplný odkaz|Soubor již není dostupný',
      'optional--',
      "//a[contains(@href,'stahovadlo.cz/soubor')]",
      true
      );
    }
    
    if (GM_getValue("Check_warserver_dot_cz_links", false))
    {
      addFileHost(
      "(?:www\\d\\.)?warserver\\.cz\/stahnout\/\\d+",
      'Stáhnout rychle|Stáhnout soubor',
      'Soubor nenalezen<',
      'optional--',
      "//a[contains(@href,'warserver.cz/stahnout')]"
      );
    }
    
    if (GM_getValue("Check_euroshare_dot_eu_links", false))
    {
      addFileHost(
      "euroshare\\.(?:eu|pl|sk|cz|hu)\/file\/\\d+",
      'nazev-souboru">',
      '<div id="obsah">\\s*<h1>',
      'optional--',
      "//a[contains(@href,'euroshare.eu/file')]"
      );
    }
    
    if (GM_getValue("Check_datafilehost_dot_com_links", false))
    {
      addFileHost(
      "datafilehost\\.com\/download-\\w+\\.html",
      'dldtable">',
      'does not exist\\.',
      'optional--',
      "//a[contains(@href,'datafilehost.com/download-')]"
      );
    }

    if (GM_getValue("Check_files_dot_mail_dot_ru_links", false))
    {
      addFileHost(
      'files\\.mail\\.ru/(?:\\w*)',
      'fileList',
      'errorMessage',
      'optional--',
      "//a[contains(@href,'files.mail.ru')]"
      );
    }

    if (GM_getValue("Check_narod_dot_ru_links", false))
    {
      addFileHost(
      'narod\\.(?:yandex\\.|)ru\/disk\/',
      'Download', //do not use "b-submit" -> false positives
      'b-download-virus-note|headCode">404<',
      'Внутренняя ошибка сервиса',
      "//a[contains(@href,'narod.ru') or contains(@href,'narod.yandex.ru')]"
      );
    }

    if (GM_getValue("Check_rayfile_dot_com_links", false))
    {
      addFileHost(
      "rayfile\\.com\/",
      'FILEtitleTXT',
      'blueRow',
      'optional--',
      "//a[contains(@href,'rayfile.com/') and contains(@href,'files')]"
      );
    }
    
    if (GM_getValue("Check_filesmonster_dot_com_links", false))
    {
      addFileHost(
      "filesmonster\\.com\/download\\.php\\?id=\\w+",
      'button_green_body"',
      'error">',
      'optional--',
      "//a[contains(@href,'filesmonster.com/download')]"
      );
    }
    
    if (GM_getValue("Check_sendspace_dot_com_links", false))
    {
      addFileHost(
      'sendspace\\.com\/file\/\\w+',
      'file_description',
      'msg error"',
      'optional--',
      "//a[contains(@href,'sendspace.com/file')]"
      );
    }
    
    if (GM_getValue("Check_sendspace_dot_pl_links", false))
    {
      addFileHost(
      'sendspace\\.pl\/file\/\\w+',
      'download_file"',
      'Podany plik nie',
      'optional--',
      "//a[contains(@href,'sendspace.pl/file')]"
      );
    }

    if (GM_getValue("Check_gigasize_dot_com_links", false))
    {
      addFileHost(
      'gigasize\\.com\/get(?:\\.php(?:\/\\d+|\\?d=\\w+)|\/\\w+)',
      'fileId"',
      'error">',
      'optional--',
      "//a[contains(@href,'gigasize.com/get')]"
      );
    }
    
    if (GM_getValue("Check_2shared_dot_com_links", false))
    {
      addFileHost(
      '2shared\\.com\/(?:file|video|document)\/\\w*',
      'File size',
      'File not found|is not valid',
      'optional--',
      "//a[contains(@href,'2shared.com/file/') or contains (@href,'2shared.com/video/') or contains(@href,'2shared.com/document/')]"
      );
    }
    
    if (GM_getValue("Check_gigapeta_dot_com_links", false))
    {
      addFileHost(
      'gigapeta\\.com\/dl\/',
      'Download file|Скачать файл| Herunterzuladen|Scarica il file|Cargar el fichero|Charger le fichier',
      '404|page_error',
      'optional--',
      "//a[contains(@href,'gigapeta.com/dl')]"
      );
    }
    
    if (GM_getValue("Check_veehd_dot_com_links", false))
    {
      addFileHost(
      'veehd\.com\/video\/.*?',
      'No sound|Download video',
      'Featured Videos',
      'optional--',
      "//a[contains(@href,'veehd.com') and contains(@href,'video')]"
      );
    }
    
    if (GM_getValue("Check_ifolder_dot_ru_links", false))
    {
      addFileHost(
      'ifolder\.ru\/\\d+',
      'file-info',
      'ui-state-error',
      'optional--',
      "//a[contains(@href,'ifolder.ru')]"
      );
    }

    if (GM_getValue("Check_filesend_dot_net_links", false))
    {
      addFileHost(
      'filesend\.net\/download',
      'buttdl',
      'File removed|File not found.',
      'Error',
      "//a[contains(@href,'filesend.net/download')]"
      );
    }


    if (GM_getValue("Check_enigmashare_dot_com_links", false))
    {
      addFileHost(
      'enigmashare\\.com\/\\w+',
      'tbl12',
      'width:500px;text-align:left',
      'optional--',
      "//a[contains(@href,'enigmashare.com/')]"
      );
    }

    if (GM_getValue("Check_fileswap_dot_com_links", false))
    {
      addFileHost(
      'fileswap\\.com\/dl\/\\w+',
      'dlslowbutton"',
      'rounded_block_error">',
      'is temporary unavailable|disponible en estos momentos|vorläufig unerreichbar|Файл временно недоступен',
      "//a[contains(@href,'fileswap.com/dl')]"
      );
    }
    
    if (GM_getValue("Check_solidfiles_dot_com_links", false))
    {
      addFileHost(
      'solidfiles\\.com\/d\/\\w+',
      'id="download"',
      '>Not found<',
      'optional--',
      "//a[contains(@href,'solidfiles.com/d')]"
      );
    }
    
    if (GM_getValue("Check_uloz_dot_to_links", false))
    {   
      addFileHost(
      "(?:uloz|ulozto|bagruj|zachowajto)\\.(to|cz|sk|net|pl)\/\\w",
      'fileDownload">|fileSize">',
      'grayButton deletedFile">|Stránka nenalezena|upload-button"|jako soukromý.',
      'passwordProtectedFile">|frmaskAgeForm-disagree',
      "//a[contains(@href,'bagruj.cz') or contains(@href,'uloz.to') or contains(@href,'ulozto.') or contains(@href,'zachowajto.pl')]",
      true
      );
    }
    
    if (GM_getValue("Check_leteckaposta_dot_cz_links", false))
    {
      addFileHost(
      "(?:leteckaposta\\.cz|sharegadget\\.com)\/\\d+",
      '<body onload="">',
      'neexistuje|not exist',
      'optional--',
      "//a[contains(@href,'leteckaposta.cz') or contains(@href,'sharegadget.com')]"
      );
    }

    if (GM_getValue("Check_stahovanizasms_dot_cz_links", false))
    {
      addFileHost(
      "stahovanizasms\\.cz\/\\w+",
      'download\\.png>|font-size:11px><tr>',
      'smaz.n u.ivatelem|font-size:11px><\/table>',
      'optional--',
      "//a[contains(@href,'stahovanizasms.cz')]"
      );
    }
    
    if (GM_getValue("Check_zippyshare_dot_com_links", false))
    {
      addFileHost(
      "(?:www\\d+\.|)zippyshare\.com\/v\/\\d+\/file\.html",
      'download\.png|Download Now|dlbutton"',
      'not exist',
      'optional--',
      "//a[contains(@href,'zippyshare.com') and contains(@href,'file.html')]"
      );
    }

    if (GM_getValue("Check_speedshare_dot_org_links", false))
    {
      addFileHost(
      "speedshare\.org\/.+",
      'id=\"downloadbtn\"',
      'Error',
      'optional--',
      "//a[contains(@href,'speedshare.org')]"
      );
    }

    if (GM_getValue("Check_mediafire_dot_com_links", false))
    {
      addFileHost(
      "mediafire\.com\/(?:view\/|)(?:\\?\\w+|download.php|file)",
      'download_file_title"|dl-btn-label">|grnDownload">',
      'error\\.php\\?|folder_download"',
      'set to private',
      "//a[contains(@href,'mediafire.com/')]"
      );
    }

    if (GM_getValue("Check_webshare_dot_cz_links", false))
    {
      addFileHost(
      "webshare\.cz\/\\w+-.*",
      'download_big.gif',
      'not found|Soubor nenalezen.',
      'optional--',
      "//a[contains(@href,'webshare.cz')]"
      );
    }

    if (GM_getValue("Check_ulozisko_dot_sk_links", false))
    {
      addFileHost(
      "ulozisko\.sk\/",
      'Detaily',
      'neexistuje',
      'optional--',
      "//a[contains(@href,'ulozisko.sk')]"
      );
    }

    if (GM_getValue("Check_speedfile_dot_cz_links", false))
    {
      addFileHost(
      "speedfile\.cz\/(?:cs\/|en\/|sk\/|)\\d+\/",
      'Stáhnout|<span>Download',
      'error|soubor byl odst|This file was deleted',
      'optional--',
      "//a[contains(@href,'speedfile.cz')]"
      );
    }

    if (GM_getValue("Check_upnito_dot_sk_links", false))
    {
      addFileHost(
      "(?:dl.\\.|)upnito\\.sk\/(download|subor|file)",
      'download.php',
      'notfound|upload\\-suborov\\.php"',
      'optional--',
      "//a[contains(@href,'upnito.sk')]"
      );
    }

    if (GM_getValue("Check_cobrashare_dot_net_links", false))
    {
      addFileHost(
      "cobrashare\\.net\/downloadFile\\.php",
      'class=\"popis\"',
      'deleted<\/div>',
      'optional--',
      "//a[contains(@href,'cobrashare.net') and contains(@href,'/downloadFile')]"
      );
    }

    if (GM_getValue("Check_dataport_dot_cz_links", false))
    {
      addFileHost(
      "dataport\.cz\/file\/",
      'premium_download">',
      '="error">',
      'optional--',
      "//a[contains(@href,'dataport.cz/file')]",
      true
      );
    }

    if (GM_getValue("Check_czshare_dot_com_links", false))
    {
      addFileHost(
      "czshare\\.com\/(?:\\d+\/\\w*|download_file\.php|files\/\\d+\/\\w*|error\\.php\\?co=\\d+)",
      'page-download',
      'Soubor nenalezen|byl smazán|identifikován jako warez|chybě při uploadu|Soubor expiroval|výpadek databáze',
      'optional--',
      "//a[contains(@href,'czshare.com/')]"
      );
    }

    if (GM_getValue("Check_uptobox_dot_com_links", false))
    {
      addFileHost(
      "uptobox\\.com\/\\w+",
      'download1">',
      '500px;text-align:left;">',
      'Maintenance',
      "//a[contains(@href,'uptobox.com/')]"
      );
    }
    
    if (GM_getValue("Check_gigaup_dot_fr_links", false))
    {
      addFileHost(
      "gigaup\\.fr\/\\?g=\\w+",
      'Taille de',
      'Vous ne pouvez|existe pas',
      'optional--',
      "//a[contains(@href,'gigaup.fr/')]"
      );
    }
    
    if (GM_getValue("Check_myupload_dot_dk_links", false))
    {
      addFileHost(
      "myupload\\.dk\/showfile\/\\w+",
      '<td class="downloadTblRight"',
      '<div id="flash_upload_progress"',
      'optional--',
      "//a[contains(@href,'myupload.dk/showfile')]"
      );
    }
    
    if (GM_getValue("Check_filebeam_dot_com_links", false))
    {
      addFileHost(
      "(?:filebeam\\.com|fbe\\.am)\/\\w+",
      '<center>File Download Area<\/center>',
      '<center>Error:<\/center>',
      'optional--',
      "//a[contains(@href,'filebeam.com/') or contains(@href,'fbe.am')]"
      );
    }
    
    if (GM_getValue("Check_upsto_dot_re_links", false))
    {
      addFileHost(
      "upsto\\.re\/\\w+",
      '<ul class="features minus">|Download files from folder',
      '<span class="error">',
      'optional--',
      "//a[contains(@href,'upsto.re/')]"
      );
    }
    
    if (GM_getValue("Check_adrive_dot_com_links", false))
    {
      addFileHost(
      "adrive\\.com\/public\/\\w+",
      'download should start',
      'no longer available publicly',
      'optional--',
      "//a[contains(@href,'adrive.com/public/')]"
      );
    }
    
    if (GM_getValue("Check_filebulk_dot_com_links", false))
    {
      addFileHost(
      "filebulk\\.com\/\\w+",
      '<span id="countdown_str"',
      'File Not Available',
      'You can download files up to 100 Mb only.',
      "//a[contains(@href,'filebulk.com/')]"
      );
    }
    
    if (GM_getValue("Check_fileplaneta_dot_com_links", false))
    {
      addFileHost(
      "(?:fileplanet\\.com\\.ua|fileplaneta\\.com)\/\\w+",
      'name="method_free"',
      'File Not Found',
      'optional--',
      "//a[contains(@href,'fileplaneta.com/') or contains(@href,'fileplanet.com.ua/')]"
      );
    }
    
    if (GM_getValue("Check_filenuke_dot_com_links", false))
    {
      addFileHost(
      "filenuke\\.com\/\\w+",
      't_Download-file">',
      'File Not Found',
      'optional--',
      "//a[contains(@href,'filenuke.com/')]"
      );
    }
    
    if (GM_getValue("Check_box_dot_com_links", false))
    {
      addFileHost(
      "https?:\/\/(?:www\\.|)box\\.(?:com|net)\/(?:s|shared)\/\\w+",
      '<div class="gallery"',
      'This shared file or folder link has been removed',
      'optional--',
      "//a[(contains(@href,'box.com') or contains(@href,'box.net/')) and (contains(@href,'/s/') or contains(@href,'/shared/'))]"
      );
    }
    
    if (GM_getValue("Check_rnbload_dot_com_links", false))
    {
      addFileHost(
      "rnbload\\.com\/(file\/\\d+\/|download\\.php\\?id=)\\w+",
      '<div id="cubeDiv"',
      'Your requested file is not found',
      'optional--',
      "//a[contains(@href,'rnbload.com/')]"
      );
    }
    
    if (GM_getValue("Check_4share_dot_ws_links", false))
    {
      addFileHost(
      "4share\\.ws\/file\/\\w+",
      '<table id="download_file"',
      'Not Found',
      'optional--',
      "//a[contains(@href,'4share.ws/')]"
      );
    }
    
    if (GM_getValue("Check_ukfilehost_dot_com_links", false))
    {
      addFileHost(
      "ukfilehost\\.com\/files\/get\/\\w+",
      'optional--',
      'The file you have requested cannot be found',
      'optional--',
      "//a[contains(@href,'ukfilehost.com/files/get/')]"
      );
    }
    
    if (GM_getValue("Check_zalil_dot_ru_links", false))
    {
      addFileHost(
      "zalil\\.ru\/\\d+",
      'optional--',
      'Файл не найден',
      'optional--',
      "//a[contains(@href,'zalil.ru/')]"
      );
    }
    
    if (GM_getValue("Check_uploads_dot_bizhat_dot_com_links", false))
    {
      addFileHost(
      "uploads\\.bizhat\\.com\/file\/\\d+",
      'div id="dl">',
      'File not found',
      'optional--',
      "//a[contains(@href,'uploads.bizhat.com/file/')]"
      );
    }
    
    if (GM_getValue("Check_mega_dash_myfile_dot_com_links", false))
    {
      addFileHost(
      "mega\\-myfile\\.com\/file\/\\d+\/\\w+",
      '<b>File name:<\/b>',
      'Your requested file is not found',
      'optional--',
      "//a[contains(@href,'mega-myfile.com/file/')]"
      );
    }
    
    if (GM_getValue("Check_filesbowl_dot_com_links", false))
    {
      addFileHost(
      "filesbowl\\.com\/\\w+",
      'div class="downloadPageTable"',
      '<li>File has been removed',
      'optional--',
      "//a[contains(@href,'filesbowl.com/')]"
      );
    }
    
    if (GM_getValue("Check_hotuploading_dot_com_links", false))
    {
      addFileHost(
      "hotuploading\\.com\/index\\.php\\?page\\=main\\&id=\\w+",
      'show_wait"',
      'Invalid file',
      'optional--',
      "//a[contains(@href,'hotuploading.com/index.php?page=main&id=')]"
      );
    }
    
    if (GM_getValue("Check_xvidstage_dot_com_links", false))
    {
      addFileHost(
      "xvidstage\\.com\/\\w+",
      'file_slot"',
      'File Not Found',
      'optional--',
      "//a[contains(@href,'xvidstage.com/')]"
      );
    }
    
    if (GM_getValue("Check_speedy_dash_share_dot_com_links", false))
    {
      addFileHost(
      "speedy\\-share\\.com\/\\w+",
      'File Download',
      'No such file',
      'optional--',
      "//a[contains(@href,'speedy-share.com/')]"
      );
    }
    
    if (GM_getValue("Check_filebox_dot_ro_links", false))
    {
      addFileHost(
      "(?:filebox|fbx)\\.ro\/(?:download\\.php\\?key\\=)?\\w+",
      'fisierul trebuie sa astepti',
      'downloadezi a expirat',
      'optional--',
      "//a[contains(@href,'filebox.ro/download.php?key=') or contains(@href,'fbx.ro/')]"
      );
    }
    
    if (GM_getValue("Check_100shared_dot_com_links", false)) //checkfiles.html giving false positives
    {
      addFileHost(
      "100shared\\.com\/\\w+",
      '<h2>Download File',
      'No such file',
      'optional--',
      "//a[contains(@href,'100shared.com/')]"
      );
    }
    
    if (GM_getValue("Check_mixturecloud_dot_com_links", false))
    {
      addFileHost(
      "mixture(?:cloud|file|video)\\.com\/(?:download\\=|media\/(?:download\/)?)\\w+",
      'download_free">|btn icon i_cloud_download gray',
      'File not found|class="err"',
      'optional--',
      "//a[contains(@href,'mixturecloud.com/') or contains(@href,'mixturefile.com/') or contains(@href,'mixturevideo.com/')]"
      );
    }
    
    if (GM_getValue("Check_midupload_dot_com_links", false))
    {
      addFileHost(
      "midupload\\.com\/\\w+",
      '<h3>Download File',
      'File Not Found|>The file was removed by administrator<',
      'optional--',
      "//a[contains(@href,'midupload.com/')]"
      );
    }
    
    if (GM_getValue("Check_hostingbulk_dot_com_links", false))
    {
      addFileHost(
      "hostingbulk\\.com\/\\w+",
      '<h3>Download File',
      'File Not Found',
      'optional--',
      "//a[contains(@href,'hostingbulk.com/')]"
      );
    }
    
    if (GM_getValue("Check_easyfilesharing_dot_info_links", false))
    {
      addFileHost(
      "easyfilesharing\\.info\/(?:\\?d=|\\w{1,2}\/file\/\\d+\/)\\w+",
      'Download File',
      'Your requested file is not found',
      'optional--',
      "//a[contains(@href,'easyfilesharing.info/')]"
      );
    }
    
    if (GM_getValue("Check_yourupload_dot_com_links", false))
    {
      addFileHost(
      "yourupload\\.com\/\\w+",
      '<label>Download',
      '404',
      'optional--',
      "//a[contains(@href,'yourupload.com/')]"
      );
    }
    
    if (GM_getValue("Check_upload_dot_tc_links", false))
    {
      addFileHost(
      "upload\\.tc\/download\/\\d+\/\\w+",
      '<div id="dl"',
      'Error<\/b>',
      'optional--',
      "//a[contains(@href,'upload.tc/download/')]"
      );
    }
    
    if (GM_getValue("Check_fileneo_dot_com_links", false))
    {
      addFileHost(
      "fileneo\\.com\/\\w+",
      'Download File<\/h3>',
      'File not found',
      'optional--',
      "//a[contains(@href,'fileneo.com/')]"
      );
    }
    
    if (GM_getValue("Check_file_dash_upload_dot_net_links", false))
    {
      addFileHost(
      "(?:en|)file\\-upload\\.net\/download\\-\\d+\/\\w+",
      'downbutton.gif',
      'Datei existiert nicht!|File does not exist!',
      'optional--',
      "//a[contains(@href,'file-upload.net/download-')]"
      );
    }
    
    if (GM_getValue("Check_fliiby_dot_com_links", false))
    {
      addFileHost(
      "fliiby\\.com\/file\/\\d+\/\\w+",
      'file_panel">',
      'Not Found<\/span>|error_container">',
      'optional--',
      "//a[contains(@href,'fliiby.com/file/')]"
      );
    }
    
    if (GM_getValue("Check_datacloud_dot_to_links", false))
    {
      addFileHost(
      "datacloud\\.to\/download\/\\w+",
      'download_buttons">',
      'File does not exist!',
      'optional--',
      "//a[contains(@href,'datacloud.to/download/')]"
      );
    }
    
    if (GM_getValue("Check_filevice_dot_com_links", false))
    {
      addFileHost(
      "filevice\\.com\/\\w+",
      'method_free"',
      'File not found',
      'optional--',
      "//a[contains(@href,'filevice.com/')]"
      );
    }
    
    if (GM_getValue("Check_jumbofiles_dot_org_links", false))
    {
      addFileHost(
      "jumbofiles\\.org\/.+",
      'downloadfree">',
      'div_file"',
      'optional--',
      "//a[contains(@href,'jumbofiles.org/')]"
      );
    }
    
    if (GM_getValue("Check_hotfiles_dot_co_links", false))
    {
      addFileHost(
      "hotfiles\\.co\/\\w+",
      'Free User<\/h1>',
      'not found',
      'optional--',
      "//a[contains(@href,'hotfiles.co/')]"
      );
    }
    
    if (GM_getValue("Check_ishare_dot_bz_links", false))
    {
      addFileHost(
      "ishare\\.bz\/grab\/\\w+",
      'submitdl">',
      'status_box warning">',
      'optional--',
      "//a[contains(@href,'ishare.bz/grab/')]"
      );
    }
    
    if (GM_getValue("Check_filesmall_dot_com_links", false))
    {
      addFileHost(
      "filesmall\\.com\/\\w+\/download\\.html",
      'value="Download"',
      'File Not Found',
      'optional--',
      "//a[contains(@href,'filesmall.com/')]"
      );
    }
    
    if (GM_getValue("Check_upload_dot_ee_links", false))
    {
      addFileHost(
      "upload\\.ee\/files\/\\d+\/\\w+",
      'id="d_l"',
      'There is no such file',
      'optional--',
      "//a[contains(@href,'upload.ee/files/')]"
      );
    }
    
    if (GM_getValue("Check_bigupload_dot_com_links", false))
    {
      addFileHost(
      "bigupload\\.com\/(?:\\?d=|\\w{1,2}\/file\/|files\/)\\w+",
      'paginatediv',
      '<div class="error"><\/div>',
      'optional--',
      "//a[contains(@href,'bigupload.com/')]"
      );
    }
    
    if (GM_getValue("Check_clipshouse_dot_com_links", false))
    {
      addFileHost(
      "clipshouse\\.com\/\\w+",
      'download\-timer"',
      'fileupload"|File has been removed.',
      'optional--',
      "//a[contains(@href,'clipshouse.com/')]"
      );
    }
    
    if (GM_getValue("Check_share4web_dot_com_links", false))
    {
      addFileHost(
      "share4web\\.com\/get\/\\w+",
      'btn_red">',
      'Page Not Found',
      'optional--',
      "//a[contains(@href,'share4web.com/get/')]"
      );
    }
    
    if (GM_getValue("Check_filesbomb_dot_com_links", false))
    {
      addFileHost(
      "drop\\.st\/\\w+",
      'Download<\/button>',
      'page not found',
      'optional--',
      "//a[contains(@href,'drop.st/')]"
      );
    }
    
    if (GM_getValue("Check_uploaders_dot_be_links", false))
    {
      addFileHost(
      "uploaders\\.be\/\\w+",
      'div class="downloadPageTable"',
      '<li>File has been removed',
      'optional--',
      "//a[contains(@href,'uploaders.be/')]"
      );
    }
    
    if (GM_getValue("Check_limelinx_dot_com_links", false))
    {
      addFileHost(
      "limelinx\\.com\/\\w+",
      'icon\-download\-alt',
      'File not found',
      'optional--',
      "//a[contains(@href,'limelinx.com/')]"
      );
    }
    
    if (GM_getValue("Check_novaup_dot_com_links", false))
    {
      addFileHost(
      "nova(?:mov|up)\\.com\/\\w+",
      'Download file',
      'File not found|The video file was removed',
      'optional--',
      "//a[contains(@href,'novaup.com/') or contains(@href,'novamov.com/')]"
      );
    }
    
    if (GM_getValue("Check_skydrive_dot_live_dot_com_links", false))
    {
      addFileHost(
      "skydrive\\.live\\.com\/\\w+",
      'Download file',
      'no longer available<\/h1>',
      'optional--',
      "//a[contains(@href,'skydrive.live.com/')]"
      );
    }
    
    if (GM_getValue("Check_yourfiles_dot_to_links", false))
    {
      addFileHost(
      "yourfiles\\.to\/\\?d=\\w+",
      'Download\-Link: <\/strong>',
      'Die angefragte Datei wurde nicht gefunden',
      'optional--',
      "//a[contains(@href,'yourfiles.to/')]"
      );
    }
    
    if (GM_getValue("Check_filedropper_dot_com_links", false))
    {
      addFileHost(
      "filedropper\\.com\/\\w+",
      'download"',
      'steps\.png',
      'optional--',
      "//a[contains(@href,'filedropper.com/')]"
      );
    }
    
    if (GM_getValue("Check_uploking_dot_com_links", false))
    {
      addFileHost(
      "uploking\\.com\/file\/\\w+",
      'slowdownload\.png|link_slow">',
      'searchtarget"',
      'optional--',
      "//a[contains(@href,'uploking.com/file/')]"
      );
    }
    
    if (GM_getValue("Check_dizzcloud_dot_com_links", false))
    {
      addFileHost(
      "dizzcloud\\.com\/dl\/\\w+",
      'download-btns-box">',
      'File not found',
      'optional--',
      "//a[contains(@href,'dizzcloud.com/dl/')]",
      true);
    }
    
    if (GM_getValue("Check_filehost_dot_ro_links", false))
    {
      addFileHost(
      "filehost\\.ro\/\\d+",
      'Apasati aici pentru a porni download\-ul"',
      'Acest fisier nu exista in baza de date',
      'optional--',
      "//a[contains(@href,'filehost.ro/')]"
      );
    }
    
    if (GM_getValue("Check_sharedbit_dot_net_links", false))
    {
      addFileHost(
      "sharedbit\\.net\/\\w+",
      'class="dl">',
      'Page is not Found<\/h1>|msg private bad">',
      'optional--',
      "//a[contains(@href,'sharedbit.net/')]"
      );
    }
    
    if (GM_getValue("Check_westfiles_dot_com_links", false))
    {
      addFileHost(
      "westfiles\\.com\/files\/\\d{5}d\\w+",
      'type_load">',
      'The file was deleted|Файл был удалён.',
      'optional--',
      "//a[contains(@href,'westfiles.com/')]"
      );
    }
    
    if (GM_getValue("Check_mijnbestand_dot_nl_links", false))
    {
      addFileHost(
      "mijnbestand\\.nl\/Bestand\\-\\w+",
      'downloadfrm"',
      'stappen">',
      'optional--',
      "//a[contains(@href,'mijnbestand.nl/Bestand')]"
      );
    }
    
    if (GM_getValue("Check_ultrashare_dot_net_links", false))
    {
      addFileHost(
      "ultrashare\\.net\/hosting\/fl\/\\w+",
      'downloadbutton">',
      'error">',
      'optional--',
      "//a[contains(@href,'ultrashare.net/hosting/')]"
      );
    }
    
    if (GM_getValue("Check_dosya_dot_tc_links", false))
    {
      addFileHost(
      "dosya\\.tc\/server\\d+\/\\w+",
      'id="dl"',
      'Dosya bulunamad',
      'optional--',
      "//a[contains(@href,'dosya.tc/server')]"
      );
    }
    
    if (GM_getValue("Check_exfile_dot_ru_links", false))
    {
      addFileHost(
      "exfile\\.ru\/\\d+",
      'id="link"><a href="\/download\/',
      'class="align_left"><p class="red"',
      'optional--',
      "//a[contains(@href,'exfile.ru/')]"
      );
    }
    
    if (GM_getValue("Check_fileshare_dot_ro_links", false))
    {
      addFileHost(
      "fileshare\\.ro\/\\w+",
      'DOWNLOAD NOW',
      'Acest fisier nu exista.',
      'optional--',
      "//a[contains(@href,'fileshare.ro/')]"
      );
    }
    
    if (GM_getValue("Check_fshare_dot_vn_links", false))
    {
      addFileHost(
      "fshare\\.vn\/file\/\\w+",
      'optional--',
      'Liên kết bạn chọn không tồn tại trên hệ thống Fshare',
      'optional--',
      "//a[contains(@href,'fshare.vn/')]"
      );
    }
    
    if (GM_getValue("Check_wikifortio_dot_com_links", false))
    {
      addFileHost(
      "wikifortio\\.com\/\\w+",
      'screenbutton">',
      "not found on node|doesn't exist or has expired and is no longer available",
      'optional--',
      "//a[contains(@href,'wikifortio.com/')]"
      );
    }
    
    if (GM_getValue("Check_wyslijto_dot_pl_links", false))
    {
      addFileHost(
      "wyslijto\\.pl\/(?:files\/download|plik)\/\\w+",
      'optional--',
      'zosta. usuni.ty',
      'optional--',
      "//a[contains(@href,'wyslijto.pl/')]"
      );
    }
    
    if (GM_getValue("Check_kiwi6_dot_com_links", false))
    {
      addFileHost(
      "kiwi6\\.com\/file\/\\w+",
      'download\\-link"',
      'Upload not found',
      'optional--',
      "//a[contains(@href,'kiwi6.com/')]"
      );
    }
    
    if (GM_getValue("Check_localhostr_dot_com_links", false))
    {
      addFileHost(
      "(?:localhostr\\.com|lh\\.rs)\/\\w+",
      'download\\-button',
      'fourohfour">',
      'optional--',
      "//a[contains(@href,'localhostr.com/') or contains(@href,'lh.rs/')]"
      );
    }
    
    if (GM_getValue("Check_hostfil_dot_es_links", false))
    {
      addFileHost(
      "hostfil\\.es\/file\/\\w+",
      'Enter number and press button to download',
      'file is not found',
      'optional--',
      "//a[contains(@href,'hostfil.es/')]"
      );
    }
    
    if (GM_getValue("Check_remixshare_dot_com_links", false))
    {
      addFileHost(
      "remixshare\\.com\/(?:dl|download)\/\\w+",
      'linkContainerDiv"',
      'Sorry, die Datei konnte nicht gefunden werden.|Die angeforderte Datei steht nicht mehr zur Verfügung.',
      'optional--',
      "//a[contains(@href,'remixshare.com/')]"
      );
    }
    
    if (GM_getValue("Check_aimini_dot_net_links", false))
    {
      addFileHost(
      "aimini\\.net\/view\/\\?fid=\\w+",
      'Click it to download',
      'This file has been removed',
      'optional--',
      "//a[contains(@href,'aimini.net/view/')]"
      );
    }
    
    if (GM_getValue("Check_hidemyass_dot_com_links", false))
    {
      addFileHost(
      "hidemyass\\.com\/files\/\\w+",
      'dlbutton"',
      'genericerrorbox">',
      'optional--',
      "//a[contains(@href,'hidemyass.com/files/')]"
      );
    }
    
    if (GM_getValue("Check_tinyupload_dot_com_links", false))
    {
      addFileHost(
      "s\\d+\\.tinyupload\\.com\/\\?file_id=\\d+",
      'Download file<\/h3>',
      'File was deleted from server.',
      'optional--',
      "//a[contains(@href,'tinyupload.com/')]"
      );
    }
    
    if (GM_getValue("Check_gigabase_dot_com_links", false))
    {
      addFileHost(
      "gigabase\\.com\/getfile\/\\w+",
      '/img/but_dnld_regular\\.jpg',
      'File not found',
      'optional--',
      "//a[contains(@href,'gigabase.com/getfile/')]"
      );
    }
    
    if (GM_getValue("Check_trainbit_dot_com_links", false))
    {
      addFileHost(
      "trainbit\\.com\/files\/\\w+",
      'download"',
      'file not found',
      'optional--',
      "//a[contains(@href,'trainbit.com/files/')]"
      );
    }
    
    if (GM_getValue("Check_videobam_dot_com_links", false))
    {
      addFileHost(
      "videobam\\.com\/\\w+",
      'wrap\\-video"',
      'File not found',
      'optional--',
      "//a[contains(@href,'videobam.com/')]"
      );
    }
    
    if (GM_getValue("Check_hyperfileshare_dot_com_links", false))
    {
      addFileHost(
      "hyperfileshare\\.com\/d\/\\w+",
      '\/img\/download_btm_site\\.gif',
      'Download URL is incorrect or your file has already been deleted!',
      'optional--',
      "//a[contains(@href,'hyperfileshare.com/d/')]"
      );
    }
    
    if (GM_getValue("Check_ge_dot_tt_links", false))
    {
      addFileHost(
      "ge\\.tt\/\\w+",
      'download\\-link',
      'file not found',
      'optional--',
      "//a[contains(@href,'ge.tt/')]"
      );
    }
    
    if (GM_getValue("Check_uploads_dot_ws_links", false))
    {
      addFileHost(
      "(?:uploads\\.ws|upl\\.me)\/\\w+",
      'downloadFile"',
      'file not found',
      'optional--',
      "//a[contains(@href,'uploads.ws') or contains(@href,'upl.me/')]"
      );
    }
    
    if (GM_getValue("Check_keep2share_dot_cc_links", false))
    {
      addFileHost(
      "keep2share\\.cc\/file\/\\w+",
      'button\-low\-speed\-limit',
      'deleted<\/h5>',
      'optional--',
      "//a[contains(@href,'keep2share.cc/')]"
      );
    }
    
    if (GM_getValue("Check_cloud_dash_up_dot_be_links", false))
    {
      addFileHost(
      "(?:download\\.)?cloud\\-up\\.be\/download\\.php\\?file=\\w+",
      'download file',
      'This file does not exist!',
      'optional--',
      "//a[contains(@href,'cloud-up.be/')]"
      );
    }
    
    if (GM_getValue("Check_uploadc_dot_com_links", false)) //Do not use bulkcheck, false reports
    {
      addFileHost(
      "(?:uploadc|zalaa)\\.com\/\\w+",
      'Slow access"',
      'File Not Found|file has been removed',
      'optional--',
      "//a[contains(@href,'uploadc.com/') or contains(@href,'zalaa.com/')]"
      );
    }
    
    if (GM_getValue("Check_karelia_dot_pro_links", false))
    {
      addFileHost(
      "(?:disk|fast)\\.karelia\\.pro\/\\w+",
      'url_link"',
      '<div id="center">\n+<\/div>',
      'optional--',
      "//a[contains(@href,'karelia.pro/')]"
      );
    }
    
    if (GM_getValue("Check_1_dash_clickshare_dot_com_links", false))
    {
      addFileHost(
      "1\\-clickshare\\.com\/\\d+",
      '<div id="dl"',
      'File not found|Invalid download link',
      'optional--',
      "//a[contains(@href,'1-clickshare.com/')]"
      );
    }
    
    if (GM_getValue("Check_fastupload_dot_ro_links", false))
    {
      addFileHost(
      "fastupload\\.(?:rol\\.)?ro\/\\w+",
      'isAliveRegex',
      'Fişierele nu mai sunt active!',
      'optional--',
      "//a[contains(@href,'fastupload.ro/') or contains(@href,'fastupload.rol.ro/')]"
      );
    }
    
    if (GM_getValue("Check_howfile_dot_com_links", false))
    {
      addFileHost(
      "howfile\\.com\/file\/\\w+",
      'btn1"',
      'File not found',
      'optional--',
      "//a[contains(@href,'howfile.com/')]"
      );
    }
    
    if (GM_getValue("Check_free_dot_fr_links", false))
    {
      addFileHost(
      "(?:dl\\.|\\w+\\.)?free\\.fr\/(?:getfile\\.pl\\?file=\/?|)\\w+",
      'Valider et télécharger le fichier',
      'Fichier inexistant',
      'optional--',
      "//a[contains(@href,'free.fr/')]"
      );
    }
    
    if (GM_getValue("Check_fileden_dot_com_links", false))
    {
      addFileHost(
      "fileden\\.com\/files\/\\d{4}\/\\d{2}\/\\d{2}\/\\d+\\w+",
      'Download file',
      'Oppps\\.\\.\\.The file you requested was not found!',
      'optional--',
      "//a[contains(@href,'fileden.com/files/')]"
      );
    }
    
    if (GM_getValue("Check_file4go_dot_com_links", false))
    {
      addFileHost(
      "file4go\\.com\/d\/\\w+",
      'gerarlinkdownload"',
      '<b>DMCA<\/b>',
      'optional--',
      "//a[contains(@href,'file4go.com/d/')]"
      );
    }
    
    if (GM_getValue("Check_filebox_dot_com_links", false)) //checkfiles.html not working
    {
      addFileHost(
      "filebox\\.com\/\\w+",
      'btn_download',
      'File Not Found|This file is no longer available',
      'optional--',
      "//a[contains(@href,'filebox.com')]"
      );
    }
    
    if (GM_getValue("Check_hostinoo_dot_com_links", false)) //checkfiles.html not working
    {
      addFileHost(
      "hostinoo\\.com\/\\w+",
      'btn_download',
      'File Not Found',
      'optional--',
      "//a[contains(@href,'hostinoo.com')]"
      );
    }
    
    if (GM_getValue("Check_sanshare_dot_com_links", false))
    {
      addFileHost(
      "sanshare\\.com\/\\w+",
      'method_free"',
      'File not found',
      'optional--',
      "//a[contains(@href,'sanshare.com/')]"
      );
    }
    
    if (GM_getValue("Check_sendfile_dot_su_links", false))
    {
      addFileHost(
      "sendfile\\.su\/\\w+",
      'download_click"',
      'Файл не найден',
      'optional--',
      "//a[contains(@href,'sendfile.su/')]"
      );
    }
    
    if (GM_getValue("Check_files4up_dot_com_links", false))
    {
      addFileHost(
      "files4up\\.com\/\\w+",
      'div class="downloadPageTable"',
      '<li>File has been removed',
      'optional--',
      "//a[contains(@href,'files4up.com/')]"
      );
    }
    
    if (GM_getValue("Check_medofire_dot_com_links", false))
    {
      addFileHost(
      "medofire\\.com\/\\w+",
      'method_free"',
      'File not found',
      'optional--',
      "//a[contains(@href,'medofire.com/')]"
      );
    }
    
    if (GM_getValue("Check_usaupload_dot_net_links", false))
    {
      addFileHost(
      "usaupload\\.net\/d\/\\w+",
      'Download">',
      'is not available',
      'In this moment you can`t download this file, please try again in few minutes, we working on this server, SORRY!',
      "//a[contains(@href,'usaupload.net/d/')]"
      );
    }
    
    if (GM_getValue("Check_anonfiles_dot_com_links", false))
    {
      addFileHost(
      "anonfiles\\.com\/file\/\\w+",
      'download_button"',
      'File not found',
      'optional--',
      "//a[contains(@href,'anonfiles.com/file/')]"
      );
    }
    
    if (GM_getValue("Check_divxstage_dot_eu_links", false))
    {
      addFileHost(
      "divxstage\\.eu\/video\/\\w+",
      '>Download the video<',
      'File not found',
      'optional--',
      "//a[contains(@href,'divxstage.eu/video/')]"
      );
    }
    
    if (GM_getValue("Check_herosh_dot_com_links", false))
    {
      addFileHost(
      "herosh\\.com\/download\/\\d+\/\\w+",
      'green">Download',
      'file not found',
      'optional--',
      "//a[contains(@href,'herosh.com/download/')]"
      );
    }
    
    if (GM_getValue("Check_min_dot_us_links", false))
    {
      addFileHost(
      "min\\.us\/\\w+",
      'btn\\-action btn\\-download no\\-counter',
      'File not found',
      'optional--',
      "//a[contains(@href,'min.us/')]"
      );
    }
    
    if (GM_getValue("Check_m5zn_dot_com_links", false))
    {
      addFileHost(
      "m5zn\\.com\/d\/\\?\\d+",
      'free_account">',
      'file not found',
      'optional--',
      "//a[contains(@href,'m5zn.com/d/?')]"
      );
    }
    
    if (GM_getValue("Check_girlshare_dot_ro_links", false))
    {
      addFileHost(
      "girlshare\\.ro\/\\w+",
      'download\\-button\\.gif',
      'File not found',
      'optional--',
      "//a[contains(@href,'girlshare.ro/')]"
      );
    }
    
    if (GM_getValue("Check_bin_dot_ge_links", false))
    {
      addFileHost(
      "bin\\.ge\/dl\/\\w+",
      'captchacode">',
      'File not found',
      'optional--',
      "//a[contains(@href,'bin.ge/dl/')]"
      );
    }
    
    if (GM_getValue("Check_nowvideo_dot_eu_links", false))
    {
      addFileHost(
      "nowvideo\\.eu\/video\/\\w+",
      '>Download this video!<',
      'File not found',
      'optional--',
      "//a[contains(@href,'nowvideo.eu/')]"
      );
    }
    
    if (GM_getValue("Check_shareplace_dot_com_links", false))
    {
      addFileHost(
      "shareplace\\.com\/\\?\\w+",
      'Download file',
      'Your requested file is not found',
      'optional--',
      "//a[contains(@href,'shareplace.com/')]"
      );
    }
    
    if (GM_getValue("Check_terafiles_dot_net_links", false))
    {
      addFileHost(
      "terafiles\\.net\/v\\-\\d+",
      'download file',
      'Le fichier que vous souhaitez télécharger n\'est plus disponible sur nos serveurs.',
      'optional--',
      "//a[contains(@href,'terafiles.net/')]"
      );
    }
    
    if (GM_getValue("Check_uploadmb_dot_com_links", false))
    {
      addFileHost(
      "uploadmb\\.com\/dw\\.php\\?id=\\w+",
      'wait">',
      'file not found',
      'optional--',
      "//a[contains(@href,'uploadmb.com/dw.php?id=')]"
      );
    }
    
    if (GM_getValue("Check_upload_dash_il_dot_com_links", false))
    {
      addFileHost(
      "upload\\-il\\.com\/he\/\\w+",
      'Download file',
      '\\\u05E9\\u05D2\\\u05D9\\\u05D0\\\u05D4: \\\u05E7\\\u05D5\\\u05D1\\\u05E5 \\\u05D0\\\u05D5 \\\u05D3\\\u05E3 \\\u05DC\\\u05D0 \\\u05E0\\\u05DE\\\u05E6\\\u05D0',
      'optional--',
      "//a[contains(@href,'upload-il.com/')]"
      );
    }
  }

  function initFileHostsCoded()
  {
    function addFileHostCoded(linkRegex, reallinkRegex, correctionRegex, xpathEx)
    {
      var host = new Array(4);
      host[0] = linkRegex;
      host[1] = reallinkRegex;
      host[2] = correctionRegex;
      host[3] = xpathEx;
      http_file_hosts_coded.push(host);
    }
    
    if (GM_getValue("Check_cobrashare_dot_net_links", false))
    {
      addFileHostCoded(
      "cobrashare\\.net\:38080\/(?:CobraShare|CS)",
      'http:\/\/www\.cobra.*\";',
      '\";',
      "//a[contains(@href,'cobrashare.net') and (contains(@href,'download') or contains(@href,'CS/dw'))]"
      )
    }   
  }

  //hosts with direct download, so they must be requested for headers only
  function initFileHostsHeadersOnly()
  {
    function addFileHostHeadersOnly(linkRegex, isAliveRegex, isDeadRegex, xpathEx)
    {
      var host = new Array(4);
      host[0] = linkRegex;
      host[1] = isAliveRegex;
      host[2] = isDeadRegex;
      host[3] = xpathEx;
      http_file_hosts_headers_only.push(host);
    }
  
    if (GM_getValue("Check_uloziste_dot_com_links", false))
    {
      addFileHostHeadersOnly(
      "(?:|files\\.)uloziste\\.com\/\\w+\/\\w+",
      'Connection: Keep-Alive',
      'Content-Length: 3857',
      "//a[contains(@href,'uloziste.com')]"
      )
    }

    if (GM_getValue("Check_filemonster_dot_net_links", false))
    {
      addFileHostHeadersOnly(
      "filemonster\\.net\/(?:..\/|)file\/\\w+",
      'filename="',
      'Content\\-Type: text\/html',
      "//a[contains(@href,'filemonster.net')]"
      )
    }

    if (GM_getValue("Check_uploadbin_dot_net_links", false))
    {
      addFileHostHeadersOnly(
      "uploadbin\\.net\/\\w+\/\\w+",
      'filename=',
      'Connection: close',
      "//a[contains(@href,'uploadbin.net')]"
      )
    }

    if (GM_getValue("Check_videozer_dot_com_links", false))
    {
      addFileHostHeadersOnly(
      "videozer\\.com\/embed\/\\w+",
      "Connection: keep-alive|Content\-Type: application\/x\-shockwave\-flash",
      "optional--",
      "//a[contains(@href,'videozer.com/embed/')]"
      )
    }
  }
}

update.init();

function initClipBoardTools()
{
  unsafeWindow.copyToClipboard = function(text)
  {
    try
    {
      this.netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

      var str = Components.classes["@mozilla.org/supports-string;1"].
      createInstance(Components.interfaces.nsISupportsString);
      if (!str) return false;

      str.data = text;

      var trans = Components.classes["@mozilla.org/widget/transferable;1"].
      createInstance(Components.interfaces.nsITransferable);
      if (!trans) return false;

      trans.addDataFlavor("text/unicode");
      trans.setTransferData("text/unicode", str, text.length * 2);

      var clipid = Components.interfaces.nsIClipboard;
      var clip = Components.classes["@mozilla.org/widget/clipboard;1"].getService(clipid);
      if (!clip) return false;

      clip.setData(trans, null, clipid.kGlobalClipboard);
    } catch (e) {
      GM_log("Error copyToClipboard : " + e);
      alert(e + "\n\nsigned.applets.codebase_principal_support must be set true in about:config")
        }
  }
}