// rhel-for-sap-configurator.js: Show resources, subscriptions,
//   repositories, and commands for running SAP on RHEL
// Author: Bernd Finger (bfinger@redhat.com)
//
// v1.0: initial version
//       Sun 10 May 2020
// v1.1: performed some corrections to the Resources section
//       Sun 10 May 2020
// v1.2: added RHEL kernel versions and end of support dates
//       Mon 11 May 2020
// v1.3: typo corrections; display POWER hardware platform types for SAP HANA
//       Tue 12 May 2020
// v1.4: added HANA 1.0; minor corrections
//       Thu 14 May 2020
// v1.5: added gcc versions for HANA 2.0 and HANA 1.0
//       Thu 14 May 2020
// v1.5.1: added RHEL HA document to the "Resources:" section 
//       Sat 13 Jun 2020
// v1.5.2: added required minimum RHEL kernel versions for SAP HANA to the "RHEL x.y:" line
//       Sat 13 Jun 2020
// v1.5.3: added cloud repo names
//       Tue 25 Jun 2020

function displaySelections() { 
  var elem = document.getElementsByName('sapSelect'); 
  for(i = 0; i < elem.length; i++) { 
    if(elem[i].checked) 
    document.getElementById("result1").innerHTML
	= "SAP: "+elem[i].value; 
  } 
  var elem = document.getElementsByName('archSelect'); 
  for(i = 0; i < elem.length; i++) { 
    if(elem[i].checked) 
    document.getElementById("result2").innerHTML
	= "Arch: "+elem[i].value; 
  } 
  var elem = document.getElementsByName('rhelSelect'); 
  for(i = 0; i < elem.length; i++) { 
    if(elem[i].checked) 
    document.getElementById("result3").innerHTML
	= "RHEL: "+elem[i].value; 
  } 
  var elem = document.getElementsByName('haSelect'); 
  for(i = 0; i < elem.length; i++) { 
    if(elem[i].checked) 
    document.getElementById("result4").innerHTML
	= "HA: "+elem[i].value; 
  } 
  var elem = document.getElementsByName('cloudSelect'); 
  for(i = 0; i < elem.length; i++) { 
    if(elem[i].checked) 
    document.getElementById("result5").innerHTML
	= "Cloud: "+elem[i].value; 
  } 
}

function displayResults() {
   _haRepo = "<br><br>";
   _haText = "<br><br>";
//   getArchIndex()
//   getRHELIndex()
//   getSAPIndex()
//   getHAIndex()
//   vSAP=document.getElementById("sapSelect").value;
  var elem = document.getElementsByName('sapSelect'); 
  for(i = 0; i < elem.length; i++) { 
    if(elem[i].checked) vSAP=elem[i].value;
  }
  var elem = document.getElementsByName('archSelect'); 
  for(i = 0; i < elem.length; i++) { 
    if(elem[i].checked) vArch=elem[i].value;
  }
  if (typeof vArch === 'undefined') return;
  if (vArch == "x86_64") {vArch7 = "server"}
  else if (vArch == "ppc64le") {vArch7 = "for-power-le"}
  else if (vArch == "ppc64") {vArch7 = "for-power"}
  else if (vArch == "s390x") {vArch7 = "for-system-z"}
//  alert ("vArch = " + vArch + "; vArch7 = " + vArch7);
  var elem = document.getElementsByName('rhelSelect'); 
  for(i = 0; i < elem.length; i++) { 
    if(elem[i].checked) vRHEL=elem[i].value;
  }
  var vRHELmajor = vRHEL.substr(0,1);
//  alert ("vRHELmajor = " + vRHELmajor);
  var elem = document.getElementsByName('haSelect'); 
  for(i = 0; i < elem.length; i++) { 
    if(elem[i].checked) vHA=elem[i].value;
  } 
  var elem = document.getElementsByName('cloudSelect'); 
  for(i = 0; i < elem.length; i++) { 
    if(elem[i].checked) vCloud=elem[i].value;
  } 
//   vArch=document.getElementById("archSelect").value;
//   vRHEL=document.getElementById("rhelSelect").value;
//   vHA=document.getElementById("haSelect").value;
   document.getElementById("idRemarks").innerHTML = "<br><br>";
   document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
   document.getElementById("titleRHEL").innerHTML = "RHEL:";
   document.getElementById("idRHEL").innerHTML = "";
   document.getElementById("titleRepos").innerHTML = "Repositories:";
   document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
   document.getElementById("titleCommands").innerHTML = "Commands:";
   document.getElementById("id_ppc64le").disabled = false;
   document.getElementById("id_ppc64").disabled = false;
   document.getElementById("id_s390x").disabled = false;
   document.getElementById("id_65").disabled = false;
   document.getElementById("id_66").disabled = false;
   document.getElementById("id_67").disabled = false;
   document.getElementById("id_610").disabled = false;
   document.getElementById("id_72").disabled = false;
   document.getElementById("id_78").disabled = false;
   document.getElementById("id_80").disabled = false;
   document.getElementById("id_81").disabled = false;
   document.getElementById("id_82").disabled = false;
   document.getElementById("id_Cloud_on").disabled = false;
   if (vArch == "ppc64le") {
      document.getElementById("id_72").disabled = true;
      document.getElementById("id_Cloud_on").disabled = true;
   }
   if (vSAP == "SAP HANA 1.0") {
      document.getElementById("id_ppc64").disabled = true;
      document.getElementById("id_ppc64le").disabled = true;
      document.getElementById("id_s390x").disabled = true;
      document.getElementById("id_78").disabled = true;
      document.getElementById("id_80").disabled = true;
      document.getElementById("id_81").disabled = true;
      document.getElementById("id_82").disabled = true;
      if (vRHELmajor == "6") {
         document.getElementById("id_Cloud_on").disabled = true;
         document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
         document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = 
         "subscription-manager release --set=" + vRHEL;
         if (vRHEL == "6.5") {
            document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/1544043\">Red Hat KB 1544043</a> - How to subscribe RHEL 6/7 system to RHEL for SAP Channel?" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/1496410\">SAP note 1496410</a> - Red Hat Enterprise Linux 6.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2013638\">SAP note 2292690</a> - SAP HANA DB: Recommended OS settings for RHEL 6.5" + "<br>";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 1.0 up to SPS11</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2021789\">Latest rev: HANA 1.0 SPS11 rev 112.07</a>" + "<br>" +
"HANA 1.0 SPS11: gcc version unknown.<br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-431</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not available; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         if (vRHEL == "6.6") {
            document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/1544043\">Red Hat KB 1544043</a> - How to subscribe RHEL 6/7 system to RHEL for SAP Channel?" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/1496410\">SAP note 1496410</a> - Red Hat Enterprise Linux 6.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2136965\">SAP note 2136965</a> - SAP HANA DB: Recommended OS settings for RHEL 6.6" + "<br>";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 1.0 up to SPS11</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2021789\">Latest rev: HANA 1.0 SPS11 rev 112.07</a>" + "<br>" +
"HANA 1.0 SPS11: gcc version unknown.<br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-504</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not available; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         if (vRHEL == "6.7") {
            document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/1544043\">Red Hat KB 1544043</a> - How to subscribe RHEL 6/7 system to RHEL for SAP Channel?" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/1496410\">SAP note 1496410</a> - Red Hat Enterprise Linux 6.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2247020\">SAP note 2247020</a> - SAP HANA DB: Recommended OS settings for RHEL 6.7" + "<br>";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 1.0 SPS11 and newer</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.30</a>" + "<br>" +
"HANA 1.0 SPS12: <b>gcc 4</b>.<br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-573</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not available; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         if (vRHEL == "6.10") {
            document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/1544043\">Red Hat KB 1544043</a> - How to subscribe RHEL 6/7 system to RHEL for SAP Channel?" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/1496410\">SAP note 1496410</a> - Red Hat Enterprise Linux 6.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2694292\">SAP note 2694292</a> - SAP HANA DB: Recommended OS settings for RHEL 6.10" + "<br>";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 1.0 SPS12 rev 122.23 and newer</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.30</a>" + "<br>" +
"HANA 1.0 SPS12: <b>gcc 4</b>.<br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-754</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not available; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         if (vHA == "HA") {
	    document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>";
            _haRepo = "<br>" + "rhel-ha-for-rhel-6-server-rpms" + "<br>";
            _haText = " \\<br>" + "--enable=\"" + "rhel-ha-for-rhel-6-server-rpms" + "\"";
         }
	 else {
	    document.getElementById("idResources").innerHTML +=
"<br>" +
"<br>";
         }
         document.getElementById("idRepos").innerHTML = 
           "rhel-6-server-rpms" + "<br>" +
           "rhel-sap-hana-for-rhel-6-server-rpms" + "<br>" +
           "rhel-scalefs-for-rhel-6-server-rpms" +
           _haRepo +
           "<br>";
         document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
           "subscription-manager repos \\<br>" +
           "--enable=\"" + "rhel-6-server-rpms" + "\" \\<br>" +
           "--enable=\"" + "rhel-sap-hana-for-rhel-6-server-rpms" + "\"" + "<br>" +
           "--enable=\"" + "rhel-scalefs-for-rhel-6-server-rpms" + "\"" +
           _haText;
      }
      else if (vRHELmajor == "7") {
         document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/3075991\">Red Hat KB 3075991</a> - How to subscribe SAP HANA systems to the Update Services for SAP Solutions" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2002167\">SAP note 2002167</a> - Red Hat Enterprise Linux 7.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2292690\">SAP note 2292690</a> - SAP HANA DB: Recommended OS settings for RHEL 7" + "<br>"
         document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
         document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = 
         "subscription-manager release --set=" + vRHEL;
     	 if (vCloud == "no Cloud") {
     	    _rhui=""
     	 }
     	 else {
     	    _rhui="rhui-"
     	 }
         if (vHA == "HA") {
	    document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>";
	    _ha = "rhel-ha-for-rhel-7-server-" + _rhui + "e4s-rpms";
            _haRepo = "<br>" + _ha + "<br>";
            _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
         }
	 else {
	    document.getElementById("idResources").innerHTML +=
"<br>" +
"<br>";
	 }
         document.getElementById("idRepos").innerHTML = 
           "rhel-7-server-" + _rhui + "e4s-rpms" + "<br>" +
           "rhel-sap-hana-for-rhel-7-server-" + _rhui + "e4s-rpms" +
           _haRepo +
           "<br><br>";
         document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
           "subscription-manager repos \\<br>" +
           "--enable=\"" + "rhel-7-server-" + _rhui + "e4s-rpms" + "\" \\<br>" +
           "--enable=\"" + "rhel-sap-hana-for-rhel-7-server-" + _rhui + "e4s-rpms" + "\"" +
           _haText;
     	 if (vRHEL == "7.2") {
     	    document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 1.0 SPS12</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.30</a>" + "<br>" + 
"HANA 1.0 SPS12: <b>gcc 4</b>.<br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-327</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S available; support for EUS ended November 30, 2017; support for E4S ended November 30, 2019</a>";
     	 }
     	 else if (vRHEL == "7.3") {
     	    document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 1.0 SPS12</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.30</a>" + "<br>" +
"HANA 1.0 SPS12: <b>gcc 4</b>.<br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-514</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends November 30, 2020</a>";
     	 }
     	 else if (vRHEL == "7.4") {
     	    document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 1.0 SPS12 rev 122.14 and newer</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.30</a>" + "<br>" +
"HANA 1.0 SPS12: <b>gcc 4</b>.<br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-693</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends August 31, 2021</a>";
     	 }
     	 else if (vRHEL == "7.5") {
     	    document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 1.0 SPS12 rev 122.19 and newer</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.30</a>" + "<br>" +
"HANA 1.0 SPS12: <b>gcc 4</b>.<br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-862</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not available; support for EUS ended April 30, 2020</a>";
            if (vHA == "HA") {
	       _ha = "rhel-ha-for-rhel-7-server-" + _rhui + "eus-rpms";
               _haRepo = "<br>" + _ha + "<br>";
               _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
            }
            document.getElementById("idRepos").innerHTML = 
              "rhel-7-server-" + _rhui + "eus-rpms" + "<br>" +
              "rhel-sap-hana-for-rhel-7-server-" + _rhui + "eus-rpms" +
              _haRepo +
              "<br><br>";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
              "subscription-manager repos \\<br>" +
              "--enable=\"" + "rhel-7-server-" + _rhui + "eus-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-sap-hana-for-rhel-7-server-" + _rhui + "eus-rpms" + "\"" +
              _haText;
     	 }
         else if (vRHEL == "7.6") {
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 1.0 SPS12 rev 122.23 and newer</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.30</a>" + "<br>" +
"HANA 1.0 SPS12: <b>gcc 4</b>.<br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-957</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends October 31, 2022</a>";
         }
         if (vRHEL == "7.7") {
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 1.0 is not yet supported for RHEL " + vRHEL + "</a>" + "<br><br>";
            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
            document.getElementById("idSubscription").innerHTML = "";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1062</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends August 30, 2023</a>";
     	    document.getElementById("titleRepos").innerHTML = vSAP + " is not yet supported for RHEL " + vRHEL + ".";
     	    document.getElementById("titleCommands").innerHTML = "";
     	    document.getElementById("idRepos").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
         else if (vRHEL == "7.8") {
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 1.0 is not supported for RHEL " + vRHEL + "</a>" + "<br><br>";
            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
            document.getElementById("idSubscription").innerHTML = "";
            document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1127</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Maintenance_Support_2_Phase\">E4S and EUS not available; support ends at RHEL 7.9 release date, 3QCY20</a>";
     	    document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + ".";
     	    document.getElementById("titleCommands").innerHTML = "";
     	    document.getElementById("idRepos").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
      }
   }
   else if (vSAP == "SAP HANA 2.0") {
      document.getElementById("id_ppc64").disabled = true;
      document.getElementById("id_s390x").disabled = true;
      document.getElementById("id_65").disabled = true;
      document.getElementById("id_66").disabled = true;
      document.getElementById("id_67").disabled = true;
      document.getElementById("id_610").disabled = true;
      document.getElementById("id_78").disabled = true;
      document.getElementById("idSubscription").innerHTML = "<a href=\"https://access.redhat.com/solutions/3082481\">Red Hat Enterprise Linux for SAP Solutions</a>";
      if (vArch == "ppc64" || vArch == "s390x") {
     	 document.getElementById("titleRepos").innerHTML = vSAP + " is not supported on " + vArch + ".";
     	 document.getElementById("titleCommands").innerHTML = "";
         document.getElementById("idSubscription").innerHTML = "";
     	 document.getElementById("idRepos").innerHTML = "";
     	 document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
     	 document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
      }
      else {
         document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = 
         "subscription-manager release --set=" + vRHEL;
         if (vRHEL == "6.5" ||
             vRHEL == "6.6" ||
             vRHEL == "6.7" ||
             vRHEL == "6.10") {
            document.getElementById("id_ppc64le").disabled = true;
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 is not supported for RHEL " + vRHEL + "</a>" + "<br><br>";
            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
            document.getElementById("idSubscription").innerHTML = "";
            document.getElementById("titleRHEL").innerHTML = "&nbsp;";
            document.getElementById("idRHEL").innerHTML = "";
     	    document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + ".";
     	    document.getElementById("titleCommands").innerHTML = "";
     	    document.getElementById("idRepos").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
         else if (vRHEL == "7.2" ||
                  vRHEL == "7.3" ||
                  vRHEL == "7.4" ||
                  vRHEL == "7.6") {
            document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/3075991\">Red Hat KB 3075991</a> - How to subscribe SAP HANA systems to the Update Services for SAP Solutions" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2002167\">SAP note 2002167</a> - Red Hat Enterprise Linux 7.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2292690\">SAP note 2292690</a> - SAP HANA DB: Recommended OS settings for RHEL 7" + "<br>";
            document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
            document.getElementById("idRHEL").innerHTML = "E4S available";
     	    if (vCloud == "no Cloud") {
     	       _rhui=""
     	    }
     	    else {
     	       _rhui="rhui-"
     	    }
            if (vArch == "x86_64") {
               if (vRHEL == "7.2") {
                  document.getElementById("id_ppc64le").disabled = true;
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 up to HANA 2.0 SPS03</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS03 rev 37.05</a>" + "<br>" +
"HANA 2.0 SPS01: <b>gcc 5</b>. SPS02 and SPS03: <b>gcc 6</b>.<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-327</a>. " +
"<a href=\"https://launchpad.support.sap.com/#/notes/2292690\">Minimum required: 3.10.0-327.62.4.el7</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ended November 30, 2019</a>";
               }
               else if (vRHEL == "7.3") {
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 SPS02 rev 21 and newer, up to HANA 2.0 SPS03</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS03 rev 37.05</a>" + "<br>" +
"HANA 2.0 SPS02 and SPS03: <b>gcc 6</b>.<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-514</a>. " +
"<a href=\"https://launchpad.support.sap.com/#/notes/2292690\">Minimum required: 3.10.0-514.36.5.el7</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends November 30, 2020</a>";
               }
               else if (vRHEL == "7.4") {
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 SPS02 rev 23 and newer</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS04 rev 47</a>" + "<br>" +
"HANA 2.0 SPS02 and SPS03: <b>gcc 6</b>. SPS04: <b>gcc 7</b>.<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-693</a>. " +
"<a href=\"https://launchpad.support.sap.com/#/notes/2292690\">Minimum required: 3.10.0-693.11.6</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends August 31, 2021</a>";
               }
               else if (vRHEL == "7.6") {
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 SPS03 rev 36 and newer</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS04 rev 47</a>" + "<br>" +
"HANA 2.0 SPS03: <b>gcc 6</b>. SPS04: <b>gcc 7</b>.<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-957</a>. " +
"<a href=\"https://launchpad.support.sap.com/#/notes/2292690\">Minimum required: 3.10.0-957.1.3</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends October 31, 2022</a>";
               }
               if (vHA == "HA") {
		  document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>";
                  _ha = "rhel-ha-for-rhel-7-server-" + _rhui + "e4s-rpms"
		  _haRepo = "<br>" + _ha + "<br>";
                  _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
               }
	       else {
	          document.getElementById("idResources").innerHTML +=
"<br>" +
"<br>";
	       }
               document.getElementById("idRepos").innerHTML = 
                 "rhel-7-server-" + _rhui + "e4s-rpms" + "<br>" +
                 "rhel-sap-hana-for-rhel-7-server-" + _rhui + "e4s-rpms" +
                 _haRepo +
                 "<br><br>";
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
                 "subscription-manager repos \\<br>" +
                 "--enable=\"" + "rhel-7-server-" + _rhui + "e4s-rpms" + "\" \\<br>" +
                 "--enable=\"" + "rhel-sap-hana-for-rhel-7-server-" + _rhui + "e4s-rpms" + "\"" +
                 _haText;
            }
            else if (vArch == "ppc64le") {
               document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/3075991\">Red Hat KB 3075991</a> - How to subscribe SAP HANA systems to the Update Services for SAP Solutions" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2055470\">SAP note 2055470</a> - HANA on POWER Planning and Installation Specifics - Central Note" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2002167\">SAP note 2002167</a> - Red Hat Enterprise Linux 7.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2292690\">SAP note 2292690</a> - SAP HANA DB: Recommended OS settings for RHEL 7" + "<br>";
               if (vRHEL == "7.2") {
                  document.getElementById("id_ppc64le").disabled = true;
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 is not supported for RHEL " + vRHEL + " on " + vArch + "</a>" + "<br><br>";
                  document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
                  document.getElementById("idSubscription").innerHTML = "";
                  document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-327</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ended November 30, 2019</a>";
     	          document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + " on " + vArch + ".";
     	          document.getElementById("titleCommands").innerHTML = "";
     	          document.getElementById("idRepos").innerHTML = "";
     	          document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
     	          document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
               }
               else {
                  if (vRHEL == "7.3") {
                     document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 SPS02 rev 21 and newer, up to HANA 2.0 SPS03</a>" + ".&nbsp;" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS03 rev 37.05</a>" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2055470\">Only on POWER8</a>. HANA 2.0 SPS02 and SPS03: <b>gcc 6</b>.<br>";
                     document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-514</a>. " +
"<a href=\"https://launchpad.support.sap.com/#/notes/2292690\">Minimum required: 3.10.0-514.36.5.el7</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends November 30, 2020</a>";
                  }
                  else if (vRHEL == "7.4") {
                     document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 SPS02 rev 23 and newer</a>" + ".&nbsp;" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS04 rev 47</a>" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2055470\">Only on POWER8</a>. HANA 2.0 SPS02 and SPS03: <b>gcc 6</b>. SPS04: <b>gcc 7</b>.<br>";
                     document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-693</a>. " +
"<a href=\"https://launchpad.support.sap.com/#/notes/2292690\">Minimum required: 3.10.0-693.11.6</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends August 31, 2021</a>";
                  }
                  else if (vRHEL == "7.6") {
                     document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 SPS03 rev 36 and newer</a>" + ".&nbsp;" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS04 rev 47</a>" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2055470\">Only on POWER8</a>. HANA 2.0 SPS03: <b>gcc 6</b>. SPS04: <b>gcc 7</b>.<br>";
                     document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-957</a>. " +
"<a href=\"https://launchpad.support.sap.com/#/notes/2292690\">Minimum required: 3.10.0-957.1.3</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends October 31, 2022</a>";
                  }
                  if (vHA == "HA") {
	             document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>";
                     _haRepo = "<br>" + "rhel-ha-for-rhel-7-for-power-le-e4s-rpms" + "<br>";
                     _haText = " \\<br>" + "--enable=\"" + "rhel-ha-for-rhel-7-for-power-le-e4s-rpms" + "\"";
                  }
	          else {
	             document.getElementById("idResources").innerHTML +=
"<br>";
	          }
                  document.getElementById("idRepos").innerHTML = 
                    "rhel-7-for-power-le-e4s-rpms" + "<br>" +
                    "rhel-sap-hana-for-rhel-7-for-power-le-e4s-rpms" +
                    _haRepo +
                    "<br><br>";
                  document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
                    "subscription-manager repos \\<br>" +
                    "--enable=\"" + "rhel-7-for-power-le-e4s-rpms" + "\"  \\<br>" +
                    "--enable=\"" + "rhel-sap-hana-for-rhel-7-for-power-le-e4s-rpms" + "\"" +
                    _haText;
               }
            }
         }
         else if (vRHEL == "7.5") {
            document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/3075991\">Red Hat KB 3075991</a> - How to subscribe SAP HANA systems to the Update Services for SAP Solutions" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2002167\">SAP note 2002167</a> - Red Hat Enterprise Linux 7.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2292690\">SAP note 2292690</a> - SAP HANA DB: Recommended OS settings for RHEL 7" + "<br>";
            document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-862</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not available; support for EUS ended April 30, 2020</a>";
            if (vArch == "x86_64") {
               document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 SPS03 only, starting with rev 32</a>" + ".&nbsp;" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS03 rev 37.05</a>" + "<br>" +
"HANA 2.0 SPS03: <b>gcc 6</b>.<br>";
     	       if (vCloud == "no Cloud") {
     	    	  _rhui1=""
     	    	  _rhui2=""
     	       }
     	       else {
     	    	  _rhui1="rhui-"
     	    	  _rhui2="-rhui-eus"
     	       }
               if (vHA == "HA") {
		  document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>";
                  _haRepo = "<br>" + "rhel-ha-for-rhel-7-server" + _rhui2 + "-rpms" + "<br>";
                  _haText = " \\<br>" + "--enable=\"" + "rhel-ha-for-rhel-7-server" + _rhui2 + "-rpms" + "\"";
               }
	       else {
	          document.getElementById("idResources").innerHTML +=
"<br>" +
"<br>";
	       }
               document.getElementById("idRepos").innerHTML = 
                 "rhel-7-server" + _rhui2 + "-rpms" + "<br>" +
                 "rhel-sap-hana-for-rhel-7-server" + _rhui2 + "-rpms" +
                 _haRepo +
                 "<br><br>";
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
                 "subscription-manager repos \\<br>" +
                 "--enable=\"" + "rhel-7-server" + _rhui2 + "-rpms" + "\" \\<br>" +
                 "--enable=\"" + "rhel-sap-hana-for-rhel-7-server" + _rhui2 + "-rpms" + "\"" +
                 _haText;
            }
            else if (vArch == "ppc64le") {
               document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/3075991\">Red Hat KB 3075991</a> - How to subscribe SAP HANA systems to the Update Services for SAP Solutions" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2055470\">SAP note 2055470</a> - HANA on POWER Planning and Installation Specifics - Central Note" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2002167\">SAP note 2002167</a> - Red Hat Enterprise Linux 7.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2292690\">SAP note 2292690</a> - SAP HANA DB: Recommended OS settings for RHEL 7" + "<br>";
               document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 SPS03 only, starting with rev 32</a>" + ".&nbsp;" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS03 rev 37.05</a>" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2055470\">Only on POWER8</a>. HANA 2.0 SPS03: <b>gcc 6</b>.<br>";
               if (vHA == "HA") {
		  document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>";
                  _haRepo = "<br>" + "rhel-ha-for-rhel-7-server-for-power-le-rpms" + "<br>";
                  _haText = " \\<br>" + "--enable=\"" + "rhel-ha-for-rhel-7-server-for-power-le-rpms" + "\"";
               }
	       else {
	          document.getElementById("idResources").innerHTML += "<br>";
	       }
               document.getElementById("idRepos").innerHTML = 
                 "rhel-7-for-power-le-rpms" + "<br>" +
                 "rhel-sap-hana-for-rhel-7-for-power-le-rpms" +
                 _haRepo +
                 "<br><br>";
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
                 "subscription-manager repos \\<br>" +
                 "--enable=\"" + "rhel-7-for-power-le-rpms" + "\"  \\<br>" +
                 "--enable=\"" + "rhel-sap-hana-for-rhel-7-for-power-le-rpms" + "\"" +
                 _haText;
            }
         }
         else if (vRHEL == "7.7") {
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 is not yet supported for RHEL " + vRHEL + "</a>" + "<br><br>";
            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
            document.getElementById("idSubscription").innerHTML = "";
            document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1062</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends August 30, 2023</a>";
     	    document.getElementById("titleRepos").innerHTML = vSAP + " is not yet supported for RHEL " + vRHEL + ".";
     	    document.getElementById("titleCommands").innerHTML = "";
     	    document.getElementById("idRepos").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
         else if (vRHEL == "7.8") {
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 is not supported for RHEL " + vRHEL + "</a>" + "<br><br>";
            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
            document.getElementById("idSubscription").innerHTML = "";
            document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1127</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Maintenance_Support_2_Phase\">E4S and EUS not available; support ends at RHEL 7.9 release date, 3QCY20</a>";
     	    document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + ".";
     	    document.getElementById("titleCommands").innerHTML = "";
     	    document.getElementById("idRepos").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
         else if (vRHEL == "8.0" ||
                  vRHEL == "8.1") {
            document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/4714781\">Red Hat KB 4714781</a> - How to subscribe to Update Services for SAP Solutions on RHEL 8" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2772999\">SAP note 2772999</a> - Red Hat Enterprise Linux 8.x: Installation and Configuration" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2777782\">SAP note 2777782</a> - SAP HANA DB: Recommended OS settings for RHEL 8" + "<br>";
            document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
            document.getElementById("id_ppc64").disabled = true;
            _baseos="-baseos";
            _appstream="-appstream";
            _sap_solutions="-sap-solutions";
            _sap_netweaver="-sap-netweaver";
            if (vArch == "x86_64") {
               if (vRHEL == "8.0") {
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 SPS04 rev 40 and newer</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS04 rev 47</a>" + "<br>" +
"HANA 2.0 SPS04: <b>gcc 7</b>.<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: 4.18.0-80</a>. " +
"<a href=\"https://launchpad.support.sap.com/#/notes/2777782\">Minimum required: 4.18.0-80</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends December 31, 2020</a>";
               }
               else if (vRHEL == "8.1") {
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 SPS04 rev 45 and newer</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS04 rev 47</a>" + "<br>" +
"HANA 2.0 SPS04: <b>gcc 7</b>.<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: 4.18.0-147</a>. " +
"<a href=\"https://launchpad.support.sap.com/#/notes/2777782\">Minimum required: 4.18.0-147.5.1.el8_1</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends November 30, 2023</a>";
               }
               if (vCloud == "no Cloud") {
	          _rhui=""
               }
               else {
	          _rhui="-rhui"
               }
               if (vHA == "HA") {
		  document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>";
        	  _ha = "rhel-8-for-" + vArch + "-highavailability-e4s" + _rhui + "-rpms";
	   	  _haRepo = "<br>" + _ha + "<br>";
	   	  _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
               }
	       else {
	          document.getElementById("idResources").innerHTML += "<br>" +
"<br>";
	       }
               document.getElementById("idRepos").innerHTML = 
                 "rhel-8-for-" + vArch + _baseos + "-e4s" + _rhui + "-rpms" + "<br>" +
                 "rhel-8-for-" + vArch + _appstream + "-e4s" + _rhui + "-rpms" + "<br>" +
                 "rhel-8-for-" + vArch + _sap_solutions + "-e4s" + _rhui + "-rpms" + "<br>" +
                 "rhel-8-for-" + vArch + _sap_netweaver + "-e4s" + _rhui + "-rpms" +
                 _haRepo;
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
                 "subscription-manager repos \\<br>" +
                 "--enable=\"" + "rhel-8-for-" + vArch + _baseos + "-e4s" + _rhui + "-rpms" + "\" \\<br>" +
                 "--enable=\"" + "rhel-8-for-" + vArch + _appstream + "-e4s" + _rhui + "-rpms" + "\" \\<br>" +
                 "--enable=\"" + "rhel-8-for-" + vArch + _sap_solutions + "-e4s" + _rhui + "-rpms" + "\" \\<br>" +
                 "--enable=\"" + "rhel-8-for-" + vArch + _sap_netweaver + "-e4s" + _rhui + "-rpms" + "\"" +
                 _haText;
               
            }
            else if (vArch == "ppc64le") {
               document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/4714781\">Red Hat KB 4714781</a> - How to subscribe to Update Services for SAP Solutions on RHEL 8" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2055470\">SAP note 2055470</a> - HANA on POWER Planning and Installation Specifics - Central Note" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2772999\">SAP note 2772999</a> - Red Hat Enterprise Linux 8.x: Installation and Configuration" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2777782\">SAP note 2777782</a> - SAP HANA DB: Recommended OS settings for RHEL 8" + "<br>";
               if (vRHEL == "8.0") {
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 SPS04 rev 45 and newer</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS04 rev 47</a>" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2055470\">Only on POWER9</a>. HANA 2.0 SPS04: <b>gcc 7</b>.<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: 4.18.0-80</a>. " +
"<a href=\"https://launchpad.support.sap.com/#/notes/2777782\">Minimum required: 4.18.0-80.15.1.el8_0.ppc64le</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends December 31, 2020</a>";
               }
               else if (vRHEL == "8.1") {
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 SPS04 rev 45 and newer</a>" + ".&nbsp;" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2378962\">Latest rev: HANA 2.0 SPS04 rev 47</a>" + "<br>" +
"<a href=\"https://launchpad.support.sap.com/#/notes/2055470\">Only on POWER9</a>. HANA 2.0 SPS04: <b>gcc 7</b>.<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: 4.18.0-147</a>. " +
"<a href=\"https://launchpad.support.sap.com/#/notes/2777782\">Minimum required: 4.18.0-147.5.1.el8_1</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends November 30, 2023</a>";
               }
               if (vHA == "HA") {
		  document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>";
                  _haRepo = "<br>" +"rhel-8-for-ppc64le-highavailability-e4s-rpms" + "<br>"; 
                  _haText = " \\<br>" + "--enable=\"" + "rhel-8-for-ppc64le-highavailability-e4s-rpms" + "\"";
               }
	       else {
	          document.getElementById("idResources").innerHTML += "<br>";
	       }
               document.getElementById("idRepos").innerHTML = 
                 "rhel-8-for-ppc64le-baseos-e4s-rpms" + "<br>" +
                 "rhel-8-for-ppc64le-appstream-e4s-rpms" + "<br>" +
                 "rhel-8-for-ppc64le-sap-solutions-e4s-rpms" + "<br>" +
                 "rhel-8-for-ppc64le-sap-netweaver-e4s-rpms" +
                 _haRepo;
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
                 "subscription-manager repos \\<br>" +
                 "--enable=\"" + "rhel-8-for-ppc64le-baseos-e4s-rpms" + "\" \\<br>" +
                 "--enable=\"" + "rhel-8-for-ppc64le-appstream-e4s-rpms" + "\" \\<br>" +
                 "--enable=\"" + "rhel-8-for-ppc64le-sap-solutions-e4s-rpms" + "\" \\<br>" +
                 "--enable=\"" + "rhel-8-for-ppc64le-sap-netweaver-e4s-rpms" + "\"" +
                 _haText;
     	    }
         }
         else if (vRHEL == "8.2") {
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2235581\">HANA 2.0 is not yet supported for RHEL " + vRHEL + "</a>" + "<br><br>";
            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
            document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: 4.18.0-193</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends April 30, 2024</a>";
     	    document.getElementById("titleRepos").innerHTML = vSAP + " is not yet supported for RHEL " + vRHEL + ".";
     	    document.getElementById("titleCommands").innerHTML = "";
     	    document.getElementById("idRepos").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
      }
   }
   else if (vSAP == "SAP NetWeaver") {
      document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
      document.getElementById("idSubscription").innerHTML = "<a href=\"https://access.redhat.com/solutions/34169\">Red Hat Enterprise Linux for SAP Applications</a> or <a href=\"https://access.redhat.com/solutions/3082481\">Red Hat Enterprise Linux for SAP Solutions</a>";
      document.getElementById("idRHEL").innerHTML = "E4S not needed for SAP NetWeaver";
      document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "(no need to run \"subscription-manager release --set=X.X\" for " + vSAP + ")";
      document.getElementById("id_ppc64le").disabled = false;
      if (vRHELmajor == "6") {
         document.getElementById("id_Cloud_on").disabled = true;
         document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/1544043\">Red Hat KB 1544043</a> - How to subscribe RHEL 6/7 system to RHEL for SAP Channel?" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/1496410\">SAP note 1496410</a> - Red Hat Enterprise Linux 6.x: Installation and Upgrade" + "<br>";
         if (vRHEL == "6.5") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-431</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not required; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         else if (vRHEL == "6.6") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-504</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not required; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         else if (vRHEL == "6.7") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-573</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not required; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         else if (vRHEL == "6.10") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-754</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not required; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         document.getElementById("id_ppc64le").disabled = true;
         if (vArch == "x86_64") {
            if (vHA == "HA") {
	       document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>";
               _haRepo = "<br>" + "rhel-ha-for-rhel-6-server-rpms" + "<br>";
               _haText = " \\<br>" + "--enable=\"" + "rhel-ha-for-rhel-6-server-rpms" + "\"";
            }
	    else {
	       document.getElementById("idResources").innerHTML += "<br>" +
"<br>" +
"<br>";
	    }
            document.getElementById("idRepos").innerHTML = 
              "rhel-6-server-rpms" + "<br>" +
              "rhel-sap-for-rhel-6-server-rpms" +
              _haRepo +
              "<br><br>";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
              "subscription-manager repos \\<br>" +
              "--enable=\"" + "rhel-6-server-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-sap-for-rhel-6-server-rpms" + "\"" +
              _haText;
         }
         else if (vArch == "ppc64le") {
     	    document.getElementById("titleRepos").innerHTML = "RHEL " + vRHELmajor + " is not supported on " + vArch + ".";
     	    document.getElementById("titleCommands").innerHTML = "";
     	    document.getElementById("idRepos").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
     	 }
         if (vArch == "ppc64") {
            if (vHA == "HA") {
	       document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>";
               _haRepo = "<br>" + "rhel-ha-for-rhel-6-for-power-rpms" + "<br>";
               _haText = " \\<br>" + "--enable=\"" + "rhel-ha-for-rhel-6-for-power-rpms" + "\"";
            }
	    else {
	       document.getElementById("idResources").innerHTML += "<br>" +
"<br>" +
"<br>";
	    }
            document.getElementById("idRepos").innerHTML = 
              "rhel-6-for-power-rpms" + "<br>" +
              "rhel-sap-for-rhel-6-for-power-rpms" +
              _haRepo +
              "<br><br>";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
              "subscription-manager repos \\<br>" +
              "--enable=\"" + "rhel-6-for-power-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-sap-for-rhel-6-for-power-rpms" + "\"" +
              _haText;
         }
         if (vArch == "s390x") {
            if (vHA == "HA") {
	       document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>";
               _haRepo = "<br>" + "rhel-ha-for-rhel-6-for-system-z-rpms" + "<br>";
               _haText = " \\<br>" + "--enable=\"" + "rhel-ha-for-rhel-6-for-system-z-rpms" + "\"";
            }
	    else {
	       document.getElementById("idResources").innerHTML += "<br>" +
"<br>" +
"<br>";
	    }
            document.getElementById("idRepos").innerHTML = 
              "rhel-6-for-system-z-rpms" + "<br>" +
              "rhel-sap-for-rhel-6-for-system-z-rpms" +
              _haRepo +
              "<br><br>";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
              "subscription-manager repos \\<br>" +
              "--enable=\"" + "rhel-6-for-system-z-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-sap-for-rhel-6-for-system-z-rpms" + "\"" +
              _haText;
         }
      }
      else if (vRHELmajor == "7") {
         document.getElementById("idResources").innerHTML = 
"<a href=\"https://access.redhat.com/solutions/1544043\">Red Hat KB 1544043</a> - How to subscribe RHEL 6/7 system to RHEL for SAP Channel?" + "<br>" + 
"<a href=\"https://launchpad.support.sap.com/#/notes/2002167\">SAP note 2002167</a> - Red Hat Enterprise Linux 7.x: Installation and Upgrade" + "<br>";
         if (vRHEL == "7.2") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-327</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for EUS ended November 30, 2017; support for E4S ended November 30, 2019</a>";
            document.getElementById("id_ppc64le").disabled = true;
         }
         else if (vRHEL == "7.3") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-514</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for EUS ended November 30, 2018; support for E4S ends November 30, 2020</a>";
         }
         else if (vRHEL == "7.4") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-693</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for EUS ended August 31, 2019; support for E4S ends August 31, 2021</a>";
         }
         else if (vRHEL == "7.5") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-862</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not available; support for EUS ends April 30, 2020</a>";
         }
         else if (vRHEL == "7.6") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-957</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for EUS ends May 31, 2021; support for E4S ends October 31, 2022</a>";
         }
         else if (vRHEL == "7.7") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1062</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for EUS ends August 30, 2021; support for E4S ends August 30, 2023</a>";
         }
         else if (vRHEL == "7.8") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1127</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Maintenance_Support_2_Phase\">E4S and EUS not available; support ends at RHEL 7.9 release date, 3QCY20</a>";
         }
         if (vCloud == "no Cloud") {
	    _rhui=""
	    _rhui1=""
	    _rhui2=""
         }
         else {
	    _rhui="rhui-"
	    _rhui1="rhui-"
	    _rhui2="rhui-eus-"
         }
         if (vArch == "x86_64") {
            if (vHA == "HA") {
	       document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>";
               _ha = "rhel-ha-for-rhel-7-" + vArch7 + "-" + _rhui2 + "rpms";
	       _haRepo = "<br>" + _ha + "<br>";
	       _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
            }
	    else {
	       document.getElementById("idResources").innerHTML += "<br>" +
"<br>" +
"<br>";
	    }
            document.getElementById("idRepos").innerHTML = 
              "rhel-7-server-" + _rhui2 + "rpms" + "<br>" +
              "rhel-sap-for-rhel-7-server-" + _rhui2 + "rpms" +
              _haRepo +
              "<br><br>";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
              "subscription-manager repos \\<br>" +
              "--enable=\"" + "rhel-7-server-" + _rhui2 + "rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-sap-for-rhel-7-server-" + _rhui2 + "rpms" + "\"" +
              _haText;
         }
         else if (vArch == "ppc64le") {
            document.getElementById("id_Cloud_on").disabled = true;
	    _rhui=""
            if (vRHEL == "7.2") {
               document.getElementById("id_ppc64le").disabled = true;
               document.getElementById("idRemarks").innerHTML = "<a href=\"https://launchpad.support.sap.com/#/notes/2002167\">NetWeaver is not supported for RHEL " + vRHEL + " on " + vArch + "</a>" + "<br><br>";
               document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
               document.getElementById("idSubscription").innerHTML = "";
               document.getElementById("titleRHEL").innerHTML = "";
               document.getElementById("idRHEL").innerHTML = "";
     	       document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + " on " + vArch + ".";
     	       document.getElementById("titleCommands").innerHTML = "";
     	       document.getElementById("idRepos").innerHTML = "";
     	       document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
     	       document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
            }
            else {
               if (vHA == "HA") {
	          document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>";
                  _ha = "rhel-ha-for-rhel-7-" + vArch7 + "-" + _rhui + "rpms";
	          _haRepo = "<br>" + _ha + "<br>";
	          _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
               }
	       else {
	          document.getElementById("idResources").innerHTML += "<br>" +
"<br>" +
"<br>";
	       }
               document.getElementById("idRepos").innerHTML = 
                 "rhel-7-for-power-le-rpms" + "<br>" +
                 "rhel-sap-for-rhel-7-for-power-le-rpms" +
                 _haRepo +
                 "<br><br>";
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
                 "subscription-manager repos \\<br>" +
                 "--enable=\"" + "rhel-7-" + vArch7 + "-rpms" + "\"  \\<br>" +
                 "--enable=\"" + "rhel-sap-for-rhel-7-" + vArch7 + "-rpms" + "\"" +
                 _haText;
            }
         }
         else if (vArch == "ppc64") {
            document.getElementById("id_Cloud_on").disabled = true;
	    _rhui=""
            if (vHA == "HA") {
	       document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>";
               _ha = "rhel-ha-for-rhel-7-" + vArch7 + "-" + _rhui + "rpms";
	       _haRepo = "<br>" + _ha + "<br>";
	       _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
            }
	    else {
	       document.getElementById("idResources").innerHTML += "<br>" +
"<br>" +
"<br>";
	    }
            document.getElementById("idRepos").innerHTML = 
              "rhel-7-" + vArch7 + "-rpms" + "<br>" +
              "rhel-sap-for-rhel-7-" + vArch7 + "-rpms" +
              _haRepo +
              "<br><br>";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
              "subscription-manager repos \\<br>" +
              "--enable=\"" + "rhel-7-" + vArch7 + "-rpms" + "\"  \\<br>" +
              "--enable=\"" + "rhel-sap-for-rhel-7-" + vArch7 + "-rpms" + "\"" +
              _haText;
         }
         else if (vArch == "s390x") {
            document.getElementById("id_Cloud_on").disabled = true;
	    _rhui=""
            if (vHA == "HA") {
	       document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>";
               _ha = "rhel-ha-for-rhel-7-" + vArch7 + "-" + _rhui + "rpms";
	       _haRepo = "<br>" + _ha + "<br>";
	       _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
            }
	    else {
	       document.getElementById("idResources").innerHTML += "<br>" +
"<br>" +
"<br>";
	    }
            document.getElementById("idRepos").innerHTML = 
              "rhel-7-" + vArch7 + "-rpms" + "<br>" +
              "rhel-sap-for-rhel-7-" + vArch7 + "-rpms" +
              _haRepo +
              "<br><br>";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
              "subscription-manager repos \\<br>" +
              "--enable=\"" + "rhel-7-" + vArch7 + "-rpms" + "\"  \\<br>" +
              "--enable=\"" + "rhel-sap-for-rhel-7-" + vArch7 + "-rpms" + "\"" +
              _haText;
         }
      }
      else if (vRHELmajor == "8") {
         document.getElementById("id_ppc64").disabled = true;
         document.getElementById("idResources").innerHTML = 
"<a href=\"https://launchpad.support.sap.com/#/notes/2772999\">SAP note 2772999</a> - Red Hat Enterprise Linux 8.x: Installation and Configuration" + "<br>";
         if (vRHEL == "8.0") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: 4.18.0-80</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for E4S ends December 31, 2020</a>";
         }
         else if (vRHEL == "8.1") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 4.18.0-147</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for EUS ends November 30, 2021; support for E4S ends November 30, 2023</a>";
         }
         else if (vRHEL == "8.2") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: 4.18.0-193</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S not required; support for EUS ends April 30, 2022; support for E4S ends April 30, 2024</a>";
         }
         _baseos="-baseos";
         _appstream="-appstream";
         _sap_netweaver="-sap-netweaver";
         if (vCloud == "no Cloud") {
	    _rhui=""
         }
         else {
	    _rhui="-eus-rhui"
         }
         if (vArch == "ppc64le") {
            document.getElementById("id_Cloud_on").disabled = true;
	    _rhui=""
         }
         else if (vArch == "ppc64") {
            document.getElementById("id_Cloud_on").disabled = true;
	    _rhui=""
     	    document.getElementById("titleRepos").innerHTML = "RHEL " + vRHELmajor + " is not supported on " + vArch + ".";
     	    document.getElementById("titleCommands").innerHTML = "";
     	    document.getElementById("idRepos").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
     	    document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
         else if (vArch == "s390x") {
            document.getElementById("id_Cloud_on").disabled = true;
	    _rhui=""
     	 }
         if (vHA == "HA") {
	    document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>" +
"<br>";
            _ha = "rhel-8-for-" + vArch + "-highavailability" + _rhui + "-rpms";
	    _haRepo = "<br>" + _ha + "<br>";
	    _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
         }
         else {
            document.getElementById("idResources").innerHTML += "<br>" +
"<br>" +
"<br>" +
"<br>";
	 }
         document.getElementById("idRepos").innerHTML = 
           "rhel-8-for-" + vArch + _baseos + _rhui + "-rpms" + "<br>" +
           "rhel-8-for-" + vArch + _appstream + _rhui + "-rpms" + "<br>" +
           "rhel-8-for-" + vArch + _sap_netweaver + _rhui + "-rpms" +
           _haRepo +
           "<br>";
         document.getElementById("idSubsriptionManagerReposEnable").innerHTML = 
           "subscription-manager repos \\<br>" +
           "--enable=\"" + "rhel-8-for-" + vArch + _baseos + _rhui + "-rpms" + "\" \\<br>" +
           "--enable=\"" + "rhel-8-for-" + vArch + _appstream + _rhui + "-rpms" + "\" \\<br>" +
           "--enable=\"" + "rhel-8-for-" + vArch + _sap_netweaver + _rhui + "-rpms" + "\"" +
           _haText;
      }
      
   }
}
