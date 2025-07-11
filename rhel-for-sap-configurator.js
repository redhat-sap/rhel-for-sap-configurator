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
// v1.5.4: SAP note 2235581 v.59; auto-select "no Cloud" in case "Cloud" is not available
//       Mon 29 Jun 2020
// v1.5.5: SAP note 2235581 v.59: HANA 2 SPS05
//       Tue 07 Jul 2020
// v1.5.6: no need to use eus for SAP NW on RHEL 7
//       Tue 08 Jul 2020
// v1.5.7: added RHEL 7.7
//       Mon 28 Jul 2020
// v1.5.8: added gcc for RHEL; changed min required due to SAP note 2812427
//       Mon 28 Jul 2020
// v1.5.9: implemented the recent changes to SAP note 2378962
//       Fri 21 Aug 2020
// v1.5.10: implemented the recent changes to SAP note 2378962
//       Wed 16 Sep 2020
// v1.5.11: implemented the recent changes to SAP note 2378962
//       Wed 07 Oct 2020
// v1.5.12: SAP HANA on RHEL 8.2 support, plus some other updates
//       Thu 28 Jan 2021
// v1.5.13: SAP note 2378962: last SPS05 is now rev 054
//       Mon 08 Feb 2021
// v1.5.14: SAP HANA on RHEL 7.9 support
//       Thu 12 Feb 2021
// v1.5.15: Added more text to 6.10 and 7.9 eus and e4s repos; fixed incorrect HANA 2 SPS04 string and remove e4s from repo names for RHEL 7.9
//       Mon 15 Feb 2021
// v1.5.16: Modified the last released HANA 2 revisions; also display compat-sap-c++-* install requirements; prepared for RHEL 8.4
//       Tue 18 May 2021
// v1.5.17: Minor fix for the correct RHEL 8.4 GA kernel
//       Tue 18 May 2021
// v1.5.18: SAP note 2378962: last SPS05 is now rev 056. Enabled the button "7.8".
//       Tue 06 Jul 2021
// v1.5.19: Improved the usage text
//       Tue 06 Jul 2021
// v1.5.20: SAP note 2235581: Support for SAP HANA on RHEL 8.4 on x86_64
//       Fri Jul 30 2021
// v1.5.21: SAP note 2378962: last SPS05 rev is now 057. Last SPS04 rev is 048.06.
//       Wed Sep  1 2021
// v1.5.22: SAP note 2235581: Support for SAP HANA on RHEL 8.4 on ppc64le; modified EOSL dates
//       Wed Sep 29 2021
// v1.5.23: SAP note 2378962: last SPS05 rev is now 058.
//       Thu Oct 14 2021
// v1.5.24: added RHEL 8.5
//       Wed Nov 10 2021
// v1.5.25: SAP note 2378962: last SPS05 rev is now 059.
//       Fri Nov 19 2021
// v1.5.26: SAP note 2378962: SPS06 rev 060 is available.
//       Mon Dec  6 2021
// v1.5.27: SAP note 2378962: last SPS05 rev is now 059.01.
//       Thu Jan 20 2022
// v1.5.28: SAP note 2378962 (new version 90): last SPS06 rev is now 061.
//       Thu Feb 16 2022
// v1.5.29: Fixed wrong HA repo names and removed some nonexistent HA repos in RHEL 6 and RHEL 7.
//       Mon Mar 21 2022
// v1.5.30: SAP note 2378962: last SPS05 rev is now 059.02.
//       Thu Mar 31 2022
// v1.5.31: SAP note 2378962: last SPS06 rev is now 062.
//       Thu May 05 2022
// v1.5.32: SAP note 2378962: last SPS05 rev is now 059.03.
//       Wed May 11 2022
// v1.5.33: Added RHEL 8.6.
//       Wed May 11 2022
// v1.5.34: Modified the kernel version for RHEL 8.6.
//       Mon May 16 2022
// v1.5.35: SAP note 2378962: last SPS06 rev is now 063, and last SPS05 rev is now 059.04.
//       Thu Jul 07 2022
// v1.5.36: Added comments about code sections; support for RHEL 8.6 x86_64
//       Mon Aug 15 2022
// v1.5.37: SAP note 2378962: last SPS06 rev is now 064.
//       Wed Aug 17 2022
// v1.5.38: Removed subscription-manager commands for last RHEL minor releases
//       Thu Sep 01 2022
// v1.5.39: SAP note 2378962: last SPS05 rev is now 059.05.
//       Fri Sep 16 2022
// v1.5.40: SAP note 2378962: last SPS06 rev is now 065.
//       Fri Oct 28 2022
// v1.5.41: SAP note 2378962: last SPS05 rev is now 059.06.
//       Thu Nov 10 2022
// v1.5.42: Added RHEL 8.7, 9.0, 9.1; support for RHEL 8.6 ppc64le; add --disable="*"
//       Mon Dec 12 2022
// v1.5.43: SAP note 2378962: last SPS06 rev is now 066.
//       Thu Dec 22 2022
// v1.5.44: SAP notes 2235581 and 3108302: SAP HANA support for RHEL 9
//       Fri Jan 27 2023
// v1.5.45: Fix compat-sap-c++ statements for HANA on RHEL 9
//       Fri Feb 17 2023
// v1.5.46: Replace "gcc" by "GCC"; some changes to variable assignments
//       Fri Feb 17 2023
// v1.5.47: SAP note 2378962: last SPS06 rev is now 067. Last SPS05 rev is now 059.07.
//       Tue Mar 21 2023
// v1.5.48: SAP note 2378962: support for HANA on RHEL 9 on ppc64le; SPS07 is out; some changes to the latest supported HANA SPS levels
//       Fri Apr 14 2023
// v1.5.49: Added RHEL 9.2.
//       Mon May 15 2023
// v1.5.50: Added RHEL 8.8.
//       Mon May 16 2023
// v1.5.51: SAP note 2378962: last SPS06 rev is 067.01.
//       Fri May 26 2023
// v1.5.52: SAP note 2378962: last HANA SPS05 rev is 59.09. Last SPS06 rev is 067.03. Last SPS07 rev is 072.
//       Fri Sep 01 2023
// v1.5.53: SAP note 2235581: support for HANA on RHEL 8.8 on x86_64 and ppc64le; introduce some dicts
//       Fri Sep 08 2023
// v1.5.54: SAP note 2378962: last HANA SPS05 rev is 59.10.
//       Wed Sep 13 2023
// v1.5.55: SAP note 2378962: last HANA SPS07 rev is 073.
//       Thu Nov 02 2023
// v1.5.56: SAP note 2378962: last HANA SPS07 rev is 074. Corrected a typo in the SPS string for SPS07.
//       Thu Nov 16 2023
// v1.5.57: SAP note 2378962: last HANA SPS05 rev is 59.11. Added RHEL 8.9 and RHEL 9.3.
//       Tue Dec 05 2023
// v1.5.58: SAP note 2235581: support for HANA on RHEL 9.2 on x86_64 and ppc64le, use me.sap.com instead of launchpad in URLs
//       Mon Dec 11 2023
// v1.6: Added selector for repo types, last HANA SPS06: 067.04.
//       Wed Dec 13 2023
// v1.6.1: Some fixes in the repo type switch handling
//       Thu Dec 14 2023
// v1.6.2: SAP note 2378962: last HANA SPS07 rev is now 075.
//       Wed Dec 20 2023
// v1.6.3: SAP note 2378962: last HANA SPS07 rev is now 076, last HANA SPS05 rev is now 059.12.
//       Thu Mar  7 2024
// v1.6.4: SAP note 2378962: last HANA SPS07 rev is now 077
//       Wed Apr  3 2024
// v1.6.5: SAP note 2378962: last HANA SPS07 rev is now 078, last HANA SPS05 rev is now 059.13.
//       Wed Jun  5 2024
// v1.6.6: Added RHEL 9.4 and RHEL 8.10.
//       Wed Jun  5 2024
// v1.6.7: SAP note 2378962: last HANA SPS07 rev is now 079, last HANA SPS05 rev is now 059.14.
//       Wed Jul 31 2024
// v1.6.8: SAP note 2235581: support for HANA on RHEL 9.4 on x86_64 and ppc64le
//       Mon Aug 26 2024
// v1.6.9: SAP note 2235581: support for HANA on RHEL 8.10 on x86_64 and ppc64le
//       Tue Sep 10 2024
// v1.6.10: SAP note 2378962: last HANA SPS07 rev is now 079.01
//       Mon Oct 21 2024
// v1.6.11: SAP note 2235581: support for HANA SPS08 on RHEL 9
//       Thu Nov 28 2024
// v1.6.12: fixed E4S description for RHEL 9.4
//       Thu Nov 28 2024
// v1.6.13: SAP note 2378962: last HANA SPS08 rev is now 081.00, last HANA SPS05 rev is now 059.15.
//       Thu Dec 12 2024
// v1.6.14: SAP note 2378962: last HANA SPS08 rev is 082.00, last HANA SPS07 rev is 079.02, last HANA SPS05 rev is now 059.16.
//       Mon Feb 10 2025
// v1.6.15: SAP note 2378962: last HANA SPS08 rev is 083.00, last HANA SPS07 rev is 079.03.
//       Mon Mar 17 2025
// v1.6.16: SAP note 2378962: last HANA SPS08 rev is 084.00, last HANA SPS05 rev is 059.17.
//       Tue Apr  1 2025
// v1.7.0: New RHEL releases 10.0 and 9.6. SAP note 2378962: last HANA SPS08 rev is 085.00, last HANA SPS07 rev is 079.04.
//       Wed May 21 2025
// v1.8.0: SAP note 2378962: last HANA SPS07 rev is 079.05.
//       Thu Jun 12 2025
// v1.9.0: SAP note 2378962: last HANA SPS05 rev is 059.18.
//       Wed Jun 18 2025
// v1.9.1: Bug fix for wrong link to SAP note 3108302
//       Wed Jul  9 2025
// v1.10.0: SAP note 2378962: last HANA SPS08 rev is 086.00.
//       Wed Jul  9 2025

function displaySelections() { // used for debugging
   var elem = document.getElementsByName('sapSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked)
     document.getElementById("result1").innerHTML = "SAP: "+elem[i].value;
   }
   elem = document.getElementsByName('archSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked)
     document.getElementById("result2").innerHTML = "Arch: "+elem[i].value;
   }
   elem = document.getElementsByName('rhelSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked)
     document.getElementById("result3").innerHTML = "RHEL: "+elem[i].value;
   }
   elem = document.getElementsByName('haSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked)
     document.getElementById("result4").innerHTML = "HA: "+elem[i].value;
   }
   elem = document.getElementsByName('repoTypeSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked)
     document.getElementById("result5").innerHTML = "Repo Type: "+elem[i].value;
   }
   elem = document.getElementsByName('cloudSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked)
     document.getElementById("result6").innerHTML = "Cloud: "+elem[i].value;
   }
}

function displayResults() {
   disable_all_repos_before_enabling = "--disable=\"*\" \\</br>";
   _haRepo = "<br><br>";
   _haText = "<br><br>";
   _baseos="-baseos";
   _appstream="-appstream";
   _sap_solutions="-sap-solutions";
   _sap_netweaver="-sap-netweaver";
   rhel_for_sap_solutions_subscription = {
      "x86_64": "Red Hat Enterprise Linux for SAP Solutions",
      "ppc64le": "Red Hat Enterprise Linux for SAP Solutions for Power, LE"
   };
   last_hana2_sps03 = "HANA 2.0 SPS03 rev 37.07";
   last_hana2_sps04 = "HANA 2.0 SPS04 rev 48.06";
   last_hana2_sps05 = "HANA 2.0 SPS05 rev 59.18";
   last_hana2_sps06 = "HANA 2.0 SPS06 rev 67.04";
   last_hana2_sps07 = "HANA 2.0 SPS07 rev 79.05";
   last_hana2_sps08 = "HANA 2.0 SPS08 rev 86.00";
   e4s_80 = "E4S available";
   e4s_81 = "E4S available";
   e4s_82 = "E4S available";
   e4s_83 = "E4S not available";
   e4s_84 = "E4S available";
   e4s_85 = "E4S not available";
   e4s_86 = "E4S available";
   e4s_87 = "E4S not available";
   e4s_88 = "E4S available";
   e4s_89 = "E4S not available";
   e4s_810 = "E4S not available and not required";
   e4s_90 = "E4S available";
   e4s_91 = "E4S not available";
   e4s_92 = "E4S available";
   e4s_93 = "E4S not available";
   e4s_94 = "E4S available";
   e4s_95 = "E4S not available";
   e4s_96 = "E4S available";
   e4s_100 = "E4S available";
   end_of_support_80 = "December 31, 2020";
   end_of_support_81 = "November 30, 2023";
   end_of_support_82 = "April 30, 2024";
   end_of_support_83 = "April 30, 2021";
   end_of_support_84 = "May 31, 2025";
   end_of_support_85 = "April 30, 2022";
   end_of_support_86 = "May 31, 2026";
   end_of_support_87 = "April 30, 2023";
   end_of_support_88 = "May 31, 2027";
   end_of_support_89 = "April 30, 2024";
   end_of_support_810 = "May 31, 2029";
   end_of_support_90 = "May 31, 2026";
   end_of_support_91 = "April 30, 2023";
   end_of_support_92 = "May 31, 2027";
   end_of_support_93 = "April 30, 2024";
   end_of_support_94 = "April 30, 2028";
   end_of_support_95 = "April 30, 2025";
   end_of_support_96 = "May 31, 2029";
   end_of_support_100 = "May 31, 2029";
   rhel_kernel = {
      "8.0": {
         "gcc": "8",
         "initial_version": "4.18.0-80",
         "end_of_support": "December 31, 2020",
         "support": "ended",
         "e4s": "available",
         "min_version_for_hana": {
            "x86_64": "4.18.0-80",
            "ppc64le": "4.18.0-80.15.1.el8_0"
         }
      },
      "8.1": {
         "gcc": "8",
         "initial_version": "4.18.0-147",
         "end_of_support": "November 30, 2023",
         "support": "ends",
         "e4s": "available",
         "min_version_for_hana": {
            "x86_64": "4.18.0-147.5.1.el8_1",
            "ppc64le": "4.18.0-147.5.1.el8_1"
         }
      },
      "8.2": {
         "gcc": "8",
         "initial_version": "4.18.0-193",
         "end_of_support": "April 30, 2024",
         "support": "ended",
         "e4s": "available",
         "min_version_for_hana": {
            "x86_64": "4.18.0-193.40.1.el8_2",
            "ppc64le": "4.18.0-193.40.1.el8_2"
         }
      },
      "8.3": {
         "gcc": "8",
         "initial_version": "4.18.0-240",
         "end_of_support": "April 30, 2021",
         "support": "ended",
         "e4s": "not available",
         "min_version_for_hana": {
            "x86_64": "N/A",
            "ppc64le": "N/A"
         }
      },
      "8.4": {
         "gcc": "8",
         "initial_version": "4.18.0-305",
         "end_of_support": "May 31, 2025",
         "support": "ends",
         "e4s": "available",
         "min_version_for_hana": {
            "x86_64": "4.18.0-305.3.1.el8_4",
            "ppc64le": "4.18.0-305.17.1.el8_4"
         }
      },
      "8.5": {
         "gcc": "8",
         "initial_version": "4.18.0-348",
         "end_of_support": "April 30, 2022",
         "support": "ended",
         "e4s": "not available",
         "min_version_for_hana": {
            "x86_64": "N/A",
            "ppc64le": "N/A"
         }
      },
      "8.6": {
         "gcc": "8",
         "initial_version": "4.18.0-372.9.1",
         "end_of_support": "May 31, 2026",
         "support": "ends",
         "e4s": "available",
         "min_version_for_hana": {
            "x86_64": "4.18.0-372.9.1.el8",
            "ppc64le": "4.18.0-372.32.1.el8_6"
         }
      },
      "8.7": {
         "gcc": "8",
         "initial_version": "4.18.0-425.3.1",
         "end_of_support": "April 30, 2023",
         "support": "ended",
         "e4s": "not available",
         "min_version_for_hana": {
            "x86_64": "N/A",
            "ppc64le": "N/A"
         }
      },
      "8.8": {
         "gcc": "8",
         "initial_version": "4.18.0-477.10.1.el8_8",
         "end_of_support": "May 31, 2027",
         "support": "ends",
         "e4s": "available",
         "min_version_for_hana": {
            "x86_64": "4.18.0-477.13.1.el8_8",
            "ppc64le": "4.18.0-477.13.1.el8_8"
         }
      },
      "8.9": {
         "gcc": "8",
         "initial_version": "4.18.0-513.5.1.el8_9",
         "end_of_support": "April 30, 2024",
         "support": "ended",
         "e4s": "not available",
         "min_version_for_hana": {
            "x86_64": "N/A",
            "ppc64le": "N/A"
         }
      },
      "8.10": {
         "gcc": "8",
         "initial_version": "4.18.0-553.el8_10",
         "end_of_support": "May 31, 2029",
         "support": "ends",
         "e4s": "not available",
         "min_version_for_hana": {
            "x86_64": "4.18.0-553.16.1.el8_10",
            "ppc64le": "4.18.0-553.16.1.el8_10"
         }
      },
      "9.0": {
         "gcc": "11",
         "initial_version": "5.14.0-70.13.1.el9_0",
         "end_of_support": "May 31, 2026",
         "support": "ends",
         "e4s": "available",
         "min_version_for_hana": {
            "x86_64": "5.14.0-70.22.1.el9_0",
            "ppc64le": "5.14.0-70.43.1.el9_0"
         }
      },
      "9.1": {
         "gcc": "11",
         "initial_version": "5.14.0-162.6.1.el9_1",
         "end_of_support": "April 30, 2023",
         "support": "ended",
         "e4s": "not available",
         "min_version_for_hana": {
            "x86_64": "N/A",
            "ppc64le": "N/A"
         }
      },
      "9.2": {
         "gcc": "11",
         "initial_version": "5.14.0-284.11.1.el9_2",
         "end_of_support": "May 31, 2027",
         "support": "ends",
         "e4s": "available",
         "min_version_for_hana": {
            "x86_64": "5.14.0-284.25.1.el9_2",
            "ppc64le": "5.14.0-284.25.1.el9_2"
         }
      },
      "9.3": {
         "gcc": "11",
         "initial_version": "5.14.0-362.8.1.el9_3",
         "end_of_support": "April 30, 2024",
         "support": "ended",
         "e4s": "not available",
         "min_version_for_hana": {
            "x86_64": "N/A",
            "ppc64le": "N/A"
         }
      },
      "9.4": {
         "gcc": "11",
         "initial_version": "5.14.0-427.13.1.el9_4",
         "end_of_support": "April 30, 2028",
         "support": "ends",
         "e4s": "available",
         "min_version_for_hana": {
            "x86_64": "5.14.0-427.16.1.el9_4",
            "ppc64le": "5.14.0-427.16.1.el9_4"
         }
      },
      "9.5": {
         "gcc": "11",
         "initial_version": "5.14.0-503.11.1.el9_5",
         "end_of_support": "April 30, 2025",
         "support": "ends",
         "e4s": "not available",
         "min_version_for_hana": {
            "x86_64": "N/A",
            "ppc64le": "N/A"
         }
      },
      "9.6": {
         "gcc": "11",
         "initial_version": "5.14.0-570.12.1.el9_6",
         "end_of_support": "May 31, 2029",
         "support": "ends",
         "e4s": "available",
         "min_version_for_hana": {
            "x86_64": "N/A",
            "ppc64le": "N/A"
         }
      },
      "10.0": {
         "gcc": "14",
         "initial_version": "6.12.0-55.9.1.el10_0",
         "end_of_support": "May 31, 2029",
         "support": "ends",
         "e4s": "available",
         "min_version_for_hana": {
            "x86_64": "N/A",
            "ppc64le": "N/A"
         }
      }
   };
   gcc5_compat_sap_req = "<a href=\"https://me.sap.com/notes/2338763\">GCC 5</a> ---&gt; <a href=\"https://me.sap.com/notes/3057467\">Install compat-sap-c++-5</a>";
   gcc6_compat_sap_req = "<a href=\"https://me.sap.com/notes/2455582\">GCC 6</a> ---&gt; <a href=\"https://me.sap.com/notes/3057467\">Install compat-sap-c++-6</a>";
   gcc7_compat_sap_req = "<a href=\"https://me.sap.com/notes/2593824\">GCC 7</a> ---&gt; <a href=\"https://me.sap.com/notes/3057467\">Install compat-sap-c++-7</a>";
   gcc7_compat_sap_not_req = "<a href=\"https://me.sap.com/notes/2593824\">GCC 7</a> ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No compat-sap-c++* required</a>";
   gcc9_compat_sap_req = "<a href=\"https://me.sap.com/notes/2886607\">GCC 9</a> ---&gt; <a href=\"https://me.sap.com/notes/3057467\">Install compat-sap-c++-9</a>";
   gcc9_compat_sap_not_req = "<a href=\"https://me.sap.com/notes/2886607\">GCC 9</a> ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No compat-sap-c++-* required</a>";
   gcc10_compat_sap_req = "<a href=\"https://me.sap.com/notes/3018133\">GCC 10</a> ---&gt; <a href=\"https://me.sap.com/notes/3057467\">Install compat-sap-c++-10</a>";
   gcc10_compat_sap_not_req = "<a href=\"https://me.sap.com/notes/3018133\">GCC 10</a> ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No compat-sap-c++-* required</a>";
   gcc11_compat_sap_req = "<a href=\"https://me.sap.com/notes/3216146\">GCC 11</a> ---&gt; <a href=\"https://me.sap.com/notes/3057467\">Install compat-sap-c++-11</a>";
   gcc11_compat_sap_not_req = "<a href=\"https://me.sap.com/notes/3216146\">GCC 11</a> ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No compat-sap-c++-* required</a>";
   gcc13_compat_sap_req = "<a href=\"https://me.sap.com/notes/3449186\">GCC 13</a> ---&gt; <a href=\"https://me.sap.com/notes/3057467\">Install compat-sap-c++-13</a>";
   gcc13_compat_sap_not_req = "<a href=\"https://me.sap.com/notes/3449186\">GCC 13</a> ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No compat-sap-c++-* required</a>";
//   getArchIndex()
//   getRHELIndex()
//   getSAPIndex()
//   getHAIndex()
//   vSAP=document.getElementById("sapSelect").value;
   var elem = document.getElementsByName('sapSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked) vSAP=elem[i].value;
   }
   elem = document.getElementsByName('archSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked) vArch=elem[i].value;
   }
   if (typeof vArch === 'undefined') return;
   if (vArch == "x86_64") {vArch7 = "server"}
   else if (vArch == "ppc64le") {vArch7 = "for-power-le"}
   else if (vArch == "ppc64") {vArch7 = "for-power"}
   else if (vArch == "s390x") {vArch7 = "for-system-z"}
//  alert ("vArch = " + vArch + "; vArch7 = " + vArch7);
   elem = document.getElementsByName('rhelSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked) vRHEL=elem[i].value;
   }
   var vRHELmajor = vRHEL.split(".")[0];
//  alert ("vRHELmajor = " + vRHELmajor);
   elem = document.getElementsByName('haSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked) vHA=elem[i].value;
   }
   elem = document.getElementsByName('repoTypeSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked) vRepoType=elem[i].value;
   }
//   alert ("vRepoType = " + vRepoType);
   elem = document.getElementsByName('cloudSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked) vCloud=elem[i].value;
   }
   elem = document.getElementsByName('disableSelect');
   for(i = 0; i < elem.length; i++) {
     if(elem[i].checked) vDisable=elem[i].value;
   }
//   vArch=document.getElementById("archSelect").value;
//   vRHEL=document.getElementById("rhelSelect").value;
//   vHA=document.getElementById("haSelect").value;
   document.getElementById("idRemarks").innerHTML = "<br><br>";
   document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
   document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
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
   document.getElementById("id_83").disabled = false;
   document.getElementById("id_84").disabled = false;
   document.getElementById("id_85").disabled = false;
   document.getElementById("id_86").disabled = false;
   document.getElementById("id_87").disabled = false;
   document.getElementById("id_88").disabled = false;
   document.getElementById("id_89").disabled = false;
   document.getElementById("id_810").disabled = false;
   document.getElementById("id_90").disabled = false;
   document.getElementById("id_91").disabled = false;
   document.getElementById("id_92").disabled = false;
   document.getElementById("id_93").disabled = false;
   document.getElementById("id_94").disabled = false;
   document.getElementById("id_95").disabled = false;
   document.getElementById("id_96").disabled = false;
   document.getElementById("id_100").disabled = false;
   document.getElementById("id_Cloud_on").disabled = false;
   if (vArch == "ppc64le") {
      document.getElementById("id_72").disabled = true;
      document.getElementById("id_Cloud_on").disabled = true;
      document.getElementById("id_Cloud_off").checked = true;
   }
   if (vSAP == "SAP HANA 1.0") {
// HANA 1.0
//      document.getElementById("id_Repo_type_e4s").checked = true;
//      document.getElementById("id_Repo_type_eus").checked = false;
//      document.getElementById("id_Repo_type_normal").checked = false;
      document.getElementById("id_ppc64").disabled = true;
      document.getElementById("id_ppc64le").disabled = true;
      document.getElementById("id_s390x").disabled = true;
      document.getElementById("id_x86_64").checked = true;
      document.getElementById("id_80").disabled = true;
      document.getElementById("id_81").disabled = true;
      document.getElementById("id_82").disabled = true;
      document.getElementById("id_83").disabled = true;
      document.getElementById("id_84").disabled = true;
      document.getElementById("id_85").disabled = true;
      document.getElementById("id_86").disabled = true;
      document.getElementById("id_87").disabled = true;
      document.getElementById("id_88").disabled = true;
      document.getElementById("id_89").disabled = true;
      document.getElementById("id_810").disabled = true;
      document.getElementById("id_90").disabled = true;
      document.getElementById("id_91").disabled = true;
      document.getElementById("id_92").disabled = true;
      document.getElementById("id_93").disabled = true;
      document.getElementById("id_94").disabled = true;
      document.getElementById("id_95").disabled = true;
      document.getElementById("id_96").disabled = true;
      document.getElementById("id_100").disabled = true;
      if (vRHELmajor == "6") {
// HANA 1.0 RHEL 6.x
         document.getElementById("id_Cloud_on").disabled = true;
         document.getElementById("id_Cloud_off").checked = true;
         document.getElementById("idSubscription").innerHTML = "<a href=\"https://access.redhat.com/solutions/3082481\">" + rhel_for_sap_solutions_subscription[vArch] + "</a>";
         document.getElementById("idSubsriptionManagerReleaseSet").innerHTML =
         "subscription-manager release --set=" + vRHEL;
         if (vRHEL == "6.5") {
// HANA 1.0 RHEL 6.5
            document.getElementById("idResources").innerHTML =
"<a href=\"https://access.redhat.com/solutions/1544043\">Red Hat KB 1544043</a> - How to subscribe RHEL 6/7 system to RHEL for SAP Channel?" + "<br>" +
"<a href=\"https://me.sap.com/notes/1496410\">SAP note 1496410</a> - Red Hat Enterprise Linux 6.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://me.sap.com/notes/2013638\">SAP note 2013638</a> - SAP HANA DB: Recommended OS settings for RHEL 6.5" + "<br>";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 1.0 up to SPS11</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2021789\">Latest rev: HANA 1.0 SPS11 rev 112.07</a>." + "<br>" +
"HANA 1.0 <b>SPS11</b>: GCC version unknown. <a href=\"https://me.sap.com/notes/3057467\">No package compat-sap-c++-* required.</a><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.4</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-431</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not available; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         if (vRHEL == "6.6") {
// HANA 1.0 RHEL 6.6
            document.getElementById("idResources").innerHTML =
"<a href=\"https://access.redhat.com/solutions/1544043\">Red Hat KB 1544043</a> - How to subscribe RHEL 6/7 system to RHEL for SAP Channel?" + "<br>" +
"<a href=\"https://me.sap.com/notes/1496410\">SAP note 1496410</a> - Red Hat Enterprise Linux 6.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://me.sap.com/notes/2136965\">SAP note 2136965</a> - SAP HANA DB: Recommended OS settings for RHEL 6.6" + "<br>";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 1.0 up to SPS11</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2021789\">Latest rev: HANA 1.0 SPS11 rev 112.07</a>." + "<br>" +
"HANA 1.0 <b>SPS11</b>: GCC version unknown. <a href=\"https://me.sap.com/notes/3057467\">No package compat-sap-c++-* required.</a><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.4</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-504</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not available; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         if (vRHEL == "6.7") {
// HANA 1.0 RHEL 6.7
            document.getElementById("idResources").innerHTML =
"<a href=\"https://access.redhat.com/solutions/1544043\">Red Hat KB 1544043</a> - How to subscribe RHEL 6/7 system to RHEL for SAP Channel?" + "<br>" +
"<a href=\"https://me.sap.com/notes/1496410\">SAP note 1496410</a> - Red Hat Enterprise Linux 6.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://me.sap.com/notes/2247020\">SAP note 2247020</a> - SAP HANA DB: Recommended OS settings for RHEL 6.7" + "<br>";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 1.0 SPS11 and newer</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.35</a>." + "<br>" +
"HANA 1.0 <b>SPS12</b>: GCC 4 ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No package compat-sap-c++-* required.</a><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.4</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-573</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not available; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         if (vRHEL == "6.10") {
// HANA 1.0 RHEL 6.10
            document.getElementById("idResources").innerHTML =
"<a href=\"https://access.redhat.com/solutions/1544043\">Red Hat KB 1544043</a> - How to subscribe RHEL 6/7 system to RHEL for SAP Channel?" + "<br>" +
"<a href=\"https://me.sap.com/notes/1496410\">SAP note 1496410</a> - Red Hat Enterprise Linux 6.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://me.sap.com/notes/2694292\">SAP note 2694292</a> - SAP HANA DB: Recommended OS settings for RHEL 6.10" + "<br>";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 1.0 SPS12 rev 122.23 and newer</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.35</a>." + "<br>" +
"HANA 1.0 <b>SPS12</b>: GCC 4 ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No package compat-sap-c++-* required.</a><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.4</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-754</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S and EUS not available and not required; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
         }
         if (vDisable == "yes") {
            _disableRepoText = disable_all_repos_before_enabling;
         }
         else {
            _disableRepoText = "";
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
           "subscription-manager repos \\<br>" + _disableRepoText +
           "--enable=\"" + "rhel-6-server-rpms" + "\" \\<br>" +
           "--enable=\"" + "rhel-sap-hana-for-rhel-6-server-rpms" + "\"" + "<br>" +
           "--enable=\"" + "rhel-scalefs-for-rhel-6-server-rpms" + "\"" +
           _haText;
      }
      else if (vRHELmajor == "7") {
// HANA 1.0 RHEL 7.x
         _exs="e4s";
         document.getElementById("idResources").innerHTML =
"<a href=\"https://access.redhat.com/solutions/3075991\">Red Hat KB 3075991</a> - How to subscribe SAP HANA systems to the Update Services for SAP Solutions" + "<br>" +
"<a href=\"https://me.sap.com/notes/2002167\">SAP note 2002167</a> - Red Hat Enterprise Linux 7.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://me.sap.com/notes/2292690\">SAP note 2292690</a> - SAP HANA DB: Recommended OS settings for RHEL 7" + "<br>"
         document.getElementById("idSubscription").innerHTML = "<a href=\"https://access.redhat.com/solutions/3082481\">" + rhel_for_sap_solutions_subscription[vArch] + "</a>";
         document.getElementById("idSubsriptionManagerReleaseSet").innerHTML =
         "subscription-manager release --set=" + vRHEL;
         if (vRHEL == "7.2") {
// HANA 1.0 RHEL 7.2
            document.getElementById("id_Repo_type_e4s").disabled = false;
            document.getElementById("id_Repo_type_eus").disabled = false;
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            vCloud = "no Cloud";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 1.0 SPS12</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.35</a>." + "<br>" +
"HANA 1.0 <b>SPS12</b>: GCC 4 ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No package compat-sap-c++-* required.</a><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-327</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S available; support for EUS ended November 30, 2017; support for E4S ended November 30, 2019</a>";
         }
         else if (vRHEL == "7.3") {
// HANA 1.0 RHEL 7.3
            document.getElementById("id_Repo_type_e4s").disabled = false;
            document.getElementById("id_Repo_type_eus").disabled = false;
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            vCloud = "no Cloud";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 1.0 SPS12</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.35</a>." + "<br>" +
"HANA 1.0 <b>SPS12</b>: GCC 4 ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No package compat-sap-c++-* required.</a><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-327</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S available; support for EUS ended November 30, 2017; support for E4S ended November 30, 2019</a>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-514</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ended November 30, 2020</a>";
         }
         else if (vRHEL == "7.4") {
// HANA 1.0 RHEL 7.4
            document.getElementById("id_Repo_type_e4s").disabled = false;
            document.getElementById("id_Repo_type_eus").disabled = false;
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 1.0 SPS12 rev 122.14 and newer</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.35</a>." + "<br>" +
"HANA 1.0 <b>SPS12</b>: GCC 4 ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No package compat-sap-c++-* required.</a><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-693</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ended August 31, 2021</a>";
         }
         else if (vRHEL == "7.5") {
// HANA 1.0 RHEL 7.5
            _exs="eus";
            document.getElementById("id_Repo_type_e4s").disabled = true;
//            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 1.0 SPS12 rev 122.19 and newer</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.35</a>." + "<br>" +
"HANA 1.0 <b>SPS12</b>: GCC 4 ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No package compat-sap-c++-* required.</a><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-862</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not available; support for EUS ended April 30, 2020</a>";
         }
         else if (vRHEL == "7.6") {
// HANA 1.0 RHEL 7.6
            _exs="eus";
            _exs="e4s";
            document.getElementById("id_Repo_type_e4s").disabled = false;
            document.getElementById("id_Repo_type_eus").disabled = false;
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 1.0 SPS12 rev 122.23 and newer</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.35</a>." + "<br>" +
"HANA 1.0 <b>SPS12</b>: GCC 4 ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No package compat-sap-c++-* required.</a><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-957</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends October 31, 2022</a>";
         }
         else if (vRHEL == "7.7") {
// HANA 1.0 RHEL 7.7
            document.getElementById("id_Repo_type_e4s").disabled = false;
            document.getElementById("id_Repo_type_eus").disabled = false;
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            vCloud = "no Cloud";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 1.0 SPS12 rev 122.30 and newer</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.35</a>." + "<br>" +
"HANA 1.0 <b>SPS12</b>: GCC 4 ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No package compat-sap-c++-* required.</a><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1062</a>. " +
"<a href=\"https://me.sap.com/notes/2292690\">Minimum required: 3.10.0-1062.21.1</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends August 30, 2023</a>";
         }
         else if (vRHEL == "7.9") {
// HANA 1.0 RHEL 7.9
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            vCloud = "no Cloud";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 1.0 SPS12 rev 122.33 and newer</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2021789\">Latest rev: HANA 1.0 SPS12 rev 122.35</a>." + "<br>" +
"HANA 1.0 <b>SPS12</b>: GCC 4 ---&gt; <a href=\"https://me.sap.com/notes/3057467\">No package compat-sap-c++-* required.</a><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1160</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S and EUS not available and not required; end of Maintenance Support June 30, 2024; end of Extended Life-cycle Support TBD</a>";
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
         }
         if (vDisable == "yes") {
            _disableRepoText = disable_all_repos_before_enabling;
         }
         else {
            _disableRepoText = "";
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
            _ha = "rhel-ha-for-rhel-7-server-" + _exs + _rhui + "-rpms";
            if (vRHEL == "7.9") {
               _ha = "rhel-ha-for-rhel-7-server" + _rhui + "-rpms" + _rhui_ext;
            }
            _haRepo = "<br>" + _ha + "<br>";
            _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
         }
         else {
            document.getElementById("idResources").innerHTML +=
"<br>" +
"<br>";
         }
         if (vCloud == "no Cloud") {
            document.getElementById("idRepos").innerHTML =
              "rhel-7-server-" + _exs + "-rpms" + "<br>" +
              "rhel-sap-hana-for-rhel-7-server-" + _exs + "-rpms" +
              _haRepo +
              "<br><br>";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
              "subscription-manager repos \\<br>" + _disableRepoText +
              "--enable=\"" + "rhel-7-server-" + _exs + "-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-sap-hana-for-rhel-7-server-" + _exs + "-rpms" + "\"" +
              _haText;
            if (vRHEL == "7.9") {
               document.getElementById("idRepos").innerHTML =
                 "rhel-7-server-rpms" + "<br>" +
                 "rhel-sap-hana-for-rhel-7-server-rpms" +
                 _haRepo +
                 "<br><br>";
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
                 "subscription-manager repos \\<br>" + _disableRepoText +
                 "--enable=\"" + "rhel-7-server-rpms" + "\" \\<br>" +
                 "--enable=\"" + "rhel-sap-hana-for-rhel-7-server-rpms" + "\"" +
                 _haText;
            }
         }
         else {
            if (vRHEL == "7.5") {
// HANA 1.0 RHEL 7.5, cloud
               document.getElementById("id_Repo_type_e4s").disabled = true;
//               document.getElementById("id_Repo_type_normal").checked = true;
               document.getElementById("idRepos").innerHTML =
                 "rhel-7-server" + _rhui + "-eus-rpms" + "<br>" +
                 "rhel-7-server" + _rhui + "-eus-optional-rpms" + "<br>" +
                 "rhel-7-server" + _rhui + "-eus-supplementary-rpms" + "<br>" +
                 "rhel-sap-for-rhel-7-server-eus"  + _rhui + "-rpms" + "<br>" +
                 "rhel-sap-hana-for-rhel-7-server-eus" + _rhui + "-rpms" +
                 _haRepo;
               document.getElementById("titleCommands").innerHTML = "";
               document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
            }
// HANA 1.0 RHEL 7.4 or 7.6, cloud
            else { // vRHEL == "7.4" OR vRHEL == "7.6"
               document.getElementById("idRepos").innerHTML =
                 "rhel-7-server-e4s" + _rhui + "-rpms" + "<br>" +
                 "rhel-7-server-e4s-optional" + _rhui + "-rpms" + "<br>" +
//               "rhel-7-server-e4s-supplementary" + _rhui + "-rpms" + "<br>" +
                 "rhel-sap-for-rhel-7-server" + _rhui + "-e4s-rpms" + "<br>" +
                 "rhel-sap-hana-for-rhel-7-server" + _rhui + "-e4s-rpms" +
                 _haRepo;
               document.getElementById("titleCommands").innerHTML = "";
               document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
            }
         }
         if (vRHEL == "7.8") {
// HANA 1.0 RHEL 7.8, cloud
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 1.0 is not supported for RHEL " + vRHEL + "</a>" + "<br><br>";
            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
            document.getElementById("idSubscription").innerHTML = "";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1127</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Maintenance_Support_2_Phase\">E4S and EUS not available; support ended at RHEL 7.9 release date, 3QCY20</a>";
            document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + ".";
            document.getElementById("titleCommands").innerHTML = "";
            document.getElementById("idRepos").innerHTML = "";
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
      }
   }
   else if (vSAP == "SAP HANA 2.0") {
// HANA 2.0
//      document.getElementById("id_Repo_type_e4s").checked = true;
//      document.getElementById("id_Repo_type_eus").checked = false;
//      document.getElementById("id_Repo_type_normal").checked = false;
      document.getElementById("id_ppc64").disabled = true;
      document.getElementById("id_s390x").disabled = true;
      document.getElementById("id_65").disabled = true;
      document.getElementById("id_66").disabled = true;
      document.getElementById("id_67").disabled = true;
      document.getElementById("id_610").disabled = true;
      if (vArch == "ppc64" || vArch == "s390x") {
         document.getElementById("titleRepos").innerHTML = vSAP + " is not supported on " + vArch + ".";
         document.getElementById("titleCommands").innerHTML = "";
         document.getElementById("idSubscription").innerHTML = "";
         document.getElementById("idRepos").innerHTML = "";
         document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
         document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
      }
      else {
         if (vRepoType != "-e4s" && vRepoType != "-eus") {
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "(check with \"subscription-manager release\" to confirm that the release lock is unset)";
         }
         else {
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "subscription-manager release --set=" + vRHEL;
         }
// HANA 2.0 RHEL 6.5, 6.6, 6.7, 6.10:
         if (vRHEL == "6.5" ||
             vRHEL == "6.6" ||
             vRHEL == "6.7" ||
             vRHEL == "6.10") {
            document.getElementById("id_ppc64le").disabled = true;
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 is not supported for RHEL " + vRHEL + "</a>" + "<br><br>";
            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
            document.getElementById("idSubscription").innerHTML = "";
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
                  vRHEL == "7.6" ||
                  vRHEL == "7.7" ||
                  vRHEL == "7.9") {
            document.getElementById("id_Repo_type_e4s").disabled = false;
            document.getElementById("id_Repo_type_eus").disabled = false;
// HANA 2.0 RHEL 7.2, 7.3, 7.4, 7.6, 7.7, 7.9
            document.getElementById("idRHEL").innerHTML = "E4S available";
            document.getElementById("idSubscription").innerHTML = "<a href=\"https://access.redhat.com/solutions/3082481\">" + rhel_for_sap_solutions_subscription[vArch] + "</a>";
            if (vArch == "x86_64") {
               document.getElementById("idResources").innerHTML =
"<a href=\"https://access.redhat.com/solutions/3075991\">Red Hat KB 3075991</a> - How to subscribe SAP HANA systems to the Update Services for SAP Solutions" + "<br>" +
"<a href=\"https://me.sap.com/notes/2002167\">SAP note 2002167</a> - Red Hat Enterprise Linux 7.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://me.sap.com/notes/2292690\">SAP note 2292690</a> - SAP HANA DB: Recommended OS settings for RHEL 7" + "<br>";
// HANA 2.0 x86_64 RHEL 7
               if (vRHEL == "7.2") {
// HANA 2.0 x86_64 RHEL 7.2
                  document.getElementById("id_Cloud_on").disabled = true;
                  document.getElementById("id_Cloud_off").checked = true;
                  vCloud = "no Cloud";
                  _rhui_ext = "";
                  document.getElementById("id_ppc64le").disabled = true;
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 up to HANA 2.0 SPS03</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps03 + "</a>." + "<br>" +
"HANA 2.0 <b>SPS01</b>: " + gcc5_compat_sap_req + ". <b>SPS02</b> and <b>SPS03</b>: " + gcc6_compat_sap_req + ".<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-327</a>. " +
"<a href=\"https://me.sap.com/notes/2292690\">Minimum required: 3.10.0-327.62.4.el7</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ended November 30, 2019</a>";
               }
               else if (vRHEL == "7.3") {
// HANA 2.0 x86_64 RHEL 7.3
                  document.getElementById("id_Cloud_on").disabled = true;
                  document.getElementById("id_Cloud_off").checked = true;
                  vCloud = "no Cloud";
                  _rhui_ext = "";
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS02 rev 21 and newer, up to HANA 2.0 SPS03</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps03 + "</a>." + "<br>" +
"HANA 2.0 <b>SPS02</b> and <b>SPS03</b>: " + gcc6_compat_sap_req + ".<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-514</a>. " +
"<a href=\"https://me.sap.com/notes/2292690\">Minimum required: 3.10.0-514.36.5.el7</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ended November 30, 2020</a>";
               }
               else if (vRHEL == "7.4") {
// HANA 2.0 x86_64 RHEL 7.4
                  if (vCloud == "no Cloud") {
                     _rhui_ext = "";
                  }
  else {
                     _rhui_ext = "";
//               _rhui_ext = "__7_DOT_4__x86_64";
                  }
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS02 rev 23 and newer, up to HANA 2.0 SPS04</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps04 + "</a>." + "<br>" +
"HANA 2.0 <b>SPS02</b> and <b>SPS03</b>: " + gcc6_compat_sap_req + ". <b>SPS04</b>: " + gcc7_compat_sap_req + ".<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-693</a>. " +
"<a href=\"https://me.sap.com/notes/2812427\">Minimum required: 3.10.0-693.58.1</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ended August 31, 2021</a>";
               }
               else if (vRHEL == "7.6") {
// HANA 2.0 x86_64 RHEL 7.6
                  if (vCloud == "no Cloud") {
                     _rhui_ext = "";
                  }
                  else {
                     _rhui_ext = "";
//                     _rhui_ext = "__7_DOT_6__x86_64";
                  }
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS03 rev 36 and newer, up to HANA 2.0 SPS05</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps05 + "</a>." + "<br>" +
"HANA 2.0 <b>SPS03</b>: " + gcc6_compat_sap_req + ". <b>SPS04</b>: " + gcc7_compat_sap_req + ". <b>SPS05</b>: " + gcc9_compat_sap_req + ".<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-957</a>. " +
"<a href=\"https://me.sap.com/notes/2812427\">Minimum required: 3.10.0-957.35.1</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends October 31, 2022</a>";
               }
               else if (vRHEL == "7.7") {
// HANA 2.0 x86_64 RHEL 7.7
                  document.getElementById("id_Cloud_on").disabled = true;
                  document.getElementById("id_Cloud_off").checked = true;
  vCloud = "no Cloud";
  _rhui_ext = "";
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS04 rev 48 and newer, up to HANA 2.0 SPS05</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps05 + "</a>." + "<br>" +
"HANA 2.0 <b>SPS04</b>: " + gcc7_compat_sap_req + ". <b>SPS05</b>: " + gcc9_compat_sap_req + ".<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1062</a>. " +
"<a href=\"https://me.sap.com/notes/2292690\">Minimum required: 3.10.0-1062.21.1</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends August 30, 2023</a>";
               }
               else if (vRHEL == "7.9") {
// HANA 2.0 x86_64 RHEL 7.9 part 1
                  document.getElementById("id_Repo_type_e4s").disabled = true;
                  document.getElementById("id_Repo_type_eus").disabled = true;
                  document.getElementById("id_Repo_type_normal").checked = true;
                  document.getElementById("id_Cloud_on").disabled = true;
                  document.getElementById("id_Cloud_off").checked = true;
  vCloud = "no Cloud";
  _rhui_ext = "";
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05 only, starting with rev 54</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps05 + "</a>." + "<br>" +
"HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_req + ".<br>";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1160</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S and EUS not available and not required; end of Maintenance Support June 30, 2024; end of Extended Life-cycle Support TBD</a>";
                  document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
               }
               if (vDisable == "yes") {
                  _disableRepoText = disable_all_repos_before_enabling;
               }
               else {
                  _disableRepoText = "";
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
                  _ha = "rhel-ha-for-rhel-7-server" + vRepoType + _rhui + "-rpms" + _rhui_ext;
                  if (vRHEL == "7.9") {
                     _ha = "rhel-ha-for-rhel-7-server" + _rhui + "-rpms" + _rhui_ext;
                  }
                  _haRepo = "<br>" + _ha + "<br>";
                  _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
               }
               else {
                  document.getElementById("idResources").innerHTML +=
"<br>" +
"<br>";
               }
               if (vCloud == "no Cloud") {
                  document.getElementById("idRepos").innerHTML =
                    "rhel-7-server" + vRepoType + "-rpms" + "<br>" +
                    "rhel-sap-hana-for-rhel-7-server" + vRepoType + "-rpms" +
                    _haRepo +
                    "<br><br>";
                  document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
                    "subscription-manager repos \\<br>" + _disableRepoText +
                    "--enable=\"" + "rhel-7-server" + vRepoType + "-rpms" + "\" \\<br>" +
                    "--enable=\"" + "rhel-sap-hana-for-rhel-7-server" + vRepoType + "-rpms" + "\"" +
                    _haText;
                  if (vRHEL == "7.9") {
                     document.getElementById("idRepos").innerHTML =
                       "rhel-7-server-rpms" + "<br>" +
                       "rhel-sap-hana-for-rhel-7-server-rpms" +
                       _haRepo +
                       "<br><br>";
                     document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
                       "subscription-manager repos \\<br>" + _disableRepoText +
                       "--enable=\"" + "rhel-7-server-rpms" + "\" \\<br>" +
                       "--enable=\"" + "rhel-sap-hana-for-rhel-7-server-rpms" + "\"" +
                       _haText;
                  }
               }
               else {
                  document.getElementById("idRepos").innerHTML =
                  "rhel-7-server" + vRepoType + _rhui + "-rpms" + "<br>" +
                  "rhel-7-server" + vRepoType + "-optional" + _rhui + "-rpms" + "<br>" +
//                 "rhel-7-server-e4s-supplementary" + _rhui + "-rpms" + "<br>" +
                  "rhel-sap-for-rhel-7-server" + _rhui + vRepoType + "-rpms" + "<br>" +
                  "rhel-sap-hana-for-rhel-7-server" + _rhui + vRepoType + "-rpms" +
                  _haRepo;
                  document.getElementById("titleCommands").innerHTML = "";
                  document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
                  document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
               }
            }
            else if (vArch == "ppc64le") {
// HANA 2.0 ppc64le RHEL 7
               document.getElementById("idResources").innerHTML =
"<a href=\"https://access.redhat.com/solutions/3075991\">Red Hat KB 3075991</a> - How to subscribe SAP HANA systems to the Update Services for SAP Solutions" + "<br>" +
"<a href=\"https://me.sap.com/notes/2055470\">SAP note 2055470</a> - HANA on POWER Planning and Installation Specifics - Central Note" + "<br>" +
"<a href=\"https://me.sap.com/notes/2002167\">SAP note 2002167</a> - Red Hat Enterprise Linux 7.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://me.sap.com/notes/2292690\">SAP note 2292690</a> - SAP HANA DB: Recommended OS settings for RHEL 7" + "<br>";
               if (vRHEL == "7.2") {
// HANA 2.0 ppc64le RHEL 7.2
                  document.getElementById("id_ppc64le").disabled = true;
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 is not supported for RHEL " + vRHEL + " on " + vArch + "</a>" + "<br><br>";
                  document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
                  document.getElementById("idSubscription").innerHTML = "";
                  document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-327</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ended November 30, 2019</a>";
                  document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + " on " + vArch + ".";
                  document.getElementById("titleCommands").innerHTML = "";
                  document.getElementById("idRepos").innerHTML = "";
                  document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
                  document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
               }
               else {
                  if (vRHEL == "7.3") {
// HANA 2.0 ppc64le RHEL 7.3
                     document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS02 rev 21 and newer, up to HANA 2.0 SPS03</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps03 + "</a>." + "<br>" +
"<a href=\"https://me.sap.com/notes/2055470\">Only on POWER8</a>. " +
"HANA 2.0 <b>SPS02</b> and <b>SPS03</b>: " + gcc6_compat_sap_req + ".<br>";
                     document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-514</a>. " +
"<a href=\"https://me.sap.com/notes/2292690\">Minimum required: 3.10.0-514.36.5.el7</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ended November 30, 2020</a>";
                  }
                  else if (vRHEL == "7.4") {
// HANA 2.0 ppc64le RHEL 7.4
                     document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS02 rev 23 and newer, up to HANA 2.0 SPS04</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps04 + "</a>." + "<br>" +
"<a href=\"https://me.sap.com/notes/2055470\">Only on POWER8</a>. " +
"HANA 2.0 <b>SPS02</b> and <b>SPS03</b>: " + gcc6_compat_sap_req + ". <b>SPS04</b>: " + gcc7_compat_sap_req + ".<br>";
                     document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-693</a>. " +
"<a href=\"https://me.sap.com/notes/2812427\">Minimum required: 3.10.0-693.58.1</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ended August 31, 2021</a>";
                  }
                  else if (vRHEL == "7.6") {
// HANA 2.0 ppc64le RHEL 7.6
                     document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS03 rev 36 and newer, up to HANA 2.0 SPS05</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps05 + "</a>." + "<br>" +
"<a href=\"https://me.sap.com/notes/2055470\">Only on POWER8</a>. " +
"HANA 2.0 <b>SPS03</b>: " + gcc6_compat_sap_req + ". <b>SPS04</b>: " + gcc7_compat_sap_req + ". <b>SPS05</b>: " + gcc9_compat_sap_req + ".<br>";
                     document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-957</a>. " +
"<a href=\"https://me.sap.com/notes/2812427\">Minimum required: 3.10.0-957.35.1</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends October 31, 2022</a>";
                  }
                  else if (vRHEL == "7.7") {
// HANA 2.0 ppc64le RHEL 7.7
                     document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS04 rev 48 and newer, up to HANA 2.0 SPS05</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps05 + "</a>." + "<br>" +
"<a href=\"https://me.sap.com/notes/2055470\">Only on POWER8</a>. " +
"HANA 2.0 <b>SPS04</b>: " + gcc7_compat_sap_req + ". <b>SPS05</b>: " + gcc9_compat_sap_req + ".<br>";
                     document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1062</a>. " +
"<a href=\"https://me.sap.com/notes/2292690\">Minimum required: 3.10.0-1062.26.1</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S available; support ends August 30, 2023</a>";
                  }
                  else if (vRHEL == "7.9") {
// HANA 2.0 ppc64le RHEL 7.9 part 1
                     document.getElementById("id_Repo_type_e4s").disabled = true;
                     document.getElementById("id_Repo_type_eus").disabled = true;
                     document.getElementById("id_Repo_type_normal").checked = true;
                     document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05 only, starting with rev 54</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps05 + "</a>." + "<br>" +
"<a href=\"https://me.sap.com/notes/2055470\">Only on POWER8</a>. " +
"HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_req + ".<br>";
                     document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1160</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S and EUS not available and not required; end of Maintenance Support June 30, 2024; end of Extended Life-cycle Support TBD</a>";
                  }
                  if (vDisable == "yes") {
                     _disableRepoText = disable_all_repos_before_enabling;
                  }
                  else {
                     _disableRepoText = "";
                  }
                  if (vHA == "HA") {
                     document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>";
                     _haRepo = "<br>" + "rhel-ha-for-rhel-7-server-for-power-le" + vRepoType + "-rpms" + "<br>";
                     _haText = " \\<br>" + "--enable=\"" + "rhel-ha-for-rhel-7-server-for-power-le" + vRepoType + "-rpms" + "\"";
                     if (vRHEL == "7.9") {
                        _haRepo = "<br>" + "rhel-ha-for-rhel-7-server-for-power-le-rpms" + "<br>";
                        _haText = " \\<br>" + "--enable=\"" + "rhel-ha-for-rhel-7-server-for-power-le-rpms" + "\"";
                     }
                  }
                  else {
                     document.getElementById("idResources").innerHTML +=
"<br>";
                  }
                  document.getElementById("idRepos").innerHTML =
                    "rhel-7-for-power-le" + vRepoType + "-rpms" + "<br>" +
                    "rhel-sap-hana-for-rhel-7-for-power-le" + vRepoType + "-rpms" +
                    _haRepo +
                    "<br><br>";
                  document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
                    "subscription-manager repos \\<br>" + _disableRepoText +
                    "--enable=\"" + "rhel-7-for-power-le" + vRepoType + "-rpms" + "\"  \\<br>" +
                    "--enable=\"" + "rhel-sap-hana-for-rhel-7-for-power-le" + vRepoType + "-rpms" + "\"" +
                    _haText;
                  if (vRHEL == "7.9") {
// HANA 2.0 ppc64le RHEL 7.9 part 2
                     document.getElementById("idRepos").innerHTML =
                       "rhel-7-for-power-le-rpms" + "<br>" +
                       "rhel-sap-hana-for-rhel-7-for-power-le-rpms" +
                       _haRepo +
                       "<br><br>";
                     document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
                       "subscription-manager repos \\<br>" + _disableRepoText +
                       "--enable=\"" + "rhel-7-for-power-le-rpms" + "\" \\<br>" +
                       "--enable=\"" + "rhel-sap-hana-for-rhel-7-for-power-le-rpms" + "\"" +
                       _haText;
                  }
               }
            }
         }
         else if (vRHEL == "7.5") {
// HANA 2.0 RHEL 7.5
            _exs="eus";
            document.getElementById("id_Repo_type_e4s").disabled = true;
//            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("idResources").innerHTML =
"<a href=\"https://access.redhat.com/solutions/3075991\">Red Hat KB 3075991</a> - How to subscribe SAP HANA systems to the Update Services for SAP Solutions" + "<br>" +
"<a href=\"https://me.sap.com/notes/2002167\">SAP note 2002167</a> - Red Hat Enterprise Linux 7.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://me.sap.com/notes/2292690\">SAP note 2292690</a> - SAP HANA DB: Recommended OS settings for RHEL 7" + "<br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-862</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not available; support for EUS ended April 30, 2020</a>";
            if (vArch == "x86_64") {
// HANA 2.0 x86_64 RHEL 7.5
               document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS03 only, starting with rev 32</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps03 + "</a>." + "<br>" +
"HANA 2.0 <b>SPS03</b>: " + gcc6_compat_sap_req + ".<br>";
               if (vDisable == "yes") {
                  _disableRepoText = disable_all_repos_before_enabling;
               }
               else {
                  _disableRepoText = "";
               }
               if (vCloud == "no Cloud") {
                  _rhui="";
                  _rhui_ext = "";
               }
               else {
                  _rhui="-rhui";
                  _rhui_ext = "";
//                  _rhui_ext = "__7_DOT_5__x86_64";
               }
               if (vHA == "HA") {
                  document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>";
                  _ha = "rhel-ha-for-rhel-7-server-" + _exs + _rhui + "-rpms";
                  _haRepo = "<br>" + _ha + "<br>";
                  _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
               }
               else {
                  document.getElementById("idResources").innerHTML +=
"<br>" +
"<br>";
               }
          if (vCloud == "no Cloud") {
                  document.getElementById("idRepos").innerHTML =
                    "rhel-7-server-eus-rpms" + "<br>" +
                    "rhel-sap-hana-for-rhel-7-server-eus-rpms" +
                    _haRepo +
                    "<br><br>";
                  document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
                    "subscription-manager repos \\<br>" + _disableRepoText +
                    "--enable=\"" + "rhel-7-server-eus-rpms" + "\" \\<br>" +
                    "--enable=\"" + "rhel-sap-hana-for-rhel-7-server-eus-rpms" + "\"" +
                    _haText;
                  }
          else {
             document.getElementById("titleCommands").innerHTML = "";
             document.getElementById("idRepos").innerHTML =
                "rhel-7-server" + _rhui + "-eus-rpms" + "<br>" +
                "rhel-7-server" + _rhui + "-eus-optional-rpms" + "<br>" +
                "rhel-7-server" + _rhui + "-eus-supplementary-rpms" + "<br>" +
                "rhel-sap-for-rhel-7-server-eus"  + _rhui + "-rpms" + "<br>" +
                "rhel-sap-hana-for-rhel-7-server-eus" + _rhui + "-rpms" +
                _haRepo;
                document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
                document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
               }
            }
            else if (vArch == "ppc64le") {
// HANA 2.0 ppc64le RHEL 7.5
               document.getElementById("idResources").innerHTML =
"<a href=\"https://access.redhat.com/solutions/3075991\">Red Hat KB 3075991</a> - How to subscribe SAP HANA systems to the Update Services for SAP Solutions" + "<br>" +
"<a href=\"https://me.sap.com/notes/2055470\">SAP note 2055470</a> - HANA on POWER Planning and Installation Specifics - Central Note" + "<br>" +
"<a href=\"https://me.sap.com/notes/2002167\">SAP note 2002167</a> - Red Hat Enterprise Linux 7.x: Installation and Upgrade" + "<br>" +
"<a href=\"https://me.sap.com/notes/2292690\">SAP note 2292690</a> - SAP HANA DB: Recommended OS settings for RHEL 7" + "<br>";
               document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS03 only, starting with rev 32</a>" + ".&nbsp;" +
"<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps03 + "</a>." + "<br>" +
"<a href=\"https://me.sap.com/notes/2055470\">Only on POWER8</a>. " +
"HANA 2.0 <b>SPS03</b>: " + gcc6_compat_sap_req + ".<br>";
               if (vDisable == "yes") {
                  _disableRepoText = disable_all_repos_before_enabling;
               }
               else {
                  _disableRepoText = "";
               }
               if (vHA == "HA") {
                  document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>";
                  _haRepo = "<br>" + "rhel-ha-for-rhel-7-server-for-power-le" + vRepoType + "-rpms" + "<br>";
                  _haText = " \\<br>" + "--enable=\"" + "rhel-ha-for-rhel-7-server-for-power-le" + vRepoType + "-rpms" + "\"";
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
                 "subscription-manager repos \\<br>" + _disableRepoText +
                 "--enable=\"" + "rhel-7-for-power-le-rpms" + "\" \\<br>" +
                 "--enable=\"" + "rhel-sap-hana-for-rhel-7-for-power-le-rpms" + "\"" +
                 _haText;
            }
         }
         else if (vRHEL == "7.8") {
// HANA 2.0 RHEL 7.8
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            vCloud = "no Cloud";
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 is not supported for RHEL " + vRHEL + "</a>" + "<br><br>";
            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
            document.getElementById("idSubscription").innerHTML = "";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1127</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Maintenance_Support_2_Phase\">E4S and EUS not available; support ended at RHEL 7.9 release date, 3QCY20</a>";
            document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + ".";
            document.getElementById("titleCommands").innerHTML = "";
            document.getElementById("idRepos").innerHTML = "";
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
         else if (vRHEL == "8.0" ||
                  vRHEL == "8.1" ||
                  vRHEL == "8.2" ||
                  vRHEL == "8.4" ||
                  vRHEL == "8.6" ||
                  vRHEL == "8.8" ||
                  vRHEL == "8.10") {
// HANA 2.0 RHEL 8.0, 8.1, 8.2, 8.4, 8.6, 8.8, 8.10
            document.getElementById("id_Repo_type_e4s").disabled = false;
            document.getElementById("id_Repo_type_eus").disabled = false;
            document.getElementById("idResources").innerHTML =
              "<a href=\"https://access.redhat.com/solutions/4714781\">Red Hat KB 4714781</a> - How to subscribe to Update Services for SAP Solutions on RHEL 8 and RHEL 9" + "<br>" +
              "<a href=\"https://me.sap.com/notes/2772999\">SAP note 2772999</a> - Red Hat Enterprise Linux 8.x: Installation and Configuration" + "<br>" +
              "<a href=\"https://me.sap.com/notes/2777782\">SAP note 2777782</a> - SAP HANA DB: Recommended OS settings for RHEL 8" + "<br>";
            document.getElementById("id_ppc64").disabled = true;
            document.getElementById("idSubscription").innerHTML = "<a href=\"https://access.redhat.com/solutions/3082481\">" + rhel_for_sap_solutions_subscription[vArch] + "</a>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC " +
              rhel_kernel[vRHEL].gcc +
              "</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " +
              rhel_kernel[vRHEL].initial_version + "</a>. " +
              "<a href=\"https://me.sap.com/notes/2777782\">Minimum required: " +
              rhel_kernel[vRHEL].min_version_for_hana[vArch] + "</a>. " +
              "<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S " +
              rhel_kernel[vRHEL].e4s + "; support " +
              rhel_kernel[vRHEL].support + " " +
              rhel_kernel[vRHEL].end_of_support + "</a>";
            if (vDisable == "yes") {
               _disableRepoText = disable_all_repos_before_enabling;
            }
            else {
               _disableRepoText = "";
            }
            if (vCloud == "no Cloud") {
               _rhui=""
               _rhui_ext = "";
            }
            else {
               _rhui="-rhui"
               _rhui_ext = "";
//               _rhui_ext = "-" + vRHEL;
            }
            if (vHA == "HA") {
               _ha = "rhel-" + vRHELmajor + "-for-" + vArch + "-highavailability" + vRepoType + _rhui + "-rpms" + _rhui_ext;
               _haRepo = "<br>" + _ha + "<br>";
               _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
            }
            document.getElementById("idRepos").innerHTML =
              "rhel-" + vRHELmajor + "-for-" + vArch + _baseos + vRepoType + "-rpms" + "<br>" +
              "rhel-" + vRHELmajor + "-for-" + vArch + _appstream + vRepoType + "-rpms" + "<br>" +
              "rhel-" + vRHELmajor + "-for-" + vArch + _sap_solutions + vRepoType + "-rpms" + "<br>" +
              "rhel-" + vRHELmajor + "-for-" + vArch + _sap_netweaver + vRepoType + "-rpms" +
              _haRepo;
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
              "subscription-manager repos \\<br>" + _disableRepoText +
              "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _baseos + vRepoType + "-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _appstream + vRepoType + "-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _sap_solutions + vRepoType + "-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _sap_netweaver + vRepoType + "-rpms" + "\"" +
              _haText;
            if (vArch == "x86_64") {
// HANA 2.0 x86_64 RHEL 8
               if (vDisable == "yes") {
                  _disableRepoText = disable_all_repos_before_enabling;
               }
               else {
                  _disableRepoText = "";
               }
               if (vRHEL == "8.0") {
// HANA 2.0 x86_64 RHEL 8.0
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS04 only, starting with rev 40</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps04 + "</a>." + "<br>" +
                    "HANA 2.0 <b>SPS04</b>: " + gcc7_compat_sap_not_req + ".<br>";
               }
               else if (vRHEL == "8.1") {
// HANA 2.0 x86_64 RHEL 8.1
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS04 rev 45 and newer, up to and including SPS06</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps06 + "</a>." + "<br>" +
                    "HANA 2.0 <b>SPS04</b>: " + gcc7_compat_sap_not_req + ". <b>SPS05</b>: " + gcc9_compat_sap_req + ". <b>SPS06</b>: " + gcc10_compat_sap_req + ".<br>";
               }
               else if (vRHEL == "8.2") {
// HANA 2.0 x86_64 RHEL 8.2
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS04 rev 48.02 and newer and SPS05 rev 52 and newer, up to and including SPS06</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps06 + "</a>." + "<br>" +
                    "HANA 2.0 <b>SPS04</b>: " + gcc7_compat_sap_not_req + ". <b>SPS05</b>: " + gcc9_compat_sap_req + ". <b>SPS06</b>: " + gcc10_compat_sap_req + ".<br>";
               }
               else if (vRHEL == "8.4") {
// HANA 2.0 x86_64 RHEL 8.4
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05 rev 55 and newer</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps07 + "</a>." + "<br>" +
                    "HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_req + ". <b>SPS06</b>: " + gcc10_compat_sap_req + ". <b>SPS07</b>: " + gcc11_compat_sap_req + ".<br>";
               }
               else if (vRHEL == "8.6") {
// HANA 2.0 x86_64 RHEL 8.6
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05 rev 59.02 and newer and SPS06 rev 63 and newer</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps07 + "</a>." + "<br>" +
                    "HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_req + ". <b>SPS06</b>: " + gcc10_compat_sap_req + ". <b>SPS07</b>: " + gcc11_compat_sap_req + ".<br>";
               }
               else if (vRHEL == "8.8") {
// HANA 2.0 x86_64 RHEL 8.8
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05 rev 59.08 and newer and SPS06 rev 67.01 and newer</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps07 + "</a>." + "<br>" +
                    "HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_req + ". <b>SPS06</b>: " + gcc10_compat_sap_req + ". <b>SPS07</b>: " + gcc11_compat_sap_req + ".<br>";
               }
               else if (vRHEL == "8.10") {
                  document.getElementById("id_Repo_type_e4s").disabled = true;
                  document.getElementById("id_Repo_type_eus").disabled = true;
                  document.getElementById("id_Repo_type_normal").checked = true;
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05: rev 59.12 and newer and SPS07: rev 77 and newer</a>" + ".&nbsp;" +
                       "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps07 + "</a>." + "<br>" +
                       "HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_req + ". <b>SPS07</b>: " + gcc11_compat_sap_req + ". <br>";
               }
               if (vHA == "HA") {
                  document.getElementById("idResources").innerHTML +=
                    "<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>";
               }
               else {
                  document.getElementById("idResources").innerHTML += "<br>" +
"<br>";
               }
               if (vCloud == "Cloud") {
                  document.getElementById("titleCommands").innerHTML = "";
                  document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
                  document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
               }
            }
            else if (vArch == "ppc64le") {
// HANA 2.0 ppc64le
               document.getElementById("idResources").innerHTML =
                 "<a href=\"https://access.redhat.com/solutions/4714781\">Red Hat KB 4714781</a> - How to subscribe to Update Services for SAP Solutions on RHEL 8 and RHEL 9" + "<br>" +
                 "<a href=\"https://me.sap.com/notes/2055470\">SAP note 2055470</a> - HANA on POWER Planning and Installation Specifics - Central Note" + "<br>" +
                 "<a href=\"https://me.sap.com/notes/2772999\">SAP note 2772999</a> - Red Hat Enterprise Linux 8.x: Installation and Configuration" + "<br>" +
                 "<a href=\"https://me.sap.com/notes/2777782\">SAP note 2777782</a> - SAP HANA DB: Recommended OS settings for RHEL 8" + "<br>";
               if (vRHEL == "8.0") {
// HANA 2.0 ppc64le RHEL 8.0
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS04 only, starting with rev 45</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps04 + "</a>." + "<br>" +
                    "<a href=\"https://me.sap.com/notes/2055470\">Only on POWER9</a>. " +
                    "HANA 2.0 <b>SPS04</b>: " + gcc7_compat_sap_not_req + ".<br>";
               }
               else if (vRHEL == "8.1") {
// HANA 2.0 ppc64le RHEL 8.1
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS04 rev 45 and newer, up to and including SPS06</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps06 + "</a>." + "<br>" +
                    "<a href=\"https://me.sap.com/notes/2055470\">Only on POWER9</a>. " +
                    "HANA 2.0 <b>SPS04</b>: " + gcc7_compat_sap_not_req + ". <b>SPS05</b>: " + gcc9_compat_sap_req + ". <b>SPS06</b>: " + gcc10_compat_sap_req + ".<br>";
               }
               else if (vRHEL == "8.2") {
// HANA 2.0 ppc64le RHEL 8.2
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS04 rev 48.02 and newer and SPS05 rev 52 and newer, up to and including SPS06</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps06 + "</a>." + "<br>" +
                    "<a href=\"https://me.sap.com/notes/2055470\">Only on POWER9</a>. " +
                    "HANA 2.0 <b>SPS04</b>: " + gcc7_compat_sap_not_req + ". <b>SPS05</b>: " + gcc9_compat_sap_req + ". <b>SPS06</b>: " + gcc10_compat_sap_req + ".<br>";
               }
               else if (vRHEL == "8.4") {
// HANA 2.0 ppc64le RHEL 8.4
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05 rev 55 and newer</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps07 + "</a>." + "<br>" +
                    "<a href=\"https://me.sap.com/notes/2055470\">Only on POWER9 and Power10</a>. " +
                    "HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_req + ". <b>SPS06</b>: " + gcc10_compat_sap_req + ". <b>SPS07</b>: " + gcc11_compat_sap_req + ".<br>";
               }
               else if (vRHEL == "8.6") {
// HANA 2.0 ppc64le RHEL 8.6
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05 rev 59.02 and newer and SPS06 rev 63 and newer</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps07 + "</a>." + "<br>" +
                    "<a href=\"https://me.sap.com/notes/2055470\">Only on POWER9 and Power10</a>. " +
                    "HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_req + ". <b>SPS06</b>: " + gcc10_compat_sap_req + ". <b>SPS07</b>: " + gcc11_compat_sap_req + ".<br>";
               }
               else if (vRHEL == "8.8") {
// HANA 2.0 ppc64le RHEL 8.8
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05 rev 59.08 and newer and SPS06 rev 67.01 and newer</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps07 + "</a>." + "<br>" +
                    "HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_req + ". <b>SPS06</b>: " + gcc10_compat_sap_req + ". <b>SPS07</b>: " + gcc11_compat_sap_req + ".<br>";
               }
               else if (vRHEL == "8.10") {
                  document.getElementById("id_Repo_type_e4s").disabled = true;
                  document.getElementById("id_Repo_type_eus").disabled = true;
                  document.getElementById("id_Repo_type_normal").checked = true;
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05: rev 59.12 and newer and SPS07: rev 77 and newer</a>" + ".&nbsp;" +
                       "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps07 + "</a>." + "<br>" +
                       "HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_req + ". <b>SPS07</b>: " + gcc11_compat_sap_req + ". <br>";
               }
               if (vHA == "HA") {
                  document.getElementById("idResources").innerHTML +=
                    "<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>";
               }
               else {
                  document.getElementById("idResources").innerHTML += "<br>";
               }
//               document.getElementById("idRepos").innerHTML =
//                 "rhel-" + vRHELmajor + "-for-" + vArch + _baseos + vRepoType + "-rpms" + "<br>" +
//                 "rhel-" + vRHELmajor + "-for-" + vArch + _appstream + vRepoType + "-rpms" + "<br>" +
//                 "rhel-" + vRHELmajor + "-for-" + vArch + _sap_solutions + vRepoType + "-rpms" + "<br>" +
//                 "rhel-" + vRHELmajor + "-for-" + vArch + _sap_netweaver + vRepoType + "-rpms" +
//                 _haRepo;
//               document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
//                 "subscription-manager repos \\<br>" + _disableRepoText +
//                 "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _baseos + vRepoType + "-rpms" + "\" \\<br>" +
//                 "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _appstream + vRepoType + "-rpms" + "\" \\<br>" +
//                 "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _sap_solutions + vRepoType + "-rpms" + "\" \\<br>" +
//                 "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _sap_netweaver + vRepoType + "-rpms" + "\"" +
//                 _haText;
            }
         }
// HANA 2.0 RHEL 8.8 x86_64 and ppc64le
//         else if (vRHEL == "8.8") {
//            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel_88 + "</a>. " +
//"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">" + e4s_88 + "; support ends " + end_of_support_88 + "</a>";
//            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
//            document.getElementById("idSubscription").innerHTML = "";
//            document.getElementById("titleRHEL").innerHTML = "RHEL " + vRHEL + ": ";
//            document.getElementById("titleRepos").innerHTML = vSAP + " is not yet supported for RHEL " + vRHEL + ".";
//            document.getElementById("idRepos").innerHTML = "";
//            document.getElementById("titleCommands").innerHTML = "";
//            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
//            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
//         }
         else if (vRHEL == "8.3" || vRHEL == "8.5" || vRHEL == "8.7" || vRHEL == "8.9") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
// HANA 2.0 RHEL 8.3, 8.5, 8.7, 8.9
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 is not supported for RHEL " + vRHEL + "</a>" + "<br><br>";
            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
            document.getElementById("idSubscription").innerHTML = "";
            if (vRHEL == "8.3") {
               document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">" + e4s_83 + "; support ended " + end_of_support_83 + "</a>";
            }
            else if (vRHEL == "8.5") {
               document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">" + e4s_85 + "; support ended " + end_of_support_85 + "</a>";
            }
            else if (vRHEL == "8.7") {
               document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">" + e4s_87 + "; support ends " + end_of_support_87 + "</a>";
            }
            else if (vRHEL == "8.9") {
               document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">" + e4s_89 + "; support ends " + end_of_support_89 + "</a>";
            }
            document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + ".";
            document.getElementById("titleCommands").innerHTML = "";
            document.getElementById("idRepos").innerHTML = "";
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
         else if (vRHEL == "9.0" ||
                  vRHEL == "9.2" ||
                  vRHEL == "9.4") {
            document.getElementById("id_Repo_type_e4s").disabled = false;
            document.getElementById("id_Repo_type_eus").disabled = false;
// HANA 2.0 RHEL 9.0
            if (vRHEL == "9.0") {
               if (vArch == "x86_64") {
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05 from rev 59.04, SPS06 from rev 63, and SPS07 from rev 70</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps07 + "</a>." + "<br>" +
                    "HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_not_req + ". <b>SPS06</b>: " + gcc10_compat_sap_not_req + ". <b>SPS07</b>: " + gcc11_compat_sap_not_req + ".<br>";
               }
               else if (vArch == "ppc64le") {
                  document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05 from rev 59.08, SPS06 from rev 67.01, and SPS07 from rev 70</a>" + ".&nbsp;" +
                    "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps07 + "</a>." + "<br>" +
                    "HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_not_req + ". <b>SPS06</b>: " + gcc10_compat_sap_not_req + ". <b>SPS07</b>: " + gcc11_compat_sap_not_req + ".<br>";
               }
            }
// HANA 2.0 RHEL 9.2
            else if (vRHEL == "9.2") {
               document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05 from rev 59.09, SPS06 from rev 67.02, SPS07 from rev 72, and SPS08 from rev 80</a>" + ".&nbsp;" +
                 "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps08 + "</a>." + "<br>" +
                 "HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_not_req + ". <b>SPS06</b>: " + gcc10_compat_sap_not_req + ". <b>SPS07</b>: " + gcc11_compat_sap_not_req + ". <b>SPS08</b>: " + gcc13_compat_sap_req + ".<br>";
            }
// HANA 2.0 RHEL 9.4
            else if (vRHEL == "9.4") {
               document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 SPS05 from rev 59.12, SPS07 from rev 77, and SPS08 from rev 80</a>" + ".&nbsp;" +
                 "<a href=\"https://me.sap.com/notes/2378962\">Latest rev: " + last_hana2_sps08 + "</a>." + "<br>" +
                 "HANA 2.0 <b>SPS05</b>: " + gcc9_compat_sap_not_req + ". <b>SPS07</b>: " + gcc11_compat_sap_not_req + ". <b>SPS08</b>: " + gcc13_compat_sap_req + ".<br>";
            }
// HANA 2.0 RHEL 9.0 + RHEL 9.2 + RHEL 9.4
            document.getElementById("idSubscription").innerHTML = "<a href=\"https://access.redhat.com/solutions/3082481\">" + rhel_for_sap_solutions_subscription[vArch] + "</a>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC " +
              rhel_kernel[vRHEL].gcc +
              "</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL9\">Kernel Version: " +
              rhel_kernel[vRHEL].initial_version + "</a>. " +
              "<a href=\"https://me.sap.com/notes/2777782\">Minimum required: " +
              rhel_kernel[vRHEL].min_version_for_hana[vArch] + "</a>. " +
              "<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S " +
              rhel_kernel[vRHEL].e4s + "; support " +
              rhel_kernel[vRHEL].support + " " +
              rhel_kernel[vRHEL].end_of_support + "</a>";
            if (vCloud == "no Cloud") {
               _rhui=""
               _rhui_ext = "";
            }
            else {
               _rhui="-rhui"
               _rhui_ext = "";
//               _rhui_ext = "-" + vRHEL;
            }
            if (vHA == "HA") {
               _ha = "rhel-" + vRHELmajor + "-for-" + vArch + "-highavailability" + vRepoType + _rhui + "-rpms" + _rhui_ext;
               _haRepo = "<br>" + _ha + "<br>";
               _haText = " \\<br>" + "--enable=\"" + _ha + "\"";
            }
            if (vDisable == "yes") {
               _disableRepoText = disable_all_repos_before_enabling;
            }
            else {
               _disableRepoText = "";
            }
            if (vArch == "x86_64") {
               document.getElementById("idResources").innerHTML =
                 "<a href=\"https://access.redhat.com/solutions/4714781\">Red Hat KB 4714781</a> - How to subscribe to Update Services for SAP Solutions on RHEL 8 and RHEL 9" + "<br>" +
                 "<a href=\"https://me.sap.com/notes/3108316\">SAP note 3108316</a> - Red Hat Enterprise Linux 9.x: Installation and Configuration" + "<br>" +
                 "<a href=\"https://me.sap.com/notes/3108302\">SAP note 3108302</a> - SAP HANA DB: Recommended OS settings for RHEL 9" + "<br>";
               if (vHA == "HA") {
                  document.getElementById("idResources").innerHTML +=
                    "<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" +
                    "<br>" +
                    "<br>";
               }
               else {
                  document.getElementById("idResources").innerHTML += "<br>" +
                 "<br>";
               }
            }
            else if (vArch == "ppc64le") {
               document.getElementById("idResources").innerHTML =
                 "<a href=\"https://access.redhat.com/solutions/4714781\">Red Hat KB 4714781</a> - How to subscribe to Update Services for SAP Solutions on RHEL 8 and RHEL 9" + "<br>" +
                 "<a href=\"https://me.sap.com/notes/2055470\">SAP note 2055470</a> - HANA on POWER Planning and Installation Specifics - Central Note" + "<br>" +
                 "<a href=\"https://me.sap.com/notes/3108316\">SAP note 3108316</a> - Red Hat Enterprise Linux 9.x: Installation and Configuration" + "<br>" +
                 "<a href=\"https://me.sap.com/notes/3108302\">SAP note 3108302</a> - SAP HANA DB: Recommended OS settings for RHEL 9" + "<br>";
               if (vHA == "HA") {
                  document.getElementById("idResources").innerHTML +=
                 "<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" +
                 "<br>";
               }
               else {
                  document.getElementById("idResources").innerHTML += "<br>";
               }
            }
            document.getElementById("idRepos").innerHTML =
              "rhel-" + vRHELmajor + "-for-" + vArch + _baseos + vRepoType + _rhui + "-rpms" + "<br>" +
              "rhel-" + vRHELmajor + "-for-" + vArch + _appstream + vRepoType + _rhui + "-rpms" + "<br>" +
              "rhel-" + vRHELmajor + "-for-" + vArch + _sap_solutions + vRepoType + _rhui + "-rpms" + "<br>" +
              "rhel-" + vRHELmajor + "-for-" + vArch + _sap_netweaver + vRepoType + _rhui + "-rpms" +
              _haRepo;
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
              "subscription-manager repos \\<br>" + _disableRepoText +
              "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _baseos + vRepoType + _rhui + "-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _appstream + vRepoType + _rhui + "-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _sap_solutions + vRepoType + _rhui + "-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _sap_netweaver + vRepoType + _rhui + "-rpms" + "\"" +
              _haText;
         }
// HANA 2.0 RHEL 9.6 not yet supported
         else if (vRHEL == "9.6") {
            document.getElementById("id_Repo_type_e4s").disabled = false;
            document.getElementById("id_Repo_type_eus").disabled = false;
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 is not yet supported for RHEL " + vRHEL + "</a>" + "<br><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 11</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL9\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">" + e4s_96 + "; support ends " + end_of_support_94 + "</a>";
            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
            document.getElementById("idSubscription").innerHTML = "";
            document.getElementById("titleRepos").innerHTML = vSAP + " is not yet supported for RHEL " + vRHEL + ".";
            document.getElementById("idRepos").innerHTML = "";
            document.getElementById("titleCommands").innerHTML = "";
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
         else if (vRHEL == "9.1" ||
                  vRHEL == "9.3" ||
                  vRHEL == "9.5") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
// HANA 2.0 RHEL 9.1
            if (vRHEL == "9.1") {
               document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 is not supported for RHEL " + vRHEL + "</a>" + "<br><br>";
               document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 11</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL9\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">" + e4s_91 + "; support ends " + end_of_support_91 + "</a>";
               document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
               document.getElementById("idSubscription").innerHTML = "";
               document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + ".";
               document.getElementById("idRepos").innerHTML = "";
               document.getElementById("titleCommands").innerHTML = "";
               document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
            }
// HANA 2.0 RHEL 9.3
            if (vRHEL == "9.3" ) {
               document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 is not supported for RHEL " + vRHEL + "</a>" + "<br><br>";
               document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 11</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL9\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">" + e4s_93 + "; support ends " + end_of_support_93 + "</a>";
               document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
               document.getElementById("idSubscription").innerHTML = "";
               document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + ".";
               document.getElementById("idRepos").innerHTML = "";
               document.getElementById("titleCommands").innerHTML = "";
               document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
            }
// HANA 2.0 RHEL 9.5
            if (vRHEL == "9.5" ) {
               document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 is not supported for RHEL " + vRHEL + "</a>" + "<br><br>";
               document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 11</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL9\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">" + e4s_95 + "; support ends " + end_of_support_93 + "</a>";
               document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
               document.getElementById("idSubscription").innerHTML = "";
               document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + ".";
               document.getElementById("idRepos").innerHTML = "";
               document.getElementById("titleCommands").innerHTML = "";
               document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
            }
         }
// HANA 2.0 RHEL 10.0 not yet supported
         else if (vRHEL == "10.0") {
            document.getElementById("id_Repo_type_e4s").disabled = false;
            document.getElementById("id_Repo_type_eus").disabled = false;
            document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2235581\">HANA 2.0 is not yet supported for RHEL " + vRHEL + "</a>" + "<br><br>";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 14</b></a>. <a href=\"https://access.redhat.com/articles/3078\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">" + e4s_100 + "; support ends " + end_of_support_94 + "</a>";
            document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
            document.getElementById("idSubscription").innerHTML = "";
            document.getElementById("titleRepos").innerHTML = vSAP + " is not yet supported for RHEL " + vRHEL + ".";
            document.getElementById("idRepos").innerHTML = "";
            document.getElementById("titleCommands").innerHTML = "";
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
      }
   }
   else if (vSAP == "SAP NetWeaver") {
// NetWeaver
      document.getElementById("idSubscription").innerHTML = "<a href=\"https://access.redhat.com/solutions/34169\">Red Hat Enterprise Linux for SAP Applications</a> or <a href=\"https://access.redhat.com/solutions/3082481\">Red Hat Enterprise Linux for SAP Solutions</a>";
      document.getElementById("idRHEL").innerHTML = "E4S not needed for SAP NetWeaver";
      if (vRepoType != "-e4s" && vRepoType != "-eus") {
         document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "(check with \"subscription-manager release\" to confirm that the release lock is unset)";
      }
      else {
         document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "subscription-manager release --set=" + vRHEL + " # - no need to use the e4s or eus repos for " + vSAP + ", or there aren't any -";
      }
      document.getElementById("id_ppc64le").disabled = false;
      if (vRHELmajor == "6") {
         document.getElementById("id_Cloud_on").disabled = true;
         document.getElementById("id_Cloud_off").checked = true;
         document.getElementById("idResources").innerHTML =
"<a href=\"https://access.redhat.com/solutions/1544043\">Red Hat KB 1544043</a> - How to subscribe RHEL 6/7 system to RHEL for SAP Channel?" + "<br>" +
"<a href=\"https://me.sap.com/notes/1496410\">SAP note 1496410</a> - Red Hat Enterprise Linux 6.x: Installation and Upgrade" + "<br>";
         if (vRHEL == "6.5") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.4</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-431</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not required; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         else if (vRHEL == "6.6") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.4</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-504</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not required; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         else if (vRHEL == "6.7") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.4</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-573</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S not required; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
         }
         else if (vRHEL == "6.10") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.4</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL6\">Kernel Version: 2.6.32-754</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S and EUS not available and not required; end of Maintenance Support 2 November 30, 2020; end of Extended Life-cycle Support June 30, 2024</a>";
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
            if (vDisable == "yes") {
               _disableRepoText = disable_all_repos_before_enabling;
            }
            else {
               _disableRepoText = "";
            }
            document.getElementById("idRepos").innerHTML =
              "rhel-6-server-rpms" + "<br>" +
              "rhel-sap-for-rhel-6-server-rpms" +
              _haRepo +
              "<br><br>";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
              "subscription-manager repos \\<br>" + _disableRepoText +
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
            if (vDisable == "yes") {
               _disableRepoText = disable_all_repos_before_enabling;
            }
            else {
               _disableRepoText = "";
            }
            if (vHA == "HA") {
               document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>";
               _haRepo = "<br>" + "<br>";
               _haText = "";
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
              "subscription-manager repos \\<br>" + _disableRepoText +
              "--enable=\"" + "rhel-6-for-power-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-sap-for-rhel-6-for-power-rpms" + "\"" +
              _haText;
         }
         if (vArch == "s390x") {
            if (vDisable == "yes") {
               _disableRepoText = disable_all_repos_before_enabling;
            }
            else {
               _disableRepoText = "";
            }
            if (vHA == "HA") {
               document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>";
               _haRepo = "<br>" + "<br>";
               _haText = "";
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
              "subscription-manager repos \\<br>" + _disableRepoText +
              "--enable=\"" + "rhel-6-for-system-z-rpms" + "\" \\<br>" +
              "--enable=\"" + "rhel-sap-for-rhel-6-for-system-z-rpms" + "\"" +
              _haText;
         }
      }
      else if (vRHELmajor == "7") {
         document.getElementById("id_Repo_type_e4s").disabled = false;
         document.getElementById("id_Repo_type_eus").disabled = false;
         document.getElementById("idResources").innerHTML =
"<a href=\"https://access.redhat.com/solutions/1544043\">Red Hat KB 1544043</a> - How to subscribe RHEL 6/7 system to RHEL for SAP Channel?" + "<br>" +
"<a href=\"https://me.sap.com/notes/2002167\">SAP note 2002167</a> - Red Hat Enterprise Linux 7.x: Installation and Upgrade" + "<br>";
         if (vRHEL == "7.2") {
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            vCloud = "no Cloud";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-327</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for EUS ended November 30, 2017; support for E4S ended November 30, 2019</a>";
            document.getElementById("id_ppc64le").disabled = true;
         }
         else if (vRHEL == "7.3") {
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            vCloud = "no Cloud";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-514</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for EUS ended November 30, 2018; support for E4S ends November 30, 2020</a>";
         }
         else if (vRHEL == "7.4") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-693</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for EUS ended August 31, 2019; support for E4S ends August 31, 2021</a>";
         }
         else if (vRHEL == "7.5") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
//            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-862</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not available; support for EUS ends April 30, 2020</a>";
         }
         else if (vRHEL == "7.6") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-957</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for EUS ends May 31, 2021; support for E4S ends October 31, 2022</a>";
         }
         else if (vRHEL == "7.7") {
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            vCloud = "no Cloud";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1062</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for EUS ends August 30, 2021; support for E4S ends August 30, 2023</a>";
         }
         else if (vRHEL == "7.8") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            vCloud = "no Cloud";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1127</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Maintenance_Support_2_Phase\">E4S and EUS not available; support ended at RHEL 7.9 release date, 3QCY20</a>";
         }
         else if (vRHEL == "7.9") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            vCloud = "no Cloud";
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 4.8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: 3.10.0-1160</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Life_Cycle_Dates\">E4S and EUS not available and not required; end of Maintenance Support June 30, 2024; end of Extended Life-cycle Support TBD</a>";
         }
         if (vCloud == "no Cloud") {
            _rhui="";
            _rhui2="";
         }
         else {
            _rhui="-rhui";
            _rhui2="rhui-eus-";
         }
         if (vArch == "x86_64") {
            if (vDisable == "yes") {
               _disableRepoText = disable_all_repos_before_enabling;
            }
            else {
               _disableRepoText = "";
            }
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
            if (vCloud == "no Cloud") {
               document.getElementById("idRepos").innerHTML =
                 "rhel-7-server-rpms" + "<br>" +
                 "rhel-sap-for-rhel-7-server-rpms" +
                 _haRepo +
                 "<br><br>";
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
                 "subscription-manager repos \\<br>" + _disableRepoText +
                 "--enable=\"" + "rhel-7-server-rpms" + "\" \\<br>" +
                 "--enable=\"" + "rhel-sap-for-rhel-7-server-rpms" + "\"" +
                 _haText;
            }
            else {
               document.getElementById("idRepos").innerHTML =
               "rhel-7-server" + _rhui + vRepoType + "-rpms" + "<br>" +
               "rhel-7-server" + _rhui + vRepoType + "-optional-rpms" + "<br>" +
               "rhel-7-server" + _rhui + vRepoType + "-supplementary-rpms" + "<br>" +
               "rhel-sap-for-rhel-7-server" + vRepoType + _rhui + "-rpms" + "<br>" +
               "rhel-sap-hana-for-rhel-7-server" + vRepoType + _rhui + "-rpms" +
               _haRepo;
                document.getElementById("titleCommands").innerHTML = "";
                document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
                document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
            }
         }
         else if (vArch == "ppc64le") {
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            _rhui=""
            if (vRHEL == "7.2") {
               document.getElementById("id_ppc64le").disabled = true;
               document.getElementById("idRemarks").innerHTML = "<a href=\"https://me.sap.com/notes/2002167\">NetWeaver is not supported for RHEL " + vRHEL + " on " + vArch + "</a>" + "<br><br>";
               document.getElementById("idResources").innerHTML = "<br><br><br><br><br>";
               document.getElementById("idSubscription").innerHTML = "";
               document.getElementById("idRHEL").innerHTML = "";
               document.getElementById("titleRepos").innerHTML = vSAP + " is not supported for RHEL " + vRHEL + " on " + vArch + ".";
               document.getElementById("titleCommands").innerHTML = "";
               document.getElementById("idRepos").innerHTML = "";
               document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
               document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
            }
            else {
               if (vDisable == "yes") {
                  _disableRepoText = disable_all_repos_before_enabling;
               }
               else {
                  _disableRepoText = "";
               }
               if (vHA == "HA") {
                  document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>";
                  _ha = "rhel-ha-for-rhel-7-server-" + vArch7 + "-" + _rhui + "rpms";
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
                 "subscription-manager repos \\<br>" + _disableRepoText +
                 "--enable=\"" + "rhel-7-" + vArch7 + "-rpms" + "\"  \\<br>" +
                 "--enable=\"" + "rhel-sap-for-rhel-7-" + vArch7 + "-rpms" + "\"" +
                 _haText;
            }
         }
         else if (vArch == "ppc64") {
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            _rhui=""
            if (vDisable == "yes") {
               _disableRepoText = disable_all_repos_before_enabling;
            }
            else {
               _disableRepoText = "";
            }
            if (vHA == "HA") {
               document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>";
               _ha = ""
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
              "subscription-manager repos \\<br>" + _disableRepoText +
              "--enable=\"" + "rhel-7-" + vArch7 + "-rpms" + "\"  \\<br>" +
              "--enable=\"" + "rhel-sap-for-rhel-7-" + vArch7 + "-rpms" + "\"" +
              _haText;
         }
         else if (vArch == "s390x") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            _rhui=""
            if (vDisable == "yes") {
               _disableRepoText = disable_all_repos_before_enabling;
            }
            else {
               _disableRepoText = "";
            }
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
              "subscription-manager repos \\<br>" + _disableRepoText +
              "--enable=\"" + "rhel-7-" + vArch7 + "-rpms" + "\"  \\<br>" +
              "--enable=\"" + "rhel-sap-for-rhel-7-" + vArch7 + "-rpms" + "\"" +
              _haText;
         }
      }
      else if (vRHELmajor == "8") {
         document.getElementById("id_Repo_type_e4s").disabled = false;
         document.getElementById("id_Repo_type_eus").disabled = false;
         document.getElementById("id_ppc64").disabled = true;
         document.getElementById("idResources").innerHTML =
"<a href=\"https://me.sap.com/notes/2772999\">SAP note 2772999</a> - Red Hat Enterprise Linux 8.x: Installation and Configuration" + "<br>";
         if (vRHEL == "8.0") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for E4S ended " + end_of_support_80 + "</a>";
         }
         else if (vRHEL == "8.1") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL7\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for E4S ends " + end_of_support_81 + "</a>";
         }
         else if (vRHEL == "8.2") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">E4S not required; support for E4S ends " + end_of_support_82 + "</a>";
         }
         else if (vRHEL == "8.3") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not available and not required; support ended " + end_of_support_83 + "</a>";
         }
         else if (vRHEL == "8.4") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for E4S ends " + end_of_support_84 + "</a>";
         }
         else if (vRHEL == "8.5") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not available and not required; support ends " + end_of_support_85 + "</a>";
         }
         else if (vRHEL == "8.6") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for E4S ends " + end_of_support_86 + "</a>";
         }
         else if (vRHEL == "8.7") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not available and not required; support ends " + end_of_support_87 + "</a>";
         }
         else if (vRHEL == "8.8") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not required; support for E4S ends " + end_of_support_88 + "</a>";
         }
         else if (vRHEL == "8.9") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not available and not required; support ends " + end_of_support_89 + "</a>";
         }
         else if (vRHEL == "8.10") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 8</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL8\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. <a href=\"https://access.redhat.com/support/policy/updates/errata#Extended_Update_Support\">E4S not available and not required; support ends " + end_of_support_810 + "</a>";
         }
         if (vCloud == "no Cloud") {
            _rhui=""
         }
         else {
            _rhui="-eus-rhui"
         }
         if (vArch == "ppc64le") {
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            _rhui=""
         }
         else if (vArch == "ppc64") {
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            _rhui=""
            document.getElementById("titleRepos").innerHTML = "RHEL " + vRHELmajor + " is not supported on " + vArch + ".";
            document.getElementById("titleCommands").innerHTML = "";
            document.getElementById("idRepos").innerHTML = "";
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
         else if (vArch == "s390x") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("id_Cloud_on").disabled = true;
            document.getElementById("id_Cloud_off").checked = true;
            _rhui=""
         }
         if (vDisable == "yes") {
            _disableRepoText = disable_all_repos_before_enabling;
         }
         else {
            _disableRepoText = "";
         }
         if (vHA == "HA") {
            document.getElementById("idResources").innerHTML +=
"<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
"<br>" +
"<br>" +
"<br>";
            _ha = "rhel-" + vRHELmajor + "-for-" + vArch + "-highavailability" + vRepoType + _rhui + "-rpms";
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
           "rhel-" + vRHELmajor + "-for-" + vArch + _baseos + vRepoType + "-rpms" + "<br>" +
           "rhel-" + vRHELmajor + "-for-" + vArch + _appstream + vRepoType + "-rpms" + "<br>" +
           "rhel-" + vRHELmajor + "-for-" + vArch + _sap_netweaver + vRepoType + "-rpms" +
           _haRepo +
           "<br>";
         document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
           "subscription-manager repos \\<br>" + _disableRepoText +
           "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _baseos + vRepoType + "-rpms" + "\" \\<br>" +
           "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _appstream + vRepoType + "-rpms" + "\" \\<br>" +
           "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _sap_netweaver + vRepoType + "-rpms" + "\"" +
           _haText;
         if (vCloud == "Cloud") {
            document.getElementById("titleCommands").innerHTML = "";
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
      }
      else if (vRHELmajor == "9") {
         if (vArch == "s390x") {document.getElementById("id_Repo_type_e4s").disabled = true}
         else {document.getElementById("id_Repo_type_e4s").disabled = false}
         document.getElementById("id_Repo_type_eus").disabled = false;
         document.getElementById("idResources").innerHTML =
              "<a href=\"https://me.sap.com/notes/3108316\">SAP note 3108316</a> - Red Hat Enterprise Linux 9.x: Installation and Configuration" + "<br>";
         document.getElementById("id_ppc64").disabled = true;
         document.getElementById("idRemarks").innerHTML = "<br><br>";
         if (vHA == "HA") {
            document.getElementById("idResources").innerHTML +=
              "<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
              "<br>" +
              "<br>" +
              "<br>";
            _ha = "rhel-" + vRHELmajor + "-for-" + vArch + "-highavailability" + _rhui + "-rpms";
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
           "rhel-" + vRHELmajor + "-for-" + vArch + _baseos + vRepoType + "-rpms" + "<br>" +
           "rhel-" + vRHELmajor + "-for-" + vArch + _appstream + vRepoType + "-rpms" + "<br>" +
           "rhel-" + vRHELmajor + "-for-" + vArch + _sap_netweaver + vRepoType + "-rpms" +
           _haRepo +
           "<br>";
         document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
           "subscription-manager repos \\<br>" + _disableRepoText +
           "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _baseos + vRepoType + "-rpms" + "\" \\<br>" +
           "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _appstream + vRepoType + "-rpms" + "\" \\<br>" +
           "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _sap_netweaver + vRepoType + "-rpms" + "\"" +
           _haText;
         if (vCloud == "Cloud") {
            document.getElementById("titleCommands").innerHTML = "";
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
         if (vRHEL == "9.0") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 11</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL9\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\"> E4S not required; support for E4S ends " + end_of_support_90 + "</a>";
         }
         else if (vRHEL == "9.1") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 11</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL9\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">" + e4s_91 + "; support ends " + end_of_support_91 + "</a>";
         }
         else if (vRHEL == "9.2") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 11</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL9\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">" + e4s_92 + "; support ends " + end_of_support_92 + "</a>";
         }
         else if (vRHEL == "9.3") {
            document.getElementById("id_Repo_type_e4s").disabled = true;
            document.getElementById("id_Repo_type_eus").disabled = true;
            document.getElementById("id_Repo_type_normal").checked = true;
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 11</b></a>. <a href=\"https://access.redhat.com/articles/3078#RHEL9\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\">" + e4s_93 + "; support ends " + end_of_support_93 + "</a>";
         }
      }
      else if (vRHELmajor == "10") {
         if (vArch == "s390x") {document.getElementById("id_Repo_type_e4s").disabled = true}
         else {document.getElementById("id_Repo_type_e4s").disabled = false}
         document.getElementById("id_Repo_type_eus").disabled = false;
         document.getElementById("idResources").innerHTML =
              "<a href=\"https://me.sap.com/notes/3108316\">SAP note not yet published</a> - Red Hat Enterprise Linux 10.x: Installation and Configuration" + "<br>";
         document.getElementById("id_ppc64").disabled = true;
         document.getElementById("idRemarks").innerHTML = "<br><br>";
         if (vHA == "HA") {
            document.getElementById("idResources").innerHTML +=
              "<a href=\"https://access.redhat.com/articles/4079981\">Red Hat KB 4079981</a> - Supported HA Scenarios for SAP HANA, SAP S/4HANA, and SAP Netweaver" + "<br>" +
              "<br>" +
              "<br>" +
              "<br>";
            _ha = "rhel-" + vRHELmajor + "-for-" + vArch + "-highavailability" + _rhui + "-rpms";
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
           "rhel-" + vRHELmajor + "-for-" + vArch + _baseos + vRepoType + "-rpms" + "<br>" +
           "rhel-" + vRHELmajor + "-for-" + vArch + _appstream + vRepoType + "-rpms" + "<br>" +
           "rhel-" + vRHELmajor + "-for-" + vArch + _sap_netweaver + vRepoType + "-rpms" +
           _haRepo +
           "<br>";
         document.getElementById("idSubsriptionManagerReposEnable").innerHTML =
           "subscription-manager repos \\<br>" + _disableRepoText +
           "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _baseos + vRepoType + "-rpms" + "\" \\<br>" +
           "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _appstream + vRepoType + "-rpms" + "\" \\<br>" +
           "--enable=\"" + "rhel-" + vRHELmajor + "-for-" + vArch + _sap_netweaver + vRepoType + "-rpms" + "\"" +
           _haText;
         if (vCloud == "Cloud") {
            document.getElementById("titleCommands").innerHTML = "";
            document.getElementById("idSubsriptionManagerReleaseSet").innerHTML = "";
            document.getElementById("idSubsriptionManagerReposEnable").innerHTML = "";
         }
         if (vRHEL == "10.0") {
            document.getElementById("idRHEL").innerHTML = "<a href=\"https://access.redhat.com/solutions/19458\"><b>GCC 14</b></a>. <a href=\"https://access.redhat.com/articles/3078\">Kernel Version: " + rhel_kernel[vRHEL].initial_version + "</a>. " +
"<a href=\"https://access.redhat.com/support/policy/updates/errata#Update_Services_for_SAP_Solutions\"> E4S not required; support for E4S ends " + end_of_support_100 + "</a>";
         }
      }
   }
}
