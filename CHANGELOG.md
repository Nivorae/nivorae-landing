# Changelog

## 0.2.1

- Fixed `TeamPage` OKLCH rendering, dark mode circles, and schema cleanup
- Improved color tokens by migrating from RGB to OKLCH
- Changed CI action SHA pins, `axios` upgrade, ReDoS patch, and `sortBy` enum constraint

## 0.2.0

- Added plans page with pricing tiers and portfolio sections
- Added team photo cards to portfolio
- Added landing page content sections below hero
- Added testimonials section with snap-scroll layout
- Added real member photos in team cards
- Fixed `useEffect` replacing broken IIFE in `ExHero` animation loop
- Updated `README` with planning skills and review workflow
- Added commit hygiene check and `apply-review` command
- Changed CI job to grant `contents: write` permission for auto-fix push
- Changed header logo shrunk and page title updated
- Changed `git-commit` tooling to enforce one-line rule
- Changed testimonials section removed

## 0.1.2

- Added redesigned landing page with video background and static 3D card display
- Added `Team` page with member cards and specialty carousel
- Added landing page with 3D panoramic `marquee` and bilingual hero section
- Changed favicon and header logo to custom icon
- Changed LF line endings across all packages

## 0.1.1

- Changed `/git:branch`, `/git:commit`, `/git:changelog` skills and `changelog-validator` hook for stricter conventions
- Updated `README.md` to document the `feature/* → develop → main` workflow

## 0.1.0

- Initial landing page release baseline
