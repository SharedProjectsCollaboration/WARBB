WARBB
=====

Warez-BB version of WAR Link checker. 
Official userscript page located [here](http://userscripts.org/scripts/show/153759 "Official userscript page for WARBB")

### Changelog

## 1.2.1

Added: Epicshare.net  
Added: Limelinx.com  
Added: Novaup.com/novamov.com  
Added: Filedropper.com  
Added: Yourfiles.to  
Added: Skydrive.live.com  
Added: 4upfiles.com (4up.me)

Obsolete: Mylordweb.com  
Obsolete: Edoc.com  
Obsolete: Milledrive.com/videos  
Obsolete: Mooshare.net  
Obsolete: Uploadbox.com  
Obsolete: Aieshare.com  
Obsolete: Filestock.ru  

Fixed: Extabit links with "?upld=1" at the end not checking (API only)  
Fixed: Keeplinks.me direct link issue caused by ssl  
Fixed: Minor fixes for Mega, doesn't really change anything.  
Fixed: Creafile.net  
Fixed: Rapidstation.com  
Fixed: 4up.me  
Fixed: Hugefiles.net  

Moved: keeplinks.me from hosts to containers

## 1.2.0

Added: MEGA.co.nz! :D  
Added: Hugefiles.net  
Added: Ufox.com  
Added: Clipshouse.com  
Added: Keeplinks.me (direct link checking working, only deleted packages working)  
Added: Dfiles.eu (depositfiles)  
Added: Unlimitshare.com  
Added: Share4web.com  
Added: Uploadhero.co (uploadhero.com)  
Added: Speedshare.eu  
Added: Creafile.net  
Added: Rapidstation.com  
Added: Catshare.net  
Added: Uploaders.be (filesbowl.com, unsure if related but they look almost the same)  
Added: Drop.st  
Added: Filesbomb.com  

Obsolete: Ex.ua  
Obsolete: Filespump.com  
Obsolete: Byethost12.com  
Obsolete: Filezzz.com  
Obsolete: Filegetty.com  
Obsolete: Uploadersite.com  
Obsolete: Nfile.eu  
Obsolete: Box4upload.com  
Obsolete: Envirofile.org  
Obsolete: Omxira.com  
Obsolete: Evilshare.com  
Obsolete: Sharehoster.de  
Obsolete: Rapidoyun.com  
Obsolete: Shareflare.net (banned host)  
Obsolete: Filestrum.com  
Obsolete: Monsteruploads.eu  
Obsolete: Coraldrive.net  
Obsolete: Files2k.eu  
Obsolete: Hulkfile.eu (banned host)  
Obsolete: Peeje.com  
Obsolete: Kiwiload.com  
Obsolete: Uploadjockey.com (banned host)  
Obsolete: I-filez.com 

Fixed: Hotfile.com/links/  
Fixed: Display full links in safelinking direct links if "Display full links in containers" is enabled  
Fixed: Fileflyer.com locked files marked as dead (premium only links)  
Fixed: Filesend dead links  
Fixed: Safelinking direct links sending wrong checking stats (i.e. dead links due to 404s not counted)  
Fixed: Oteupload.com dead links  
Fixed: Sendmyway.com links not checking  
Fixed: HenchFile & BillionUploads capitalised links not checking  
Fixed: Aa.vg not checking  
Fixed: Nutfile not checking  
Fixed: Sharebase.to alive links  
Fixed: Asfile.com dead links  
Fixed: Megaload.it dead links  
Fixed: Rockdizfile.com  
 
Tooltip info: Lots of filenames/errors added/fixed (too much to mention), Safelinking packages added (it's pretty cool, check it out! :D)  
WarBB now runs on Safelinking.net and Keeplinks.me too (so you won't have to check package links manually)

## 1.1.0 (26th January 2013)

Added: Uplly.com  
Added: Vidpe.com  
Added: Bigupload.com  

Obsolete: Filecloud.io / ifile.it (disallowed hosts)  
Obsolete: Eroshare.in (disallowed host)  
Obsolete: Useupload.com  
Obsolete: Seedfile.com  
Obsolete: Hatlimit.pl

Fixed: Uploading.com slowness in checking (added bulk checking)  
Fixed: Extabit.com slowness in checking (added bulkcheck for users with EB account, enable in config, disabled by default)  
Fixed: Megashares.com reliability (added bulkcheck)  
Fixed: 1fichier.com dead links  
Fixed: VideoBB.com dead links  
Fixed: Various safelinking.net direct links issues, including 404s (still doesn't work on chrome, most likely an issue with tampermonkey rather than WarBB)  


## 1.0.7 (23rd January 2013):

Added: Datacloud.to  
Added: Filevice.com  
Added: Cloudzer.net  
Added: Eyesfile.org (eyesfile.net)  
Added: Jumbofiles.org  
Added: Filemac.com (filekom.com)  
Added: Hotfiles.ws  
Added: Ifile.ws  
Added: File-speed.com  
Added: Rapidapk.com  
Added: Restfile.org (restfile.ca)  
Added: Upshared.com  
Added: Filecloud.ws  
Added: Aa.vg (aavg.net)  
Added: Ishare.bz  
Added: Sfshare.se  
Added: Filewe.com  
Added: Upload.ee  
Added: Filesmall.com  
Added: Putshare.net  
Added: Vidup.me  
Added: Putme.org  

Obsolete: Freefilehosting.ws  
Obsolete: Uploadby.us  
Obsolete: Kisalt.me  
Obsolete: Wizzupload.com  
Obsolete: Squillion.com  
Obsolete: 37v.net  
Obsolete: Xshar.net  
Obsolete: Filemsg.com  
Obsolete: Datafile.us  
Obsolete: Smallfile.in  
Obsolete: Space4upload.info  
Obsolete: Nrgfile.com  
Obsolete: Okah.com  
Obsolete: Filemojo.com  
Obsolete: Filerose.com  
Obsolete: Mega.huevn.com  
Obsolete: Hitfile.net (banned host)

Fixed: Eyesfile.com/co/net not checking  
Fixed: MF folders now marked as unresolved  
Fixed: Cobrashare dead links  
Fixed: Problem with restfile.ca and possibly other hosts causing other links (even some not checked by warBB) to be marked as dead  
Fixed: Problem with certain hotfile links causing script to indicate every links with a 0 in it as dead.  
Fixed: Filesbowl dead links  
Fixed: Fileswap alive links  
Fixed: Certain Share-online.biz links not checking  
Fixed: Nitrobits.com (added api)  


## 1.0.6 (14th January 2013):

Added: Upload.tc  
Added: Fileneo.com  
Added: File-upload.net  
Added: Fliiby.com  

Obsolete: Sharpfile.com  

Fixed: Uploadc.com alive links (added regex)

## 1.0.5 (3rd January 2013):

Added: easyfilesharing.info  
Added: yourupload.com  

Obsolete: savefile.com  
Obsolete: upload.ps  
Obsolete: divxcloud.com  
Obsolete: editandshare.com  
Obsolete: hostupload.net  
Obsolete: fileshaker.com  
Obsolete: youload.to  
Obsolete: addat.hu  
Obsolete: eyvx.com  
Obsolete: FileDeck.net  
Obsolete: filesnab.com  
Obsolete: filetitle.com  
Obsolete: ufliq.com  
Obsolete: sharebeats.com  
Obsolete: yotafile.com  
Obsolete: xxlupload.com  
Obsolete: your-filehosting.com  
Obsolete: uploading.to  
Obsolete: mummyfile.com  
Obsolete: play-host.net  
Obsolete: namipan.com  
Obsolete: alldrives.ge/allshares.ge  
Obsolete: uploadace.com  
Obsolete: 7ups.net  
Obsolete: buckshare.com  
Obsolete: cokluupload.com  
Obsolete: filefaster.com  
Obsolete: divxme.com  
Obsolete: rapidmedia.net  
Obsolete: filerace.com  
Obsolete: mdj.com  
Obsolete: crocshare.com  
Obsolete: movbay.org  
Obsolete: migafile.com  
Obsolete: dudupload.com  
Obsolete: fileuploadx.de  
Obsolete: fufox.net  
Obsolete: sharefiles4u.net  
Obsolete: fileor.com  
Obsolete: filedove.com  
Obsolete: wickedupload.com  
Obsolete: miurl.es

Fixed: 4share.ws dead links (added dead regex, wasn't added because no dead links found)  
Fixed: uload.to regex  

## 1.0.4 (26th December 2012):

Added: Eyesfile.co/.com (eyesfile.net)  
Added: Mixturecloud.com  
Added: Miurl.es  
Added: Brutalsha.re  
Added: Filefront.com/gamefront.com  
Added: Ability to select redirector service in config page, available redirectors: anonymz.com, anonym.to, blankrefer.com or no redirector. More can be added on request  
Added: Autoupdate (using sizzlemctwizzle's Another Auto Updater Script)  


Obsolete: weefile.com  
Obsolete: mykupload.freei.me  
Obsolete: share2u.net  
Obsolete: appscene.org  
Obsolete: filestock.net  
Obsolete: youmirror.biz  
Obsolete: projectcamelot.org  
Obsolete: gigupload.com  
Obsolete: fairyshare.com  

Fixed: Gigasize.com/get/ not picked up  
Fixed: 100shared.com, midupload.com and hostingbulk.com false results links because of api  
Fixed: Load.to regex  
Fixed: Safelinking unknown packages showing up as dead  
Fixed: Safelinking direct links 404s now marked as dead (only firefox)  
Fixed: Uploading.com parallel downloads/daily limit wrongfully showing as dead  
Fixed: restfile.com wrongfully marked as obsolete, added .ca, .co, .cc  
Fixed: Performance issues caused by serious memory leak due to safelinking.net direct links. Direct safelinking links will now retry 100 times if the service hasn't redirected anywhere, if no results they get marked as unresolved. This will only happen with Safelinking 404s for Chrome users.  

Original WAR Changes included in new WarBB:  
Added: ifile.ws  
Fixed: ultramegabit.com account limitation and restricted files  
Fixed: sendmyway.com (added api)

## 1.0.3 (20th December 2012):

Added: 10upload.com (queenshare.com)  
Added: zalil.ru  
Added: uploads.bizhat.com  
Added: ortofiles.com  
Added: sharingmaster.com  
Added: mega-myfile.com  
Added: blitzfiles.com  
Added: netkozmos.com  
Added: filesbowl.com  
Added: hulkload.com  
Added: wizzupload.com  
Added: hotuploading.com  
Added: bubblefiles.com  
Added: albafile.com  
Added: expressleech.com  
Added: zenload.com  
Added: fileband.com  
Added: speedvid.tv  
Added: exclusivefaile.com  
Added: gbitfiles.com  
Added: allmyvideos.net  
Added: videopremium.net  
Added: sharerepo.com  
Added: videozed.net  
Added: midupload.com  
Added: basicupload.com  
Added: terabit.to  
Added: sharesix.com  
Added: saarie.com  
Added: putshare.com  
Added: project-free-upload.com  
Added: uploadc.com  
Added: filestock.ru  
Added: freestorage.ro  
Added: share.az  
Added: imzupload.com  
Added: netuploaded.com  
Added: multifilestorage.com  
Added: hostingbulk.com  
Added: speedy-share.com  
Added: 100shared.com  
Added: xvidstage.com  
Added: faststream.in  
Added: vidbull.com  
Added: igetfile.com  
Added: rapidfileshare.net  
Added: filebox.ro  
    
Obsolete: bit.vc  
Obsolete: filestrack.com  
Obsolete: emodownloads.com  
Obsolete: fileslinks.com  
Obsolete: themes.pickplus.net  
Obsolete: mruploads.com  
Obsolete: fsc.com  
Obsolete: warmfile.com  
Obsolete: gptfile.com  
Obsolete: uploadfloor.com  
Obsolete: getfile.biz  
Obsolete: bestsharing.com  
Obsolete: upload66.com  
Obsolete: fileshack.icraze.net  
Obsolete: mazupload.com  
Obsolete: halotemplate.free.fr  
Obsolete: desiload.com  
Obsolete: filegiant.net  
Obsolete: voodoom.com  
Obsolete: getupload.com  
Obsolete: url.file.am  
Obsolete: dago.to  
Obsolete: hamstershare.com  
Obsolete: cinshare.com  
Obsolete: supashare.net  
Obsolete: sharepro.info  
Obsolete: momoshare.com  
Obsolete: sloveniandesigner.com  
Obsolete: multidesi.com  
Obsolete: clonefile.com  
Obsolete: uploadski.com  
Obsolete: speedie-host.com  
Obsolete: turboupload.com  
Obsolete: shareapic.net/clickapic.com  
  
Fixed: Upfile.in wrongfully marked as obsolete  
Fixed: Direct Safelinking links which lead to FSC marking as unresolved now marked as dead.  
Fixed: Uploading.com not picked up links  
Fixed: Error in Fiberupload regex which caused the LC not to work if Fiberupload links were on the page  
Fixed: Mediafire not checking alive links  
Fixed: Sendmyway alive links  
Fixed: 1fichier alive links  
Fixed: Uploading.com "file still uploading" and "file server not available" marked as unresolved  
Fixed: Hotuploading.com being picked up as uploading.com


## 1.0.2 (16th December 2012):

Added: fileparadox.in  
Added: 4share.ws  
Added: ukfilehost.com

Obsolete: dopeshare.com  
Obsolete: filethe.net  
Obsolete: 6ybh-upload.com  
Obsolete: zetshare.net  
Obsolete: udic.co  
Obsolete: coolfilehost.com  
Obsolete: uploadables.com  
Obsolete: filevegas.com  
Obsolete: pcdesignfiles.hi2.ro  
Obsolete: filessharefg.3x.ro  
Obsolete: kitwit.info  
Obsolete: neturl.info  
Obsolete: megafilesharing.com  
Obsolete: gfxheaven.co.uk  
Obsolete: twinupload.com  
Obsolete: linkrevenue.com  
Obsolete: seed-share.com  
Obsolete: mazzikatop.com  
Obsolete: saba.mehargroup.org  
Obsolete: themeyoou.com  
Obsolete: do32.com  
Obsolete: sharequickly.com  
Obsolete: gfxshare.net  
Obsolete: speeddsharing.info  
Obsolete: downup.us.to  
Obsolete: sharedl.com  

Fixed: filesonic regex  
Fixed: safelinking broken packages  
Fixed: box.net  
Fixed: censored folder links  


## 1.0.1 (12th December 2012):

Added: ifilehosting.net  
Added: fileplaneta.com  
Added: filenuke.com  
Added: box.com  
Added: odsiebie.pl  
Added: nitrobits.com  
Added: rnbload.com  
Added: ability to change the anonymizer, changed default to anonymz.com

Obsolete: filevelocity.com  

Fixed: datafilehost.com not picked up link  
Fixed: safelinking.net/p/ non existing links  
Fixed: aavg.net alive links  
Fixed: hotfile.com/file/ links  
Fixed: hotfiles.ws (added api) 

 
## Version 1.0.0 (release - 8th December 2012): 

Added: myupload  
Added: filebeam  
Added: upsto  
Added: hotfiles  
Added: aavg  
Added: megaload  
Added: oteupload  
Added: filebulk  
Added: uploadblast  
Added: gbmeister  
Added: filedwon  
Added: filemaze  
Added: uploadcore  
Added: filerio  
Added: filekom
Added: Custom disallowed support (WBB only)

Obsolete: Megashare  
Obsolete: sharerun  
Obsolete: 1hostclick  
Obsolete: 4us  
Obsolete: dinnoz  
Obsolete: filegaze  
Obsolete: restfile  
Obsolete: missupload  
Obsolete: fileud  
Obsolete: up250  
Obsolete: uploadchoice  
Obsolete: uploadspot  
Obsolete: upload  
Obsolete: launchfile  
Obsolete: proddl  
Obsolete: fileape  
Obsolete: azushare  
Obsolete: maishare  
Obsolete: uploading4u  
Obsolete: uploadsfiles  
Obsolete: cloudnxt  
Obsolete: uploadboost  
Obsolete: filelaser  
Obsolete: filefat  
Obsolete: filedino  
Obsolete: shareupload  
Obsolete: wolfshare  
Obsolete: 4bytez  
Obsolete: anonstream  
Obsolete: batshare  
Obsolete: bitroad  
Obsolete: brontofile  
Obsolete: cloudnator  
Obsolete: coolshare  
Obsolete: dark-uploads  
Obsolete: dotavi  
Obsolete: file-bit  
Obsolete: filecosy  
Obsolete: fileduct  
Obsolete: filemashine  
Obsolete: fileserver  
Obsolete: filetechnology  
Obsolete: fireuploads    
Obsolete: getzilla  
Obsolete: hellspy  
Obsolete: holderfile  
Obsolete: ihostia  
Obsolete: isavelink  
Obsolete: k2files  
Obsolete: migahost  
Obsolete: mojofile  
Obsolete: ovfile  
Obsolete: plunder  
Obsolete: premiuns  
Obsolete: qshare  
Obsolete: shafiles  
Obsolete: sharefilehost  
Obsolete: stahuj  
Obsolete: novoro  
Obsolete: uploadstube  
Obsolete: vidhog  
Obsolete: xfileshare  
Obsolete: bzlink  
Obsolete: cing  
Obsolete: linksafe  
Obsolete: fileupped  
Obsolete: getthebit  
Obsolete: hackerbox  
Obsolete: uploadmachine  
Obsolete: uploadoz  
Obsolete: upthe  
Obsolete: paid4share  
Obsolete: icefile  
Obsolete: smartsharing  
Obsolete: fxpag  
Obsolete: filebeep  
Obsolete: smartupload  
Obsolete: timbshare  
Obsolete: iuploadfiles  
Obsolete: zizfile  
Obsolete: files-upload  
Obsolete: pointupload  
Obsolete: uploadarmy  
Obsolete: mydir  
Obsolete: pctoworld  
Obsolete: direktload  
Obsolete: momupload  
Obsolete: yastorage  
Obsolete: sharedzilla  
Obsolete: simpleupload  
Obsolete: quicksharing  
Obsolete: buploads  
Obsolete: uploadhut  
Obsolete: orbitfiles  
Obsolete: midload  
Obsolete: savefile  
Obsolete: cocoshare  
Obsolete: sharebase  
Obsolete: filehost  
Obsolete: hotelupload  
Obsolete: fileholding  
Obsolete: woofiles  
Obsolete: xuploading  
Obsolete: speedshare  
Obsolete: uploadville  
Obsolete: supasic  
Obsolete: uploadpalace  
Obsolete: uploadr  
Obsolete: rapidfile  
Obsolete: openupload  
Obsolete: miniuploads  
Obsolete: titanicshare  
Obsolete: sharelor  
Obsolete: keepmyfile  
Obsolete: sharebigfile  
Obsolete: share  
Obsolete: sprintshare  
Obsolete: rapidupload  
Obsolete: theonlinedatastorage  
Obsolete: bulletupload  
Obsolete: hellshare  
Obsolete: glumbouploads  
Obsolete: uploadlab  
Obsolete: share.cx  
Obsolete: uploaddot  
Obsolete: megaftp  
Obsolete: seeupload  
Obsolete: rapidshare.com/users

Fixed: extabit not checking dead links  
Fixed: extabit not recognized links  
Fixed: sendmyway not checking dead links  
Fixed: filekom dead links not checking  
Fixed: 2shared document links  
Fixed: eyesfile dead link not checking  
Fixed: yunfile new domain name: yfdisk  
Fixed: gigasize link not picked up  