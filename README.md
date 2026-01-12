<p align="center">
  <img src="assets/Communist_Party_of_Cuba_logo.svg" alt="Cuba OSINT" width="200"/>
</p>

<h1 align="center">CUBA Government Infrastructure OSINT Collection</h1>

<p align="center">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=Ringmast4r.Cuba" alt="Visitors"/>
  <img src="https://img.shields.io/github/repo-size/Ringmast4r/Cuba?style=flat-square" alt="Repo Size"/>
  <img src="https://img.shields.io/github/stars/Ringmast4r/Cuba?style=flat-square" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/Ringmast4r/Cuba?style=flat-square" alt="Forks"/>
  <img src="https://img.shields.io/github/last-commit/Ringmast4r/Cuba?style=flat-square" alt="Last Commit"/>
  <img src="https://img.shields.io/github/issues/Ringmast4r/Cuba?style=flat-square" alt="Issues"/>
  <img src="https://img.shields.io/github/license/Ringmast4r/Cuba?style=flat-square" alt="License"/>
</p>

<p align="center">
  <strong>Passive OSINT documentation of Cuban government web infrastructure</strong>
</p>

---

## Collection Statistics

| Metric | Count |
|--------|-------|
| **Total Files** | 1,420 |
| **Total Size** | 62.9 MB |
| **Domains Analyzed** | 131 |
| **Email Addresses** | 64 |
| **Usernames Exposed** | 14 |
| **SSL Certificates** | 16 |
| **Google Analytics IDs** | 12 |

---

## Overview

Passive OSINT documentation of Cuban government, military, and state enterprise web infrastructure for academic research and journalism purposes.

**Collection Date:** January 11, 2026
**Method:** Tor multi-node rotation (CH, DE, NL, SE, NO, AT, IS, FI, RO, CZ, PL, BE, LU)
**Purpose:** Public documentation of publicly accessible information

---

## Directory Structure

```
CUBA/
├── 01_presidency/           # Executive branch, Communist Party
├── 02_ministries/           # Government ministries
├── 03_military_security/    # MINFAR, MININT, Aduana
├── 04_state_media/          # Granma, Cubadebate, Radio
├── 05_infrastructure/       # ETECSA, utilities
├── 06_judiciary/            # Courts, prosecutors
├── 07_other_gov/            # Banks, health, education
│
├── 08_html_source/          # Offline HTML copies
├── 09_certificates/         # SSL certificates + summary
├── 10_apis/                 # API endpoint documentation
├── 11_tracking_ids/         # Google Analytics mapping
├── 12_tech_stacks/          # CMS/framework analysis
│
├── 13_critical_findings/    # High-value discoveries
├── 14_ai_findings/          # AI-assisted analysis
│
├── 15_dump/                 # API dumps, sitemaps, media
├── 16_raw_exports/          # Bulk data exports
├── 17_credentials_exposed/  # Emails, usernames, hashes
├── 18_config_leaks/         # Configuration exposures
├── 19_tracking_summary/     # Analytics consolidation
├── 20_reports/              # Analysis reports
│
└── assets/                  # README assets
```

---

## Key Findings

### WordPress User Enumeration

| Site | Users Exposed |
|------|---------------|
| SLD (sld.cu) | 6 users (admin, agdiaz, claudia, ivettecm, tania, victorr) |
| UH (uh.cu) | 4 users (adminnodo, gsiuh, seginf, taniarect-uh-cu) |

### Security Anomalies

| Finding | Details |
|---------|---------|
| **Best Security** | minag.gob.cu (Agriculture) - Full CSP, 2-year HSTS, COEP, COOP |
| **Worst Security** | Multiple sites missing all security headers |
| **Fake Server Header** | PCC claims "Windows95" (actually Drupal 10 + PHP 8.1.20) |
| **Internal CA** | ETECSA runs 12-year validity internal certificate authority |
| **GPS Leak** | Aduana HQ coordinates in HTML meta tags |

### Technology Stacks

| Technology | Sites |
|------------|-------|
| Drupal 8/10 | MINFAR (Varbase), PCC, CITMA, CITMATEL |
| WordPress | SLD, UH, MINED, Radio Rebelde |
| Laravel | ACN, Juventud Rebelde |
| Node.js | Central Bank API |

### EXIF Metadata Exposed

| Site | Equipment Identified |
|------|---------------------|
| MINFAR | Nikon D5600, LG Android phones |
| Radio Rebelde | Sony A7S II, Canon 6D Mark II |
| State Media | Adobe Photoshop CS6 (2012), Lightroom Classic 9.2 |

---

## Google Analytics IDs

| ID | Site |
|----|------|
| UA-107169760-1 | MINED |
| UA-144247220-1 | Aduana |
| UA-291893-2 | Juventud Rebelde |
| G-D39KSEBN9Q | Granma |
| GTM-TKWLSZN | Trabajadores |

---

## Legal Notice

This collection contains only publicly accessible information gathered through passive observation. No authentication was bypassed, no credentials were tested, and no systems were exploited.

**Purpose:** Academic research, Journalism, Security documentation

---

*Generated: January 11, 2026*
